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

[Injectable(TypePriority = OnLoadOrder.Preload + 1002)]
internal class AddItemsRigsHelper(SptLogger<AddItemsRigsHelper> logger, CustomItemService customItemService, ModHelper modHelper)
{
    public void Apply()
    {
        var pathToMod = System.IO.Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)!;
        var cfgPath = modHelper.GetJsonDataFromFile<ModConfig>(pathToMod, "MOConfig.jsonc");

        var debug = cfgPath?.EnableDebugLogging == true;

        customItemService.CreateItemFromClone(Athena(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsRigsHelper] Created Item: Athena");
        customItemService.CreateItemFromClone(AtSatch());
        if (debug) logger.Info($"[Olympus][AddItemsRigsHelper] Created Item: AtSatch");
        customItemService.CreateItemFromClone(Herc1(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsRigsHelper] Created Item: Herc1");
        customItemService.CreateItemFromClone(Herc2(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsRigsHelper] Created Item: Herc2");
        customItemService.CreateItemFromClone(Hermes(cfgPath!));
        if (debug) logger.Info($"[Olympus][AddItemsRigsHelper] Created Item: Hermes");
    }

    public static NewItemFromCloneDetails Athena(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            ItemTplToClone = "5ca21c6986f77479963115a7",
            NewId = "661c91744502ba91ef63c8d7",
            NewItemName = "athena_armor",
            ParentId = "5448e54d4bdc2dcc718b4568",
            HandbookPriceRoubles = 23315,
            HandbookParentId = "5b5f701386f774093f2ecf0f",
            FleaPriceRoubles = 19000,
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Armor of Athena",
                    ShortName = "Athena",
                    Description = "The Armor Of Athena provides the highest level of protection for all your common body parts.A bit on the heavy side(this was worn by a god after all) you might want to couple it with the Helmet of Hermes."
                }
            },
            OverrideProperties = new TemplateItemProperties
            {
                ArmorMaterial = ArmorMaterial.ArmoredSteel,
                ArmorType = "Heavy",
                BackgroundColor = "yellow",
                BluntThroughput = 0,
                Description = "The Armor Of Athena provides the highest level of protection for all your common body parts.A bit on the heavy side (this was worn by a god after all) you might want to couple it with the Helmet of Hermes.",
                Durability = cfgPath.AthenaArmorAmount,
                ExaminedByDefault = false,
                ExamineExperience = 200,
                Indestructibility = 1,
                LootExperience = 100,
                MaterialType = "BodyArmor",
                MaxDurability = cfgPath.AthenaArmorAmount,
                Name = "Armor of Athena",
                RepairCost = 50,
                RepairSpeed = 5,
                RicochetChance = 0,
                ShortName = "Athena",
                Slots = [],
                Weight = 5,
                ArmorClass = 10,
                ArmorColliders =
                [
                    "RibcageUp",
                    "RibcageLow",
                    "SpineTop",
                    "SpineDown",
                    "LeftSideChestUp",
                    "RightSideChestUp",
                    "LeftSideChestDown",
                    "RightSideChestDown",
                    "NeckBack",
                    "LeftUpperArm",
                    "RightUpperArm",
                    "Pelvis",
                    "PelvisBack"
                ],
                ArmorPlateColliders = [],
                SpeedPenaltyPercent = 0,
                MousePenalty = 0,
                WeaponErgonomicPenalty = 0
            }
        };
    }

    public static NewItemFromCloneDetails AtSatch()
    {
        return new NewItemFromCloneDetails
        {
            ItemTplToClone = "56e33680d2720be2748b4576",
            NewId = "661c917426ba940d7138e5cf",
            NewItemName = "atlas_satchel",
            ParentId = "5448e53e4bdc2d60728b4567",
            HandbookPriceRoubles = 7775,
            HandbookParentId = "5b5f6f6c86f774093f2ecf0b",
            FleaPriceRoubles = 6000,
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en "] = new LocaleDetails
                {
                    Name = "Atlas ' Satchel",
                    ShortName = "AtSatch",
                    Description = "With Atlas' Satchel, you feel like you could carry the world on your back."
                }
            },
            OverrideProperties = new TemplateItemProperties
            {
                BackgroundColor = "yellow",
                Description = "With Atlas' Satchel, you feel like you could carry the world on your back.",
                ExaminedByDefault = false,
                ExamineExperience = 100,
                LootExperience = 50,
                Name = "Atlas' Satchel",
                ShortName = "AtSatch",
                Weight = 0.01,
                MousePenalty = 0,
                SpeedPenaltyPercent = 0,
                WeaponErgonomicPenalty = 0
            }
        };
    }

    public static NewItemFromCloneDetails Herc1(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            ItemTplToClone = "5df8a42886f77412640e2e75",
            NewId = "661c9174018549befc3a7d62",
            NewItemName = "hercules_rig_1",
            ParentId = "5448e5284bdc2dcb718b4567",
            HandbookPriceRoubles = 23315,
            HandbookParentId = "5b5f6f8786f77447ed563642",
            FleaPriceRoubles = 19000,
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Hercules' Rig",
                    ShortName = "Herc1",
                    Description = "The main rig of choice of Hercules. It grants the wearer the ability to carry immense amounts of weight, just like the demigod himself."
                }
            },
            OverrideProperties = new TemplateItemProperties
            {
                BackgroundColor = "yellow",
                Description = "The main rig of choice of Hercules. It grants the wearer the ability to carry immense amounts of weight, just like the demigod himself.",
                ExaminedByDefault = false,
                ExamineExperience = 150,
                LootExperience = 60,
                Name = "Hercules' Rig",
                ShortName = "Herc1",
                Weight = cfgPath.Herc1RigWeightDrop,
                MousePenalty = 0,
                SpeedPenaltyPercent = 0,
                WeaponErgonomicPenalty = 0
            }
        };
    }

    public static NewItemFromCloneDetails Herc2(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            ItemTplToClone = "5d5d87f786f77427997cfaef",
            NewId = "661c9174d9718c60a32fe5b4",
            NewItemName = "hercules_rig_2",
            ParentId = "5448e5284bdc2dcb718b4567",
            HandbookPriceRoubles = 23315,
            HandbookParentId = "5b5f6f8786f77447ed563642",
            FleaPriceRoubles = 19000,
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Hercules' Rig 2",
                    ShortName = "Herc2",
                    Description = "The battle rig of choice of Hercules.It grants the wearer strength and protection."
                }
            },
            OverrideProperties = new TemplateItemProperties
            {
                ArmorMaterial = ArmorMaterial.Combined,
                ArmorType = "Heavy",
                BackgroundColor = "yellow",
                BlocksArmorVest = true,
                BluntThroughput = 0,
                Description = "The battle rig of choice of Hercules.It grants the wearer strength and protection.",
                Durability = cfgPath.Herc2ArmorAmount,
                ExaminedByDefault = false,
                ExamineExperience = 1000,
                Grids =
                [
                    new Grid
                    {
                        Id = "5d5d87f786f77427997cfaf1",
                        Name = "1",
                        Parent = "661c9174d9718c60a32fe5b4",
                        Properties = new GridProperties
                        {
                            CellsH = 1,
                            CellsV = 2,
                            Filters =
                            [
                                new GridFilter
                                {
                                    ExcludedFilter =
                                    [
                                        "5448bf274bdc2dfc2f8b456a"
                                    ],
                                    Filter =
                                    [
                                        "54009119af1c881c07000029"
                                    ]
                                }
                            ],
                            IsSortingTable = false,
                            MaxCount = 0,
                            MaxWeight = 0,
                            MinCount = 0
                        },
                        Prototype = "55d329c24bdc2d892f8b4567"
                    },
                    new Grid
                    {
                        Id = "5d5d87f786f77427997cfaf2",
                        Name = "2",
                        Parent = "661c9174d9718c60a32fe5b4",
                        Properties = new GridProperties
                        {
                            CellsH = 1,
                            CellsV = 2,
                            Filters =
                            [
                                new GridFilter
                            {
                                ExcludedFilter =
                                [
                                    "5448bf274bdc2dfc2f8b456a"
                                ],
                                Filter =
                                [
                                    "54009119af1c881c07000029"
                                ]
                            }
                            ],
                            IsSortingTable = false,
                            MaxCount = 0,
                            MaxWeight = 0,
                            MinCount = 0
                        },
                        Prototype = "55d329c24bdc2d892f8b4567"
                    },
                    new Grid
                    {
                        Id = "5d5d87f786f77427997cfaf3",
                        Name = "3",
                        Parent = "661c9174d9718c60a32fe5b4",
                        Properties = new GridProperties
                        {
                            CellsH = 1,
                            CellsV = 2,
                            Filters =
                            [
                                new GridFilter
                            {
                                ExcludedFilter =
                                [
                                    "5448bf274bdc2dfc2f8b456a"
                                ],
                                Filter =
                                [
                                    "54009119af1c881c07000029"
                                ]
                            }
                            ],
                            IsSortingTable = false,
                            MaxCount = 0,
                            MaxWeight = 0,
                            MinCount = 0
                        },
                        Prototype = "55d329c24bdc2d892f8b4567"
                    },
                    new Grid
                    {
                        Id = "5d5d87f786f77427997cfaf4",
                        Name = "4",
                        Parent = "661c9174d9718c60a32fe5b4",
                        Properties = new GridProperties
                        {
                            CellsH = 1,
                            CellsV = 2,
                            Filters =
                            [
                                new GridFilter
                            {
                                ExcludedFilter =
                                [
                                    "5448bf274bdc2dfc2f8b456a"
                                ],
                                Filter =
                                [
                                    "54009119af1c881c07000029"
                                ]
                            }
                            ],
                            IsSortingTable = false,
                            MaxCount = 0,
                            MaxWeight = 0,
                            MinCount = 0
                        },
                        Prototype = "55d329c24bdc2d892f8b4567"
                    },
                    new Grid
                    {
                        Id = "5d5d87f786f77427997cfaf5",
                        Name = "5",
                        Parent = "661c9174d9718c60a32fe5b4",
                        Properties = new GridProperties
                        {
                            CellsH = 1,
                            CellsV = 2,
                            Filters =
                            [
                                new GridFilter
                            {
                                ExcludedFilter =
                                [
                                    "5448bf274bdc2dfc2f8b456a"
                                ],
                                Filter =
                                [
                                    "54009119af1c881c07000029"
                                ]
                            }
                            ],
                            IsSortingTable = false,
                            MaxCount = 0,
                            MaxWeight = 0,
                            MinCount = 0
                        },
                        Prototype = "55d329c24bdc2d892f8b4567"
                    },
                    new Grid
                    {
                        Id = "5d5d87f786f77427997cfaf6",
                        Name = "6",
                        Parent = "661c9174d9718c60a32fe5b4",
                        Properties = new GridProperties
                        {
                            CellsH = 1,
                            CellsV = 2,
                            Filters =
                            [
                                new GridFilter
                            {
                                ExcludedFilter =
                                [
                                    "5448bf274bdc2dfc2f8b456a"
                                ],
                                Filter =
                                [
                                    "54009119af1c881c07000029"
                                ]
                            }
                            ],
                            IsSortingTable = false,
                            MaxCount = 0,
                            MaxWeight = 0,
                            MinCount = 0
                        },
                        Prototype = "55d329c24bdc2d892f8b4567"
                    },
                    new Grid
                    {
                        Id = "5d5d87f786f77427997cfaf7",
                        Name = "7",
                        Parent = "661c9174d9718c60a32fe5b4",
                        Properties = new GridProperties
                        {
                            CellsH = 1,
                            CellsV = 2,
                            Filters =
                            [
                                new GridFilter
                                {
                                    ExcludedFilter =
                                    [
                                        "5448bf274bdc2dfc2f8b456a"
                                    ],
                                    Filter =
                                    [
                                        "54009119af1c881c07000029"
                                    ]
                                }
                            ],
                            IsSortingTable = false,
                            MaxCount = 0,
                            MaxWeight = 0,
                            MinCount = 0
                        },
                        Prototype = "55d329c24bdc2d892f8b4567"
                    },
                    new Grid
                    {
                        Id = "5d5d87f786f77427997cfaf8",
                        Name = "8",
                        Parent = "661c9174d9718c60a32fe5b4",
                        Properties = new GridProperties
                        {
                            CellsH = 1,
                            CellsV = 2,
                            Filters =
                            [
                                new GridFilter
                                {
                                    ExcludedFilter =
                                    [
                                        "5448bf274bdc2dfc2f8b456a"
                                    ],
                                    Filter =
                                    [
                                        "54009119af1c881c07000029"
                                    ]
                                }
                            ],
                            IsSortingTable = false,
                            MaxCount = 0,
                            MaxWeight = 0,
                            MinCount = 0
                        },
                        Prototype = "55d329c24bdc2d892f8b4567"
                    },
                    new Grid
                    {
                        Id = "5d5d87f786f77427997cfaf9",
                        Name = "9",
                        Parent = "661c9174d9718c60a32fe5b4",
                        Properties = new GridProperties
                        {
                            CellsH = 1,
                            CellsV = 2,
                            Filters =
                            [
                                new GridFilter
                                {
                                    ExcludedFilter =
                                    [
                                        "5448bf274bdc2dfc2f8b456a"
                                    ],
                                    Filter =
                                    [
                                        "54009119af1c881c07000029"
                                    ]
                                }
                            ],
                            IsSortingTable = false,
                            MaxCount = 0,
                            MaxWeight = 0,
                            MinCount = 0
                        },
                        Prototype = "55d329c24bdc2d892f8b4567"
                    },
                    new Grid
                    {
                        Id = "5d5d8b4e86f7742797262045",
                        Name = "10",
                        Parent = "661c9174d9718c60a32fe5b4",
                        Properties = new GridProperties
                        {
                            CellsH = 1,
                            CellsV = 2,
                            Filters =
                            [
                                new GridFilter
                                {
                                    ExcludedFilter =
                                    [
                                        "5448bf274bdc2dfc2f8b456a"
                                    ],
                                    Filter =
                                    [
                                        "54009119af1c881c07000029"
                                    ]
                                }
                            ],
                            IsSortingTable = false,
                            MaxCount = 0,
                            MaxWeight = 0,
                            MinCount = 0
                        },
                        Prototype = "55d329c24bdc2d892f8b4567"
                    },
                    new Grid
                    {
                        Id = "5d5d8b5b86f774393602d6cf",
                        Name = "11",
                        Parent = "661c9174d9718c60a32fe5b4",
                        Properties = new GridProperties
                        {
                            CellsH = 1,
                            CellsV = 1,
                            Filters =
                            [
                                new GridFilter
                                {
                                    ExcludedFilter =
                                    [
                                        "5448bf274bdc2dfc2f8b456a"
                                    ],
                                    Filter =
                                    [
                                        "54009119af1c881c07000029"
                                    ]
                                }
                            ],
                            IsSortingTable = false,
                            MaxCount = 0,
                            MaxWeight = 0,
                            MinCount = 0
                        },
                        Prototype = "55d329c24bdc2d892f8b4567"
                    },
                    new Grid
                    {
                        Id = "5d5d8b6086f77427997cfafb",
                        Name = "12",
                        Parent = "661c9174d9718c60a32fe5b4",
                        Properties = new GridProperties
                        {
                            CellsH = 1,
                            CellsV = 1,
                            Filters =
                            [
                                new GridFilter
                                {
                                    ExcludedFilter =
                                    [
                                        "5448bf274bdc2dfc2f8b456a"
                                    ],
                                    Filter =
                                    [
                                        "54009119af1c881c07000029"
                                    ]
                                }
                            ],
                            IsSortingTable = false,
                            MaxCount = 0,
                            MaxWeight = 0,
                            MinCount = 0
                        },
                        Prototype = "55d329c24bdc2d892f8b4567"
                    },
                    new Grid
                    {
                        Id = "5d5d8b6686f7744a7a274304",
                        Name = "13",
                        Parent = "661c9174d9718c60a32fe5b4",
                        Properties = new GridProperties
                        {
                            CellsH = 1,
                            CellsV = 1,
                            Filters =
                            [
                                new GridFilter
                                {
                                    ExcludedFilter =
                                    [
                                        "5448bf274bdc2dfc2f8b456a"
                                    ],
                                    Filter =
                                    [
                                        "54009119af1c881c07000029"
                                    ]
                                }
                            ],
                            IsSortingTable = false,
                            MaxCount = 0,
                            MaxWeight = 0,
                            MinCount = 0
                        },
                        Prototype = "55d329c24bdc2d892f8b4567"
                    },
                    new Grid
                    {
                        Id = "5d5d8b6c86f77439eb4c2c76",
                        Name = "14",
                        Parent = "661c9174d9718c60a32fe5b4",
                        Properties = new GridProperties
                        {
                            CellsH = 1,
                            CellsV = 1,
                            Filters =
                            [
                                new GridFilter
                                {
                                    ExcludedFilter =
                                    [
                                        "5448bf274bdc2dfc2f8b456a"
                                    ],
                                    Filter =
                                    [
                                        "54009119af1c881c07000029"
                                    ]
                                }
                            ],
                            IsSortingTable = false,
                            MaxCount = 0,
                            MaxWeight = 0,
                            MinCount = 0
                        },
                        Prototype = "55d329c24bdc2d892f8b4567"
                    },
                    new Grid
                    {
                        Id = "5d5d8b7286f774279a21cbe6",
                        Name = "15",
                        Parent = "661c9174d9718c60a32fe5b4",
                        Properties = new GridProperties
                        {
                            CellsH = 1,
                            CellsV = 1,
                            Filters =
                            [
                                new GridFilter
                                {
                                    ExcludedFilter =
                                    [
                                        "5448bf274bdc2dfc2f8b456a"
                                    ],
                                    Filter =
                                    [
                                        "54009119af1c881c07000029"
                                    ]
                                }
                            ],
                            IsSortingTable = false,
                            MaxCount = 0,
                            MaxWeight = 0,
                            MinCount = 0
                        },
                        Prototype = "55d329c24bdc2d892f8b4567"
                    }
                ],
                Indestructibility = 1,
                LootExperience = 160,
                MaxDurability = cfgPath.Herc2ArmorAmount,
                Name = "Hercules' Rig 2",
                RepairCost = 60,
                RepairSpeed = 5,
                RicochetChance = 0,
                ShortName = "Herc2",
                Slots = [],
                Weight = cfgPath.Herc2RigWeightDrop,
                ArmorClass = 10,
                ArmorColliders =
                [
                    "RibcageUp",
                    "SpineTop",
                    "LeftSideChestUp",
                    "RightSideChestUp"
                ],
                ArmorPlateColliders = [],
                //ArmorZone = [],
                MousePenalty = 0,
                SpeedPenaltyPercent = 0,
                WeaponErgonomicPenalty = 0
            }
        };
    }

    public static NewItemFromCloneDetails Hermes(ModConfig cfgPath)
    {
        return new NewItemFromCloneDetails
        {
            ItemTplToClone = "5e00c1ad86f774747333222c",
            NewId = "661c9174a371d90e62b8f5c4",
            NewItemName = "helmet_hermes",
            ParentId = "5a341c4086f77401f2541505",
            HandbookPriceRoubles = 19429,
            HandbookParentId = "5b47574386f77428ca22b330",
            FleaPriceRoubles = 17000,
            Locales = new Dictionary<string, LocaleDetails>
            {
                ["en"] = new LocaleDetails
                {
                    Name = "Helmet Of Hermes",
                    ShortName = "Hermes",
                    Description = "The Helmet of Hermes protects your entire head while also making you feel light on your feet."
                }
            },
            OverrideProperties = new TemplateItemProperties
            {
                ArmorMaterial = ArmorMaterial.ArmoredSteel,
                ArmorType = "Heavy",
                BackgroundColor = "yellow",
                BlindnessProtection = 100,
                BlocksEarpiece = false,
                BlocksEyewear = false,
                BlocksFaceCover = false,
                BlocksHeadwear = false,
                BluntThroughput = 0,
                DeafStrength = "None",
                Description = "The Helmet of Hermes protects your entire head while also making you feel light on your feet.",
                Durability = cfgPath.HelmetArmorAmount,
                ExaminedByDefault = false,
                ExamineExperience = 200,
                Indestructibility = 1,
                LootExperience = 100,
                MaxDurability = cfgPath.HelmetArmorAmount,
                Name = "Helmet Of Hermes",
                RepairCost = 40,
                RepairSpeed = 5,
                RicochetChance = 0,
                ShortName = "Hermes",
                Slots =
                [
                    new Slot
                    {
                        Id = "5e00c1ad86f774747333222e",
                        MergeSlotWithChildren = false,
                        Name = "mod_equipment_000",
                        Parent = "661c9174a371d90e62b8f5c4",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5e00cfa786f77469dc6e5685",
                                        "5e01f31d86f77465cf261343",
                                        "66b5f69ea7f72d197e70bcdb",
                                        "66b5f6a28ca68c6461709ed8"
                                    ],
                                    Shift = 0
                                }
                            ]
                        },
                        Prototype = "55d30c4c4bdc2db4468b457e",
                        Required = false
                    },
                    new Slot
                    {
                        Id = "5e00c1ad86f774747333222f",
                        MergeSlotWithChildren = false,
                        Name = "mod_nvg",
                        Parent = "661c9174a371d90e62b8f5c4",
                        Properties = new SlotProperties
                        {
                            Filters =
                            [
                                new SlotFilter
                                {
                                    Filter =
                                    [
                                        "5c0558060db834001b735271",
                                        "5a16b8a9fcdbcb00165aa6ca"
                                    ],
                                    Shift = 0
                                }
                            ]
                        },
                        Prototype = "55d30c4c4bdc2db4468b457e",
                        Required = false
                    }
                ],
                Weight = 0.01,
                ArmorClass = 10,
                ArmorColliders =
                [
                    "ParietalHead",
                    "BackHead"
                ],
                ArmorPlateColliders = [],
                MousePenalty = 0,
                SpeedPenaltyPercent = 0,
                WeaponErgonomicPenalty = 0
            }
        };
    }
}