import axios from "axios";
import { Property, Booking, Profile } from "./types";

const API_URL = "https://booking-backend-hg72.onrender.com";

// Fetch all properties
export const fetchProperties = async (): Promise<Property[]> => {
  try {
    const res = await axios.get<Property[]>(`${API_URL}/properties`);
    return res.data;
  } catch (error: any) {
    throw error;
  }
};

// Fetch a single property by ID
export const fetchPropertyById = async (
  id: string | number
): Promise<Property> => {
  const res = await axios.get<Property>(`${API_URL}/properties/${id}`);
  return res.data;
};

// Book a property
export const bookProperty = async (booking: Booking): Promise<Booking> => {
  const res = await axios.post<Booking>(`${API_URL}/bookings`, booking);
  return res.data;
};

// Fetch all bookings
export const fetchBookings = async (): Promise<Booking[]> => {
  const res = await axios.get<Booking[]>(`${API_URL}/bookings`);

  return res.data;
};

// Fetch user profile
export const fetchProfile = async (): Promise<Profile> => {
  const res = await axios.get<Profile>(`${API_URL}/profile`);
  return res.data;
};
