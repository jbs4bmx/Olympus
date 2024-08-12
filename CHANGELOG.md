# CHANGE LOG

13 July, 2024 - 390.0.2 (patch .2)
  - Fix armorClass entry on some items.
  - Updated logging information.
  - Fixed PMC loot blacklisting code.
  - Fixed global loot blacklisting code.
</br></br>

12 July, 2024 - 390.0.1 (The "It's not called AKI anymore. It's just SPT now!" update) 😆
  - Add support for MCX Spear, 9A-91, VSK-94, and even the Blicky toy gun. (That's 116 total supported firearms!)
  - Fix some coding issues. (Me smooth brain.)
  - Update code to new SPT naming convention.
</br></br>

380.0.2 (Mini Fix)
  - Minor code optimizations. Nothing too fancy.
  - Add missing ammo for SR-2M magazine.
  - Fix number rounding function.
  - Fix magazine capacity assignment.
</br></br>

380.0.1 (The 'Jesus Christ Holy Fuck BSG' Update) 💩
  - Update support for SPT 3.8.0
  - Complete overhaul of database files.
  - Conversion to use newly generated MongoDB IDs.
  - Switch to using jsonc for config file so comments can be included.
  - Add more customizable options in configuration file.
  - Minor code optimizations here and there.
  - Move config file to root of mod directory.
  - Correct missing magazine item push for 2 of the 112 supported firearms.
  - Minor changes in item asthetic properties.
</br></br>

373.0.2 (Quick Fix Update)
  - Correct missing entries for Scar-H FDE
  - Update support to 112 firearms from 111 firearms.
</br></br>

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
</br></br>

370.0.1 (MinorMajor Update)
  - Fix Types.
  - Correct issue with blacklisting items from bot generation.
  - Updated to support AKI 3.7.0+

358.0.1 (BIG Change Update)
  - Refactored code to combine all variants into a single mod.
  - Removed resizable containers options.
</br></br>

357.0.1 (Combination Update) (Non-Released)
  - Repositories combined for easier maintenance.
  - Released in 5 variants; Full, Minimal, Mags Only, Gear Only, Stims Only.
</br></br>

356.0.1 (Reduction Update)
  - Per Popular Demand -- Number of mags reduced to 25 (previously 169).
  - Don't ask me how I chose what I chose. I just did it.
</br></br>

352.0.1 (The BSG is a Twat Update)
  - Update for SPT 3.5.2
</br></br>

351.0.1
  - Update for SPT 3.5.1
  - Adjust to new blacklist system.
</br></br>

350.0.3 (The Big Buffs Update)
  - Added buffs to Apollos Propital so it will properly heal your PMC when used.
</br></br>

350.0.2 (The Mag Update)
  - Add new magazines from 0.13
</br></br>

350.0.1 (Streets Update)
  - Update for SPT 3.5.0
</br></br>

340.0.1 (The 'BSG Fucked It All Up' Update)
  - Updated for SPT 3.4.0
  - Restructured locales
  - Fixed locale code
</br></br>

330.0.1 (The Slimline Update)
  - Updated for SPT 3.3.0
  - Optimized code
  - Removed ragfair code (not necessary for functionality)
</br></br>

325.0.3 (The Lua Update)
  - Changed mod implementation to match current SPT standards.
  - Fixed a major typo that could throw a bot generation error.
  - Removed item code that is no longer used.
  - Optimized a bit of code.
  - Removed unused entry in database code.
  - Corrected properties of some items in database.
</br></br>

325.0.2
  - Add feature to allow blacklisting of items from bot generation pool.
</br></br>

325.0.1
  - Reduced console spam. (Less junk displayed on screen.)
  - Removed "airsoft" mag. (not used in game.)
  - Fixed traders not buying items.
  - Removed some useless code.
</br></br>

322.0.1
  - Version update. No underlying change to code.
</br></br>

321.0.1
  - Version update. No underlying change to code.
</br></br>

320.0.2 (The Options Update)
  - Increased to 164 magazine options for 104 firearms. (Excludes double-barrel shotgun, 40mm grenade launcher, Utyos HMG, and revolvers.)
  - Added new item unlocked at Ragman Lvl 2.
  - Edit/Enhance buff types.
  - Correct item properties.
  - Minor balancing of some item stats/buffs. (Don't worry, everything is still OP.)
  - Fixed buff stats not applying when using stims.
</br></br>

320.0.1
  - Fix God Mode option not setting throughput value correctly.
  - Update to SPT 3.2.0
</br></br>

311.0.1
  - Update code for dynamic folder name. User can now change the name of the mod's folder to fix mod load order where needed.
</br></br>

311.0.0:
  - Refactor Code to work with SPT 3.1.1
  - Nothing new added...yet(sorry). New mags coming soon...
</br></br>

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
</br></br>

231.1.0:
  - Unreleased. (modded for personal use only)
</br></br>

230.1.0:
  - Unreleased. (modded for personal use only)
</br></br>

221.1.0:
  - Unreleased. (modded for personal use only)
</br></br>

211.1.0:
  - Last release by AssAssIn.
  - for SPT 2.1.1 and EFT 12.11
</br></br>


## Notes

Previous versions unavailable.