using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Helpers;
using SPTarkov.Server.Core.Models.Utils;
using SPTarkov.Server.Core.Services;
using System.Text.Json;

namespace MountOlympus.Helpers
{
    [Injectable(TypePriority = OnLoadOrder.PostDBModLoader + 13)]
    public class AddMagazinesToFirearms(ISptLogger<AddMagazinesToFirearms> logger, DatabaseService databaseService, ModHelper modHelper)
    {
        public void Apply()
        {
            try
            {
                var modPath = modHelper.GetAbsolutePathToModFolder(System.Reflection.Assembly.GetExecutingAssembly());
                var mapPath = System.IO.Path.Combine(modPath, "Modifiers", "firearmMags.json");

                if (!System.IO.File.Exists(mapPath))
                {
                    logger.Warning("[Olympus][AddMagazinesToFirearms] firearmMags.json not found.");
                    return;
                }

                using var doc = JsonDocument.Parse(System.IO.File.ReadAllText(mapPath));
                if (doc.RootElement.ValueKind != JsonValueKind.Object)
                    return;

                var items = databaseService.GetItems();
                if (items == null)
                {
                    logger.Warning("[Olympus][AddMagazinesToFirearms] Unable to locate templates.items.");
                    return;
                }

                const string magSlotName = "mod_magazine";

                foreach (var firearmProp in doc.RootElement.EnumerateObject())
                {
                    var firearmId = firearmProp.Name;

                    if (!firearmProp.Value.TryGetProperty("maglist", out var maglistEl) || maglistEl.ValueKind != JsonValueKind.Array)
                        continue;

                    var mags = maglistEl.EnumerateArray().Select(e => e.GetString()).Where(s => !string.IsNullOrEmpty(s)).ToList();
                    if (mags.Count == 0)
                        continue;

                    dynamic firearmObj = items[firearmId];

                    foreach (dynamic slot in firearmObj.Properties.Slots)
                    {
                        if (slot.Name == magSlotName)
                        {
                            dynamic filterCollection = slot.Properties.Filters[0].Filter;
                            int addedCount = 0;

                            foreach (var mag in mags)
                            {
                                if (!filterCollection.Contains(mag))
                                {
                                    filterCollection.Add(mag);
                                    addedCount++;
                                }
                            }

                            logger.Info($"[Olympus][AddMagazinesToFirearms] Added {addedCount} magazines to firearm '{firearmId}'.");
                            break;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                logger.Error($"[Olympus][AddMagazinesToFirearms] Error: {ex.Message}");
            }
        }
    }
}