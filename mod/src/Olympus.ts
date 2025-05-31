/**
 * Copyright: AssAssIn
 * Continued By: jbs4bmx
*/

import { ConfigServer } from "@spt/servers/ConfigServer";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { container, DependencyContainer } from "tsyringe";
import { FileSystemSync } from "@spt/utils/FileSystemSync";
import { IBotConfig } from "@spt/models/spt/config/IBotConfig";
import { ICoreConfig } from "@spt/models/spt/config/ICoreConfig";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { IItemConfig } from "@spt/models/spt/config/IItemConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ImporterUtil } from "@spt/utils/ImporterUtil";
import { IPmcConfig } from "@spt/models/spt/config/IPmcConfig";
import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { IPreSptLoadMod } from "@spt/models/external/IPreSptLoadMod";
import { PreSptModLoader } from "@spt/loaders/PreSptModLoader";
import { satisfies } from "semver";
import { jsonc } from "jsonc";
import path from "node:path";

let zeusdb;
const preSptModLoader = container.resolve<PreSptModLoader>("PreSptModLoader");
const databaseImporter = container.resolve<ImporterUtil>("ImporterUtil");
const logger = container.resolve<ILogger>("WinstonLogger");
const configServer = container.resolve<ConfigServer>("ConfigServer");
//const botConfig = configServer.getConfig<IBotConfig>(ConfigTypes.BOT);
const pmcConfig = configServer.getConfig<IPmcConfig>(ConfigTypes.PMC);
const itemConfig = configServer.getConfig<IItemConfig>(ConfigTypes.ITEM);
const sptConfig = configServer.getConfig<ICoreConfig>(ConfigTypes.CORE);
const fileSystem = container.resolve<FileSystemSync>("FileSystemSync");

class Olympus implements IPreSptLoadMod, IPostDBLoadMod
{
    private zeusdb = require("../database/dbItems.json");
    private zeusta = require("../database/therapistAssort.json");
    private zeusja = require("../database/jaegerAssort.json");
    private zeusra = require("../database/ragmanAssort.json");
    private zeusglobals = require("../database/globals.json");
    private privatePath = require('path');
    public modName: string = this.privatePath.basename(this.privatePath.dirname(__dirname.split('/').pop()));

    public preSptLoad(container: DependencyContainer): void
    {
        if (!this.validSptVersion(container)) {
            logger.error("This version of Olympus was not made for your version of SPT. Disabling");
            return;
        }
    }

    public postDBLoad(container: DependencyContainer): void {
        const logger = container.resolve<ILogger>("WinstonLogger");
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const locales = db.locales.global;
        const handbook = db.templates.handbook.Items;
        const fs = container.resolve<FileSystemSync>("FileSystemSync");
        const { FullVersion, MagsOnly, RigsOnly, StimsOnly } = jsonc.parse(fs.read(path.resolve(__dirname, "../config.jsonc")));

        if ( typeof FullVersion !== 'boolean' || typeof MagsOnly !== 'boolean' || typeof RigsOnly !== 'boolean' || typeof StimsOnly !== 'boolean' ) {
            logger.error(`Olympus: One or more version selection values are not a boolean value of true or false.`)
            logger.error(`Please fix your configuration file and restart your server.`)
            return
        }

        if ( FullVersion === true ) {
            // TEMPLATE ITEM ENTRIES
            for (const iItem in this.zeusdb.templatesStims) {
                db.templates.items[iItem] = this.zeusdb.templatesStims[iItem];
            }
            for (const iItem in this.zeusdb.templatesRigs) {
                db.templates.items[iItem] = this.zeusdb.templatesRigs[iItem];
            }
            for (const iItem in this.zeusdb.templatesMags) {
                db.templates.items[iItem] = this.zeusdb.templatesMags[iItem];
            }
            // HANDBOOK ENTRIES
            for (const hItem of this.zeusdb.handbookStims.Items) {
                if (!handbook.find(i=>i.Id == hItem.Id)) {
                    handbook.push(hItem);
                }
            }
            for (const hItem of this.zeusdb.handbookRigs.Items) {
                if (!handbook.find(i=>i.Id == hItem.Id)) {
                    handbook.push(hItem);
                }
            }
            for (const hItem of this.zeusdb.handbookMags.Items) {
                if (!handbook.find(i=>i.Id == hItem.Id)) {
                    handbook.push(hItem);
                }
            }
            // LOCALE ENTRIES
            for (const localeID in locales) {
                for (const locale in this.zeusdb.localesStims.en) {
                    locales[localeID][locale] = this.zeusdb.localesStims.en[locale];
                }
            }
            for (const localeID in locales) {
                for (const locale in this.zeusdb.localesRigs.en) {
                    locales[localeID][locale] = this.zeusdb.localesRigs.en[locale];
                }
            }
            for (const localeID in locales) {
                for (const locale in this.zeusdb.localesMags.en) {
                    locales[localeID][locale] = this.zeusdb.localesMags.en[locale];
                }
            }
            // PRICE ENTRIES
            for (const pItem in this.zeusdb.pricesStims){
                db.templates.prices[pItem] = this.zeusdb.pricesStims[pItem];
            }
            for (const pItem in this.zeusdb.pricesRigs){
                db.templates.prices[pItem] = this.zeusdb.pricesRigs[pItem];
            }
            for (const pItem in this.zeusdb.pricesMags){
                db.templates.prices[pItem] = this.zeusdb.pricesMags[pItem];
            }
            // TRADER ENTRIES
            for (const tradeName in db.traders){
                if ( tradeName === "5ac3b934156ae10c4430e83c" ){
                    for (const riItem of this.zeusra.items){
                        if (!db.traders[tradeName].assort.items.find(i=>i._id == riItem._id)){
                            db.traders[tradeName].assort.items.push(riItem);
                        }
                    }
                    for (const rbItem in this.zeusra.barter_scheme){
                        db.traders[tradeName].assort.barter_scheme[rbItem] = this.zeusra.barter_scheme[rbItem];
                    }
                    for (const rlItem in this.zeusra.loyalty_level_items){
                        db.traders[tradeName].assort.loyal_level_items[rlItem] = this.zeusra.loyalty_level_items[rlItem];
                    }
                }
                if ( tradeName === "5c0647fdd443bc2504c2d371" ){
                    for (const jiItem of this.zeusja.items){
                        if (!db.traders[tradeName].assort.items.find(i=>i._id == jiItem._id)){
                            db.traders[tradeName].assort.items.push(jiItem);
                        }
                    }
                    for (const jbItem in this.zeusja.barter_scheme){
                        db.traders[tradeName].assort.barter_scheme[jbItem] = this.zeusja.barter_scheme[jbItem];
                    }
                    for (const jlItem in this.zeusja.loyalty_level_items){
                        db.traders[tradeName].assort.loyal_level_items[jlItem] = this.zeusja.loyalty_level_items[jlItem];
                    }
                }
                if ( tradeName === "54cb57776803fa99248b456e" ){
                    for (const tiItem of this.zeusta.items){
                        if (!db.traders[tradeName].assort.items.find(i=>i._id == tiItem._id)){
                            db.traders[tradeName].assort.items.push(tiItem);
                        }
                    }
                    for (const tbItem in this.zeusta.barter_scheme){
                        db.traders[tradeName].assort.barter_scheme[tbItem] = this.zeusta.barter_scheme[tbItem];
                    }
                    for (const tlItem in this.zeusta.loyalty_level_items){
                        db.traders[tradeName].assort.loyal_level_items[tlItem] = this.zeusta.loyalty_level_items[tlItem];
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
                for (const iItem in this.zeusdb.templatesMags) {
                    db.templates.items[iItem] = this.zeusdb.templatesMags[iItem];
                }
                // HANDBOOK ENTRIES
                for (const hItem of this.zeusdb.handbookMags.Items) {
                    if (!handbook.find(i=>i.Id == hItem.Id)) {
                        handbook.push(hItem);
                    }
                }
                // LOCALE ENTRIES
                for (const localeID in locales) {
                    for (const locale in this.zeusdb.localesMags.en) {
                        locales[localeID][locale] = this.zeusdb.localesMags.en[locale];
                    }
                }
                // PRICE ENTRIES
                for (const pItem in this.zeusdb.pricesMags){
                    db.templates.prices[pItem] = this.zeusdb.pricesMags[pItem];
                }
                // TRADER ENTRIES
                for (const tradeName in db.traders){
                    if ( tradeName === "5c0647fdd443bc2504c2d371" ){
                        for (const jiItem of this.zeusja.items){
                            if (!db.traders[tradeName].assort.items.find(i=>i._id == jiItem._id)){
                                db.traders[tradeName].assort.items.push(jiItem);
                            }
                        }
                        for (const jbItem in this.zeusja.barter_scheme){
                            db.traders[tradeName].assort.barter_scheme[jbItem] = this.zeusja.barter_scheme[jbItem];
                        }
                        for (const jlItem in this.zeusja.loyalty_level_items){
                            db.traders[tradeName].assort.loyal_level_items[jlItem] = this.zeusja.loyalty_level_items[jlItem];
                        }
                    }
                }
                // Make changes to items loaded into memory
                this.pushMags(container);
            }

            if ( RigsOnly === true ){
                // TEMPLATE ITEM ENTRIES
                for (const iItem in this.zeusdb.templatesRigs) {
                    db.templates.items[iItem] = this.zeusdb.templatesRigs[iItem];
                }
                // HANDBOOK ENTRIES
                for (const hItem of this.zeusdb.handbookRigs.Items) {
                    if (!handbook.find(i=>i.Id == hItem.Id)) {
                        handbook.push(hItem);
                    }
                }
                // LOCALE ENTRIES
                for (const localeID in locales) {
                    for (const locale in this.zeusdb.localesRigs.en) {
                        locales[localeID][locale] = this.zeusdb.localesRigs.en[locale];
                    }
                }
                // PRICE ENTRIES
                for (const pItem in this.zeusdb.pricesRigs){
                    db.templates.prices[pItem] = this.zeusdb.pricesRigs[pItem];
                }
                // TRADER ENTRIES
                for (const tradeName in db.traders){
                    if ( tradeName === "5ac3b934156ae10c4430e83c" ){
                        for (const riItem of this.zeusra.items){
                            if (!db.traders[tradeName].assort.items.find(i=>i._id == riItem._id)){
                                db.traders[tradeName].assort.items.push(riItem);
                            }
                        }
                        for (const rbItem in this.zeusra.barter_scheme){
                            db.traders[tradeName].assort.barter_scheme[rbItem] = this.zeusra.barter_scheme[rbItem];
                        }
                        for (const rlItem in this.zeusra.loyalty_level_items){
                            db.traders[tradeName].assort.loyal_level_items[rlItem] = this.zeusra.loyalty_level_items[rlItem];
                        }
                    }
                }
                // Make changes to items loaded into memory
                this.pushRigs(container);
            }

            if ( StimsOnly === true ){
                // TEMPLATE ITEM ENTRIES
                for (const iItem in this.zeusdb.templatesStims) {
                    db.templates.items[iItem] = this.zeusdb.templatesStims[iItem];
                }
                // HANDBOOK ENTRIES
                for (const hItem of this.zeusdb.handbookStims.Items) {
                    if (!handbook.find(i=>i.Id == hItem.Id)) {
                        handbook.push(hItem);
                    }
                }
                // LOCALE ENTRIES
                for (const localeID in locales) {
                    for (const locale in this.zeusdb.localesStims.en) {
                        locales[localeID][locale] = this.zeusdb.localesStims.en[locale];
                    }
                }
                // PRICE ENTRIES
                for (const pItem in this.zeusdb.pricesStims){
                    db.templates.prices[pItem] = this.zeusdb.pricesStims[pItem];
                }
                // TRADER ENTRIES
                for (const tradeName in db.traders){
                    if ( tradeName === "54cb57776803fa99248b456e" ){
                        for (const tiItem of this.zeusta.items){
                            if (!db.traders[tradeName].assort.items.find(i=>i._id == tiItem._id)){
                                db.traders[tradeName].assort.items.push(tiItem);
                            }
                        }
                        for (const tbItem in this.zeusta.barter_scheme){
                            db.traders[tradeName].assort.barter_scheme[tbItem] = this.zeusta.barter_scheme[tbItem];
                        }
                        for (const tlItem in this.zeusta.loyalty_level_items){
                            db.traders[tradeName].assort.loyal_level_items[tlItem] = this.zeusta.loyalty_level_items[tlItem];
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
                case "57c44b372459772d2b39b8ce":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["57c44b372459772d2b39b8ce"]._props.Slots[i]._props.filters[0].Filter.push("6816beb858769a4d12ebc0f3", "6816beb85184f7c963e2a0db", "6816beb8c4d5eb182a37096f", "6816beb89243a7658de0c1bf");
                        }
                    }
                break;
                case "574d967124597745970e7c94":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["574d967124597745970e7c94"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8031bcf82a967e4d5", "6816beb85901c48273b6efda", "6816beb897a804523f61cdeb", "6816beb865f13dcb89e7a024");
                        }
                    }
                break;
                case "643ea5b23db6f9f57107d9fd":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["643ea5b23db6f9f57107d9fd"]._props.Slots[i]._props.filters[0].Filter.push("6816beb883a4fe692cb01d57", "6816beb8e9f7231c6458da0b");
                        }
                    }
                break;
                case "6410733d5dd49d77bd07847e":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["6410733d5dd49d77bd07847e"]._props.Slots[i]._props.filters[0].Filter.push("6816beb883a4fe692cb01d57", "6816beb8e9f7231c6458da0b");
                        }
                    }
                break;
                case "651450ce0e00edc794068371":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["651450ce0e00edc794068371"]._props.Slots[i]._props.filters[0].Filter.push("6816beb858769a4d12ebc0f3", "6816beb85184f7c963e2a0db", "6816beb8c4d5eb182a37096f", "6816beb89243a7658de0c1bf");
                        }
                    }
                break;
                case "5ac66d015acfc400180ae6e4":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ac66d015acfc400180ae6e4"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8bc162e53d90a87f4", "6816beb8d87c9e2a165b340f", "6816beb8402f7b9ecd3a5618");
                        }
                    }
                break;
                case "587e02ff24597743df3deaeb":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["587e02ff24597743df3deaeb"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8031bcf82a967e4d5", "6816beb85901c48273b6efda", "6816beb897a804523f61cdeb", "6816beb865f13dcb89e7a024");
                        }
                    }
                break;
                case "644674a13d52156624001fbc":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["644674a13d52156624001fbc"]._props.Slots[i]._props.filters[0].Filter.push("6816beb82130bcd49ae6f785");
                        }
                    }
                break;
                case "5c501a4d2e221602b412b540":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5c501a4d2e221602b412b540"]._props.Slots[i]._props.filters[0].Filter.push("6816beb88edf2710b9ca4635", "6816beb8cafed09468532b17");
                        }
                    }
                break;
                case "5bf3e0490db83400196199af":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5bf3e0490db83400196199af"]._props.Slots[i]._props.filters[0].Filter.push("6816beb89bdc423507a6f1e8", "6816beb88a73b5146dcfe290", "6816beb85be0cf897d14236a", "6816beb8e4cbf729a6d80153", "6816beb8db5f9a80316c2e74", "6816beb87f09ce5241d86a3b", "6816beb8120af4deb8c35679", "6816beb8f06a73d98b2e15c4", "6816beb85429ef71b38ac06d", "6816beb8a34b7e209c5f16d8", "6816beb872f94dc06a8b531e", "6816beb8da95831eb6402fc7");
                        }
                    }
                break;
                case "62e7c4fba689e8c9c50dfc38":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["62e7c4fba689e8c9c50dfc38"]._props.Slots[i]._props.filters[0].Filter.push("6816beb82f46ab87e59dc103", "6816beb81f03c7259ea86b4d", "6816beb8acfd83549e1b0267");
                        }
                    }
                break;
                case "645e0c6b3b381ede770e1cc9":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["645e0c6b3b381ede770e1cc9"]._props.Slots[i]._props.filters[0].Filter.push("6816beb82130bcd49ae6f785");
                        }
                    }
                break;
                case "6499849fc93611967b034949":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["6499849fc93611967b034949"]._props.Slots[i]._props.filters[0].Filter.push("6816beb89bdc423507a6f1e8", "6816beb88a73b5146dcfe290", "6816beb85be0cf897d14236a", "6816beb8e4cbf729a6d80153", "6816beb8db5f9a80316c2e74", "6816beb87f09ce5241d86a3b", "6816beb8120af4deb8c35679", "6816beb8f06a73d98b2e15c4", "6816beb85429ef71b38ac06d", "6816beb8a34b7e209c5f16d8", "6816beb872f94dc06a8b531e", "6816beb8da95831eb6402fc7");
                        }
                    }
                break;
                case "5ac66d725acfc43b321d4b60":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ac66d725acfc43b321d4b60"]._props.Slots[i]._props.filters[0].Filter.push("6816beb859d031b824cefa76", "6816beb843df2b6958c0ea71", "6816beb8c29e68501df3a47b", "6816beb8280ec5a63bdf4971", "6816beb80a6425cb198d7ef3", "6816beb8fc419e7a2d8305b6", "6816beb80312f467c9bea8d5", "6816beb883cad594021feb67", "6816beb8d4f6973ea0c28b51", "6816beb846fb8d9a251e37c0", "6816beb826d54eb0f87ca913", "6816beb8a135f724c8d06b9e", "6816beb813b4de9cf28a5706", "6816beb8c62df0a913e758b4", "6816beb86298f4e30d7bca15", "6816beb84b37efd952a0c618", "6816beb806be7c5f8912a4d3");
                        }
                    }
                break;
                case "5a0ec13bfcdbcb00165aa685":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5a0ec13bfcdbcb00165aa685"]._props.Slots[i]._props.filters[0].Filter.push("6816beb859d031b824cefa76", "6816beb843df2b6958c0ea71", "6816beb8c29e68501df3a47b", "6816beb8280ec5a63bdf4971", "6816beb80a6425cb198d7ef3", "6816beb8fc419e7a2d8305b6", "6816beb80312f467c9bea8d5", "6816beb883cad594021feb67", "6816beb8d4f6973ea0c28b51", "6816beb846fb8d9a251e37c0", "6816beb826d54eb0f87ca913", "6816beb8a135f724c8d06b9e", "6816beb813b4de9cf28a5706", "6816beb8c62df0a913e758b4", "6816beb86298f4e30d7bca15", "6816beb84b37efd952a0c618", "6816beb806be7c5f8912a4d3");
                        }
                    }
                break;
                case "5ac66cb05acfc40198510a10":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ac66cb05acfc40198510a10"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8bc162e53d90a87f4", "6816beb8d87c9e2a165b340f", "6816beb8402f7b9ecd3a5618");
                        }
                    }
                break;
                case "59ff346386f77477562ff5e2":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["59ff346386f77477562ff5e2"]._props.Slots[i]._props.filters[0].Filter.push("6816beb859d031b824cefa76", "6816beb843df2b6958c0ea71", "6816beb8c29e68501df3a47b", "6816beb8280ec5a63bdf4971", "6816beb80a6425cb198d7ef3", "6816beb8fc419e7a2d8305b6", "6816beb80312f467c9bea8d5", "6816beb883cad594021feb67", "6816beb8d4f6973ea0c28b51", "6816beb846fb8d9a251e37c0", "6816beb826d54eb0f87ca913", "6816beb8a135f724c8d06b9e", "6816beb813b4de9cf28a5706", "6816beb8c62df0a913e758b4", "6816beb86298f4e30d7bca15", "6816beb84b37efd952a0c618", "6816beb806be7c5f8912a4d3");
                        }
                    }
                break;
                case "5ab8e9fcd8ce870019439434":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ab8e9fcd8ce870019439434"]._props.Slots[i]._props.filters[0].Filter.push("6816beb89bdc423507a6f1e8", "6816beb88a73b5146dcfe290", "6816beb85be0cf897d14236a", "6816beb8e4cbf729a6d80153", "6816beb8db5f9a80316c2e74", "6816beb87f09ce5241d86a3b", "6816beb8120af4deb8c35679", "6816beb8f06a73d98b2e15c4", "6816beb85429ef71b38ac06d", "6816beb8a34b7e209c5f16d8", "6816beb872f94dc06a8b531e", "6816beb8da95831eb6402fc7");
                        }
                    }
                break;
                case "628b9c37a733087d0d7fe84b":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["628b9c37a733087d0d7fe84b"]._props.Slots[i]._props.filters[0].Filter.push("6816beb89bdc423507a6f1e8", "6816beb88a73b5146dcfe290", "6816beb85be0cf897d14236a", "6816beb8e4cbf729a6d80153", "6816beb8db5f9a80316c2e74", "6816beb87f09ce5241d86a3b", "6816beb8120af4deb8c35679", "6816beb8f06a73d98b2e15c4", "6816beb85429ef71b38ac06d", "6816beb8a34b7e209c5f16d8", "6816beb872f94dc06a8b531e", "6816beb8da95831eb6402fc7");
                        }
                    }
                break;
                case "5c488a752e221602b412af63":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5c488a752e221602b412af63"]._props.Slots[i]._props.filters[0].Filter.push("6816beb871b09465ad3efc82", "6816beb8523efd4c0976b81a", "6816beb81bf95adc2436780e", "6816beb80e645fb792a183dc", "6816beb8d7b63ce01482af59", "6816beb85fc376e9b012da48", "6816beb81d68a3cb0247f9e5", "6816beb851e6280ad379c4fb", "6816beb841be398af5270d6c", "6816beb8e914af7d836b502c", "6816beb8fa94701c6b382e5d", "6816beb89b6207f4c1a38d5e", "6816beb89b7e63d2c84f01a5", "6816beb876d9cb015a2f8e43", "6816beb88e9b537f4da16c02", "6816beb8ae69d485c271f3b0", "6816beb839dcf8e6420b7a15", "6816beb818f4269d5cea30b7");
                        }
                    }
                break;
                case "5644bd2b4bdc2d3b4c8b4572":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5644bd2b4bdc2d3b4c8b4572"]._props.Slots[i]._props.filters[0].Filter.push("6816beb89bdc423507a6f1e8", "6816beb88a73b5146dcfe290", "6816beb85be0cf897d14236a", "6816beb8e4cbf729a6d80153", "6816beb8db5f9a80316c2e74", "6816beb87f09ce5241d86a3b", "6816beb8120af4deb8c35679", "6816beb8f06a73d98b2e15c4", "6816beb85429ef71b38ac06d", "6816beb8a34b7e209c5f16d8", "6816beb872f94dc06a8b531e", "6816beb8da95831eb6402fc7");
                        }
                    }
                break;
                case "6183afd850224f204c1da514":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["6183afd850224f204c1da514"]._props.Slots[i]._props.filters[0].Filter.push("6816beb860d84b357e2cf9a1", "6816beb8fa4b3857d261e9c0");
                        }
                    }
                break;
                case "57dc2fa62459775949412633":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["57dc2fa62459775949412633"]._props.Slots[i]._props.filters[0].Filter.push("6816beb89bdc423507a6f1e8", "6816beb88a73b5146dcfe290", "6816beb85be0cf897d14236a", "6816beb8e4cbf729a6d80153", "6816beb8db5f9a80316c2e74", "6816beb87f09ce5241d86a3b", "6816beb8120af4deb8c35679", "6816beb8f06a73d98b2e15c4", "6816beb85429ef71b38ac06d", "6816beb8a34b7e209c5f16d8", "6816beb872f94dc06a8b531e", "6816beb8da95831eb6402fc7");
                        }
                    }
                break;
                case "59d6088586f774275f37482f":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["59d6088586f774275f37482f"]._props.Slots[i]._props.filters[0].Filter.push("6816beb859d031b824cefa76", "6816beb843df2b6958c0ea71", "6816beb8c29e68501df3a47b", "6816beb8280ec5a63bdf4971", "6816beb80a6425cb198d7ef3", "6816beb8fc419e7a2d8305b6", "6816beb80312f467c9bea8d5", "6816beb883cad594021feb67", "6816beb8d4f6973ea0c28b51", "6816beb846fb8d9a251e37c0", "6816beb826d54eb0f87ca913", "6816beb8a135f724c8d06b9e", "6816beb813b4de9cf28a5706", "6816beb8c62df0a913e758b4", "6816beb86298f4e30d7bca15", "6816beb84b37efd952a0c618", "6816beb806be7c5f8912a4d3");
                        }
                    }
                break;
                case "5dcbd56fdbd3d91b3e5468d5":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5dcbd56fdbd3d91b3e5468d5"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8f40573ad968be2c1", "6816beb87eb49f18a563dc20", "6816beb88a739c12045bedf6", "6816beb84175a83fc9d2be06", "6816beb8a384dc16bf97052e", "6816beb8ca246579d031b8ef");
                        }
                    }
                break;
                case "5ac66d2e5acfc43b321d4b53":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ac66d2e5acfc43b321d4b53"]._props.Slots[i]._props.filters[0].Filter.push("6816beb859d031b824cefa76", "6816beb843df2b6958c0ea71", "6816beb8c29e68501df3a47b", "6816beb8280ec5a63bdf4971", "6816beb80a6425cb198d7ef3", "6816beb8fc419e7a2d8305b6", "6816beb80312f467c9bea8d5", "6816beb883cad594021feb67", "6816beb8d4f6973ea0c28b51", "6816beb846fb8d9a251e37c0", "6816beb826d54eb0f87ca913", "6816beb8a135f724c8d06b9e", "6816beb813b4de9cf28a5706", "6816beb8c62df0a913e758b4", "6816beb86298f4e30d7bca15", "6816beb84b37efd952a0c618", "6816beb806be7c5f8912a4d3");
                        }
                    }
                break;
                case "5bb2475ed4351e00853264e3":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5bb2475ed4351e00853264e3"]._props.Slots[i]._props.filters[0].Filter.push("6816beb871b09465ad3efc82", "6816beb8523efd4c0976b81a", "6816beb81bf95adc2436780e", "6816beb80e645fb792a183dc", "6816beb8d7b63ce01482af59", "6816beb85fc376e9b012da48", "6816beb81d68a3cb0247f9e5", "6816beb851e6280ad379c4fb", "6816beb841be398af5270d6c", "6816beb8e914af7d836b502c", "6816beb8fa94701c6b382e5d", "6816beb89b6207f4c1a38d5e", "6816beb89b7e63d2c84f01a5", "6816beb876d9cb015a2f8e43", "6816beb88e9b537f4da16c02", "6816beb8ae69d485c271f3b0", "6816beb839dcf8e6420b7a15", "6816beb818f4269d5cea30b7", "6816beb89aef4b352c8701d6");
                        }
                    }
                break;
                case "5ac66d9b5acfc4001633997a":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ac66d9b5acfc4001633997a"]._props.Slots[i]._props.filters[0].Filter.push("6816beb89bdc423507a6f1e8", "6816beb88a73b5146dcfe290", "6816beb85be0cf897d14236a", "6816beb8e4cbf729a6d80153", "6816beb8db5f9a80316c2e74", "6816beb87f09ce5241d86a3b", "6816beb8120af4deb8c35679", "6816beb8f06a73d98b2e15c4", "6816beb85429ef71b38ac06d", "6816beb8a34b7e209c5f16d8", "6816beb872f94dc06a8b531e", "6816beb8da95831eb6402fc7");
                        }
                    }
                break;
                case "65290f395ae2ae97b80fdf2d":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["65290f395ae2ae97b80fdf2d"]._props.Slots[i]._props.filters[0].Filter.push("6816beb84175a83fc9d2be06", "6816beb8a384dc16bf97052e", "6816beb88a739c12045bedf6", "6816beb87eb49f18a563dc20", "6816beb8f40573ad968be2c1", "6816beb8ca246579d031b8ef");
                        }
                    }
                break;
                case "628b5638ad252a16da6dd245":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["628b5638ad252a16da6dd245"]._props.Slots[i]._props.filters[0].Filter.push("6816beb89bdc423507a6f1e8", "6816beb88a73b5146dcfe290", "6816beb85be0cf897d14236a", "6816beb8e4cbf729a6d80153", "6816beb8db5f9a80316c2e74", "6816beb87f09ce5241d86a3b", "6816beb8120af4deb8c35679", "6816beb8f06a73d98b2e15c4", "6816beb85429ef71b38ac06d", "6816beb8a34b7e209c5f16d8", "6816beb872f94dc06a8b531e", "6816beb8da95831eb6402fc7");
                        }
                    }
                break;
                case "5447a9cd4bdc2dbd208b4567":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5447a9cd4bdc2dbd208b4567"]._props.Slots[i]._props.filters[0].Filter.push("6816beb871b09465ad3efc82", "6816beb8523efd4c0976b81a", "6816beb81bf95adc2436780e", "6816beb80e645fb792a183dc", "6816beb8d7b63ce01482af59", "6816beb85fc376e9b012da48", "6816beb81d68a3cb0247f9e5", "6816beb851e6280ad379c4fb", "6816beb841be398af5270d6c", "6816beb8e914af7d836b502c", "6816beb8fa94701c6b382e5d", "6816beb89b6207f4c1a38d5e", "6816beb89b7e63d2c84f01a5", "6816beb876d9cb015a2f8e43", "6816beb88e9b537f4da16c02", "6816beb8ae69d485c271f3b0", "6816beb839dcf8e6420b7a15", "6816beb818f4269d5cea30b7", "6816beb89aef4b352c8701d6");
                        }
                    }
                break;
                case "5cadfbf7ae92152ac412eeef":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5cadfbf7ae92152ac412eeef"]._props.Slots[i]._props.filters[0].Filter.push("6816beb870ba8d62fe4c3591", "6816beb812a48ef976dc053b");
                        }
                    }
                break;
                case "5ac4cd105acfc40016339859":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ac4cd105acfc40016339859"]._props.Slots[i]._props.filters[0].Filter.push("6816beb89bdc423507a6f1e8", "6816beb88a73b5146dcfe290", "6816beb85be0cf897d14236a", "6816beb8e4cbf729a6d80153", "6816beb8db5f9a80316c2e74", "6816beb87f09ce5241d86a3b", "6816beb8120af4deb8c35679", "6816beb8f06a73d98b2e15c4", "6816beb85429ef71b38ac06d", "6816beb8a34b7e209c5f16d8", "6816beb872f94dc06a8b531e", "6816beb8da95831eb6402fc7");
                        }
                    }
                break;
                case "5b0bbe4e5acfc40dc528a72d":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5b0bbe4e5acfc40dc528a72d"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8652c3b87ed4109fa", "6816beb80ab85c36ef42719d", "6816beb8987bf6435ecda210", "6816beb842fb156987dc0e3a", "6816beb8241f0c6897bd35ea", "6816beb84c6872b1d39e0f5a");
                        }
                    }
                break;
                case "623063e994fc3f7b302a9696":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["623063e994fc3f7b302a9696"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8a5dc819e0b7f4236", "6816beb871b09465ad3efc82", "6816beb80e645fb792a183dc", "6816beb8d7b63ce01482af59", "6816beb85fc376e9b012da48", "6816beb81d68a3cb0247f9e5", "6816beb851e6280ad379c4fb", "6816beb841be398af5270d6c", "6816beb8e914af7d836b502c", "6816beb8fa94701c6b382e5d", "6816beb89b6207f4c1a38d5e", "6816beb89b7e63d2c84f01a5", "6816beb876d9cb015a2f8e43", "6816beb88e9b537f4da16c02", "6816beb8ae69d485c271f3b0", "6816beb839dcf8e6420b7a15", "6816beb818f4269d5cea30b7");
                        }
                    }
                break;
                case "5c07c60e0db834002330051f":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5c07c60e0db834002330051f"]._props.Slots[i]._props.filters[0].Filter.push("6816beb871b09465ad3efc82", "6816beb8523efd4c0976b81a", "6816beb81bf95adc2436780e", "6816beb80e645fb792a183dc", "6816beb8d7b63ce01482af59", "6816beb85fc376e9b012da48", "6816beb81d68a3cb0247f9e5", "6816beb851e6280ad379c4fb", "6816beb841be398af5270d6c", "6816beb8e914af7d836b502c", "6816beb8fa94701c6b382e5d", "6816beb89b6207f4c1a38d5e", "6816beb89b7e63d2c84f01a5", "6816beb876d9cb015a2f8e43", "6816beb88e9b537f4da16c02", "6816beb8ae69d485c271f3b0", "6816beb839dcf8e6420b7a15", "6816beb818f4269d5cea30b7", "6816beb89aef4b352c8701d6");
                        }
                    }
                break;
                case "5839a40f24597726f856b511":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5839a40f24597726f856b511"]._props.Slots[i]._props.filters[0].Filter.push("6816beb89bdc423507a6f1e8", "6816beb88a73b5146dcfe290", "6816beb85be0cf897d14236a", "6816beb8e4cbf729a6d80153", "6816beb8db5f9a80316c2e74", "6816beb87f09ce5241d86a3b", "6816beb8120af4deb8c35679", "6816beb8f06a73d98b2e15c4", "6816beb85429ef71b38ac06d", "6816beb8a34b7e209c5f16d8", "6816beb872f94dc06a8b531e", "6816beb8da95831eb6402fc7");
                        }
                    }
                break;
                case "5abcbc27d8ce8700182eceeb":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5abcbc27d8ce8700182eceeb"]._props.Slots[i]._props.filters[0].Filter.push("6816beb859d031b824cefa76", "6816beb843df2b6958c0ea71", "6816beb8c29e68501df3a47b", "6816beb8280ec5a63bdf4971", "6816beb80a6425cb198d7ef3", "6816beb8fc419e7a2d8305b6", "6816beb80312f467c9bea8d5", "6816beb883cad594021feb67", "6816beb8d4f6973ea0c28b51", "6816beb846fb8d9a251e37c0", "6816beb826d54eb0f87ca913", "6816beb8a135f724c8d06b9e", "6816beb813b4de9cf28a5706", "6816beb8c62df0a913e758b4", "6816beb86298f4e30d7bca15", "6816beb84b37efd952a0c618", "6816beb806be7c5f8912a4d3");
                        }
                    }
                break;
                case "6165ac306ef05c2ce828ef74":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["6165ac306ef05c2ce828ef74"]._props.Slots[i]._props.filters[0].Filter.push("6816beb860d84b357e2cf9a1", "6816beb8fa4b3857d261e9c0");
                        }
                    }
                break;
                case "6184055050224f204c1da540":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["6184055050224f204c1da540"]._props.Slots[i]._props.filters[0].Filter.push("6816beb871b09465ad3efc82", "6816beb8523efd4c0976b81a", "6816beb81bf95adc2436780e", "6816beb80e645fb792a183dc", "6816beb8d7b63ce01482af59", "6816beb85fc376e9b012da48", "6816beb81d68a3cb0247f9e5", "6816beb851e6280ad379c4fb", "6816beb841be398af5270d6c", "6816beb8e914af7d836b502c", "6816beb8fa94701c6b382e5d", "6816beb89b6207f4c1a38d5e", "6816beb89b7e63d2c84f01a5", "6816beb876d9cb015a2f8e43", "6816beb88e9b537f4da16c02", "6816beb8ae69d485c271f3b0", "6816beb839dcf8e6420b7a15", "6816beb818f4269d5cea30b7", "6816beb89aef4b352c8701d6");
                        }
                    }
                break;
                case "5bf3e03b0db834001d2c4a9c":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5bf3e03b0db834001d2c4a9c"]._props.Slots[i]._props.filters[0].Filter.push("6816beb89bdc423507a6f1e8", "6816beb88a73b5146dcfe290", "6816beb85be0cf897d14236a", "6816beb8e4cbf729a6d80153", "6816beb8db5f9a80316c2e74", "6816beb87f09ce5241d86a3b", "6816beb8120af4deb8c35679", "6816beb8f06a73d98b2e15c4", "6816beb85429ef71b38ac06d", "6816beb8a34b7e209c5f16d8", "6816beb872f94dc06a8b531e", "6816beb8da95831eb6402fc7");
                        }
                    }
                break;
                case "583990e32459771419544dd2":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["583990e32459771419544dd2"]._props.Slots[i]._props.filters[0].Filter.push("6816beb89bdc423507a6f1e8", "6816beb88a73b5146dcfe290", "6816beb85be0cf897d14236a", "6816beb8e4cbf729a6d80153", "6816beb8db5f9a80316c2e74", "6816beb87f09ce5241d86a3b", "6816beb8120af4deb8c35679", "6816beb8f06a73d98b2e15c4", "6816beb85429ef71b38ac06d", "6816beb8a34b7e209c5f16d8", "6816beb872f94dc06a8b531e", "6816beb8da95831eb6402fc7");
                        }
                    }
                break;
                case "618428466ef05c2ce828f218":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["618428466ef05c2ce828f218"]._props.Slots[i]._props.filters[0].Filter.push("6816beb871b09465ad3efc82", "6816beb8523efd4c0976b81a", "6816beb81bf95adc2436780e", "6816beb80e645fb792a183dc", "6816beb8d7b63ce01482af59", "6816beb85fc376e9b012da48", "6816beb81d68a3cb0247f9e5", "6816beb851e6280ad379c4fb", "6816beb841be398af5270d6c", "6816beb8e914af7d836b502c", "6816beb8fa94701c6b382e5d", "6816beb89b6207f4c1a38d5e", "6816beb89b7e63d2c84f01a5", "6816beb876d9cb015a2f8e43", "6816beb88e9b537f4da16c02", "6816beb8ae69d485c271f3b0", "6816beb839dcf8e6420b7a15", "6816beb818f4269d5cea30b7", "6816beb89aef4b352c8701d6");
                        }
                    }
                break;
                case "5beed0f50db834001c062b12":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5beed0f50db834001c062b12"]._props.Slots[i]._props.filters[0].Filter.push("6816beb89bdc423507a6f1e8", "6816beb88a73b5146dcfe290", "6816beb85be0cf897d14236a", "6816beb8e4cbf729a6d80153", "6816beb8db5f9a80316c2e74", "6816beb87f09ce5241d86a3b", "6816beb8120af4deb8c35679", "6816beb8f06a73d98b2e15c4", "6816beb85429ef71b38ac06d", "6816beb8a34b7e209c5f16d8", "6816beb8da95831eb6402fc7", "6816beb872f94dc06a8b531e");
                        }
                    }
                break;
                case "661cec09b2c6356b4d0c7a36":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["661cec09b2c6356b4d0c7a36"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8f54e63a79dc1208b");
                        }
                    }
                break;
                case "5d43021ca4b9362eab4b5e25":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5d43021ca4b9362eab4b5e25"]._props.Slots[i]._props.filters[0].Filter.push("6816beb871b09465ad3efc82", "6816beb8523efd4c0976b81a", "6816beb81bf95adc2436780e", "6816beb80e645fb792a183dc", "6816beb8d7b63ce01482af59", "6816beb85fc376e9b012da48", "6816beb81d68a3cb0247f9e5", "6816beb851e6280ad379c4fb", "6816beb841be398af5270d6c", "6816beb8e914af7d836b502c", "6816beb8fa94701c6b382e5d", "6816beb89b6207f4c1a38d5e", "6816beb89b7e63d2c84f01a5", "6816beb876d9cb015a2f8e43", "6816beb88e9b537f4da16c02", "6816beb8ae69d485c271f3b0", "6816beb839dcf8e6420b7a15", "6816beb818f4269d5cea30b7", "6816beb89aef4b352c8701d6");
                        }
                    }
                break;
                case "674d6121c09f69dfb201a888":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["674d6121c09f69dfb201a888"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8bc162e53d90a87f4", "6816beb8d87c9e2a165b340f", "6816beb8402f7b9ecd3a5618");
                        }
                    }
                break;
                case "5fbcc1d9016cce60e8341ab3":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5fbcc1d9016cce60e8341ab3"]._props.Slots[i]._props.filters[0].Filter.push("6816beb871b09465ad3efc82", "6816beb8523efd4c0976b81a", "6816beb81bf95adc2436780e", "6816beb80e645fb792a183dc", "6816beb8d7b63ce01482af59", "6816beb85fc376e9b012da48", "6816beb81d68a3cb0247f9e5", "6816beb851e6280ad379c4fb", "6816beb841be398af5270d6c", "6816beb8e914af7d836b502c", "6816beb8fa94701c6b382e5d", "6816beb89b6207f4c1a38d5e", "6816beb89b7e63d2c84f01a5", "6816beb876d9cb015a2f8e43", "6816beb88e9b537f4da16c02", "6816beb8ae69d485c271f3b0", "6816beb839dcf8e6420b7a15", "6816beb818f4269d5cea30b7", "6816beb89aef4b352c8701d6");
                        }
                    }
                break;
                case "606587252535c57a13424cfd":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["606587252535c57a13424cfd"]._props.Slots[i]._props.filters[0].Filter.push("6816beb859d031b824cefa76", "6816beb843df2b6958c0ea71", "6816beb8c29e68501df3a47b", "6816beb8280ec5a63bdf4971", "6816beb80a6425cb198d7ef3", "6816beb8fc419e7a2d8305b6", "6816beb80312f467c9bea8d5", "6816beb883cad594021feb67", "6816beb8d4f6973ea0c28b51", "6816beb846fb8d9a251e37c0", "6816beb826d54eb0f87ca913", "6816beb8a135f724c8d06b9e", "6816beb813b4de9cf28a5706", "6816beb8c62df0a913e758b4", "6816beb84b37efd952a0c618", "6816beb806be7c5f8912a4d3");
                        }
                    }
                break;
                case "628a60ae6b1d481ff772e9c8":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["628a60ae6b1d481ff772e9c8"]._props.Slots[i]._props.filters[0].Filter.push("6816beb859d031b824cefa76", "6816beb84b37efd952a0c618", "6816beb843df2b6958c0ea71", "6816beb8c29e68501df3a47b", "6816beb8280ec5a63bdf4971", "6816beb80a6425cb198d7ef3", "6816beb8fc419e7a2d8305b6", "6816beb80312f467c9bea8d5", "6816beb883cad594021feb67", "6816beb8d4f6973ea0c28b51", "6816beb846fb8d9a251e37c0", "6816beb826d54eb0f87ca913", "6816beb8a135f724c8d06b9e", "6816beb813b4de9cf28a5706", "6816beb8c62df0a913e758b4", "6816beb86298f4e30d7bca15", "6816beb806be7c5f8912a4d3");
                        }
                    }
                break;
                case "63171672192e68c5460cebc5":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["63171672192e68c5460cebc5"]._props.Slots[i]._props.filters[0].Filter.push("6816beb82f46ab87e59dc103", "6816beb81f03c7259ea86b4d", "6816beb8acfd83549e1b0267");
                        }
                    }
                break;
                case "59e6152586f77473dc057aa1":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["59e6152586f77473dc057aa1"]._props.Slots[i]._props.filters[0].Filter.push("6816beb859d031b824cefa76", "6816beb843df2b6958c0ea71", "6816beb8c29e68501df3a47b", "6816beb8280ec5a63bdf4971", "6816beb80a6425cb198d7ef3", "6816beb8fc419e7a2d8305b6", "6816beb80312f467c9bea8d5", "6816beb883cad594021feb67", "6816beb8d4f6973ea0c28b51", "6816beb846fb8d9a251e37c0", "6816beb826d54eb0f87ca913", "6816beb8a135f724c8d06b9e", "6816beb813b4de9cf28a5706", "6816beb8c62df0a913e758b4", "6816beb86298f4e30d7bca15", "6816beb84b37efd952a0c618", "6816beb806be7c5f8912a4d3");
                        }
                    }
                break;
                case "6718817435e3cfd9550d2c27":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["6718817435e3cfd9550d2c27"]._props.Slots[i]._props.filters[0].Filter.push("6816beb82f46ab87e59dc103", "6816beb81f03c7259ea86b4d", "6816beb8acfd83549e1b0267");
                        }
                    }
                break;
                case "64637076203536ad5600c990":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["64637076203536ad5600c990"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8f0d74286ba1395ec");
                        }
                    }
                break;
                case "661ceb1b9311543c7104149b":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["661ceb1b9311543c7104149b"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8f54e63a79dc1208b");
                        }
                    }
                break;
                case "64ca3d3954fc657e230529cc":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["64ca3d3954fc657e230529cc"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8f0d74286ba1395ec");
                        }
                    }
                break;
                case "676176d362e0497044079f4c":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["676176d362e0497044079f4c"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8f40573ad968be2c1", "6816beb87eb49f18a563dc20", "6816beb84175a83fc9d2be06", "6816beb8a384dc16bf97052e", "6816beb88a739c12045bedf6", "6816beb8ca246579d031b8ef");
                        }
                    }
                break;
                case "657857faeff4c850222dff1b":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["657857faeff4c850222dff1b"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8e2698bca754f10d3");
                        }
                    }
                break;
                case "59e6687d86f77411d949b251":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["59e6687d86f77411d949b251"]._props.Slots[i]._props.filters[0].Filter.push("6816beb859d031b824cefa76", "6816beb843df2b6958c0ea71", "6816beb8c29e68501df3a47b", "6816beb8280ec5a63bdf4971", "6816beb80a6425cb198d7ef3", "6816beb8fc419e7a2d8305b6", "6816beb80312f467c9bea8d5", "6816beb883cad594021feb67", "6816beb8d4f6973ea0c28b51", "6816beb846fb8d9a251e37c0", "6816beb826d54eb0f87ca913", "6816beb8a135f724c8d06b9e", "6816beb813b4de9cf28a5706", "6816beb8c62df0a913e758b4", "6816beb86298f4e30d7bca15", "6816beb84b37efd952a0c618", "6816beb806be7c5f8912a4d3");
                        }
                    }
                break;
                case "6513ef33e06849f06c0957ca":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["6513ef33e06849f06c0957ca"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8408b372af95de61c");
                        }
                    }
                break;
                case "65fb023261d5829b2d090755":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["65fb023261d5829b2d090755"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8f54e63a79dc1208b");
                        }
                    }
                break;
                case "65268d8ecb944ff1e90ea385":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["65268d8ecb944ff1e90ea385"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8408b372af95de61c");
                        }
                    }
                break;
                case "5f2a9575926fd9352339381f":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5f2a9575926fd9352339381f"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8652c3b87ed4109fa", "6816beb80ab85c36ef42719d", "6816beb8987bf6435ecda210", "6816beb842fb156987dc0e3a", "6816beb8241f0c6897bd35ea");
                        }
                    }
                break;
                case "669fa39b48fc9f8db6035a0c":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["669fa39b48fc9f8db6035a0c"]._props.Slots[i]._props.filters[0].Filter.push("6816beb89d652f7b048ce3a1");
                        }
                    }
                break;
                case "5a367e5dc4a282000e49738f":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5a367e5dc4a282000e49738f"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8f40573ad968be2c1", "6816beb87eb49f18a563dc20", "6816beb88a739c12045bedf6", "6816beb84175a83fc9d2be06", "6816beb8a384dc16bf97052e", "6816beb8ca246579d031b8ef");
                        }
                    }
                break;
                case "5b1fa9b25acfc40018633c01":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5b1fa9b25acfc40018633c01"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8076854e1afb3d92c", "6816beb8810fd9ecb375a246", "6816beb815034f78ed6c92ba", "6816beb88dacf09765b14e32", "6816beb8463cf8b72e1590da", "6816beb8bc5eadf360942178", "6816beb8b785e2314c9fa6d0");
                        }
                    }
                break;
                case "669fa3d876116c89840b1217":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["669fa3d876116c89840b1217"]._props.Slots[i]._props.filters[0].Filter.push("6816beb89d652f7b048ce3a1");
                        }
                    }
                break;
                case "5fc22d7c187fea44d52eda44":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5fc22d7c187fea44d52eda44"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8580e4c96b21f3a7d");
                        }
                    }
                break;
                case "6176aca650224f204c1da3fb":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["6176aca650224f204c1da3fb"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8570a8df6c19eb324", "6816beb8fbe7045a39126c8d");
                        }
                    }
                break;
                case "5e81c3cbac2bb513793cdc75":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5e81c3cbac2bb513793cdc75"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8cf803bde529a1467", "6816beb848ed75c1f30a629b", "6816beb8a6934f87d0b51e2c");
                        }
                    }
                break;
                case "57838ad32459774a17445cd2":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["57838ad32459774a17445cd2"]._props.Slots[i]._props.filters[0].Filter.push("6816beb858769a4d12ebc0f3", "6816beb85184f7c963e2a0db", "6816beb8c4d5eb182a37096f", "6816beb89243a7658de0c1bf");
                        }
                    }
                break;
                case "5c46fbd72e2216398b5a8c9c":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5c46fbd72e2216398b5a8c9c"]._props.Slots[i]._props.filters[0].Filter.push("6816beb86958dc74201ebf3a", "6816beb85fa760b1d93248ec");
                        }
                    }
                break;
                case "5aafa857e5b5b00018480968":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5aafa857e5b5b00018480968"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8194826f7e5d0c3ba", "6816beb8b29f051ac8ed4763", "6816beb8c5d2a6739e48f01b", "6816beb8fa971d864e5b0c23");
                        }
                    }
                break;
                case "5df8ce05b11454561e39243b":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5df8ce05b11454561e39243b"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8f40573ad968be2c1", "6816beb87eb49f18a563dc20", "6816beb88a739c12045bedf6", "6816beb84175a83fc9d2be06", "6816beb8a384dc16bf97052e", "6816beb8ca246579d031b8ef");
                        }
                    }
                break;
                case "669fa3f88abd2662d80eee77":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["669fa3f88abd2662d80eee77"]._props.Slots[i]._props.filters[0].Filter.push("6816beb89d652f7b048ce3a1");
                        }
                    }
                break;
                case "56e0598dd2720bb5668b45a6":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["56e0598dd2720bb5668b45a6"]._props.Slots[i]._props.filters[0].Filter.push("6816beb870415fac2be3689d", "6816beb8c80f9b6a5d347e12");
                        }
                    }
                break;
                case "5a7ae0c351dfba0017554310":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5a7ae0c351dfba0017554310"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8076854e1afb3d92c", "6816beb8810fd9ecb375a246", "6816beb815034f78ed6c92ba", "6816beb88dacf09765b14e32", "6816beb8463cf8b72e1590da", "6816beb8bc5eadf360942178", "6816beb8b785e2314c9fa6d0");
                        }
                    }
                break;
                case "602a9740da11d6478d5a06dc":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["602a9740da11d6478d5a06dc"]._props.Slots[i]._props.filters[0].Filter.push("6816beb806c372a491ebd85f");
                        }
                    }
                break;
                case "63088377b5cd696784087147":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["63088377b5cd696784087147"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8076854e1afb3d92c", "6816beb8810fd9ecb375a246", "6816beb815034f78ed6c92ba", "6816beb88dacf09765b14e32", "6816beb8463cf8b72e1590da", "6816beb8bc5eadf360942178", "6816beb8b785e2314c9fa6d0", "6816beb8b785e2314cefefdd");
                        }
                    }
                break;
                case "5d67abc1a4b93614ec50137f":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5d67abc1a4b93614ec50137f"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8a2fe41957bd683c0");
                        }
                    }
                break;
                case "579204f224597773d619e051":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["579204f224597773d619e051"]._props.Slots[i]._props.filters[0].Filter.push("6816beb870415fac2be3689d", "6816beb8c80f9b6a5d347e12", "6816beb8b37502ca6fe81d49");
                        }
                    }
                break;
                case "576a581d2459771e7b1bc4f1":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["576a581d2459771e7b1bc4f1"]._props.Slots[i]._props.filters[0].Filter.push("6816beb83426dcf15a780b9e", "6816beb82dac93e574f1b068");
                        }
                    }
                break;
                case "5448bd6b4bdc2dfc2f8b4569":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5448bd6b4bdc2dfc2f8b4569"]._props.Slots[i]._props.filters[0].Filter.push("6816beb870415fac2be3689d", "6816beb8c80f9b6a5d347e12", "6816beb8b37502ca6fe81d49");
                        }
                    }
                break;
                case "5abccb7dd8ce87001773e277":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5abccb7dd8ce87001773e277"]._props.Slots[i]._props.filters[0].Filter.push("6816beb87583c4ea1bd6f290");
                        }
                    }
                break;
                case "66015072e9f84d5680039678":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["66015072e9f84d5680039678"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8d7cef8a32b096514");
                        }
                    }
                break;
                case "5b3b713c5acfc4330140bd8d":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5b3b713c5acfc4330140bd8d"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8709ab813c5e6d42f");
                        }
                    }
                break;
                case "56d59856d2720bd8418b456a":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["56d59856d2720bd8418b456a"]._props.Slots[i]._props.filters[0].Filter.push("6816beb83ec1f967ba8d5042", "6816beb88d47f1ecab592306");
                        }
                    }
                break;
                case "5a17f98cfcdbcb0980087290":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5a17f98cfcdbcb0980087290"]._props.Slots[i]._props.filters[0].Filter.push("6816beb87583c4ea1bd6f290");
                        }
                    }
                break;
                case "5cadc190ae921500103bb3b6":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5cadc190ae921500103bb3b6"]._props.Slots[i]._props.filters[0].Filter.push("6816beb896d514ab278fc03e", "6816beb8a145e90b2c673f8d");
                        }
                    }
                break;
                case "668fe5a998b5ad715703ddd6":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["668fe5a998b5ad715703ddd6"]._props.Slots[i]._props.filters[0].Filter.push("6816beb89d652f7b048ce3a1");
                        }
                    }
                break;
                case "59f98b4986f7746f546d2cef":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["59f98b4986f7746f546d2cef"]._props.Slots[i]._props.filters[0].Filter.push("6816beb831e25c084fb79da6");
                        }
                    }
                break;
                case "571a12c42459771f627b58a0":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["571a12c42459771f627b58a0"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8709ab813c5e6d42f", "6816beb82e640fc78931bda5");
                        }
                    }
                break;
                case "669fa409933e898cce0c2166":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["669fa409933e898cce0c2166"]._props.Slots[i]._props.filters[0].Filter.push("6816beb870db5e6239c41fa8");
                        }
                    }
                break;
                case "5d3eb3b0a4b93615055e84d2":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5d3eb3b0a4b93615055e84d2"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8a2fe41957bd683c0");
                        }
                    }
                break;
                case "5f36a0e5fbf956000b716b65":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5f36a0e5fbf956000b716b65"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8cf803bde529a1467", "6816beb848ed75c1f30a629b", "6816beb8a6934f87d0b51e2c", "6816beb82306ab59f7e4dc18");
                        }
                    }
                break;
                case "6193a720f8ee7e52e42109ed":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["6193a720f8ee7e52e42109ed"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8c6b98f031d74ae25", "6816beb88f1d6c4b523a970e", "6816beb8270981ce3f64da5b");
                        }
                    }
                break;
                case "6259b864ebedf17603599e88":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["6259b864ebedf17603599e88"]._props.Slots[i]._props.filters[0].Filter.push("6816beb815af2ed894670b3c", "6816beb8a179bf5604e3c8d2", "6816beb8d8476f59a2b10c3e", "6816beb8b73ac9e201fd6845");
                        }
                    }
                break;
                case "5a38e6bac4a2826c6e06d79b":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5a38e6bac4a2826c6e06d79b"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8359e47081cbf6ad2", "6816beb83d58fbe607c9a142", "6816beb8356f0e2c419ab87d");
                        }
                    }
                break;
                case "5e870397991fd70db46995c8":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5e870397991fd70db46995c8"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8857b9c43d2a160ef");
                        }
                    }
                break;
                case "54491c4f4bdc2db1078b4568":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["54491c4f4bdc2db1078b4568"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8ca5d3268e9410bf7", "6816beb80d9f482b6e571a3c", "6816beb8029dbaef8574136c", "6816beb801d8937ace4b265f", "6816beb8e63f795b81c04d2a", "6816beb8c726fe34d9a580b1", "6816beb8573d8a9fe4061cb2");
                        }
                    }
                break;
                case "576165642459773c7a400233":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["576165642459773c7a400233"]._props.Slots[i]._props.filters[0].Filter.push("6816beb836c2f87de5b9104a", "6816beb83dec546a09bf8127", "6816beb8a1397840fe652bcd", "6816beb816e84095ca273dfb");
                        }
                    }
                break;
                case "674fe9a75e51f1c47c04ec23":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["674fe9a75e51f1c47c04ec23"]._props.Slots[i]._props.filters[0].Filter.push("6816beb836c2f87de5b9104a", "6816beb83dec546a09bf8127", "6816beb8a1397840fe652bcd", "6816beb816e84095ca273dfb");
                        }
                    }
                break;
                case "5e848cc2988a8701445df1e8":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5e848cc2988a8701445df1e8"]._props.Slots[i]._props.filters[0].Filter.push("6816beb83b82d7e6c9af5041");
                        }
                    }
                break;
                case "5a7828548dc32e5a9c28b516":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5a7828548dc32e5a9c28b516"]._props.Slots[i]._props.filters[0].Filter.push("6816beb85023df7c4ab198e6", "6816beb82fc1b6d3e5a49078", "6816beb828dce751ab36f049");
                        }
                    }
                break;
                case "56dee2bdd2720bc8328b4567":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["56dee2bdd2720bc8328b4567"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8ca5d3268e9410bf7", "6816beb80d9f482b6e571a3c", "6816beb8029dbaef8574136c", "6816beb801d8937ace4b265f", "6816beb8e63f795b81c04d2a", "6816beb8c726fe34d9a580b1", "6816beb8573d8a9fe4061cb2");
                        }
                    }
                break;
                case "606dae0ab0e443224b421bb7":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["606dae0ab0e443224b421bb7"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8c0b12f6983da5e74", "6816beb8ca5d3268e9410bf7", "6816beb80d9f482b6e571a3c", "6816beb8029dbaef8574136c", "6816beb801d8937ace4b265f", "6816beb8e63f795b81c04d2a", "6816beb8c726fe34d9a580b1", "6816beb8573d8a9fe4061cb2");
                        }
                    }
                break;
                case "66ffa9b66e19cc902401c5e8":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["66ffa9b66e19cc902401c5e8"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8d38f0ae629c7514b", "6816beb87c305a816bed49f2");
                        }
                    }
                break;
                case "67124dcfa3541f2a1f0e788b":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["67124dcfa3541f2a1f0e788b"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8d38f0ae629c7514b", "6816beb87c305a816bed49f2");
                        }
                    }
                break;
                case "5fc3f2d5900b1d5091531e57":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5fc3f2d5900b1d5091531e57"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8076854e1afb3d92c", "6816beb8810fd9ecb375a246", "6816beb815034f78ed6c92ba", "6816beb88dacf09765b14e32", "6816beb8463cf8b72e1590da", "6816beb8bc5eadf360942178", "6816beb8b785e2314c9fa6d0");
                        }
                    }
                break;
                case "5fc3e272f8b6a877a729eac5":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5fc3e272f8b6a877a729eac5"]._props.Slots[i]._props.filters[0].Filter.push("6816beb89145ec0f87db63a2");
                        }
                    }
                break;
                case "6680304edadb7aa61d00cef0":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["6680304edadb7aa61d00cef0"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8102946dabf3ec578", "6816beb84f3095b26a7ec18d", "6816beb81fe87340c69bd52a");
                        }
                    }
                break;
                case "66992b349950f5f4cd06029f":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["66992b349950f5f4cd06029f"]._props.Slots[i]._props.filters[0].Filter.push("6816beb88e62a50f19bd74c3", "6816beb81e87a953fc4b62d0", "6816beb8dbf5890ae76314c2", "6816beb83a6bfc754e2d9108", "6816beb8102946dabf3ec578", "6816beb84f3095b26a7ec18d", "6816beb81fe87340c69bd52a", "6816beb81ad5c874f0b9e236");
                        }
                    }
                break;
                case "5cc82d76e24e8d00134b4b83":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5cc82d76e24e8d00134b4b83"]._props.Slots[i]._props.filters[0].Filter.push("6816beb876e92c53ad8410bf");
                        }
                    }
                break;
                case "627e14b21713922ded6f2c15":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["627e14b21713922ded6f2c15"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8b26ca97e413085df");
                        }
                    }
                break;
                case "5fb64bc92b1b027b1f50bcf2":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5fb64bc92b1b027b1f50bcf2"]._props.Slots[i]._props.filters[0].Filter.push("6816beb80d7ab48f6c23195e", "6816beb8c792ae3540df61b8");
                        }
                    }
                break;
                case "668e71a8dadf42204c032ce1":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["668e71a8dadf42204c032ce1"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8102946dabf3ec578", "6816beb84f3095b26a7ec18d", "6816beb81fe87340c69bd52a");
                        }
                    }
                break;
                case "5de7bd7bfd6b4e6e2276dc25":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5de7bd7bfd6b4e6e2276dc25"]._props.Slots[i]._props.filters[0].Filter.push("6816beb85d4f1cab7869230e", "6816beb8b1e54a6cf378920d", "6816beb8ae18f9b23d57c640", "6816beb8e5a4f62d10bc7839");
                        }
                    }
                break;
                case "5de652c31b7e3716273428be":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5de652c31b7e3716273428be"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8628d4307c1fa95be");
                        }
                    }
                break;
                case "55801eed4bdc2d89578b4588":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["55801eed4bdc2d89578b4588"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8752f4e13c986db0a");
                        }
                    }
                break;
                case "62e14904c2699c0ec93adc47":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["62e14904c2699c0ec93adc47"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8ad1e94c50386b7f2", "6816beb843fb6ed851a07c92");
                        }
                    }
                break;
                case "673cab3e03c6a20581028bc1":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["673cab3e03c6a20581028bc1"]._props.Slots[i]._props.filters[0].Filter.push("6816beb80983fdca5461b27e");
                        }
                    }
                break;
                case "60339954d62c9b14ed777c06":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["60339954d62c9b14ed777c06"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8076854e1afb3d92c", "6816beb8810fd9ecb375a246", "6816beb815034f78ed6c92ba", "6816beb88dacf09765b14e32", "6816beb8463cf8b72e1590da", "6816beb8bc5eadf360942178", "6816beb8b785e2314c9fa6d0");
                        }
                    }
                break;
                case "5ae08f0a5acfc408fb1398a1":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ae08f0a5acfc408fb1398a1"]._props.Slots[i]._props.filters[0].Filter.push("6816beb80df5976e243ab8c1", "6816beb82708b5a41d96ec3f");
                        }
                    }
                break;
                case "58948c8e86f77409493f7266":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["58948c8e86f77409493f7266"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8a7b28c6905fe3d14", "6816beb8d3e80cb56f129a74", "6816beb85096e1d2f783bca4", "6816beb864a3e5df89cb1207");
                        }
                    }
                break;
                case "5bfea6e90db834001b7347f3":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5bfea6e90db834001b7347f3"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8f971bd482c6a53e0", "6816beb8b9e8315da47f26c0", "6816beb81d379c8624af5e0b", "6816beb856d9384bcf7ae120", "6816beb8de89f3652ca071b4", "6816beb80e865dabf4219c37", "6816beb8a51972fb6ecd0384", "6816beb8fe92d4a031c56b78", "6816beb8d172ef95036abc84");
                        }
                    }
                break;
                case "5e00903ae9dc277128008b87":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5e00903ae9dc277128008b87"]._props.Slots[i]._props.filters[0].Filter.push("6816beb85d4f1cab7869230e", "6816beb8b1e54a6cf378920d", "6816beb8ae18f9b23d57c640", "6816beb8e5a4f62d10bc7839");
                        }
                    }
                break;
                case "5d2f0d8048f0356c925bc3b0":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5d2f0d8048f0356c925bc3b0"]._props.Slots[i]._props.filters[0].Filter.push("6816beb85edac810736f492b", "6816beb8b2a70456e8f91d3c", "6816beb84cb01286539dfa7e");
                        }
                    }
                break;
                case "5ea03f7400685063ec28bfa8":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ea03f7400685063ec28bfa8"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8f7192c536d4be8a0", "6816beb8a10ec5fb974d8362");
                        }
                    }
                break;
                case "5bfd297f0db834001a669119":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5bfd297f0db834001a669119"]._props.Slots[i]._props.filters[0].Filter.push("6816beb80df5976e243ab8c1", "6816beb82708b5a41d96ec3f");
                        }
                    }
                break;
                case "57d14d2524597714373db789":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["57d14d2524597714373db789"]._props.Slots[i]._props.filters[0].Filter.push("6816beb82b5e4a89371fdc06", "6816beb8843c91e2b70da56f");
                        }
                    }
                break;
                case "59f9cabd86f7743a10721f46":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["59f9cabd86f7743a10721f46"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8278a1cd59be0f634", "6816beb87c5ba0e6f91d2348", "6816beb87189f6b405a2cd3e", "6816beb86fe1803b79c25a4d", "6816beb81a73d5c2b890e4f6");
                        }
                    }
                break;
                case "59984ab886f7743e98271174":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["59984ab886f7743e98271174"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8278a1cd59be0f634", "6816beb87c5ba0e6f91d2348", "6816beb87189f6b405a2cd3e", "6816beb86fe1803b79c25a4d", "6816beb81a73d5c2b890e4f6");
                        }
                    }
                break;
                case "57f3c6bd24597738e730fa2f":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["57f3c6bd24597738e730fa2f"]._props.Slots[i]._props.filters[0].Filter.push("6816beb82b5e4a89371fdc06", "6816beb8843c91e2b70da56f");
                        }
                    }
                break;
                case "5bd70322209c4d00d7167b8f":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5bd70322209c4d00d7167b8f"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8b9741cd0e8f3256a", "6816beb846dfe05197823abc", "6816beb8ba892d1e7340c5f6");
                        }
                    }
                break;
                case "57f4c844245977379d5c14d1":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["57f4c844245977379d5c14d1"]._props.Slots[i]._props.filters[0].Filter.push("6816beb82b5e4a89371fdc06", "6816beb8843c91e2b70da56f");
                        }
                    }
                break;
                case "5ba26383d4351e00334c93d9":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5ba26383d4351e00334c93d9"]._props.Slots[i]._props.filters[0].Filter.push("6816beb8b9741cd0e8f3256a", "6816beb846dfe05197823abc", "6816beb8ba892d1e7340c5f6");
                        }
                    }
                break;
                case "5df24cf80dee1b22f862e9bc":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5df24cf80dee1b22f862e9bc"]._props.Slots[i]._props.filters[0].Filter.push("6816beb839bf42ce510a7d68");
                        }
                    }
                break;
                case "5926bb2186f7744b1c6c6e60":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["5926bb2186f7744b1c6c6e60"]._props.Slots[i]._props.filters[0].Filter.push("6816beb85edac810736f492b", "6816beb8b2a70456e8f91d3c", "6816beb84cb01286539dfa7e");
                        }
                    }
                break;
                case "588892092459774ac91d4b11":
                    for ( i=0; i<data._props.Slots.length; i++ )
                    {
                        if ( data._props.Slots[i]._name == sectionName )
                        {
                            items["588892092459774ac91d4b11"]._props.Slots[i]._props.filters[0].Filter.push("6816beb864ebcf2d0a375981");
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
        const additions = this.zeusglobals.buffs;
        for (const stimBuff in additions){
            gameBuffs[stimBuff] = additions[stimBuff];
        }
    }

    public updateItems(container: DependencyContainer): void {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const items = db.templates.items;
        const fs = container.resolve<FileSystemSync>("FileSystemSync");
        const { FullVersion, MagsOnly, RigsOnly, StimsOnly, athenaArmorAmount, herculesRig2ArmorAmount, helmetofhermesArmorAmount, atlassatchelHorizontal, atlassatchelVertical, numberOfStimUses, stimUseTimeInSeconds } = jsonc.parse(fs.read(path.resolve(__dirname, "../config.jsonc")));

        const stimItems: string[] = [
            "661c91746c391e0f5ba82d47",
            "661c91741ba0f93d4287c5e6",
            "661c91742b5c1493806daf7e",
            "661c9174e9365c70fa18b4d2"
        ];
        const magItems: string[] = [
            "6816beb89aef4b352c8701d6",
            "6816beb871b09465ad3efc82",
            "6816beb85fc376e9b012da48",
            "6816beb8d7b63ce01482af59",
            "6816beb80e645fb792a183dc",
            "6816beb851e6280ad379c4fb",
            "6816beb841be398af5270d6c",
            "6816beb8e914af7d836b502c",
            "6816beb8fa94701c6b382e5d",
            "6816beb876d9cb015a2f8e43",
            "6816beb88e9b537f4da16c02",
            "6816beb89b6207f4c1a38d5e",
            "6816beb89b7e63d2c84f01a5",
            "6816beb81d68a3cb0247f9e5",
            "6816beb8ae69d485c271f3b0",
            "6816beb839dcf8e6420b7a15",
            "6816beb818f4269d5cea30b7",
            "6816beb82130bcd49ae6f785",
            "6816beb87c305a816bed49f2",
            "6816beb8d38f0ae629c7514b",
            "6816beb8b26ca97e413085df",
            "6816beb8402f7b9ecd3a5618",
            "6816beb8280ec5a63bdf4971",
            "6816beb843df2b6958c0ea71",
            "6816beb883cad594021feb67",
            "6816beb80a6425cb198d7ef3",
            "6816beb84b37efd952a0c618",
            "6816beb806be7c5f8912a4d3",
            "6816beb8d4f6973ea0c28b51",
            "6816beb846fb8d9a251e37c0",
            "6816beb80312f467c9bea8d5",
            "6816beb826d54eb0f87ca913",
            "6816beb8a135f724c8d06b9e",
            "6816beb859d031b824cefa76",
            "6816beb813b4de9cf28a5706",
            "6816beb8c62df0a913e758b4",
            "6816beb86298f4e30d7bca15",
            "6816beb8d87c9e2a165b340f",
            "6816beb8c29e68501df3a47b",
            "6816beb85429ef71b38ac06d",
            "6816beb872f94dc06a8b531e",
            "6816beb8120af4deb8c35679",
            "6816beb89bdc423507a6f1e8",
            "6816beb88a73b5146dcfe290",
            "6816beb85be0cf897d14236a",
            "6816beb8e4cbf729a6d80153",
            "6816beb8db5f9a80316c2e74",
            "6816beb87f09ce5241d86a3b",
            "6816beb8f06a73d98b2e15c4",
            "6816beb8da95831eb6402fc7",
            "6816beb8fc419e7a2d8305b6",
            "6816beb87583c4ea1bd6f290",
            "6816beb8f40573ad968be2c1",
            "6816beb87eb49f18a563dc20",
            "6816beb84175a83fc9d2be06",
            "6816beb8a384dc16bf97052e",
            "6816beb88a739c12045bedf6",
            "6816beb8ca246579d031b8ef",
            "6816beb870ba8d62fe4c3591",
            "6816beb812a48ef976dc053b",
            "6816beb883a4fe692cb01d57",
            "6816beb815af2ed894670b3c",
            "6816beb8b73ac9e201fd6845",
            "6816beb8a179bf5604e3c8d2",
            "6816beb8d8476f59a2b10c3e",
            "6816beb870db5e6239c41fa8",
            "6816beb89d652f7b048ce3a1",
            "6816beb864ebcf2d0a375981",
            "6816beb8a2fe41957bd683c0",
            "6816beb876e92c53ad8410bf",
            "6816beb860d84b357e2cf9a1",
            "6816beb8fa4b3857d261e9c0",
            "6816beb8523efd4c0976b81a",
            "6816beb81bf95adc2436780e",
            "6816beb80d7ab48f6c23195e",
            "6816beb8c792ae3540df61b8",
            "6816beb8463cf8b72e1590da",
            "6816beb8bc5eadf360942178",
            "6816beb8076854e1afb3d92c",
            "6816beb8810fd9ecb375a246",
            "6816beb8b785e2314c9fa6d0",
            "6816beb8b785e2314cefefdd",
            "6816beb815034f78ed6c92ba",
            "6816beb88dacf09765b14e32",
            "6816beb8a5dc819e0b7f4236",
            "6816beb85edac810736f492b",
            "6816beb8b2a70456e8f91d3c",
            "6816beb84cb01286539dfa7e",
            "6816beb8b9741cd0e8f3256a",
            "6816beb846dfe05197823abc",
            "6816beb8ba892d1e7340c5f6",
            "6816beb89145ec0f87db63a2",
            "6816beb8c6b98f031d74ae25",
            "6816beb88f1d6c4b523a970e",
            "6816beb8270981ce3f64da5b",
            "6816beb8570a8df6c19eb324",
            "6816beb8fbe7045a39126c8d",
            "6816beb83b82d7e6c9af5041",
            "6816beb8b29f051ac8ed4763",
            "6816beb8c5d2a6739e48f01b",
            "6816beb8cf803bde529a1467",
            "6816beb8a6934f87d0b51e2c",
            "6816beb848ed75c1f30a629b",
            "6816beb82306ab59f7e4dc18",
            "6816beb8fa971d864e5b0c23",
            "6816beb8194826f7e5d0c3ba",
            "6816beb8f54e63a79dc1208b",
            "6816beb8f971bd482c6a53e0",
            "6816beb8b9e8315da47f26c0",
            "6816beb81d379c8624af5e0b",
            "6816beb856d9384bcf7ae120",
            "6816beb8de89f3652ca071b4",
            "6816beb80e865dabf4219c37",
            "6816beb8a51972fb6ecd0384",
            "6816beb8fe92d4a031c56b78",
            "6816beb8d172ef95036abc84",
            "6816beb82fc1b6d3e5a49078",
            "6816beb85023df7c4ab198e6",
            "6816beb828dce751ab36f049",
            "6816beb896d514ab278fc03e",
            "6816beb8a145e90b2c673f8d",
            "6816beb8580e4c96b21f3a7d",
            "6816beb80df5976e243ab8c1",
            "6816beb82708b5a41d96ec3f",
            "6816beb8857b9c43d2a160ef",
            "6816beb8ca5d3268e9410bf7",
            "6816beb80d9f482b6e571a3c",
            "6816beb8029dbaef8574136c",
            "6816beb801d8937ace4b265f",
            "6816beb8e63f795b81c04d2a",
            "6816beb8c726fe34d9a580b1",
            "6816beb8573d8a9fe4061cb2",
            "6816beb8c0b12f6983da5e74",
            "6816beb83426dcf15a780b9e",
            "6816beb82dac93e574f1b068",
            "6816beb85d4f1cab7869230e",
            "6816beb8b1e54a6cf378920d",
            "6816beb8ae18f9b23d57c640",
            "6816beb8e5a4f62d10bc7839",
            "6816beb8d3e80cb56f129a74",
            "6816beb85096e1d2f783bca4",
            "6816beb8a7b28c6905fe3d14",
            "6816beb864a3e5df89cb1207",
            "6816beb839bf42ce510a7d68",
            "6816beb88d47f1ecab592306",
            "6816beb83ec1f967ba8d5042",
            "6816beb8f0d74286ba1395ec",
            "6816beb8e2698bca754f10d3",
            "6816beb806c372a491ebd85f",
            "6816beb870415fac2be3689d",
            "6816beb8c80f9b6a5d347e12",
            "6816beb8b37502ca6fe81d49",
            "6816beb81a73d5c2b890e4f6",
            "6816beb87c5ba0e6f91d2348",
            "6816beb87189f6b405a2cd3e",
            "6816beb86fe1803b79c25a4d",
            "6816beb82b5e4a89371fdc06",
            "6816beb8843c91e2b70da56f",
            "6816beb8f7192c536d4be8a0",
            "6816beb8a10ec5fb974d8362",
            "6816beb8408b372af95de61c",
            "6816beb8a34b7e209c5f16d8",
            "6816beb8652c3b87ed4109fa",
            "6816beb80ab85c36ef42719d",
            "6816beb8987bf6435ecda210",
            "6816beb842fb156987dc0e3a",
            "6816beb84c6872b1d39e0f5a",
            "6816beb8241f0c6897bd35ea",
            "6816beb8278a1cd59be0f634",
            "6816beb80983fdca5461b27e",
            "6816beb865f13dcb89e7a024",
            "6816beb8031bcf82a967e4d5",
            "6816beb85901c48273b6efda",
            "6816beb897a804523f61cdeb",
            "6816beb8bc162e53d90a87f4",
            "6816beb83dec546a09bf8127",
            "6816beb816e84095ca273dfb",
            "6816beb8a1397840fe652bcd",
            "6816beb836c2f87de5b9104a",
            "6816beb831e25c084fb79da6",
            "6816beb843fb6ed851a07c92",
            "6816beb8ad1e94c50386b7f2",
            "6816beb81f03c7259ea86b4d",
            "6816beb82f46ab87e59dc103",
            "6816beb8acfd83549e1b0267",
            "6816beb8752f4e13c986db0a",
            "6816beb86958dc74201ebf3a",
            "6816beb85fa760b1d93248ec",
            "6816beb8e9f7231c6458da0b",
            "6816beb8d7cef8a32b096514",
            "6816beb8359e47081cbf6ad2",
            "6816beb83d58fbe607c9a142",
            "6816beb8356f0e2c419ab87d",
            "6816beb8709ab813c5e6d42f",
            "6816beb82e640fc78931bda5",
            "6816beb88e62a50f19bd74c3",
            "6816beb81e87a953fc4b62d0",
            "6816beb8dbf5890ae76314c2",
            "6816beb83a6bfc754e2d9108",
            "6816beb81ad5c874f0b9e236",
            "6816beb8102946dabf3ec578",
            "6816beb84f3095b26a7ec18d",
            "6816beb81fe87340c69bd52a",
            "6816beb88edf2710b9ca4635",
            "6816beb8cafed09468532b17",
            "6816beb8628d4307c1fa95be",
            "6816beb89243a7658de0c1bf",
            "6816beb858769a4d12ebc0f3",
            "6816beb85184f7c963e2a0db",
            "6816beb8c4d5eb182a37096f"
        ];

        if ( FullVersion === true ) {

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
            if ( MagsOnly === true ) {}

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
        const fs = container.resolve<FileSystemSync>("FileSystemSync");
        const { FullVersion, MagsOnly, RigsOnly, StimsOnly, blacklistStims, blacklistRigs, blacklistMags } = jsonc.parse(fs.read(path.resolve(__dirname, "../config.jsonc")));

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
                    botConfig.equipment.pmc.blacklist[0].equipment.mod_magazine.push("6816beb89aef4b352c8701d6","6816beb871b09465ad3efc82","6816beb85fc376e9b012da48","6816beb8d7b63ce01482af59","6816beb80e645fb792a183dc","6816beb851e6280ad379c4fb","6816beb841be398af5270d6c","6816beb8e914af7d836b502c","6816beb8fa94701c6b382e5d","6816beb876d9cb015a2f8e43","6816beb88e9b537f4da16c02","6816beb89b6207f4c1a38d5e","6816beb89b7e63d2c84f01a5","6816beb81d68a3cb0247f9e5","6816beb8ae69d485c271f3b0","6816beb839dcf8e6420b7a15","6816beb818f4269d5cea30b7","6816beb82130bcd49ae6f785","6816beb87c305a816bed49f2","6816beb8d38f0ae629c7514b","6816beb8b26ca97e413085df","6816beb8402f7b9ecd3a5618","6816beb8280ec5a63bdf4971","6816beb843df2b6958c0ea71","6816beb883cad594021feb67","6816beb80a6425cb198d7ef3","6816beb84b37efd952a0c618","6816beb806be7c5f8912a4d3","6816beb8d4f6973ea0c28b51","6816beb846fb8d9a251e37c0","6816beb80312f467c9bea8d5","6816beb826d54eb0f87ca913","6816beb8a135f724c8d06b9e","6816beb859d031b824cefa76","6816beb813b4de9cf28a5706","6816beb8c62df0a913e758b4","6816beb86298f4e30d7bca15","6816beb8d87c9e2a165b340f","6816beb8c29e68501df3a47b","6816beb85429ef71b38ac06d","6816beb872f94dc06a8b531e","6816beb8120af4deb8c35679","6816beb89bdc423507a6f1e8","6816beb88a73b5146dcfe290","6816beb85be0cf897d14236a","6816beb8e4cbf729a6d80153","6816beb8db5f9a80316c2e74","6816beb87f09ce5241d86a3b","6816beb8f06a73d98b2e15c4","6816beb8da95831eb6402fc7","6816beb8fc419e7a2d8305b6","6816beb87583c4ea1bd6f290","6816beb8f40573ad968be2c1","6816beb87eb49f18a563dc20","6816beb84175a83fc9d2be06","6816beb8a384dc16bf97052e","6816beb88a739c12045bedf6","6816beb8ca246579d031b8ef","6816beb870ba8d62fe4c3591","6816beb812a48ef976dc053b","6816beb883a4fe692cb01d57","6816beb815af2ed894670b3c","6816beb8b73ac9e201fd6845","6816beb8a179bf5604e3c8d2","6816beb8d8476f59a2b10c3e","6816beb870db5e6239c41fa8","6816beb89d652f7b048ce3a1","6816beb864ebcf2d0a375981","6816beb8a2fe41957bd683c0","6816beb876e92c53ad8410bf","6816beb860d84b357e2cf9a1","6816beb8fa4b3857d261e9c0","6816beb8523efd4c0976b81a","6816beb81bf95adc2436780e","6816beb80d7ab48f6c23195e","6816beb8c792ae3540df61b8","6816beb8463cf8b72e1590da","6816beb8bc5eadf360942178","6816beb8076854e1afb3d92c","6816beb8810fd9ecb375a246","6816beb8b785e2314c9fa6d0","6816beb8b785e2314cefefdd","6816beb815034f78ed6c92ba","6816beb88dacf09765b14e32","6816beb8a5dc819e0b7f4236","6816beb85edac810736f492b","6816beb8b2a70456e8f91d3c","6816beb84cb01286539dfa7e","6816beb8b9741cd0e8f3256a","6816beb846dfe05197823abc","6816beb8ba892d1e7340c5f6","6816beb89145ec0f87db63a2","6816beb8c6b98f031d74ae25","6816beb88f1d6c4b523a970e","6816beb8270981ce3f64da5b","6816beb8570a8df6c19eb324","6816beb8fbe7045a39126c8d","6816beb83b82d7e6c9af5041","6816beb8b29f051ac8ed4763","6816beb8c5d2a6739e48f01b","6816beb8cf803bde529a1467","6816beb8a6934f87d0b51e2c","6816beb848ed75c1f30a629b","6816beb82306ab59f7e4dc18","6816beb8fa971d864e5b0c23","6816beb8194826f7e5d0c3ba","6816beb8f54e63a79dc1208b","6816beb8f971bd482c6a53e0","6816beb8b9e8315da47f26c0","6816beb81d379c8624af5e0b","6816beb856d9384bcf7ae120","6816beb8de89f3652ca071b4","6816beb80e865dabf4219c37","6816beb8a51972fb6ecd0384","6816beb8fe92d4a031c56b78","6816beb8d172ef95036abc84","6816beb82fc1b6d3e5a49078","6816beb85023df7c4ab198e6","6816beb828dce751ab36f049","6816beb896d514ab278fc03e","6816beb8a145e90b2c673f8d","6816beb8580e4c96b21f3a7d","6816beb80df5976e243ab8c1","6816beb82708b5a41d96ec3f","6816beb8857b9c43d2a160ef","6816beb8ca5d3268e9410bf7","6816beb80d9f482b6e571a3c","6816beb8029dbaef8574136c","6816beb801d8937ace4b265f","6816beb8e63f795b81c04d2a","6816beb8c726fe34d9a580b1","6816beb8573d8a9fe4061cb2","6816beb8c0b12f6983da5e74","6816beb83426dcf15a780b9e","6816beb82dac93e574f1b068","6816beb85d4f1cab7869230e","6816beb8b1e54a6cf378920d","6816beb8ae18f9b23d57c640","6816beb8e5a4f62d10bc7839","6816beb8d3e80cb56f129a74","6816beb85096e1d2f783bca4","6816beb8a7b28c6905fe3d14","6816beb864a3e5df89cb1207","6816beb839bf42ce510a7d68","6816beb88d47f1ecab592306","6816beb83ec1f967ba8d5042","6816beb8f0d74286ba1395ec","6816beb8e2698bca754f10d3","6816beb806c372a491ebd85f","6816beb870415fac2be3689d","6816beb8c80f9b6a5d347e12","6816beb8b37502ca6fe81d49","6816beb81a73d5c2b890e4f6","6816beb87c5ba0e6f91d2348","6816beb87189f6b405a2cd3e","6816beb86fe1803b79c25a4d","6816beb82b5e4a89371fdc06","6816beb8843c91e2b70da56f","6816beb8f7192c536d4be8a0","6816beb8a10ec5fb974d8362","6816beb8408b372af95de61c","6816beb8a34b7e209c5f16d8","6816beb8652c3b87ed4109fa","6816beb80ab85c36ef42719d","6816beb8987bf6435ecda210","6816beb842fb156987dc0e3a","6816beb84c6872b1d39e0f5a","6816beb8241f0c6897bd35ea","6816beb8278a1cd59be0f634","6816beb80983fdca5461b27e","6816beb865f13dcb89e7a024","6816beb8031bcf82a967e4d5","6816beb85901c48273b6efda","6816beb897a804523f61cdeb","6816beb8bc162e53d90a87f4","6816beb83dec546a09bf8127","6816beb816e84095ca273dfb","6816beb8a1397840fe652bcd","6816beb836c2f87de5b9104a","6816beb831e25c084fb79da6","6816beb843fb6ed851a07c92","6816beb8ad1e94c50386b7f2","6816beb81f03c7259ea86b4d","6816beb82f46ab87e59dc103","6816beb8acfd83549e1b0267","6816beb8752f4e13c986db0a","6816beb86958dc74201ebf3a","6816beb85fa760b1d93248ec","6816beb8e9f7231c6458da0b","6816beb8d7cef8a32b096514","6816beb8359e47081cbf6ad2","6816beb83d58fbe607c9a142","6816beb8356f0e2c419ab87d","6816beb8709ab813c5e6d42f","6816beb82e640fc78931bda5","6816beb88e62a50f19bd74c3","6816beb81e87a953fc4b62d0","6816beb8dbf5890ae76314c2","6816beb83a6bfc754e2d9108","6816beb81ad5c874f0b9e236","6816beb8102946dabf3ec578","6816beb84f3095b26a7ec18d","6816beb81fe87340c69bd52a","6816beb88edf2710b9ca4635","6816beb8cafed09468532b17","6816beb8628d4307c1fa95be","6816beb89243a7658de0c1bf","6816beb858769a4d12ebc0f3","6816beb85184f7c963e2a0db","6816beb8c4d5eb182a37096f");
                    pmcConfig.vestLoot.blacklist.push("6816beb89aef4b352c8701d6","6816beb871b09465ad3efc82","6816beb85fc376e9b012da48","6816beb8d7b63ce01482af59","6816beb80e645fb792a183dc","6816beb851e6280ad379c4fb","6816beb841be398af5270d6c","6816beb8e914af7d836b502c","6816beb8fa94701c6b382e5d","6816beb876d9cb015a2f8e43","6816beb88e9b537f4da16c02","6816beb89b6207f4c1a38d5e","6816beb89b7e63d2c84f01a5","6816beb81d68a3cb0247f9e5","6816beb8ae69d485c271f3b0","6816beb839dcf8e6420b7a15","6816beb818f4269d5cea30b7","6816beb82130bcd49ae6f785","6816beb87c305a816bed49f2","6816beb8d38f0ae629c7514b","6816beb8b26ca97e413085df","6816beb8402f7b9ecd3a5618","6816beb8280ec5a63bdf4971","6816beb843df2b6958c0ea71","6816beb883cad594021feb67","6816beb80a6425cb198d7ef3","6816beb84b37efd952a0c618","6816beb806be7c5f8912a4d3","6816beb8d4f6973ea0c28b51","6816beb846fb8d9a251e37c0","6816beb80312f467c9bea8d5","6816beb826d54eb0f87ca913","6816beb8a135f724c8d06b9e","6816beb859d031b824cefa76","6816beb813b4de9cf28a5706","6816beb8c62df0a913e758b4","6816beb86298f4e30d7bca15","6816beb8d87c9e2a165b340f","6816beb8c29e68501df3a47b","6816beb85429ef71b38ac06d","6816beb872f94dc06a8b531e","6816beb8120af4deb8c35679","6816beb89bdc423507a6f1e8","6816beb88a73b5146dcfe290","6816beb85be0cf897d14236a","6816beb8e4cbf729a6d80153","6816beb8db5f9a80316c2e74","6816beb87f09ce5241d86a3b","6816beb8f06a73d98b2e15c4","6816beb8da95831eb6402fc7","6816beb8fc419e7a2d8305b6","6816beb87583c4ea1bd6f290","6816beb8f40573ad968be2c1","6816beb87eb49f18a563dc20","6816beb84175a83fc9d2be06","6816beb8a384dc16bf97052e","6816beb88a739c12045bedf6","6816beb8ca246579d031b8ef","6816beb870ba8d62fe4c3591","6816beb812a48ef976dc053b","6816beb883a4fe692cb01d57","6816beb815af2ed894670b3c","6816beb8b73ac9e201fd6845","6816beb8a179bf5604e3c8d2","6816beb8d8476f59a2b10c3e","6816beb870db5e6239c41fa8","6816beb89d652f7b048ce3a1","6816beb864ebcf2d0a375981","6816beb8a2fe41957bd683c0","6816beb876e92c53ad8410bf","6816beb860d84b357e2cf9a1","6816beb8fa4b3857d261e9c0","6816beb8523efd4c0976b81a","6816beb81bf95adc2436780e","6816beb80d7ab48f6c23195e","6816beb8c792ae3540df61b8","6816beb8463cf8b72e1590da","6816beb8bc5eadf360942178","6816beb8076854e1afb3d92c","6816beb8810fd9ecb375a246","6816beb8b785e2314c9fa6d0","6816beb8b785e2314cefefdd","6816beb815034f78ed6c92ba","6816beb88dacf09765b14e32","6816beb8a5dc819e0b7f4236","6816beb85edac810736f492b","6816beb8b2a70456e8f91d3c","6816beb84cb01286539dfa7e","6816beb8b9741cd0e8f3256a","6816beb846dfe05197823abc","6816beb8ba892d1e7340c5f6","6816beb89145ec0f87db63a2","6816beb8c6b98f031d74ae25","6816beb88f1d6c4b523a970e","6816beb8270981ce3f64da5b","6816beb8570a8df6c19eb324","6816beb8fbe7045a39126c8d","6816beb83b82d7e6c9af5041","6816beb8b29f051ac8ed4763","6816beb8c5d2a6739e48f01b","6816beb8cf803bde529a1467","6816beb8a6934f87d0b51e2c","6816beb848ed75c1f30a629b","6816beb82306ab59f7e4dc18","6816beb8fa971d864e5b0c23","6816beb8194826f7e5d0c3ba","6816beb8f54e63a79dc1208b","6816beb8f971bd482c6a53e0","6816beb8b9e8315da47f26c0","6816beb81d379c8624af5e0b","6816beb856d9384bcf7ae120","6816beb8de89f3652ca071b4","6816beb80e865dabf4219c37","6816beb8a51972fb6ecd0384","6816beb8fe92d4a031c56b78","6816beb8d172ef95036abc84","6816beb82fc1b6d3e5a49078","6816beb85023df7c4ab198e6","6816beb828dce751ab36f049","6816beb896d514ab278fc03e","6816beb8a145e90b2c673f8d","6816beb8580e4c96b21f3a7d","6816beb80df5976e243ab8c1","6816beb82708b5a41d96ec3f","6816beb8857b9c43d2a160ef","6816beb8ca5d3268e9410bf7","6816beb80d9f482b6e571a3c","6816beb8029dbaef8574136c","6816beb801d8937ace4b265f","6816beb8e63f795b81c04d2a","6816beb8c726fe34d9a580b1","6816beb8573d8a9fe4061cb2","6816beb8c0b12f6983da5e74","6816beb83426dcf15a780b9e","6816beb82dac93e574f1b068","6816beb85d4f1cab7869230e","6816beb8b1e54a6cf378920d","6816beb8ae18f9b23d57c640","6816beb8e5a4f62d10bc7839","6816beb8d3e80cb56f129a74","6816beb85096e1d2f783bca4","6816beb8a7b28c6905fe3d14","6816beb864a3e5df89cb1207","6816beb839bf42ce510a7d68","6816beb88d47f1ecab592306","6816beb83ec1f967ba8d5042","6816beb8f0d74286ba1395ec","6816beb8e2698bca754f10d3","6816beb806c372a491ebd85f","6816beb870415fac2be3689d","6816beb8c80f9b6a5d347e12","6816beb8b37502ca6fe81d49","6816beb81a73d5c2b890e4f6","6816beb87c5ba0e6f91d2348","6816beb87189f6b405a2cd3e","6816beb86fe1803b79c25a4d","6816beb82b5e4a89371fdc06","6816beb8843c91e2b70da56f","6816beb8f7192c536d4be8a0","6816beb8a10ec5fb974d8362","6816beb8408b372af95de61c","6816beb8a34b7e209c5f16d8","6816beb8652c3b87ed4109fa","6816beb80ab85c36ef42719d","6816beb8987bf6435ecda210","6816beb842fb156987dc0e3a","6816beb84c6872b1d39e0f5a","6816beb8241f0c6897bd35ea","6816beb8278a1cd59be0f634","6816beb80983fdca5461b27e","6816beb865f13dcb89e7a024","6816beb8031bcf82a967e4d5","6816beb85901c48273b6efda","6816beb897a804523f61cdeb","6816beb8bc162e53d90a87f4","6816beb83dec546a09bf8127","6816beb816e84095ca273dfb","6816beb8a1397840fe652bcd","6816beb836c2f87de5b9104a","6816beb831e25c084fb79da6","6816beb843fb6ed851a07c92","6816beb8ad1e94c50386b7f2","6816beb81f03c7259ea86b4d","6816beb82f46ab87e59dc103","6816beb8acfd83549e1b0267","6816beb8752f4e13c986db0a","6816beb86958dc74201ebf3a","6816beb85fa760b1d93248ec","6816beb8e9f7231c6458da0b","6816beb8d7cef8a32b096514","6816beb8359e47081cbf6ad2","6816beb83d58fbe607c9a142","6816beb8356f0e2c419ab87d","6816beb8709ab813c5e6d42f","6816beb82e640fc78931bda5","6816beb88e62a50f19bd74c3","6816beb81e87a953fc4b62d0","6816beb8dbf5890ae76314c2","6816beb83a6bfc754e2d9108","6816beb81ad5c874f0b9e236","6816beb8102946dabf3ec578","6816beb84f3095b26a7ec18d","6816beb81fe87340c69bd52a","6816beb88edf2710b9ca4635","6816beb8cafed09468532b17","6816beb8628d4307c1fa95be","6816beb89243a7658de0c1bf","6816beb858769a4d12ebc0f3","6816beb85184f7c963e2a0db","6816beb8c4d5eb182a37096f");
                    pmcConfig.pocketLoot.blacklist.push("6816beb89aef4b352c8701d6","6816beb871b09465ad3efc82","6816beb85fc376e9b012da48","6816beb8d7b63ce01482af59","6816beb80e645fb792a183dc","6816beb851e6280ad379c4fb","6816beb841be398af5270d6c","6816beb8e914af7d836b502c","6816beb8fa94701c6b382e5d","6816beb876d9cb015a2f8e43","6816beb88e9b537f4da16c02","6816beb89b6207f4c1a38d5e","6816beb89b7e63d2c84f01a5","6816beb81d68a3cb0247f9e5","6816beb8ae69d485c271f3b0","6816beb839dcf8e6420b7a15","6816beb818f4269d5cea30b7","6816beb82130bcd49ae6f785","6816beb87c305a816bed49f2","6816beb8d38f0ae629c7514b","6816beb8b26ca97e413085df","6816beb8402f7b9ecd3a5618","6816beb8280ec5a63bdf4971","6816beb843df2b6958c0ea71","6816beb883cad594021feb67","6816beb80a6425cb198d7ef3","6816beb84b37efd952a0c618","6816beb806be7c5f8912a4d3","6816beb8d4f6973ea0c28b51","6816beb846fb8d9a251e37c0","6816beb80312f467c9bea8d5","6816beb826d54eb0f87ca913","6816beb8a135f724c8d06b9e","6816beb859d031b824cefa76","6816beb813b4de9cf28a5706","6816beb8c62df0a913e758b4","6816beb86298f4e30d7bca15","6816beb8d87c9e2a165b340f","6816beb8c29e68501df3a47b","6816beb85429ef71b38ac06d","6816beb872f94dc06a8b531e","6816beb8120af4deb8c35679","6816beb89bdc423507a6f1e8","6816beb88a73b5146dcfe290","6816beb85be0cf897d14236a","6816beb8e4cbf729a6d80153","6816beb8db5f9a80316c2e74","6816beb87f09ce5241d86a3b","6816beb8f06a73d98b2e15c4","6816beb8da95831eb6402fc7","6816beb8fc419e7a2d8305b6","6816beb87583c4ea1bd6f290","6816beb8f40573ad968be2c1","6816beb87eb49f18a563dc20","6816beb84175a83fc9d2be06","6816beb8a384dc16bf97052e","6816beb88a739c12045bedf6","6816beb8ca246579d031b8ef","6816beb870ba8d62fe4c3591","6816beb812a48ef976dc053b","6816beb883a4fe692cb01d57","6816beb815af2ed894670b3c","6816beb8b73ac9e201fd6845","6816beb8a179bf5604e3c8d2","6816beb8d8476f59a2b10c3e","6816beb870db5e6239c41fa8","6816beb89d652f7b048ce3a1","6816beb864ebcf2d0a375981","6816beb8a2fe41957bd683c0","6816beb876e92c53ad8410bf","6816beb860d84b357e2cf9a1","6816beb8fa4b3857d261e9c0","6816beb8523efd4c0976b81a","6816beb81bf95adc2436780e","6816beb80d7ab48f6c23195e","6816beb8c792ae3540df61b8","6816beb8463cf8b72e1590da","6816beb8bc5eadf360942178","6816beb8076854e1afb3d92c","6816beb8810fd9ecb375a246","6816beb8b785e2314c9fa6d0","6816beb8b785e2314cefefdd","6816beb815034f78ed6c92ba","6816beb88dacf09765b14e32","6816beb8a5dc819e0b7f4236","6816beb85edac810736f492b","6816beb8b2a70456e8f91d3c","6816beb84cb01286539dfa7e","6816beb8b9741cd0e8f3256a","6816beb846dfe05197823abc","6816beb8ba892d1e7340c5f6","6816beb89145ec0f87db63a2","6816beb8c6b98f031d74ae25","6816beb88f1d6c4b523a970e","6816beb8270981ce3f64da5b","6816beb8570a8df6c19eb324","6816beb8fbe7045a39126c8d","6816beb83b82d7e6c9af5041","6816beb8b29f051ac8ed4763","6816beb8c5d2a6739e48f01b","6816beb8cf803bde529a1467","6816beb8a6934f87d0b51e2c","6816beb848ed75c1f30a629b","6816beb82306ab59f7e4dc18","6816beb8fa971d864e5b0c23","6816beb8194826f7e5d0c3ba","6816beb8f54e63a79dc1208b","6816beb8f971bd482c6a53e0","6816beb8b9e8315da47f26c0","6816beb81d379c8624af5e0b","6816beb856d9384bcf7ae120","6816beb8de89f3652ca071b4","6816beb80e865dabf4219c37","6816beb8a51972fb6ecd0384","6816beb8fe92d4a031c56b78","6816beb8d172ef95036abc84","6816beb82fc1b6d3e5a49078","6816beb85023df7c4ab198e6","6816beb828dce751ab36f049","6816beb896d514ab278fc03e","6816beb8a145e90b2c673f8d","6816beb8580e4c96b21f3a7d","6816beb80df5976e243ab8c1","6816beb82708b5a41d96ec3f","6816beb8857b9c43d2a160ef","6816beb8ca5d3268e9410bf7","6816beb80d9f482b6e571a3c","6816beb8029dbaef8574136c","6816beb801d8937ace4b265f","6816beb8e63f795b81c04d2a","6816beb8c726fe34d9a580b1","6816beb8573d8a9fe4061cb2","6816beb8c0b12f6983da5e74","6816beb83426dcf15a780b9e","6816beb82dac93e574f1b068","6816beb85d4f1cab7869230e","6816beb8b1e54a6cf378920d","6816beb8ae18f9b23d57c640","6816beb8e5a4f62d10bc7839","6816beb8d3e80cb56f129a74","6816beb85096e1d2f783bca4","6816beb8a7b28c6905fe3d14","6816beb864a3e5df89cb1207","6816beb839bf42ce510a7d68","6816beb88d47f1ecab592306","6816beb83ec1f967ba8d5042","6816beb8f0d74286ba1395ec","6816beb8e2698bca754f10d3","6816beb806c372a491ebd85f","6816beb870415fac2be3689d","6816beb8c80f9b6a5d347e12","6816beb8b37502ca6fe81d49","6816beb81a73d5c2b890e4f6","6816beb87c5ba0e6f91d2348","6816beb87189f6b405a2cd3e","6816beb86fe1803b79c25a4d","6816beb82b5e4a89371fdc06","6816beb8843c91e2b70da56f","6816beb8f7192c536d4be8a0","6816beb8a10ec5fb974d8362","6816beb8408b372af95de61c","6816beb8a34b7e209c5f16d8","6816beb8652c3b87ed4109fa","6816beb80ab85c36ef42719d","6816beb8987bf6435ecda210","6816beb842fb156987dc0e3a","6816beb84c6872b1d39e0f5a","6816beb8241f0c6897bd35ea","6816beb8278a1cd59be0f634","6816beb80983fdca5461b27e","6816beb865f13dcb89e7a024","6816beb8031bcf82a967e4d5","6816beb85901c48273b6efda","6816beb897a804523f61cdeb","6816beb8bc162e53d90a87f4","6816beb83dec546a09bf8127","6816beb816e84095ca273dfb","6816beb8a1397840fe652bcd","6816beb836c2f87de5b9104a","6816beb831e25c084fb79da6","6816beb843fb6ed851a07c92","6816beb8ad1e94c50386b7f2","6816beb81f03c7259ea86b4d","6816beb82f46ab87e59dc103","6816beb8acfd83549e1b0267","6816beb8752f4e13c986db0a","6816beb86958dc74201ebf3a","6816beb85fa760b1d93248ec","6816beb8e9f7231c6458da0b","6816beb8d7cef8a32b096514","6816beb8359e47081cbf6ad2","6816beb83d58fbe607c9a142","6816beb8356f0e2c419ab87d","6816beb8709ab813c5e6d42f","6816beb82e640fc78931bda5","6816beb88e62a50f19bd74c3","6816beb81e87a953fc4b62d0","6816beb8dbf5890ae76314c2","6816beb83a6bfc754e2d9108","6816beb81ad5c874f0b9e236","6816beb8102946dabf3ec578","6816beb84f3095b26a7ec18d","6816beb81fe87340c69bd52a","6816beb88edf2710b9ca4635","6816beb8cafed09468532b17","6816beb8628d4307c1fa95be","6816beb89243a7658de0c1bf","6816beb858769a4d12ebc0f3","6816beb85184f7c963e2a0db","6816beb8c4d5eb182a37096f");
                    pmcConfig.backpackLoot.blacklist.push("6816beb89aef4b352c8701d6","6816beb871b09465ad3efc82","6816beb85fc376e9b012da48","6816beb8d7b63ce01482af59","6816beb80e645fb792a183dc","6816beb851e6280ad379c4fb","6816beb841be398af5270d6c","6816beb8e914af7d836b502c","6816beb8fa94701c6b382e5d","6816beb876d9cb015a2f8e43","6816beb88e9b537f4da16c02","6816beb89b6207f4c1a38d5e","6816beb89b7e63d2c84f01a5","6816beb81d68a3cb0247f9e5","6816beb8ae69d485c271f3b0","6816beb839dcf8e6420b7a15","6816beb818f4269d5cea30b7","6816beb82130bcd49ae6f785","6816beb87c305a816bed49f2","6816beb8d38f0ae629c7514b","6816beb8b26ca97e413085df","6816beb8402f7b9ecd3a5618","6816beb8280ec5a63bdf4971","6816beb843df2b6958c0ea71","6816beb883cad594021feb67","6816beb80a6425cb198d7ef3","6816beb84b37efd952a0c618","6816beb806be7c5f8912a4d3","6816beb8d4f6973ea0c28b51","6816beb846fb8d9a251e37c0","6816beb80312f467c9bea8d5","6816beb826d54eb0f87ca913","6816beb8a135f724c8d06b9e","6816beb859d031b824cefa76","6816beb813b4de9cf28a5706","6816beb8c62df0a913e758b4","6816beb86298f4e30d7bca15","6816beb8d87c9e2a165b340f","6816beb8c29e68501df3a47b","6816beb85429ef71b38ac06d","6816beb872f94dc06a8b531e","6816beb8120af4deb8c35679","6816beb89bdc423507a6f1e8","6816beb88a73b5146dcfe290","6816beb85be0cf897d14236a","6816beb8e4cbf729a6d80153","6816beb8db5f9a80316c2e74","6816beb87f09ce5241d86a3b","6816beb8f06a73d98b2e15c4","6816beb8da95831eb6402fc7","6816beb8fc419e7a2d8305b6","6816beb87583c4ea1bd6f290","6816beb8f40573ad968be2c1","6816beb87eb49f18a563dc20","6816beb84175a83fc9d2be06","6816beb8a384dc16bf97052e","6816beb88a739c12045bedf6","6816beb8ca246579d031b8ef","6816beb870ba8d62fe4c3591","6816beb812a48ef976dc053b","6816beb883a4fe692cb01d57","6816beb815af2ed894670b3c","6816beb8b73ac9e201fd6845","6816beb8a179bf5604e3c8d2","6816beb8d8476f59a2b10c3e","6816beb870db5e6239c41fa8","6816beb89d652f7b048ce3a1","6816beb864ebcf2d0a375981","6816beb8a2fe41957bd683c0","6816beb876e92c53ad8410bf","6816beb860d84b357e2cf9a1","6816beb8fa4b3857d261e9c0","6816beb8523efd4c0976b81a","6816beb81bf95adc2436780e","6816beb80d7ab48f6c23195e","6816beb8c792ae3540df61b8","6816beb8463cf8b72e1590da","6816beb8bc5eadf360942178","6816beb8076854e1afb3d92c","6816beb8810fd9ecb375a246","6816beb8b785e2314c9fa6d0","6816beb8b785e2314cefefdd","6816beb815034f78ed6c92ba","6816beb88dacf09765b14e32","6816beb8a5dc819e0b7f4236","6816beb85edac810736f492b","6816beb8b2a70456e8f91d3c","6816beb84cb01286539dfa7e","6816beb8b9741cd0e8f3256a","6816beb846dfe05197823abc","6816beb8ba892d1e7340c5f6","6816beb89145ec0f87db63a2","6816beb8c6b98f031d74ae25","6816beb88f1d6c4b523a970e","6816beb8270981ce3f64da5b","6816beb8570a8df6c19eb324","6816beb8fbe7045a39126c8d","6816beb83b82d7e6c9af5041","6816beb8b29f051ac8ed4763","6816beb8c5d2a6739e48f01b","6816beb8cf803bde529a1467","6816beb8a6934f87d0b51e2c","6816beb848ed75c1f30a629b","6816beb82306ab59f7e4dc18","6816beb8fa971d864e5b0c23","6816beb8194826f7e5d0c3ba","6816beb8f54e63a79dc1208b","6816beb8f971bd482c6a53e0","6816beb8b9e8315da47f26c0","6816beb81d379c8624af5e0b","6816beb856d9384bcf7ae120","6816beb8de89f3652ca071b4","6816beb80e865dabf4219c37","6816beb8a51972fb6ecd0384","6816beb8fe92d4a031c56b78","6816beb8d172ef95036abc84","6816beb82fc1b6d3e5a49078","6816beb85023df7c4ab198e6","6816beb828dce751ab36f049","6816beb896d514ab278fc03e","6816beb8a145e90b2c673f8d","6816beb8580e4c96b21f3a7d","6816beb80df5976e243ab8c1","6816beb82708b5a41d96ec3f","6816beb8857b9c43d2a160ef","6816beb8ca5d3268e9410bf7","6816beb80d9f482b6e571a3c","6816beb8029dbaef8574136c","6816beb801d8937ace4b265f","6816beb8e63f795b81c04d2a","6816beb8c726fe34d9a580b1","6816beb8573d8a9fe4061cb2","6816beb8c0b12f6983da5e74","6816beb83426dcf15a780b9e","6816beb82dac93e574f1b068","6816beb85d4f1cab7869230e","6816beb8b1e54a6cf378920d","6816beb8ae18f9b23d57c640","6816beb8e5a4f62d10bc7839","6816beb8d3e80cb56f129a74","6816beb85096e1d2f783bca4","6816beb8a7b28c6905fe3d14","6816beb864a3e5df89cb1207","6816beb839bf42ce510a7d68","6816beb88d47f1ecab592306","6816beb83ec1f967ba8d5042","6816beb8f0d74286ba1395ec","6816beb8e2698bca754f10d3","6816beb806c372a491ebd85f","6816beb870415fac2be3689d","6816beb8c80f9b6a5d347e12","6816beb8b37502ca6fe81d49","6816beb81a73d5c2b890e4f6","6816beb87c5ba0e6f91d2348","6816beb87189f6b405a2cd3e","6816beb86fe1803b79c25a4d","6816beb82b5e4a89371fdc06","6816beb8843c91e2b70da56f","6816beb8f7192c536d4be8a0","6816beb8a10ec5fb974d8362","6816beb8408b372af95de61c","6816beb8a34b7e209c5f16d8","6816beb8652c3b87ed4109fa","6816beb80ab85c36ef42719d","6816beb8987bf6435ecda210","6816beb842fb156987dc0e3a","6816beb84c6872b1d39e0f5a","6816beb8241f0c6897bd35ea","6816beb8278a1cd59be0f634","6816beb80983fdca5461b27e","6816beb865f13dcb89e7a024","6816beb8031bcf82a967e4d5","6816beb85901c48273b6efda","6816beb897a804523f61cdeb","6816beb8bc162e53d90a87f4","6816beb83dec546a09bf8127","6816beb816e84095ca273dfb","6816beb8a1397840fe652bcd","6816beb836c2f87de5b9104a","6816beb831e25c084fb79da6","6816beb843fb6ed851a07c92","6816beb8ad1e94c50386b7f2","6816beb81f03c7259ea86b4d","6816beb82f46ab87e59dc103","6816beb8acfd83549e1b0267","6816beb8752f4e13c986db0a","6816beb86958dc74201ebf3a","6816beb85fa760b1d93248ec","6816beb8e9f7231c6458da0b","6816beb8d7cef8a32b096514","6816beb8359e47081cbf6ad2","6816beb83d58fbe607c9a142","6816beb8356f0e2c419ab87d","6816beb8709ab813c5e6d42f","6816beb82e640fc78931bda5","6816beb88e62a50f19bd74c3","6816beb81e87a953fc4b62d0","6816beb8dbf5890ae76314c2","6816beb83a6bfc754e2d9108","6816beb81ad5c874f0b9e236","6816beb8102946dabf3ec578","6816beb84f3095b26a7ec18d","6816beb81fe87340c69bd52a","6816beb88edf2710b9ca4635","6816beb8cafed09468532b17","6816beb8628d4307c1fa95be","6816beb89243a7658de0c1bf","6816beb858769a4d12ebc0f3","6816beb85184f7c963e2a0db","6816beb8c4d5eb182a37096f");
                    itemConfig.blacklist.push("6816beb89aef4b352c8701d6","6816beb871b09465ad3efc82","6816beb85fc376e9b012da48","6816beb8d7b63ce01482af59","6816beb80e645fb792a183dc","6816beb851e6280ad379c4fb","6816beb841be398af5270d6c","6816beb8e914af7d836b502c","6816beb8fa94701c6b382e5d","6816beb876d9cb015a2f8e43","6816beb88e9b537f4da16c02","6816beb89b6207f4c1a38d5e","6816beb89b7e63d2c84f01a5","6816beb81d68a3cb0247f9e5","6816beb8ae69d485c271f3b0","6816beb839dcf8e6420b7a15","6816beb818f4269d5cea30b7","6816beb82130bcd49ae6f785","6816beb87c305a816bed49f2","6816beb8d38f0ae629c7514b","6816beb8b26ca97e413085df","6816beb8402f7b9ecd3a5618","6816beb8280ec5a63bdf4971","6816beb843df2b6958c0ea71","6816beb883cad594021feb67","6816beb80a6425cb198d7ef3","6816beb84b37efd952a0c618","6816beb806be7c5f8912a4d3","6816beb8d4f6973ea0c28b51","6816beb846fb8d9a251e37c0","6816beb80312f467c9bea8d5","6816beb826d54eb0f87ca913","6816beb8a135f724c8d06b9e","6816beb859d031b824cefa76","6816beb813b4de9cf28a5706","6816beb8c62df0a913e758b4","6816beb86298f4e30d7bca15","6816beb8d87c9e2a165b340f","6816beb8c29e68501df3a47b","6816beb85429ef71b38ac06d","6816beb872f94dc06a8b531e","6816beb8120af4deb8c35679","6816beb89bdc423507a6f1e8","6816beb88a73b5146dcfe290","6816beb85be0cf897d14236a","6816beb8e4cbf729a6d80153","6816beb8db5f9a80316c2e74","6816beb87f09ce5241d86a3b","6816beb8f06a73d98b2e15c4","6816beb8da95831eb6402fc7","6816beb8fc419e7a2d8305b6","6816beb87583c4ea1bd6f290","6816beb8f40573ad968be2c1","6816beb87eb49f18a563dc20","6816beb84175a83fc9d2be06","6816beb8a384dc16bf97052e","6816beb88a739c12045bedf6","6816beb8ca246579d031b8ef","6816beb870ba8d62fe4c3591","6816beb812a48ef976dc053b","6816beb883a4fe692cb01d57","6816beb815af2ed894670b3c","6816beb8b73ac9e201fd6845","6816beb8a179bf5604e3c8d2","6816beb8d8476f59a2b10c3e","6816beb870db5e6239c41fa8","6816beb89d652f7b048ce3a1","6816beb864ebcf2d0a375981","6816beb8a2fe41957bd683c0","6816beb876e92c53ad8410bf","6816beb860d84b357e2cf9a1","6816beb8fa4b3857d261e9c0","6816beb8523efd4c0976b81a","6816beb81bf95adc2436780e","6816beb80d7ab48f6c23195e","6816beb8c792ae3540df61b8","6816beb8463cf8b72e1590da","6816beb8bc5eadf360942178","6816beb8076854e1afb3d92c","6816beb8810fd9ecb375a246","6816beb8b785e2314c9fa6d0","6816beb8b785e2314cefefdd","6816beb815034f78ed6c92ba","6816beb88dacf09765b14e32","6816beb8a5dc819e0b7f4236","6816beb85edac810736f492b","6816beb8b2a70456e8f91d3c","6816beb84cb01286539dfa7e","6816beb8b9741cd0e8f3256a","6816beb846dfe05197823abc","6816beb8ba892d1e7340c5f6","6816beb89145ec0f87db63a2","6816beb8c6b98f031d74ae25","6816beb88f1d6c4b523a970e","6816beb8270981ce3f64da5b","6816beb8570a8df6c19eb324","6816beb8fbe7045a39126c8d","6816beb83b82d7e6c9af5041","6816beb8b29f051ac8ed4763","6816beb8c5d2a6739e48f01b","6816beb8cf803bde529a1467","6816beb8a6934f87d0b51e2c","6816beb848ed75c1f30a629b","6816beb82306ab59f7e4dc18","6816beb8fa971d864e5b0c23","6816beb8194826f7e5d0c3ba","6816beb8f54e63a79dc1208b","6816beb8f971bd482c6a53e0","6816beb8b9e8315da47f26c0","6816beb81d379c8624af5e0b","6816beb856d9384bcf7ae120","6816beb8de89f3652ca071b4","6816beb80e865dabf4219c37","6816beb8a51972fb6ecd0384","6816beb8fe92d4a031c56b78","6816beb8d172ef95036abc84","6816beb82fc1b6d3e5a49078","6816beb85023df7c4ab198e6","6816beb828dce751ab36f049","6816beb896d514ab278fc03e","6816beb8a145e90b2c673f8d","6816beb8580e4c96b21f3a7d","6816beb80df5976e243ab8c1","6816beb82708b5a41d96ec3f","6816beb8857b9c43d2a160ef","6816beb8ca5d3268e9410bf7","6816beb80d9f482b6e571a3c","6816beb8029dbaef8574136c","6816beb801d8937ace4b265f","6816beb8e63f795b81c04d2a","6816beb8c726fe34d9a580b1","6816beb8573d8a9fe4061cb2","6816beb8c0b12f6983da5e74","6816beb83426dcf15a780b9e","6816beb82dac93e574f1b068","6816beb85d4f1cab7869230e","6816beb8b1e54a6cf378920d","6816beb8ae18f9b23d57c640","6816beb8e5a4f62d10bc7839","6816beb8d3e80cb56f129a74","6816beb85096e1d2f783bca4","6816beb8a7b28c6905fe3d14","6816beb864a3e5df89cb1207","6816beb839bf42ce510a7d68","6816beb88d47f1ecab592306","6816beb83ec1f967ba8d5042","6816beb8f0d74286ba1395ec","6816beb8e2698bca754f10d3","6816beb806c372a491ebd85f","6816beb870415fac2be3689d","6816beb8c80f9b6a5d347e12","6816beb8b37502ca6fe81d49","6816beb81a73d5c2b890e4f6","6816beb87c5ba0e6f91d2348","6816beb87189f6b405a2cd3e","6816beb86fe1803b79c25a4d","6816beb82b5e4a89371fdc06","6816beb8843c91e2b70da56f","6816beb8f7192c536d4be8a0","6816beb8a10ec5fb974d8362","6816beb8408b372af95de61c","6816beb8a34b7e209c5f16d8","6816beb8652c3b87ed4109fa","6816beb80ab85c36ef42719d","6816beb8987bf6435ecda210","6816beb842fb156987dc0e3a","6816beb84c6872b1d39e0f5a","6816beb8241f0c6897bd35ea","6816beb8278a1cd59be0f634","6816beb80983fdca5461b27e","6816beb865f13dcb89e7a024","6816beb8031bcf82a967e4d5","6816beb85901c48273b6efda","6816beb897a804523f61cdeb","6816beb8bc162e53d90a87f4","6816beb83dec546a09bf8127","6816beb816e84095ca273dfb","6816beb8a1397840fe652bcd","6816beb836c2f87de5b9104a","6816beb831e25c084fb79da6","6816beb843fb6ed851a07c92","6816beb8ad1e94c50386b7f2","6816beb81f03c7259ea86b4d","6816beb82f46ab87e59dc103","6816beb8acfd83549e1b0267","6816beb8752f4e13c986db0a","6816beb86958dc74201ebf3a","6816beb85fa760b1d93248ec","6816beb8e9f7231c6458da0b","6816beb8d7cef8a32b096514","6816beb8359e47081cbf6ad2","6816beb83d58fbe607c9a142","6816beb8356f0e2c419ab87d","6816beb8709ab813c5e6d42f","6816beb82e640fc78931bda5","6816beb88e62a50f19bd74c3","6816beb81e87a953fc4b62d0","6816beb8dbf5890ae76314c2","6816beb83a6bfc754e2d9108","6816beb81ad5c874f0b9e236","6816beb8102946dabf3ec578","6816beb84f3095b26a7ec18d","6816beb81fe87340c69bd52a","6816beb88edf2710b9ca4635","6816beb8cafed09468532b17","6816beb8628d4307c1fa95be","6816beb89243a7658de0c1bf","6816beb858769a4d12ebc0f3","6816beb85184f7c963e2a0db","6816beb8c4d5eb182a37096f");
                }
            }
        } else {
            if ( MagsOnly === true ) {
                if (typeof blacklistMags === "boolean") {
                    if (blacklistMags === true) {
                        botConfig.equipment.pmc.blacklist[0].equipment.mod_magazine.push("6816beb89aef4b352c8701d6","6816beb871b09465ad3efc82","6816beb85fc376e9b012da48","6816beb8d7b63ce01482af59","6816beb80e645fb792a183dc","6816beb851e6280ad379c4fb","6816beb841be398af5270d6c","6816beb8e914af7d836b502c","6816beb8fa94701c6b382e5d","6816beb876d9cb015a2f8e43","6816beb88e9b537f4da16c02","6816beb89b6207f4c1a38d5e","6816beb89b7e63d2c84f01a5","6816beb81d68a3cb0247f9e5","6816beb8ae69d485c271f3b0","6816beb839dcf8e6420b7a15","6816beb818f4269d5cea30b7","6816beb82130bcd49ae6f785","6816beb87c305a816bed49f2","6816beb8d38f0ae629c7514b","6816beb8b26ca97e413085df","6816beb8402f7b9ecd3a5618","6816beb8280ec5a63bdf4971","6816beb843df2b6958c0ea71","6816beb883cad594021feb67","6816beb80a6425cb198d7ef3","6816beb84b37efd952a0c618","6816beb806be7c5f8912a4d3","6816beb8d4f6973ea0c28b51","6816beb846fb8d9a251e37c0","6816beb80312f467c9bea8d5","6816beb826d54eb0f87ca913","6816beb8a135f724c8d06b9e","6816beb859d031b824cefa76","6816beb813b4de9cf28a5706","6816beb8c62df0a913e758b4","6816beb86298f4e30d7bca15","6816beb8d87c9e2a165b340f","6816beb8c29e68501df3a47b","6816beb85429ef71b38ac06d","6816beb872f94dc06a8b531e","6816beb8120af4deb8c35679","6816beb89bdc423507a6f1e8","6816beb88a73b5146dcfe290","6816beb85be0cf897d14236a","6816beb8e4cbf729a6d80153","6816beb8db5f9a80316c2e74","6816beb87f09ce5241d86a3b","6816beb8f06a73d98b2e15c4","6816beb8da95831eb6402fc7","6816beb8fc419e7a2d8305b6","6816beb87583c4ea1bd6f290","6816beb8f40573ad968be2c1","6816beb87eb49f18a563dc20","6816beb84175a83fc9d2be06","6816beb8a384dc16bf97052e","6816beb88a739c12045bedf6","6816beb8ca246579d031b8ef","6816beb870ba8d62fe4c3591","6816beb812a48ef976dc053b","6816beb883a4fe692cb01d57","6816beb815af2ed894670b3c","6816beb8b73ac9e201fd6845","6816beb8a179bf5604e3c8d2","6816beb8d8476f59a2b10c3e","6816beb870db5e6239c41fa8","6816beb89d652f7b048ce3a1","6816beb864ebcf2d0a375981","6816beb8a2fe41957bd683c0","6816beb876e92c53ad8410bf","6816beb860d84b357e2cf9a1","6816beb8fa4b3857d261e9c0","6816beb8523efd4c0976b81a","6816beb81bf95adc2436780e","6816beb80d7ab48f6c23195e","6816beb8c792ae3540df61b8","6816beb8463cf8b72e1590da","6816beb8bc5eadf360942178","6816beb8076854e1afb3d92c","6816beb8810fd9ecb375a246","6816beb8b785e2314c9fa6d0","6816beb8b785e2314cefefdd","6816beb815034f78ed6c92ba","6816beb88dacf09765b14e32","6816beb8a5dc819e0b7f4236","6816beb85edac810736f492b","6816beb8b2a70456e8f91d3c","6816beb84cb01286539dfa7e","6816beb8b9741cd0e8f3256a","6816beb846dfe05197823abc","6816beb8ba892d1e7340c5f6","6816beb89145ec0f87db63a2","6816beb8c6b98f031d74ae25","6816beb88f1d6c4b523a970e","6816beb8270981ce3f64da5b","6816beb8570a8df6c19eb324","6816beb8fbe7045a39126c8d","6816beb83b82d7e6c9af5041","6816beb8b29f051ac8ed4763","6816beb8c5d2a6739e48f01b","6816beb8cf803bde529a1467","6816beb8a6934f87d0b51e2c","6816beb848ed75c1f30a629b","6816beb82306ab59f7e4dc18","6816beb8fa971d864e5b0c23","6816beb8194826f7e5d0c3ba","6816beb8f54e63a79dc1208b","6816beb8f971bd482c6a53e0","6816beb8b9e8315da47f26c0","6816beb81d379c8624af5e0b","6816beb856d9384bcf7ae120","6816beb8de89f3652ca071b4","6816beb80e865dabf4219c37","6816beb8a51972fb6ecd0384","6816beb8fe92d4a031c56b78","6816beb8d172ef95036abc84","6816beb82fc1b6d3e5a49078","6816beb85023df7c4ab198e6","6816beb828dce751ab36f049","6816beb896d514ab278fc03e","6816beb8a145e90b2c673f8d","6816beb8580e4c96b21f3a7d","6816beb80df5976e243ab8c1","6816beb82708b5a41d96ec3f","6816beb8857b9c43d2a160ef","6816beb8ca5d3268e9410bf7","6816beb80d9f482b6e571a3c","6816beb8029dbaef8574136c","6816beb801d8937ace4b265f","6816beb8e63f795b81c04d2a","6816beb8c726fe34d9a580b1","6816beb8573d8a9fe4061cb2","6816beb8c0b12f6983da5e74","6816beb83426dcf15a780b9e","6816beb82dac93e574f1b068","6816beb85d4f1cab7869230e","6816beb8b1e54a6cf378920d","6816beb8ae18f9b23d57c640","6816beb8e5a4f62d10bc7839","6816beb8d3e80cb56f129a74","6816beb85096e1d2f783bca4","6816beb8a7b28c6905fe3d14","6816beb864a3e5df89cb1207","6816beb839bf42ce510a7d68","6816beb88d47f1ecab592306","6816beb83ec1f967ba8d5042","6816beb8f0d74286ba1395ec","6816beb8e2698bca754f10d3","6816beb806c372a491ebd85f","6816beb870415fac2be3689d","6816beb8c80f9b6a5d347e12","6816beb8b37502ca6fe81d49","6816beb81a73d5c2b890e4f6","6816beb87c5ba0e6f91d2348","6816beb87189f6b405a2cd3e","6816beb86fe1803b79c25a4d","6816beb82b5e4a89371fdc06","6816beb8843c91e2b70da56f","6816beb8f7192c536d4be8a0","6816beb8a10ec5fb974d8362","6816beb8408b372af95de61c","6816beb8a34b7e209c5f16d8","6816beb8652c3b87ed4109fa","6816beb80ab85c36ef42719d","6816beb8987bf6435ecda210","6816beb842fb156987dc0e3a","6816beb84c6872b1d39e0f5a","6816beb8241f0c6897bd35ea","6816beb8278a1cd59be0f634","6816beb80983fdca5461b27e","6816beb865f13dcb89e7a024","6816beb8031bcf82a967e4d5","6816beb85901c48273b6efda","6816beb897a804523f61cdeb","6816beb8bc162e53d90a87f4","6816beb83dec546a09bf8127","6816beb816e84095ca273dfb","6816beb8a1397840fe652bcd","6816beb836c2f87de5b9104a","6816beb831e25c084fb79da6","6816beb843fb6ed851a07c92","6816beb8ad1e94c50386b7f2","6816beb81f03c7259ea86b4d","6816beb82f46ab87e59dc103","6816beb8acfd83549e1b0267","6816beb8752f4e13c986db0a","6816beb86958dc74201ebf3a","6816beb85fa760b1d93248ec","6816beb8e9f7231c6458da0b","6816beb8d7cef8a32b096514","6816beb8359e47081cbf6ad2","6816beb83d58fbe607c9a142","6816beb8356f0e2c419ab87d","6816beb8709ab813c5e6d42f","6816beb82e640fc78931bda5","6816beb88e62a50f19bd74c3","6816beb81e87a953fc4b62d0","6816beb8dbf5890ae76314c2","6816beb83a6bfc754e2d9108","6816beb81ad5c874f0b9e236","6816beb8102946dabf3ec578","6816beb84f3095b26a7ec18d","6816beb81fe87340c69bd52a","6816beb88edf2710b9ca4635","6816beb8cafed09468532b17","6816beb8628d4307c1fa95be","6816beb89243a7658de0c1bf","6816beb858769a4d12ebc0f3","6816beb85184f7c963e2a0db","6816beb8c4d5eb182a37096f");
                        pmcConfig.vestLoot.blacklist.push("6816beb89aef4b352c8701d6","6816beb871b09465ad3efc82","6816beb85fc376e9b012da48","6816beb8d7b63ce01482af59","6816beb80e645fb792a183dc","6816beb851e6280ad379c4fb","6816beb841be398af5270d6c","6816beb8e914af7d836b502c","6816beb8fa94701c6b382e5d","6816beb876d9cb015a2f8e43","6816beb88e9b537f4da16c02","6816beb89b6207f4c1a38d5e","6816beb89b7e63d2c84f01a5","6816beb81d68a3cb0247f9e5","6816beb8ae69d485c271f3b0","6816beb839dcf8e6420b7a15","6816beb818f4269d5cea30b7","6816beb82130bcd49ae6f785","6816beb87c305a816bed49f2","6816beb8d38f0ae629c7514b","6816beb8b26ca97e413085df","6816beb8402f7b9ecd3a5618","6816beb8280ec5a63bdf4971","6816beb843df2b6958c0ea71","6816beb883cad594021feb67","6816beb80a6425cb198d7ef3","6816beb84b37efd952a0c618","6816beb806be7c5f8912a4d3","6816beb8d4f6973ea0c28b51","6816beb846fb8d9a251e37c0","6816beb80312f467c9bea8d5","6816beb826d54eb0f87ca913","6816beb8a135f724c8d06b9e","6816beb859d031b824cefa76","6816beb813b4de9cf28a5706","6816beb8c62df0a913e758b4","6816beb86298f4e30d7bca15","6816beb8d87c9e2a165b340f","6816beb8c29e68501df3a47b","6816beb85429ef71b38ac06d","6816beb872f94dc06a8b531e","6816beb8120af4deb8c35679","6816beb89bdc423507a6f1e8","6816beb88a73b5146dcfe290","6816beb85be0cf897d14236a","6816beb8e4cbf729a6d80153","6816beb8db5f9a80316c2e74","6816beb87f09ce5241d86a3b","6816beb8f06a73d98b2e15c4","6816beb8da95831eb6402fc7","6816beb8fc419e7a2d8305b6","6816beb87583c4ea1bd6f290","6816beb8f40573ad968be2c1","6816beb87eb49f18a563dc20","6816beb84175a83fc9d2be06","6816beb8a384dc16bf97052e","6816beb88a739c12045bedf6","6816beb8ca246579d031b8ef","6816beb870ba8d62fe4c3591","6816beb812a48ef976dc053b","6816beb883a4fe692cb01d57","6816beb815af2ed894670b3c","6816beb8b73ac9e201fd6845","6816beb8a179bf5604e3c8d2","6816beb8d8476f59a2b10c3e","6816beb870db5e6239c41fa8","6816beb89d652f7b048ce3a1","6816beb864ebcf2d0a375981","6816beb8a2fe41957bd683c0","6816beb876e92c53ad8410bf","6816beb860d84b357e2cf9a1","6816beb8fa4b3857d261e9c0","6816beb8523efd4c0976b81a","6816beb81bf95adc2436780e","6816beb80d7ab48f6c23195e","6816beb8c792ae3540df61b8","6816beb8463cf8b72e1590da","6816beb8bc5eadf360942178","6816beb8076854e1afb3d92c","6816beb8810fd9ecb375a246","6816beb8b785e2314c9fa6d0","6816beb8b785e2314cefefdd","6816beb815034f78ed6c92ba","6816beb88dacf09765b14e32","6816beb8a5dc819e0b7f4236","6816beb85edac810736f492b","6816beb8b2a70456e8f91d3c","6816beb84cb01286539dfa7e","6816beb8b9741cd0e8f3256a","6816beb846dfe05197823abc","6816beb8ba892d1e7340c5f6","6816beb89145ec0f87db63a2","6816beb8c6b98f031d74ae25","6816beb88f1d6c4b523a970e","6816beb8270981ce3f64da5b","6816beb8570a8df6c19eb324","6816beb8fbe7045a39126c8d","6816beb83b82d7e6c9af5041","6816beb8b29f051ac8ed4763","6816beb8c5d2a6739e48f01b","6816beb8cf803bde529a1467","6816beb8a6934f87d0b51e2c","6816beb848ed75c1f30a629b","6816beb82306ab59f7e4dc18","6816beb8fa971d864e5b0c23","6816beb8194826f7e5d0c3ba","6816beb8f54e63a79dc1208b","6816beb8f971bd482c6a53e0","6816beb8b9e8315da47f26c0","6816beb81d379c8624af5e0b","6816beb856d9384bcf7ae120","6816beb8de89f3652ca071b4","6816beb80e865dabf4219c37","6816beb8a51972fb6ecd0384","6816beb8fe92d4a031c56b78","6816beb8d172ef95036abc84","6816beb82fc1b6d3e5a49078","6816beb85023df7c4ab198e6","6816beb828dce751ab36f049","6816beb896d514ab278fc03e","6816beb8a145e90b2c673f8d","6816beb8580e4c96b21f3a7d","6816beb80df5976e243ab8c1","6816beb82708b5a41d96ec3f","6816beb8857b9c43d2a160ef","6816beb8ca5d3268e9410bf7","6816beb80d9f482b6e571a3c","6816beb8029dbaef8574136c","6816beb801d8937ace4b265f","6816beb8e63f795b81c04d2a","6816beb8c726fe34d9a580b1","6816beb8573d8a9fe4061cb2","6816beb8c0b12f6983da5e74","6816beb83426dcf15a780b9e","6816beb82dac93e574f1b068","6816beb85d4f1cab7869230e","6816beb8b1e54a6cf378920d","6816beb8ae18f9b23d57c640","6816beb8e5a4f62d10bc7839","6816beb8d3e80cb56f129a74","6816beb85096e1d2f783bca4","6816beb8a7b28c6905fe3d14","6816beb864a3e5df89cb1207","6816beb839bf42ce510a7d68","6816beb88d47f1ecab592306","6816beb83ec1f967ba8d5042","6816beb8f0d74286ba1395ec","6816beb8e2698bca754f10d3","6816beb806c372a491ebd85f","6816beb870415fac2be3689d","6816beb8c80f9b6a5d347e12","6816beb8b37502ca6fe81d49","6816beb81a73d5c2b890e4f6","6816beb87c5ba0e6f91d2348","6816beb87189f6b405a2cd3e","6816beb86fe1803b79c25a4d","6816beb82b5e4a89371fdc06","6816beb8843c91e2b70da56f","6816beb8f7192c536d4be8a0","6816beb8a10ec5fb974d8362","6816beb8408b372af95de61c","6816beb8a34b7e209c5f16d8","6816beb8652c3b87ed4109fa","6816beb80ab85c36ef42719d","6816beb8987bf6435ecda210","6816beb842fb156987dc0e3a","6816beb84c6872b1d39e0f5a","6816beb8241f0c6897bd35ea","6816beb8278a1cd59be0f634","6816beb80983fdca5461b27e","6816beb865f13dcb89e7a024","6816beb8031bcf82a967e4d5","6816beb85901c48273b6efda","6816beb897a804523f61cdeb","6816beb8bc162e53d90a87f4","6816beb83dec546a09bf8127","6816beb816e84095ca273dfb","6816beb8a1397840fe652bcd","6816beb836c2f87de5b9104a","6816beb831e25c084fb79da6","6816beb843fb6ed851a07c92","6816beb8ad1e94c50386b7f2","6816beb81f03c7259ea86b4d","6816beb82f46ab87e59dc103","6816beb8acfd83549e1b0267","6816beb8752f4e13c986db0a","6816beb86958dc74201ebf3a","6816beb85fa760b1d93248ec","6816beb8e9f7231c6458da0b","6816beb8d7cef8a32b096514","6816beb8359e47081cbf6ad2","6816beb83d58fbe607c9a142","6816beb8356f0e2c419ab87d","6816beb8709ab813c5e6d42f","6816beb82e640fc78931bda5","6816beb88e62a50f19bd74c3","6816beb81e87a953fc4b62d0","6816beb8dbf5890ae76314c2","6816beb83a6bfc754e2d9108","6816beb81ad5c874f0b9e236","6816beb8102946dabf3ec578","6816beb84f3095b26a7ec18d","6816beb81fe87340c69bd52a","6816beb88edf2710b9ca4635","6816beb8cafed09468532b17","6816beb8628d4307c1fa95be","6816beb89243a7658de0c1bf","6816beb858769a4d12ebc0f3","6816beb85184f7c963e2a0db","6816beb8c4d5eb182a37096f");
                        pmcConfig.pocketLoot.blacklist.push("6816beb89aef4b352c8701d6","6816beb871b09465ad3efc82","6816beb85fc376e9b012da48","6816beb8d7b63ce01482af59","6816beb80e645fb792a183dc","6816beb851e6280ad379c4fb","6816beb841be398af5270d6c","6816beb8e914af7d836b502c","6816beb8fa94701c6b382e5d","6816beb876d9cb015a2f8e43","6816beb88e9b537f4da16c02","6816beb89b6207f4c1a38d5e","6816beb89b7e63d2c84f01a5","6816beb81d68a3cb0247f9e5","6816beb8ae69d485c271f3b0","6816beb839dcf8e6420b7a15","6816beb818f4269d5cea30b7","6816beb82130bcd49ae6f785","6816beb87c305a816bed49f2","6816beb8d38f0ae629c7514b","6816beb8b26ca97e413085df","6816beb8402f7b9ecd3a5618","6816beb8280ec5a63bdf4971","6816beb843df2b6958c0ea71","6816beb883cad594021feb67","6816beb80a6425cb198d7ef3","6816beb84b37efd952a0c618","6816beb806be7c5f8912a4d3","6816beb8d4f6973ea0c28b51","6816beb846fb8d9a251e37c0","6816beb80312f467c9bea8d5","6816beb826d54eb0f87ca913","6816beb8a135f724c8d06b9e","6816beb859d031b824cefa76","6816beb813b4de9cf28a5706","6816beb8c62df0a913e758b4","6816beb86298f4e30d7bca15","6816beb8d87c9e2a165b340f","6816beb8c29e68501df3a47b","6816beb85429ef71b38ac06d","6816beb872f94dc06a8b531e","6816beb8120af4deb8c35679","6816beb89bdc423507a6f1e8","6816beb88a73b5146dcfe290","6816beb85be0cf897d14236a","6816beb8e4cbf729a6d80153","6816beb8db5f9a80316c2e74","6816beb87f09ce5241d86a3b","6816beb8f06a73d98b2e15c4","6816beb8da95831eb6402fc7","6816beb8fc419e7a2d8305b6","6816beb87583c4ea1bd6f290","6816beb8f40573ad968be2c1","6816beb87eb49f18a563dc20","6816beb84175a83fc9d2be06","6816beb8a384dc16bf97052e","6816beb88a739c12045bedf6","6816beb8ca246579d031b8ef","6816beb870ba8d62fe4c3591","6816beb812a48ef976dc053b","6816beb883a4fe692cb01d57","6816beb815af2ed894670b3c","6816beb8b73ac9e201fd6845","6816beb8a179bf5604e3c8d2","6816beb8d8476f59a2b10c3e","6816beb870db5e6239c41fa8","6816beb89d652f7b048ce3a1","6816beb864ebcf2d0a375981","6816beb8a2fe41957bd683c0","6816beb876e92c53ad8410bf","6816beb860d84b357e2cf9a1","6816beb8fa4b3857d261e9c0","6816beb8523efd4c0976b81a","6816beb81bf95adc2436780e","6816beb80d7ab48f6c23195e","6816beb8c792ae3540df61b8","6816beb8463cf8b72e1590da","6816beb8bc5eadf360942178","6816beb8076854e1afb3d92c","6816beb8810fd9ecb375a246","6816beb8b785e2314c9fa6d0","6816beb8b785e2314cefefdd","6816beb815034f78ed6c92ba","6816beb88dacf09765b14e32","6816beb8a5dc819e0b7f4236","6816beb85edac810736f492b","6816beb8b2a70456e8f91d3c","6816beb84cb01286539dfa7e","6816beb8b9741cd0e8f3256a","6816beb846dfe05197823abc","6816beb8ba892d1e7340c5f6","6816beb89145ec0f87db63a2","6816beb8c6b98f031d74ae25","6816beb88f1d6c4b523a970e","6816beb8270981ce3f64da5b","6816beb8570a8df6c19eb324","6816beb8fbe7045a39126c8d","6816beb83b82d7e6c9af5041","6816beb8b29f051ac8ed4763","6816beb8c5d2a6739e48f01b","6816beb8cf803bde529a1467","6816beb8a6934f87d0b51e2c","6816beb848ed75c1f30a629b","6816beb82306ab59f7e4dc18","6816beb8fa971d864e5b0c23","6816beb8194826f7e5d0c3ba","6816beb8f54e63a79dc1208b","6816beb8f971bd482c6a53e0","6816beb8b9e8315da47f26c0","6816beb81d379c8624af5e0b","6816beb856d9384bcf7ae120","6816beb8de89f3652ca071b4","6816beb80e865dabf4219c37","6816beb8a51972fb6ecd0384","6816beb8fe92d4a031c56b78","6816beb8d172ef95036abc84","6816beb82fc1b6d3e5a49078","6816beb85023df7c4ab198e6","6816beb828dce751ab36f049","6816beb896d514ab278fc03e","6816beb8a145e90b2c673f8d","6816beb8580e4c96b21f3a7d","6816beb80df5976e243ab8c1","6816beb82708b5a41d96ec3f","6816beb8857b9c43d2a160ef","6816beb8ca5d3268e9410bf7","6816beb80d9f482b6e571a3c","6816beb8029dbaef8574136c","6816beb801d8937ace4b265f","6816beb8e63f795b81c04d2a","6816beb8c726fe34d9a580b1","6816beb8573d8a9fe4061cb2","6816beb8c0b12f6983da5e74","6816beb83426dcf15a780b9e","6816beb82dac93e574f1b068","6816beb85d4f1cab7869230e","6816beb8b1e54a6cf378920d","6816beb8ae18f9b23d57c640","6816beb8e5a4f62d10bc7839","6816beb8d3e80cb56f129a74","6816beb85096e1d2f783bca4","6816beb8a7b28c6905fe3d14","6816beb864a3e5df89cb1207","6816beb839bf42ce510a7d68","6816beb88d47f1ecab592306","6816beb83ec1f967ba8d5042","6816beb8f0d74286ba1395ec","6816beb8e2698bca754f10d3","6816beb806c372a491ebd85f","6816beb870415fac2be3689d","6816beb8c80f9b6a5d347e12","6816beb8b37502ca6fe81d49","6816beb81a73d5c2b890e4f6","6816beb87c5ba0e6f91d2348","6816beb87189f6b405a2cd3e","6816beb86fe1803b79c25a4d","6816beb82b5e4a89371fdc06","6816beb8843c91e2b70da56f","6816beb8f7192c536d4be8a0","6816beb8a10ec5fb974d8362","6816beb8408b372af95de61c","6816beb8a34b7e209c5f16d8","6816beb8652c3b87ed4109fa","6816beb80ab85c36ef42719d","6816beb8987bf6435ecda210","6816beb842fb156987dc0e3a","6816beb84c6872b1d39e0f5a","6816beb8241f0c6897bd35ea","6816beb8278a1cd59be0f634","6816beb80983fdca5461b27e","6816beb865f13dcb89e7a024","6816beb8031bcf82a967e4d5","6816beb85901c48273b6efda","6816beb897a804523f61cdeb","6816beb8bc162e53d90a87f4","6816beb83dec546a09bf8127","6816beb816e84095ca273dfb","6816beb8a1397840fe652bcd","6816beb836c2f87de5b9104a","6816beb831e25c084fb79da6","6816beb843fb6ed851a07c92","6816beb8ad1e94c50386b7f2","6816beb81f03c7259ea86b4d","6816beb82f46ab87e59dc103","6816beb8acfd83549e1b0267","6816beb8752f4e13c986db0a","6816beb86958dc74201ebf3a","6816beb85fa760b1d93248ec","6816beb8e9f7231c6458da0b","6816beb8d7cef8a32b096514","6816beb8359e47081cbf6ad2","6816beb83d58fbe607c9a142","6816beb8356f0e2c419ab87d","6816beb8709ab813c5e6d42f","6816beb82e640fc78931bda5","6816beb88e62a50f19bd74c3","6816beb81e87a953fc4b62d0","6816beb8dbf5890ae76314c2","6816beb83a6bfc754e2d9108","6816beb81ad5c874f0b9e236","6816beb8102946dabf3ec578","6816beb84f3095b26a7ec18d","6816beb81fe87340c69bd52a","6816beb88edf2710b9ca4635","6816beb8cafed09468532b17","6816beb8628d4307c1fa95be","6816beb89243a7658de0c1bf","6816beb858769a4d12ebc0f3","6816beb85184f7c963e2a0db","6816beb8c4d5eb182a37096f");
                        pmcConfig.backpackLoot.blacklist.push("6816beb89aef4b352c8701d6","6816beb871b09465ad3efc82","6816beb85fc376e9b012da48","6816beb8d7b63ce01482af59","6816beb80e645fb792a183dc","6816beb851e6280ad379c4fb","6816beb841be398af5270d6c","6816beb8e914af7d836b502c","6816beb8fa94701c6b382e5d","6816beb876d9cb015a2f8e43","6816beb88e9b537f4da16c02","6816beb89b6207f4c1a38d5e","6816beb89b7e63d2c84f01a5","6816beb81d68a3cb0247f9e5","6816beb8ae69d485c271f3b0","6816beb839dcf8e6420b7a15","6816beb818f4269d5cea30b7","6816beb82130bcd49ae6f785","6816beb87c305a816bed49f2","6816beb8d38f0ae629c7514b","6816beb8b26ca97e413085df","6816beb8402f7b9ecd3a5618","6816beb8280ec5a63bdf4971","6816beb843df2b6958c0ea71","6816beb883cad594021feb67","6816beb80a6425cb198d7ef3","6816beb84b37efd952a0c618","6816beb806be7c5f8912a4d3","6816beb8d4f6973ea0c28b51","6816beb846fb8d9a251e37c0","6816beb80312f467c9bea8d5","6816beb826d54eb0f87ca913","6816beb8a135f724c8d06b9e","6816beb859d031b824cefa76","6816beb813b4de9cf28a5706","6816beb8c62df0a913e758b4","6816beb86298f4e30d7bca15","6816beb8d87c9e2a165b340f","6816beb8c29e68501df3a47b","6816beb85429ef71b38ac06d","6816beb872f94dc06a8b531e","6816beb8120af4deb8c35679","6816beb89bdc423507a6f1e8","6816beb88a73b5146dcfe290","6816beb85be0cf897d14236a","6816beb8e4cbf729a6d80153","6816beb8db5f9a80316c2e74","6816beb87f09ce5241d86a3b","6816beb8f06a73d98b2e15c4","6816beb8da95831eb6402fc7","6816beb8fc419e7a2d8305b6","6816beb87583c4ea1bd6f290","6816beb8f40573ad968be2c1","6816beb87eb49f18a563dc20","6816beb84175a83fc9d2be06","6816beb8a384dc16bf97052e","6816beb88a739c12045bedf6","6816beb8ca246579d031b8ef","6816beb870ba8d62fe4c3591","6816beb812a48ef976dc053b","6816beb883a4fe692cb01d57","6816beb815af2ed894670b3c","6816beb8b73ac9e201fd6845","6816beb8a179bf5604e3c8d2","6816beb8d8476f59a2b10c3e","6816beb870db5e6239c41fa8","6816beb89d652f7b048ce3a1","6816beb864ebcf2d0a375981","6816beb8a2fe41957bd683c0","6816beb876e92c53ad8410bf","6816beb860d84b357e2cf9a1","6816beb8fa4b3857d261e9c0","6816beb8523efd4c0976b81a","6816beb81bf95adc2436780e","6816beb80d7ab48f6c23195e","6816beb8c792ae3540df61b8","6816beb8463cf8b72e1590da","6816beb8bc5eadf360942178","6816beb8076854e1afb3d92c","6816beb8810fd9ecb375a246","6816beb8b785e2314c9fa6d0","6816beb8b785e2314cefefdd","6816beb815034f78ed6c92ba","6816beb88dacf09765b14e32","6816beb8a5dc819e0b7f4236","6816beb85edac810736f492b","6816beb8b2a70456e8f91d3c","6816beb84cb01286539dfa7e","6816beb8b9741cd0e8f3256a","6816beb846dfe05197823abc","6816beb8ba892d1e7340c5f6","6816beb89145ec0f87db63a2","6816beb8c6b98f031d74ae25","6816beb88f1d6c4b523a970e","6816beb8270981ce3f64da5b","6816beb8570a8df6c19eb324","6816beb8fbe7045a39126c8d","6816beb83b82d7e6c9af5041","6816beb8b29f051ac8ed4763","6816beb8c5d2a6739e48f01b","6816beb8cf803bde529a1467","6816beb8a6934f87d0b51e2c","6816beb848ed75c1f30a629b","6816beb82306ab59f7e4dc18","6816beb8fa971d864e5b0c23","6816beb8194826f7e5d0c3ba","6816beb8f54e63a79dc1208b","6816beb8f971bd482c6a53e0","6816beb8b9e8315da47f26c0","6816beb81d379c8624af5e0b","6816beb856d9384bcf7ae120","6816beb8de89f3652ca071b4","6816beb80e865dabf4219c37","6816beb8a51972fb6ecd0384","6816beb8fe92d4a031c56b78","6816beb8d172ef95036abc84","6816beb82fc1b6d3e5a49078","6816beb85023df7c4ab198e6","6816beb828dce751ab36f049","6816beb896d514ab278fc03e","6816beb8a145e90b2c673f8d","6816beb8580e4c96b21f3a7d","6816beb80df5976e243ab8c1","6816beb82708b5a41d96ec3f","6816beb8857b9c43d2a160ef","6816beb8ca5d3268e9410bf7","6816beb80d9f482b6e571a3c","6816beb8029dbaef8574136c","6816beb801d8937ace4b265f","6816beb8e63f795b81c04d2a","6816beb8c726fe34d9a580b1","6816beb8573d8a9fe4061cb2","6816beb8c0b12f6983da5e74","6816beb83426dcf15a780b9e","6816beb82dac93e574f1b068","6816beb85d4f1cab7869230e","6816beb8b1e54a6cf378920d","6816beb8ae18f9b23d57c640","6816beb8e5a4f62d10bc7839","6816beb8d3e80cb56f129a74","6816beb85096e1d2f783bca4","6816beb8a7b28c6905fe3d14","6816beb864a3e5df89cb1207","6816beb839bf42ce510a7d68","6816beb88d47f1ecab592306","6816beb83ec1f967ba8d5042","6816beb8f0d74286ba1395ec","6816beb8e2698bca754f10d3","6816beb806c372a491ebd85f","6816beb870415fac2be3689d","6816beb8c80f9b6a5d347e12","6816beb8b37502ca6fe81d49","6816beb81a73d5c2b890e4f6","6816beb87c5ba0e6f91d2348","6816beb87189f6b405a2cd3e","6816beb86fe1803b79c25a4d","6816beb82b5e4a89371fdc06","6816beb8843c91e2b70da56f","6816beb8f7192c536d4be8a0","6816beb8a10ec5fb974d8362","6816beb8408b372af95de61c","6816beb8a34b7e209c5f16d8","6816beb8652c3b87ed4109fa","6816beb80ab85c36ef42719d","6816beb8987bf6435ecda210","6816beb842fb156987dc0e3a","6816beb84c6872b1d39e0f5a","6816beb8241f0c6897bd35ea","6816beb8278a1cd59be0f634","6816beb80983fdca5461b27e","6816beb865f13dcb89e7a024","6816beb8031bcf82a967e4d5","6816beb85901c48273b6efda","6816beb897a804523f61cdeb","6816beb8bc162e53d90a87f4","6816beb83dec546a09bf8127","6816beb816e84095ca273dfb","6816beb8a1397840fe652bcd","6816beb836c2f87de5b9104a","6816beb831e25c084fb79da6","6816beb843fb6ed851a07c92","6816beb8ad1e94c50386b7f2","6816beb81f03c7259ea86b4d","6816beb82f46ab87e59dc103","6816beb8acfd83549e1b0267","6816beb8752f4e13c986db0a","6816beb86958dc74201ebf3a","6816beb85fa760b1d93248ec","6816beb8e9f7231c6458da0b","6816beb8d7cef8a32b096514","6816beb8359e47081cbf6ad2","6816beb83d58fbe607c9a142","6816beb8356f0e2c419ab87d","6816beb8709ab813c5e6d42f","6816beb82e640fc78931bda5","6816beb88e62a50f19bd74c3","6816beb81e87a953fc4b62d0","6816beb8dbf5890ae76314c2","6816beb83a6bfc754e2d9108","6816beb81ad5c874f0b9e236","6816beb8102946dabf3ec578","6816beb84f3095b26a7ec18d","6816beb81fe87340c69bd52a","6816beb88edf2710b9ca4635","6816beb8cafed09468532b17","6816beb8628d4307c1fa95be","6816beb89243a7658de0c1bf","6816beb858769a4d12ebc0f3","6816beb85184f7c963e2a0db","6816beb8c4d5eb182a37096f");
                        itemConfig.blacklist.push("6816beb89aef4b352c8701d6","6816beb871b09465ad3efc82","6816beb85fc376e9b012da48","6816beb8d7b63ce01482af59","6816beb80e645fb792a183dc","6816beb851e6280ad379c4fb","6816beb841be398af5270d6c","6816beb8e914af7d836b502c","6816beb8fa94701c6b382e5d","6816beb876d9cb015a2f8e43","6816beb88e9b537f4da16c02","6816beb89b6207f4c1a38d5e","6816beb89b7e63d2c84f01a5","6816beb81d68a3cb0247f9e5","6816beb8ae69d485c271f3b0","6816beb839dcf8e6420b7a15","6816beb818f4269d5cea30b7","6816beb82130bcd49ae6f785","6816beb87c305a816bed49f2","6816beb8d38f0ae629c7514b","6816beb8b26ca97e413085df","6816beb8402f7b9ecd3a5618","6816beb8280ec5a63bdf4971","6816beb843df2b6958c0ea71","6816beb883cad594021feb67","6816beb80a6425cb198d7ef3","6816beb84b37efd952a0c618","6816beb806be7c5f8912a4d3","6816beb8d4f6973ea0c28b51","6816beb846fb8d9a251e37c0","6816beb80312f467c9bea8d5","6816beb826d54eb0f87ca913","6816beb8a135f724c8d06b9e","6816beb859d031b824cefa76","6816beb813b4de9cf28a5706","6816beb8c62df0a913e758b4","6816beb86298f4e30d7bca15","6816beb8d87c9e2a165b340f","6816beb8c29e68501df3a47b","6816beb85429ef71b38ac06d","6816beb872f94dc06a8b531e","6816beb8120af4deb8c35679","6816beb89bdc423507a6f1e8","6816beb88a73b5146dcfe290","6816beb85be0cf897d14236a","6816beb8e4cbf729a6d80153","6816beb8db5f9a80316c2e74","6816beb87f09ce5241d86a3b","6816beb8f06a73d98b2e15c4","6816beb8da95831eb6402fc7","6816beb8fc419e7a2d8305b6","6816beb87583c4ea1bd6f290","6816beb8f40573ad968be2c1","6816beb87eb49f18a563dc20","6816beb84175a83fc9d2be06","6816beb8a384dc16bf97052e","6816beb88a739c12045bedf6","6816beb8ca246579d031b8ef","6816beb870ba8d62fe4c3591","6816beb812a48ef976dc053b","6816beb883a4fe692cb01d57","6816beb815af2ed894670b3c","6816beb8b73ac9e201fd6845","6816beb8a179bf5604e3c8d2","6816beb8d8476f59a2b10c3e","6816beb870db5e6239c41fa8","6816beb89d652f7b048ce3a1","6816beb864ebcf2d0a375981","6816beb8a2fe41957bd683c0","6816beb876e92c53ad8410bf","6816beb860d84b357e2cf9a1","6816beb8fa4b3857d261e9c0","6816beb8523efd4c0976b81a","6816beb81bf95adc2436780e","6816beb80d7ab48f6c23195e","6816beb8c792ae3540df61b8","6816beb8463cf8b72e1590da","6816beb8bc5eadf360942178","6816beb8076854e1afb3d92c","6816beb8810fd9ecb375a246","6816beb8b785e2314c9fa6d0","6816beb8b785e2314cefefdd","6816beb815034f78ed6c92ba","6816beb88dacf09765b14e32","6816beb8a5dc819e0b7f4236","6816beb85edac810736f492b","6816beb8b2a70456e8f91d3c","6816beb84cb01286539dfa7e","6816beb8b9741cd0e8f3256a","6816beb846dfe05197823abc","6816beb8ba892d1e7340c5f6","6816beb89145ec0f87db63a2","6816beb8c6b98f031d74ae25","6816beb88f1d6c4b523a970e","6816beb8270981ce3f64da5b","6816beb8570a8df6c19eb324","6816beb8fbe7045a39126c8d","6816beb83b82d7e6c9af5041","6816beb8b29f051ac8ed4763","6816beb8c5d2a6739e48f01b","6816beb8cf803bde529a1467","6816beb8a6934f87d0b51e2c","6816beb848ed75c1f30a629b","6816beb82306ab59f7e4dc18","6816beb8fa971d864e5b0c23","6816beb8194826f7e5d0c3ba","6816beb8f54e63a79dc1208b","6816beb8f971bd482c6a53e0","6816beb8b9e8315da47f26c0","6816beb81d379c8624af5e0b","6816beb856d9384bcf7ae120","6816beb8de89f3652ca071b4","6816beb80e865dabf4219c37","6816beb8a51972fb6ecd0384","6816beb8fe92d4a031c56b78","6816beb8d172ef95036abc84","6816beb82fc1b6d3e5a49078","6816beb85023df7c4ab198e6","6816beb828dce751ab36f049","6816beb896d514ab278fc03e","6816beb8a145e90b2c673f8d","6816beb8580e4c96b21f3a7d","6816beb80df5976e243ab8c1","6816beb82708b5a41d96ec3f","6816beb8857b9c43d2a160ef","6816beb8ca5d3268e9410bf7","6816beb80d9f482b6e571a3c","6816beb8029dbaef8574136c","6816beb801d8937ace4b265f","6816beb8e63f795b81c04d2a","6816beb8c726fe34d9a580b1","6816beb8573d8a9fe4061cb2","6816beb8c0b12f6983da5e74","6816beb83426dcf15a780b9e","6816beb82dac93e574f1b068","6816beb85d4f1cab7869230e","6816beb8b1e54a6cf378920d","6816beb8ae18f9b23d57c640","6816beb8e5a4f62d10bc7839","6816beb8d3e80cb56f129a74","6816beb85096e1d2f783bca4","6816beb8a7b28c6905fe3d14","6816beb864a3e5df89cb1207","6816beb839bf42ce510a7d68","6816beb88d47f1ecab592306","6816beb83ec1f967ba8d5042","6816beb8f0d74286ba1395ec","6816beb8e2698bca754f10d3","6816beb806c372a491ebd85f","6816beb870415fac2be3689d","6816beb8c80f9b6a5d347e12","6816beb8b37502ca6fe81d49","6816beb81a73d5c2b890e4f6","6816beb87c5ba0e6f91d2348","6816beb87189f6b405a2cd3e","6816beb86fe1803b79c25a4d","6816beb82b5e4a89371fdc06","6816beb8843c91e2b70da56f","6816beb8f7192c536d4be8a0","6816beb8a10ec5fb974d8362","6816beb8408b372af95de61c","6816beb8a34b7e209c5f16d8","6816beb8652c3b87ed4109fa","6816beb80ab85c36ef42719d","6816beb8987bf6435ecda210","6816beb842fb156987dc0e3a","6816beb84c6872b1d39e0f5a","6816beb8241f0c6897bd35ea","6816beb8278a1cd59be0f634","6816beb80983fdca5461b27e","6816beb865f13dcb89e7a024","6816beb8031bcf82a967e4d5","6816beb85901c48273b6efda","6816beb897a804523f61cdeb","6816beb8bc162e53d90a87f4","6816beb83dec546a09bf8127","6816beb816e84095ca273dfb","6816beb8a1397840fe652bcd","6816beb836c2f87de5b9104a","6816beb831e25c084fb79da6","6816beb843fb6ed851a07c92","6816beb8ad1e94c50386b7f2","6816beb81f03c7259ea86b4d","6816beb82f46ab87e59dc103","6816beb8acfd83549e1b0267","6816beb8752f4e13c986db0a","6816beb86958dc74201ebf3a","6816beb85fa760b1d93248ec","6816beb8e9f7231c6458da0b","6816beb8d7cef8a32b096514","6816beb8359e47081cbf6ad2","6816beb83d58fbe607c9a142","6816beb8356f0e2c419ab87d","6816beb8709ab813c5e6d42f","6816beb82e640fc78931bda5","6816beb88e62a50f19bd74c3","6816beb81e87a953fc4b62d0","6816beb8dbf5890ae76314c2","6816beb83a6bfc754e2d9108","6816beb81ad5c874f0b9e236","6816beb8102946dabf3ec578","6816beb84f3095b26a7ec18d","6816beb81fe87340c69bd52a","6816beb88edf2710b9ca4635","6816beb8cafed09468532b17","6816beb8628d4307c1fa95be","6816beb89243a7658de0c1bf","6816beb858769a4d12ebc0f3","6816beb85184f7c963e2a0db","6816beb8c4d5eb182a37096f");
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

    private validSptVersion(container: DependencyContainer): boolean
    {
        const sptVersion = globalThis.G_SPTVERSION || sptConfig.sptVersion;
        const packageJsonPath: string = path.join(__dirname, "../package.json");
        const modSptVersion = JSON.parse(fileSystem.read(packageJsonPath)).sptVersion;
        return satisfies(sptVersion, modSptVersion);
    }
}
module.exports = { mod: new Olympus() }