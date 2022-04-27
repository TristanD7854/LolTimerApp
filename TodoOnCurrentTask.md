

Split riot-api.service into summoner-service and spectator-service.
Try to mutualize the three services that call the riot api (use another service for that ? see next line)
-would it be possible for only one (new) service to use HttpClient ?


add TUs

fix any types

fix e2e

add e2e