# AssAssIn's Olympus Mod
>Original Author: AssAssIn

>Current Author: jbs4bmx

All credit goes to AssAssIn: If at any time, AssAssIn comes back to the scene and wants take over his mod again, it will be here waiting. In the meantime, others can enjoy it as it is now.


<br>

# Description
This is a re-worked version of AssAssIn's Olympus mod for SPT 3.5+ versions.

This mod adds rigs, armor, a helmet, a backpack, stimulants, and magazines with OP properties.

The items are all sold by Therapist, Ragman, or Jaeger depending on what type of item they are.


<br>

# Configuration
Only use the items you want and nothing more. Select the corresponding option(s) in the configuration file.
``` json
{
    "VERSION_SELECTION": "true/false: Choose only one option. Determines the version of the mod to load.",
    "FullVersion": true,
    "Minimal": false,
    "MagsOnly": false,
    "RigsOnly": false,
    "StimsOnly": false,

    "BLACKLIST_SELECTION": "true/false: Setting this value to true will stop bots from generating with Olympus items in their inventory.",
    "blacklistMeds": false,
    "blacklistGear": false,
    "blacklistMags": false
}
```

## Full Version
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
  - 169 new Magazine options offered by Jaeger
    - 250rd mags for most firearms with OP buffs as well.

## Minimal Version
Same as the full version but with reduced magazine numbers.
  - 4 new Stims offered by Therapist
  - 5 new Gear items offered by Ragman
  - 25 new 250rd Magazine options offered by Jaeger

## Mags Only Version
Only the full amount of new magazines from the mod are loaded.
  - 169 new Magazine options offered by Jaeger

## Rigs Only Version
Only the rigs from the mod are loaded.
  - 5 new Gear items offered by Ragman

## Stims Only Version
Only the stimulants from the mod are loaded.
  - 4 new Stims offered by Therapist


<br>

# Changelog:
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
  - Release Date: 31 July, 2022
  - Refactor Code to work with SPT 3.1.1
  - Nothing new added...yet(sorry). New mags coming soon...

300.1.0:
  - Release Date: 14 July, 2022
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