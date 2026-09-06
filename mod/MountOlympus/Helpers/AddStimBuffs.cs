using SPTarkov.Common.Logger;
using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Helpers.Server;
using SPTarkov.Server.Core.Models.Spt.Tables;
using System.Collections;
using System.Reflection;
using System.Text.Json;
using static MountOlympus.Olympus;


namespace MountOlympus.Helpers
{
    [Injectable(TypePriority = OnLoadOrder.Preload + 1006)]
    public class AddStimBuffs(SptLogger<AddStimBuffs> logger, GlobalTable globalTable, ModHelper modHelper)
    {
        public void Apply()
        {
            try
            {
                // get config debug value
                var pathToMod = System.IO.Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)!;
                var cfgPath = modHelper.GetJsonDataFromFile<ModConfig>(pathToMod, "MOConfig.jsonc");

                var debug = cfgPath?.EnableDebugLogging == true;
                var globalsJsonPath = System.IO.Path.Combine(pathToMod, "Modifiers", "globals.json");

                if (debug) logger.Info($"[Olympus][AddStimBuff] Looking for globals.json at: {globalsJsonPath}");
                
                if (!File.Exists(globalsJsonPath))
                {
                    logger.Warning("[Olympus][AddStimBuff] globals.json not found; skipping buffs merge.");
                    return;
                }

                // get buffs from globals.json file
                using var doc = JsonDocument.Parse(File.ReadAllText(globalsJsonPath));
                var root = doc.RootElement;

                JsonElement buffsEl;
                if (root.ValueKind == JsonValueKind.Object && root.TryGetProperty("buffs", out var directBuffs))
                {
                    buffsEl = directBuffs;
                }
                else if (root.ValueKind == JsonValueKind.Object && root.TryGetProperty("globals", out var globalsCandidate) && globalsCandidate.ValueKind == JsonValueKind.Object && globalsCandidate.TryGetProperty("buffs", out var nestedBuffs))
                {
                    buffsEl = nestedBuffs;
                }
                else
                {
                    JsonElement? found = null;
                    foreach (var p in root.EnumerateObject())
                    {
                        if (p.NameEquals("buffs") && p.Value.ValueKind == JsonValueKind.Object)
                        {
                            found = p.Value;
                            break;
                        }
                        if (p.Value.ValueKind == JsonValueKind.Object && p.Value.TryGetProperty("buffs", out var fb) && fb.ValueKind == JsonValueKind.Object)
                        {
                            found = fb;
                            break;
                        }
                    }

                    if (found is null)
                    {
                        logger.Warning("[Olympus][AddStimBuff] No 'buffs' object found in globals.json; skipping.");
                        return;
                    }

                    buffsEl = found.Value;
                }

                // Walk: Globals.Configuration.Health.Effects.Stimulator.Buffs
                var buffsObj = GetNestedProperty(
                    globalTable,
                    "Configuration",
                    "Health",
                    "Effects",
                    "Stimulator",
                    "Buffs"
                );

                if (buffsObj == null)
                {
                    logger.Warning("[Olympus][AddStimBuff] Unable to locate 'Globals.Configuration.Health.Effects.Stimulator.Buffs' on database object.");
                    return;
                }

                if (buffsObj is not IDictionary buffsDict)
                {
                    logger.Warning("[Olympus][AddStimBuff] 'Buffs' is not a dictionary as expected.");
                    return;
                }

                Type? valueType = null;
                if (buffsDict.Count > 0)
                {
                    var enumr = buffsDict.GetEnumerator();
                    if (enumr.MoveNext())
                    {
                        valueType = enumr.Value?.GetType();
                    }
                }

                valueType ??= typeof(object);



                // apply buffs to db
                foreach (var buffProp in buffsEl.EnumerateObject())
                {
                    var buffId = buffProp.Name;
                    if (buffsDict.Contains(buffId))
                    {
                        logger.Warning($"[Olympus][AddStimBuff] Buff '{buffId}' already exists in globals.buffs; skipping.");
                        continue;
                    }

                    var rawJson = buffProp.Value.GetRawText();
                    object? deserialized;
                    try
                    {
                        deserialized = JsonSerializer.Deserialize(rawJson, valueType);
                    }
                    catch (Exception ex)
                    {
                        logger.Warning($"[Olympus][AddStimBuff] Failed to deserialize buff '{buffId}' to {valueType.Name}: {ex.Message}. Attempting to deserialize as object.");
                        deserialized = JsonSerializer.Deserialize<object>(rawJson);
                    }

                    if (deserialized == null)
                    {
                        logger.Warning($"[Olympus][AddStimBuff] Deserialization produced null for buff '{buffId}'; skipping.");
                        continue;
                    }

                    try
                    {
                        buffsDict.Add(buffId, deserialized);
                        if (debug) logger.Info($"[Olympus][AddStimBuff] Inserted buff '{buffId}' into globals.buffs.");
                    }
                    catch (Exception ex)
                    {
                        logger.Warning($"[Olympus][AddStimBuff] Failed to add buff '{buffId}' to globals.buffs: {ex.Message}");
                    }
                }
            }
            catch (Exception ex)
            {
                logger.Error($"[Olympus][AddStimBuff] Error while loading buffs from globals.json: {ex}");
            }
        }

        private static object? GetNestedProperty(object root, params string[] path)
        {
            object? current = root;

            foreach (var segment in path)
            {
                if (current == null) return null;

                var type = current.GetType();

                // Try property (case-insensitive)
                var prop = type.GetProperty(segment, BindingFlags.Instance | BindingFlags.Public | BindingFlags.IgnoreCase);
                if (prop != null)
                {
                    current = prop.GetValue(current);
                    continue;
                }

                // Try field (case-insensitive), just in case
                var field = type.GetField(segment, BindingFlags.Instance | BindingFlags.Public | BindingFlags.IgnoreCase);
                if (field != null)
                {
                    current = field.GetValue(current);
                    continue;
                }

                // Segment not found
                return null;
            }

            return current;
        }
    }
}
