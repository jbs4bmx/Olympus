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
import { IPmcConfig } from "@spt-aki/models/spt/config/IPmcConfig";

let zeusdb;

class Olympus implements IPreAkiLoadMod, IPostDBLoadMod
{
    private pkg;
    private path = require('path');
    private modName = this.path.basename(this.path.dirname(__dirname.split('/').pop()));

    public postDBLoad(container: DependencyContainer){
        const logger = container.resolve<ILogger>("WinstonLogger");
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const preAkiModLoader = container.resolve<PreAkiModLoader>("PreAkiModLoader");
        const databaseImporter = container.resolve<ImporterUtil>("ImporterUtil");
        const locales = db.locales.global;
        const { FullVersion, MagsOnly, RigsOnly, StimsOnly } = require("./config.json");
        this.pkg = require("../package.json");
        zeusdb = databaseImporter.loadRecursive(`${preAkiModLoader.getModPath(this.modName)}database/`);

        if (typeof FullVersion === "boolean"){
            if (FullVersion === true){
                for (const i_item in zeusdb.templates.items){
                    db.templates.items[i_item] = zeusdb.templates.items[i_item];
                }

                for (const h_item of zeusdb.templates.handbook.Items){
                    if (!db.templates.handbook.Items.find(i=>i.Id == h_item.Id)){
                        db.templates.handbook.Items.push(h_item);
                    }

                }

                for (const localeID in locales){
                    for (const locale in zeusdb.locales.en){
                        locales[localeID][locale] = zeusdb.locales.en[locale];
                    }
                }

                for (const p_item in zeusdb.templates.prices){
                    db.templates.prices[p_item] = zeusdb.templates.prices[p_item];
                }

                for (const tradeName in db.traders){
                    if ( tradeName === "5ac3b934156ae10c4430e83c" ){
                        for (const ri_item of zeusdb.traders.Ragman.items.list){
                            if (!db.traders[tradeName].assort.items.find(i=>i._id == ri_item._id)){
                                db.traders[tradeName].assort.items.push(ri_item);
                            }
                        }
                        for (const rb_item in zeusdb.traders.Ragman.barter_scheme){
                            db.traders[tradeName].assort.barter_scheme[rb_item] = zeusdb.traders.Ragman.barter_scheme[rb_item];
                        }
                        for (const rl_item in zeusdb.traders.Ragman.loyalty_level_items){
                            db.traders[tradeName].assort.loyal_level_items[rl_item] = zeusdb.traders.Ragman.loyalty_level_items[rl_item];
                        }
                    }

                    if ( tradeName === "5c0647fdd443bc2504c2d371" ){
                        for (const ji_item of zeusdb.traders.Jaeger.items.list){
                            if (!db.traders[tradeName].assort.items.find(i=>i._id == ji_item._id)){
                                db.traders[tradeName].assort.items.push(ji_item);
                            }
                        }
                        for (const jb_item in zeusdb.traders.Jaeger.barter_scheme){
                            db.traders[tradeName].assort.barter_scheme[jb_item] = zeusdb.traders.Jaeger.barter_scheme[jb_item];
                        }
                        for (const jl_item in zeusdb.traders.Jaeger.loyalty_level_items){
                            db.traders[tradeName].assort.loyal_level_items[jl_item] = zeusdb.traders.Jaeger.loyalty_level_items[jl_item];
                        }
                    }

                    if ( tradeName === "54cb57776803fa99248b456e" ){
                        for (const ti_item of zeusdb.traders.Therapist.items.list){
                            if (!db.traders[tradeName].assort.items.find(i=>i._id == ti_item._id)){
                                db.traders[tradeName].assort.items.push(ti_item);
                            }
                        }
                        for (const tb_item in zeusdb.traders.Therapist.barter_scheme){
                            db.traders[tradeName].assort.barter_scheme[tb_item] = zeusdb.traders.Therapist.barter_scheme[tb_item];
                        }
                        for (const tl_item in zeusdb.traders.Therapist.loyalty_level_items){
                            db.traders[tradeName].assort.loyal_level_items[tl_item] = zeusdb.traders.Therapist.loyalty_level_items[tl_item];
                        }
                    }
                }

                this.pushItems(container);
                this.pushBuffs(container);
                this.checkExclusions(container);
            }
        }

        if (typeof MagsOnly === "boolean"){
            if (MagsOnly === true){
                for (const i_item in zeusdb.templates.itemsMags){
                    db.templates.items[i_item] = zeusdb.templates.itemsMags[i_item];
                }

                for (const h_item of zeusdb.templates.handbookMags.Items){
                    if (!db.templates.handbook.Items.find(i=>i.Id == h_item.Id)){
                        db.templates.handbook.Items.push(h_item);
                    }

                }

                for (const localeID in locales){
                    for (const locale in zeusdb.locales.enMags){
                        locales[localeID][locale] = zeusdb.locales.enMags[locale];
                    }
                }

                for (const p_item in zeusdb.templates.pricesMags){
                    db.templates.prices[p_item] = zeusdb.templates.pricesMags[p_item];
                }

                for (const tradeName in db.traders){
                    if ( tradeName === "5c0647fdd443bc2504c2d371" ){
                        for (const ji_item of zeusdb.traders.Jaeger.items.list){
                            if (!db.traders[tradeName].assort.items.find(i=>i._id == ji_item._id)){
                                db.traders[tradeName].assort.items.push(ji_item);
                            }
                        }
                        for (const jb_item in zeusdb.traders.Jaeger.barter_scheme){
                            db.traders[tradeName].assort.barter_scheme[jb_item] = zeusdb.traders.Jaeger.barter_scheme[jb_item];
                        }
                        for (const jl_item in zeusdb.traders.Jaeger.loyalty_level_items){
                            db.traders[tradeName].assort.loyal_level_items[jl_item] = zeusdb.traders.Jaeger.loyalty_level_items[jl_item];
                        }
                    }
                }

                this.pushItems(container);
                this.checkExclusions(container);
            }
        }

        if (typeof RigsOnly === "boolean"){
            if (RigsOnly === true){
                for (const i_item in zeusdb.templates.itemsRigs){
                    db.templates.items[i_item] = zeusdb.templates.itemsRigs[i_item];
                }

                for (const h_item of zeusdb.templates.handbookRigs.Items){
                    if (!db.templates.handbook.Items.find(i=>i.Id == h_item.Id)){
                        db.templates.handbook.Items.push(h_item);
                    }

                }

                for (const localeID in locales){
                    for (const locale in zeusdb.locales.enRigs){
                        locales[localeID][locale] = zeusdb.locales.enRigs[locale];
                    }
                }

                for (const p_item in zeusdb.templates.pricesRigs){
                    db.templates.prices[p_item] = zeusdb.templates.pricesRigs[p_item];
                }

                for (const tradeName in db.traders){
                    if ( tradeName === "5ac3b934156ae10c4430e83c" ){
                        for (const ri_item of zeusdb.traders.Ragman.items.list){
                            if (!db.traders[tradeName].assort.items.find(i=>i._id == ri_item._id)){
                                db.traders[tradeName].assort.items.push(ri_item);
                            }
                        }
                        for (const rb_item in zeusdb.traders.Ragman.barter_scheme){
                            db.traders[tradeName].assort.barter_scheme[rb_item] = zeusdb.traders.Ragman.barter_scheme[rb_item];
                        }
                        for (const rl_item in zeusdb.traders.Ragman.loyalty_level_items){
                            db.traders[tradeName].assort.loyal_level_items[rl_item] = zeusdb.traders.Ragman.loyalty_level_items[rl_item];
                        }
                    }
                }

                this.pushItems(container);
                this.checkExclusions(container);
            }
        }

        if (typeof StimsOnly === "boolean"){
            if (StimsOnly === true){
                for (const i_item in zeusdb.templates.itemsStims){
                    db.templates.items[i_item] = zeusdb.templates.itemsStims[i_item];
                }

                for (const h_item of zeusdb.templates.handbookStims.Items){
                    if (!db.templates.handbook.Items.find(i=>i.Id == h_item.Id)){
                        db.templates.handbook.Items.push(h_item);
                    }

                }

                for (const localeID in locales){
                    for (const locale in zeusdb.locales.enStims){
                        locales[localeID][locale] = zeusdb.locales.enStims[locale];
                    }
                }

                for (const p_item in zeusdb.templates.pricesStims){
                    db.templates.prices[p_item] = zeusdb.templates.pricesStims[p_item];
                }

                for (const tradeName in db.traders){
                    if ( tradeName === "54cb57776803fa99248b456e" ){
                        for (const ti_item of zeusdb.traders.Therapist.items.list){
                            if (!db.traders[tradeName].assort.items.find(i=>i._id == ti_item._id)){
                                db.traders[tradeName].assort.items.push(ti_item);
                            }
                        }
                        for (const tb_item in zeusdb.traders.Therapist.barter_scheme){
                            db.traders[tradeName].assort.barter_scheme[tb_item] = zeusdb.traders.Therapist.barter_scheme[tb_item];
                        }
                        for (const tl_item in zeusdb.traders.Therapist.loyalty_level_items){
                            db.traders[tradeName].assort.loyal_level_items[tl_item] = zeusdb.traders.Therapist.loyalty_level_items[tl_item];
                        }
                    }
                }

                this.pushBuffs(container);
                this.checkExclusions(container);
            }
        }

        logger.info(`${this.pkg.author}-${this.pkg.name} v${this.pkg.version}: Cached successfully`);
    }

    public pushItems(container: DependencyContainer): void{
        let sectionName = "mod_magazine";
        var i;
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const items = db.templates.items;
        const { FullVersion, MagsOnly, RigsOnly } = require("./config.json");

        if ( FullVersion === true){
            items["55d7217a4bdc2d86028b456d"]._props.Slots[5]._props.filters[0].Filter.push("helmetOfHermes");
            for ( let item in items ){
                let data = items[item];
                switch (data._id)
                {
                    case "5e81c3cbac2bb513793cdc75":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_1911");
                            }
                        }
                    break;
                    case "5f36a0e5fbf956000b716b65":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_1911");
                            }
                        }
                    break;
                    case "627e14b21713922ded6f2c15":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_axmc");
                            }
                        }
                    break;
                    case "5ac66d9b5acfc4001633997a":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak545");
                            }
                        }
                    break;
                    case "6499849fc93611967b034949":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak545");
                            }
                        }
                    break;
                    case "5bf3e03b0db834001d2c4a9c":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak545");
                            }
                        }
                    break;
                    case "5ac4cd105acfc40016339859":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak545");
                            }
                        }
                    break;
                    case "5644bd2b4bdc2d3b4c8b4572":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak545");
                            }
                        }
                    break;
                    case "5bf3e0490db83400196199af":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak545");
                            }
                        }
                    break;
                    case "5ab8e9fcd8ce870019439434":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak545");
                            }
                        }
                    break;
                    case "57dc2fa62459775949412633":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak545");
                            }
                        }
                    break;
                    case "5839a40f24597726f856b511":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak545");
                            }
                        }
                    break;
                    case "583990e32459771419544dd2":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak545");
                            }
                        }
                    break;
                    case "628b5638ad252a16da6dd245":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak545");
                            }
                        }
                    break;
                    case "628b9c37a733087d0d7fe84b":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak545");
                            }
                        }
                    break;
                    case "5beed0f50db834001c062b12":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak545");
                            }
                        }
                    break;
                    case "5c488a752e221602b412af63":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_556","a250_556fde");
                            }
                        }
                    break;
                    case "5bb2475ed4351e00853264e3":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_556","a250_556fde");
                            }
                        }
                    break;
                    case "623063e994fc3f7b302a9696":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_556","a250_556fde");
                            }
                        }
                    break;
                    case "5447a9cd4bdc2dbd208b4567":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_556","a250_556fde");
                            }
                        }
                    break;
                    case "5fbcc1d9016cce60e8341ab3":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_556","a250_556fde");
                            }
                        }
                    break;
                    case "6184055050224f204c1da540":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_556","a250_556fde");
                            }
                        }
                    break;
                    case "5c07c60e0db834002330051f":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_556","a250_556fde");
                            }
                        }
                    break;
                    case "5d43021ca4b9362eab4b5e25":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_556","a250_556fde");
                            }
                        }
                    break;
                    case "5e870397991fd70db46995c8":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_590a1");
                            }
                        }
                    break;
                    case "5ac66d2e5acfc43b321d4b53":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak762");
                            }
                        }
                    break;
                    case "5ac66d725acfc43b321d4b60":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak762");
                            }
                        }
                    break;
                    case "59d6088586f774275f37482f":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak762");
                            }
                        }
                    break;
                    case "5a0ec13bfcdbcb00165aa685":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak762");
                            }
                        }
                    break;
                    case "59ff346386f77477562ff5e2":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak762");
                            }
                        }
                    break;
                    case "5abcbc27d8ce8700182eceeb":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak762");
                            }
                        }
                    break;
                    case "606587252535c57a13424cfd":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak762");
                            }
                        }
                    break;
                    case "628a60ae6b1d481ff772e9c8":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak762");
                            }
                        }
                    break;
                    case "59e6152586f77473dc057aa1":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak762");
                            }
                        }
                    break;
                    case "59e6687d86f77411d949b251":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak762");
                            }
                        }
                    break;
                    case "5ac66cb05acfc40198510a10":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak556");
                            }
                        }
                    break;
                    case "5ac66d015acfc400180ae6e4":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak556");
                            }
                        }
                    break;
                    case "5abccb7dd8ce87001773e277":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_aps");
                            }
                        }
                    break;
                    case "5a17f98cfcdbcb0980087290":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_aps");
                            }
                        }
                    break;
                    case "5dcbd56fdbd3d91b3e5468d5":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ar10");
                            }
                        }
                    break;
                    case "5a367e5dc4a282000e49738f":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ar10");
                            }
                        }
                    break;
                    case "5df8ce05b11454561e39243b":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ar10");
                            }
                        }
                    break;
                    case "5cadfbf7ae92152ac412eeef":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ash12");
                            }
                        }
                    break;
                    case "62e7c4fba689e8c9c50dfc38":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_aug");
                            }
                        }
                    break;
                    case "63171672192e68c5460cebc5":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_aug");
                            }
                        }
                    break;
                    case "6410733d5dd49d77bd07847e":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_avt");
                            }
                        }
                    break;
                    case "588892092459774ac91d4b11":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_dvl");
                            }
                        }
                    break;
                    case "5d3eb3b0a4b93615055e84d2":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_fn57");
                            }
                        }
                    break;
                    case "5d67abc1a4b93614ec50137f":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_fn57");
                            }
                        }
                    break;
                    case "6176aca650224f204c1da3fb":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_g28");
                            }
                        }
                    break;
                    case "5fb64bc92b1b027b1f50bcf2":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_glock45");
                            }
                        }
                    break;
                    case "5fc3f2d5900b1d5091531e57":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_glock9");
                            }
                        }
                    break;
                    case "5a7ae0c351dfba0017554310":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_glock9");
                            }
                        }
                    break;
                    case "5b1fa9b25acfc40018633c01":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_glock9");
                            }
                        }
                    break;
                    case "63088377b5cd696784087147":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_glock9");
                            }
                        }
                    break;
                    case "60339954d62c9b14ed777c06":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_glock9");
                            }
                        }
                    break;
                    case "57f4c844245977379d5c14d1":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_kedr");
                            }
                        }
                    break;
                    case "57d14d2524597714373db789":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_kedr");
                            }
                        }
                    break;
                    case "57f3c6bd24597738e730fa2f":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_kedr");
                            }
                        }
                    break;
                    case "5e848cc2988a8701445df1e8":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ks23");
                            }
                        }
                    break;
                    case "5aafa857e5b5b00018480968":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_m1a");
                            }
                        }
                    break;
                    case "6259b864ebedf17603599e88":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_m3sup90");
                            }
                        }
                    break;
                    case "5bfea6e90db834001b7347f3":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_m700");
                            }
                        }
                    break;
                    case "5a7828548dc32e5a9c28b516":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_m870");
                            }
                        }
                    break;
                    case "5cadc190ae921500103bb3b6":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_m9a3");
                            }
                        }
                    break;
                    case "6165ac306ef05c2ce828ef74":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_scarh","a250_scarhfde");
                            }
                        }
                    break;
                    case "6183afd850224f204c1da514":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_scarh","a250_scarhfde");
                            }
                        }
                    break;
                    case "5fc22d7c187fea44d52eda44":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_mk18");
                            }
                        }
                    break;
                    case "5bfd297f0db834001a669119":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_mosinbox","a250_mosinaa");
                            }
                        }
                    break;
                    case "5ae08f0a5acfc408fb1398a1":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_mosinbox","a250_mosinaa");
                            }
                        }
                    break;
                    case "54491c4f4bdc2db1078b4568":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_mp133");
                            }
                        }
                    break;
                    case "56dee2bdd2720bc8328b4567":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_mp133");
                            }
                        }
                    break;
                    case "606dae0ab0e443224b421bb7":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_mp133");
                            }
                        }
                    break;
                    case "576a581d2459771e7b1bc4f1":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_mp443");
                            }
                        }
                    break;
                    case "5d2f0d8048f0356c925bc3b0":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_mp5");
                            }
                        }
                    break;
                    case "5926bb2186f7744b1c6c6e60":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_mp5");
                            }
                        }
                    break;
                    case "5ba26383d4351e00334c93d9":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_mp7");
                            }
                        }
                    break;
                    case "5bd70322209c4d00d7167b8f":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_mp7");
                            }
                        }
                    break;
                    case "5e00903ae9dc277128008b87":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_mp9");
                            }
                        }
                    break;
                    case "5de7bd7bfd6b4e6e2276dc25":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_mp9");
                            }
                        }
                    break;
                    case "58948c8e86f77409493f7266":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_mpx");
                            }
                        }
                    break;
                    case "56d59856d2720bd8418b456a":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_p226");
                            }
                        }
                    break;
                    case "5cc82d76e24e8d00134b4b83":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_p90");
                            }
                        }
                    break;
                    case "64637076203536ad5600c990":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_pkp");
                            }
                        }
                    break;
                    case "64ca3d3954fc657e230529cc":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_pkp");
                            }
                        }
                    break;
                    case "602a9740da11d6478d5a06dc":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_pl15");
                            }
                        }
                    break;
                    case "56e0598dd2720bb5668b45a6":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_pm");
                            }
                        }
                    break;
                    case "579204f224597773d619e051":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_pm");
                            }
                        }
                    break;
                    case "5448bd6b4bdc2dfc2f8b4569":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_pm");
                            }
                        }
                    break;
                    case "59f9cabd86f7743a10721f46":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_pp1901");
                            }
                        }
                    break;
                    case "59984ab886f7743e98271174":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_pp1901");
                            }
                        }
                    break;
                    case "5ea03f7400685063ec28bfa8":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ppsh");
                            }
                        }
                    break;
                    case "5b0bbe4e5acfc40dc528a72d":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_sa58");
                            }
                        }
                    break;
                    case "5f2a9575926fd9352339381f":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_sa58");
                            }
                        }
                    break;
                    case "576165642459773c7a400233":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_saiga12");
                            }
                        }
                    break;
                    case "587e02ff24597743df3deaeb":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_sksbox","a250_skspmag");
                            }
                        }
                    break;
                    case "574d967124597745970e7c94":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_sksbox","a250_skspmag");
                            }
                        }
                    break;
                    case "59f98b4986f7746f546d2cef":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_sr1mp");
                            }
                        }
                    break;
                    case "62e14904c2699c0ec93adc47":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_sr2m");
                            }
                        }
                    break;
                    case "55801eed4bdc2d89578b4588":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_sv98");
                            }
                        }
                    break;
                    case "5c46fbd72e2216398b5a8c9c":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_svd");
                            }
                        }
                    break;
                    case "643ea5b23db6f9f57107d9fd":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_svt");
                            }
                        }
                    break;
                    case "5df24cf80dee1b22f862e9bc":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_t5000");
                            }
                        }
                    break;
                    case "5a38e6bac4a2826c6e06d79b":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_toz");
                            }
                        }
                    break;
                    case "571a12c42459771f627b58a0":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_tt105");
                            }
                        }
                    break;
                    case "5b3b713c5acfc4330140bd8d":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_tt105");
                            }
                        }
                    break;
                    case "5fc3e272f8b6a877a729eac5":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ump");
                            }
                        }
                    break;
                    case "6193a720f8ee7e52e42109ed":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_usp");
                            }
                        }
                    break;
                    case "5c501a4d2e221602b412b540":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_vpo101");
                            }
                        }
                    break;
                    case "5de652c31b7e3716273428be":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_vpo215");
                            }
                        }
                    break;
                    case "57c44b372459772d2b39b8ce":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_vss");
                            }
                        }
                    break;
                    case "57838ad32459774a17445cd2":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_vss");
                            }
                        }
                    break;
                    default:
                    break;
                }
            }
        }

        if (MagsOnly === true){
            for ( let item in items ){
                let data = items[item];
                switch (data._id)
                {
                    case "5e81c3cbac2bb513793cdc75":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_1911");
                            }
                        }
                    break;
                    case "5f36a0e5fbf956000b716b65":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_1911");
                            }
                        }
                    break;
                    case "627e14b21713922ded6f2c15":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_axmc");
                            }
                        }
                    break;
                    case "5ac66d9b5acfc4001633997a":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak545");
                            }
                        }
                    break;
                    case "6499849fc93611967b034949":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak545");
                            }
                        }
                    break;
                    case "5bf3e03b0db834001d2c4a9c":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak545");
                            }
                        }
                    break;
                    case "5ac4cd105acfc40016339859":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak545");
                            }
                        }
                    break;
                    case "5644bd2b4bdc2d3b4c8b4572":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak545");
                            }
                        }
                    break;
                    case "5bf3e0490db83400196199af":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak545");
                            }
                        }
                    break;
                    case "5ab8e9fcd8ce870019439434":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak545");
                            }
                        }
                    break;
                    case "57dc2fa62459775949412633":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak545");
                            }
                        }
                    break;
                    case "5839a40f24597726f856b511":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak545");
                            }
                        }
                    break;
                    case "583990e32459771419544dd2":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak545");
                            }
                        }
                    break;
                    case "628b5638ad252a16da6dd245":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak545");
                            }
                        }
                    break;
                    case "628b9c37a733087d0d7fe84b":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak545");
                            }
                        }
                    break;
                    case "5beed0f50db834001c062b12":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak545");
                            }
                        }
                    break;
                    case "5c488a752e221602b412af63":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_556","a250_556fde");
                            }
                        }
                    break;
                    case "5bb2475ed4351e00853264e3":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_556","a250_556fde");
                            }
                        }
                    break;
                    case "623063e994fc3f7b302a9696":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_556","a250_556fde");
                            }
                        }
                    break;
                    case "5447a9cd4bdc2dbd208b4567":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_556","a250_556fde");
                            }
                        }
                    break;
                    case "5fbcc1d9016cce60e8341ab3":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_556","a250_556fde");
                            }
                        }
                    break;
                    case "6184055050224f204c1da540":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_556","a250_556fde");
                            }
                        }
                    break;
                    case "5c07c60e0db834002330051f":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_556","a250_556fde");
                            }
                        }
                    break;
                    case "5d43021ca4b9362eab4b5e25":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_556","a250_556fde");
                            }
                        }
                    break;
                    case "5e870397991fd70db46995c8":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_590a1");
                            }
                        }
                    break;
                    case "5ac66d2e5acfc43b321d4b53":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak762");
                            }
                        }
                    break;
                    case "5ac66d725acfc43b321d4b60":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak762");
                            }
                        }
                    break;
                    case "59d6088586f774275f37482f":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak762");
                            }
                        }
                    break;
                    case "5a0ec13bfcdbcb00165aa685":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak762");
                            }
                        }
                    break;
                    case "59ff346386f77477562ff5e2":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak762");
                            }
                        }
                    break;
                    case "5abcbc27d8ce8700182eceeb":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak762");
                            }
                        }
                    break;
                    case "606587252535c57a13424cfd":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak762");
                            }
                        }
                    break;
                    case "628a60ae6b1d481ff772e9c8":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak762");
                            }
                        }
                    break;
                    case "59e6152586f77473dc057aa1":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak762");
                            }
                        }
                    break;
                    case "59e6687d86f77411d949b251":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak762");
                            }
                        }
                    break;
                    case "5ac66cb05acfc40198510a10":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak556");
                            }
                        }
                    break;
                    case "5ac66d015acfc400180ae6e4":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ak556");
                            }
                        }
                    break;
                    case "5abccb7dd8ce87001773e277":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_aps");
                            }
                        }
                    break;
                    case "5a17f98cfcdbcb0980087290":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_aps");
                            }
                        }
                    break;
                    case "5dcbd56fdbd3d91b3e5468d5":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ar10");
                            }
                        }
                    break;
                    case "5a367e5dc4a282000e49738f":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ar10");
                            }
                        }
                    break;
                    case "5df8ce05b11454561e39243b":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ar10");
                            }
                        }
                    break;
                    case "5cadfbf7ae92152ac412eeef":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ash12");
                            }
                        }
                    break;
                    case "62e7c4fba689e8c9c50dfc38":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_aug");
                            }
                        }
                    break;
                    case "63171672192e68c5460cebc5":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_aug");
                            }
                        }
                    break;
                    case "6410733d5dd49d77bd07847e":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_avt");
                            }
                        }
                    break;
                    case "588892092459774ac91d4b11":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_dvl");
                            }
                        }
                    break;
                    case "5d3eb3b0a4b93615055e84d2":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_fn57");
                            }
                        }
                    break;
                    case "5d67abc1a4b93614ec50137f":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_fn57");
                            }
                        }
                    break;
                    case "6176aca650224f204c1da3fb":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_g28");
                            }
                        }
                    break;
                    case "5fb64bc92b1b027b1f50bcf2":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_glock45");
                            }
                        }
                    break;
                    case "5fc3f2d5900b1d5091531e57":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_glock9");
                            }
                        }
                    break;
                    case "5a7ae0c351dfba0017554310":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_glock9");
                            }
                        }
                    break;
                    case "5b1fa9b25acfc40018633c01":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_glock9");
                            }
                        }
                    break;
                    case "63088377b5cd696784087147":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_glock9");
                            }
                        }
                    break;
                    case "60339954d62c9b14ed777c06":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_glock9");
                            }
                        }
                    break;
                    case "57f4c844245977379d5c14d1":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_kedr");
                            }
                        }
                    break;
                    case "57d14d2524597714373db789":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_kedr");
                            }
                        }
                    break;
                    case "57f3c6bd24597738e730fa2f":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_kedr");
                            }
                        }
                    break;
                    case "5e848cc2988a8701445df1e8":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ks23");
                            }
                        }
                    break;
                    case "5aafa857e5b5b00018480968":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_m1a");
                            }
                        }
                    break;
                    case "6259b864ebedf17603599e88":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_m3sup90");
                            }
                        }
                    break;
                    case "5bfea6e90db834001b7347f3":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_m700");
                            }
                        }
                    break;
                    case "5a7828548dc32e5a9c28b516":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_m870");
                            }
                        }
                    break;
                    case "5cadc190ae921500103bb3b6":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_m9a3");
                            }
                        }
                    break;
                    case "6165ac306ef05c2ce828ef74":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_scarh","a250_scarhfde");
                            }
                        }
                    break;
                    case "6183afd850224f204c1da514":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_scarh","a250_scarhfde");
                            }
                        }
                    break;
                    case "5fc22d7c187fea44d52eda44":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_mk18");
                            }
                        }
                    break;
                    case "5bfd297f0db834001a669119":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_mosinbox","a250_mosinaa");
                            }
                        }
                    break;
                    case "5ae08f0a5acfc408fb1398a1":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_mosinbox","a250_mosinaa");
                            }
                        }
                    break;
                    case "54491c4f4bdc2db1078b4568":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_mp133");
                            }
                        }
                    break;
                    case "56dee2bdd2720bc8328b4567":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_mp133");
                            }
                        }
                    break;
                    case "606dae0ab0e443224b421bb7":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_mp133");
                            }
                        }
                    break;
                    case "576a581d2459771e7b1bc4f1":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_mp443");
                            }
                        }
                    break;
                    case "5d2f0d8048f0356c925bc3b0":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_mp5");
                            }
                        }
                    break;
                    case "5926bb2186f7744b1c6c6e60":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_mp5");
                            }
                        }
                    break;
                    case "5ba26383d4351e00334c93d9":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_mp7");
                            }
                        }
                    break;
                    case "5bd70322209c4d00d7167b8f":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_mp7");
                            }
                        }
                    break;
                    case "5e00903ae9dc277128008b87":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_mp9");
                            }
                        }
                    break;
                    case "5de7bd7bfd6b4e6e2276dc25":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_mp9");
                            }
                        }
                    break;
                    case "58948c8e86f77409493f7266":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_mpx");
                            }
                        }
                    break;
                    case "56d59856d2720bd8418b456a":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_p226");
                            }
                        }
                    break;
                    case "5cc82d76e24e8d00134b4b83":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_p90");
                            }
                        }
                    break;
                    case "64637076203536ad5600c990":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_pkp");
                            }
                        }
                    break;
                    case "64ca3d3954fc657e230529cc":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_pkp");
                            }
                        }
                    break;
                    case "602a9740da11d6478d5a06dc":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_pl15");
                            }
                        }
                    break;
                    case "56e0598dd2720bb5668b45a6":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_pm");
                            }
                        }
                    break;
                    case "579204f224597773d619e051":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_pm");
                            }
                        }
                    break;
                    case "5448bd6b4bdc2dfc2f8b4569":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_pm");
                            }
                        }
                    break;
                    case "59f9cabd86f7743a10721f46":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_pp1901");
                            }
                        }
                    break;
                    case "59984ab886f7743e98271174":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_pp1901");
                            }
                        }
                    break;
                    case "5ea03f7400685063ec28bfa8":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ppsh");
                            }
                        }
                    break;
                    case "5b0bbe4e5acfc40dc528a72d":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_sa58");
                            }
                        }
                    break;
                    case "5f2a9575926fd9352339381f":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_sa58");
                            }
                        }
                    break;
                    case "576165642459773c7a400233":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_saiga12");
                            }
                        }
                    break;
                    case "587e02ff24597743df3deaeb":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_sksbox","a250_skspmag");
                            }
                        }
                    break;
                    case "574d967124597745970e7c94":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_sksbox","a250_skspmag");
                            }
                        }
                    break;
                    case "59f98b4986f7746f546d2cef":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_sr1mp");
                            }
                        }
                    break;
                    case "62e14904c2699c0ec93adc47":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_sr2m");
                            }
                        }
                    break;
                    case "55801eed4bdc2d89578b4588":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_sv98");
                            }
                        }
                    break;
                    case "5c46fbd72e2216398b5a8c9c":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_svd");
                            }
                        }
                    break;
                    case "643ea5b23db6f9f57107d9fd":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_svt");
                            }
                        }
                    break;
                    case "5df24cf80dee1b22f862e9bc":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_t5000");
                            }
                        }
                    break;
                    case "5a38e6bac4a2826c6e06d79b":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_toz");
                            }
                        }
                    break;
                    case "571a12c42459771f627b58a0":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_tt105");
                            }
                        }
                    break;
                    case "5b3b713c5acfc4330140bd8d":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_tt105");
                            }
                        }
                    break;
                    case "5fc3e272f8b6a877a729eac5":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_ump");
                            }
                        }
                    break;
                    case "6193a720f8ee7e52e42109ed":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_usp");
                            }
                        }
                    break;
                    case "5c501a4d2e221602b412b540":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_vpo101");
                            }
                        }
                    break;
                    case "5de652c31b7e3716273428be":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_vpo215");
                            }
                        }
                    break;
                    case "57c44b372459772d2b39b8ce":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_vss");
                            }
                        }
                    break;
                    case "57838ad32459774a17445cd2":
                        for ( i=0; i<data._props.Slots.length; i++ )
                        {
                            if ( data._props.Slots[i]._name == sectionName )
                            {
                                data._props.Slots[i]._props.filters[0].Filter.push("a250_vss");
                            }
                        }
                    break;
                    default:
                    break;
                }
            }
        }

        if (RigsOnly === true){
            items["55d7217a4bdc2d86028b456d"]._props.Slots[5]._props.filters[0].Filter.push("helmetOfHermes");
        }

    }

    public pushBuffs(container: DependencyContainer): void{
        const gameGlobals = container.resolve<DatabaseServer>("DatabaseServer").getTables().globals.config;
        const gameBuffs = gameGlobals.Health.Effects.Stimulator.Buffs;
        const additions = zeusdb.globals.buffs;
        for (const stimBuff in additions){
            gameBuffs[stimBuff] = additions[stimBuff];
        }
    }

    public checkExclusions(container: DependencyContainer): void{
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const botConfig = configServer.getConfig<IBotConfig>(ConfigTypes.BOT);
        const pmcConfig = configServer.getConfig<IPmcConfig>(ConfigTypes.PMC);
        const { FullVersion, Minimal, MagsOnly, RigsOnly, StimsOnly, blacklistMeds, blacklistGear, blacklistMags } = require("./config.json");

        if ( FullVersion === true){
            if (typeof blacklistMeds === "boolean"){
                if (blacklistMeds === true){
                    pmcConfig.vestLoot.blacklist.push("apollosStim","apollosPropital","apollosPain","apollosCMS");
                    pmcConfig.pocketLoot.blacklist.push("apollosStim","apollosPropital","apollosPain","apollosCMS");
                    pmcConfig.backpackLoot.blacklist.push("apollosStim","apollosPropital","apollosPain","apollosCMS");
                }
            }
            if (typeof blacklistGear === "boolean"){
                if (blacklistGear === true){
                    pmcConfig.vestLoot.blacklist.push("armorOfAthena","atlasSatchel","hercRig","hercRig2","helmetOfHermes");
                    pmcConfig.pocketLoot.blacklist.push("armorOfAthena","atlasSatchel","hercRig","hercRig2","helmetOfHermes");
                    pmcConfig.backpackLoot.blacklist.push("armorOfAthena","atlasSatchel","hercRig","hercRig2","helmetOfHermes");
                }
            }
            if (typeof blacklistMags === "boolean"){
                if (blacklistMags === true){
                    botConfig.equipment.pmc.blacklist[0].equipment.mod_magazine.push("a250_1911","a250_axmc","a250_ak545","a250_556","a250_556fde","a250_590a1","a250_ak762","a250_ak556","a250_aps","a250_ar10","a250_ash12","a250_aug","a250_avt","a250_dvl","a250_fn57","a250_g28","a250_glock45","a250_glock9","a250_kedr","a250_ks23","a250_m1a","a250_m3sup90","a250_m700","a250_m870","a250_m9a3","a250_scarh","a250_scarhfde","a250_mk18","a250_mosinbox","a250_mosinaa","a250_mp133","a250_mp443","a250_mp5","a250_mp7","a250_mp9","a250_mpx","a250_p226","a250_p90","a250_pkp","a250_pl15","a250_pm","a250_pp1901","a250_ppsh","a250_sa58","a250_saiga12","a250_sksbox","a250_skspmag","a250_sr1mp","a250_sr2m","a250_sv98","a250_svd","a250_svt","a250_t5000","a250_toz","a250_tt105","a250_ump","a250_usp","a250_vpo101","a250_vpo215","a250_vss");
                    pmcConfig.vestLoot.blacklist.push("a250_1911","a250_axmc","a250_ak545","a250_556","a250_556fde","a250_590a1","a250_ak762","a250_ak556","a250_aps","a250_ar10","a250_ash12","a250_aug","a250_avt","a250_dvl","a250_fn57","a250_g28","a250_glock45","a250_glock9","a250_kedr","a250_ks23","a250_m1a","a250_m3sup90","a250_m700","a250_m870","a250_m9a3","a250_scarh","a250_scarhfde","a250_mk18","a250_mosinbox","a250_mosinaa","a250_mp133","a250_mp443","a250_mp5","a250_mp7","a250_mp9","a250_mpx","a250_p226","a250_p90","a250_pkp","a250_pl15","a250_pm","a250_pp1901","a250_ppsh","a250_sa58","a250_saiga12","a250_sksbox","a250_skspmag","a250_sr1mp","a250_sr2m","a250_sv98","a250_svd","a250_svt","a250_t5000","a250_toz","a250_tt105","a250_ump","a250_usp","a250_vpo101","a250_vpo215","a250_vss");
                    pmcConfig.pocketLoot.blacklist.push("a250_1911","a250_axmc","a250_ak545","a250_556","a250_556fde","a250_590a1","a250_ak762","a250_ak556","a250_aps","a250_ar10","a250_ash12","a250_aug","a250_avt","a250_dvl","a250_fn57","a250_g28","a250_glock45","a250_glock9","a250_kedr","a250_ks23","a250_m1a","a250_m3sup90","a250_m700","a250_m870","a250_m9a3","a250_scarh","a250_scarhfde","a250_mk18","a250_mosinbox","a250_mosinaa","a250_mp133","a250_mp443","a250_mp5","a250_mp7","a250_mp9","a250_mpx","a250_p226","a250_p90","a250_pkp","a250_pl15","a250_pm","a250_pp1901","a250_ppsh","a250_sa58","a250_saiga12","a250_sksbox","a250_skspmag","a250_sr1mp","a250_sr2m","a250_sv98","a250_svd","a250_svt","a250_t5000","a250_toz","a250_tt105","a250_ump","a250_usp","a250_vpo101","a250_vpo215","a250_vss");
                    pmcConfig.backpackLoot.blacklist.push("a250_1911","a250_axmc","a250_ak545","a250_556","a250_556fde","a250_590a1","a250_ak762","a250_ak556","a250_aps","a250_ar10","a250_ash12","a250_aug","a250_avt","a250_dvl","a250_fn57","a250_g28","a250_glock45","a250_glock9","a250_kedr","a250_ks23","a250_m1a","a250_m3sup90","a250_m700","a250_m870","a250_m9a3","a250_scarh","a250_scarhfde","a250_mk18","a250_mosinbox","a250_mosinaa","a250_mp133","a250_mp443","a250_mp5","a250_mp7","a250_mp9","a250_mpx","a250_p226","a250_p90","a250_pkp","a250_pl15","a250_pm","a250_pp1901","a250_ppsh","a250_sa58","a250_saiga12","a250_sksbox","a250_skspmag","a250_sr1mp","a250_sr2m","a250_sv98","a250_svd","a250_svt","a250_t5000","a250_toz","a250_tt105","a250_ump","a250_usp","a250_vpo101","a250_vpo215","a250_vss");
                }
            }
        }

        if (MagsOnly === true){
            if (typeof blacklistMags === "boolean"){
                if (blacklistMags === true) {
                    botConfig.equipment.pmc.blacklist[0].equipment.mod_magazine.push("a250_1911","a250_axmc","a250_ak545","a250_556","a250_556fde","a250_590a1","a250_ak762","a250_ak556","a250_aps","a250_ar10","a250_ash12","a250_aug","a250_avt","a250_dvl","a250_fn57","a250_g28","a250_glock45","a250_glock9","a250_kedr","a250_ks23","a250_m1a","a250_m3sup90","a250_m700","a250_m870","a250_m9a3","a250_scarh","a250_scarhfde","a250_mk18","a250_mosinbox","a250_mosinaa","a250_mp133","a250_mp443","a250_mp5","a250_mp7","a250_mp9","a250_mpx","a250_p226","a250_p90","a250_pkp","a250_pl15","a250_pm","a250_pp1901","a250_ppsh","a250_sa58","a250_saiga12","a250_sksbox","a250_skspmag","a250_sr1mp","a250_sr2m","a250_sv98","a250_svd","a250_svt","a250_t5000","a250_toz","a250_tt105","a250_ump","a250_usp","a250_vpo101","a250_vpo215","a250_vss");
                    pmcConfig.vestLoot.blacklist.push("a250_1911","a250_axmc","a250_ak545","a250_556","a250_556fde","a250_590a1","a250_ak762","a250_ak556","a250_aps","a250_ar10","a250_ash12","a250_aug","a250_avt","a250_dvl","a250_fn57","a250_g28","a250_glock45","a250_glock9","a250_kedr","a250_ks23","a250_m1a","a250_m3sup90","a250_m700","a250_m870","a250_m9a3","a250_scarh","a250_scarhfde","a250_mk18","a250_mosinbox","a250_mosinaa","a250_mp133","a250_mp443","a250_mp5","a250_mp7","a250_mp9","a250_mpx","a250_p226","a250_p90","a250_pkp","a250_pl15","a250_pm","a250_pp1901","a250_ppsh","a250_sa58","a250_saiga12","a250_sksbox","a250_skspmag","a250_sr1mp","a250_sr2m","a250_sv98","a250_svd","a250_svt","a250_t5000","a250_toz","a250_tt105","a250_ump","a250_usp","a250_vpo101","a250_vpo215","a250_vss");
                    pmcConfig.pocketLoot.blacklist.push("a250_1911","a250_axmc","a250_ak545","a250_556","a250_556fde","a250_590a1","a250_ak762","a250_ak556","a250_aps","a250_ar10","a250_ash12","a250_aug","a250_avt","a250_dvl","a250_fn57","a250_g28","a250_glock45","a250_glock9","a250_kedr","a250_ks23","a250_m1a","a250_m3sup90","a250_m700","a250_m870","a250_m9a3","a250_scarh","a250_scarhfde","a250_mk18","a250_mosinbox","a250_mosinaa","a250_mp133","a250_mp443","a250_mp5","a250_mp7","a250_mp9","a250_mpx","a250_p226","a250_p90","a250_pkp","a250_pl15","a250_pm","a250_pp1901","a250_ppsh","a250_sa58","a250_saiga12","a250_sksbox","a250_skspmag","a250_sr1mp","a250_sr2m","a250_sv98","a250_svd","a250_svt","a250_t5000","a250_toz","a250_tt105","a250_ump","a250_usp","a250_vpo101","a250_vpo215","a250_vss");
                    pmcConfig.backpackLoot.blacklist.push("a250_1911","a250_axmc","a250_ak545","a250_556","a250_556fde","a250_590a1","a250_ak762","a250_ak556","a250_aps","a250_ar10","a250_ash12","a250_aug","a250_avt","a250_dvl","a250_fn57","a250_g28","a250_glock45","a250_glock9","a250_kedr","a250_ks23","a250_m1a","a250_m3sup90","a250_m700","a250_m870","a250_m9a3","a250_scarh","a250_scarhfde","a250_mk18","a250_mosinbox","a250_mosinaa","a250_mp133","a250_mp443","a250_mp5","a250_mp7","a250_mp9","a250_mpx","a250_p226","a250_p90","a250_pkp","a250_pl15","a250_pm","a250_pp1901","a250_ppsh","a250_sa58","a250_saiga12","a250_sksbox","a250_skspmag","a250_sr1mp","a250_sr2m","a250_sv98","a250_svd","a250_svt","a250_t5000","a250_toz","a250_tt105","a250_ump","a250_usp","a250_vpo101","a250_vpo215","a250_vss");
                }
            }
        }

        if (RigsOnly === true){
            if (typeof blacklistGear === "boolean"){
                if (blacklistGear === true) {
                    pmcConfig.vestLoot.blacklist.push("armorOfAthena","atlasSatchel","hercRig","hercRig2","helmetOfHermes");
                    pmcConfig.pocketLoot.blacklist.push("armorOfAthena","atlasSatchel","hercRig","hercRig2","helmetOfHermes");
                    pmcConfig.backpackLoot.blacklist.push("armorOfAthena","atlasSatchel","hercRig","hercRig2","helmetOfHermes");
                }
            }
        }

        if (StimsOnly === true){
            if (typeof blacklistMeds === "boolean"){
                if (blacklistMeds === true) {
                    pmcConfig.vestLoot.blacklist.push("apollosStim","apollosPropital","apollosPain","apollosCMS");
                    pmcConfig.pocketLoot.blacklist.push("apollosStim","apollosPropital","apollosPain","apollosCMS");
                    pmcConfig.backpackLoot.blacklist.push("apollosStim","apollosPropital","apollosPain","apollosCMS");
                }
            }
        }

    }

}
module.exports = { mod: new Olympus() }