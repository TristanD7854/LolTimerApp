export interface LocalGameData
{
    activePlayer: ActivePlayer;
    allPlayers: Player[];
    events: LolEvent[];
    gameData: GameData;
}

export interface ActivePlayer
{
}
export interface Player
{
}

export interface LolEvent
{
    assisters?: string[];
    eventId: number; // maj ?
    eventName: string;
    eventTime: number;
    killerName?: string;
    victimName?: string;
}

export interface GameData
{
    gameMode: string;
    gameTime: number;
    mapName: string;
    mapNumber: number;
    mapTerrain: string;
}
