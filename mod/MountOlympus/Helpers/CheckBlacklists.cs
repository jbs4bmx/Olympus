using SPTarkov.Common.Logger;
using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Helpers.Server;
using SPTarkov.Server.Core.Models.Eft.Common.Tables;
using SPTarkov.Server.Core.Models.Spt.Config;
using SPTarkov.Server.Core.Models.Spt.Tables;
using System.Reflection;
using static MountOlympus.Olympus;

namespace MountOlympus.Helpers
{
    [Injectable(TypePriority = OnLoadOrder.Preload + 1008)]
    public class CheckBlacklists(SptLogger<CheckBlacklists> logger, PmcConfig pmcConfig, BotConfig botConfig, LootConfig lootConfig, ItemConfig itemConfig, AirdropConfig airdropConfig, TemplateTable templateTable, ModHelper modHelper)
    {
        private static readonly List<string> StimItems =
        [
            "661c91746c391e0f5ba82d47",
            "661c91741ba0f93d4287c5e6",
            "661c91742b5c1493806daf7e",
            "661c9174e9365c70fa18b4d2"
        ];

        private static readonly List<string> RigItems =
        [
            "661c91744502ba91ef63c8d7",
            "661c917426ba940d7138e5cf",
            "661c9174018549befc3a7d62",
            "661c9174d9718c60a32fe5b4",
            "661c9174a371d90e62b8f5c4"
        ];

        private static readonly List<string> MagItems =
        [
            "6816beb871b09465ad3efc82", "6816beb851e6280ad379c4fb", "6816beb841be398af5270d6c",
            "6816beb88e62a50f19bd74c3", "6816beb8102946dabf3ec578", "6816beb82130bcd49ae6f785",
            "6816beb8d38f0ae629c7514b", "6816beb8b26ca97e413085df", "6816beb806be7c5f8912a4d3",
            "6816beb8280ec5a63bdf4971", "6816beb8da95831eb6402fc7", "6816beb801d8937ace4b265f",
            "6816beb8029dbaef8574136c", "6816beb80312f467c9bea8d5", "6816beb8031bcf82a967e4d5",
            "6816beb806c372a491ebd85f", "6816beb8076854e1afb3d92c", "6816beb80983fdca5461b27e",
            "6816beb80ab85c36ef42719d", "6816beb80d7ab48f6c23195e", "6816beb80d9f482b6e571a3c",
            "6816beb80df5976e243ab8c1", "6816beb80e865dabf4219c37", "6816beb8120af4deb8c35679",
            "6816beb812a48ef976dc053b", "6816beb813b4de9cf28a5706", "6816beb815034f78ed6c92ba",
            "6816beb815af2ed894670b3c", "6816beb816e84095ca273dfb", "6816beb8194826f7e5d0c3ba",
            "6816beb81a73d5c2b890e4f6", "6816beb81bf95adc2436780e", "6816beb81d379c8624af5e0b",
            "6816beb81f03c7259ea86b4d", "6816beb82306ab59f7e4dc18", "6816beb8241f0c6897bd35ea",
            "6816beb82708b5a41d96ec3f", "6816beb8270981ce3f64da5b", "6816beb8278a1cd59be0f634",
            "6816beb828dce751ab36f049", "6816beb82b5e4a89371fdc06", "6816beb82dac93e574f1b068",
            "6816beb82e640fc78931bda5", "6816beb82f46ab87e59dc103", "6816beb82fc1b6d3e5a49078",
            "6816beb831e25c084fb79da6", "6816beb83426dcf15a780b9e", "6816beb8356f0e2c419ab87d",
            "6816beb8359e47081cbf6ad2", "6816beb836c2f87de5b9104a", "6816beb839bf42ce510a7d68",
            "6816beb83b82d7e6c9af5041", "6816beb8fc419e7a2d8305b6", "6816beb8fe92d4a031c56b78",
            "68f2f70e436d9a8072fb5e1c", "68f2f70e290d8b3c5a746f1e", "68f2f70efe6c3d729a0b8541",
            "68f2f70e97018efab2c3654d", "68f2f70e56f82ab140c9e73d", "68f2f70e5e1f837429a6bc0d",
            "68f2f70e30264efab7c891d5", "68f2f70ee3f58b740d126c9a", "68f2f70eb38c257af46d9e10",
            "68f2f70e1bf03c76a4529e8d", "68f2f70e7dace16582f0349b", "68f2f70e73486c0ad15be2f9",
            "68f2f70e3d8692aeb471f0c5", "68f2f70eb2c38f9a7d06415e", "68f2f70e46783c512f9a0edb",
            "68f2f70efd97b56ca81204e3", "68f2f70e069ed2c1ab5738f4", "68f2f70e79f3c8e0bda45126",
            "68f2f70e0b2fe59176a3cd48", "68f2f70e9d4f2ea17b3c6085", "68f2f70e82f357c01ebd946a",
            "68f2f70eea56024b1387f9cd", "68f2f70ed7521ba38694fce0", "68f2f70e37e0458bf16acd29",
            "68f2f70e6d198f7eabc05324", "661c917436409c2d18e5afb7"
        ];

        private static readonly List<string> Containers =
        [
            "6223349b3136504a544d1608", "622334c873090231d904a9fc", "622334fa3136504a544d160c",
            "6223351bb5d97a7b2c635ca7", "66da1b49099cf6adcc07a36b", "66da1b546916142b3b022777",
            "67614e3a6a90e4f10b0b140d", "64d116f41a9c6143a956127d", "578f879c24597735401e6bc6",
            "5ad74cf586f774391278f6f0", "5ad7247386f7747487619dc3", "5ad7242b86f7740a6a3abd43",
            "5ad7217186f7746744498875", "64ccc2111779ad6ba200a139", "6581998038c79576a2569e11",
            "64d11702dd0cd96ab82c3280", "66acff0a1d8e1083b303f5af", "5d6d2bb386f774785b07a77a",
            "5d6d2b5486f774785c2ba8ea", "5d07b91b86f7745a077a9432", "658420d8085fea07e674cdb6",
            "67adf5752fc5ee84020a9940", "5909e4b686f7747f5b744fa4", "6582e6c6edf14c4c6023adf2",
            "6582e6d7b14c3f72eb071420", "6582e6bb0c3b9823fe6d1840", "5675838d4bdc2d95058b456e",
            "578f87b7245977356274f2cd", "5909d36d86f774660f0bb900", "67adf4eb110ba15da90c6413",
            "578f8778245977358849a9b5", "5914944186f774189e5e76c2", "5937ef2b86f77408a47244b3",
            "59387ac686f77401442ddd61", "67adf4a95247ac91530fcec7", "5909d24f86f77466f56e6855",
            "61aa1ead84ea0800645777fd", "5d6fe50986f77449d97f7463", "59139c2186f77411564f8e42",
            "5c052cea86f7746b2101e8d8", "5d6fd13186f77424ad2a8c69", "5d6fd45b86f774317075ed43",
            "67adf5f7adc1f43b0702b826", "578f87a3245977356274f2cb", "61aa1e9a32a4743c3453d2cf",
            "5909d50c86f774659e6aaebe", "67adf54d1c58bd68b2002ff0", "688b2dba67bf6fa26c07e918",
            "62f10b79e7ee985f386b2f47", "633ffb5d419dbf4bea7004c6", "578f8782245977354405a1e3",
            "61a89e5445a2672acf66c877", "61a89e812cc17d60cc5f9879", "5909d5ef86f77467974efbd8",
            "5909d76c86f77471e53d2adf", "5909d7cf86f77470ee57d75a", "5909d89086f77472591234a0",
            "61aa1e6984ea0800645777f9", "5909d45286f77465a8136dc6", "578f87ad245977356274f2cc",
            "67adf4db515e3dd542077a1d", "67adf4b81c58bd68b2002fec"
        ];

        public void Apply()
        {
            try
            {
                var pathToMod = System.IO.Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)!;
                var cfgPath = modHelper.GetJsonDataFromFile<ModConfig>(pathToMod, "MOConfig.jsonc");
                if (cfgPath is null)
                {
                    logger.Warning("Medkits config not found - skipping medkit patches");
                    return;
                }

                var debug = cfgPath?.EnableDebugLogging == true;

                // Stim Blacklists
                if (cfgPath.BlacklistStimsFromBots)
                {
                    BotBlacklist(botConfig, StimItems, debug, "stim");
                }
                if (cfgPath.BlacklistStimsFromPMCs)
                {
                    PmcBlacklist(pmcConfig, StimItems, debug, "stim");
                }
                if (cfgPath.BlacklistStimsFromRaidContainers)
                {
                    ConBlacklist(templateTable, StimItems, debug, "stim");
                }
                if (cfgPath.BlacklistStimsFromLooseLoot)
                {
                    LooBlacklist(itemConfig, StimItems, debug, "stim");
                }
                if (cfgPath.BlacklistStimsFromAirdrop)
                {
                    AirBlacklist(StimItems, debug, "stim");
                }

                // Rig Blacklists
                if (cfgPath.BlacklistRigsFromBots)
                {
                    BotBlacklist(botConfig, RigItems, debug, "rig");
                }
                if (cfgPath.BlacklistRigsFromPMCs)
                {
                    PmcBlacklist(pmcConfig, RigItems, debug, "rig");
                }
                if (cfgPath.BlacklistRigsFromRaidContainers)
                {
                    ConBlacklist(templateTable, RigItems, debug, "rig");
                }
                if (cfgPath.BlacklistRigsFromLooseLoot)
                {
                    LooBlacklist(itemConfig, RigItems, debug, "rig");
                }
                if (cfgPath.BlacklistRigsFromAirdrop)
                {
                    AirBlacklist(StimItems, debug, "rig");
                }

                // Mag Blacklists
                if (cfgPath.BlacklistMagsFromBots)
                {
                    BotBlacklist(botConfig, MagItems, debug, "mag");
                }
                if (cfgPath.BlacklistMagsFromPMCs)
                {
                    PmcBlacklist(pmcConfig, MagItems, debug, "mag");
                }
                if (cfgPath.BlacklistMagsFromRaidContainers)
                {
                    ConBlacklist(templateTable, MagItems, debug, "mag");
                }
                if (cfgPath.BlacklistMagsFromLooseLoot)
                {
                    LooBlacklist(itemConfig, MagItems, debug, "mag");
                }
                if (cfgPath.BlacklistMagsFromAirdrop)
                {
                    AirBlacklist(StimItems, debug, "mag");
                }
            }
            catch (Exception ex)
            {
                logger.Error($"[Olympus][CheckBlacklists] Failed to apply blacklists: {ex}");
            }
        }


        private void PmcBlacklist(PmcConfig? pmcConfig, List<string> itemIds, bool debug, string itemType)
        {
            if (pmcConfig == null) return;

            foreach (var itemId in itemIds)
            {
                if (!pmcConfig.VestLoot.Blacklist.Contains(itemId)) pmcConfig.VestLoot.Blacklist.Add(itemId);
                if (!pmcConfig.PocketLoot.Blacklist.Contains(itemId)) pmcConfig.PocketLoot.Blacklist.Add(itemId);
                if (!pmcConfig.BackpackLoot.Blacklist.Contains(itemId)) pmcConfig.BackpackLoot.Blacklist.Add(itemId);
                if (!pmcConfig.GlobalLootBlacklist.Contains(itemId)) pmcConfig.GlobalLootBlacklist.Add(itemId);
            }
            if (debug) logger.Info($"[Olympus][CheckBlacklists] Applied {itemType} blacklist to PMC config.");
        }


        private void BotBlacklist(BotConfig? botConfig, List<string> itemIds, bool debug, string itemType)
        {
            if (botConfig?.ItemSpawnLimits != null)
            {
                foreach (var itemId in itemIds)
                {
                    foreach (var limitDict in botConfig.ItemSpawnLimits.Values)
                    {
                        if (!limitDict.ContainsKey(itemId))
                        {
                            limitDict[itemId] = 0;
                        }
                    }
                }
            }
            if (debug) logger.Info($"[Olympus][CheckBlacklists] Applied {itemType} blacklist to Bot config.");
        }

        private void ConBlacklist(TemplateTable templateTable, List<string> itemIds, bool debug, string itemType)
        {
            foreach (var container in Containers)
            {
                var itemList = templateTable.Items;

                if (itemList[container].Properties?.Grids != null)
                {
                    foreach (var grid in itemList[container].Properties.Grids)
                    {
                        var filters = grid.Properties?.Filters?.ToList();
                        if (filters?.Count > 0)
                        {
                            var excluded = filters[0].ExcludedFilter;
                            foreach (var itemId in itemIds)
                            {
                                if (excluded != null && !excluded.Contains(itemId))
                                    excluded.Add(itemId);
                            }
                            grid.Properties!.Filters = filters;
                        }
                    }
                }
            }
            if (debug) logger.Info($"[Olympus][CheckBlacklists] Applied {itemType} blacklist to Containers.");
        }

        private void LooBlacklist(ItemConfig? itemConfig, List<string> itemIds, bool debug, string itemType)
        {
            foreach (var itemId in itemIds)
            {
                if (!itemConfig.LootableItemBlacklist.Contains(itemId)) itemConfig.LootableItemBlacklist.Add(itemId);
                foreach (var limitLoose in lootConfig.StaticItemWeightAdjustment.Values)
                {
                    if (!limitLoose.ContainsKey(itemId))
                        limitLoose[itemId] = 0;
                }
            }
            if (debug) logger.Info($"[Olympus][CheckBlacklists] Applied {itemType} blacklist to Loose Loot.");
        }

        private void AirBlacklist(List<string> itemIds, bool debug, string itemType)
        {
            foreach (var itemId in itemIds)
            {
                foreach (var limitAir in airdropConfig.Loot.Values)
                {
                    if (!limitAir.ItemBlacklist.Contains(itemId)) limitAir.ItemBlacklist.Add(itemId);
                }
            }
            if (debug) logger.Info($"[Olympus][CheckBlacklists] Applied {itemType} blacklist to Airdrop.");
        }
    }
}
