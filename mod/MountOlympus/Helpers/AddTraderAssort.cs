using SPTarkov.Common.Logger;
using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Helpers.Server;
using SPTarkov.Server.Core.Models.Common;
using SPTarkov.Server.Core.Models.Eft.Common.Tables;
using SPTarkov.Server.Core.Models.Enums;
using SPTarkov.Server.Core.Models.Spt.Tables;
using System.Reflection;
using static MountOlympus.Olympus;

namespace MountOlympus.Helpers
{
    [Injectable(TypePriority = OnLoadOrder.Preload + 1004)]
    public class AddTraderAssort(SptLogger<AddTraderAssort> logger, TradersTable tradersTable, ModHelper modHelper)
    {
        public void AssortProcessor(MongoId traderId, MongoId item, MongoId assortId, int buymax, int price, int loyalty)
        {
            var pathToMod = System.IO.Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)!;
            var cfgPath = modHelper.GetJsonDataFromFile<ModConfig>(pathToMod, "MOConfig.jsonc");

            var debug = cfgPath?.EnableDebugLogging == true;
            var trader = tradersTable.GetTrader(traderId);
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
