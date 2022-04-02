-Create folders hierarchy, some services, mocks.        DONE

-Display all champion names in a game                   DONE

-Add prettier + eslint, rules : subscribe should be destroyed, quotes, commas ...

-Add husky pre-commit hooks

-Use Jest

-Add one Cypress test

-Add Jenkins integration, Pull Requests. Build should be ok to merge.

-Add SonarQube : code smells, 70% coverage.

-Create nodejs proxy server to allow CORS. For some reasons the riot API can be called without issue, unless the response is an error (404 for example).
It should block all calls.
front -> proxy server -> riot api -> request with CORS not enabled -> proxy server -> request with CORS enabled -> front
https://youtu.be/ZGymN8aFsv4

-Use riot-api data to create a lot of components, and update them at 5sec interval (no need I think, data might not change with the api)
https://developer.riotgames.com/docs/lol
ultis cds : http://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion/Aatrox.json
    search 120,100,80
http://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/item.json
    Zhonia cd : 	Effect3Amount":"120
    GA cd : 		Effect3Amount":"300
https://developer.riotgames.com/docs/lol

-Use lcu api to create a lot of components, and update them at 5sec interval.
If lcu can't be called (or the user doesn't want to), don't show the related components