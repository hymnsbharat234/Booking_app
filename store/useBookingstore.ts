import { create } from "zustand";

export const useBookingStore = create((set) => ({
  bookings: [],
  addBooking: (booking: any) =>
    set((state) => ({ bookings: [...state.bookings, booking] })),
}));
