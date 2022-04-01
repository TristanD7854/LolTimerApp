-Create folders hierarchy, some services, mocks.

-Add eslint

-Add husky pre-commit hooks

-Create functions to return mock data
Add more mock json for riot-api spectator v4 (10, take them at 3mn interval from one online game)

-Create global timeout, fetch data very 5 seconds, test it with 10 riot-api spectator v4 real/mock

-Add one Cypress test

-Add Jenkins integration, Pull Requests. Build should be ok to merge.

-Add SonarQube : code smells, 70% coverage.

-Use riot-api data to create a lot of components, and update them at 5sec interval.

-Use lcu api to create a lot of components, and update them at 5sec interval.
If lcu can't be called (or the user doesn't want to), don't show the related components