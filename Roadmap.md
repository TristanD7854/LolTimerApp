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

-Add SonarQube : code smells, 70% coverage.

-Add Jenkins integration, Pull Requests. Build should be ok to merge.

-Use riot-api data to create a lot of components, and update them at 10sec interval (to know when game finished)
https://developer.riotgames.com/docs/lol
ultis cds : http://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion/Aatrox.json
    search 120,100,80
http://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/item.json
    Zhonia cd : 	Effect3Amount":"120
    GA cd : 		Effect3Amount":"300
https://developer.riotgames.com/docs/lol
    -manage errors from api calls
    -display runes, summoner name correctly (main summoner should have a different color)

-Use lcu api to create a lot of components, and update them at 5sec interval.
If lcu can't be called (or the user doesn't want to), don't show the related components


Ask for developer key ?