export interface Post {
  title: string;
  address: string;
  description: string;
  id: string;
  userID: string;
  coordinates: { lat: number; lng: number };
  image?: string;
}
