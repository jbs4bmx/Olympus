/*
 *      Name: Olympus
 *   Version: 311.0.0
 * Copyright: AssAssIn
 *    Update: 31.07.2022
*/

import { DependencyContainer } from "tsyringe";
import { IMod } from "@spt-aki/models/external/mod";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { LogTextColor } from "@spt-aki/models/spt/logging/LogTextColor";
import { LogBackgroundColor } from "@spt-aki/models/spt/logging/LogBackgroundColor";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { DatabaseImporter } from "@spt-aki/utils/DatabaseImporter";
import { PreAkiModLoader } from "@spt-aki/loaders/PreAkiModLoader";

let zeusdb;

class Olympus implements IMod
{
    private pkg;
    private modName = "AssAssIn-Olympus";

    public preAkiLoad(container: DependencyContainer)
    {
        const logger = container.resolve<ILogger>("WinstonLogger");
        this.pkg = require("../package.json")
        logger.info(`Loading: ${this.pkg.author}-${this.pkg.name} v${this.pkg.version}`);
        logger.logWithColor("Zeus grants you access to enhanced mags, meds, and gear for your quests.", LogTextColor.black, LogBackgroundColor.yellow);
        logger.logWithColor("Hestia's selflessness provides you the courage and power to smite your enemies.", LogTextColor.magenta);
        logger.logWithColor("Hera, Poseidon, Demeter, Athena, Apollo, Artemis, Ares, Hephaestus, Aphrodite, ", LogTextColor.cyan);
        logger.logWithColor("Hermes, and Dionysus rally you on as you storm into battle.", LogTextColor.cyan);
    }

    public postDBLoad(container: DependencyContainer)
    {
        const logger = container.resolve<ILogger>("WinstonLogger");
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const preAkiModLoader = container.resolve<PreAkiModLoader>("PreAkiModLoader");
        const databaseImporter = container.resolve<DatabaseImporter>("DatabaseImporter");
        const locales = db.locales.global;
        this.pkg = require("../package.json");
        zeusdb = databaseImporter.loadRecursive(`${preAkiModLoader.getModPath(this.modName)}database/`);

        for (const i_item in zeusdb.templates.items.templates) {
            db.templates.items[i_item] = zeusdb.templates.items.templates[i_item];
            db.templates.items[i_item]._props.Finallowed = false;
            db.templates.items[i_item]._props.FinAllowed = false;
        }

        for (const h_item of zeusdb.templates.handbook.Items) {
            if (!db.templates.handbook.Items.find(i=>i.Id == h_item.Id)) {
                db.templates.handbook.Items.push(h_item);
            }

        }

        for (const localeID in locales) {
            for (const locale in zeusdb.locales.en.templates) {
                locales[localeID].templates[locale] = zeusdb.locales.en.templates[locale];
            }
        }

        for (const tradeName in db.traders) {
            // Ragman
            if ( tradeName === "5ac3b934156ae10c4430e83c" ) {
                logger.logWithColor("The gods are supplying Ragman with additional gear...",LogTextColor.yellow);
                for (const ri_item of zeusdb.traders.Ragman.items.list) {
                    if (!db.traders[tradeName].assort.items.find(i=>i._id == ri_item._id)) {
                        db.traders[tradeName].assort.items.push(ri_item);
                    }
                }
                for (const rb_item in zeusdb.traders.Ragman.barter_scheme) {
                    db.traders[tradeName].assort.barter_scheme[rb_item] = zeusdb.traders.Ragman.barter_scheme[rb_item];
                }
                for (const rl_item in zeusdb.traders.Ragman.loyal_level_items){
                    db.traders[tradeName].assort.loyal_level_items[rl_item] = zeusdb.traders.Ragman.loyal_level_items[rl_item];
                }
            }
            // Jaeger
            if ( tradeName === "5c0647fdd443bc2504c2d371" ) {
                logger.logWithColor("The gods are supplying Jaeger with o.p. magazines...",LogTextColor.yellow);
                for (const ji_item of zeusdb.traders.Jaeger.items.list) {
                    if (!db.traders[tradeName].assort.items.find(i=>i._id == ji_item._id)) {
                        db.traders[tradeName].assort.items.push(ji_item);
                    }
                }
                for (const jb_item in zeusdb.traders.Jaeger.barter_scheme) {
                    db.traders[tradeName].assort.barter_scheme[jb_item] = zeusdb.traders.Jaeger.barter_scheme[jb_item];
                }
                for (const jl_item in zeusdb.traders.Jaeger.loyal_level_items){
                    db.traders[tradeName].assort.loyal_level_items[jl_item] = zeusdb.traders.Jaeger.loyal_level_items[jl_item];
                }
            }
            // Therapist
            if ( tradeName === "54cb57776803fa99248b456e" ) {
                logger.logWithColor("The gods are supplying Therapist with extra buffed stimulators...",LogTextColor.yellow);
                for (const ti_item of zeusdb.traders.Therapist.items.list) {
                    if (!db.traders[tradeName].assort.items.find(i=>i._id == ti_item._id)) {
                        db.traders[tradeName].assort.items.push(ti_item);
                    }
                };
                for (const tb_item in zeusdb.traders.Therapist.barter_scheme) {
                    db.traders[tradeName].assort.barter_scheme[tb_item] = zeusdb.traders.Therapist.barter_scheme[tb_item];
                };
                for (const tl_item in zeusdb.traders.Therapist.loyal_level_items){
                    db.traders[tradeName].assort.loyal_level_items[tl_item] = zeusdb.traders.Therapist.loyal_level_items[tl_item];
                };
            }
        }


        this.pushItems(container);
        this.adjustItems(container);
        this.pushBuffs(container);

        logger.info(`${this.pkg.author}-${this.pkg.name} v${this.pkg.version}: Cached successfully`);
    }

    public postAkiLoadMod() {
        return;
    }

    public adjustItems(container: DependencyContainer): void
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const items = db.templates.items;
        const { Resize, Sicc, KeyTool, MoneyCase } = require("./config.json");

        if ( Resize ) {
            if ( Sicc.newHSize > 5 ) { items["5d235bb686f77443f4331278"]._props.Grids[0]._props.cellsH = Sicc.newHSize; }
            if ( Sicc.newVSize > 5 ) { items["5d235bb686f77443f4331278"]._props.Grids[0]._props.cellsV = Sicc.newVSize; }
            if ( KeyTool.newHSize > 4 ) { items["59fafd4b86f7745ca07e1232"]._props.Grids[0]._props.cellsH = KeyTool.newHSize; }
            if ( KeyTool.newVSize > 4 ) { items["59fafd4b86f7745ca07e1232"]._props.Grids[0]._props.cellsV = KeyTool.newVSize; }
            if ( MoneyCase.newHSize > 7 ) { items["59fb016586f7746d0d4b423a"]._props.Grids[0]._props.cellsH = MoneyCase.newHSize; }
            if ( MoneyCase.newVSize > 7 ) { items["59fb016586f7746d0d4b423a"]._props.Grids[0]._props.cellsV = MoneyCase.newVSize; }
        }
    }

    public pushItems(container: DependencyContainer): void
    {
        let sectionName = "mod_magazine";
        var i;
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const items = db.templates.items;

        // Add 'Helmet of Hermes' to head wear slot (5) in default inventory.
        items["55d7217a4bdc2d86028b456d"]._props.Slots[5]._props.filters[0].Filter.push("helmetOfHermes");

        // Add new mags to corresponding firearms.
        // Have to iterate slot numbers since the mag slot is different for each firearm.
        for ( let item in items )
        {
            let data = items[item];
            switch (data._id)
            {
                //saiga 12ga
                case "576165642459773c7a400233":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["576165642459773c7a400233"]._props.Slots[i]._props.filters[0].Filter.push("ares_12gaSaiga_250");
                        }
                    }
                    break;
                //mp133
                case "54491c4f4bdc2db1078b4568":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["54491c4f4bdc2db1078b4568"]._props.Slots[i]._props.filters[0].Filter.push("ares_12ga_250");
                        }
                    }
                    break;
                //mp153
                case "56dee2bdd2720bc8328b4567":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["56dee2bdd2720bc8328b4567"]._props.Slots[i]._props.filters[0].Filter.push("ares_12ga_250");
                        }
                    }
                    break;
                //rem m870
                case "5a7828548dc32e5a9c28b516":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            //items["5a7828548dc32e5a9c28b516"]._props.Slots[i]._props.filters[0].Filter.push("");
                        }
                    }
                    break;
                //590a
                case "5e870397991fd70db46995c8":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            //items["5e870397991fd70db46995c8"]._props.Slots[i]._props.filters[0].Filter.push("");
                        }
                    }
                    break;
                //ks-23
                case "5e848cc2988a8701445df1e8":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            //items["5e848cc2988a8701445df1e8"]._props.Slots[i]._props.filters[0].Filter.push("");
                        }
                    }
                    break;
                //toz-106
                case "5a38e6bac4a2826c6e06d79b":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5a38e6bac4a2826c6e06d79b"]._props.Slots[i]._props.filters[0].Filter.push("ares_20ga_250");
                        }
                    }
                    break;
                //ak-105
                case "5ac66d9b5acfc4001633997a":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ac66d9b5acfc4001633997a"]._props.Slots[i]._props.filters[0].Filter.push("ares_ak545_250");
                        }
                    }
                    break;
                //ak-74
                case "5bf3e03b0db834001d2c4a9c":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5bf3e03b0db834001d2c4a9c"]._props.Slots[i]._props.filters[0].Filter.push("ares_ak545_250");
                        }
                    }
                    break;
                //ak-74m
                case "5ac4cd105acfc40016339859":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ac4cd105acfc40016339859"]._props.Slots[i]._props.filters[0].Filter.push("ares_ak545_250");
                        }
                    }
                    break;
                //ak-74n
                case "5644bd2b4bdc2d3b4c8b4572":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5644bd2b4bdc2d3b4c8b4572"]._props.Slots[i]._props.filters[0].Filter.push("ares_ak545_250");
                        }
                    }
                    break;
                //aks-74
                case "5bf3e0490db83400196199af":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5bf3e0490db83400196199af"]._props.Slots[i]._props.filters[0].Filter.push("ares_ak545_250");
                        }
                    }
                    break;
                //aks-74n
                case "5ab8e9fcd8ce870019439434":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ab8e9fcd8ce870019439434"]._props.Slots[i]._props.filters[0].Filter.push("ares_ak545_250");
                        }
                    }
                    break;
                //aks-74u
                case "57dc2fa62459775949412633":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["57dc2fa62459775949412633"]._props.Slots[i]._props.filters[0].Filter.push("ares_ak545_250");
                        }
                    }
                    break;
                //aks-74ub
                case "5839a40f24597726f856b511":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5839a40f24597726f856b511"]._props.Slots[i]._props.filters[0].Filter.push("ares_ak545_250");
                        }
                    }
                    break;
                //aks-74un
                case "583990e32459771419544dd2":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["583990e32459771419544dd2"]._props.Slots[i]._props.filters[0].Filter.push("ares_ak545_250");
                        }
                    }
                    break;
                //rpk-16
                case "5beed0f50db834001c062b12":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5beed0f50db834001c062b12"]._props.Slots[i]._props.filters[0].Filter.push("ares_ak545_250");
                        }
                    }
                    break;
                //adar
                case "5c07c60e0db834002330051f":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5c07c60e0db834002330051f"]._props.Slots[i]._props.filters[0].Filter.push("ares_nato556_250");
                        }
                    }
                    break;
                //ak101 (556x45)
                case "5ac66cb05acfc40198510a10":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            //items["5ac66cb05acfc40198510a10"]._props.Slots[i]._props.filters[0].Filter.push("");
                        }
                    }
                    break;
                //ak102 (556x45)
                case "5ac66d015acfc400180ae6e4":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            //items["5ac66d015acfc400180ae6e4"]._props.Slots[i]._props.filters[0].Filter.push("");
                        }
                    }
                    break;
                //dt mdr 556
                case "5c488a752e221602b412af63":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5c488a752e221602b412af63"]._props.Slots[i]._props.filters[0].Filter.push("ares_nato556_250");
                        }
                    }
                    break;
                //hk416
                case "5bb2475ed4351e00853264e3":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5bb2475ed4351e00853264e3"]._props.Slots[i]._props.filters[0].Filter.push("ares_nato556_250");
                        }
                    }
                    break;
                //m4
                case "5447a9cd4bdc2dbd208b4567":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5447a9cd4bdc2dbd208b4567"]._props.Slots[i]._props.filters[0].Filter.push("ares_nato556_250");
                        }
                    }
                    break;
                //tx-15 lonestar
                case "5d43021ca4b9362eab4b5e25":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5d43021ca4b9362eab4b5e25"]._props.Slots[i]._props.filters[0].Filter.push("ares_nato556_250");
                        }
                    }
                    break;
                //mcx
                case "5fbcc1d9016cce60e8341ab3":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            //items["5fbcc1d9016cce60e8341ab3"]._props.Slots[i]._props.filters[0].Filter.push("");
                        }
                    }
                    break;
                //Kedr
                case "57d14d2524597714373db789":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["57d14d2524597714373db789"]._props.Slots[i]._props.filters[0].Filter.push("ares_kedr_250");
                        }
                    }
                    break;
                //Kedr-b
                case "57f3c6bd24597738e730fa2f":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["57f3c6bd24597738e730fa2f"]._props.Slots[i]._props.filters[0].Filter.push("ares_kedr_250");
                        }
                    }
                    break;
                //klin
                case "57f4c844245977379d5c14d1":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["57f4c844245977379d5c14d1"]._props.Slots[i]._props.filters[0].Filter.push("ares_kedr_250");
                        }
                    }
                    break;
                //pm
                case "5448bd6b4bdc2dfc2f8b4569":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5448bd6b4bdc2dfc2f8b4569"]._props.Slots[i]._props.filters[0].Filter.push("ares_PM_250");
                        }
                    }
                    break;
                //pm silenced
                case "56e0598dd2720bb5668b45a6":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["56e0598dd2720bb5668b45a6"]._props.Slots[i]._props.filters[0].Filter.push("ares_PM_250");
                        }
                    }
                    break;
                //pm t
                case "579204f224597773d619e051":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["579204f224597773d619e051"]._props.Slots[i]._props.filters[0].Filter.push("ares_PM_250");
                        }
                    }
                    break;
                //aps
                case "5a17f98cfcdbcb0980087290":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            //items["5a17f98cfcdbcb0980087290"]._props.Slots[i]._props.filters[0].Filter.push("");
                        }
                    }
                    break;
                //aps silenced
                case "5abccb7dd8ce87001773e277":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            //items["5abccb7dd8ce87001773e277"]._props.Slots[i]._props.filters[0].Filter.push("");
                        }
                    }
                    break;
                //mp9-n
                case "5de7bd7bfd6b4e6e2276dc25":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5de7bd7bfd6b4e6e2276dc25"]._props.Slots[i]._props.filters[0].Filter.push("ares_MP9_250");
                        }
                    }
                    break;
                //mp9
                case "5e00903ae9dc277128008b87":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5e00903ae9dc277128008b87"]._props.Slots[i]._props.filters[0].Filter.push("ares_MP9_250");
                        }
                    }
                    break;
                //mpx
                case "58948c8e86f77409493f7266":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["58948c8e86f77409493f7266"]._props.Slots[i]._props.filters[0].Filter.push("ares_MPX_250");
                        }
                    }
                    break;
                //pp19
                case "59984ab886f7743e98271174":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["59984ab886f7743e98271174"]._props.Slots[i]._props.filters[0].Filter.push("ares_PP19_250");
                        }
                    }
                    break;
                //saiga 9mm smg
                case "59f9cabd86f7743a10721f46":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["59f9cabd86f7743a10721f46"]._props.Slots[i]._props.filters[0].Filter.push("ares_PP19_250");
                        }
                    }
                    break;
                //P226r
                case "56d59856d2720bd8418b456a":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["56d59856d2720bd8418b456a"]._props.Slots[i]._props.filters[0].Filter.push("ares_P226r_250");
                        }
                    }
                    break;
                //mp-443 gratch
                case "576a581d2459771e7b1bc4f1":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["576a581d2459771e7b1bc4f1"]._props.Slots[i]._props.filters[0].Filter.push("ares_Gratch_250");
                        }
                    }
                    break;
                //glock 17
                case "5a7ae0c351dfba0017554310":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5a7ae0c351dfba0017554310"]._props.Slots[i]._props.filters[0].Filter.push("ares_Glock_250");
                        }
                    }
                    break;
                //glock 18c
                case "5b1fa9b25acfc40018633c01":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5b1fa9b25acfc40018633c01"]._props.Slots[i]._props.filters[0].Filter.push("ares_Glock_250");
                        }
                    }
                    break;
                //STM-9
                case "60339954d62c9b14ed777c06":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["60339954d62c9b14ed777c06"]._props.Slots[i]._props.filters[0].Filter.push("ares_Glock_250");
                        }
                    }
                    break;
                //vector 9x19
                case "5fc3f2d5900b1d5091531e57":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5fc3f2d5900b1d5091531e57"]._props.Slots[i]._props.filters[0].Filter.push("ares_Glock_250");
                        }
                    }
                    break;
                //M9A3
                case "5cadc190ae921500103bb3b6":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5cadc190ae921500103bb3b6"]._props.Slots[i]._props.filters[0].Filter.push("ares_M9A3_250");
                        }
                    }
                    break;
                //shrimp
                case "59f98b4986f7746f546d2cef":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["59f98b4986f7746f546d2cef"]._props.Slots[i]._props.filters[0].Filter.push("ares_Shrimp_250");
                        }
                    }
                    break;
                //m1911
                case "5e81c3cbac2bb513793cdc75":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5e81c3cbac2bb513793cdc75"]._props.Slots[i]._props.filters[0].Filter.push("ares_M1911_250");
                        }
                    }
                    break;
                //M45A1
                case "5f36a0e5fbf956000b716b65":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5f36a0e5fbf956000b716b65"]._props.Slots[i]._props.filters[0].Filter.push("ares_M1911_250");
                        }
                    }
                    break;
                //as val
                case "57c44b372459772d2b39b8ce":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["57c44b372459772d2b39b8ce"]._props.Slots[i]._props.filters[0].Filter.push("ares_VSS_250");
                        }
                    }
                    break;
                //vss
                case "57838ad32459774a17445cd2":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["57838ad32459774a17445cd2"]._props.Slots[i]._props.filters[0].Filter.push("ares_VSS_250");
                        }
                    }
                    break;
                //mp7a1
                case "5ba26383d4351e00334c93d9":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ba26383d4351e00334c93d9"]._props.Slots[i]._props.filters[0].Filter.push("ares_mp7a_250");
                        }
                    }
                    break;
                //mp7a2
                case "5bd70322209c4d00d7167b8f":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5bd70322209c4d00d7167b8f"]._props.Slots[i]._props.filters[0].Filter.push("ares_mp7a_250");
                        }
                    }
                    break;
                //fn 5-7
                case "5d3eb3b0a4b93615055e84d2":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5d3eb3b0a4b93615055e84d2"]._props.Slots[i]._props.filters[0].Filter.push("ares_57_250");
                        }
                    }
                    break;
                //fn 5-7fde
                case "5d67abc1a4b93614ec50137f":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5d67abc1a4b93614ec50137f"]._props.Slots[i]._props.filters[0].Filter.push("ares_57_250");
                        }
                    }
                    break;
                //tt
                case "571a12c42459771f627b58a0":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["571a12c42459771f627b58a0"]._props.Slots[i]._props.filters[0].Filter.push("ares_TT_250");
                        }
                    }
                    break;
                //tt gold
                case "5b3b713c5acfc4330140bd8d":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5b3b713c5acfc4330140bd8d"]._props.Slots[i]._props.filters[0].Filter.push("ares_TT_250");
                        }
                    }
                    break;
                //PPSh
                case "5ea03f7400685063ec28bfa8":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ea03f7400685063ec28bfa8"]._props.Slots[i]._props.filters[0].Filter.push("ares_PPsH_250");
                        }
                    }
                    break;
                //ak-103
                case "5ac66d2e5acfc43b321d4b53":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ac66d2e5acfc43b321d4b53"]._props.Slots[i]._props.filters[0].Filter.push("ares_ak762_250");
                        }
                    }
                    break;
                //ak-104
                case "5ac66d725acfc43b321d4b60":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ac66d725acfc43b321d4b60"]._props.Slots[i]._props.filters[0].Filter.push("ares_ak762_250");
                        }
                    }
                    break;
                //akm
                case "59d6088586f774275f37482f":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["59d6088586f774275f37482f"]._props.Slots[i]._props.filters[0].Filter.push("ares_ak762_250");
                        }
                    }
                    break;
                //akmn
                case "5a0ec13bfcdbcb00165aa685":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5a0ec13bfcdbcb00165aa685"]._props.Slots[i]._props.filters[0].Filter.push("ares_ak762_250");
                        }
                    }
                    break;
                //akms
                case "59ff346386f77477562ff5e2":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["59ff346386f77477562ff5e2"]._props.Slots[i]._props.filters[0].Filter.push("ares_ak762_250");
                        }
                    }
                    break;
                //akmsn
                case "5abcbc27d8ce8700182eceeb":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5abcbc27d8ce8700182eceeb"]._props.Slots[i]._props.filters[0].Filter.push("ares_ak762_250");
                        }
                    }
                    break;
                //vpo-136
                case "59e6152586f77473dc057aa1":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["59e6152586f77473dc057aa1"]._props.Slots[i]._props.filters[0].Filter.push("ares_VPO_250e");
                        }
                    }
                    break;
                //vpo-209 .366tkm
                case "59e6687d86f77411d949b251":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["59e6687d86f77411d949b251"]._props.Slots[i]._props.filters[0].Filter.push("ares_VPO_250e");
                        }
                    }
                    break;
                //sks
                case "574d967124597745970e7c94":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            //items["574d967124597745970e7c94"]._props.Slots[i]._props.filters[0].Filter.push("");
                        }
                    }
                    break;
                //opsks
                case "587e02ff24597743df3deaeb":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            //items["587e02ff24597743df3deaeb"]._props.Slots[i]._props.filters[0].Filter.push("");
                        }
                    }
                    break;
                //mk47
                case "606587252535c57a13424cfd":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            //items["606587252535c57a13424cfd"]._props.Slots[i]._props.filters[0].Filter.push("");
                        }
                    }
                    break;
                //Vepr Hunter
                case "5c501a4d2e221602b412b540":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5c501a4d2e221602b412b540"]._props.Slots[i]._props.filters[0].Filter.push("ares_VepHunt_250");
                        }
                    }
                    break;
                //dvl
                case "588892092459774ac91d4b11":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["588892092459774ac91d4b11"]._props.Slots[i]._props.filters[0].Filter.push("ares_DVL_250");
                        }
                    }
                    break;
                //M1A
                case "5aafa857e5b5b00018480968":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5aafa857e5b5b00018480968"]._props.Slots[i]._props.filters[0].Filter.push("ares_M1A_250");
                        }
                    }
                    break;
                //M700
                case "5bfea6e90db834001b7347f3":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5bfea6e90db834001b7347f3"]._props.Slots[i]._props.filters[0].Filter.push("ares_M700_250");
                        }
                    }
                    break;
                //SA-58
                case "5b0bbe4e5acfc40dc528a72d":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5b0bbe4e5acfc40dc528a72d"]._props.Slots[i]._props.filters[0].Filter.push("ares_SA58_250");
                        }
                    }
                    break;
                //RFB
                case "5f2a9575926fd9352339381f":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5f2a9575926fd9352339381f"]._props.Slots[i]._props.filters[0].Filter.push("ares_SA58_250");
                        }
                    }
                    break;
                //sr25
                case "5df8ce05b11454561e39243b":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5df8ce05b11454561e39243b"]._props.Slots[i]._props.filters[0].Filter.push("ares_SR25_250");
                        }
                    }
                    break;
                //rsass
                case "5a367e5dc4a282000e49738f":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5a367e5dc4a282000e49738f"]._props.Slots[i]._props.filters[0].Filter.push("ares_SR25_250");
                        }
                    }
                    break;
                //dt mdr 762
                case "5dcbd56fdbd3d91b3e5468d5":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5dcbd56fdbd3d91b3e5468d5"]._props.Slots[i]._props.filters[0].Filter.push("ares_SR25_250");
                        }
                    }
                    break;
                //T5000
                case "5df24cf80dee1b22f862e9bc":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5df24cf80dee1b22f862e9bc"]._props.Slots[i]._props.filters[0].Filter.push("ares_T5000_250");
                        }
                    }
                    break;
                //svds
                case "5c46fbd72e2216398b5a8c9c":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5c46fbd72e2216398b5a8c9c"]._props.Slots[i]._props.filters[0].Filter.push("ares_SVDS_250");
                        }
                    }
                    break;
                //sv98
                case "55801eed4bdc2d89578b4588":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["55801eed4bdc2d89578b4588"]._props.Slots[i]._props.filters[0].Filter.push("ares_SVDS_250");
                        }
                    }
                    break;
                //Ash12
                case "5cadfbf7ae92152ac412eeef":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5cadfbf7ae92152ac412eeef"]._props.Slots[i]._props.filters[0].Filter.push("ares_Ash12_250");
                        }
                    }
                    break;
                //Mosin sniper
                case "5ae08f0a5acfc408fb1398a1":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ae08f0a5acfc408fb1398a1"]._props.Slots[i]._props.filters[0].Filter.push("ares_MosinInt_250","ares_MosinAngel_250");
                        }
                    }
                    break;
                //Mosin infantry
                case "5bfd297f0db834001a669119":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5bfd297f0db834001a669119"]._props.Slots[i]._props.filters[0].Filter.push("ares_MosinInt_250","ares_MosinAngel_250");
                        }
                    }
                    break;
                //mp5 burst
                case "5926bb2186f7744b1c6c6e60":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5926bb2186f7744b1c6c6e60"]._props.Slots[i]._props.filters[0].Filter.push("ares_MP5_250");
                        }
                    }
                    break;
                //mp5
                case "5d2f0d8048f0356c925bc3b0":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5d2f0d8048f0356c925bc3b0"]._props.Slots[i]._props.filters[0].Filter.push("ares_MP5_250");
                        }
                    }
                    break;
                //P90
                case "5cc82d76e24e8d00134b4b83":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5cc82d76e24e8d00134b4b83"]._props.Slots[i]._props.filters[0].Filter.push("ares_P90_250e");
                        }
                    }
                    break;
                //VPO-215
                case "5de652c31b7e3716273428be":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5de652c31b7e3716273428be"]._props.Slots[i]._props.filters[0].Filter.push("ares_VPO_250");
                        }
                    }
                    break;
                //ump
                case "5fc3e272f8b6a877a729eac5":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5fc3e272f8b6a877a729eac5"]._props.Slots[i]._props.filters[0].Filter.push("ares_ump_250");
                        }
                    }
                    break;
                //Vector 45
                case "5fb64bc92b1b027b1f50bcf2":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5fb64bc92b1b027b1f50bcf2"]._props.Slots[i]._props.filters[0].Filter.push("ares_vector45_250");
                        }
                    }
                    break;
                //mk-18 lapua
                case "5fc22d7c187fea44d52eda44":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5fc22d7c187fea44d52eda44"]._props.Slots[i]._props.filters[0].Filter.push("ares_mk18_250");
                        }
                    }
                    break;
                //PL-15
                case "602a9740da11d6478d5a06dc":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["602a9740da11d6478d5a06dc"]._props.Slots[i]._props.filters[0].Filter.push("ares_pl15_250");
                        }
                    }
                    break;
                default:
                    break;
            }
        }
    }

    public pushBuffs(container: DependencyContainer): void {
        const oldGlobals = container.resolve<DatabaseServer>("DatabaseServer").getTables().globals.config;
        const gameBuffs = oldGlobals.Health.Effects.Stimulator.Buffs;
        const additions = zeusdb.templates.buffs;
        for (const stimBuff in additions) {
            gameBuffs[stimBuff] = additions[stimBuff];
        }
    }

}
module.exports = { mod: new Olympus() }