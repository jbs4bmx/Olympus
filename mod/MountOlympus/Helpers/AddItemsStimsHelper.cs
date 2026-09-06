using SPTarkov.Common.Logger;
using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Helpers.Server;
using SPTarkov.Server.Core.Models.Eft.Common.Tables;
using SPTarkov.Server.Core.Models.Enums;
using SPTarkov.Server.Core.Models.Spt.Mod;
using SPTarkov.Server.Core.Services.Modding.Custom;
using System.Reflection;
using static MountOlympus.Olympus;


namespace MountOlympus.Helpers;

[Injectable(TypePriority = OnLoadOrder.Preload + 1001)]
internal class AddItemsStimsHelper(SptLogger<AddItemsStimsHelper> logger, CustomItemService customItemService, ModHelper modHelper)
{
    public void Apply()
    {
        var pathToMod = System.IO.Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)!;
        var cfgPath = modHelper.GetJsonDataFromFile<ModConfig>(pathToMod, "MOConfig.jsonc");

        var debug = cfgPath?.EnableDebugLogging == true;

        customItemService.CreateItemFromClone(ApoStim(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsStimsHelper] Created Item: ApoStim");
        customItemService.CreateItemFromClone(ApoProp(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsStimsHelper] Created Item: ApoProp");
        customItemService.CreateItemFromClone(ApoPain(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsStimsHelper] Created Item: ApoPain");
        customItemService.CreateItemFromClone(ApoCMS(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsStimsHelper] Created Item: ApoCMS");
    }

    public static NewItemFromCloneDetails ApoStim(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            ItemTplToClone = "5ed5166ad380ab312177c100",
            NewId = "661c91746c391e0f5ba82d47",
            NewItemName = "apollo_stim",
            ParentId = BaseClasses.STIMULATOR,
            HandbookPriceRoubles = 15545,
            HandbookParentId = "5b47574386f77428ca22b33a",
            FleaPriceRoubles = 12000,
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Apollo's Stim",
                    ShortName = "ApoStim",
                    Description = "Apollo's own concoction made from the root of the peony and many other godly essences. It temporarily enhances many of your skills."
                }
            },
            OverrideProperties = new TemplateItemProperties
            {
                BackgroundColor = "red",
                BodyPartPriority = [],
                ExaminedByDefault = false,
                Description = "Apollo's own concoction made from the root of the peony and many other godly essences. It temporarily enhances many of your skills.",
                ExamineExperience = 100,
                LootExperience = 20,
                Name = "Apollo's Stim",
                ShortName = "ApoStim",
                StimulatorBuffs = "BuffsApolloStim",
                Weight = 0.01,
                EffectsDamage = new Dictionary<DamageEffectType, EffectsDamageProperties>
                {
                    [DamageEffectType.Pain] = new EffectsDamageProperties
                    {
                        Delay = 0,
                        Duration = 120,
                        FadeOut = 5
                    }
                },
                EffectsHealth = new Dictionary<HealthFactor, EffectsHealthProperties>
                {
                    [HealthFactor.Energy] = new EffectsHealthProperties
                    {
                        Value = 180
                    },
                    [HealthFactor.Hydration] = new EffectsHealthProperties
                    {
                        Value = 180
                    }
                },
                MedEffectType = "duringUse",
                MedUseTime = cfgPath.StimUseTimeSeconds
            }
        };
    }

    public static NewItemFromCloneDetails ApoProp(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            ItemTplToClone = "5c0e530286f7747fa1419862",
            NewId = "661c91741ba0f93d4287c5e6",
            NewItemName = "apollo_propital",
            ParentId = BaseClasses.STIMULATOR,
            HandbookPriceRoubles = 15545,
            HandbookParentId = "5b47574386f77428ca22b33a",
            FleaPriceRoubles = 12000,
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Apollo's Propital",
                    ShortName = "ApoProp",
                    Description = "The ultimate first-aid stimulant, said to have been used by Apollo himself to heal the wounds of fallen warriors on the battlefield."
                }
            },
            OverrideProperties = new TemplateItemProperties
            {
                BackgroundColor = "red",
                BodyPartPriority = [],
                Description = "The ultimate first-aid stimulant, said to have been used by Apollo himself to heal the wounds of fallen warriors on the battlefield.",
                ExaminedByDefault = false,
                ExamineExperience = 100,
                LootExperience = 20,
                Name = "Apollo's Propital",
                ShortName = "ApoProp",
                StimulatorBuffs = "BuffsApollosPropital",
                Weight = 0.01,
                EffectsDamage = new Dictionary<DamageEffectType, EffectsDamageProperties>
                {
                    [DamageEffectType.Pain] = new EffectsDamageProperties
                    {
                        Delay = 0,
                        Duration = 120,
                        FadeOut = 5
                    },
                    [DamageEffectType.Contusion] = new EffectsDamageProperties
                    {
                        Delay = 0,
                        Duration = 120,
                        FadeOut = 0
                    },
                    [DamageEffectType.RadExposure] = new EffectsDamageProperties
                    {
                        Delay = 0,
                        Duration = 120,
                        FadeOut = 0
                    },
                    [DamageEffectType.LightBleeding] = new EffectsDamageProperties
                    {
                        Cost = 0,
                        Delay = 0,
                        Duration = 120,
                        FadeOut = 0,
                        HealthPenaltyMin = 100,
                        HealthPenaltyMax = 100
                    },
                    [DamageEffectType.HeavyBleeding] = new EffectsDamageProperties
                    {
                        Cost = 0,
                        Delay = 0,
                        Duration = 120,
                        FadeOut = 0,
                        HealthPenaltyMin = 100,
                        HealthPenaltyMax = 100
                    }

                },
                EffectsHealth = new Dictionary<HealthFactor, EffectsHealthProperties>
                {
                    [HealthFactor.Energy] = new EffectsHealthProperties
                    {
                        Value = 180
                    },
                    [HealthFactor.Hydration] = new EffectsHealthProperties
                    {
                        Value = 180
                    }
                },
                MedEffectType = "duringUse",
                MedUseTime = cfgPath.StimUseTimeSeconds
            }
        };
    }

    public static NewItemFromCloneDetails ApoPain(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            ItemTplToClone = "5c0e533786f7747fa23f4d47",
            NewId = "661c91742b5c1493806daf7e",
            NewItemName = "apollo_pain",
            ParentId = "5448f3a64bdc2d60728b456a",
            HandbookPriceRoubles = 15545,
            HandbookParentId = "5b47574386f77428ca22b33a",
            FleaPriceRoubles = 12000,
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Apollo's Pain",
                    ShortName = "ApoPain",
                    Description = "Created by Apollo's son Asclepius, this simple pain medication helped many warriors push through the pain to win victories over their enemies."
                }
            },
            OverrideProperties = new TemplateItemProperties
            {
                BackgroundColor = "red",
                BodyPartPriority = [],
                Description = "Created by Apollo's son Asclepius, this simple pain medication helped many warriors push through the pain to win victories over their enemies.",
                ExaminedByDefault = false,
                ExamineExperience = 100,
                LootExperience = 20,
                Name = "Apollo's Pain",
                ShortName = "ApoPain",
                StimulatorBuffs = "BuffsApolloPain",
                Weight = 0.01,
                EffectsDamage = new Dictionary<DamageEffectType, EffectsDamageProperties>
                {
                    [DamageEffectType.Pain] = new EffectsDamageProperties
                    {
                        Delay = 0,
                        Duration = 120,
                        FadeOut = 5
                    },
                    [DamageEffectType.Contusion] = new EffectsDamageProperties
                    {
                        Delay = 0,
                        Duration = 120,
                        FadeOut = 0
                    }
                },
                EffectsHealth = [],
                MedEffectType = "duringUse",
                MedUseTime = cfgPath.StimUseTimeSeconds
            }
        };
    }

    public static NewItemFromCloneDetails ApoCMS(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            ItemTplToClone = "5d02778e86f774203e7dedbe",
            NewId = "661c9174e9365c70fa18b4d2",
            NewItemName = "apollo_cms",
            ParentId = "5448f3a64bdc2d60728b456a",
            HandbookPriceRoubles = 15545,
            HandbookParentId = "5b47574386f77428ca22b33a",
            FleaPriceRoubles = 12000,
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Apollo's CMS",
                    ShortName = "ApoCMS",
                    Description = "Not even 100 Blackened limbs can stop the god of healing ! "
                }
            },
            OverrideProperties = new TemplateItemProperties
            {
                BackgroundColor = "red",
                BodyPartPriority = [
                    "Stomach",
                    "RightLeg",
                    "LeftLeg",
                    "RightArm",
                    "LeftArm"
                ],
                Description = "Not even 100 blackened limbs can stop the god of healing!",
                ExaminedByDefault = false,
                ExamineExperience = 100,
                LootExperience = 20,
                Name = "Apollo's CMS",
                ShortName = "ApoCMS",
                Prefab = new Prefab
                {
                    Path = "assets/content/weapons/usable_items/item_syringe/item_stimulator_adrenaline_loot.bundle",
                    Rcid = ""
                },
                UsePrefab = new Prefab
                {
                    Path = "assets/content/weapons/usable_items/item_syringe/item_stimulator_adrenaline_container.bundle",
                    Rcid = ""
                },
                ItemSound = "med_stimulator",
                StimulatorBuffs = "BuffsApolloCMS",
                Height = 1,
                Width = 1,
                Weight = 0.01,
                EffectsDamage = new Dictionary<DamageEffectType, EffectsDamageProperties>
                {
                    [DamageEffectType.DestroyedPart] = new EffectsDamageProperties
                    {
                        Delay = 0,
                        Duration = 0,
                        FadeOut = 0,
                        HealthPenaltyMax = 100,
                        HealthPenaltyMin = 100
                    },
                    [DamageEffectType.Fracture] = new EffectsDamageProperties
                    {
                        Delay = 0,
                        Duration = 0,
                        FadeOut = 0,
                        HealthPenaltyMax = 100,
                        HealthPenaltyMin = 100
                    },
                    [DamageEffectType.LightBleeding] = new EffectsDamageProperties
                    {
                        Cost = 0,
                        Delay = 0,
                        Duration = 120,
                        FadeOut = 0,
                        HealthPenaltyMin = 100,
                        HealthPenaltyMax = 100
                    },
                    [DamageEffectType.HeavyBleeding] = new EffectsDamageProperties
                    {
                        Cost = 0,
                        Delay = 0,
                        Duration = 120,
                        FadeOut = 0,
                        HealthPenaltyMin = 100,
                        HealthPenaltyMax = 100
                    }
                },
                EffectsHealth = [],
                MedEffectType = "duringUse",
                MedUseTime = cfgPath.StimUseTimeSeconds
            }
        };
    }

}