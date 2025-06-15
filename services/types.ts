export interface Location {
  address: string;
  city: string;
  state: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface Property {
  id: string;
  title: string;
  price: number;
  images: string[];
  location: {
    address: string;
    city: string;
    state: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  features: string[];
}

export interface Booking {
  id: string;
  propertyId: string;
  userId: string;
  checkIn: string;
  checkOut: string;
  status: string;
  name: string;
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  bookings: string[];
}
