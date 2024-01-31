export interface MovieRequestInput {
  title: string;
  genre: string;
  director: string;
  imageUrl: string;
  cast: string[];
  pgRatings: string;
  description: string;
  likes?: number;
}
