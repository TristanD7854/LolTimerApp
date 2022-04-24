import { CurrentGameParticipant } from './riot-api/spectator.model';
export interface Team {
  members: CurrentGameParticipant[];
  isAllyTeam: boolean;
}
