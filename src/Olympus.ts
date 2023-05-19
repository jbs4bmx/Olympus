/**
 * Copyright: AssAssIn
 * Continued By: jbs4bmx
*/

import { DependencyContainer } from "tsyringe";
import { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import { IPostDBLoadMod } from "@spt-aki/models/externals/IPostDBLoadMod";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { ImporterUtil } from "@spt-aki/utils/ImporterUtil";
import { PreAkiModLoader } from "@spt-aki/loaders/PreAkiModLoader";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { IBotConfig } from "@spt-aki/models/spt/config/IBotConfig";

let zeusdb;

class Olympus implements IPreAkiLoadMod, IPostDBLoadMod
{
    private pkg;
    private path = require('path');
    private modName = this.path.basename(this.path.dirname(__dirname.split('/').pop()));

    public postDBLoad(container: DependencyContainer)
    {
        const logger = container.resolve<ILogger>("WinstonLogger");
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const preAkiModLoader = container.resolve<PreAkiModLoader>("PreAkiModLoader");
        const databaseImporter = container.resolve<ImporterUtil>("ImporterUtil");
        const locales = db.locales.global;
        this.pkg = require("../package.json");
        zeusdb = databaseImporter.loadRecursive(`${preAkiModLoader.getModPath(this.modName)}database/`);

        for (const i_item in zeusdb.templates.items) {
            db.templates.items[i_item] = zeusdb.templates.items[i_item];
        }

        for (const h_item of zeusdb.templates.handbook.Items) {
            if (!db.templates.handbook.Items.find(i=>i.Id == h_item.Id)) {
                db.templates.handbook.Items.push(h_item);
            }

        }

        for (const localeID in locales) {
            for (const locale in zeusdb.locales.en) {
                locales[localeID][locale] = zeusdb.locales.en[locale];
            }
        }

        for (const p_item in zeusdb.templates.prices) {
            db.templates.prices[p_item] = zeusdb.templates.prices[p_item];
        }

        for (const tradeName in db.traders) {
            if ( tradeName === "5ac3b934156ae10c4430e83c" ) {
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

            if ( tradeName === "5c0647fdd443bc2504c2d371" ) {
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

            if ( tradeName === "54cb57776803fa99248b456e" ) {
                for (const ti_item of zeusdb.traders.Therapist.items.list) {
                    if (!db.traders[tradeName].assort.items.find(i=>i._id == ti_item._id)) {
                        db.traders[tradeName].assort.items.push(ti_item);
                    }
                }
                for (const tb_item in zeusdb.traders.Therapist.barter_scheme) {
                    db.traders[tradeName].assort.barter_scheme[tb_item] = zeusdb.traders.Therapist.barter_scheme[tb_item];
                }
                for (const tl_item in zeusdb.traders.Therapist.loyal_level_items){
                    db.traders[tradeName].assort.loyal_level_items[tl_item] = zeusdb.traders.Therapist.loyal_level_items[tl_item];
                }
            }
        }

        this.pushItems(container);
        this.adjustItems(container);
        this.pushBuffs(container);
        this.checkExclusions(container);

        logger.info(`${this.pkg.author}-${this.pkg.name} v${this.pkg.version}: Cached successfully`);
        logger.log("Zeus grants you access to enhanced mags, meds, and gear for your quests.", "yellow");
        logger.log("Hestia's selflessness provides you the courage and power to smite your enemies.", "magenta");
        logger.log("Hera, Poseidon, Demeter, Athena, Apollo, Artemis, Ares, Hephaestus, Aphrodite, ", "cyan");
        logger.log("Hermes, and Dionysus rally you on as you storm into battle.", "cyan");
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

        items["55d7217a4bdc2d86028b456d"]._props.Slots[5]._props.filters[0].Filter.push("helmetOfHermes");

        for ( let item in items )
        {
            let data = items[item];
            switch (data._id) {
                case "5ac4cd105acfc40016339859":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ac4cd105acfc40016339859"]._props.Slots[i]._props.filters[0].Filter.push("a250_545pmag_30");
                        }
                    }
                    break;
                case "5bf3e03b0db834001d2c4a9c":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5bf3e03b0db834001d2c4a9c"]._props.Slots[i]._props.filters[0].Filter.push("a250_545pmag_30");
                        }
                    }
                    break;
                case "5644bd2b4bdc2d3b4c8b4572":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5644bd2b4bdc2d3b4c8b4572"]._props.Slots[i]._props.filters[0].Filter.push("a250_545pmag_30");
                        }
                    }
                    break;
                case "5ab8e9fcd8ce870019439434":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ab8e9fcd8ce870019439434"]._props.Slots[i]._props.filters[0].Filter.push("a250_545pmag_30");
                        }
                    }
                    break;
                case "5839a40f24597726f856b511":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5839a40f24597726f856b511"]._props.Slots[i]._props.filters[0].Filter.push("a250_545pmag_30");
                        }
                    }
                    break;
                case "583990e32459771419544dd2":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["583990e32459771419544dd2"]._props.Slots[i]._props.filters[0].Filter.push("a250_545pmag_30");
                        }
                    }
                    break;
                case "57dc2fa62459775949412633":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["57dc2fa62459775949412633"]._props.Slots[i]._props.filters[0].Filter.push("a250_545pmag_30");
                        }
                    }
                    break;
                case "5bf3e0490db83400196199af":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5bf3e0490db83400196199af"]._props.Slots[i]._props.filters[0].Filter.push("a250_545pmag_30");
                        }
                    }
                    break;
                case "628b9c37a733087d0d7fe84b":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["628b9c37a733087d0d7fe84b"]._props.Slots[i]._props.filters[0].Filter.push("a250_545pmag_30");
                        }
                    }
                    break;
                case "628b5638ad252a16da6dd245":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["628b5638ad252a16da6dd245"]._props.Slots[i]._props.filters[0].Filter.push("a250_545pmag_30");
                        }
                    }
                    break;
                case "5ac66d9b5acfc4001633997a":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ac66d9b5acfc4001633997a"]._props.Slots[i]._props.filters[0].Filter.push("a250_545pmag_30");
                        }
                    }
                    break;
                case "5beed0f50db834001c062b12":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5beed0f50db834001c062b12"]._props.Slots[i]._props.filters[0].Filter.push("a250_545pmag_30");
                        }
                    }
                    break;
                case "5ac66d2e5acfc43b321d4b53":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ac66d2e5acfc43b321d4b53"]._props.Slots[i]._props.filters[0].Filter.push("a250_762pmag_30");
                        }
                    }
                    break;
                case "5ac66d725acfc43b321d4b60":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ac66d725acfc43b321d4b60"]._props.Slots[i]._props.filters[0].Filter.push("a250_762pmag_30");
                        }
                    }
                    break;
                case "59ff346386f77477562ff5e2":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["59ff346386f77477562ff5e2"]._props.Slots[i]._props.filters[0].Filter.push("a250_762pmag_30");
                        }
                    }
                    break;
                case "606587252535c57a13424cfd":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["606587252535c57a13424cfd"]._props.Slots[i]._props.filters[0].Filter.push("a250_762pmag_30");
                        }
                    }
                    break;
                case "5abcbc27d8ce8700182eceeb":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5abcbc27d8ce8700182eceeb"]._props.Slots[i]._props.filters[0].Filter.push("a250_762pmag_30");
                        }
                    }
                    break;
                case "59d6088586f774275f37482f":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["59d6088586f774275f37482f"]._props.Slots[i]._props.filters[0].Filter.push("a250_762pmag_30");
                        }
                    }
                    break;
                case "5a0ec13bfcdbcb00165aa685":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5a0ec13bfcdbcb00165aa685"]._props.Slots[i]._props.filters[0].Filter.push("a250_762pmag_30");
                        }
                    }
                    break;
                case "59e6152586f77473dc057aa1":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["59e6152586f77473dc057aa1"]._props.Slots[i]._props.filters[0].Filter.push("a250_762pmag_30");
                        }
                    }
                    break;
                case "59e6687d86f77411d949b251":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["59e6687d86f77411d949b251"]._props.Slots[i]._props.filters[0].Filter.push("a250_762pmag_30");
                        }
                    }
                    break;
                case "628a60ae6b1d481ff772e9c8":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["628a60ae6b1d481ff772e9c8"]._props.Slots[i]._props.filters[0].Filter.push("a250_762pmag_30");
                        }
                    }
                    break;
                case "5dcbd56fdbd3d91b3e5468d5":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5dcbd56fdbd3d91b3e5468d5"]._props.Slots[i]._props.filters[0].Filter.push("a250_ar10pmag_20");
                        }
                    }
                    break;
                case "5b0bbe4e5acfc40dc528a72d":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5b0bbe4e5acfc40dc528a72d"]._props.Slots[i]._props.filters[0].Filter.push("a250_sa58falpoly_20");
                        }
                    }
                    break;
                case "5f2a9575926fd9352339381f":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5f2a9575926fd9352339381f"]._props.Slots[i]._props.filters[0].Filter.push("a250_sa58falpoly_20");
                        }
                    }
                    break;
                case "6165ac306ef05c2ce828ef74":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["6165ac306ef05c2ce828ef74"]._props.Slots[i]._props.filters[0].Filter.push("a250_mk17scarh_20");
                        }
                    }
                    break;
                case "6183afd850224f204c1da514":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["6183afd850224f204c1da514"]._props.Slots[i]._props.filters[0].Filter.push("a250_mk17scarh_20");
                        }
                    }
                    break;
                case "6176aca650224f204c1da3fb":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["6176aca650224f204c1da3fb"]._props.Slots[i]._props.filters[0].Filter.push("a250_g28_20");
                        }
                    }
                    break;
                case "5a367e5dc4a282000e49738f":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5a367e5dc4a282000e49738f"]._props.Slots[i]._props.filters[0].Filter.push("a250_ar10kac_20");
                        }
                    }
                    break;
                case "5df8ce05b11454561e39243b":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5df8ce05b11454561e39243b"]._props.Slots[i]._props.filters[0].Filter.push("a250_ar10kac_20");
                        }
                    }
                    break;
                case "5bfea6e90db834001b7347f3":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5bfea6e90db834001b7347f3"]._props.Slots[i]._props.filters[0].Filter.push("a250_m700pmag_20");
                        }
                    }
                    break;
                case "6184055050224f204c1da540":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["6184055050224f204c1da540"]._props.Slots[i]._props.filters[0].Filter.push("a250_556pmagwin_30");
                        }
                    }
                    break;
                case "5c07c60e0db834002330051f":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5c07c60e0db834002330051f"]._props.Slots[i]._props.filters[0].Filter.push("a250_556pmagwin_30");
                        }
                    }
                    break;
                case "5447a9cd4bdc2dbd208b4567":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5447a9cd4bdc2dbd208b4567"]._props.Slots[i]._props.filters[0].Filter.push("a250_556pmagwin_30");
                        }
                    }
                    break;
                case "5bb2475ed4351e00853264e3":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5bb2475ed4351e00853264e3"]._props.Slots[i]._props.filters[0].Filter.push("a250_556pmagwin_30");
                        }
                    }
                    break;
                case "618428466ef05c2ce828f218":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["618428466ef05c2ce828f218"]._props.Slots[i]._props.filters[0].Filter.push("a250_556pmagwin_30");
                        }
                    }
                    break;
                case "5c488a752e221602b412af63":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5c488a752e221602b412af63"]._props.Slots[i]._props.filters[0].Filter.push("a250_556pmagwin_30");
                        }
                    }
                    break;
                case "5d43021ca4b9362eab4b5e25":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5d43021ca4b9362eab4b5e25"]._props.Slots[i]._props.filters[0].Filter.push("a250_556pmagwin_30");
                        }
                    }
                    break;
                case "5fbcc1d9016cce60e8341ab3":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5fbcc1d9016cce60e8341ab3"]._props.Slots[i]._props.filters[0].Filter.push("a250_556pmagwin_30");
                        }
                    }
                    break;
                case "623063e994fc3f7b302a9696":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["623063e994fc3f7b302a9696"]._props.Slots[i]._props.filters[0].Filter.push("a250_556pmagwin_30");
                        }
                    }
                    break;
                case "57c44b372459772d2b39b8ce":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["57c44b372459772d2b39b8ce"]._props.Slots[i]._props.filters[0].Filter.push("a250_vss_30");
                        }
                    }
                    break;
                case "57838ad32459774a17445cd2":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["57838ad32459774a17445cd2"]._props.Slots[i]._props.filters[0].Filter.push("a250_vss_30");
                        }
                    }
                    break;
                case "5fb64bc92b1b027b1f50bcf2":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5fb64bc92b1b027b1f50bcf2"]._props.Slots[i]._props.filters[0].Filter.push("a250_glock45_30");
                        }
                    }
                    break;
                case "5a7ae0c351dfba0017554310":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5a7ae0c351dfba0017554310"]._props.Slots[i]._props.filters[0].Filter.push("a250_glock919_33");
                        }
                    }
                    break;
                case "5b1fa9b25acfc40018633c01":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5b1fa9b25acfc40018633c01"]._props.Slots[i]._props.filters[0].Filter.push("a250_glock919_33");
                        }
                    }
                    break;
                case "5fc3f2d5900b1d5091531e57":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5fc3f2d5900b1d5091531e57"]._props.Slots[i]._props.filters[0].Filter.push("a250_glock919_33");
                        }
                    }
                    break;
                case "60339954d62c9b14ed777c06":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["60339954d62c9b14ed777c06"]._props.Slots[i]._props.filters[0].Filter.push("a250_glock919_33");
                        }
                    }
                    break;
                case "5e00903ae9dc277128008b87":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5e00903ae9dc277128008b87"]._props.Slots[i]._props.filters[0].Filter.push("a250_mp9_30");
                        }
                    }
                    break;
                case "5de7bd7bfd6b4e6e2276dc25":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5de7bd7bfd6b4e6e2276dc25"]._props.Slots[i]._props.filters[0].Filter.push("a250_mp9_30");
                        }
                    }
                    break;
                case "5ba26383d4351e00334c93d9":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ba26383d4351e00334c93d9"]._props.Slots[i]._props.filters[0].Filter.push("a250_mp7_30");
                        }
                    }
                    break;
                case "5bd70322209c4d00d7167b8f":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5bd70322209c4d00d7167b8f"]._props.Slots[i]._props.filters[0].Filter.push("a250_mp7_30");
                        }
                    }
                    break;
                case "5d2f0d8048f0356c925bc3b0":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5d2f0d8048f0356c925bc3b0"]._props.Slots[i]._props.filters[0].Filter.push("a250_mp5_30");
                        }
                    }
                    break;
                case "5926bb2186f7744b1c6c6e60":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5926bb2186f7744b1c6c6e60"]._props.Slots[i]._props.filters[0].Filter.push("a250_mp5_30");
                        }
                    }
                    break;
                case "58948c8e86f77409493f7266":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["58948c8e86f77409493f7266"]._props.Slots[i]._props.filters[0].Filter.push("a250_mpx_30");
                        }
                    }
                    break;
                case "5d67abc1a4b93614ec50137f":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5d67abc1a4b93614ec50137f"]._props.Slots[i]._props.filters[0].Filter.push("a250_fn57_20");
                        }
                    }
                    break;
                case "5d3eb3b0a4b93615055e84d2":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5d3eb3b0a4b93615055e84d2"]._props.Slots[i]._props.filters[0].Filter.push("a250_fn57_20");
                        }
                    }
                    break;
                case "5cc82d76e24e8d00134b4b83":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5cc82d76e24e8d00134b4b83"]._props.Slots[i]._props.filters[0].Filter.push("a250_p90_50");
                        }
                    }
                    break;
                case "54491c4f4bdc2db1078b4568":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["54491c4f4bdc2db1078b4568"]._props.Slots[i]._props.filters[0].Filter.push("a250_mp133_6");
                        }
                    }
                    break;
                case "56dee2bdd2720bc8328b4567":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["56dee2bdd2720bc8328b4567"]._props.Slots[i]._props.filters[0].Filter.push("a250_mp133_6");
                        }
                    }
                    break;
                case "606dae0ab0e443224b421bb7":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["606dae0ab0e443224b421bb7"]._props.Slots[i]._props.filters[0].Filter.push("a250_mp133_6");
                        }
                    }
                    break;
                case "576165642459773c7a400233":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["576165642459773c7a400233"]._props.Slots[i]._props.filters[0].Filter.push("a250_saiga12_20");
                        }
                    }
                    break;
                case "5a7828548dc32e5a9c28b516":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5a7828548dc32e5a9c28b516"]._props.Slots[i]._props.filters[0].Filter.push("a250_m870_10");
                        }
                    }
                    break;
                case "6259b864ebedf17603599e88":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["6259b864ebedf17603599e88"]._props.Slots[i]._props.filters[0].Filter.push("a250_m3sup90_9");
                        }
                    }
                    break;
                case "627e14b21713922ded6f2c15":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["627e14b21713922ded6f2c15"]._props.Slots[i]._props.filters[0].Filter.push("a250_338axmc_10");
                        }
                    }
                    break;
                case "63171672192e68c5460cebc5":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["63171672192e68c5460cebc5"]._props.Slots[i]._props.filters[0].Filter.push("a250_aug_30");
                        }
                    }
                    break;
                case "62e7c4fba689e8c9c50dfc38":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["62e7c4fba689e8c9c50dfc38"]._props.Slots[i]._props.filters[0].Filter.push("a250_aug_30");
                        }
                    }
                    break;
                case "63088377b5cd696784087147":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["63088377b5cd696784087147"]._props.Slots[i]._props.filters[0].Filter.push("a250_glock919_33");
                        }
                    }
                    break;
                default:
                    break;
            }
        }
    }

    public pushBuffs(container: DependencyContainer): void {
        const gameGlobals = container.resolve<DatabaseServer>("DatabaseServer").getTables().globals.config;
        const gameBuffs = gameGlobals.Health.Effects.Stimulator.Buffs;
        const additions = zeusdb.globals.buffs;
        for (const stimBuff in additions) {
            gameBuffs[stimBuff] = additions[stimBuff];
        }
    }

    public checkExclusions(container: DependencyContainer): void {
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const botConfig = configServer.getConfig<IBotConfig>(ConfigTypes.BOT);
        const { blacklistMeds, blacklistGear, blacklistMags } = require("./config.json");

        if (typeof blacklistMeds === "boolean"){
            if (blacklistMeds === true) {
                //botConfig.pmc.dynamicLoot.blacklist.push("apollosStim","apollosPropital","apollosPain","apollosCMS");
                botConfig.pmc.vestLoot.blacklist.push("apollosStim","apollosPropital","apollosPain","apollosCMS");
                botConfig.pmc.pocketLoot.blacklist.push("apollosStim","apollosPropital","apollosPain","apollosCMS");
                botConfig.pmc.backpackLoot.blacklist.push("apollosStim","apollosPropital","apollosPain","apollosCMS");
            }
        }

        if (typeof blacklistGear === "boolean"){
            if (blacklistGear === true) {
                //botConfig.pmc.dynamicLoot.blacklist.push("armorOfAthena","atlasSatchel","hercRig","hercRig2","helmetOfHermes");
                botConfig.pmc.vestLoot.blacklist.push("armorOfAthena","atlasSatchel","hercRig","hercRig2","helmetOfHermes");
                botConfig.pmc.pocketLoot.blacklist.push("armorOfAthena","atlasSatchel","hercRig","hercRig2","helmetOfHermes");
                botConfig.pmc.backpackLoot.blacklist.push("armorOfAthena","atlasSatchel","hercRig","hercRig2","helmetOfHermes");
            }
        }

        if (typeof blacklistMags === "boolean"){
            if (blacklistMags === true) {
                botConfig.equipment.pmc.blacklist[0].equipment.mod_magazine.push("a250_545pmag_30","a250_762pmag_30","a250_ar10pmag_20","a250_sa58falpoly_20","a250_mk17scarh_20","a250_g28_20","a250_ar10kac_20","a250_762x14_50","a250_m700pmag_20","a250_556pmagwin_30","a250_vss_30","a250_glock45_30","a250_glock919_33","a250_mp9_30","a250_mp7_30","a250_mp5_30","a250_mpx_30","a250_fn57_20","a250_p90_50","a250_mp133_6","a250_saiga12_20","a250_m870_10","a250_m3sup90_9","a250_338axmc_10","a250_aug_30");
                //botConfig.pmc.dynamicLoot.blacklist.push("a250_545pmag_30","a250_762pmag_30","a250_ar10pmag_20","a250_sa58falpoly_20","a250_mk17scarh_20","a250_g28_20","a250_ar10kac_20","a250_762x14_50","a250_m700pmag_20","a250_556pmagwin_30","a250_vss_30","a250_glock45_30","a250_glock919_33","a250_mp9_30","a250_mp7_30","a250_mp5_30","a250_mpx_30","a250_fn57_20","a250_p90_50","a250_mp133_6","a250_saiga12_20","a250_m870_10","a250_m3sup90_9","a250_338axmc_10","a250_aug_30");
                botConfig.pmc.vestLoot.blacklist.push("a250_545pmag_30","a250_762pmag_30","a250_ar10pmag_20","a250_sa58falpoly_20","a250_mk17scarh_20","a250_g28_20","a250_ar10kac_20","a250_762x14_50","a250_m700pmag_20","a250_556pmagwin_30","a250_vss_30","a250_glock45_30","a250_glock919_33","a250_mp9_30","a250_mp7_30","a250_mp5_30","a250_mpx_30","a250_fn57_20","a250_p90_50","a250_mp133_6","a250_saiga12_20","a250_m870_10","a250_m3sup90_9","a250_338axmc_10","a250_aug_30");
                botConfig.pmc.pocketLoot.blacklist.push("a250_545pmag_30","a250_762pmag_30","a250_ar10pmag_20","a250_sa58falpoly_20","a250_mk17scarh_20","a250_g28_20","a250_ar10kac_20","a250_762x14_50","a250_m700pmag_20","a250_556pmagwin_30","a250_vss_30","a250_glock45_30","a250_glock919_33","a250_mp9_30","a250_mp7_30","a250_mp5_30","a250_mpx_30","a250_fn57_20","a250_p90_50","a250_mp133_6","a250_saiga12_20","a250_m870_10","a250_m3sup90_9","a250_338axmc_10","a250_aug_30");
                botConfig.pmc.backpackLoot.blacklist.push("a250_545pmag_30","a250_762pmag_30","a250_ar10pmag_20","a250_sa58falpoly_20","a250_mk17scarh_20","a250_g28_20","a250_ar10kac_20","a250_762x14_50","a250_m700pmag_20","a250_556pmagwin_30","a250_vss_30","a250_glock45_30","a250_glock919_33","a250_mp9_30","a250_mp7_30","a250_mp5_30","a250_mpx_30","a250_fn57_20","a250_p90_50","a250_mp133_6","a250_saiga12_20","a250_m870_10","a250_m3sup90_9","a250_338axmc_10","a250_aug_30");
            }
        }
    }

}
module.exports = { mod: new Olympus() }