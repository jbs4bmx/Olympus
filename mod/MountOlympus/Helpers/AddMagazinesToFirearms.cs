using SPTarkov.Common.Logger;
using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Helpers.Server;
using SPTarkov.Server.Core.Models.Spt.Tables;
using System.Text.Json;

namespace MountOlympus.Helpers
{
    /*
        Runs at PostLoad rather than being called from Olympus's Preload stage. This edits an existing firearm's magazine-slot filter - it doesn't
        create new database entries, so it doesn't need Preload's guarantees. Running at PostLoad instead means it's safe to reference firearms added
        by OTHER mods (e.g. custom weapons), since PostLoad is guaranteed to run after every mod's own database setup is finished, regardless of
        what priority that other mod happens to use internally.
        Credit: FLIGHTxS4L
    */

    [Injectable(TypePriority = OnLoadOrder.PostLoad + 1)]
    public class AddMagazinesToFirearms(SptLogger<AddMagazinesToFirearms> logger, TemplateTable templateTable, ModHelper modHelper) : IOnLoad
    {
        public Task OnLoadAsync(CancellationToken cancellationToken)
        {
            Apply();
            return Task.CompletedTask;
        }
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

                var items = templateTable.Items;
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