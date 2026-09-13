using MountOlympus.Helpers;
using SPTarkov.Common.Logger;
using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Helpers.Server;
using SPTarkov.Server.Core.Models.Spt.Mod;
using SPTarkov.Server.Core.Models.Spt.Tables;
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace MountOlympus;

public record ModMetadata : IModMetadata
{
    public string ModGuid { get; init; } = "com.jbs4bmx.mountolympus";
    public string Name { get; init; } = "MountOlympus";
    public string Author { get; init; } = "jbs4bmx";
    public List<string>? Contributors { get; init; } = ["FLIGHTxS4L"];
    public SemanticVersioning.Version Version { get; init; } = new("4.1.3");
    public SemanticVersioning.Range SptVersion { get; init; } = new("~4.1.3");
    public List<string>? Incompatibilities { get; init; } = null;
    public Dictionary<string, SemanticVersioning.Range>? ModDependencies { get; init; } = null;
    public string? Url { get; init; } = "https://github.com/jbs4bmx/Olympus";
    public string License { get; init; } = "MIT";
    public bool HasPrepatcher { get; init; } = false;
}

public sealed class ItemConfigRoot { [JsonPropertyName("items")] public List<ItemConfigItem> Items { get; set; } = []; }

public sealed class ItemConfigItem
{
    public bool Enabled { get; set; } = true;
    public string NewId { get; set; } = string.Empty;
    public string SourceTpl { get; set; } = string.Empty;
    public string ParentId { get; set; } = string.Empty;
    public string HandbookParentId { get; set; } = string.Empty;
    public int HandbookPriceRoubles { get; set; }
    public Dictionary<string, LocaleDetails> Locales { get; set; } = [];
    public Dictionary<string, JsonElement>? Props { get; set; }
    [JsonIgnore] public string? SourceFile { get; set; }
}

[Injectable(TypePriority = OnLoadOrder.Preload + 1000)]
public class Olympus(SptLogger<Olympus> logger, TemplateTable templateTable, ModHelper modHelper, UpdateItemStatsHelper updateItemStatsHelper, IServiceProvider serviceProvider) : IOnLoad
{
    public Task OnLoadAsync(CancellationToken cancellationToken)
    {
        var pathToMod = System.IO.Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)!;
        var cfgPath = modHelper.GetJsonDataFromFile<ModConfig>(pathToMod, "MOConfig.jsonc");

        //var items = templateTable.GetItems();
        var items = templateTable.Items;

        var ApoStimItem = items.GetValueOrDefault("661c91746c391e0f5ba82d47");
        var ApoPropItem = items.GetValueOrDefault("661c91741ba0f93d4287c5e6");
        var ApoPainItem = items.GetValueOrDefault("661c91742b5c1493806daf7e");
        var ApoCMSItem = items.GetValueOrDefault("661c9174e9365c70fa18b4d2");

        var debug = cfgPath?.EnableDebugLogging == true;
        if (debug) logger.Info($"[Olympus][Init] MOConfig loaded. EnableDebugLogging={cfgPath?.EnableDebugLogging}");


        // Resolve helpers from DI
        var createStims = (AddItemsStimsHelper?)serviceProvider.GetService(typeof(AddItemsStimsHelper))
                ?? throw new InvalidOperationException("Failed to resolve AddItemsStimsHelper from DI.");
        if (debug) logger.Info("[Olympus][Init] Resolved AddItemsStimsHelper from DI.");

        var createRigs = (AddItemsRigsHelper?)serviceProvider.GetService(typeof(AddItemsRigsHelper))
                ?? throw new InvalidOperationException("Failed to resolve AddItemsRigsHelper from DI.");
        if (debug) logger.Info("[Olympus][Init] Resolved AddItemsRigsHelper from DI.");

        var createMags = (AddItemsMagsHelper?)serviceProvider.GetService(typeof(AddItemsMagsHelper))
                ?? throw new InvalidOperationException("Failed to resolve AddItemsMagazinesHelper from DI.");
        if (debug) logger.Info("[Olympus][Init] Resolved AddItemsMagsHelper from DI.");

        var applyItems = (AddTraderAssort?)serviceProvider.GetService(typeof(AddTraderAssort))
                ?? throw new InvalidOperationException("Failed to resolve ApplyItemsToTraders from DI.");
        if (debug) logger.Info("[Olympus][Init] Resolved ApplyItemsToTraders from DI.");

        var addBuffs = (AddStimBuffs?)serviceProvider.GetService(typeof(AddStimBuffs))
                ?? throw new InvalidOperationException("Failed to resolve AddStimBuffs from DI.");
        if (debug) logger.Info("[Olympus][Init] Resolved AddStimBuffs from DI.");

        /*
            Removed AddMagazinesToFirearms from DI because it was no longer required.
            The functionality is now handled in PostLoad.
        */
        //var addMags = (AddMagazinesToFirearms?)serviceProvider.GetService(typeof(AddMagazinesToFirearms))
        //        ?? throw new InvalidOperationException("Failed to resolve AddMagazinesToFirearms from DI.");
        //if (debug) logger.Info("[Olympus][Init] Resolved AddMagazinesToFirearms from DI.");

        var checkBlacklists = (CheckBlacklists?)serviceProvider.GetService(typeof(CheckBlacklists))
                ?? throw new InvalidOperationException("Failed to resolve CheckOlympusItemBlacklists from DI.");
        if (debug) logger.Info("[Olympus][Init] Resolved CheckBlacklists from DI.");


        // Create items from clone helper.
        if (debug) logger.Info("[Olympus] ===== Creating items via CreateItemsFromCloneHelper(). ==========");
        try
        {
            createStims.Apply();
            createRigs.Apply();
            createMags.Apply();
        }
        catch (Exception ex)
        {
            logger.Warning($"[Olympus] Failed to create items: {ex.Message}");
        }
        if (debug) logger.Info("[Olympus] ===== CreateItemsFromCloneHelper() completed. ==========");

        // Apply items to trader assorts.
        if (debug) logger.Info("[Olympus] ===== Applying trader items merge (ApplyItemsToTraders). ==========");
        // applyItems.AssortProcessor(MongoId "trader", MongoId "itemId", MongoId "assortId", int itemBuyMax, int itemPrice, int itemLoyaltyLevel)
        applyItems.AssortProcessor("54cb57776803fa99248b456e", "661c91746c391e0f5ba82d47", "6816beb8e914af7d836b502c", 1, 15545, 2);
        applyItems.AssortProcessor("54cb57776803fa99248b456e", "661c91741ba0f93d4287c5e6", "6816beb8fa94701c6b382e5d", 1, 15545, 2);
        applyItems.AssortProcessor("54cb57776803fa99248b456e", "661c91742b5c1493806daf7e", "6816beb8dbf5890ae76314c2", 2, 15545, 1);
        applyItems.AssortProcessor("54cb57776803fa99248b456e", "661c9174e9365c70fa18b4d2", "6816beb81fe87340c69bd52a", 2, 15545, 1);
        applyItems.AssortProcessor("5ac3b934156ae10c4430e83c", "661c91744502ba91ef63c8d7", "6816beb839dcf8e6420b7a15", 1, 23315, 1);
        applyItems.AssortProcessor("5ac3b934156ae10c4430e83c", "661c917426ba940d7138e5cf", "6816beb818f4269d5cea30b7", 1, 7775, 1);
        applyItems.AssortProcessor("5ac3b934156ae10c4430e83c", "661c9174018549befc3a7d62", "6816beb85fc376e9b012da48", 1, 23315, 1);
        applyItems.AssortProcessor("5ac3b934156ae10c4430e83c", "661c9174d9718c60a32fe5b4", "6816beb84b37efd952a0c618", 1, 23315, 1);
        applyItems.AssortProcessor("5ac3b934156ae10c4430e83c", "661c9174a371d90e62b8f5c4", "6816beb843df2b6958c0ea71", 1, 19429, 1);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb871b09465ad3efc82", "6816beb80e645fb792a183dc", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb851e6280ad379c4fb", "6816beb876d9cb015a2f8e43", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb841be398af5270d6c", "6816beb88e9b537f4da16c02", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb88e62a50f19bd74c3", "6816beb81e87a953fc4b62d0", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb8102946dabf3ec578", "6816beb88edf2710b9ca4635", 5, 3960, 2);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb82130bcd49ae6f785", "6816beb8a135f724c8d06b9e", 5, 3960, 2);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb8d38f0ae629c7514b", "6816beb87c305a816bed49f2", 5, 3960, 2);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb8b26ca97e413085df", "6816beb80a6425cb198d7ef3", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb806be7c5f8912a4d3", "6816beb8d4f6973ea0c28b51", 5, 3960, 2);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb8280ec5a63bdf4971", "6816beb8402f7b9ecd3a5618", 5, 3960, 2);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb8da95831eb6402fc7", "6816beb8f06a73d98b2e15c4", 5, 3960, 2);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb801d8937ace4b265f", "6816beb83d58fbe607c9a142", 7, 3960, 1);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb8029dbaef8574136c", "6816beb83dec546a09bf8127", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb80312f467c9bea8d5", "6816beb83ec1f967ba8d5042", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb8031bcf82a967e4d5", "6816beb8408b372af95de61c", 5, 3960, 2);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb806c372a491ebd85f", "6816beb84175a83fc9d2be06", 5, 3960, 2);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb8076854e1afb3d92c", "6816beb842fb156987dc0e3a", 5, 3960, 2);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb80983fdca5461b27e", "6816beb843fb6ed851a07c92", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb80ab85c36ef42719d", "6816beb8463cf8b72e1590da", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb80d7ab48f6c23195e", "6816beb846dfe05197823abc", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb80d9f482b6e571a3c", "6816beb846fb8d9a251e37c0", 5, 3960, 2);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb80df5976e243ab8c1", "6816beb848ed75c1f30a629b", 5, 3960, 2);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb80e865dabf4219c37", "6816beb84c6872b1d39e0f5a", 5, 3960, 2);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb8120af4deb8c35679", "6816beb84cb01286539dfa7e", 7, 3960, 1);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb812a48ef976dc053b", "6816beb85023df7c4ab198e6", 7, 3960, 1);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb813b4de9cf28a5706", "6816beb85096e1d2f783bca4", 7, 3960, 1);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb815034f78ed6c92ba", "6816beb85184f7c963e2a0db", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb815af2ed894670b3c", "6816beb8523efd4c0976b81a", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb816e84095ca273dfb", "6816beb85429ef71b38ac06d", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb8194826f7e5d0c3ba", "6816beb856d9384bcf7ae120", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb81a73d5c2b890e4f6", "6816beb8570a8df6c19eb324", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb81bf95adc2436780e", "6816beb8573d8a9fe4061cb2", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb81d379c8624af5e0b", "6816beb8580e4c96b21f3a7d", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb81f03c7259ea86b4d", "6816beb858769a4d12ebc0f3", 5, 3960, 2);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb82306ab59f7e4dc18", "6816beb85901c48273b6efda", 5, 3960, 2);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb8241f0c6897bd35ea", "6816beb859d031b824cefa76", 7, 3960, 1);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb82708b5a41d96ec3f", "6816beb85be0cf897d14236a", 7, 3960, 1);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb8270981ce3f64da5b", "6816beb85d4f1cab7869230e", 7, 3960, 1);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb8278a1cd59be0f634", "6816beb85edac810736f492b", 7, 3960, 1);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb828dce751ab36f049", "6816beb85fa760b1d93248ec", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb82b5e4a89371fdc06", "6816beb860d84b357e2cf9a1", 5, 3960, 2);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb82dac93e574f1b068", "6816beb8628d4307c1fa95be", 7, 3960, 1);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb82e640fc78931bda5", "6816beb86298f4e30d7bca15", 5, 3960, 2);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb82f46ab87e59dc103", "6816beb864a3e5df89cb1207", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb82fc1b6d3e5a49078", "6816beb864ebcf2d0a375981", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb831e25c084fb79da6", "6816beb8652c3b87ed4109fa", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb83426dcf15a780b9e", "6816beb865f13dcb89e7a024", 5, 3960, 2);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb8356f0e2c419ab87d", "6816beb86958dc74201ebf3a", 7, 3960, 1);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb8359e47081cbf6ad2", "6816beb86fe1803b79c25a4d", 5, 3960, 2);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb836c2f87de5b9104a", "6816beb870415fac2be3689d", 5, 3960, 2);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb839bf42ce510a7d68", "6816beb8709ab813c5e6d42f", 7, 3960, 1);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb83b82d7e6c9af5041", "6816beb870ba8d62fe4c3591", 5, 3960, 2);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb8fc419e7a2d8305b6", "68f2f70e40753c8f2b91ead6", 5, 3960, 2);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6816beb8fe92d4a031c56b78", "68f2f70efd72c9e358ab0461", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "68f2f70e436d9a8072fb5e1c", "68f2f70e71a9fd0cb56348e2", 7, 3960, 1);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "68f2f70e290d8b3c5a746f1e", "68f2f70e907c1326b584defa", 7, 3960, 1);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "68f2f70efe6c3d729a0b8541", "68f2f70e84ab6910de3f27c5", 7, 3960, 1);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "68f2f70e97018efab2c3654d", "68f2f70e09bdf3572c6e4a18", 5, 3960, 2);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "68f2f70e56f82ab140c9e73d", "68f2f70e294de3a5f817b60c", 5, 3960, 2);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "68f2f70e5e1f837429a6bc0d", "68f2f70e1e6589a3dbf4c072", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "68f2f70e30264efab7c891d5", "68f2f70e86a907d4e1c35fb2", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "68f2f70ee3f58b740d126c9a", "68f2f70e9b2dce0378a6f541", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "68f2f70eb38c257af46d9e10", "68f2f70e14be56ac79d2f830", 5, 3960, 2);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "68f2f70e1bf03c76a4529e8d", "68f2f70ea9f061384de75bc2", 5, 3960, 2);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "68f2f70e7dace16582f0349b", "68f2f70e1b4dc03f7e26a895", 5, 3960, 2);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "68f2f70e73486c0ad15be2f9", "68f2f70ea7b6fdce92105483", 5, 3960, 2);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "68f2f70e3d8692aeb471f0c5", "68f2f70e84b3f9ca5e2706d1", 5, 3960, 2);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "68f2f70eb2c38f9a7d06415e", "68f2f70e6da52e3b41c97f80", 5, 3960, 2);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "68f2f70e46783c512f9a0edb", "68f2f70e8ac47e23bf56901d", 5, 3960, 2);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "68f2f70efd97b56ca81204e3", "68f2f70e8c46ae3d921b750f", 7, 3960, 1);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "68f2f70e069ed2c1ab5738f4", "68f2f70e30b918f6a74ecd25", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "68f2f70e79f3c8e0bda45126", "68f2f70e0f7cdab432e58196", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "68f2f70e0b2fe59176a3cd48", "68f2f70e51a6df273bc8e940", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "68f2f70e9d4f2ea17b3c6085", "68f2f70e1c9fb204a5d3867e", 5, 3960, 2);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "68f2f70e82f357c01ebd946a", "68f2f70e4fa37ce62185b9d0", 5, 3960, 2);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "68f2f70eea56024b1387f9cd", "68f2f70f795d420cba8fe136", 7, 3960, 1);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "68f2f70ed7521ba38694fce0", "68f2f70f7eb21c04f8d936a5", 5, 3960, 2);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "68f2f70e37e0458bf16acd29", "68f2f70fe42a905c1d6b38f7", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "68f2f70e6d198f7eabc05324", "68f2f70f69e4d0521a73cb8f", 7, 3960, 1);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "661c917436409c2d18e5afb7", "6816beb8d7b63ce01482af59", 7, 3960, 1);

        // WTT-Armory compatibility: new-caliber magazines (Jaeger, matching the rest of the mag catalog)
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "436d497b0343516d521250c3", "d3707eeb2b6392943e7ae144", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "2263e611456a811f6543286b", "b07644638995fe4f5117f360", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "2dfd06092497541d0ebeb653", "45efa08ecdf342eb3f03a6b4", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "aa6fa1cf01e42a764c053809", "d5fbd102050080ea1098716d", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "c7b912cac5d666dd0271d2cd", "c81fa5c6e3f2775878e4c7ca", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "c7b912cac5d666dd0271d2ce", "f310dc7fdb3c7ed015077cda", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "964d1222985c11c2c84e7f3f", "c40ced5577263bf94debbc5d", 5, 3960, 3);

        // WTT-Armory compatibility: per-weapon custom-art magazines (Jaeger)
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "b0c383075ea77729b051c3a7", "f43629e8a7d24f0ceb56c621", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "4c9fcdee95bffe9ff8a07a44", "7113f6718c1c5fa2295380b5", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "45c81346d9461ee8f9981008", "a3e6a1e743e929569bbdee55", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "9589359907fca6a0a07cfbfd", "5815cca0a1ffde0b661886e3", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "a01c04b3231dc39cdbab22ae", "d67a026d0a78eac2697b9b97", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "00da199defbc2fbcb10f9ec5", "c8f10a323358ebf8511c519f", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "a085d83bce3a727583a9f414", "29ee04c37f858c268f0902a1", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "45be94029e87ff2634e7de93", "b7a5f9d935081574617ef8b1", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "a8dec5909e063bfa71d40ba9", "6fec47771936b25351bda7a7", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "d85093c45145fce1aba14c45", "6ffaa98e95116a372e948bd8", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "9d78b09b51dac5d49af2a81c", "45b5280e4ce0034286303b23", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "7fe6b9b26d25a30899bcb7fe", "3774331221a8bfa19e20ece3", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "b2830544fa5df93204d612a5", "374c9fa107d752e22da153a9", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "73050ee0e3b3b7dcf0c3f01b", "464cc113911a6440fdd334c3", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "46bfca1fcdec5872ffeb284a", "d56289fff65c7a609cbaea5a", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "56543418653ccdec6334d1ed", "b4d22acb7bd3688e66f0dc1f", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "f3aeb467cb54f1773dc408da", "f2b67d9069807c1142aa5e97", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "88da98b9b2b64c2c2f790b72", "3d48fc83797657553281505b", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "20d5db641f028f1c3d2d718e", "e9a54f27d17102dd421555e8", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "6f88b582e3e9b44dfde186cf", "fac2a705f26a6442687aacc1", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "de55fbc58a6dd78332ae893f", "a313f011abc222df311ebb04", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "16ac01c1c47ee92b45434aa9", "97e80ccbc0e8bf226537655d", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "516ec1636d395b9a5269770f", "6c846f06dcb27b19d82f1ea4", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "aad8c4444a1e860e8f4a0ddd", "1b9bc07e713ebce2d974c4ba", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "00d9f8906ba2da8037d48b10", "5fd1e6751c2590393e15682d", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "3d615617813d2601ba945692", "0485d9ae4635bd0016812729", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "3c092b4c4d6c6f55690a8498", "f2342e5d3cfd3918f7fb5cb1", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "7535716f71efa3a1f680865c", "16fc3727b9826fdf87fde5a7", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "3d9ac26ca6383bb3341866ac", "7e682b45fa52c897c2043a73", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "b2333cdd7256a0ecaf179b4f", "a46679b5e577159e7ae997ce", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "b7766cf6a574c79b608986d0", "7efafddbaf4c1d7554820956", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "11e1eff49d397189414ab868", "453a5e9daebf50222934d3ef", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "7148eb9b6953df70b0bda525", "c68a760a49bce2b2f8b50d18", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "92817fb92a313fa21ec59057", "d5315bd0f92be2d6bef83608", 5, 3960, 3);

        // WTT Content Backport compatibility (Jaeger)
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "0d084425cb03c37566b8c1f4", "6b58c219e333ade0a2c5876c", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "ce89fa83336f1c07c1e494a1", "5b7b22e1e54a9089ec8be42b", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "e4e53415475b032d7dde6ee9", "946516305442cba51ffb6c01", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "5e8798197d76ce668b83e84d", "51be02f0c152be78e2143ffb", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "4cc2529d8711f4aa22315ffa", "1e21edc4e2f067d2a2f051b7", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "8c4d94ec908ddd3fa01ca6f6", "082ae99aa02ea03d5f4f44fe", 5, 3960, 3);
        applyItems.AssortProcessor("5c0647fdd443bc2504c2d371", "75c571c4b1155f3a4d1ffd9d", "9d4fac0cbe9e70cb015b08bc", 5, 3960, 3);
        if (debug) logger.Info("[Olympus] ===== ApplyItemsToTraders.Apply() completed. ==========");

        // Add magazines to their respective firearms
        // if (debug) logger.Info("[Olympus] ===== Applying AddMagazinesToFirearms. ==========");
        // addMags.Apply();
        // if (debug) logger.Info("[Olympus] ===== AddMagazinesToFirearms.Apply() completed. ==========");
        /*
            Magazine-to-firearm compatibility (AddMagazinesToFirearms) now runs on its own at PostLoad,
            not here - see Helpers/AddMagazinesToFirearms.cs. This lets it safely reference firearms added
            by other mods.
            Credit: FLIGHTxS4L
        */

        // Add buffs to global buff list so they can be used by stimulants
        if (debug) logger.Info("[Olympus] ===== Applying AddStimBuffs. ==========");
        addBuffs.Apply();
        if (debug) logger.Info("[Olympus] ===== AddStimBuffs.Apply() completed. ==========");

        // Update some item properties
        if (debug) logger.Info("[Olympus] ===== Updating item stats.");
        updateItemStatsHelper.Update();
        if (debug) logger.Info("[Olympus] ===== UpdateItemStatsHelper.Update() completed. ==========");

        // Apply blacklist options
        if (debug) logger.Info("[Olympus] ===== Applying CheckBlacklists.Apply(). ==========");
        checkBlacklists.Apply();
        if (debug) logger.Info("[Olympus] ===== CheckBlacklists.Apply() completed. ==========");

        return Task.CompletedTask;
    }
    
    public class ModConfig
    {
        // Stim Config
        public int StimUseTimeSeconds { get; set; }
        public int PainSuppressionDurationSeconds { get; set; }
        public int EnergyRegenDurationSeconds { get; set; }
        public int HydrationRegenDurationSeconds { get; set; }

        // Rig Config
        public int Herc1RigWeightDrop { get; set; }
        public int Herc2RigWeightDrop { get; set; }
        public int Herc2ArmorAmount { get; set; }
        public int PackGridVertical { get; set; }
        public int PackGridHorizontal { get; set; }
        public int AthenaArmorAmount { get; set; }
        public int HelmetArmorAmount { get; set; }

        // Magazine Config
        public int AccuracyBonusAmount { get; set; }
        public int RecoilReductionAmount { get; set; }
        public int ErgoIncreaseAmount { get; set; }
        public int VelocityIncreaseAmount { get; set; }
        public int MalfunctionChance { get; set; }
        public bool SetAllMagsLoyaltyLevelOne { get; set; }

        // Blacklist Config
        public bool BlacklistStimsFromBots { get; set; }
        public bool BlacklistStimsFromPMCs { get; set; }
        public bool BlacklistStimsFromRaidContainers { get; set; }
        public bool BlacklistStimsFromLooseLoot { get; set; }
        public bool BlacklistStimsFromAirdrop { get; set; }
        public bool BlacklistRigsFromBots { get; set; }
        public bool BlacklistRigsFromPMCs { get; set; }
        public bool BlacklistRigsFromRaidContainers { get; set; }
        public bool BlacklistRigsFromLooseLoot { get; set; }
        public bool BlacklistRigsFromAirdrop { get; set; }
        public bool BlacklistMagsFromBots { get; set; }
        public bool BlacklistMagsFromPMCs { get; set; }
        public bool BlacklistMagsFromRaidContainers { get; set; }
        public bool BlacklistMagsFromLooseLoot { get; set; }
        public bool BlacklistMagsFromAirdrop { get; set; }

        // Developer Debug
        public bool EnableDebugLogging { get; set; }
    }
}