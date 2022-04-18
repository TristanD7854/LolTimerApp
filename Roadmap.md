### Setup

| Objective      | Advancement |
| -----------    | ----------- |
| Create folders hierarchy, some services, mocks.            | DONE |
| Display all champion names in a game                       | DONE |
| Use Jest                                                   | DONE |
| Add prettier + eslint, rules : quotes, commas ...          | DONE |
| Add husky pre-commit hooks + lint-staged                   | DONE |
| Add one Cypress test                                       | DONE |
| Create nodejs proxy server to allow CORS. [video](https://youtu.be/ZGymN8aFsv4) | DONE |        
| Add SonarQube : code smells, 70% coverage.                 | ABORTED -- TOO HARD | 
| Create pull-request for TU. Use code coverage to see.     | TODO |
| Add Jenkins integration, Pull Requests.                    | ABORTED -- TOO HARD |

# Angular, what I'd love to implement

| different modules, not everything in core !
    create different features
| directive
| modal
| lazy loading (modules, components)
| login + guards (canActivate)

### Riot API

https://developer.riotgames.com/docs/lol  
ultis cds : http://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion/Aatrox.json  
    search 120,100,80  
http://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/item.json  
    Zhonia cd : 	Effect3Amount":"120  
    GA cd : 		Effect3Amount":"300  
https://developer.riotgames.com/docs/lol  
    
    
-manage errors from api calls [like that](https://www.tektutorialshub.com/angular/angular-http-error-handling/)

-routing for /game/summonerName. Header with Home Page      DONE 

-display summoner name correctly                            DONE
    can hide them, replaced with champion names if so  
-display champions  (images with names on mouse over)       DONE
-display summoners                                          DONE
    (images with names on mouse over, cd (aram cds different, one rune reduces them))  
-display runes                                              DONE

-display length of the game (2mn delay with spectator/v4)   DONE
    No need to call the riot API for that every time.
    We call it once, save the current time, then increment it ourselves.
    F5 will ask it again.

-language option in settings (change origin of json)

-can click on summoners for timer   (clicking)  
    can click on it, default timer is -5, can click on +/++/-/-- buttons to add/remove 5/10sec  
    can change default value of 5  
    display how much time is delayed, like 40 displayed if +,++,++,++,-,+ (default5+5+10+10=10-5+5)  
    possible to overwrite current timer by clicking again on it  
        after that, button to cancel the override is displayed for 5s, with a circular timer (like a clock)  
-input field to time summoners      (writing)  
    exple : "f mid 12.15"  
    Possible to cancel last command with "cancel" or by clicking it (3 last commands displayed)  
        timer of 5sec after canceling it, possible to uncancel  
    Manage errors  
-display last seconds the summs are not available (highlight summs with timer + colors)  

-display ranks
    can hide them

-display tower golds (independant of the game), global and local

### OWN API - For runes/champions/items stats (like champion spells damage ratios)

Think about all that. Wouldn't it be simpler/easier if I just save all the json data + map them for my needs ?
I'd like to have a script that scrap the lolwiki for champion damgage, and then be able to request it like so :
myapi/akali/spells -> { "q": "{10/20/30/40/50} + adRatio: 30%" ...}

Cache the data (in the proxy server ?), and update the json only when new version comes out, or requesting new data (for example first time we request the json for Qiyana in patch 12.6.1)

Create routes for this App :
    -routes for runes/summs. To avoid looping through all the items to get rune.id == perkId
        create myownapi/runes/8007 -> gives json with data
        Create better json to hold rune/summs data.
    -routes for spels damgage : exple ->
        myownapi/champions/championName/spells :
        {
            "q": 
                isAnAABost: bool
                adDmg:
                    base_dmg:
                        min_dmg : number[]
                        max_dmg : number[]
                    ad_ratios :
                        min_ratio : number[]
                        max_ratio : number[]
                    ap_ratios :
                        min_ratio : number[]
                        max_ratio : number[]
                    hp_ratios :
                        min_ratio : number[]
                        max_ratio : number[]
                    bonus_ad_ratios :
                        min_ratio : number[]
                        max_ratio : number[]
                    as_ratios :
                        min_ratio : number[]
                        max_ratio : number[]
                    enemy_%hp_ratios :
                        min_ratio : number[]
                        max_ratio : number[]
                    enemy_%hp_left_ratios :
                        min_ratio : number[]
                        max_ratio : number[]
                apDmg:
                    ...
                effects:
                    ignore_armor_%: number[]
                    affect_other_spells_dmg: 
                        reduce_rm: number[]
                        reduce_armor: number[]
                        reduce_rm_%: number[]
                        reduce_armor_%: number[]
                        increase_dmg: number[] (for vlad ult)
            null if none
        }
    The goal is to be able to get damage from us to a champion, anf from enemies champ to us, like so :
    We play Cassio, there is an enemy akali.

    Cassio -> Akali :
        aa_dmg : 
            40 ad_dmg
            dps = 26 ad_dmg /s
        passive_dmg : none
        q_dmg : 
            560 ap_dmg in 4 seconds
            cd: 6s
        w_dmg : 
            60 ap_dmg / sec
            cd : 10s
        e_dmg : 
            80-450 ap_dmg (min or max dmg)
            cd : 0.6s
        r_dmg : 
            345 ap_dmg
        runes_dmg :
            dark_harvest : 67 ap_dmg
        items_dmg :
            luden : 0-120 ap_dmg
            etreinte_demoniaque : 
                45 ap_dmg / s
                180 ap_dmg in 4s
        all_items_and_runes_max_dmg : 300dmg + 200 dmg in 4sec

    GOAL :
        be able to have an estimation of karthus enemy ult damage, if he has last-stand (up to 11% bonus dmg), 
        dark_harvest (we overestimate this rune, unless I wrote in input-field how many stacks he has), lyandry,
        void, yuumi on him with baton-des-flots, magic-potion (if he used it in fog, only way my app knows is if 
        I wrote it in input-field) ...

    Akali -> cassio
        aa_dmg : 
            40 ad_dmg
            dps = 26 ad_dmg /s
        passive_dmg (aa + passive) (passive has isAnAABost=true)
            40 ad_dmg + 200 ap_dmg
        q_dmg : 200 ap_dmg
        w_dmg : none
        e_dmg : 50+350 = 400 ap_dmg
        r_dmg : 
            100 + 150-450 ap_dmg
            currently : 100 + 220 ap_dmg          
                (this line cannot be displayed if we play akali against someone, as we don't have enemies current_hp)
        items_dmg : null

    For vayne for example, in her aa-dps, take into account guinsoo/crit-chance, her w damage (use our max_hp), her brk ...
    Add a line, aa-dps with ult (add an "aaModifier" = "true" line in her ult ?)

I don't want to calculate full combo damage, as there is too many things to consider. Like aa-cancel, time to input the combo,
the fact that for akali u can do 2 Q before getting the R2, the fact that akali R2 deals more dmg if done at the end, the fact 
that nasus full combo will maybe do ad dmg before E hit (it reduces armor) ...
I don't think it is worth the effort

Manage Yuumi W passive in frontend app, same for concentration lointaine passive (call ownapi to get the value)

### LCU API + ownAPI

-add unit tests + cypress (E2E)

-Use lcu api to create a lot of components, and update them at 5sec interval.
If lcu can't be called (or the user doesn't want to), don't show the related components

-use angular modal to display a pop-up saying 
    that it is possible to activate lcu api on the current page
    this will disable calls to riot api

-menu item to go to own game with lcu

-display champion levels

-display game length

-display minion stats (hp, ad, golds)
    calculate with game length

-display scores (with cs)

-display objects
    highlight recently bought ones (muramana also)

-display runes avancements

-display total stats (advanced ones too)

-display healing items/runes + anti-healing

-display ult cds
    (clicking) + (writing) for them (like summs)

-display warding scores

-display own spell damage on every enemy champion
    https://hextechdocs.dev/resolving-variables-in-spell-textsa/
    https://riot-api-libraries.readthedocs.io/en/latest/ddragon.html#common-issues
        may have to scrap https://leagueoflegends.fandom.com/wiki/Akali/LoL to get damage info
    if too much, just display how much 100 magical/physical dmg would do

-input field to say who took plates golds, how many dark_harvest stacks enemy has, 
    how_many gold first_strike did for an enemy ...

-display total mana cost of full combo

-calculates if rabadon or void better against every enemy champ

-display killing sprees (how many kills since last death)

Estimations (search official algo if they exist)
-estimate gold diffs, take into account :
    first blood  
    golds given when dead (see scores)
    cs killed, careful of sup items  
    towers destroyed (assists or not)  

-estimate personal shutdowns in-game + how-much-gold someone gives (same for assist kill)
    [wiki](https://leagueoflegends.fandom.com/wiki/Kill)
    Compare it with my games, adapt the algo in consequence

-estimate teams shutdowns conditions
    golds difference
    objectives

--
See events for more ideas
    pinks destroyed ? how many in the map

Would be nice to have but no idea how, because need huge db over time (like opgg, lolalytics ...)
    who has late game adv  
    % ap/ad/true dmg in enemy team  
    spikes (like ez finishes muramana)  
    % wr player on champs  
    % wr on every matchups  

### Ask for developer key ?