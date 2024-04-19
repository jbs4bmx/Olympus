# AssAssIn's Olympus Mod

>Original Author: AssAssIn

>Current Author: jbs4bmx

All credit goes to AssAssIn: If at any time, AssAssIn comes back to the scene and wants take over his mod again, it will be here waiting. In the meantime, others can enjoy it as it is now.


<br>

## Description

>***⚡ Zeus grants you access to enhanced gear for your quests.***<br>
>***⚡ Hestia's selflessness provides you the courage and power to smite your enemies.***<br>
>***⚡ Hera, Poseidon, Demeter, Athena, Apollo, Artemis, Ares, Hephaestus, Aphrodite, Hermes, and Dionysus rally you on as you storm into battle.***

This is a re-worked version of AssAssIn's Olympus mod for SPT 3.7+ versions. This mod adds rigs, armor, a helmet, a backpack, stimulants, and magazines with OP properties. The items are all sold by Therapist, Ragman, or Jaeger depending on what type of item they are.

### Items Added
**Apollo's Magazines (60 in total):**
  - Configurable capacity.
  - OP Accuracy.
  - OP Ergonomics.
  - Reduced Recoil.
  - Reduced Loudness.
  - Reduced Malfunction chance.
  - Reduced Check time.
  - Slightly increased examine and loot experience.
  - Greatly reduced item weight.

**Apollo's Stim/Propital/Pain/CMS Stimulants:**
  - OP stats boost depending on stimulant used.
  - OP pain relief or damage repair depending on stimulant used.
  - No negative side affects from usage.
  - 360 seconds of positive effects from each usage.
  - Configurable uses per Stimulant.

**Armor Of Athena:**
  - Full body armor protecting the chest/back/sides/upper arms/stomach.
  - Configurable armor protection.
  - Class 10 Armor. (The highest available.)

**Atlas' Satchel:**
  - An incredibly spacious bag to hold the spoils of battle.
  - It may look small, but it's bigger on the inside.
  - Configurable sizes

**Hercules' Rig v1/Rig v2:**
  - Grants the wearer immense strength to carry more spoils from their battle. (aka. Greatly decreased item weight.)
  - Configurable armor protection for chest/back/sides. (Rig version 2 only.)

**Helmet Of Hermes:**
  - Full protection of the Head (top/back/ears/eyes/jaws).
  - Configurable armor protection.
  - Class 10 Armor. (The highest available.)


<br>

## Configuration

Although you can run it default, there are configuration options to tweak it a bit. Edit the corresponding option(s) in the configuration file to make the mod work in the way that you want it to. By default, the entire database of this mod is loaded, but you can also limit it to one of the 3 categories, or a combination of the 3.

For example: If you only want to use the stimulants and the magazines from this mod, then change "FullVersion" to false and change "MagOnly" and "StimsOnly" to true.

``` jsonc
{
  // ====================================================================================================
  // VERSION_SELECTION
  // Choose 1 or more options.
  // Determines the version of the mod to load. (Default = FullVersion)
  // If FullVersion is set to "true", the other 3 options will be ignored.
  // ====================================================================================================
  "FullVersion": true,
  "MagsOnly": false,
  "RigsOnly": false,
  "StimsOnly": false,


  // ====================================================================================================
  // MAGAZINE_CONFIGURATION
  // This is the number of cartridges a magazine can hold.
  // Setting is ignored if magazines are disabled.
  // ====================================================================================================
  "cartridgeCount": 250,


  // ====================================================================================================
  // RIG_OPTIONS
  // ====================================================================================================
  "athenaArmorAmount": 10000,
  "herculesRig2ArmorAmount": 10000,
  "helmetofhermesArmorAmount": 10000,
  // Maximum recommended values based on screen size for following options:
  // Recommended: 24x14 for 1080p, 32x16 for 1440p
  "atlassatchelHorizontal": 24,
  "atlassatchelVertical": 14,


  // ====================================================================================================
  // STIM_OPTIONS
  // ====================================================================================================
  "numberOfStimUses": 4,
  "stimUseTimeInSeconds": 3,


  // ====================================================================================================
  // BLACKLISTING
  // Choose 1 or more options.
  // Setting this value to true will stop bots from generating with Olympus items in their inventory.
  // ====================================================================================================
  "blacklistStims": false,
  "blacklistRigs": false,
  "blacklistMags": false
}
```


<br>

## Mod Variations

### Full Version
This the full implementation of the mod and includes many new items to enhance your raids.
  - 4 new Stims offered by Therapist
    - Apollo's Pain -- Ultimate pain relief.
    - Apollo's Stim -- The most OP Buffs ever?
    - Apollo's Propital -- Cures ailments such as bleeding, diseases, and fractures. Also provides energy and hydration.
    - Apollo's CMS -- Fixes blackened limbs
  - 5 new Gear items offered by Ragman
    - Hercules' Rig (Standard Rig)
    - Hercules' Rig 2 (Armored Rig)
    - Helmet of Hermes
    - Armor of Athena
    - Atlas' Satchel
  - 60 new Magazine options offered by Jaeger
    - 250rd mags for 112 supported firearms with OP buffs.

### Mags Only Version
Only the full amount of new magazines from the mod are loaded.
  - 60 new Magazine options offered by Jaeger

### Rigs Only Version
Only the rigs from the mod are loaded.
  - 5 new Gear items offered by Ragman

### Stims Only Version
Only the stimulants from the mod are loaded.
  - 4 new Stims offered by Therapist


<br>

## Firearm Support

There is no support for revolvers, grenade launchers, or single-shot firearms.

| Firearm | Status |   | Firearm | Status |   | Firearm | Status |   | Firearm | Status |
| ---: | :--- | --- | ---: | :--- | --- | ---: | :--- | --- | ---: | :--- |
| ADAR 2-15 | ✅**Supported** |   | AGS-30 | ❌ Unsupported |   | AK-101 | ✅**Supported** |   | AK-102 | ✅**Supported** |
| AK-103 | ✅**Supported** |   | AK-104 | ✅**Supported** |   | AK-105 | ✅**Supported** |   | AK-12 | ✅**Supported** |
| AK-74 | ✅**Supported** |   | AK-74M | ✅**Supported** |   | AK-74N | ✅**Supported** |   | AKM | ✅**Supported** |
| AKMN | ✅**Supported** |   | AKMS | ✅**Supported** |   | AKMSN | ✅**Supported** |   | AKS-74 | ✅**Supported** |
| AKS-74N | ✅**Supported** |   | AKS-74U | ✅**Supported** |   | AKS-74UB | ✅**Supported** |   | AKS-74UN | ✅**Supported** |
| APB | ✅**Supported** |   | APS | ✅**Supported** |   | AS VAL | ✅**Supported** |   | ASh-12 | ✅**Supported** |
| AUG A1 | ✅**Supported** |   | AUG A3 | ✅**Supported** |   | AVT-40 | ✅**Supported** |   | AXMC | ✅**Supported** |
| CR 200DS | ❌ Unsupported |   | CR 50DS | ❌ Unsupported |   | DT MDR 5.56x45 | ✅**Supported** |   | DT MDR 7.62x51 | ✅**Supported** |
| DVL-10 | ✅**Supported** |   | FN 5-7 | ✅**Supported** |   | FN 5-7 (FDE) | ✅**Supported** |   | FN40GL | ❌ Unsupported |
| Glock 17 | ✅**Supported** |   | Glock 18C | ✅**Supported** |   | Glock 19X | ✅**Supported** |   | HK 416A5 | ✅**Supported** |
| HK G28 | ✅**Supported** |   | HK G36 | ✅**Supported** |   | KS-23M | ✅**Supported** |   | M1911A1 | ✅**Supported** |
| M1A | ✅**Supported** |   | M3 Super 90 | ✅**Supported** |   | M32A1 | ❌ Unsupported |   | M45A1 | ✅**Supported** |
| M4A1 | ✅**Supported** |   | M590A1 | ✅**Supported** |   | M700 | ✅**Supported** |   | M870 | ✅**Supported** |
| M9A3 | ✅**Supported** |   | MCX | ✅**Supported** |   | Mk-18 | ✅**Supported** |   | Mk47 | ✅**Supported** |
| Mosin (Infantry) | ✅**Supported** |   | Mosin (Sniper) | ✅**Supported** |   | MP-133 | ✅**Supported** |   | MP-153 | ✅**Supported** |
| MP-155 | ✅**Supported** |   | MP-18 | ❌ Unsupported |   | MP-43 sawed-off | ❌ Unsupported |   | MP-43-1C | ❌ Unsupported |
| MP-443 "Grach" | ✅**Supported** |   | MP5 | ✅**Supported** |   | MP5K-N | ✅**Supported** |   | MP7A1 | ✅**Supported** |
| MP7A2 | ✅**Supported** |   | MP9 | ✅**Supported** |   | MP9-N | ✅**Supported** |   | MPX | ✅**Supported** |
| MTs-255-12 | ❌ Unsupported |   | NSV "Utyos" | ❌ Unsupported |   | OP-SKS | ✅**Supported** |   | P226R | ✅**Supported** |
| P90 | ✅**Supported** |   | PB pistol | ✅**Supported** |   | PKM | ✅**Supported** |   | PKP | ✅**Supported** |
| PL-15 | ✅**Supported** |   | PM pistol | ✅**Supported** |   | PM(t) pistol | ✅**Supported** |   | PP-19-01 Vityaz-SN | ✅**Supported** |
| PP-9 "Klin" | ✅**Supported** |   | PP-91 "Kedr" | ✅**Supported** |   | PP-91-01 "Kedr-B" | ✅**Supported** |   | PPSh-41 | ✅**Supported** |
| RD-704 | ✅**Supported** |   | RFB | ✅**Supported** |   | RPK-16 | ✅**Supported** |   | RSASS | ✅**Supported** |
| RSh-12 | ❌ Unsupported |   | SA-58 | ✅**Supported** |   | SAG AK | ✅**Supported** |   | SAG AK Short | ✅**Supported** |
| Saiga-12 | ✅**Supported** |   | Saiga-9 | ✅**Supported** |   | SCAR-H | ✅**Supported** |   | SCAR-H (FDE) | ✅**Supported** |
| SCAR-L | ✅**Supported** |   | SKS | ✅**Supported** |   | SP-81 | ❌ Unsupported |   | SR-1MP Gyurza, | ✅**Supported** |
| SR-25 | ✅**Supported** |   | SR-2M | ✅**Supported** |   | STM-9 | ✅**Supported** |   | SV-98 | ✅**Supported** |
| SVDS | ✅**Supported** |   | SVT-40 | ✅**Supported** |   | T-5000 | ✅**Supported** |   | TOZ-106 | ✅**Supported** |
| TT pistol (gold) | ✅**Supported** |   | TT pistol | ✅**Supported** |   | TX-15 DML | ✅**Supported** |   | UMP 45 | ✅**Supported** |
| USP .45 | ✅**Supported** |   | Vector .45 | ✅**Supported** |   | Vector 9x19 | ✅**Supported** |   | VPO-101 | ✅**Supported** |
| VPO-136 | ✅**Supported** |   | VPO-209 | ✅**Supported** |   | VPO-215 | ✅**Supported** |   | VSS Vintorez | ✅**Supported** |


<br>

## Changelog:

380.0.1 (The 'Jesus Christ Holy Fuck BSG' Update)
  - Update support for SPT 3.8.0
  - Complete overhaul of database files.
  - Conversion to use newly generated MongoDB IDs.
  - Switch to using jsonc for config file so comments can be included.
  - Add more customizable options in configuration file.
  - Minor code optimizations here and there.
  - Move config file to root of mod directory.
  - Correct missing magazine item push for 2 of the 112 supported firearms.
  - Minor changes in item asthetic properties.

373.0.2 (Quick Fix Update)
  - Correct missing entries for Scar-H FDE
  - Update support to 112 firearms from 111 firearms.

373.0.1 (Overhaul Update)
  - Add support for PKM, PKP, SVT-40, and​​ AVT-40 firearms.
  - Update ammo support.
  - Yet another fix for blacklisting items from bot loot generation.
  - Re-enable blacklist options for bot generation.
  - Reduce number of mags to 60 and restructure mag association with supported firearms. (111 supported firearms in total.)
  - Removed "minimal" option since mag reduction still covers all supported firearms.
  - Minor item changes here and there.
  - Update some database items to use newer item formatting.
  - Update Atlas' Satchel to use satchel prefab instead of a backpack prefab.
  - New background color system for quick identification: Magazines = "grey"; Rigs/Armor = "red"; Stims = "violet".
  - Removed vanity text from mod load to clean up server console output.

370.0.1 (MinorMajor Update)
  - Fix Types.
  - Correct issue with blacklisting items from bot generation.
  - Updated to support AKI 3.7.0+

358.0.1 (BIG Change Update)
  - Refactored code to combine all variants into a single mod.
  - Removed resizable containers options.

357.0.1 (Combination Update) (Non-Released)
  - Repositories combined for easier maintenance.
  - Released in 5 variants; Full, Minimal, Mags Only, Gear Only, Stims Only.

356.0.1 (Reduction Update)
  - Per Popular Demand -- Number of mags reduced to 25 (previously 169).
  - Don't ask me how I chose what I chose. I just did it.

352.0.1 (The BSG is a Twat Update)
  - Update for SPT 3.5.2

351.0.1
  - Update for SPT 3.5.1
  - Adjust to new blacklist system.

350.0.3 (The Big Buffs Update)
  - Added buffs to Apollos Propital so it will properly heal your PMC when used.

350.0.2 (The Mag Update)
  - Add new magazines from 0.13

350.0.1 (Streets Update)
  - Update for SPT 3.5.0

340.0.1 (The 'BSG Fucked It All Up' Update)
  - Updated for SPT 3.4.0
  - Restructured locales
  - Fixed locale code

330.0.1 (The Slimline Update)
  - Updated for SPT 3.3.0
  - Optimized code
  - Removed ragfair code (not necessary for functionality)

325.0.3 (The Lua Update)
  - Changed mod implementation to match current SPT standards.
  - Fixed a major typo that could throw a bot generation error.
  - Removed item code that is no longer used.
  - Optimized a bit of code.
  - Removed unused entry in database code.
  - Corrected properties of some items in database.

325.0.2
  - Add feature to allow blacklisting of items from bot generation pool.

325.0.1
  - Reduced console spam. (Less junk displayed on screen.)
  - Removed "airsoft" mag. (not used in game.)
  - Fixed traders not buying items.
  - Removed some useless code.

322.0.1
  - Version update. No underlying change to code.

321.0.1
  - Version update. No underlying change to code.

320.0.2 (The Options Update)
  - Increased to 164 magazine options for 104 firearms. (Excludes double-barrel shotgun, 40mm grenade launcher, Utyos HMG, and revolvers.)
  - Added new item unlocked at Ragman Lvl 2.
  - Edit/Enhance buff types.
  - Correct item properties.
  - Minor balancing of some item stats/buffs. (Don't worry, everything is still OP.)
  - Fixed buff stats not applying when using stims.

320.0.1
  - Fix God Mode option not setting throughput value correctly.
  - Update to SPT 3.2.0

311.0.1
  - Update code for dynamic folder name. User can now change the name of the mod's folder to fix mod load order where needed.

311.0.0:
  - Refactor Code to work with SPT 3.1.1
  - Nothing new added...yet(sorry). New mags coming soon...

300.1.0:
  - Updated Code to work with SPT 3.0.0
  - Converted mod database to work for new load/delayedLoad 3.0.0 methods
  - Use custom services to add items to traders and use delayedLoad class to make changes to item properties.
  - Update configuration json file adding enable/disable option and some comments to aid in its use.
  - Only 250rd mags kept in this version of the mod. (Sorry, no 500rd or 1000rd mags at this time.)
    - Defaulted all new 250rd mags to "perfect" mags.
    - Mags all buff the following properties:
      - Ergonomics: 100
      - Durability: 100
      - Accuracy: 100
      - Recoil: -100
      - LoadUnload Modifier: -100
      - CheckTime Modifier: -100
      - Malfunction Chance: 0
  - Assigned items to respective traders.
    - Ragman now sells the gear from this mod. (4 items in total)
    - Therapist sells the stims from this mod. (4 items in total)
    - Jaeger sells all mags from this mod. (40 in total)
  - Altered Hercules' Rig to use MPPV rig due to issues trying to increase/change slots on the tv-109 rig which was used in previous builds.
  - Remaining gear and stimulant buffs are the same as previous versions of the mod.
  - Color coded ammo is NOT a part of this mod re-work. (Sorry)

231.1.0:
  - Unreleased. (modded for personal use only)

230.1.0:
  - Unreleased. (modded for personal use only)

221.1.0:
  - Unreleased. (modded for personal use only)

211.1.0:
  - Last release by AssAssIn.
  - for SPT 2.1.1 and EFT 12.11


<br>

#