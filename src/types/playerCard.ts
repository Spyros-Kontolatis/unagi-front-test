interface Player {
  firstname: string;
  lastname: string;
  birthday: Date;
  image: URL;
}
export interface Card {
  id: number;
  player: Player;
}
