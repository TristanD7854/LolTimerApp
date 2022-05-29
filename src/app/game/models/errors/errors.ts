export class ErrorMessages {
  public static unknownError = 'Unknow error';
  public static summonerNotFound = 'Summoner not found';
  public static summonerEncryptedIdNotFound = 'Bad Request - Exception decrypting test';
  public static summonerNotInGame = 'Summoner not in game';
  public static apiKeyOutdated = 'Api key should be updated';
  public static tooManyRequests = 'Too many requests, please try again later.';
  public static rateLimitExceeded = 'Rate limit exceeded';
}

export class CustomErrorMessage {
  public message: string;

  constructor(msg: string) {
    this.message = msg;
  }
}
