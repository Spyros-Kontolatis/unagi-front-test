export interface Player {
  firstname: string;
  lastname: string;
  birthday: string;
  image: string;
}
export interface PlayerCard {
  id: number;
  player: Player;
}
