export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface HistoryItem {
  id: number;
  city: string;
  color: string;
  coordinates: Coordinates;
}
