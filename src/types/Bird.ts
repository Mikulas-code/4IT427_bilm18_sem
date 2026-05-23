export interface Bird {
  id: string;
  name: string;
  latinName: string;
  order: string;
  family: string;
  location: Coordinates;
  date: string;
  notes: string;
  seen: boolean;
  count: number;
}

export interface Coordinates {
  lat: number;
  lng: number;
}