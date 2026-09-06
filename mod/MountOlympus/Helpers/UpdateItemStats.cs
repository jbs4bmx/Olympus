using SPTarkov.Common.Logger;
using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Helpers.Server;
using SPTarkov.Server.Core.Models.Spt.Tables;
using SPTarkov.Server.Core.Services.Items;
using System.Reflection;
using static MountOlympus.Olympus;

namespace MountOlympus.Helpers
{
    [Injectable(TypePriority = OnLoadOrder.Preload + 1007)]
    public class UpdateItemStatsHelper(SptLogger<UpdateItemStatsHelper> logger, TemplateTable templateTable, TradersTable tradersTable, ItemBaseClassService itemBaseClassService, ModHelper modHelper)
    {
        public void Update()
        {
            try
            {
                var pathToMod = System.IO.Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)!;
                var cfgPath = modHelper.GetJsonDataFromFile<ModConfig>(pathToMod, "MOConfig.jsonc");

                var debug = cfgPath?.EnableDebugLogging == true;

                var items = templateTable.Items;
                if (items is null)
                {
                    logger.Warning("[Olympus][UpdateItemStats] Items DB is null - aborting UpdateItemStats.");
                    return;
                }

                // Textual trader tables used only for loyalty mapping
                var tables = templateTable.GetType().GetMethod("GetTables");
                var loyal = tradersTable.GetTrader("5c0647fdd443bc2504c2d371").Assort.LoyalLevelItems;

                var magItems = new List<string> {
                    "6816beb871b09465ad3efc82",
                    "6816beb851e6280ad379c4fb",
                    "6816beb841be398af5270d6c",
                    "6816beb88e62a50f19bd74c3",
                    "6816beb8102946dabf3ec578",
                    "6816beb82130bcd49ae6f785",
                    "6816beb8d38f0ae629c7514b",
                    "6816beb8b26ca97e413085df",
                    "6816beb806be7c5f8912a4d3",
                    "6816beb8280ec5a63bdf4971",
                    "6816beb8da95831eb6402fc7",
                    "6816beb801d8937ace4b265f",
                    "6816beb8029dbaef8574136c",
                    "6816beb80312f467c9bea8d5",
                    "6816beb8031bcf82a967e4d5",
                    "6816beb806c372a491ebd85f",
                    "6816beb8076854e1afb3d92c",
                    "6816beb80983fdca5461b27e",
                    "6816beb80ab85c36ef42719d",
                    "6816beb80d7ab48f6c23195e",
                    "6816beb80d9f482b6e571a3c",
                    "6816beb80df5976e243ab8c1",
                    "6816beb80e865dabf4219c37",
                    "6816beb8120af4deb8c35679",
                    "6816beb812a48ef976dc053b",
                    "6816beb813b4de9cf28a5706",
                    "6816beb815034f78ed6c92ba",
                    "6816beb815af2ed894670b3c",
                    "6816beb816e84095ca273dfb",
                    "6816beb8194826f7e5d0c3ba",
                    "6816beb81a73d5c2b890e4f6",
                    "6816beb81bf95adc2436780e",
                    "6816beb81d379c8624af5e0b",
                    "6816beb81f03c7259ea86b4d",
                    "6816beb82306ab59f7e4dc18",
                    "6816beb8241f0c6897bd35ea",
                    "6816beb82708b5a41d96ec3f",
                    "6816beb8270981ce3f64da5b",
                    "6816beb8278a1cd59be0f634",
                    "6816beb828dce751ab36f049",
                    "6816beb82b5e4a89371fdc06",
                    "6816beb82dac93e574f1b068",
                    "6816beb82e640fc78931bda5",
                    "6816beb82f46ab87e59dc103",
                    "6816beb82fc1b6d3e5a49078",
                    "6816beb831e25c084fb79da6",
                    "6816beb83426dcf15a780b9e",
                    "6816beb8356f0e2c419ab87d",
                    "6816beb8359e47081cbf6ad2",
                    "6816beb836c2f87de5b9104a",
                    "6816beb839bf42ce510a7d68",
                    "6816beb83b82d7e6c9af5041",
                    "6816beb8fc419e7a2d8305b6",
                    "6816beb8fe92d4a031c56b78",
                    "68f2f70e436d9a8072fb5e1c",
                    "68f2f70e290d8b3c5a746f1e",
                    "68f2f70efe6c3d729a0b8541",
                    "68f2f70e97018efab2c3654d",
                    "68f2f70e56f82ab140c9e73d",
                    "68f2f70e5e1f837429a6bc0d",
                    "68f2f70e30264efab7c891d5",
                    "68f2f70ee3f58b740d126c9a",
                    "68f2f70eb38c257af46d9e10",
                    "68f2f70e1bf03c76a4529e8d",
                    "68f2f70e7dace16582f0349b",
                    "68f2f70e73486c0ad15be2f9",
                    "68f2f70e3d8692aeb471f0c5",
                    "68f2f70eb2c38f9a7d06415e",
                    "68f2f70e46783c512f9a0edb",
                    "68f2f70efd97b56ca81204e3",
                    "68f2f70e069ed2c1ab5738f4",
                    "68f2f70e79f3c8e0bda45126",
                    "68f2f70e0b2fe59176a3cd48",
                    "68f2f70e9d4f2ea17b3c6085",
                    "68f2f70e82f357c01ebd946a",
                    "68f2f70eea56024b1387f9cd",
                    "68f2f70ed7521ba38694fce0",
                    "68f2f70e37e0458bf16acd29",
                    "68f2f70e6d198f7eabc05324",
                    "661c917436409c2d18e5afb7"
                };

                // Apply changes ------------------------------------------------------------
                
                if (cfgPath.PainSuppressionDurationSeconds > 0)
                {
                    if (items.TryGetValue("661c91746c391e0f5ba82d47", out var s1) && s1.Properties.EffectsDamage != null && s1.Properties.EffectsDamage.TryGetValue(SPTarkov.Server.Core.Models.Enums.DamageEffectType.Pain, out var dmg1))
                    {
                        dmg1.Duration = cfgPath.PainSuppressionDurationSeconds;
                    }
                    if (items.TryGetValue("661c91741ba0f93d4287c5e6", out var s2) && s2.Properties.EffectsDamage != null && s2.Properties.EffectsDamage.TryGetValue(SPTarkov.Server.Core.Models.Enums.DamageEffectType.Pain, out var dmg2))
                    {
                        dmg2.Duration = cfgPath.PainSuppressionDurationSeconds;
                    }
                    if (items.TryGetValue("661c91742b5c1493806daf7e", out var s3) && s3.Properties.EffectsDamage != null && s3.Properties.EffectsDamage.TryGetValue(SPTarkov.Server.Core.Models.Enums.DamageEffectType.Pain, out var dmg3))
                    {
                        dmg3.Duration = cfgPath.PainSuppressionDurationSeconds;
                    }
                    itemBaseClassService.AddItemToCache("661c91746c391e0f5ba82d47");
                    itemBaseClassService.AddItemToCache("661c91741ba0f93d4287c5e6");
                    itemBaseClassService.AddItemToCache("661c91742b5c1493806daf7e");
                    if (debug) logger.Info($"[Olympus][UpdateItemStats] Set Pain Suppression duration on compatible stims to {cfgPath.PainSuppressionDurationSeconds} seconds.");
                }

                if (cfgPath.EnergyRegenDurationSeconds > 0)
                {
                    if (items.TryGetValue("661c91746c391e0f5ba82d47", out var e1) && e1.Properties.EffectsHealth != null && e1.Properties.EffectsHealth.TryGetValue(SPTarkov.Server.Core.Models.Enums.HealthFactor.Energy, out var eh1))
                    {
                        eh1.Value = cfgPath.EnergyRegenDurationSeconds;
                    }
                    if (items.TryGetValue("661c91741ba0f93d4287c5e6", out var e2) && e2.Properties.EffectsHealth != null && e2.Properties.EffectsHealth.TryGetValue(SPTarkov.Server.Core.Models.Enums.HealthFactor.Energy, out var eh2))
                    {
                        eh2.Value = cfgPath.EnergyRegenDurationSeconds;
                    }
                    itemBaseClassService.AddItemToCache("661c91746c391e0f5ba82d47");
                    itemBaseClassService.AddItemToCache("661c91741ba0f93d4287c5e6");
                    if (debug) logger.Info($"[Olympus][UpdateItemStats] Set Energy Regen duration on compatible stims to {cfgPath.EnergyRegenDurationSeconds} seconds.");
                }

                if (cfgPath.HydrationRegenDurationSeconds > 0)
                {
                    if (items.TryGetValue("661c91746c391e0f5ba82d47", out var h1) && h1.Properties.EffectsHealth != null && h1.Properties.EffectsHealth.TryGetValue(SPTarkov.Server.Core.Models.Enums.HealthFactor.Hydration, out var hh1))
                    {
                        hh1.Value = cfgPath.HydrationRegenDurationSeconds;
                    }
                    if (items.TryGetValue("661c91741ba0f93d4287c5e6", out var h2) && h2.Properties.EffectsHealth != null && h2.Properties.EffectsHealth.TryGetValue(SPTarkov.Server.Core.Models.Enums.HealthFactor.Hydration, out var hh2))
                    {
                        hh2.Value = cfgPath.HydrationRegenDurationSeconds;
                    }
                    itemBaseClassService.AddItemToCache("661c91746c391e0f5ba82d47");
                    itemBaseClassService.AddItemToCache("661c91741ba0f93d4287c5e6");
                    if (debug) logger.Info($"[Olympus][UpdateItemStats] Set Hydration Regen duration on compatible stims to {cfgPath.HydrationRegenDurationSeconds} seconds.");
                }

                if (cfgPath.PackGridVertical > 0)
                {
                    if (items.TryGetValue("661c917426ba940d7138e5cf", out var packV) && packV.Properties.Grids?.FirstOrDefault() is var firstGrid && firstGrid != null)
                    {
                        firstGrid.Properties.CellsV = cfgPath.PackGridVertical;
                        if (debug) logger.Info($"[Olympus][UpdateItemStats] AtSatch vertical grid to {cfgPath.PackGridVertical}.");
                    }
                }
                
                if (cfgPath.PackGridHorizontal > 0)
                {
                    if (items.TryGetValue("661c917426ba940d7138e5cf", out var packH) && packH.Properties.Grids?.FirstOrDefault() is var firstGridH && firstGridH != null)
                    {
                        firstGridH.Properties.CellsH = cfgPath.PackGridHorizontal;
                        if (debug) logger.Info($"[Olympus][UpdateItemStats] Set AtSatch horizontal grid to {cfgPath.PackGridHorizontal}.");
                    }
                }

                if (cfgPath.SetAllMagsLoyaltyLevelOne is bool loyaltyCheck && loyaltyCheck)
                {
                    if (loyal is null)
                    {
                        logger.Warning("[Olympus][UpdateItemStats] Could not get trader loyalty mapping; skipping loyalty updates.");
                    }
                    else
                    {
                        foreach (var id in magItems)
                        {
                            if (loyal.ContainsKey(id))
                            {
                                loyal[id] = 1;
                                if (debug) logger.Info($"[Olympus][UpdateItemStats] Set mag '{id}' loyalty level to 1.");
                            }
                            else
                            {
                                // add if not present
                                loyal[id] = 1;
                                if (debug) logger.Info($"[Olympus][UpdateItemStats] Added mag '{id}' to loyalty mapping with level 1.");
                            }

                            itemBaseClassService.AddItemToCache(id);
                        }
                    }
                }
                
                // End Apply changes --------------------------------------------------------
            }
            catch (Exception ex)
            {
                logger.Error($"[Olympus][UpdateItemStats] Failed to update item stats: {ex}");
            }
        }
    }
}