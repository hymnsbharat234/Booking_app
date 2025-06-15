# Property Booking App

A mobile application for browsing, viewing, and booking properties built with **Expo**, **TypeScript**, **React Query**, **Zustand**, and **JSON-server**. Users can view property details, check features, see locations on the map, and book their stay.

## Features

- List available properties
- View property details with images
- Interactive map showing property location
- Select check-in & check-out dates
- Book properties (stored via JSON-server)
- Smooth API integration using React Query
- Styled using Tailwind (via `twrnc`)

## Tech Stack

| Layer          | Technology                             |
| -------------- | -------------------------------------- |
| Frontend       | Expo + React Native + TypeScript       |
| Styling        | twrnc (Tailwind CSS for RN)            |
| API Handling   | React Query                            |
| State Mgmt     | Zustand / Jotai                        |
| Backend (Mock) | JSON-server                            |
| Maps           | react-native-maps                      |
| Date Picker    | @react-native-community/datetimepicker |

## Getting Started

1. Clone the repository
   git clone https://github.com/yourusername/property-booking-app.git
   cd property-booking-app

npm install
npx json-server --watch db.json --port 3001

Run expo: npx expo start

####### Screens
Home: List of all properties

PropertyDetails: View details, features, map, and book

Bookings: List of user's booked properties

Profile: (Optional placeholder)

##### Project Structure:::

.
├── app/
│ ├── index.tsx # Home screen
│ ├── [id].tsx # Property detail screen
│ └── Booking.tsx # Booking confirmation list
├── components/ # Reusable components
├── services/
│ ├── api.ts # API functions
│ └── types.ts # TypeScript types
├── store/ # Zustand or Jotai store
├── assets/ # Static assets/images
└── db.json # Mock data for JSON-server

#### Dependencies

expo install react-native-maps
expo install @react-native-community/datetimepicker
npm install @tanstack/react-query zustand twrnc axios
npm install -g json-server
