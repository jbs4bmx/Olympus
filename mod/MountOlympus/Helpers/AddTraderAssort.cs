using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Helpers;
using SPTarkov.Server.Core.Models.Common;
using SPTarkov.Server.Core.Models.Eft.Common.Tables;
using SPTarkov.Server.Core.Models.Utils;
using SPTarkov.Server.Core.Services;
using System.Reflection;
using static MountOlympus.Olympus;

namespace MountOlympus.Helpers
{
    [Injectable(TypePriority = OnLoadOrder.PostDBModLoader + 12)]
    public class AddTraderAssort(
        ISptLogger<AddTraderAssort> logger,
        DatabaseService databaseService,
        ModHelper modHelper)
    {
        public void AssortProcessor(MongoId traderId, MongoId item, MongoId assortId, int buymax, int price, int loyalty)
        {
            var ModPath = modHelper.GetAbsolutePathToModFolder(Assembly.GetExecutingAssembly());
            var OlympusConfig = modHelper.GetJsonDataFromFile<ModConfig>(ModPath, "MOConfig.jsonc");
            var debug = OlympusConfig?.EnableDebugLogging == true;
            var trader = databaseService.GetTrader(traderId);
            var assort = trader.Assort;

            if (assort != null)
            {
                if (!(assort.Items.Any(i => i.Template == item)))
                {
                    if (debug) logger.Info($"[Olympus][AddTraderAssort] Adding item {item} to trader {traderId} assort.");

                    // Main assort addition
                    assort.Items.Add(new Item
                    {
                        Id = assortId,
                        Template = item,
                        ParentId = "hideout",
                        SlotId = "hideout",
                        Upd = new Upd
                        {
                            UnlimitedCount = false,
                            StackObjectsCount = 9999999,
                            BuyRestrictionMax = buymax,
                            BuyRestrictionCurrent = 0
                        }
                    });

                    // Barter scheme
                    assort.BarterScheme[assortId] = [
                        [
                            new BarterScheme {
                                Count = price,
                                Template = ItemTpl.MONEY_ROUBLES
                            }
                        ]
                    ];

                    // Default loyalty
                    assort.LoyalLevelItems[assortId] = loyalty;
                    if (debug) logger.Info($"[Olympus][AddTraderAssort] Added item {item} to {traderId} with assortId {assortId}.");
                }
                else
                {
                    if (debug) logger.Info($"[Olympus][AddTraderAssort] Trader {traderId} already has item {item}; skipping.");
                }
            }
            else
            {
                 if (debug) logger.Info($"[Olympus][AddTraderAssort] Trader {traderId} has no assort or trader assort cannot be found; cannot add item {item}.");
            }
        }
    }
}
