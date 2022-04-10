### Setup

-Create folders hierarchy, some services, mocks.            DONE

-Display all champion names in a game                       DONE

-Use Jest                                                   DONE

-Add prettier + eslint, rules : quotes, commas ...          DONE

-Add husky pre-commit hooks + lint-staged                   DONE

-Add one Cypress test                                       DONE

-Create nodejs proxy server to allow CORS.
It should block all calls.
front -> proxy server -> riot api -> 
    request with CORS not enabled -> 
    proxy server -> request with CORS enabled -> front
https://youtu.be/ZGymN8aFsv4                                DONE

-Add SonarQube : code smells, 70% coverage.                 ABORTED -- TOO HARD

-Create pull-request for TU. Use code coverage to see.      TODO
--- to remove from this roadmap : make cleaner .md (use table, color ...) (same for other vscode projects)

-Add Jenkins integration, Pull Requests.                    ABORTED -- TOO HARD
Build should be ok to merge.

# Angular, what I'd love to implement

-different modules, not everything in core !
    create different features
-directive
-modal
-lazy loading (modules, components)
-login + guards (canActivate)

### Riot API

https://developer.riotgames.com/docs/lol
ultis cds : http://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion/Aatrox.json
    search 120,100,80
http://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/item.json
    Zhonia cd : 	Effect3Amount":"120
    GA cd : 		Effect3Amount":"300
https://developer.riotgames.com/docs/lol
    
    
-manage errors from api calls

-routing for /game/summonerName. Back button.

-display game length

-display summoner name correctly (main summoner should have a different color)
    can hide them, replaced with champion names if so
-display champions  (images with names on mouse over)
-display summoners  (images with names on mouse over, cd (aram cds different, one rune reduces them))

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

-display runes      (images with names on mouse over)
    can hide them, only show important ones ?

-display ranks
    can hide them

-display tower golds (independant of the game), global and local

-display minion stats (hp, ad, golds)
    calculate with game length

### LCU API

-Use lcu api to create a lot of components, and update them at 5sec interval.
If lcu can't be called (or the user doesn't want to), don't show the related components

-use angular modal to display a pop-up saying 
    that it is possible to activate lcu api on the current page
    this will disable calls to riot api

-menu item to go to own game with lcu

-display champion levels

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
    if too much, just display how much 100 magical/physical dmg would do

-calculates if rabadon or void better against every enemy champ

-display killing sprees (how many kills since last death)

Estimations (search official algo if they exist)
    -estimate gold diffs, take into account :
        first blood
        golds given when dead (see scores)
        cs killed, careful of sup items
        towers destroyed (assists or not)

    -estimate personal shutdowns in-game + how-much-gold someone gives (same for assist kill)
        https://leagueoflegends.fandom.com/wiki/Kill
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
    % wr on every matchups ()

### Ask for developer key ?