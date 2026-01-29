using MountOlympus.Helpers;
using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Helpers;
using SPTarkov.Server.Core.Models.Spt.Mod;
using SPTarkov.Server.Core.Models.Utils;
using SPTarkov.Server.Core.Services;
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;
using Range = SemanticVersioning.Range;

namespace MountOlympus;

public record ModMetadata : AbstractModMetadata
{
    public override string ModGuid { get; init; } = "com.jbs4bmx.mountolympus";
    public override string Name { get; init; } = "MountOlympus";
    public override string Author { get; init; } = "SPTarkov";
    public override List<string>? Contributors { get; init; }
    public override SemanticVersioning.Version Version { get; init; } = new("4.0.0");
    public override SemanticVersioning.Range SptVersion { get; init; } = new("~4.0.0");
    public override List<string>? Incompatibilities { get; init; }
    public override Dictionary<string, Range>? ModDependencies { get; init; }
    public override string? Url { get; init; }
    public override bool? IsBundleMod { get; init; }
    public override string License { get; init; } = "MIT";
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

[Injectable(TypePriority = OnLoadOrder.PostDBModLoader + 1)]
public class Olympus(
    ISptLogger<Olympus> logger,
    DatabaseService databaseService,
    ModHelper modHelper,
    UpdateItemStatsHelper updateItemStatsHelper,
    IServiceProvider serviceProvider) : IOnLoad
{
    public Task OnLoad()
    {
        var ModPath = modHelper.GetAbsolutePathToModFolder(Assembly.GetExecutingAssembly());
        var OlympusConfig = modHelper.GetJsonDataFromFile<ModConfig>(ModPath, "MOConfig.jsonc");
        var items = databaseService.GetItems();

        var ApoStimItem = items.GetValueOrDefault("661c91746c391e0f5ba82d47");
        var ApoPropItem = items.GetValueOrDefault("661c91741ba0f93d4287c5e6");
        var ApoPainItem = items.GetValueOrDefault("661c91742b5c1493806daf7e");
        var ApoCMSItem = items.GetValueOrDefault("661c9174e9365c70fa18b4d2");

        var debug = OlympusConfig?.EnableDebugLogging == true;
        if (debug) logger.Info($"[Olympus][Init] MOConfig loaded. EnableDebugLogging={OlympusConfig?.EnableDebugLogging}");


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

        var addMags = (AddMagazinesToFirearms?)serviceProvider.GetService(typeof(AddMagazinesToFirearms))
                ?? throw new InvalidOperationException("Failed to resolve AddMagazinesToFirearms from DI.");
        if (debug) logger.Info("[Olympus][Init] Resolved AddMagazinesToFirearms from DI.");

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
        if (debug) logger.Info("[Olympus] ===== ApplyItemsToTraders.Apply() completed. ==========");

        // Add magazines to their respective firearms
        if (debug) logger.Info("[Olympus] ===== Applying AddMagazinesToFirearms. ==========");
        addMags.Apply();
        if (debug) logger.Info("[Olympus] ===== AddMagazinesToFirearms.Apply() completed. ==========");

        // Add buffs to global buff list so they can be used by stimulants
        if (debug) logger.Info("[Olympus] ===== Applying AddStimBuffs. ==========");
        addBuffs.Apply();
        if (debug) logger.Info("[Olympus] ===== AddStimBuffs.Apply() completed. ==========");

        // Apply health and damage effects to stimulants
        if (debug) logger.Info("[Olympus] ===== Applying Health and Damage effects to stims. ==========");
        if (ApoStimItem != null)
        {
            AddStimEffects.AddOrUpdateDamageEffects(ApoStimItem, SPTarkov.Server.Core.Models.Enums.DamageEffectType.Pain, 0, 120, 5);
            AddStimEffects.AddOrUpdateHealthEffects(ApoStimItem, SPTarkov.Server.Core.Models.Enums.HealthFactor.Energy, 180);
            AddStimEffects.AddOrUpdateHealthEffects(ApoStimItem, SPTarkov.Server.Core.Models.Enums.HealthFactor.Hydration, 180);
        }
        if (ApoPropItem != null)
        {
            AddStimEffects.AddOrUpdateDamageEffects(ApoPropItem, SPTarkov.Server.Core.Models.Enums.DamageEffectType.Pain, 0, 120, 5);
            AddStimEffects.AddOrUpdateDamageEffects(ApoPropItem, SPTarkov.Server.Core.Models.Enums.DamageEffectType.Contusion, 0, 120, 0);
            AddStimEffects.AddOrUpdateDamageEffectsWithCost(ApoPropItem, SPTarkov.Server.Core.Models.Enums.DamageEffectType.LightBleeding, 0, 0, 120, 0, 100, 100);
            AddStimEffects.AddOrUpdateDamageEffectsWithCost(ApoPropItem, SPTarkov.Server.Core.Models.Enums.DamageEffectType.HeavyBleeding, 0, 0, 120, 0, 100, 100);
            AddStimEffects.AddOrUpdateDamageEffects(ApoPropItem, SPTarkov.Server.Core.Models.Enums.DamageEffectType.RadExposure, 0, 120, 0);
            AddStimEffects.AddOrUpdateHealthEffects(ApoPropItem, SPTarkov.Server.Core.Models.Enums.HealthFactor.Energy, 180);
            AddStimEffects.AddOrUpdateHealthEffects(ApoPropItem, SPTarkov.Server.Core.Models.Enums.HealthFactor.Hydration, 180);
        }
        if (ApoPainItem != null)
        {
            AddStimEffects.AddOrUpdateDamageEffects(ApoPainItem, SPTarkov.Server.Core.Models.Enums.DamageEffectType.Pain, 0, 120, 5);
            AddStimEffects.AddOrUpdateDamageEffects(ApoPainItem, SPTarkov.Server.Core.Models.Enums.DamageEffectType.Contusion, 0, 120, 0);
        }
        if (ApoCMSItem != null)
        {
            AddStimEffects.AddOrUpdateDamageEffectsWithCost(ApoCMSItem, SPTarkov.Server.Core.Models.Enums.DamageEffectType.LightBleeding, 0, 0, 120, 0, 100, 100);
            AddStimEffects.AddOrUpdateDamageEffectsWithCost(ApoCMSItem, SPTarkov.Server.Core.Models.Enums.DamageEffectType.HeavyBleeding, 0, 0, 120, 0, 100, 100);
            AddStimEffects.AddOrUpdateDamageEffectsWithCost(ApoCMSItem, SPTarkov.Server.Core.Models.Enums.DamageEffectType.DestroyedPart, 0, 0, 0, 0, 100, 100);
            AddStimEffects.AddOrUpdateDamageEffectsWithCost(ApoCMSItem, SPTarkov.Server.Core.Models.Enums.DamageEffectType.Fracture, 0, 0, 0, 0, 100, 100);
        }
        if (debug) logger.Info("[Olympus] ===== Applying Health and Damage effects completed. ==========");

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
        public bool BlacklistStims { get; set; }
        public bool BlacklistRigs { get; set; }
        public bool BlacklistMags { get; set; }

        // Developer / Debug
        public bool EnableDebugLogging { get; set; }
    }
}