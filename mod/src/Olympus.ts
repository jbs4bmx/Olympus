/**
 * Copyright: AssAssIn
 * Continued By: jbs4bmx
*/

import { ConfigServer } from "@spt/servers/ConfigServer";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { DependencyContainer } from "tsyringe";
import { IBotConfig } from "@spt/models/spt/config/IBotConfig";
import { IItemConfig } from "@spt/models/spt/config/IItemConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ImporterUtil } from "@spt/utils/ImporterUtil";
import { IPmcConfig } from "@spt/models/spt/config/IPmcConfig";
import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { IPreSptLoadMod } from "@spt/models/external/IPreSptLoadMod";
import { PreSptModLoader } from "@spt/loaders/PreSptModLoader";
import { VFS } from "@spt/utils/VFS";
import { jsonc } from "jsonc";
import path from "path";

let zeusdb;
let itemConfig: IItemConfig;
let botConfig: IBotConfig;
let pmcConfig: IPmcConfig;
let configServer: ConfigServer;

class Olympus implements IPreSptLoadMod, IPostDBLoadMod
{
    private pkg;
    private path = require('path');
    private modName = this.path.basename(this.path.dirname(__dirname.split('/').pop()));

    public postDBLoad(container: DependencyContainer): void {
        const logger = container.resolve<ILogger>("WinstonLogger");
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const preSptModLoader = container.resolve<PreSptModLoader>("PreSptModLoader");
        const databaseImporter = container.resolve<ImporterUtil>("ImporterUtil");
        const iData = db.templates.items
        const pData = db.templates.prices
        const locales = db.locales.global;
        const handbook = db.templates.handbook.Items;
        const tData = db.traders;
        this.pkg = require("../package.json");
        const vfs = container.resolve<VFS>("VFS");
        const { FullVersion, MagsOnly, RigsOnly, StimsOnly } = jsonc.parse(vfs.readFile(path.resolve(__dirname, "../config.jsonc")));

        if ( typeof FullVersion !== 'boolean' || typeof MagsOnly !== 'boolean' || typeof RigsOnly !== 'boolean' || typeof StimsOnly !== 'boolean' ) {
            logger.error(`Olympus: One or more version selection values are not a boolean value of true or false.`)
            logger.error(`Please fix your configuration file and restart your server.`)
            return
        } else {
            logger.info(`Olympus config looks correct. Continuing to load mod...`);
        }

        zeusdb = databaseImporter.loadRecursive(`${preSptModLoader.getModPath(this.modName)}database/`);

        if ( FullVersion === true ) {
            // TEMPLATE ITEM ENTRIES
            for (const i_item in zeusdb.dbItems.templatesStims) {
                iData[i_item] = zeusdb.dbItems.templatesStims[i_item];
            }
            for (const i_item in zeusdb.dbItems.templatesRigs) {
                iData[i_item] = zeusdb.dbItems.templatesRigs[i_item];
            }
            for (const i_item in zeusdb.dbItems.templatesMags) {
                iData[i_item] = zeusdb.dbItems.templatesMags[i_item];
            }
            // HANDBOOK ENTRIES
            for (const h_item of zeusdb.dbItems.handbookStims.Items) {
                if (!handbook.find(i=>i.Id == h_item.Id)) {
                    handbook.push(h_item);
                }
            }
            for (const h_item of zeusdb.dbItems.handbookRigs.Items) {
                if (!handbook.find(i=>i.Id == h_item.Id)) {
                    handbook.push(h_item);
                }
            }
            for (const h_item of zeusdb.dbItems.handbookMags.Items) {
                if (!handbook.find(i=>i.Id == h_item.Id)) {
                    handbook.push(h_item);
                }
            }
            // LOCALE ENTRIES
            for (const localeID in locales) {
                for (const locale in zeusdb.dbItems.localesStims.en) {
                    locales[localeID][locale] = zeusdb.dbItems.localesStims.en[locale];
                }
            }
            for (const localeID in locales) {
                for (const locale in zeusdb.dbItems.localesRigs.en) {
                    locales[localeID][locale] = zeusdb.dbItems.localesRigs.en[locale];
                }
            }
            for (const localeID in locales) {
                for (const locale in zeusdb.dbItems.localesMags.en) {
                    locales[localeID][locale] = zeusdb.dbItems.localesMags.en[locale];
                }
            }
            // PRICE ENTRIES
            for (const p_item in zeusdb.dbItems.pricesStims){
                pData[p_item] = zeusdb.dbItems.pricesStims[p_item];
            }
            for (const p_item in zeusdb.dbItems.pricesRigs){
                pData[p_item] = zeusdb.dbItems.pricesRigs[p_item];
            }
            for (const p_item in zeusdb.dbItems.pricesMags){
                pData[p_item] = zeusdb.dbItems.pricesMags[p_item];
            }
            // TRADER ENTRIES
            for (const tradeName in tData){
                if ( tradeName === "5ac3b934156ae10c4430e83c" ){
                    for (const ri_item of zeusdb.ragmanAssort.items){
                        if (!tData[tradeName].assort.items.find(i=>i._id == ri_item._id)){
                            tData[tradeName].assort.items.push(ri_item);
                        }
                    }
                    for (const rb_item in zeusdb.ragmanAssort.barter_scheme){
                        tData[tradeName].assort.barter_scheme[rb_item] = zeusdb.ragmanAssort.barter_scheme[rb_item];
                    }
                    for (const rl_item in zeusdb.ragmanAssort.loyalty_level_items){
                        tData[tradeName].assort.loyal_level_items[rl_item] = zeusdb.ragmanAssort.loyalty_level_items[rl_item];
                    }
                }
                if ( tradeName === "5c0647fdd443bc2504c2d371" ){
                    for (const ji_item of zeusdb.jaegerAssort.items){
                        if (!tData[tradeName].assort.items.find(i=>i._id == ji_item._id)){
                            tData[tradeName].assort.items.push(ji_item);
                        }
                    }
                    for (const jb_item in zeusdb.jaegerAssort.barter_scheme){
                        tData[tradeName].assort.barter_scheme[jb_item] = zeusdb.jaegerAssort.barter_scheme[jb_item];
                    }
                    for (const jl_item in zeusdb.jaegerAssort.loyalty_level_items){
                        tData[tradeName].assort.loyal_level_items[jl_item] = zeusdb.jaegerAssort.loyalty_level_items[jl_item];
                    }
                }
                if ( tradeName === "54cb57776803fa99248b456e" ){
                    for (const ti_item of zeusdb.therapistAssort.items){
                        if (!tData[tradeName].assort.items.find(i=>i._id == ti_item._id)){
                            tData[tradeName].assort.items.push(ti_item);
                        }
                    }
                    for (const tb_item in zeusdb.therapistAssort.barter_scheme){
                        tData[tradeName].assort.barter_scheme[tb_item] = zeusdb.therapistAssort.barter_scheme[tb_item];
                    }
                    for (const tl_item in zeusdb.therapistAssort.loyalty_level_items){
                        tData[tradeName].assort.loyal_level_items[tl_item] = zeusdb.therapistAssort.loyalty_level_items[tl_item];
                    }
                }
            }
            // Make changes to items loaded into memory
            this.pushMags(container);
            this.pushRigs(container);
            this.pushBuffs(container);

        } else {
            if ( MagsOnly === true ){
                // TEMPLATE ITEM ENTRIES
                for (const i_item in zeusdb.dbItems.templatesMags) {
                    iData[i_item] = zeusdb.dbItems.templatesMags[i_item];
                }
                // HANDBOOK ENTRIES
                for (const h_item of zeusdb.dbItems.handbookMags.Items) {
                    if (!handbook.find(i=>i.Id == h_item.Id)) {
                        handbook.push(h_item);
                    }
                }
                // LOCALE ENTRIES
                for (const localeID in locales) {
                    for (const locale in zeusdb.dbItems.localesMags.en) {
                        locales[localeID][locale] = zeusdb.dbItems.localesMags.en[locale];
                    }
                }
                // PRICE ENTRIES
                for (const p_item in zeusdb.dbItems.pricesMags){
                    pData[p_item] = zeusdb.dbItems.pricesMags[p_item];
                }
                // TRADER ENTRIES
                for (const tradeName in tData){
                    if ( tradeName === "5c0647fdd443bc2504c2d371" ){
                        for (const ji_item of zeusdb.jaegerAssort.items){
                            if (!tData[tradeName].assort.items.find(i=>i._id == ji_item._id)){
                                tData[tradeName].assort.items.push(ji_item);
                            }
                        }
                        for (const jb_item in zeusdb.jaegerAssort.barter_scheme){
                            tData[tradeName].assort.barter_scheme[jb_item] = zeusdb.jaegerAssort.barter_scheme[jb_item];
                        }
                        for (const jl_item in zeusdb.jaegerAssort.loyalty_level_items){
                            tData[tradeName].assort.loyal_level_items[jl_item] = zeusdb.jaegerAssort.loyalty_level_items[jl_item];
                        }
                    }
                }
                // Make changes to items loaded into memory
                this.pushMags(container);
            }

            if ( RigsOnly === true ){
                // TEMPLATE ITEM ENTRIES
                for (const i_item in zeusdb.dbItems.templatesRigs) {
                    iData[i_item] = zeusdb.dbItems.templatesRigs[i_item];
                }
                // HANDBOOK ENTRIES
                for (const h_item of zeusdb.dbItems.handbookRigs.Items) {
                    if (!handbook.find(i=>i.Id == h_item.Id)) {
                        handbook.push(h_item);
                    }
                }
                // LOCALE ENTRIES
                for (const localeID in locales) {
                    for (const locale in zeusdb.dbItems.localesRigs.en) {
                        locales[localeID][locale] = zeusdb.dbItems.localesRigs.en[locale];
                    }
                }
                // PRICE ENTRIES
                for (const p_item in zeusdb.dbItems.pricesRigs){
                    pData[p_item] = zeusdb.dbItems.pricesRigs[p_item];
                }
                // TRADER ENTRIES
                for (const tradeName in tData){
                    if ( tradeName === "5ac3b934156ae10c4430e83c" ){
                        for (const ri_item of zeusdb.ragmanAssort.items){
                            if (!tData[tradeName].assort.items.find(i=>i._id == ri_item._id)){
                                tData[tradeName].assort.items.push(ri_item);
                            }
                        }
                        for (const rb_item in zeusdb.ragmanAssort.barter_scheme){
                            tData[tradeName].assort.barter_scheme[rb_item] = zeusdb.ragmanAssort.barter_scheme[rb_item];
                        }
                        for (const rl_item in zeusdb.ragmanAssort.loyalty_level_items){
                            tData[tradeName].assort.loyal_level_items[rl_item] = zeusdb.ragmanAssort.loyalty_level_items[rl_item];
                        }
                    }
                }
                // Make changes to items loaded into memory
                this.pushRigs(container);
            }

            if ( StimsOnly === true ){
                // TEMPLATE ITEM ENTRIES
                for (const i_item in zeusdb.dbItems.templatesStims) {
                    iData[i_item] = zeusdb.dbItems.templatesStims[i_item];
                }
                // HANDBOOK ENTRIES
                for (const h_item of zeusdb.dbItems.handbookStims.Items) {
                    if (!handbook.find(i=>i.Id == h_item.Id)) {
                        handbook.push(h_item);
                    }
                }
                // LOCALE ENTRIES
                for (const localeID in locales) {
                    for (const locale in zeusdb.dbItems.localesStims.en) {
                        locales[localeID][locale] = zeusdb.dbItems.localesStims.en[locale];
                    }
                }
                // PRICE ENTRIES
                for (const p_item in zeusdb.dbItems.pricesStims){
                    pData[p_item] = zeusdb.dbItems.pricesStims[p_item];
                }
                // TRADER ENTRIES
                for (const tradeName in tData){
                    if ( tradeName === "54cb57776803fa99248b456e" ){
                        for (const ti_item of zeusdb.therapistAssort.items){
                            if (!tData[tradeName].assort.items.find(i=>i._id == ti_item._id)){
                                tData[tradeName].assort.items.push(ti_item);
                            }
                        }
                        for (const tb_item in zeusdb.therapistAssort.barter_scheme){
                            tData[tradeName].assort.barter_scheme[tb_item] = zeusdb.therapistAssort.barter_scheme[tb_item];
                        }
                        for (const tl_item in zeusdb.therapistAssort.loyalty_level_items){
                            tData[tradeName].assort.loyal_level_items[tl_item] = zeusdb.therapistAssort.loyalty_level_items[tl_item];
                        }
                    }
                }
                // Make changes to items loaded into memory
                this.pushBuffs(container);
            }
        }

        // Make changes to items loaded into memory
        this.updateItems(container);
        this.checkExclusions(container);

        logger.info(`${this.pkg.author}-${this.pkg.name} v${this.pkg.version}: Cached successfully`);
    }

    public pushRigs(container: DependencyContainer): void {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const items = db.templates.items;
        items["55d7217a4bdc2d86028b456d"]._props.Slots[5]._props.filters[0].Filter.push("661c9174a371d90e62b8f5c4");
    }

    public pushMags(container: DependencyContainer): void {
        let sectionName = "mod_magazine";
        var i:number;
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const items = db.templates.items;
        for ( let item in items ){
            let data = items[item];
            switch (data._id)
            {
                case "5e81c3cbac2bb513793cdc75":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5e81c3cbac2bb513793cdc75"]._props.Slots[i]._props.filters[0].Filter.push("661c9174e913862da0fc47b5");
                        }
                    }
                break;
                case "5f36a0e5fbf956000b716b65":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5f36a0e5fbf956000b716b65"]._props.Slots[i]._props.filters[0].Filter.push("661c9174e913862da0fc47b5");
                        }
                    }
                break;
                case "627e14b21713922ded6f2c15":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["627e14b21713922ded6f2c15"]._props.Slots[i]._props.filters[0].Filter.push("661c91749f5e2db67c0483a1");
                        }
                    }
                break;
                case "5ac66d9b5acfc4001633997a":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ac66d9b5acfc4001633997a"]._props.Slots[i]._props.filters[0].Filter.push("661c917402e758a43b691cdf");
                        }
                    }
                break;
                case "6499849fc93611967b034949":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["6499849fc93611967b034949"]._props.Slots[i]._props.filters[0].Filter.push("661c917402e758a43b691cdf");
                        }
                    }
                break;
                case "5bf3e03b0db834001d2c4a9c":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5bf3e03b0db834001d2c4a9c"]._props.Slots[i]._props.filters[0].Filter.push("661c917402e758a43b691cdf");
                        }
                    }
                break;
                case "5ac4cd105acfc40016339859":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ac4cd105acfc40016339859"]._props.Slots[i]._props.filters[0].Filter.push("661c917402e758a43b691cdf");
                        }
                    }
                break;
                case "5644bd2b4bdc2d3b4c8b4572":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5644bd2b4bdc2d3b4c8b4572"]._props.Slots[i]._props.filters[0].Filter.push("661c917402e758a43b691cdf");
                        }
                    }
                break;
                case "5bf3e0490db83400196199af":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5bf3e0490db83400196199af"]._props.Slots[i]._props.filters[0].Filter.push("661c917402e758a43b691cdf");
                        }
                    }
                break;
                case "5ab8e9fcd8ce870019439434":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ab8e9fcd8ce870019439434"]._props.Slots[i]._props.filters[0].Filter.push("661c917402e758a43b691cdf");
                        }
                    }
                break;
                case "57dc2fa62459775949412633":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["57dc2fa62459775949412633"]._props.Slots[i]._props.filters[0].Filter.push("661c917402e758a43b691cdf");
                        }
                    }
                break;
                case "5839a40f24597726f856b511":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5839a40f24597726f856b511"]._props.Slots[i]._props.filters[0].Filter.push("661c917402e758a43b691cdf");
                        }
                    }
                break;
                case "583990e32459771419544dd2":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["583990e32459771419544dd2"]._props.Slots[i]._props.filters[0].Filter.push("661c917402e758a43b691cdf");
                        }
                    }
                break;
                case "628b5638ad252a16da6dd245":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["628b5638ad252a16da6dd245"]._props.Slots[i]._props.filters[0].Filter.push("661c917402e758a43b691cdf");
                        }
                    }
                break;
                case "628b9c37a733087d0d7fe84b":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["628b9c37a733087d0d7fe84b"]._props.Slots[i]._props.filters[0].Filter.push("661c917402e758a43b691cdf");
                        }
                    }
                break;
                case "5beed0f50db834001c062b12":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5beed0f50db834001c062b12"]._props.Slots[i]._props.filters[0].Filter.push("661c917402e758a43b691cdf");
                        }
                    }
                break;
                case "5c488a752e221602b412af63":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5c488a752e221602b412af63"]._props.Slots[i]._props.filters[0].Filter.push("661c91748b413265a90fc7de","661c917464f50e378da92cb1");
                        }
                    }
                break;
                case "5bb2475ed4351e00853264e3":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5bb2475ed4351e00853264e3"]._props.Slots[i]._props.filters[0].Filter.push("661c91748b413265a90fc7de","661c917464f50e378da92cb1");
                        }
                    }
                break;
                case "623063e994fc3f7b302a9696":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["623063e994fc3f7b302a9696"]._props.Slots[i]._props.filters[0].Filter.push("661c91748b413265a90fc7de","661c917464f50e378da92cb1");
                        }
                    }
                break;
                case "5447a9cd4bdc2dbd208b4567":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5447a9cd4bdc2dbd208b4567"]._props.Slots[i]._props.filters[0].Filter.push("661c91748b413265a90fc7de","661c917464f50e378da92cb1");
                        }
                    }
                break;
                case "5fbcc1d9016cce60e8341ab3":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5fbcc1d9016cce60e8341ab3"]._props.Slots[i]._props.filters[0].Filter.push("661c91748b413265a90fc7de","661c917464f50e378da92cb1");
                        }
                    }
                break;
                case "6184055050224f204c1da540":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["6184055050224f204c1da540"]._props.Slots[i]._props.filters[0].Filter.push("661c91748b413265a90fc7de","661c917464f50e378da92cb1");
                        }
                    }
                break;
                case "5c07c60e0db834002330051f":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5c07c60e0db834002330051f"]._props.Slots[i]._props.filters[0].Filter.push("661c91748b413265a90fc7de","661c917464f50e378da92cb1");
                        }
                    }
                break;
                case "5d43021ca4b9362eab4b5e25":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5d43021ca4b9362eab4b5e25"]._props.Slots[i]._props.filters[0].Filter.push("661c91748b413265a90fc7de","661c917464f50e378da92cb1");
                        }
                    }
                break;
                case "5e870397991fd70db46995c8":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5e870397991fd70db46995c8"]._props.Slots[i]._props.filters[0].Filter.push("661c91743bf9da2467ec1058");
                        }
                    }
                break;
                case "5ac66d2e5acfc43b321d4b53":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ac66d2e5acfc43b321d4b53"]._props.Slots[i]._props.filters[0].Filter.push("661c917474f053debac21896");
                        }
                    }
                break;
                case "5ac66d725acfc43b321d4b60":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ac66d725acfc43b321d4b60"]._props.Slots[i]._props.filters[0].Filter.push("661c917474f053debac21896");
                        }
                    }
                break;
                case "59d6088586f774275f37482f":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["59d6088586f774275f37482f"]._props.Slots[i]._props.filters[0].Filter.push("661c917474f053debac21896");
                        }
                    }
                break;
                case "5a0ec13bfcdbcb00165aa685":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5a0ec13bfcdbcb00165aa685"]._props.Slots[i]._props.filters[0].Filter.push("661c917474f053debac21896");
                        }
                    }
                break;
                case "59ff346386f77477562ff5e2":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["59ff346386f77477562ff5e2"]._props.Slots[i]._props.filters[0].Filter.push("661c917474f053debac21896");
                        }
                    }
                break;
                case "5abcbc27d8ce8700182eceeb":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5abcbc27d8ce8700182eceeb"]._props.Slots[i]._props.filters[0].Filter.push("661c917474f053debac21896");
                        }
                    }
                break;
                case "606587252535c57a13424cfd":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["606587252535c57a13424cfd"]._props.Slots[i]._props.filters[0].Filter.push("661c917474f053debac21896");
                        }
                    }
                break;
                case "628a60ae6b1d481ff772e9c8":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["628a60ae6b1d481ff772e9c8"]._props.Slots[i]._props.filters[0].Filter.push("661c917474f053debac21896");
                        }
                    }
                break;
                case "59e6152586f77473dc057aa1":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["59e6152586f77473dc057aa1"]._props.Slots[i]._props.filters[0].Filter.push("661c917474f053debac21896");
                        }
                    }
                break;
                case "59e6687d86f77411d949b251":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["59e6687d86f77411d949b251"]._props.Slots[i]._props.filters[0].Filter.push("661c917474f053debac21896");
                        }
                    }
                break;
                case "5ac66cb05acfc40198510a10":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ac66cb05acfc40198510a10"]._props.Slots[i]._props.filters[0].Filter.push("661c91742ca9507ed4f683b1");
                        }
                    }
                break;
                case "5ac66d015acfc400180ae6e4":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ac66d015acfc400180ae6e4"]._props.Slots[i]._props.filters[0].Filter.push("661c91742ca9507ed4f683b1");
                        }
                    }
                break;
                case "5abccb7dd8ce87001773e277":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5abccb7dd8ce87001773e277"]._props.Slots[i]._props.filters[0].Filter.push("661c91746bc83d25ea40f719");
                        }
                    }
                break;
                case "5a17f98cfcdbcb0980087290":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5a17f98cfcdbcb0980087290"]._props.Slots[i]._props.filters[0].Filter.push("661c91746bc83d25ea40f719");
                        }
                    }
                break;
                case "5dcbd56fdbd3d91b3e5468d5":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5dcbd56fdbd3d91b3e5468d5"]._props.Slots[i]._props.filters[0].Filter.push("661c9174f86d29e0b37c51a4");
                        }
                    }
                break;
                case "5a367e5dc4a282000e49738f":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5a367e5dc4a282000e49738f"]._props.Slots[i]._props.filters[0].Filter.push("661c9174f86d29e0b37c51a4");
                        }
                    }
                break;
                case "5df8ce05b11454561e39243b":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5df8ce05b11454561e39243b"]._props.Slots[i]._props.filters[0].Filter.push("661c9174f86d29e0b37c51a4");
                        }
                    }
                break;
                case "5cadfbf7ae92152ac412eeef":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5cadfbf7ae92152ac412eeef"]._props.Slots[i]._props.filters[0].Filter.push("661c9174f80c325a741bd69e");
                        }
                    }
                break;
                case "62e7c4fba689e8c9c50dfc38":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["62e7c4fba689e8c9c50dfc38"]._props.Slots[i]._props.filters[0].Filter.push("661c917496b2057e3c41dfa8");
                        }
                    }
                break;
                case "63171672192e68c5460cebc5":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["63171672192e68c5460cebc5"]._props.Slots[i]._props.filters[0].Filter.push("661c917496b2057e3c41dfa8");
                        }
                    }
                break;
                case "6410733d5dd49d77bd07847e":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["6410733d5dd49d77bd07847e"]._props.Slots[i]._props.filters[0].Filter.push("661c91747fc62a3b0e9584d1");
                        }
                    }
                break;
                case "588892092459774ac91d4b11":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["588892092459774ac91d4b11"]._props.Slots[i]._props.filters[0].Filter.push("661c917405792ade43cfb861");
                        }
                    }
                break;
                case "5d3eb3b0a4b93615055e84d2":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5d3eb3b0a4b93615055e84d2"]._props.Slots[i]._props.filters[0].Filter.push("661c917445a7b1f23d0c8e69");
                        }
                    }
                break;
                case "5d67abc1a4b93614ec50137f":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5d67abc1a4b93614ec50137f"]._props.Slots[i]._props.filters[0].Filter.push("661c917445a7b1f23d0c8e69");
                        }
                    }
                break;
                case "6176aca650224f204c1da3fb":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["6176aca650224f204c1da3fb"]._props.Slots[i]._props.filters[0].Filter.push("661c9174b82c1e59463d70af");
                        }
                    }
                break;
                case "5fb64bc92b1b027b1f50bcf2":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5fb64bc92b1b027b1f50bcf2"]._props.Slots[i]._props.filters[0].Filter.push("661c9174bce243051fd867a9");
                        }
                    }
                break;
                case "5fc3f2d5900b1d5091531e57":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5fc3f2d5900b1d5091531e57"]._props.Slots[i]._props.filters[0].Filter.push("661c91740942af6b5e3871dc");
                        }
                    }
                break;
                case "5a7ae0c351dfba0017554310":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5a7ae0c351dfba0017554310"]._props.Slots[i]._props.filters[0].Filter.push("661c91740942af6b5e3871dc");
                        }
                    }
                break;
                case "5b1fa9b25acfc40018633c01":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5b1fa9b25acfc40018633c01"]._props.Slots[i]._props.filters[0].Filter.push("661c91740942af6b5e3871dc");
                        }
                    }
                break;
                case "63088377b5cd696784087147":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["63088377b5cd696784087147"]._props.Slots[i]._props.filters[0].Filter.push("661c91740942af6b5e3871dc");
                        }
                    }
                break;
                case "60339954d62c9b14ed777c06":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["60339954d62c9b14ed777c06"]._props.Slots[i]._props.filters[0].Filter.push("661c91740942af6b5e3871dc");
                        }
                    }
                break;
                case "57f4c844245977379d5c14d1":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["57f4c844245977379d5c14d1"]._props.Slots[i]._props.filters[0].Filter.push("661c91746bc572f34ead9810");
                        }
                    }
                break;
                case "57d14d2524597714373db789":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["57d14d2524597714373db789"]._props.Slots[i]._props.filters[0].Filter.push("661c91746bc572f34ead9810");
                        }
                    }
                break;
                case "57f3c6bd24597738e730fa2f":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["57f3c6bd24597738e730fa2f"]._props.Slots[i]._props.filters[0].Filter.push("661c91746bc572f34ead9810");
                        }
                    }
                break;
                case "5e848cc2988a8701445df1e8":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5e848cc2988a8701445df1e8"]._props.Slots[i]._props.filters[0].Filter.push("661c9174037492af1d8eb65c");
                        }
                    }
                break;
                case "5aafa857e5b5b00018480968":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5aafa857e5b5b00018480968"]._props.Slots[i]._props.filters[0].Filter.push("661c917441b8c2f70dea9653");
                        }
                    }
                break;
                case "6259b864ebedf17603599e88":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["6259b864ebedf17603599e88"]._props.Slots[i]._props.filters[0].Filter.push("661c91745c983ed21fb7604a");
                        }
                    }
                break;
                case "5bfea6e90db834001b7347f3":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5bfea6e90db834001b7347f3"]._props.Slots[i]._props.filters[0].Filter.push("661c9174fc746a583b91d0e2");
                        }
                    }
                break;
                case "5a7828548dc32e5a9c28b516":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5a7828548dc32e5a9c28b516"]._props.Slots[i]._props.filters[0].Filter.push("661c9174f4b3d70e1a2985c6");
                        }
                    }
                break;
                case "5cadc190ae921500103bb3b6":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5cadc190ae921500103bb3b6"]._props.Slots[i]._props.filters[0].Filter.push("661c9174bae34fd619c07582");
                        }
                    }
                break;
                case "6165ac306ef05c2ce828ef74":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["6165ac306ef05c2ce828ef74"]._props.Slots[i]._props.filters[0].Filter.push("661c9174da5c873b62041e9f","661c9174c73d928a50f41eb6");
                        }
                    }
                break;
                case "6183afd850224f204c1da514":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["6183afd850224f204c1da514"]._props.Slots[i]._props.filters[0].Filter.push("661c9174da5c873b62041e9f","661c9174c73d928a50f41eb6");
                        }
                    }
                break;
                case "6183afd850224f204c1da514":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["6183afd850224f204c1da514"]._props.Slots[i]._props.filters[0].Filter.push("661c9174da5c873b62041e9f","661c9174c73d928a50f41eb6");
                        }
                    }
                break;
                case "5fc22d7c187fea44d52eda44":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5fc22d7c187fea44d52eda44"]._props.Slots[i]._props.filters[0].Filter.push("661c9174c58f9361e74ba2d0");
                        }
                    }
                break;
                case "5bfd297f0db834001a669119":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5bfd297f0db834001a669119"]._props.Slots[i]._props.filters[0].Filter.push("661c91747f0ca356149e28db","661c9174230dfcea467198b5");
                        }
                    }
                break;
                case "5ae08f0a5acfc408fb1398a1":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ae08f0a5acfc408fb1398a1"]._props.Slots[i]._props.filters[0].Filter.push("661c91747f0ca356149e28db","661c9174230dfcea467198b5");
                        }
                    }
                break;
                case "54491c4f4bdc2db1078b4568":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["54491c4f4bdc2db1078b4568"]._props.Slots[i]._props.filters[0].Filter.push("661c9174764f1b5cd2038a9e");
                        }
                    }
                break;
                case "56dee2bdd2720bc8328b4567":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["56dee2bdd2720bc8328b4567"]._props.Slots[i]._props.filters[0].Filter.push("661c9174764f1b5cd2038a9e");
                        }
                    }
                break;
                case "606dae0ab0e443224b421bb7":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["606dae0ab0e443224b421bb7"]._props.Slots[i]._props.filters[0].Filter.push("661c9174764f1b5cd2038a9e");
                        }
                    }
                break;
                case "576a581d2459771e7b1bc4f1":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["576a581d2459771e7b1bc4f1"]._props.Slots[i]._props.filters[0].Filter.push("661c9174c67f9a5ed3402b81");
                        }
                    }
                break;
                case "5d2f0d8048f0356c925bc3b0":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5d2f0d8048f0356c925bc3b0"]._props.Slots[i]._props.filters[0].Filter.push("661c9174c906852a31b4de7f");
                        }
                    }
                break;
                case "5926bb2186f7744b1c6c6e60":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5926bb2186f7744b1c6c6e60"]._props.Slots[i]._props.filters[0].Filter.push("661c9174c906852a31b4de7f");
                        }
                    }
                break;
                case "5ba26383d4351e00334c93d9":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ba26383d4351e00334c93d9"]._props.Slots[i]._props.filters[0].Filter.push("661c9174d3286c45971b0efa");
                        }
                    }
                break;
                case "5bd70322209c4d00d7167b8f":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5bd70322209c4d00d7167b8f"]._props.Slots[i]._props.filters[0].Filter.push("661c9174d3286c45971b0efa");
                        }
                    }
                break;
                case "5e00903ae9dc277128008b87":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5e00903ae9dc277128008b87"]._props.Slots[i]._props.filters[0].Filter.push("661c9174e5219fd3a0b6c847");
                        }
                    }
                break;
                case "5de7bd7bfd6b4e6e2276dc25":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5de7bd7bfd6b4e6e2276dc25"]._props.Slots[i]._props.filters[0].Filter.push("661c9174e5219fd3a0b6c847");
                        }
                    }
                break;
                case "58948c8e86f77409493f7266":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["58948c8e86f77409493f7266"]._props.Slots[i]._props.filters[0].Filter.push("661c9174602ac48f3eb5d791");
                        }
                    }
                break;
                case "56d59856d2720bd8418b456a":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["56d59856d2720bd8418b456a"]._props.Slots[i]._props.filters[0].Filter.push("661c9174c1694532f7eba08d");
                        }
                    }
                break;
                case "5cc82d76e24e8d00134b4b83":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5cc82d76e24e8d00134b4b83"]._props.Slots[i]._props.filters[0].Filter.push("661c9174d0582abcf13496e7");
                        }
                    }
                break;
                case "64637076203536ad5600c990":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["64637076203536ad5600c990"]._props.Slots[i]._props.filters[0].Filter.push("661c917493a71805cdb462fe");
                        }
                    }
                break;
                case "64ca3d3954fc657e230529cc":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["64ca3d3954fc657e230529cc"]._props.Slots[i]._props.filters[0].Filter.push("661c917493a71805cdb462fe");
                        }
                    }
                break;
                case "602a9740da11d6478d5a06dc":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["602a9740da11d6478d5a06dc"]._props.Slots[i]._props.filters[0].Filter.push("661c917435290ab76d8ec14f");
                        }
                    }
                break;
                case "56e0598dd2720bb5668b45a6":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["56e0598dd2720bb5668b45a6"]._props.Slots[i]._props.filters[0].Filter.push("661c917498cdf3071be6a245");
                        }
                    }
                break;
                case "579204f224597773d619e051":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["579204f224597773d619e051"]._props.Slots[i]._props.filters[0].Filter.push("661c917498cdf3071be6a245");
                        }
                    }
                break;
                case "5448bd6b4bdc2dfc2f8b4569":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5448bd6b4bdc2dfc2f8b4569"]._props.Slots[i]._props.filters[0].Filter.push("661c917498cdf3071be6a245");
                        }
                    }
                break;
                case "59f9cabd86f7743a10721f46":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["59f9cabd86f7743a10721f46"]._props.Slots[i]._props.filters[0].Filter.push("661c9174d69cf15b47e28a30");
                        }
                    }
                break;
                case "59984ab886f7743e98271174":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["59984ab886f7743e98271174"]._props.Slots[i]._props.filters[0].Filter.push("661c9174d69cf15b47e28a30");
                        }
                    }
                break;
                case "5ea03f7400685063ec28bfa8":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ea03f7400685063ec28bfa8"]._props.Slots[i]._props.filters[0].Filter.push("661c9174fc63a05bd418279e");
                        }
                    }
                break;
                case "5b0bbe4e5acfc40dc528a72d":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5b0bbe4e5acfc40dc528a72d"]._props.Slots[i]._props.filters[0].Filter.push("661c91741df6598370bca42e");
                        }
                    }
                break;
                case "5f2a9575926fd9352339381f":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5f2a9575926fd9352339381f"]._props.Slots[i]._props.filters[0].Filter.push("661c91741df6598370bca42e");
                        }
                    }
                break;
                case "576165642459773c7a400233":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["576165642459773c7a400233"]._props.Slots[i]._props.filters[0].Filter.push("661c91748d0af1c4e6b52973");
                        }
                    }
                break;
                case "587e02ff24597743df3deaeb":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["587e02ff24597743df3deaeb"]._props.Slots[i]._props.filters[0].Filter.push("661c91740ad6fe8b24c51739","661c9174ed5f16829a43cb07");
                        }
                    }
                break;
                case "574d967124597745970e7c94":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["574d967124597745970e7c94"]._props.Slots[i]._props.filters[0].Filter.push("661c91740ad6fe8b24c51739","661c9174ed5f16829a43cb07");
                        }
                    }
                break;
                case "59f98b4986f7746f546d2cef":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["59f98b4986f7746f546d2cef"]._props.Slots[i]._props.filters[0].Filter.push("661c917436409c2d18e5afb7");
                        }
                    }
                break;
                case "62e14904c2699c0ec93adc47":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["62e14904c2699c0ec93adc47"]._props.Slots[i]._props.filters[0].Filter.push("661c9174c5fa0b7d162e9384");
                        }
                    }
                break;
                case "55801eed4bdc2d89578b4588":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["55801eed4bdc2d89578b4588"]._props.Slots[i]._props.filters[0].Filter.push("661c917452a4e8c6df93170b");
                        }
                    }
                break;
                case "5c46fbd72e2216398b5a8c9c":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5c46fbd72e2216398b5a8c9c"]._props.Slots[i]._props.filters[0].Filter.push("661c917420a468d53ecbf971");
                        }
                    }
                break;
                case "643ea5b23db6f9f57107d9fd":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["643ea5b23db6f9f57107d9fd"]._props.Slots[i]._props.filters[0].Filter.push("661c91741ef8a5490b72c3d6");
                        }
                    }
                break;
                case "5df24cf80dee1b22f862e9bc":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5df24cf80dee1b22f862e9bc"]._props.Slots[i]._props.filters[0].Filter.push("661c9174af49160de2b3c875");
                        }
                    }
                break;
                case "5a38e6bac4a2826c6e06d79b":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5a38e6bac4a2826c6e06d79b"]._props.Slots[i]._props.filters[0].Filter.push("661c9174d82604e93cba1f57");
                        }
                    }
                break;
                case "571a12c42459771f627b58a0":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["571a12c42459771f627b58a0"]._props.Slots[i]._props.filters[0].Filter.push("661c9174b4f15ce829da7063");
                        }
                    }
                break;
                case "5b3b713c5acfc4330140bd8d":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5b3b713c5acfc4330140bd8d"]._props.Slots[i]._props.filters[0].Filter.push("661c9174b4f15ce829da7063");
                        }
                    }
                break;
                case "5fc3e272f8b6a877a729eac5":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5fc3e272f8b6a877a729eac5"]._props.Slots[i]._props.filters[0].Filter.push("661c9174fb08947321ace56d");
                        }
                    }
                break;
                case "6193a720f8ee7e52e42109ed":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["6193a720f8ee7e52e42109ed"]._props.Slots[i]._props.filters[0].Filter.push("661c917464a59782be3cd0f1");
                        }
                    }
                break;
                case "5c501a4d2e221602b412b540":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5c501a4d2e221602b412b540"]._props.Slots[i]._props.filters[0].Filter.push("661c91741b59672d4a3c0fe8");
                        }
                    }
                break;
                case "5de652c31b7e3716273428be":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5de652c31b7e3716273428be"]._props.Slots[i]._props.filters[0].Filter.push("661c9174cd684a0be15793f2");
                        }
                    }
                break;
                case "57c44b372459772d2b39b8ce":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["57c44b372459772d2b39b8ce"]._props.Slots[i]._props.filters[0].Filter.push("661c91741fb2a035c97486ed");
                        }
                    }
                break;
                case "57838ad32459774a17445cd2":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["57838ad32459774a17445cd2"]._props.Slots[i]._props.filters[0].Filter.push("661c91741fb2a035c97486ed");
                        }
                    }
                break;
                case "65290f395ae2ae97b80fdf2d":
                    for (i = 0; i < data._props.Slots.length; i++)
                    {
                        if (data._props.Slots[i]._name == sectionName)
                        {
                            items["65290f395ae2ae97b80fdf2d"]._props.Slots[i]._props.filters[0].Filter.push("661c9174f86d29e0b37c51a4");
                        }
                    }
                break;
                case "644674a13d52156624001fbc":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["644674a13d52156624001fbc"]._props.Slots[i]._props.filters[0].Filter.push("661c917469a3fc05e2d74b18");
                        }
                    }
                break;
                case "645e0c6b3b381ede770e1cc9":
                    for (i = 0; i < data._props.Slots.length; i++)
                    {
                        if (data._props.Slots[i]._name == sectionName)
                        {
                            items["645e0c6b3b381ede770e1cc9"]._props.Slots[i]._props.filters[0].Filter.push("661c917469a3fc05e2d74b18");
                        }
                    }
                break;
                case "66015072e9f84d5680039678":
                    for (i = 0; i < data._props.Slots.length; i++)
                    {
                        if (data._props.Slots[i]._name == sectionName)
                        {
                            items["66015072e9f84d5680039678"]._props.Slots[i]._props.filters[0].Filter.push("661c91746ea308dc91725f4b");
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
        for (const stimBuff in additions){
            gameBuffs[stimBuff] = additions[stimBuff];
        }
    }

    public updateItems(container: DependencyContainer): void {
        const logger = container.resolve<ILogger>("WinstonLogger");
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const items = db.templates.items;
        const vfs = container.resolve<VFS>("VFS");
        const { FullVersion, MagsOnly, RigsOnly, StimsOnly, cartridgeCount, athenaArmorAmount, herculesRig2ArmorAmount, helmetofhermesArmorAmount, atlassatchelHorizontal, atlassatchelVertical, numberOfStimUses, stimUseTimeInSeconds } = jsonc.parse(vfs.readFile(path.resolve(__dirname, "../config.jsonc")));

        function roundToNearest50(number) {
            if (number < 50) {return 50;}
            return Math.round(number / 50) * 50;
        }
        // Make sure cartridgeCount is a number and round it to the nearest 50
        if (!isNaN(cartridgeCount)) {
            var roundedNumber = roundToNearest50(cartridgeCount);
            logger.info(`Cartridge count rounded to nearest 50.`);
            logger.info(`Cartridge count for Apollo's Mags set to: ${roundedNumber}`);
        } else {
            var roundedNumber = 250;
            logger.error(`Invalid input. Cartridge count for Apollo's Mags is not valid.`);
            logger.info(`Setting to default value: 250.`);
        }

        let stringValue: string = "1-" + roundedNumber.toString();

        const stimItems: string[] = [
            "661c91746c391e0f5ba82d47",
            "661c91741ba0f93d4287c5e6",
            "661c91742b5c1493806daf7e",
            "661c9174e9365c70fa18b4d2"
        ];
        const magItems: string[] = [
            "661c9174e913862da0fc47b5",
            "661c91749f5e2db67c0483a1",
            "661c917402e758a43b691cdf",
            "661c91748b413265a90fc7de",
            "661c917464f50e378da92cb1",
            "661c91743bf9da2467ec1058",
            "661c917474f053debac21896",
            "661c91742ca9507ed4f683b1",
            "661c91746bc83d25ea40f719",
            "661c9174f86d29e0b37c51a4",
            "661c9174f80c325a741bd69e",
            "661c917496b2057e3c41dfa8",
            "661c91747fc62a3b0e9584d1",
            "661c917405792ade43cfb861",
            "661c917445a7b1f23d0c8e69",
            "661c9174b82c1e59463d70af",
            "661c9174bce243051fd867a9",
            "661c91740942af6b5e3871dc",
            "661c91746bc572f34ead9810",
            "661c9174037492af1d8eb65c",
            "661c917441b8c2f70dea9653",
            "661c91745c983ed21fb7604a",
            "661c9174fc746a583b91d0e2",
            "661c9174f4b3d70e1a2985c6",
            "661c9174bae34fd619c07582",
            "661c9174da5c873b62041e9f",
            "661c9174c73d928a50f41eb6",
            "661c9174c58f9361e74ba2d0",
            "661c91747f0ca356149e28db",
            "661c9174230dfcea467198b5",
            "661c9174764f1b5cd2038a9e",
            "661c9174c67f9a5ed3402b81",
            "661c9174c906852a31b4de7f",
            "661c9174d3286c45971b0efa",
            "661c9174e5219fd3a0b6c847",
            "661c9174602ac48f3eb5d791",
            "661c9174c1694532f7eba08d",
            "661c9174d0582abcf13496e7",
            "661c917493a71805cdb462fe",
            "661c917435290ab76d8ec14f",
            "661c917498cdf3071be6a245",
            "661c9174d69cf15b47e28a30",
            "661c9174fc63a05bd418279e",
            "661c91741df6598370bca42e",
            "661c91748d0af1c4e6b52973",
            "661c91740ad6fe8b24c51739",
            "661c9174ed5f16829a43cb07",
            "661c917436409c2d18e5afb7",
            "661c9174c5fa0b7d162e9384",
            "661c917452a4e8c6df93170b",
            "661c917420a468d53ecbf971",
            "661c91741ef8a5490b72c3d6",
            "661c9174af49160de2b3c875",
            "661c9174d82604e93cba1f57",
            "661c9174b4f15ce829da7063",
            "661c9174fb08947321ace56d",
            "661c917464a59782be3cd0f1",
            "661c91741b59672d4a3c0fe8",
            "661c9174cd684a0be15793f2",
            "661c91741fb2a035c97486ed"
        ];

        if ( FullVersion === true ) {
            magItems.forEach(mag => {
                items[mag]._props.Cartridges[0]._max_count = roundedNumber;
                items[mag]._props.VisibleAmmoRangesString = stringValue;
            });

            items["661c91744502ba91ef63c8d7"]._props.Durabilty = athenaArmorAmount;
            items["661c91744502ba91ef63c8d7"]._props.MaxDurabilty = athenaArmorAmount;
            items["661c9174d9718c60a32fe5b4"]._props.Durabilty = herculesRig2ArmorAmount;
            items["661c9174d9718c60a32fe5b4"]._props.MaxDurabilty = herculesRig2ArmorAmount;
            items["661c9174a371d90e62b8f5c4"]._props.Durabilty = helmetofhermesArmorAmount;
            items["661c9174a371d90e62b8f5c4"]._props.MaxDurabilty = helmetofhermesArmorAmount;
            items["661c917426ba940d7138e5cf"]._props.Grids[0]._props.cellsH = atlassatchelHorizontal;
            items["661c917426ba940d7138e5cf"]._props.Grids[0]._props.cellsV = atlassatchelVertical;

            stimItems.forEach(stim => {
                items[stim]._props.MaxHpResource = numberOfStimUses;
                items[stim]._props.medUseTime = stimUseTimeInSeconds;
            });

        } else {
            if ( MagsOnly === true ) {
                magItems.forEach(mag => {
                    items[mag]._props.Cartridges[0]._max_count = cartridgeCount;
                    items[mag]._props.VisibleAmmoRangesString = stringValue;
                });
            }

            if ( RigsOnly === true ) {
                items["661c91744502ba91ef63c8d7"]._props.Durabilty = athenaArmorAmount;
                items["661c91744502ba91ef63c8d7"]._props.MaxDurabilty = athenaArmorAmount;
                items["661c9174d9718c60a32fe5b4"]._props.Durabilty = herculesRig2ArmorAmount;
                items["661c9174d9718c60a32fe5b4"]._props.MaxDurabilty = herculesRig2ArmorAmount;
                items["661c9174a371d90e62b8f5c4"]._props.Durabilty = helmetofhermesArmorAmount;
                items["661c9174a371d90e62b8f5c4"]._props.MaxDurabilty = helmetofhermesArmorAmount;
                items["661c917426ba940d7138e5cf"]._props.Grids[0]._props.cellsH = atlassatchelHorizontal;
                items["661c917426ba940d7138e5cf"]._props.Grids[0]._props.cellsV = atlassatchelVertical;
            }

            if ( StimsOnly === true ) {
                stimItems.forEach(stim => {
                    items[stim]._props.MaxHpResource = numberOfStimUses;
                    items[stim]._props.medUseTime = stimUseTimeInSeconds;
                });
            }
        }
    }

    public checkExclusions(container: DependencyContainer): void {
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const botConfig = configServer.getConfig<IBotConfig>(ConfigTypes.BOT);
        const pmcConfig = configServer.getConfig<IPmcConfig>(ConfigTypes.PMC);
        const itemConfig = configServer.getConfig<IItemConfig>(ConfigTypes.ITEM);
        const vfs = container.resolve<VFS>("VFS");
        const { FullVersion, MagsOnly, RigsOnly, StimsOnly, blacklistStims, blacklistRigs, blacklistMags } = jsonc.parse(vfs.readFile(path.resolve(__dirname, "../config.jsonc")));

        if ( FullVersion === true ){
            if (typeof blacklistStims === "boolean") {
                if (blacklistStims === true) {
                    pmcConfig.vestLoot.blacklist.push("661c91746c391e0f5ba82d47","661c91741ba0f93d4287c5e6","661c91742b5c1493806daf7e","661c9174e9365c70fa18b4d2");
                    pmcConfig.pocketLoot.blacklist.push("661c91746c391e0f5ba82d47","661c91741ba0f93d4287c5e6","661c91742b5c1493806daf7e","661c9174e9365c70fa18b4d2");
                    pmcConfig.backpackLoot.blacklist.push("661c91746c391e0f5ba82d47","661c91741ba0f93d4287c5e6","661c91742b5c1493806daf7e","661c9174e9365c70fa18b4d2");
                    itemConfig.blacklist.push("661c91746c391e0f5ba82d47","661c91741ba0f93d4287c5e6","661c91742b5c1493806daf7e","661c9174e9365c70fa18b4d2");
                }
            }
            if (typeof blacklistRigs === "boolean") {
                if (blacklistRigs === true) {
                    pmcConfig.vestLoot.blacklist.push("661c91744502ba91ef63c8d7","661c917426ba940d7138e5cf","661c9174018549befc3a7d62","661c9174d9718c60a32fe5b4","661c9174a371d90e62b8f5c4");
                    pmcConfig.pocketLoot.blacklist.push("661c91744502ba91ef63c8d7","661c917426ba940d7138e5cf","661c9174018549befc3a7d62","661c9174d9718c60a32fe5b4","661c9174a371d90e62b8f5c4");
                    pmcConfig.backpackLoot.blacklist.push("661c91744502ba91ef63c8d7","661c917426ba940d7138e5cf","661c9174018549befc3a7d62","661c9174d9718c60a32fe5b4","661c9174a371d90e62b8f5c4");
                    itemConfig.blacklist.push("661c91744502ba91ef63c8d7","661c917426ba940d7138e5cf","661c9174018549befc3a7d62","661c9174d9718c60a32fe5b4","661c9174a371d90e62b8f5c4");
                }
            }
            if (typeof blacklistMags === "boolean") {
                if (blacklistMags === true) {
                    botConfig.equipment.pmc.blacklist[0].equipment.mod_magazine.push("661c9174e913862da0fc47b5","661c91749f5e2db67c0483a1","661c917402e758a43b691cdf","661c91748b413265a90fc7de","661c917464f50e378da92cb1","661c91743bf9da2467ec1058","661c917474f053debac21896","661c91742ca9507ed4f683b1","661c91746bc83d25ea40f719","661c9174f86d29e0b37c51a4","661c9174f80c325a741bd69e","661c917496b2057e3c41dfa8","661c91747fc62a3b0e9584d1","661c917405792ade43cfb861","661c917445a7b1f23d0c8e69","661c9174b82c1e59463d70af","661c9174bce243051fd867a9","661c91740942af6b5e3871dc","661c91746bc572f34ead9810","661c9174037492af1d8eb65c","661c917441b8c2f70dea9653","661c91745c983ed21fb7604a","661c9174fc746a583b91d0e2","661c9174f4b3d70e1a2985c6","661c9174bae34fd619c07582","661c9174da5c873b62041e9f","661c9174c73d928a50f41eb6","661c9174c58f9361e74ba2d0","661c91747f0ca356149e28db","661c9174230dfcea467198b5","661c9174764f1b5cd2038a9e","661c9174c67f9a5ed3402b81","661c9174c906852a31b4de7f","661c9174d3286c45971b0efa","661c9174e5219fd3a0b6c847","661c9174602ac48f3eb5d791","661c9174c1694532f7eba08d","661c9174d0582abcf13496e7","661c917493a71805cdb462fe","661c917435290ab76d8ec14f","661c917498cdf3071be6a245","661c9174d69cf15b47e28a30","661c9174fc63a05bd418279e","661c91741df6598370bca42e","661c91748d0af1c4e6b52973","661c91740ad6fe8b24c51739","661c9174ed5f16829a43cb07","661c917436409c2d18e5afb7","661c9174c5fa0b7d162e9384","661c917452a4e8c6df93170b","661c917420a468d53ecbf971","661c91741ef8a5490b72c3d6","661c9174af49160de2b3c875","661c9174d82604e93cba1f57","661c9174b4f15ce829da7063","661c9174fb08947321ace56d","661c917464a59782be3cd0f1","661c91741b59672d4a3c0fe8","661c9174cd684a0be15793f2","661c91741fb2a035c97486ed","661c917469a3fc05e2d74b18","661c91746ea308dc91725f4b");
                    pmcConfig.vestLoot.blacklist.push("661c9174e913862da0fc47b5","661c91749f5e2db67c0483a1","661c917402e758a43b691cdf","661c91748b413265a90fc7de","661c917464f50e378da92cb1","661c91743bf9da2467ec1058","661c917474f053debac21896","661c91742ca9507ed4f683b1","661c91746bc83d25ea40f719","661c9174f86d29e0b37c51a4","661c9174f80c325a741bd69e","661c917496b2057e3c41dfa8","661c91747fc62a3b0e9584d1","661c917405792ade43cfb861","661c917445a7b1f23d0c8e69","661c9174b82c1e59463d70af","661c9174bce243051fd867a9","661c91740942af6b5e3871dc","661c91746bc572f34ead9810","661c9174037492af1d8eb65c","661c917441b8c2f70dea9653","661c91745c983ed21fb7604a","661c9174fc746a583b91d0e2","661c9174f4b3d70e1a2985c6","661c9174bae34fd619c07582","661c9174da5c873b62041e9f","661c9174c73d928a50f41eb6","661c9174c58f9361e74ba2d0","661c91747f0ca356149e28db","661c9174230dfcea467198b5","661c9174764f1b5cd2038a9e","661c9174c67f9a5ed3402b81","661c9174c906852a31b4de7f","661c9174d3286c45971b0efa","661c9174e5219fd3a0b6c847","661c9174602ac48f3eb5d791","661c9174c1694532f7eba08d","661c9174d0582abcf13496e7","661c917493a71805cdb462fe","661c917435290ab76d8ec14f","661c917498cdf3071be6a245","661c9174d69cf15b47e28a30","661c9174fc63a05bd418279e","661c91741df6598370bca42e","661c91748d0af1c4e6b52973","661c91740ad6fe8b24c51739","661c9174ed5f16829a43cb07","661c917436409c2d18e5afb7","661c9174c5fa0b7d162e9384","661c917452a4e8c6df93170b","661c917420a468d53ecbf971","661c91741ef8a5490b72c3d6","661c9174af49160de2b3c875","661c9174d82604e93cba1f57","661c9174b4f15ce829da7063","661c9174fb08947321ace56d","661c917464a59782be3cd0f1","661c91741b59672d4a3c0fe8","661c9174cd684a0be15793f2","661c91741fb2a035c97486ed","661c917469a3fc05e2d74b18","661c91746ea308dc91725f4b");
                    pmcConfig.pocketLoot.blacklist.push("661c9174e913862da0fc47b5","661c91749f5e2db67c0483a1","661c917402e758a43b691cdf","661c91748b413265a90fc7de","661c917464f50e378da92cb1","661c91743bf9da2467ec1058","661c917474f053debac21896","661c91742ca9507ed4f683b1","661c91746bc83d25ea40f719","661c9174f86d29e0b37c51a4","661c9174f80c325a741bd69e","661c917496b2057e3c41dfa8","661c91747fc62a3b0e9584d1","661c917405792ade43cfb861","661c917445a7b1f23d0c8e69","661c9174b82c1e59463d70af","661c9174bce243051fd867a9","661c91740942af6b5e3871dc","661c91746bc572f34ead9810","661c9174037492af1d8eb65c","661c917441b8c2f70dea9653","661c91745c983ed21fb7604a","661c9174fc746a583b91d0e2","661c9174f4b3d70e1a2985c6","661c9174bae34fd619c07582","661c9174da5c873b62041e9f","661c9174c73d928a50f41eb6","661c9174c58f9361e74ba2d0","661c91747f0ca356149e28db","661c9174230dfcea467198b5","661c9174764f1b5cd2038a9e","661c9174c67f9a5ed3402b81","661c9174c906852a31b4de7f","661c9174d3286c45971b0efa","661c9174e5219fd3a0b6c847","661c9174602ac48f3eb5d791","661c9174c1694532f7eba08d","661c9174d0582abcf13496e7","661c917493a71805cdb462fe","661c917435290ab76d8ec14f","661c917498cdf3071be6a245","661c9174d69cf15b47e28a30","661c9174fc63a05bd418279e","661c91741df6598370bca42e","661c91748d0af1c4e6b52973","661c91740ad6fe8b24c51739","661c9174ed5f16829a43cb07","661c917436409c2d18e5afb7","661c9174c5fa0b7d162e9384","661c917452a4e8c6df93170b","661c917420a468d53ecbf971","661c91741ef8a5490b72c3d6","661c9174af49160de2b3c875","661c9174d82604e93cba1f57","661c9174b4f15ce829da7063","661c9174fb08947321ace56d","661c917464a59782be3cd0f1","661c91741b59672d4a3c0fe8","661c9174cd684a0be15793f2","661c91741fb2a035c97486ed","661c917469a3fc05e2d74b18","661c91746ea308dc91725f4b");
                    pmcConfig.backpackLoot.blacklist.push("661c9174e913862da0fc47b5","661c91749f5e2db67c0483a1","661c917402e758a43b691cdf","661c91748b413265a90fc7de","661c917464f50e378da92cb1","661c91743bf9da2467ec1058","661c917474f053debac21896","661c91742ca9507ed4f683b1","661c91746bc83d25ea40f719","661c9174f86d29e0b37c51a4","661c9174f80c325a741bd69e","661c917496b2057e3c41dfa8","661c91747fc62a3b0e9584d1","661c917405792ade43cfb861","661c917445a7b1f23d0c8e69","661c9174b82c1e59463d70af","661c9174bce243051fd867a9","661c91740942af6b5e3871dc","661c91746bc572f34ead9810","661c9174037492af1d8eb65c","661c917441b8c2f70dea9653","661c91745c983ed21fb7604a","661c9174fc746a583b91d0e2","661c9174f4b3d70e1a2985c6","661c9174bae34fd619c07582","661c9174da5c873b62041e9f","661c9174c73d928a50f41eb6","661c9174c58f9361e74ba2d0","661c91747f0ca356149e28db","661c9174230dfcea467198b5","661c9174764f1b5cd2038a9e","661c9174c67f9a5ed3402b81","661c9174c906852a31b4de7f","661c9174d3286c45971b0efa","661c9174e5219fd3a0b6c847","661c9174602ac48f3eb5d791","661c9174c1694532f7eba08d","661c9174d0582abcf13496e7","661c917493a71805cdb462fe","661c917435290ab76d8ec14f","661c917498cdf3071be6a245","661c9174d69cf15b47e28a30","661c9174fc63a05bd418279e","661c91741df6598370bca42e","661c91748d0af1c4e6b52973","661c91740ad6fe8b24c51739","661c9174ed5f16829a43cb07","661c917436409c2d18e5afb7","661c9174c5fa0b7d162e9384","661c917452a4e8c6df93170b","661c917420a468d53ecbf971","661c91741ef8a5490b72c3d6","661c9174af49160de2b3c875","661c9174d82604e93cba1f57","661c9174b4f15ce829da7063","661c9174fb08947321ace56d","661c917464a59782be3cd0f1","661c91741b59672d4a3c0fe8","661c9174cd684a0be15793f2","661c91741fb2a035c97486ed","661c917469a3fc05e2d74b18","661c91746ea308dc91725f4b");
                    itemConfig.blacklist.push("661c9174e913862da0fc47b5","661c91749f5e2db67c0483a1","661c917402e758a43b691cdf","661c91748b413265a90fc7de","661c917464f50e378da92cb1","661c91743bf9da2467ec1058","661c917474f053debac21896","661c91742ca9507ed4f683b1","661c91746bc83d25ea40f719","661c9174f86d29e0b37c51a4","661c9174f80c325a741bd69e","661c917496b2057e3c41dfa8","661c91747fc62a3b0e9584d1","661c917405792ade43cfb861","661c917445a7b1f23d0c8e69","661c9174b82c1e59463d70af","661c9174bce243051fd867a9","661c91740942af6b5e3871dc","661c91746bc572f34ead9810","661c9174037492af1d8eb65c","661c917441b8c2f70dea9653","661c91745c983ed21fb7604a","661c9174fc746a583b91d0e2","661c9174f4b3d70e1a2985c6","661c9174bae34fd619c07582","661c9174da5c873b62041e9f","661c9174c73d928a50f41eb6","661c9174c58f9361e74ba2d0","661c91747f0ca356149e28db","661c9174230dfcea467198b5","661c9174764f1b5cd2038a9e","661c9174c67f9a5ed3402b81","661c9174c906852a31b4de7f","661c9174d3286c45971b0efa","661c9174e5219fd3a0b6c847","661c9174602ac48f3eb5d791","661c9174c1694532f7eba08d","661c9174d0582abcf13496e7","661c917493a71805cdb462fe","661c917435290ab76d8ec14f","661c917498cdf3071be6a245","661c9174d69cf15b47e28a30","661c9174fc63a05bd418279e","661c91741df6598370bca42e","661c91748d0af1c4e6b52973","661c91740ad6fe8b24c51739","661c9174ed5f16829a43cb07","661c917436409c2d18e5afb7","661c9174c5fa0b7d162e9384","661c917452a4e8c6df93170b","661c917420a468d53ecbf971","661c91741ef8a5490b72c3d6","661c9174af49160de2b3c875","661c9174d82604e93cba1f57","661c9174b4f15ce829da7063","661c9174fb08947321ace56d","661c917464a59782be3cd0f1","661c91741b59672d4a3c0fe8","661c9174cd684a0be15793f2","661c91741fb2a035c97486ed","661c917469a3fc05e2d74b18","661c91746ea308dc91725f4b");
                }
            }
        } else {
            if ( MagsOnly === true ) {
                if (typeof blacklistMags === "boolean") {
                    if (blacklistMags === true) {
                        botConfig.equipment.pmc.blacklist[0].equipment.mod_magazine.push("661c9174e913862da0fc47b5","661c91749f5e2db67c0483a1","661c917402e758a43b691cdf","661c91748b413265a90fc7de","661c917464f50e378da92cb1","661c91743bf9da2467ec1058","661c917474f053debac21896","661c91742ca9507ed4f683b1","661c91746bc83d25ea40f719","661c9174f86d29e0b37c51a4","661c9174f80c325a741bd69e","661c917496b2057e3c41dfa8","661c91747fc62a3b0e9584d1","661c917405792ade43cfb861","661c917445a7b1f23d0c8e69","661c9174b82c1e59463d70af","661c9174bce243051fd867a9","661c91740942af6b5e3871dc","661c91746bc572f34ead9810","661c9174037492af1d8eb65c","661c917441b8c2f70dea9653","661c91745c983ed21fb7604a","661c9174fc746a583b91d0e2","661c9174f4b3d70e1a2985c6","661c9174bae34fd619c07582","661c9174da5c873b62041e9f","661c9174c73d928a50f41eb6","661c9174c58f9361e74ba2d0","661c91747f0ca356149e28db","661c9174230dfcea467198b5","661c9174764f1b5cd2038a9e","661c9174c67f9a5ed3402b81","661c9174c906852a31b4de7f","661c9174d3286c45971b0efa","661c9174e5219fd3a0b6c847","661c9174602ac48f3eb5d791","661c9174c1694532f7eba08d","661c9174d0582abcf13496e7","661c917493a71805cdb462fe","661c917435290ab76d8ec14f","661c917498cdf3071be6a245","661c9174d69cf15b47e28a30","661c9174fc63a05bd418279e","661c91741df6598370bca42e","661c91748d0af1c4e6b52973","661c91740ad6fe8b24c51739","661c9174ed5f16829a43cb07","661c917436409c2d18e5afb7","661c9174c5fa0b7d162e9384","661c917452a4e8c6df93170b","661c917420a468d53ecbf971","661c91741ef8a5490b72c3d6","661c9174af49160de2b3c875","661c9174d82604e93cba1f57","661c9174b4f15ce829da7063","661c9174fb08947321ace56d","661c917464a59782be3cd0f1","661c91741b59672d4a3c0fe8","661c9174cd684a0be15793f2","661c91741fb2a035c97486ed","661c917469a3fc05e2d74b18","661c91746ea308dc91725f4b");
                        pmcConfig.vestLoot.blacklist.push("661c9174e913862da0fc47b5","661c91749f5e2db67c0483a1","661c917402e758a43b691cdf","661c91748b413265a90fc7de","661c917464f50e378da92cb1","661c91743bf9da2467ec1058","661c917474f053debac21896","661c91742ca9507ed4f683b1","661c91746bc83d25ea40f719","661c9174f86d29e0b37c51a4","661c9174f80c325a741bd69e","661c917496b2057e3c41dfa8","661c91747fc62a3b0e9584d1","661c917405792ade43cfb861","661c917445a7b1f23d0c8e69","661c9174b82c1e59463d70af","661c9174bce243051fd867a9","661c91740942af6b5e3871dc","661c91746bc572f34ead9810","661c9174037492af1d8eb65c","661c917441b8c2f70dea9653","661c91745c983ed21fb7604a","661c9174fc746a583b91d0e2","661c9174f4b3d70e1a2985c6","661c9174bae34fd619c07582","661c9174da5c873b62041e9f","661c9174c73d928a50f41eb6","661c9174c58f9361e74ba2d0","661c91747f0ca356149e28db","661c9174230dfcea467198b5","661c9174764f1b5cd2038a9e","661c9174c67f9a5ed3402b81","661c9174c906852a31b4de7f","661c9174d3286c45971b0efa","661c9174e5219fd3a0b6c847","661c9174602ac48f3eb5d791","661c9174c1694532f7eba08d","661c9174d0582abcf13496e7","661c917493a71805cdb462fe","661c917435290ab76d8ec14f","661c917498cdf3071be6a245","661c9174d69cf15b47e28a30","661c9174fc63a05bd418279e","661c91741df6598370bca42e","661c91748d0af1c4e6b52973","661c91740ad6fe8b24c51739","661c9174ed5f16829a43cb07","661c917436409c2d18e5afb7","661c9174c5fa0b7d162e9384","661c917452a4e8c6df93170b","661c917420a468d53ecbf971","661c91741ef8a5490b72c3d6","661c9174af49160de2b3c875","661c9174d82604e93cba1f57","661c9174b4f15ce829da7063","661c9174fb08947321ace56d","661c917464a59782be3cd0f1","661c91741b59672d4a3c0fe8","661c9174cd684a0be15793f2","661c91741fb2a035c97486ed","661c917469a3fc05e2d74b18","661c91746ea308dc91725f4b");
                        pmcConfig.pocketLoot.blacklist.push("661c9174e913862da0fc47b5","661c91749f5e2db67c0483a1","661c917402e758a43b691cdf","661c91748b413265a90fc7de","661c917464f50e378da92cb1","661c91743bf9da2467ec1058","661c917474f053debac21896","661c91742ca9507ed4f683b1","661c91746bc83d25ea40f719","661c9174f86d29e0b37c51a4","661c9174f80c325a741bd69e","661c917496b2057e3c41dfa8","661c91747fc62a3b0e9584d1","661c917405792ade43cfb861","661c917445a7b1f23d0c8e69","661c9174b82c1e59463d70af","661c9174bce243051fd867a9","661c91740942af6b5e3871dc","661c91746bc572f34ead9810","661c9174037492af1d8eb65c","661c917441b8c2f70dea9653","661c91745c983ed21fb7604a","661c9174fc746a583b91d0e2","661c9174f4b3d70e1a2985c6","661c9174bae34fd619c07582","661c9174da5c873b62041e9f","661c9174c73d928a50f41eb6","661c9174c58f9361e74ba2d0","661c91747f0ca356149e28db","661c9174230dfcea467198b5","661c9174764f1b5cd2038a9e","661c9174c67f9a5ed3402b81","661c9174c906852a31b4de7f","661c9174d3286c45971b0efa","661c9174e5219fd3a0b6c847","661c9174602ac48f3eb5d791","661c9174c1694532f7eba08d","661c9174d0582abcf13496e7","661c917493a71805cdb462fe","661c917435290ab76d8ec14f","661c917498cdf3071be6a245","661c9174d69cf15b47e28a30","661c9174fc63a05bd418279e","661c91741df6598370bca42e","661c91748d0af1c4e6b52973","661c91740ad6fe8b24c51739","661c9174ed5f16829a43cb07","661c917436409c2d18e5afb7","661c9174c5fa0b7d162e9384","661c917452a4e8c6df93170b","661c917420a468d53ecbf971","661c91741ef8a5490b72c3d6","661c9174af49160de2b3c875","661c9174d82604e93cba1f57","661c9174b4f15ce829da7063","661c9174fb08947321ace56d","661c917464a59782be3cd0f1","661c91741b59672d4a3c0fe8","661c9174cd684a0be15793f2","661c91741fb2a035c97486ed","661c917469a3fc05e2d74b18","661c91746ea308dc91725f4b");
                        pmcConfig.backpackLoot.blacklist.push("661c9174e913862da0fc47b5","661c91749f5e2db67c0483a1","661c917402e758a43b691cdf","661c91748b413265a90fc7de","661c917464f50e378da92cb1","661c91743bf9da2467ec1058","661c917474f053debac21896","661c91742ca9507ed4f683b1","661c91746bc83d25ea40f719","661c9174f86d29e0b37c51a4","661c9174f80c325a741bd69e","661c917496b2057e3c41dfa8","661c91747fc62a3b0e9584d1","661c917405792ade43cfb861","661c917445a7b1f23d0c8e69","661c9174b82c1e59463d70af","661c9174bce243051fd867a9","661c91740942af6b5e3871dc","661c91746bc572f34ead9810","661c9174037492af1d8eb65c","661c917441b8c2f70dea9653","661c91745c983ed21fb7604a","661c9174fc746a583b91d0e2","661c9174f4b3d70e1a2985c6","661c9174bae34fd619c07582","661c9174da5c873b62041e9f","661c9174c73d928a50f41eb6","661c9174c58f9361e74ba2d0","661c91747f0ca356149e28db","661c9174230dfcea467198b5","661c9174764f1b5cd2038a9e","661c9174c67f9a5ed3402b81","661c9174c906852a31b4de7f","661c9174d3286c45971b0efa","661c9174e5219fd3a0b6c847","661c9174602ac48f3eb5d791","661c9174c1694532f7eba08d","661c9174d0582abcf13496e7","661c917493a71805cdb462fe","661c917435290ab76d8ec14f","661c917498cdf3071be6a245","661c9174d69cf15b47e28a30","661c9174fc63a05bd418279e","661c91741df6598370bca42e","661c91748d0af1c4e6b52973","661c91740ad6fe8b24c51739","661c9174ed5f16829a43cb07","661c917436409c2d18e5afb7","661c9174c5fa0b7d162e9384","661c917452a4e8c6df93170b","661c917420a468d53ecbf971","661c91741ef8a5490b72c3d6","661c9174af49160de2b3c875","661c9174d82604e93cba1f57","661c9174b4f15ce829da7063","661c9174fb08947321ace56d","661c917464a59782be3cd0f1","661c91741b59672d4a3c0fe8","661c9174cd684a0be15793f2","661c91741fb2a035c97486ed","661c917469a3fc05e2d74b18","661c91746ea308dc91725f4b");
                        itemConfig.blacklist.push("661c9174e913862da0fc47b5","661c91749f5e2db67c0483a1","661c917402e758a43b691cdf","661c91748b413265a90fc7de","661c917464f50e378da92cb1","661c91743bf9da2467ec1058","661c917474f053debac21896","661c91742ca9507ed4f683b1","661c91746bc83d25ea40f719","661c9174f86d29e0b37c51a4","661c9174f80c325a741bd69e","661c917496b2057e3c41dfa8","661c91747fc62a3b0e9584d1","661c917405792ade43cfb861","661c917445a7b1f23d0c8e69","661c9174b82c1e59463d70af","661c9174bce243051fd867a9","661c91740942af6b5e3871dc","661c91746bc572f34ead9810","661c9174037492af1d8eb65c","661c917441b8c2f70dea9653","661c91745c983ed21fb7604a","661c9174fc746a583b91d0e2","661c9174f4b3d70e1a2985c6","661c9174bae34fd619c07582","661c9174da5c873b62041e9f","661c9174c73d928a50f41eb6","661c9174c58f9361e74ba2d0","661c91747f0ca356149e28db","661c9174230dfcea467198b5","661c9174764f1b5cd2038a9e","661c9174c67f9a5ed3402b81","661c9174c906852a31b4de7f","661c9174d3286c45971b0efa","661c9174e5219fd3a0b6c847","661c9174602ac48f3eb5d791","661c9174c1694532f7eba08d","661c9174d0582abcf13496e7","661c917493a71805cdb462fe","661c917435290ab76d8ec14f","661c917498cdf3071be6a245","661c9174d69cf15b47e28a30","661c9174fc63a05bd418279e","661c91741df6598370bca42e","661c91748d0af1c4e6b52973","661c91740ad6fe8b24c51739","661c9174ed5f16829a43cb07","661c917436409c2d18e5afb7","661c9174c5fa0b7d162e9384","661c917452a4e8c6df93170b","661c917420a468d53ecbf971","661c91741ef8a5490b72c3d6","661c9174af49160de2b3c875","661c9174d82604e93cba1f57","661c9174b4f15ce829da7063","661c9174fb08947321ace56d","661c917464a59782be3cd0f1","661c91741b59672d4a3c0fe8","661c9174cd684a0be15793f2","661c91741fb2a035c97486ed","661c917469a3fc05e2d74b18","661c91746ea308dc91725f4b");
                    }
                }
            }
            if ( RigsOnly === true ) {
                if (typeof blacklistRigs === "boolean") {
                    if (blacklistRigs === true) {
                        pmcConfig.vestLoot.blacklist.push("661c91744502ba91ef63c8d7","661c917426ba940d7138e5cf","661c9174018549befc3a7d62","661c9174d9718c60a32fe5b4","661c9174a371d90e62b8f5c4");
                        pmcConfig.pocketLoot.blacklist.push("661c91744502ba91ef63c8d7","661c917426ba940d7138e5cf","661c9174018549befc3a7d62","661c9174d9718c60a32fe5b4","661c9174a371d90e62b8f5c4");
                        pmcConfig.backpackLoot.blacklist.push("661c91744502ba91ef63c8d7","661c917426ba940d7138e5cf","661c9174018549befc3a7d62","661c9174d9718c60a32fe5b4","661c9174a371d90e62b8f5c4");
                        itemConfig.blacklist.push("661c91744502ba91ef63c8d7","661c917426ba940d7138e5cf","661c9174018549befc3a7d62","661c9174d9718c60a32fe5b4","661c9174a371d90e62b8f5c4");
                    }
                }
            }
            if ( StimsOnly === true ) {
                if (typeof blacklistStims === "boolean") {
                    if (blacklistStims === true) {
                        pmcConfig.vestLoot.blacklist.push("661c91746c391e0f5ba82d47","661c91741ba0f93d4287c5e6","661c91742b5c1493806daf7e","661c9174e9365c70fa18b4d2");
                        pmcConfig.pocketLoot.blacklist.push("661c91746c391e0f5ba82d47","661c91741ba0f93d4287c5e6","661c91742b5c1493806daf7e","661c9174e9365c70fa18b4d2");
                        pmcConfig.backpackLoot.blacklist.push("661c91746c391e0f5ba82d47","661c91741ba0f93d4287c5e6","661c91742b5c1493806daf7e","661c9174e9365c70fa18b4d2");
                        itemConfig.blacklist.push("661c91746c391e0f5ba82d47","661c91741ba0f93d4287c5e6","661c91742b5c1493806daf7e","661c9174e9365c70fa18b4d2");
                    }
                }
            }
        }
    }
}
module.exports = { mod: new Olympus() }