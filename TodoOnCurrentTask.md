

Split riot-api.service into summoner-service and spectator-service.
Try to mutualize the three services that call the riot api

this.settingsService.settingsSubject
-> no need ! See showRanks
-> don't make this Observable without reason !!