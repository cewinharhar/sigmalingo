export const POINTS_TO_REFILL = 10;

export const MAX_HEARTS = 5;

export interface Resource {
  type: 'youtube' | 'app' | 'book' | 'website' | 'movies';
  url: string;
  title: string;
  description?: string;
}