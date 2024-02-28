export interface EventModel {
  authorId: string;
  date: number;
  description: string;
  endAt: number;
  imageUr: string;
  location: Location;
  starAt: number;
  title: string;
  user: string[];
}

export interface Location {
  address: string;
  title: string;
}
