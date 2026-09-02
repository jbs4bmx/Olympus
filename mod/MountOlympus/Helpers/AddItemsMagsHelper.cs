using SPTarkov.Common.Logger;
using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Helpers.Server;
using SPTarkov.Server.Core.Models.Eft.Common.Tables;
using SPTarkov.Server.Core.Models.Spt.Mod;
using SPTarkov.Server.Core.Services.Modding.Custom;
using System.Reflection;
using static MountOlympus.Olympus;

namespace MountOlympus.Helpers;

[Injectable(TypePriority = OnLoadOrder.Preload + 1003)]
internal class AddItemsMagsHelper(SptLogger<AddItemsMagsHelper> logger, CustomItemService customItemService, ModHelper modHelper)
{
    public void Apply()
    {
        var pathToMod = System.IO.Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)!;
        var cfgPath = modHelper.GetJsonDataFromFile<ModConfig>(pathToMod, "MOConfig.jsonc");

        var debug = cfgPath?.EnableDebugLogging == true;

        customItemService.CreateItemFromClone(ArHKM4(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArHKM4");
        customItemService.CreateItemFromClone(ArM4w(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArM4w");
        customItemService.CreateItemFromClone(ArM4wFDE(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArM4wFDE");
        customItemService.CreateItemFromClone(ArUzi(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArUzi");
        customItemService.CreateItemFromClone(ArVPO(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArVPO");
        customItemService.CreateItemFromClone(Ar9A91(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: Ar9A91");
        customItemService.CreateItemFromClone(ArAA12(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArAA12");
        customItemService.CreateItemFromClone(ArAXMC(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArAXMC");
        customItemService.CreateItemFromClone(Ar762AK(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: Ar762AK");
        customItemService.CreateItemFromClone(Ar556AK(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: Ar556AK");
        customItemService.CreateItemFromClone(Ar545M3(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: Ar545M3");
        customItemService.CreateItemFromClone(ArAPS(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArAPS");
        customItemService.CreateItemFromClone(ArAR10(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArAR10");
        customItemService.CreateItemFromClone(ArAsh(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArAsh");
        customItemService.CreateItemFromClone(ArAVT(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArAVT");
        customItemService.CreateItemFromClone(ArDVL(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArDVL");
        customItemService.CreateItemFromClone(ArFS(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArFS");
        customItemService.CreateItemFromClone(ArP90(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArP90");
        customItemService.CreateItemFromClone(ArG36(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArG36");
        customItemService.CreateItemFromClone(ArUmp(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArUmp");
        customItemService.CreateItemFromClone(ArKs23(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArKs23");
        customItemService.CreateItemFromClone(ArMk18(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArMk18");
        customItemService.CreateItemFromClone(Ar590(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: Ar590");
        customItemService.CreateItemFromClone(Ar155(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: Ar155");
        customItemService.CreateItemFromClone(Ar133(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: Ar133");
        customItemService.CreateItemFromClone(Ar153(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: Ar153");
        customItemService.CreateItemFromClone(ArM3(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArM3");
        customItemService.CreateItemFromClone(ArDE357(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArDE357");
        customItemService.CreateItemFromClone(ArDE50(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArDE50");
        customItemService.CreateItemFromClone(ArSH(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArSH");
        customItemService.CreateItemFromClone(ArSHFDE(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArSHFDE");
        customItemService.CreateItemFromClone(ArSL(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArSL");
        customItemService.CreateItemFromClone(ArSLFDE(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArSLFDE");
        customItemService.CreateItemFromClone(ArMp5(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArMp5");
        customItemService.CreateItemFromClone(ArMp7(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArMp7");
        customItemService.CreateItemFromClone(ArG45(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArG45");
        customItemService.CreateItemFromClone(ArGbsFDE(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArGbsFDE");
        customItemService.CreateItemFromClone(ArGbs(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArGbs");
        customItemService.CreateItemFromClone(ArUSP(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArUSP");
        customItemService.CreateItemFromClone(ArG28(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArG28");
        customItemService.CreateItemFromClone(ArM14(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArM14");
        customItemService.CreateItemFromClone(Ar1911(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: Ar1911");
        customItemService.CreateItemFromClone(ArM1a(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArM1a");
        customItemService.CreateItemFromClone(ArM700ai(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArM700ai");
        customItemService.CreateItemFromClone(ArM700pm(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArM700pm");
        customItemService.CreateItemFromClone(ArM700aa(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArM700aa");
        customItemService.CreateItemFromClone(ArM870(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArM870");
        customItemService.CreateItemFromClone(ArM9(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArM9");
        customItemService.CreateItemFromClone(ArMo(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArMo");
        customItemService.CreateItemFromClone(ArMoPm(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArMoPm");
        customItemService.CreateItemFromClone(ArMp443(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArMp443");
        customItemService.CreateItemFromClone(ArMp9(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArMp9");
        customItemService.CreateItemFromClone(ArMpx(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArMpx");
        customItemService.CreateItemFromClone(ArT5000(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArT5000");
        customItemService.CreateItemFromClone(ArP226(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArP226");
        customItemService.CreateItemFromClone(ArPL15(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArPL15");
        customItemService.CreateItemFromClone(ArPM(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArPM");
        customItemService.CreateItemFromClone(ArPP19(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArPP19");
        customItemService.CreateItemFromClone(ArKedr(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArKedr");
        customItemService.CreateItemFromClone(ArPPSH(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArPPSH");
        customItemService.CreateItemFromClone(ArRPD(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArRPD");
        customItemService.CreateItemFromClone(ArRPK(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArRPK");
        customItemService.CreateItemFromClone(ArS58po(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArS58po");
        customItemService.CreateItemFromClone(ArS58slr(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArS58slr");
        customItemService.CreateItemFromClone(ArSb7(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArSb7");
        customItemService.CreateItemFromClone(ArM10(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArM10");
        customItemService.CreateItemFromClone(ArSKSint(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArSKSint");
        customItemService.CreateItemFromClone(ArSKStap(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArSKStap");
        customItemService.CreateItemFromClone(ArSok10(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArSok10");
        customItemService.CreateItemFromClone(ArSr2m(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArSr2m");
        customItemService.CreateItemFromClone(ArAug(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArAug");
        customItemService.CreateItemFromClone(ArSV98(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArSV98");
        customItemService.CreateItemFromClone(ArSVD(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArSVD");
        customItemService.CreateItemFromClone(ArSVT(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArSVT");
        customItemService.CreateItemFromClone(ArToz(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArToz");
        customItemService.CreateItemFromClone(ArTT(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArTT");
        customItemService.CreateItemFromClone(Ar366(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: Ar366");
        customItemService.CreateItemFromClone(ArVSS(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArVSS");
        customItemService.CreateItemFromClone(ArBlick(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArBlick");
        customItemService.CreateItemFromClone(ArSrmp(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsMagsHelper] Created Item: ArSrmp");
    }

    public static NewItemFromCloneDetails ArHKM4(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb871b09465ad3efc82",
            NewItemName = "ArHKM4",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5c05413a0db834001c390619",
                        Name = "cartridges",
                        Parent = "6816beb871b09465ad3efc82",
                        MaxCount = 250,
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "59e6920f86f77411d82aa167",
                                        "59e6927d86f77411da468256",
                                        "54527a984bdc2d4e668b4567",
                                        "54527ac44bdc2d36668b4567",
                                        "59e68f6f86f7746c9f75e846",
                                        "59e6906286f7746c9f75e847",
                                        "59e690b686f7746c9f75e848",
                                        "59e6918f86f7746c9f75e849",
                                        "60194943740c5d77f6705eea",
                                        "601949593ae8f707c4608daa",
                                        "5c0d5ae286f7741e46554302",
                                        "5fbe3ffdf8b6a877a729ea82",
                                        "5fd20ff893a8961fc660a954",
                                        "619636be6db0f2477964e710",
                                        "6196364158ef8c428c287d9f",
                                        "6196365d58ef8c428c287da1",
                                        "64b8725c4b75259c590fa899"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 5.56x45 HK M4 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresHKM4Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArHKM4",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5c05413a0db834001c390617",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' HK M4 Mag",
                    ShortName = "AresHKM4",
                    Description = "Ares' 5.56x45 HK M4 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArM4w(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb851e6280ad379c4fb",
            NewItemName = "ArM4w",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "57487b732459771f613b6651",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb851e6280ad379c4fb",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "59e6920f86f77411d82aa167",
                                        "59e6927d86f77411da468256",
                                        "54527a984bdc2d4e668b4567",
                                        "54527ac44bdc2d36668b4567",
                                        "59e68f6f86f7746c9f75e846",
                                        "59e6906286f7746c9f75e847",
                                        "59e690b686f7746c9f75e848",
                                        "59e6918f86f7746c9f75e849",
                                        "60194943740c5d77f6705eea",
                                        "601949593ae8f707c4608daa",
                                        "5c0d5ae286f7741e46554302",
                                        "5fbe3ffdf8b6a877a729ea82",
                                        "5fd20ff893a8961fc660a954",
                                        "619636be6db0f2477964e710",
                                        "6196364158ef8c428c287d9f",
                                        "6196365d58ef8c428c287da1",
                                        "64b8725c4b75259c590fa899"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 5.56x45 PMAG Windowed 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresM4wMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArM4w",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "55802d5f4bdc2dac148b458e",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' HK M4 Mag",
                    ShortName = "AresHKM4",
                    Description = "Ares' 5.56x45 HK M4 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArM4wFDE(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb841be398af5270d6c",
            NewItemName = "ArM4wFDE",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5d1340cad7ad1a0b0b24986b",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb841be398af5270d6c",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "59e6920f86f77411d82aa167",
                                        "59e6927d86f77411da468256",
                                        "54527a984bdc2d4e668b4567",
                                        "54527ac44bdc2d36668b4567",
                                        "59e68f6f86f7746c9f75e846",
                                        "59e6906286f7746c9f75e847",
                                        "59e690b686f7746c9f75e848",
                                        "59e6918f86f7746c9f75e849",
                                        "60194943740c5d77f6705eea",
                                        "601949593ae8f707c4608daa",
                                        "5c0d5ae286f7741e46554302",
                                        "5fbe3ffdf8b6a877a729ea82",
                                        "5fd20ff893a8961fc660a954",
                                        "619636be6db0f2477964e710",
                                        "6196364158ef8c428c287d9f",
                                        "6196365d58ef8c428c287da1",
                                        "64b8725c4b75259c590fa899"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 5.56x45 PMAG Windowed 250-rd (FDE) Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresM4wFDEMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArM4wFDE",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5d1340cad7ad1a0b0b249869",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' HK M4 Mag FDE",
                    ShortName = "AresHKM4FDE",
                    Description = "Ares' 5.56x45 HK M4 250-rd Magazine (FDE)"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArUzi(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb88e62a50f19bd74c3",
            NewItemName = "ArUzi",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "676176a162e0497044079f48",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb88e62a50f19bd74c3",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5efb0da7a29a85116f6ea05f",
                                        "5c3df7d588a4501f290594e5",
                                        "58864a4f2459770fcc257101",
                                        "56d59d3ad2720bdb418b4577",
                                        "5c925fa22e221601da359b7b",
                                        "5a3c16fe86f77452b62de32a",
                                        "5efb0e16aeb21837e749c7ff",
                                        "5c0d56a986f774449d5de529",
                                        "64b7bbb74b75259c590fa897"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 9x19 Uzi Drum 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresUziMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArUzi",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "676176a162e0497044079f46",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' Uzi Mag",
                    ShortName = "AresUzi",
                    Description = "Ares' 9x19 Uzi Drum 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArVPO(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb8102946dabf3ec578",
            NewItemName = "ArVPO",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5c503ad32e2216398b5aada4",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb8102946dabf3ec578",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5a6086ea4f39f99cd479502f",
                                        "5a608bf24f39f98ffc77720e",
                                        "58dd3ad986f77403051cba8f",
                                        "5e023e53d4353e3302577c4c",
                                        "5efb0c1bd79ff02a1f5e68d9",
                                        "5e023e6e34d52a55c3304f71",
                                        "5e023e88277cce2b522ff2b1",
                                        "6768c25aa7b238f14a08d3f6"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 7.62x51 VPO-101 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresVPOMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArVPO",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5c503ad32e2216398b5aada2",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' VPO Mag",
                    ShortName = "AresVPO",
                    Description = "Ares' 7.62x51 VPO-101 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails Ar9A91(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb82130bcd49ae6f785",
            NewItemName = "Ar9A91",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "6450ec2e7da7133e5a09ca97",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb82130bcd49ae6f785",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5c0d688c86f77413ae3407b2",
                                        "61962d879bb3d20b0946d385",
                                        "57a0dfb82459774d3078b56c",
                                        "57a0e5022459774d1673f889",
                                        "5c0d668f86f7747ccb7f13b2",
                                        "6576f96220d53a5b8f3e395e"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 9x39 9a-91 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "Ares9A91Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "Ar9A91",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "6450ec2e7da7133e5a09ca96",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' 9A91 Mag",
                    ShortName = "Ares9A91",
                    Description = "Ares' 9x39 9a-91 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArAA12(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb8d38f0ae629c7514b",
            NewItemName = "ArAA12",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "6709133fa532466d5403fb7e",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb8d38f0ae629c7514b",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "560d5e524bdc2d25448b4571",
                                        "5d6e6772a4b936088465b17c",
                                        "5d6e67fba4b9361bc73bc779",
                                        "5d6e6806a4b936088465b17e",
                                        "5d6e68dea4b9361bcc29e659",
                                        "5d6e6911a4b9361bd5780d52",
                                        "5c0d591486f7744c505b416f",
                                        "58820d1224597753c90aeb13",
                                        "5d6e68c4a4b9361b93413f79",
                                        "5d6e68a8a4b9360b6c0d54e2",
                                        "5d6e68e6a4b9361c140bcfe0",
                                        "5d6e6869a4b9361c140bcfde",
                                        "5d6e68b3a4b9361bca7e50b5",
                                        "5d6e6891a4b9361bd473feea",
                                        "5d6e689ca4b9361bc8618956",
                                        "5d6e68d1a4b93622fe60e845",
                                        "64b8ee384b75259c590fa89b"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 12ga AA-12 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresAA12Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArAA12",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "6709133fa532466d5403fb7c",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' AA12 Mag",
                    ShortName = "AresAA12",
                    Description = "Ares' 12ga AA-12 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArAXMC(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb8b26ca97e413085df",
            NewItemName = "ArAXMC",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "628120fd5631d45211793ca0",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb8b26ca97e413085df",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5fc382a9d724d907e2077dab",
                                        "5fc275cf85fd526b824a571a",
                                        "5fc382c1016cce60e8341b20",
                                        "5fc382b6d6fa9c00c571bbc3"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' .338 AXMC 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresAXMCMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArAXMC",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "628120fd5631d45211793c9f",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' AXMC Mag",
                    ShortName = "AresAXMC",
                    Description = "Ares' .338 AXMC 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails Ar762AK(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb806be7c5f8912a4d3",
            NewItemName = "Ar762AK",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "59d6272486f7746614638700",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb806be7c5f8912a4d3",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "59e655cb86f77411dc52a77b",
                                        "59e6542b86f77411dc52a77a",
                                        "59e6658b86f77411d949b250",
                                        "5f0596629e22f464da6bbdd9",
                                        "59e0d99486f7744a32234762",
                                        "59e4d3d286f774176a36250a",
                                        "5656d7c34bdc2d9d198b4587",
                                        "59e4cf5286f7741778269d8a",
                                        "59e4d24686f7741776641ac7",
                                        "601aa3d2b2bcb34913271e6d",
                                        "64b7af5a8532cf95ee0a0dbd",
                                        "64b7af434b75259c590fa893",
                                        "64b7af734b75259c590fa895"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 7.62x39 AK PMAG 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "Ares762AKMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "Ar762AK",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "59d6272486f77466146386ff",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' 7.62x39 AK PMAG",
                    ShortName = "Ares762AK",
                    Description = "Ares' 7.62x39 AK PMAG 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails Ar556AK(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb8280ec5a63bdf4971",
            NewItemName = "Ar556AK",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5c0548ae0db834001966a3c4",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb8280ec5a63bdf4971",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "59e6920f86f77411d82aa167",
                                        "59e6927d86f77411da468256",
                                        "54527a984bdc2d4e668b4567",
                                        "54527ac44bdc2d36668b4567",
                                        "59e68f6f86f7746c9f75e846",
                                        "59e6906286f7746c9f75e847",
                                        "59e690b686f7746c9f75e848",
                                        "59e6918f86f7746c9f75e849",
                                        "60194943740c5d77f6705eea",
                                        "601949593ae8f707c4608daa",
                                        "5c0d5ae286f7741e46554302",
                                        "5fbe3ffdf8b6a877a729ea82",
                                        "5fd20ff893a8961fc660a954",
                                        "64b8725c4b75259c590fa899",
                                        "619636be6db0f2477964e710",
                                        "6196364158ef8c428c287d9f",
                                        "6196365d58ef8c428c287da1"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 5.56x45 AK Circle 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "Ares556AKMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "Ar556AK",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5c0548ae0db834001966a3c2",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' 5.56x45 AK Circle Mag",
                    ShortName = "Ares556AK",
                    Description = "Ares' 5.56x45 AK Circle 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails Ar545M3(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb8da95831eb6402fc7",
            NewItemName = "Ar545M3",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5aaa4194e5b5b055d06310a7",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb8da95831eb6402fc7",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5c0d5e4486f77478390952fe",
                                        "61962b617c6c7b169525f168",
                                        "56dfef82d2720bbd668b4567",
                                        "56dff026d2720bb8668b4567",
                                        "56dff061d2720bb5668b4567",
                                        "56dff0bed2720bb0668b4567",
                                        "56dff216d2720bbd668b4568",
                                        "56dff2ced2720bb4668b4567",
                                        "56dff338d2720bbd668b4569",
                                        "56dff3afd2720bba668b4567",
                                        "56dff421d2720b5f5a8b4567",
                                        "56dff4a2d2720bbd668b456a",
                                        "56dff4ecd2720b5f5a8b4568"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 5.45x39 AK PMAG 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "Ares545M3Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "Ar545M3",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5aaa4194e5b5b055d06310a5",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' 5.45x39 AK PMAG",
                    ShortName = "Ares545M3",
                    Description = "Ares' 5.45x39 AK PMAG 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArAPS(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb801d8937ace4b265f",
            NewItemName = "ArAPS",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5a17fb03fcdbcbcae6687290",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb801d8937ace4b265f",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "573718ba2459775a75491131",
                                        "573719df2459775a626ccbc2",
                                        "57371aab2459775a77142f22",
                                        "57371b192459775a9f58a5e0",
                                        "57371e4124597760ff7b25f1",
                                        "57371eb62459776125652ac1",
                                        "57371f8d24597761006c6a81",
                                        "5737201124597760fc4431f1",
                                        "5737207f24597760ff7b25f2",
                                        "57371f2b24597761224311f1",
                                        "573719762459775a626ccbc1",
                                        "573720e02459776143012541",
                                        "57372140245977611f70ee91",
                                        "5737218f245977612125ba51"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 9x18 APS 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresAPSMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArAPS",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5a17fb03fcdbcbcae668728f",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' APS Mag",
                    ShortName = "AresAPS",
                    Description = "Ares' 9x18 APS 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArAR10(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb8029dbaef8574136c",
            NewItemName = "ArAR10",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5a3501acc4a282000d72293b",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb8029dbaef8574136c",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5a6086ea4f39f99cd479502f",
                                        "5a608bf24f39f98ffc77720e",
                                        "58dd3ad986f77403051cba8f",
                                        "5e023e53d4353e3302577c4c",
                                        "5efb0c1bd79ff02a1f5e68d9",
                                        "5e023e6e34d52a55c3304f71",
                                        "5e023e88277cce2b522ff2b1",
                                        "6529243824cbe3c74a05e5c1",
                                        "6529302b8c26af6326029fb7",
                                        "6768c25aa7b238f14a08d3f6"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 7.62x51 AR-10 PMAG 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresAR10Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArAR10",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5a3501acc4a282000d72293a",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' 7.62x51 AR-10 PMAG",
                    ShortName = "AresAR10",
                    Description = "Ares' 7.62x51 AR-10 PMAG 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArAsh(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb80312f467c9bea8d5",
            NewItemName = "ArAsh",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5caf1109ae9215753c4411a1",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb80312f467c9bea8d5",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5cadf6ddae9215051e1c23b2",
                                        "5cadf6e5ae921500113bb973",
                                        "5cadf6eeae921500134b2799"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 12.7x55 Ash-12 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresAshMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArAsh",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5caf1109ae9215753c44119f",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' 12.7x55 Ash-12 Mag",
                    ShortName = "AresAsh",
                    Description = "Ares' 12.7x55 Ash-12 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArAVT(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb8031bcf82a967e4d5",
            NewItemName = "ArAVT",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "641074a07fd350b98c0b3f97",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb8031bcf82a967e4d5",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5e023d34e8a400319a28ed44",
                                        "5e023d48186a883be655e551",
                                        "5e023cf8186a883be655e54f",
                                        "59e77a2386f7742ee578960a",
                                        "5887431f2459777e1612938f",
                                        "560d61e84bdc2da74d8b4571",
                                        "64b8f7c241772715af0f9c3d",
                                        "64b8f7968532cf95ee0a0dbf",
                                        "64b8f7b5389d7ffd620ccba2"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 7.62x54 AVT-40 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresAVTMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArAVT",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "641074a07fd350b98c0b3f96",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' 7.62x54 AVT-40 Mag",
                    ShortName = "AresAVT",
                    Description = "Ares' 7.62x54 AVT-40 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArDVL(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb806c372a491ebd85f",
            NewItemName = "ArDVL",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5888988e24597752fe43a6fb",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb806c372a491ebd85f",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5a6086ea4f39f99cd479502f",
                                        "5a608bf24f39f98ffc77720e",
                                        "58dd3ad986f77403051cba8f",
                                        "5e023e53d4353e3302577c4c",
                                        "5efb0c1bd79ff02a1f5e68d9",
                                        "5e023e6e34d52a55c3304f71",
                                        "5e023e88277cce2b522ff2b1",
                                        "6768c25aa7b238f14a08d3f6"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 7.62x54 DVL-10 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresDVLMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArDVL",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5888988e24597752fe43a6fa",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' 7.62x54 DVL-10 Mag",
                    ShortName = "AresDVL",
                    Description = "Ares' 7.62x54 DVL-10 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArFS(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb8076854e1afb3d92c",
            NewItemName = "ArFS",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5d3eb5eca4b9363b1f22f8e6",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb8076854e1afb3d92c",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5cc80f53e4a949000e1ea4f8",
                                        "5cc86832d7f00c000d3a6e6c",
                                        "5cc86840d7f00c002412c56c",
                                        "5cc80f67e4a949035e43bbba",
                                        "5cc80f38e4a949001152b560",
                                        "5cc80f8fe4a949033b0224a2",
                                        "5cc80f79e4a949033c7343b2"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 5.7x28 FN57 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresFSMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArFS",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5d3eb5eca4b9363b1f22f8e4",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' FN57 Mag",
                    ShortName = "AresFS",
                    Description = "Ares' 5.7x28 FN57 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArP90(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb80983fdca5461b27e",
            NewItemName = "ArP90",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5cc70093e4a949033c734314",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb80983fdca5461b27e",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5cc80f53e4a949000e1ea4f8",
                                        "5cc86832d7f00c000d3a6e6c",
                                        "5cc86840d7f00c002412c56c",
                                        "5cc80f67e4a949035e43bbba",
                                        "5cc80f38e4a949001152b560",
                                        "5cc80f8fe4a949033b0224a2",
                                        "5cc80f79e4a949033c7343b2"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 5.7x28 P90 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresP90Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArP90",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5cc70093e4a949033c734312",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' P90 Mag",
                    ShortName = "AresP90",
                    Description = "Ares' 5.7x28 P90 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArG36(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb80ab85c36ef42719d",
            NewItemName = "ArG36",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "62307b7b10d2321fa8741923",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb80ab85c36ef42719d",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "59e6920f86f77411d82aa167",
                                        "59e6927d86f77411da468256",
                                        "54527a984bdc2d4e668b4567",
                                        "54527ac44bdc2d36668b4567",
                                        "59e68f6f86f7746c9f75e846",
                                        "59e6906286f7746c9f75e847",
                                        "59e690b686f7746c9f75e848",
                                        "59e6918f86f7746c9f75e849",
                                        "60194943740c5d77f6705eea",
                                        "601949593ae8f707c4608daa",
                                        "5c0d5ae286f7741e46554302"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 5.56x45 G36 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresG36Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArG36",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "62307b7b10d2321fa8741921",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' G36 Mag",
                    ShortName = "AresG36",
                    Description = "Ares' 5.56x45 G36 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArUmp(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb80d7ab48f6c23195e",
            NewItemName = "ArUmp",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5fc3e466187fea44d52eda92",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb80d7ab48f6c23195e",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5e81f423763d9f754677bf2e",
                                        "5efb0cabfb3e451d70735af5",
                                        "5efb0fc6aeb21837e749c801",
                                        "5efb0d4f4bc50b58e81710f3",
                                        "5ea2a8e200685063ec28c05a"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' .45 UMP 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresUmpMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArUmp",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5fc3e466187fea44d52eda90",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' UMP Mag",
                    ShortName = "AresUmp",
                    Description = "Ares' .45 UMP 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArKs23(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb80d9f482b6e571a3c",
            NewItemName = "ArKs23",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5f647d9f8499b57dc40ddb95",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb80d9f482b6e571a3c",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5e85aa1a988a8701445df1f5",
                                        "5e85aac65505fa48730d8af2",
                                        "5e85a9a6eacf8c039e4e2ac1",
                                        "5f647f31b6238e5dd066e196",
                                        "5e85a9f4add9fe03027d9bf1",
                                        "5f647fd3f6e4ab66c82faed6"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 23x75 KS-23M 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresKs23Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArKs23",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5f647d9f8499b57dc40ddb93",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' KS-23 Mag",
                    ShortName = "AresKs23",
                    Description = "Ares' 23x75 KS-23M 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArMk18(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb80df5976e243ab8c1",
            NewItemName = "ArMk18",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5fc23426900b1d5091531e17",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb80df5976e243ab8c1",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5fc382a9d724d907e2077dab",
                                        "5fc275cf85fd526b824a571a",
                                        "5fc382c1016cce60e8341b20",
                                        "5fc382b6d6fa9c00c571bbc3"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' .338 Mk-18 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresMk18Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArMk18",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5fc23426900b1d5091531e15",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' Mk18 Mag",
                    ShortName = "AresMk18",
                    Description = "Ares' .338 Mk-18 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails Ar590(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb80e865dabf4219c37",
            NewItemName = "Ar590",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5e87080c81c4ed43e83cefdc",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb80e865dabf4219c37",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "560d5e524bdc2d25448b4571",
                                        "5d6e6772a4b936088465b17c",
                                        "5d6e67fba4b9361bc73bc779",
                                        "5d6e6806a4b936088465b17e",
                                        "5d6e68dea4b9361bcc29e659",
                                        "5d6e6911a4b9361bd5780d52",
                                        "5c0d591486f7744c505b416f",
                                        "58820d1224597753c90aeb13",
                                        "5d6e68c4a4b9361b93413f79",
                                        "5d6e68a8a4b9360b6c0d54e2",
                                        "5d6e68e6a4b9361c140bcfe0",
                                        "5d6e6869a4b9361c140bcfde",
                                        "5d6e68b3a4b9361bca7e50b5",
                                        "5d6e6891a4b9361bd473feea",
                                        "5d6e689ca4b9361bc8618956",
                                        "5d6e68d1a4b93622fe60e845",
                                        "64b8ee384b75259c590fa89b"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 12ga 590A1 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "Ares590Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "Ar590",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5e87080c81c4ed43e83cefda",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' 590 Mag",
                    ShortName = "Ares590",
                    Description = "Ares' 12ga 590A1 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails Ar155(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb8120af4deb8c35679",
            NewItemName = "Ar155",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "6076c87f232e5a31c233d510",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb8120af4deb8c35679",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "560d5e524bdc2d25448b4571",
                                        "5d6e6772a4b936088465b17c",
                                        "5d6e67fba4b9361bc73bc779",
                                        "5d6e6806a4b936088465b17e",
                                        "5d6e68dea4b9361bcc29e659",
                                        "5d6e6911a4b9361bd5780d52",
                                        "5c0d591486f7744c505b416f",
                                        "58820d1224597753c90aeb13",
                                        "5d6e68c4a4b9361b93413f79",
                                        "5d6e68a8a4b9360b6c0d54e2",
                                        "5d6e68e6a4b9361c140bcfe0",
                                        "5d6e6869a4b9361c140bcfde",
                                        "5d6e68b3a4b9361bca7e50b5",
                                        "5d6e6891a4b9361bd473feea",
                                        "5d6e689ca4b9361bc8618956",
                                        "5d6e68d1a4b93622fe60e845",
                                        "64b8ee384b75259c590fa89b"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 12ga MP-155 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "Ares155Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "Ar155",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "6076c87f232e5a31c233d50e",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' 155 Mag",
                    ShortName = "Ares155",
                    Description = "Ares' 12ga MP-155 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails Ar133(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb812a48ef976dc053b",
            NewItemName = "Ar133",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "57487c4f2459771f6f1cac31",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb812a48ef976dc053b",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "560d5e524bdc2d25448b4571",
                                        "5d6e6772a4b936088465b17c",
                                        "5d6e67fba4b9361bc73bc779",
                                        "5d6e6806a4b936088465b17e",
                                        "5d6e68dea4b9361bcc29e659",
                                        "5d6e6911a4b9361bd5780d52",
                                        "5c0d591486f7744c505b416f",
                                        "58820d1224597753c90aeb13",
                                        "5d6e68c4a4b9361b93413f79",
                                        "5d6e68a8a4b9360b6c0d54e2",
                                        "5d6e68e6a4b9361c140bcfe0",
                                        "5d6e6869a4b9361c140bcfde",
                                        "5d6e68b3a4b9361bca7e50b5",
                                        "5d6e6891a4b9361bd473feea",
                                        "5d6e689ca4b9361bc8618956",
                                        "5d6e68d1a4b93622fe60e845",
                                        "64b8ee384b75259c590fa89b"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 12ga MP-133 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "Ares133Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "Ar133",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "55d484b44bdc2d1d4e8b456d",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' 133 Mag",
                    ShortName = "Ares133",
                    Description = "Ares' 12ga MP-133 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails Ar153(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb813b4de9cf28a5706",
            NewItemName = "Ar153",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5882163824597757561aa923",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb813b4de9cf28a5706",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "560d5e524bdc2d25448b4571",
                                        "5d6e6772a4b936088465b17c",
                                        "5d6e67fba4b9361bc73bc779",
                                        "5d6e6806a4b936088465b17e",
                                        "5d6e68dea4b9361bcc29e659",
                                        "5d6e6911a4b9361bd5780d52",
                                        "5c0d591486f7744c505b416f",
                                        "58820d1224597753c90aeb13",
                                        "5d6e68c4a4b9361b93413f79",
                                        "5d6e68a8a4b9360b6c0d54e2",
                                        "5d6e68e6a4b9361c140bcfe0",
                                        "5d6e6869a4b9361c140bcfde",
                                        "5d6e68b3a4b9361bca7e50b5",
                                        "5d6e6891a4b9361bd473feea",
                                        "5d6e689ca4b9361bc8618956",
                                        "5d6e68d1a4b93622fe60e845",
                                        "64b8ee384b75259c590fa89b"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 12ga MP-153 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "Ares153Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "Ar153",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5882163824597757561aa922",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' 153 Mag",
                    ShortName = "Ares153",
                    Description = "Ares' 12ga MP-153 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArM3(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb815034f78ed6c92ba",
            NewItemName = "ArM3",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "625ff2ccb8c587128c1a01df",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb815034f78ed6c92ba",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "560d5e524bdc2d25448b4571",
                                        "5d6e6772a4b936088465b17c",
                                        "5d6e67fba4b9361bc73bc779",
                                        "5d6e6806a4b936088465b17e",
                                        "5d6e68dea4b9361bcc29e659",
                                        "5d6e6911a4b9361bd5780d52",
                                        "5c0d591486f7744c505b416f",
                                        "58820d1224597753c90aeb13",
                                        "5d6e68c4a4b9361b93413f79",
                                        "5d6e68a8a4b9360b6c0d54e2",
                                        "5d6e68e6a4b9361c140bcfe0",
                                        "5d6e6869a4b9361c140bcfde",
                                        "5d6e68b3a4b9361bca7e50b5",
                                        "5d6e6891a4b9361bd473feea",
                                        "5d6e689ca4b9361bc8618956",
                                        "5d6e68d1a4b93622fe60e845",
                                        "64b8ee384b75259c590fa89b"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 12ga M3 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresM3Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArM3",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "625ff2ccb8c587128c1a01dd",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' M3 Mag",
                    ShortName = "AresM3",
                    Description = "Ares' 12ga M3 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArDE357(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb815af2ed894670b3c",
            NewItemName = "ArDE357",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "669fa435803b94fb5d0e3a78",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb815af2ed894670b3c",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "62330b3ed4dc74626d570b95",
                                        "62330bfadc5883093563729b",
                                        "62330c18744e5e31df12f516",
                                        "62330c40bdd19b369e1e53d1"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' .357 Desert Eagle 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresDE357Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArDE357",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "669fa435803b94fb5d0e3a76",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' DE357 Mag",
                    ShortName = "AresDE357",
                    Description = "Ares' .357 Desert Eagle 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArDE50(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb816e84095ca273dfb",
            NewItemName = "ArDE50",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "668fe5c5f35310705d02b698",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb816e84095ca273dfb",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "668fe62ac62660a5d8071446",
                                        "66a0d1e0ed648d72fe064d06",
                                        "66a0d1c87d0d369e270bb9de",
                                        "66a0d1f88486c69fce00fdf6"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' .50 Desert Eagle 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresDE50Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArDE50",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "668fe5c5f35310705d02b696",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' DE50 Mag",
                    ShortName = "AresDE50",
                    Description = "Ares' .50 Desert Eagle 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArSH(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb8194826f7e5d0c3ba",
            NewItemName = "ArSH",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "618168dc8004cc50514c34fe",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb8194826f7e5d0c3ba",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5a6086ea4f39f99cd479502f",
                                        "5a608bf24f39f98ffc77720e",
                                        "58dd3ad986f77403051cba8f",
                                        "5e023e53d4353e3302577c4c",
                                        "5efb0c1bd79ff02a1f5e68d9",
                                        "5e023e6e34d52a55c3304f71",
                                        "5e023e88277cce2b522ff2b1",
                                        "6768c25aa7b238f14a08d3f6"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 7.62x51 SCAR-H 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresScarHMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArSH",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "618168dc8004cc50514c34fc",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' ScarH Mag",
                    ShortName = "AresScarH",
                    Description = "Ares' 7.62x51 SCAR-H 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArSHFDE(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb81a73d5c2b890e4f6",
            NewItemName = "ArSHFDE",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "6183d53f1cb55961fa0fdcdc",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb81a73d5c2b890e4f6",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5a6086ea4f39f99cd479502f",
                                        "5a608bf24f39f98ffc77720e",
                                        "58dd3ad986f77403051cba8f",
                                        "5e023e53d4353e3302577c4c",
                                        "5efb0c1bd79ff02a1f5e68d9",
                                        "5e023e6e34d52a55c3304f71",
                                        "5e023e88277cce2b522ff2b1",
                                        "6768c25aa7b238f14a08d3f6"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 7.62x51 SCAR-H 250-rd (FDE) Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresScarHFDEMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArSHFDE",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "6183d53f1cb55961fa0fdcda",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' ScarH FDE Mag",
                    ShortName = "AresScarHFDE",
                    Description = "Ares' 7.62x51 SCAR-H 250-rd (FDE) Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArSL(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb81bf95adc2436780e",
            NewItemName = "ArSL",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "61840bedd92c473c77021637",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb81bf95adc2436780e",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "59e6920f86f77411d82aa167",
                                        "59e6927d86f77411da468256",
                                        "54527a984bdc2d4e668b4567",
                                        "54527ac44bdc2d36668b4567",
                                        "59e68f6f86f7746c9f75e846",
                                        "59e6906286f7746c9f75e847",
                                        "59e690b686f7746c9f75e848",
                                        "59e6918f86f7746c9f75e849",
                                        "60194943740c5d77f6705eea",
                                        "601949593ae8f707c4608daa",
                                        "5c0d5ae286f7741e46554302",
                                        "5fbe3ffdf8b6a877a729ea82",
                                        "5fd20ff893a8961fc660a954",
                                        "619636be6db0f2477964e710",
                                        "6196364158ef8c428c287d9f",
                                        "6196365d58ef8c428c287da1",
                                        "64b8725c4b75259c590fa899"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 5.56x45 SCAR-L 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresScarLMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArSL",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "61840bedd92c473c77021635",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' ScarL Mag",
                    ShortName = "AresScarL",
                    Description = "Ares' 5.56x45 SCAR-L 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArSLFDE(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb81d379c8624af5e0b",
            NewItemName = "ArSLFDE",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "61840d85568c120fdd2962a7",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb81d379c8624af5e0b",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "59e6920f86f77411d82aa167",
                                        "59e6927d86f77411da468256",
                                        "54527a984bdc2d4e668b4567",
                                        "54527ac44bdc2d36668b4567",
                                        "59e68f6f86f7746c9f75e846",
                                        "59e6906286f7746c9f75e847",
                                        "59e690b686f7746c9f75e848",
                                        "59e6918f86f7746c9f75e849",
                                        "60194943740c5d77f6705eea",
                                        "601949593ae8f707c4608daa",
                                        "5c0d5ae286f7741e46554302",
                                        "5fbe3ffdf8b6a877a729ea82",
                                        "5fd20ff893a8961fc660a954",
                                        "619636be6db0f2477964e710",
                                        "6196364158ef8c428c287d9f",
                                        "6196365d58ef8c428c287da1",
                                        "64b8725c4b75259c590fa899"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 5.56x45 SCAR-L 250-rd (FDE) Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresScarLFDEMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArSLFDE",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "61840d85568c120fdd2962a5",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' ScarL FDE Mag",
                    ShortName = "AresScarLFDE",
                    Description = "Ares' 5.56x45 SCAR-L 250-rd (FDE) Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArMp5(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb81f03c7259ea86b4d",
            NewItemName = "ArMp5",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5926c3b286f774640d189b6c",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb81f03c7259ea86b4d",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5efb0da7a29a85116f6ea05f",
                                        "5c3df7d588a4501f290594e5",
                                        "58864a4f2459770fcc257101",
                                        "56d59d3ad2720bdb418b4577",
                                        "5c925fa22e221601da359b7b",
                                        "5a3c16fe86f77452b62de32a",
                                        "5efb0e16aeb21837e749c7ff",
                                        "5c0d56a986f774449d5de529",
                                        "64b7bbb74b75259c590fa897"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 5 9x19 MP5 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresMp5Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArMp5",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5926c3b286f774640d189b6b",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' MP5 Mag",
                    ShortName = "AresMP5",
                    Description = "Ares' 5 9x19 MP5 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArMp7(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb82306ab59f7e4dc18",
            NewItemName = "ArMp7",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5ba2657ed4351e0035628ff4",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb82306ab59f7e4dc18",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5ba26812d4351e003201fef1",
                                        "5ba26835d4351e0035628ff5",
                                        "5ba2678ad4351e44f824b344",
                                        "5ba26844d4351e00334c9475",
                                        "64b6979341772715af0f9c39"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 4.6x30 MP7 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresMp7Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArMp7",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5ba2657ed4351e0035628ff2",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' MP7 Mag",
                    ShortName = "AresMP7",
                    Description = "Ares' 4.6x30 MP7 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArG45(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb8241f0c6897bd35ea",
            NewItemName = "ArG45",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5fb651dc85f90547f674b6f6",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb8241f0c6897bd35ea",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5e81f423763d9f754677bf2e",
                                        "5efb0cabfb3e451d70735af5",
                                        "5efb0fc6aeb21837e749c801",
                                        "5efb0d4f4bc50b58e81710f3",
                                        "5ea2a8e200685063ec28c05a"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' .45 Glock G30 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresG45Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArG45",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5fb651dc85f90547f674b6f4",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' G45 Mag",
                    ShortName = "AresG45",
                    Description = "Ares' .45 Glock G30 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArGbsFDE(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb82708b5a41d96ec3f",
            NewItemName = "ArGbsFDE",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "630767c37d50ff5e8a1ea71b",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb82708b5a41d96ec3f",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5efb0da7a29a85116f6ea05f",
                                        "5c3df7d588a4501f290594e5",
                                        "58864a4f2459770fcc257101",
                                        "56d59d3ad2720bdb418b4577",
                                        "5c925fa22e221601da359b7b",
                                        "5a3c16fe86f77452b62de32a",
                                        "5efb0e16aeb21837e749c7ff",
                                        "5c0d56a986f774449d5de529",
                                        "64b7bbb74b75259c590fa897"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 9x19 Glock 250-rd (FDE) Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresGbsFDEMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArGbsFDE",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "630767c37d50ff5e8a1ea71a",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' Gbs FDE Mag",
                    ShortName = "AresGbsFDE",
                    Description = "Ares' 9x19 Glock 250-rd (FDE) Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArGbs(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb8270981ce3f64da5b",
            NewItemName = "ArGbs",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5a7ad2e851dfba0016153694",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb8270981ce3f64da5b",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5efb0da7a29a85116f6ea05f",
                                        "5c3df7d588a4501f290594e5",
                                        "58864a4f2459770fcc257101",
                                        "56d59d3ad2720bdb418b4577",
                                        "5c925fa22e221601da359b7b",
                                        "5a3c16fe86f77452b62de32a",
                                        "5efb0e16aeb21837e749c7ff",
                                        "5c0d56a986f774449d5de529",
                                        "64b7bbb74b75259c590fa897"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 9x19 Glock 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresGbsMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArGbs",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5a7ad2e851dfba0016153692",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' Gbs Mag",
                    ShortName = "AresGbs",
                    Description = "Ares' 9x19 Glock 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArUSP(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb8278a1cd59be0f634",
            NewItemName = "ArUSP",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "6193d3149fb0c665d5490e34",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb8278a1cd59be0f634",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5e81f423763d9f754677bf2e",
                                        "5efb0cabfb3e451d70735af5",
                                        "5efb0fc6aeb21837e749c801",
                                        "5efb0d4f4bc50b58e81710f3",
                                        "5ea2a8e200685063ec28c05a"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' .45 USP 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresUSPMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArUSP",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "6193d3149fb0c665d5490e32",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' USP Mag",
                    ShortName = "AresUSP",
                    Description = "Ares' .45 USP 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArG28(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb828dce751ab36f049",
            NewItemName = "ArG28",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "617131a4568c120fdd29482f",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb828dce751ab36f049",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5a6086ea4f39f99cd479502f",
                                        "5a608bf24f39f98ffc77720e",
                                        "58dd3ad986f77403051cba8f",
                                        "5e023e53d4353e3302577c4c",
                                        "5efb0c1bd79ff02a1f5e68d9",
                                        "5e023e6e34d52a55c3304f71",
                                        "5e023e88277cce2b522ff2b1",
                                        "6768c25aa7b238f14a08d3f6"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 7.62x51 G28 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresG28Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArG28",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "617131a4568c120fdd29482d",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' G28 Mag",
                    ShortName = "AresG28",
                    Description = "Ares' 7.62x51 G28 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArM14(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb82b5e4a89371fdc06",
            NewItemName = "ArM14",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5addcce35acfc4001a5fc637",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb82b5e4a89371fdc06",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5a6086ea4f39f99cd479502f",
                                        "5a608bf24f39f98ffc77720e",
                                        "58dd3ad986f77403051cba8f",
                                        "5e023e53d4353e3302577c4c",
                                        "5efb0c1bd79ff02a1f5e68d9",
                                        "5e023e6e34d52a55c3304f71",
                                        "5e023e88277cce2b522ff2b1",
                                        "6768c25aa7b238f14a08d3f6"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 7.62x51 M14 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresM14Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArM14",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5addcce35acfc4001a5fc635",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' M14 Mag",
                    ShortName = "AresM14",
                    Description = "Ares' 7.62x51 M14 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails Ar1911(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb82dac93e574f1b068",
            NewItemName = "Ar1911",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5ef3448bb37dfd6af863525e",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb82dac93e574f1b068",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5e81f423763d9f754677bf2e",
                                        "5efb0cabfb3e451d70735af5",
                                        "5efb0fc6aeb21837e749c801",
                                        "5efb0d4f4bc50b58e81710f3",
                                        "5ea2a8e200685063ec28c05a"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' .45 M1911 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "Ares1911Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "Ar1911",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5ef3448ab37dfd6af863525c",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' 1911 Mag",
                    ShortName = "Ares1911",
                    Description = "Ares' .45 M1911 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArM1a(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb82e640fc78931bda5",
            NewItemName = "ArM1a",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5aaf8a0be5b5b00015693245",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb82e640fc78931bda5",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5a6086ea4f39f99cd479502f",
                                        "5a608bf24f39f98ffc77720e",
                                        "58dd3ad986f77403051cba8f",
                                        "5e023e53d4353e3302577c4c",
                                        "5efb0c1bd79ff02a1f5e68d9",
                                        "5e023e6e34d52a55c3304f71",
                                        "5e023e88277cce2b522ff2b1",
                                        "6768c25aa7b238f14a08d3f6"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 7.62x51 M1A 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresM1aMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArM1a",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5aaf8a0be5b5b00015693243",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' M1a Mag",
                    ShortName = "AresM1a",
                    Description = "Ares' 7.62x51 M1A 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArM700ai(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb82f46ab87e59dc103",
            NewItemName = "ArM700ai",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5d25a6538abbc306c62e630f",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb82f46ab87e59dc103",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5a6086ea4f39f99cd479502f",
                                        "5a608bf24f39f98ffc77720e",
                                        "58dd3ad986f77403051cba8f",
                                        "5e023e53d4353e3302577c4c",
                                        "5efb0c1bd79ff02a1f5e68d9",
                                        "5e023e6e34d52a55c3304f71",
                                        "5e023e88277cce2b522ff2b1",
                                        "6768c25aa7b238f14a08d3f6"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 7.62x51 M700 AICS 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresM700aiMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArM700ai",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5d25a6538abbc306c62e630d",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' M700ai Mag",
                    ShortName = "AresM700ai",
                    Description = "Ares' 7.62x51 M700 AICS 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArM700pm(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb82fc1b6d3e5a49078",
            NewItemName = "ArM700pm",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5d25a7b88abbc3054f3e60be",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb82fc1b6d3e5a49078",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5a6086ea4f39f99cd479502f",
                                        "5a608bf24f39f98ffc77720e",
                                        "58dd3ad986f77403051cba8f",
                                        "5e023e53d4353e3302577c4c",
                                        "5efb0c1bd79ff02a1f5e68d9",
                                        "5e023e6e34d52a55c3304f71",
                                        "5e023e88277cce2b522ff2b1",
                                        "6768c25aa7b238f14a08d3f6"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 7.62x51 M700 PMAG 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresM700acMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArM700pm",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5d25a7b88abbc3054f3e60bc",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' M700ac Mag",
                    ShortName = "AresM700ac",
                    Description = "Ares' 7.62x51 M700 PMAG 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArM700aa(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb831e25c084fb79da6",
            NewItemName = "ArM700aa",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5cf12a15d7f00c05464b2941",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb831e25c084fb79da6",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5a6086ea4f39f99cd479502f",
                                        "5a608bf24f39f98ffc77720e",
                                        "58dd3ad986f77403051cba8f",
                                        "5e023e53d4353e3302577c4c",
                                        "5efb0c1bd79ff02a1f5e68d9",
                                        "5e023e6e34d52a55c3304f71",
                                        "5e023e88277cce2b522ff2b1",
                                        "6768c25aa7b238f14a08d3f6"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 7.62x51 M700 AA 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresM700aaMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArM700aa",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5cf12a15d7f00c05464b293f",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' M700aa Mag",
                    ShortName = "AresM700aa",
                    Description = "Ares' 7.62x51 M700 AA 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArM870(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb83426dcf15a780b9e",
            NewItemName = "ArM870",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5a78830bc5856700137e4c91",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb83426dcf15a780b9e",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "560d5e524bdc2d25448b4571",
                                        "5d6e6772a4b936088465b17c",
                                        "5d6e67fba4b9361bc73bc779",
                                        "5d6e6806a4b936088465b17e",
                                        "5d6e68dea4b9361bcc29e659",
                                        "5d6e6911a4b9361bd5780d52",
                                        "5c0d591486f7744c505b416f",
                                        "58820d1224597753c90aeb13",
                                        "5d6e68c4a4b9361b93413f79",
                                        "5d6e68a8a4b9360b6c0d54e2",
                                        "5d6e68e6a4b9361c140bcfe0",
                                        "5d6e6869a4b9361c140bcfde",
                                        "5d6e68b3a4b9361bca7e50b5",
                                        "5d6e6891a4b9361bd473feea",
                                        "5d6e689ca4b9361bc8618956",
                                        "5d6e68d1a4b93622fe60e845",
                                        "64b8ee384b75259c590fa89b"
                                    ]
                                }
                            ]
                        },
                        Prototype = "5748538b2459770af276a261"
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 12ga M870 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresM870Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArM870",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5a78830bc5856700137e4c90",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' M870 Mag",
                    ShortName = "AresM870",
                    Description = "Ares' 12ga M870 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArM9(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb8356f0e2c419ab87d",
            NewItemName = "ArM9",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "676176b762e0497044079f4b",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb8356f0e2c419ab87d",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5efb0da7a29a85116f6ea05f",
                                        "5c3df7d588a4501f290594e5",
                                        "58864a4f2459770fcc257101",
                                        "56d59d3ad2720bdb418b4577",
                                        "5c925fa22e221601da359b7b",
                                        "5a3c16fe86f77452b62de32a",
                                        "5efb0e16aeb21837e749c7ff",
                                        "5c0d56a986f774449d5de529",
                                        "64b7bbb74b75259c590fa897"
                                    ]
                                }
                            ]
                        },
                        Prototype = "5748538b2459770af276a261"
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 9x19 M9A3 250-rd Round",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresM9Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArM9",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "676176b762e0497044079f49",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' M9 Mag",
                    ShortName = "AresM9",
                    Description = "Ares' 9x19 M9A3 250-rd Round"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArMo(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb8359e47081cbf6ad2",
            NewItemName = "ArMo",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5ae0973a5acfc4001562206e",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb8359e47081cbf6ad2",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5e023d34e8a400319a28ed44",
                                        "5e023d48186a883be655e551",
                                        "5e023cf8186a883be655e54f",
                                        "59e77a2386f7742ee578960a",
                                        "5887431f2459777e1612938f",
                                        "560d61e84bdc2da74d8b4571",
                                        "64b8f7c241772715af0f9c3d",
                                        "64b8f7968532cf95ee0a0dbf",
                                        "64b8f7b5389d7ffd620ccba2"
                                    ]
                                }
                            ]
                        },
                        Prototype = "5748538b2459770af276a261"
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 7.62x54 Mosin 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresMosinMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArMo",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5ae0973a5acfc4001562206c",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' Mosin Mag",
                    ShortName = "AresMosin",
                    Description = "Ares' 7.62x54 Mosin 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArMoPm(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb836c2f87de5b9104a",
            NewItemName = "ArMoPm",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5bae13ded4351e44f824bf3a",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb836c2f87de5b9104a",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5e023d34e8a400319a28ed44",
                                        "5e023d48186a883be655e551",
                                        "5e023cf8186a883be655e54f",
                                        "59e77a2386f7742ee578960a",
                                        "5887431f2459777e1612938f",
                                        "560d61e84bdc2da74d8b4571",
                                        "64b8f7c241772715af0f9c3d",
                                        "64b8f7968532cf95ee0a0dbf",
                                        "64b8f7b5389d7ffd620ccba2"
                                    ]
                                }
                            ]
                        },
                        Prototype = "5748538b2459770af276a261"
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 7.62x54 Mosin ProMag 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresMosinProMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArMoPm",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5bae13ded4351e44f824bf38",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' Mosin ProMag",
                    ShortName = "AresMosinPm",
                    Description = "Ares' 7.62x54 Mosin ProMag 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArMp443(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb839bf42ce510a7d68",
            NewItemName = "ArMp443",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "576a62b72459771e7c64ef26",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb839bf42ce510a7d68",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5efb0da7a29a85116f6ea05f",
                                        "5c3df7d588a4501f290594e5",
                                        "58864a4f2459770fcc257101",
                                        "56d59d3ad2720bdb418b4577",
                                        "5c925fa22e221601da359b7b",
                                        "5a3c16fe86f77452b62de32a",
                                        "5efb0e16aeb21837e749c7ff",
                                        "5c0d56a986f774449d5de529",
                                        "64b7bbb74b75259c590fa897"
                                    ]
                                }
                            ]
                        },
                        Prototype = "5748538b2459770af276a261"
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 9x19 Mp443 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresMp443Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArMp443",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "576a5ed62459771e9c2096cb",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' Mp443 Mag",
                    ShortName = "AresMp443",
                    Description = "Ares' 9x19 Mp443 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArMp9(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb83b82d7e6c9af5041",
            NewItemName = "ArMp9",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5de8eac42a78646d96665d93",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb83b82d7e6c9af5041",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5efb0da7a29a85116f6ea05f",
                                        "5c3df7d588a4501f290594e5",
                                        "58864a4f2459770fcc257101",
                                        "56d59d3ad2720bdb418b4577",
                                        "5c925fa22e221601da359b7b",
                                        "5a3c16fe86f77452b62de32a",
                                        "5efb0e16aeb21837e749c7ff",
                                        "5c0d56a986f774449d5de529",
                                        "64b7bbb74b75259c590fa897"
                                    ]
                                }
                            ]
                        },
                        Prototype = "5748538b2459770af276a261"
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 9x19 MP9 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresMp9Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArMp9",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5de8eac42a78646d96665d91",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' Mp9 Mag",
                    ShortName = "AresMp9",
                    Description = "Ares' 9x19 MP9 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArMpx(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb8fc419e7a2d8305b6",
            NewItemName = "ArMpx",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5894a05586f774094708ef76",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb8fc419e7a2d8305b6",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5efb0da7a29a85116f6ea05f",
                                        "5c3df7d588a4501f290594e5",
                                        "58864a4f2459770fcc257101",
                                        "56d59d3ad2720bdb418b4577",
                                        "5c925fa22e221601da359b7b",
                                        "5a3c16fe86f77452b62de32a",
                                        "5efb0e16aeb21837e749c7ff",
                                        "5c0d56a986f774449d5de529",
                                        "64b7bbb74b75259c590fa897"
                                    ]
                                }
                            ]
                        },
                        Prototype = "5748538b2459770af276a261"
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 9x19 MPX 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresMpxMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArMpx",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5894a05586f774094708ef75",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' Mpx Mag",
                    ShortName = "AresMpx",
                    Description = "Ares' 9x19 MPX 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArT5000(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "6816beb8fe92d4a031c56b78",
            NewItemName = "ArT5000",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5df25b6c0b92095fd441e4d1",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "6816beb8fe92d4a031c56b78",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5a6086ea4f39f99cd479502f",
                                        "5a608bf24f39f98ffc77720e",
                                        "58dd3ad986f77403051cba8f",
                                        "5e023e53d4353e3302577c4c",
                                        "5efb0c1bd79ff02a1f5e68d9",
                                        "5e023e6e34d52a55c3304f71",
                                        "5e023e88277cce2b522ff2b1",
                                        "6768c25aa7b238f14a08d3f6"
                                    ]
                                }
                            ]
                        },
                        Prototype = "5748538b2459770af276a261"
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 7.62x51 T5000 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresT5000Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArT5000",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5df25b6c0b92095fd441e4cf",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' T5000 Mag",
                    ShortName = "AresT5000",
                    Description = "Ares' 7.62x51 T5000 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArP226(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "68f2f70e436d9a8072fb5e1c",
            NewItemName = "ArP226",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5c920e902e221644f31c3c9b",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "68f2f70e436d9a8072fb5e1c",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5efb0da7a29a85116f6ea05f",
                                        "5c3df7d588a4501f290594e5",
                                        "58864a4f2459770fcc257101",
                                        "56d59d3ad2720bdb418b4577",
                                        "5c925fa22e221601da359b7b",
                                        "5a3c16fe86f77452b62de32a",
                                        "5efb0e16aeb21837e749c7ff",
                                        "5c0d56a986f774449d5de529",
                                        "64b7bbb74b75259c590fa897"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 9x19 P226 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresP226Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArP226",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5c920e902e221644f31c3c99",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' P226 Mag",
                    ShortName = "AresP226",
                    Description = "Ares' 9x19 P226 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArPL15(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "68f2f70e290d8b3c5a746f1e",
            NewItemName = "ArPL15",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
            {
                Id = "602286df23506e50807090c8",
                MaxCount = 250,
                Name = "cartridges",
                Parent = "68f2f70e290d8b3c5a746f1e",
                Prototype = "5748538b2459770af276a261",
                Properties = new SlotProperties
                {
                    Filters =
                    [
                        new SlotFilter
                        {
                            Filter =
                            [
                                "5efb0da7a29a85116f6ea05f",
                                "5c3df7d588a4501f290594e5",
                                "58864a4f2459770fcc257101",
                                "56d59d3ad2720bdb418b4577",
                                "5c925fa22e221601da359b7b",
                                "5a3c16fe86f77452b62de32a",
                                "5efb0e16aeb21837e749c7ff",
                                "5c0d56a986f774449d5de529",
                                "64b7bbb74b75259c590fa897"
                            ]
                        }
                    ]
                }
            }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 9x19 PL-15 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresPL15Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArPL15",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "602286df23506e50807090c6",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' PL15 Mag",
                    ShortName = "AresPL15",
                    Description = "Ares' 9x19 PL-15 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArPM(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "68f2f70efe6c3d729a0b8541",
            NewItemName = "ArPM",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
            {
                Id = "57487eee2459771f6c4d9724",
                MaxCount = 250,
                Name = "cartridges",
                Parent = "68f2f70efe6c3d729a0b8541",
                Prototype = "5748538b2459770af276a261",
                Properties = new SlotProperties
                {
                    Filters =
                    [
                        new SlotFilter
                        {
                            Filter =
                            [
                                "573718ba2459775a75491131",
                                "573719df2459775a626ccbc2",
                                "57371aab2459775a77142f22",
                                "57371b192459775a9f58a5e0",
                                "57371e4124597760ff7b25f1",
                                "57371eb62459776125652ac1",
                                "57371f8d24597761006c6a81",
                                "5737201124597760fc4431f1",
                                "5737207f24597760ff7b25f2",
                                "57371f2b24597761224311f1",
                                "573719762459775a626ccbc1",
                                "573720e02459776143012541",
                                "57372140245977611f70ee91",
                                "5737218f245977612125ba51"
                            ]
                        }
                    ]
                }
            }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 9x18 PM 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresPMMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArPM",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5448c12b4bdc2d02308b456f",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' PM Mag",
                    ShortName = "AresPM",
                    Description = "Ares' 9x18 PM 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArPP19(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "68f2f70e97018efab2c3654d",
            NewItemName = "ArPP19",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
            {
                Id = "599860ac86f77436b225ed1b",
                MaxCount = 250,
                Name = "cartridges",
                Parent = "68f2f70e97018efab2c3654d",
                Prototype = "5748538b2459770af276a261",
                Properties = new SlotProperties
                {
                    Filters =
                    [
                        new SlotFilter
                        {
                            Filter =
                            [
                                "5efb0da7a29a85116f6ea05f",
                                "5c3df7d588a4501f290594e5",
                                "58864a4f2459770fcc257101",
                                "56d59d3ad2720bdb418b4577",
                                "5c925fa22e221601da359b7b",
                                "5a3c16fe86f77452b62de32a",
                                "5efb0e16aeb21837e749c7ff",
                                "5c0d56a986f774449d5de529",
                                "64b7bbb74b75259c590fa897"
                            ]
                        }
                    ]
                }
            }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 9x19 PP-19 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresPP19Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArPP19",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "599860ac86f77436b225ed1a",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' PP19 Mag",
                    ShortName = "AresPP19",
                    Description = "Ares' 9x19 PP-19 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArKedr(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "68f2f70e56f82ab140c9e73d",
            NewItemName = "ArKedr",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
            {
                Id = "57d15ad52459775a79095e23",
                MaxCount = 250,
                Name = "cartridges",
                Parent = "68f2f70e56f82ab140c9e73d",
                Prototype = "5748538b2459770af276a261",
                Properties = new SlotProperties
                {
                    Filters =
                    [
                        new SlotFilter
                        {
                            Filter =
                            [
                                "573718ba2459775a75491131",
                                "573719df2459775a626ccbc2",
                                "57371aab2459775a77142f22",
                                "57371b192459775a9f58a5e0",
                                "57371e4124597760ff7b25f1",
                                "57371eb62459776125652ac1",
                                "57371f8d24597761006c6a81",
                                "5737201124597760fc4431f1",
                                "5737207f24597760ff7b25f2",
                                "57371f2b24597761224311f1",
                                "573719762459775a626ccbc1",
                                "573720e02459776143012541",
                                "57372140245977611f70ee91",
                                "5737218f245977612125ba51"
                            ]
                        }
                    ]
                }
            }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 9x18 Kedr 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresKedrMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArKedr",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "57d1519e24597714373db79d",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' Kedr Mag",
                    ShortName = "AresKedr",
                    Description = "Ares' 9x18 Kedr 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArPPSH(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "68f2f70e5e1f837429a6bc0d",
            NewItemName = "ArPPSH",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
            {
                Id = "5ea034eb5aad6446a939737d",
                MaxCount = 250,
                Name = "cartridges",
                Parent = "68f2f70e5e1f837429a6bc0d",
                Prototype = "5748538b2459770af276a261",
                Properties = new SlotProperties
                {
                    Filters =
                    [
                        new SlotFilter
                        {
                            Filter =
                            [
                                "5735ff5c245977640e39ba7e",
                                "573601b42459776410737435",
                                "573602322459776445391df1",
                                "5736026a245977644601dc61",
                                "573603562459776430731618",
                                "573603c924597764442bd9cb",
                                "5735fdcd2459776445391d61"
                            ]
                        }
                    ]
                }
            }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 7.62x25 PPSh 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresPPSHMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArPPSH",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5ea034eb5aad6446a939737b",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' PPSH Mag",
                    ShortName = "AresPPSH",
                    Description = "Ares' 7.62x25 PPSh 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArRPD(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "68f2f70e30264efab7c891d5",
            NewItemName = "ArRPD",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
            {
                Id = "6513f0a194c72326990a3869",
                MaxCount = 250,
                Name = "cartridges",
                Parent = "68f2f70e30264efab7c891d5",
                Prototype = "5748538b2459770af276a261",
                Properties = new SlotProperties
                {
                    Filters =
                    [
                        new SlotFilter
                        {
                            Filter =
                            [
                                "59e0d99486f7744a32234762",
                                "59e4d3d286f774176a36250a",
                                "5656d7c34bdc2d9d198b4587",
                                "59e4cf5286f7741778269d8a",
                                "59e4d24686f7741776641ac7",
                                "64b7af5a8532cf95ee0a0dbd",
                                "601aa3d2b2bcb34913271e6d",
                                "64b7af434b75259c590fa893",
                                "64b7af734b75259c590fa895"
                            ]
                        }
                    ]
                }
            }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 7.62x39 RPD 250-rd Box",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresRPDBox",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArRPD",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "6513f0a194c72326990a3868",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' RPD Box",
                    ShortName = "AresRPD",
                    Description = "Ares' 7.62x39 RPD 250-rd Box"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArRPK(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "68f2f70ee3f58b740d126c9a",
            NewItemName = "ArRPK",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
            {
                Id = "5bed625c0db834001c062948",
                MaxCount = 250,
                Name = "cartridges",
                Parent = "68f2f70ee3f58b740d126c9a",
                Prototype = "5748538b2459770af276a261",
                Properties = new SlotProperties
                {
                    Filters =
                    [
                        new SlotFilter
                        {
                            Filter =
                            [
                                "5c0d5e4486f77478390952fe",
                                "61962b617c6c7b169525f168",
                                "56dfef82d2720bbd668b4567",
                                "56dff026d2720bb8668b4567",
                                "56dff061d2720bb5668b4567",
                                "56dff0bed2720bb0668b4567",
                                "56dff216d2720bbd668b4568",
                                "56dff2ced2720bb4668b4567",
                                "56dff338d2720bbd668b4569",
                                "56dff3afd2720bba668b4567",
                                "56dff421d2720b5f5a8b4567",
                                "56dff4a2d2720bbd668b456a",
                                "56dff4ecd2720b5f5a8b4568"
                            ]
                        }
                    ]
                }
            }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 5.45x39 RPK 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresRPKMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArRPK",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5bed625c0db834001c062946",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' RPK Mag",
                    ShortName = "AresRPK",
                    Description = "Ares' 5.45x39 RPK 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArS58po(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "68f2f70eb38c257af46d9e10",
            NewItemName = "ArS58po",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
            {
                Id = "5b7c2d1d5acfc43d1028532c",
                MaxCount = 250,
                Name = "cartridges",
                Parent = "68f2f70eb38c257af46d9e10",
                Prototype = "5748538b2459770af276a261",
                Properties = new SlotProperties
                {
                    Filters =
                    [
                        new SlotFilter
                        {
                            Filter =
                            [
                                "5a6086ea4f39f99cd479502f",
                                "5a608bf24f39f98ffc77720e",
                                "58dd3ad986f77403051cba8f",
                                "5e023e53d4353e3302577c4c",
                                "5efb0c1bd79ff02a1f5e68d9",
                                "5e023e6e34d52a55c3304f71",
                                "5e023e88277cce2b522ff2b1",
                                "6768c25aa7b238f14a08d3f6"
                            ]
                        }
                    ]
                }
            }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 7.62x51 SA-58 Polymer 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresSA58polyMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArS58po",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5b7c2d1d5acfc43d1028532a",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' SA58 Poly Mag",
                    ShortName = "AresSA58po",
                    Description = "Ares' 7.62x51 SA-58 Polymer 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArS58slr(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "68f2f70e1bf03c76a4529e8d",
            NewItemName = "ArS58slr",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
            {
                Id = "5b7d37845acfc400170e2f89",
                MaxCount = 250,
                Name = "cartridges",
                Parent = "68f2f70e1bf03c76a4529e8d",
                Prototype = "5748538b2459770af276a261",
                Properties = new SlotProperties
                {
                    Filters =
                    [
                        new SlotFilter
                        {
                            Filter =
                            [
                                "5a6086ea4f39f99cd479502f",
                                "5a608bf24f39f98ffc77720e",
                                "58dd3ad986f77403051cba8f",
                                "5e023e53d4353e3302577c4c",
                                "5efb0c1bd79ff02a1f5e68d9",
                                "5e023e6e34d52a55c3304f71",
                                "5e023e88277cce2b522ff2b1",
                                "6768c25aa7b238f14a08d3f6"
                            ]
                        }
                    ]
                }
            }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 7.62x51 SA-58 SLR 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresSA58slrMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArS58slr",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5b7d37845acfc400170e2f87",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' SA58 SLR Mag",
                    ShortName = "AresSA58slr",
                    Description = "Ares' 7.62x51 SA-58 SLR 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArSb7(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "68f2f70e7dace16582f0349b",
            NewItemName = "ArSb7",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
            {
                Id = "5998529a86f774647f44f422",
                MaxCount = 250,
                Name = "cartridges",
                Parent = "68f2f70e7dace16582f0349b",
                Prototype = "5748538b2459770af276a261",
                Properties = new SlotProperties
                {
                    Filters =
                    [
                        new SlotFilter
                        {
                            Filter =
                            [
                                "5efb0da7a29a85116f6ea05f",
                                "5c3df7d588a4501f290594e5",
                                "58864a4f2459770fcc257101",
                                "56d59d3ad2720bdb418b4577",
                                "5c925fa22e221601da359b7b",
                                "5a3c16fe86f77452b62de32a",
                                "5efb0e16aeb21837e749c7ff",
                                "5c0d56a986f774449d5de529",
                                "64b7bbb74b75259c590fa897"
                            ]
                        }
                    ]
                }
            }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 9x19 Saiga-9 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresSb7Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArSb7",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5998529a86f774647f44f421",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' Sb7 Mag",
                    ShortName = "AresSb7",
                    Description = "Ares' 9x19 Saiga-9 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArM10(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "68f2f70e73486c0ad15be2f9",
            NewItemName = "ArM10",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
            {
                Id = "673cbdfad0453ba50c0f76d8",
                MaxCount = 250,
                Name = "cartridges",
                Parent = "68f2f70e73486c0ad15be2f9",
                Prototype = "5748538b2459770af276a261",
                Properties = new SlotProperties
                {
                    Filters =
                    [
                        new SlotFilter
                        {
                            Filter =
                            [
                                "5fc382a9d724d907e2077dab",
                                "5fc275cf85fd526b824a571a",
                                "5fc382c1016cce60e8341b20",
                                "5fc382b6d6fa9c00c571bbc3"
                            ]
                        }
                    ]
                }
            }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' .338 TRG M10 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresM10Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArM10",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "673cbdfad0453ba50c0f76d6",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' M10 Mag",
                    ShortName = "AresM10",
                    Description = "Ares' .338 TRG M10 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArSKSint(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "68f2f70e3d8692aeb471f0c5",
            NewItemName = "ArSKSint",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "587df3a12459772c28142568",
                        Name = "cartridges",
                        Parent = "68f2f70e3d8692aeb471f0c5",
                        MaxCount = 250,
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "59e655cb86f77411dc52a77b",
                                        "59e6542b86f77411dc52a77a",
                                        "59e6658b86f77411d949b250",
                                        "5f0596629e22f464da6bbdd9",
                                        "59e0d99486f7744a32234762",
                                        "59e4d3d286f774176a36250a",
                                        "5656d7c34bdc2d9d198b4587",
                                        "59e4cf5286f7741778269d8a",
                                        "59e4d24686f7741776641ac7",
                                        "601aa3d2b2bcb34913271e6d",
                                        "64b7af5a8532cf95ee0a0dbd",
                                        "64b7af434b75259c590fa893",
                                        "64b7af734b75259c590fa895"
                                    ]
                                }
                            ]
                        },
                        Prototype = "5748538b2459770af276a261"
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 7.62x39 SKS 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArSKSint",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "587df3a12459772c28142567",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' SKS Int Mag",
                    ShortName = "AresSKSint",
                    Description = "Ares' 7.62x39 SKS 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArSKStap(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "68f2f70eb2c38f9a7d06415e",
            NewItemName = "ArSKStap",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "587df583245977373c4f112a",
                        Name = "cartridges",
                        Parent = "68f2f70eb2c38f9a7d06415e",
                        MaxCount = 250,
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "59e655cb86f77411dc52a77b",
                                        "59e6542b86f77411dc52a77a",
                                        "59e6658b86f77411d949b250",
                                        "5f0596629e22f464da6bbdd9",
                                        "59e0d99486f7744a32234762",
                                        "59e4d3d286f774176a36250a",
                                        "5656d7c34bdc2d9d198b4587",
                                        "59e4cf5286f7741778269d8a",
                                        "59e4d24686f7741776641ac7",
                                        "601aa3d2b2bcb34913271e6d",
                                        "64b7af5a8532cf95ee0a0dbd",
                                        "64b7af434b75259c590fa893",
                                        "64b7af734b75259c590fa895"
                                    ]
                                }
                            ]
                        },
                        Prototype = "5748538b2459770af276a261"
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 7.62x39 SKS TAPCO 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArSKStap",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "587df583245977373c4f1129",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' SKS Tap Mag",
                    ShortName = "AresSKStap",
                    Description = "Ares' 7.62x39 SKS TAPCO 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArSok10(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "68f2f70e46783c512f9a0edb",
            NewItemName = "ArSok10",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5a966f51a2750c00156aacf8",
                        Name = "cartridges",
                        Parent = "68f2f70e46783c512f9a0edb",
                        MaxCount = 250,
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "560d5e524bdc2d25448b4571",
                                        "5d6e6772a4b936088465b17c",
                                        "5d6e67fba4b9361bc73bc779",
                                        "5d6e6806a4b936088465b17e",
                                        "5d6e68dea4b9361bcc29e659",
                                        "5d6e6911a4b9361bd5780d52",
                                        "5c0d591486f7744c505b416f",
                                        "58820d1224597753c90aeb13",
                                        "5d6e68c4a4b9361b93413f79",
                                        "5d6e68a8a4b9360b6c0d54e2",
                                        "5d6e68e6a4b9361c140bcfe0",
                                        "5d6e6869a4b9361c140bcfde",
                                        "5d6e68b3a4b9361bca7e50b5",
                                        "5d6e6891a4b9361bd473feea",
                                        "5d6e689ca4b9361bc8618956",
                                        "5d6e68d1a4b93622fe60e845",
                                        "64b8ee384b75259c590fa89b"
                                    ]
                                }
                            ]
                        },
                        Prototype = "5748538b2459770af276a261"
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 12ga SOK-12 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArSok10",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5a966f51a2750c00156aacf6",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' Sok10 Mag",
                    ShortName = "AresSok10",
                    Description = "Ares' 12ga SOK-12 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArSr2m(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "68f2f70efd97b56ca81204e3",
            NewItemName = "ArSr2m",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                            {
                                Id = "62e153bcdb1a5c41971c1b5c",
                                Name = "cartridges",
                                Parent = "68f2f70efd97b56ca81204e3",
                                MaxCount = 250,
                                Properties = new SlotProperties
                                {
                                    Filters =
                                    [
                                        new SlotFilter
                                        {
                                            Filter =
                                            [
                                                "5a269f97c4a282000b151807",
                                                "5a26abfac4a28232980eabff",
                                                "5a26ac06c4a282000c5a90a8",
                                                "5a26ac0ec4a28200741e1e18",
                                                "6576f93989f0062e741ba952",
                                                "6576f4708ca9c4381d16cd9d"
                                            ]
                                        }
                                    ]
                                },
                                Prototype = "5748538b2459770af276a261"
                            }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 9x21 SR-2M 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArSr2m",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "62e153bcdb1a5c41971c1b5b",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' SR2M Mag",
                    ShortName = "AresSR2M",
                    Description = "Ares' 9x21 SR-2M 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArAug(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "68f2f70e069ed2c1ab5738f4",
            NewItemName = "ArAug",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                            {
                                Id = "62e7c98b550c8218d602cbb5",
                                MaxCount = 250,
                                Name = "cartridges",
                                Parent = "68f2f70e069ed2c1ab5738f4",
                                Prototype = "5748538b2459770af276a261",
                                Properties = new SlotProperties
                                {
                                    Filters =
                                    [
                                        new SlotFilter
                                        {
                                            Filter =
                                            [
                                                "59e6920f86f77411d82aa167",
                                                "59e6927d86f77411da468256",
                                                "54527a984bdc2d4e668b4567",
                                                "54527ac44bdc2d36668b4567",
                                                "59e68f6f86f7746c9f75e846",
                                                "59e6906286f7746c9f75e847",
                                                "59e690b686f7746c9f75e848",
                                                "59e6918f86f7746c9f75e849",
                                                "60194943740c5d77f6705eea",
                                                "601949593ae8f707c4608daa",
                                                "5c0d5ae286f7741e46554302",
                                                "5fbe3ffdf8b6a877a729ea82",
                                                "5fd20ff893a8961fc660a954",
                                                "619636be6db0f2477964e710",
                                                "6196364158ef8c428c287d9f",
                                                "6196365d58ef8c428c287da1",
                                                "64b8725c4b75259c590fa899"
                                            ]
                                        }
                                    ]
                                }
                            }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 5.56 Aug 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresAugMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArAug",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "62e7c98b550c8218d602cbb4",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' Aug Mag",
                    ShortName = "AresAug",
                    Description = "Ares' 5.56 Aug 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArSV98(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "68f2f70e79f3c8e0bda45126",
            NewItemName = "ArSV98",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "57487bb62459771f643ff539",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "68f2f70e79f3c8e0bda45126",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5e023d34e8a400319a28ed44",
                                        "5e023d48186a883be655e551",
                                        "5e023cf8186a883be655e54f",
                                        "59e77a2386f7742ee578960a",
                                        "5887431f2459777e1612938f",
                                        "560d61e84bdc2da74d8b4571",
                                        "64b8f7c241772715af0f9c3d",
                                        "64b8f7968532cf95ee0a0dbf",
                                        "64b8f7b5389d7ffd620ccba2"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 7.62x54 SV-98 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresSV98Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArSV98",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "559ba5b34bdc2d1f1a8b4582",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' SV98 Mag",
                    ShortName = "AresSV98",
                    Description = "Ares' 7.62x54 SV-98 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArSVD(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "68f2f70e0b2fe59176a3cd48",
            NewItemName = "ArSVD",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5c88f24b2e22160bc12c69a8",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "68f2f70e0b2fe59176a3cd48",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5e023d34e8a400319a28ed44",
                                        "5e023d48186a883be655e551",
                                        "5e023cf8186a883be655e54f",
                                        "59e77a2386f7742ee578960a",
                                        "5887431f2459777e1612938f",
                                        "560d61e84bdc2da74d8b4571",
                                        "64b8f7968532cf95ee0a0dbf",
                                        "64b8f7c241772715af0f9c3d",
                                        "64b8f7b5389d7ffd620ccba2"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 7.62x54 SVD 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresSVDMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArSVD",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5c88f24b2e22160bc12c69a6",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' SVD Mag",
                    ShortName = "AresSVD",
                    Description = "Ares' 7.62x54 SVD 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArSVT(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "68f2f70e9d4f2ea17b3c6085",
            NewItemName = "ArSVT",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "6422e1ea3c0f06190302161b",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "68f2f70e9d4f2ea17b3c6085",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5e023d34e8a400319a28ed44",
                                        "5e023d48186a883be655e551",
                                        "5e023cf8186a883be655e54f",
                                        "59e77a2386f7742ee578960a",
                                        "5887431f2459777e1612938f",
                                        "560d61e84bdc2da74d8b4571",
                                        "64b8f7c241772715af0f9c3d",
                                        "64b8f7b5389d7ffd620ccba2",
                                        "64b8f7968532cf95ee0a0dbf"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 7.62x54 SVT-40 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresSVTMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArSVT",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "6422e1ea3c0f06190302161a",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' SVT Mag",
                    ShortName = "AresSVT",
                    Description = "Ares' 7.62x54 SVT-40 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArToz(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "68f2f70e82f357c01ebd946a",
            NewItemName = "ArToz",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5c6161fb2e221600113fbde7",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "68f2f70e82f357c01ebd946a",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5a38ebd9c4a282000d722a5b",
                                        "5d6e695fa4b936359b35d852",
                                        "5d6e69b9a4b9361bc8618958",
                                        "5d6e69c7a4b9360b6c0d54e4",
                                        "5d6e6a5fa4b93614ec501745",
                                        "5d6e6a53a4b9361bd473feec",
                                        "5d6e6a42a4b9364f07165f52",
                                        "5d6e6a05a4b93618084f58d0",
                                        "6601380580e77cfd080e3418",
                                        "660137d8481cc6907a0c5cda",
                                        "660137ef76c1b56143052be8"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 20ga TOZ 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresTozMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArToz",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5c6161fb2e221600113fbde5",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' TOZ Mag",
                    ShortName = "AresToz",
                    Description = "Ares' 20ga TOZ 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArTT(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "68f2f70eea56024b1387f9cd",
            NewItemName = "ArTT",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "574880e12459771f643ff53a",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "68f2f70eea56024b1387f9cd",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5735ff5c245977640e39ba7e",
                                        "573601b42459776410737435",
                                        "573602322459776445391df1",
                                        "5736026a245977644601dc61",
                                        "573603562459776430731618",
                                        "573603c924597764442bd9cb",
                                        "5735fdcd2459776445391d61"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 7.62x25 TT 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresTTMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArTT",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "571a29dc2459771fb2755a6a",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' TT Mag",
                    ShortName = "AresTT",
                    Description = "Ares' 7.62x25 TT 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails Ar366(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "68f2f70ed7521ba38694fce0",
            NewItemName = "Ar366",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "5de653abf76fdc1ce94a5a2c",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "68f2f70ed7521ba38694fce0",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "59e655cb86f77411dc52a77b",
                                        "59e6542b86f77411dc52a77a",
                                        "59e6658b86f77411d949b250",
                                        "5f0596629e22f464da6bbdd9"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' .366 VPO-215 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "Ares366Mag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "Ar366",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "5de653abf76fdc1ce94a5a2a",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' VPO-215 Mag",
                    ShortName = "Ares366",
                    Description = "Ares' .366 VPO-215 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArVSS(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "68f2f70e37e0458bf16acd29",
            NewItemName = "ArVSS",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "65118f531b90b4fc77015084",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "68f2f70e37e0458bf16acd29",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5c0d688c86f77413ae3407b2",
                                        "61962d879bb3d20b0946d385",
                                        "57a0dfb82459774d3078b56c",
                                        "57a0e5022459774d1673f889",
                                        "5c0d668f86f7747ccb7f13b2",
                                        "6576f96220d53a5b8f3e395e"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 9x39 VSS/VAL 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresVSSMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArVSS",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "65118f531b90b4fc77015083",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' VSS Mag",
                    ShortName = "AresVSS",
                    Description = "Ares' 9x39 VSS/VAL 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArBlick(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "68f2f70e6d198f7eabc05324",
            NewItemName = "ArBlick",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "66015dc4aaad2f54cb04c56b",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "68f2f70e6d198f7eabc05324",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "6601546f86889319850bd566"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 20x1mm Blicky 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresBlickyMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArBlick",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "66015dc4aaad2f54cb04c56a",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' Blicky Mag",
                    ShortName = "AresBlick",
                    Description = "Ares' 20x1mm Blicky 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }

    public static NewItemFromCloneDetails ArSrmp(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            NewId = "661c917436409c2d18e5afb7",
            NewItemName = "ArSrmp",
            ParentId = "5448bc234bdc2d3c308b4569",
            OverrideProperties = new TemplateItemProperties
            {
                Accuracy = cfgPath.AccuracyBonusAmount,
                BackgroundColor = "green",
                Cartridges =
                [
                    new Slot
                    {
                        Id = "59f99a7d86f7745b134aa97c",
                        MaxCount = 250,
                        Name = "cartridges",
                        Parent = "661c917436409c2d18e5afb7",
                        Prototype = "5748538b2459770af276a261",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5a269f97c4a282000b151807",
                                        "5a26abfac4a28232980eabff",
                                        "5a26ac06c4a282000c5a90a8",
                                        "5a26ac0ec4a28200741e1e18",
                                        "6576f4708ca9c4381d16cd9d",
                                        "6576f93989f0062e741ba952"
                                    ]
                                }
                            ]
                        }
                    }
                ],
                CheckOverride = 0,
                CheckTimeModifier = -5,
                Description = "Ares' 9x21 SR-1MP 250-rd Magazine",
                Durability = 100,
                Ergonomics = cfgPath.ErgoIncreaseAmount,
                ExamineExperience = 100,
                ExaminedByDefault = false,
                LoadUnloadModifier = -5,
                LootExperience = 50,
                Loudness = 0,
                MalfunctionChance = cfgPath.MalfunctionChance,
                Name = "AresShrimpMag",
                Recoil = cfgPath.RecoilReductionAmount,
                ShortName = "ArSrmp",
                Velocity = cfgPath.VelocityIncreaseAmount,
                VisibleAmmoRangesString = "1-250",
                Weight = 0.005
            },
            ItemTplToClone = "59f99a7d86f7745b134aa97b",
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Ares' Shrimp Mag",
                    ShortName = "AresShrimp",
                    Description = "Ares' 9x21 SR-1MP 250-rd Magazine"
                }
            },
            HandbookPriceRoubles = 3960,
            HandbookParentId = "5b5f754a86f774094242f19b",
            FleaPriceRoubles = 3100
        };
    }
}