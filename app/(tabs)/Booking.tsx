import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchBookings } from "../../services/api";
import { Booking } from "../../services/types";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

export default function BookingScreen() {
  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery<Booking[]>({
    queryKey: ["bookings"],
    queryFn: fetchBookings,
  });

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#2AAE72" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-red-500 text-lg`}>⚠️ Failed to load bookings</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`px-4 pt-4`}>
        <Text style={tw`text-2xl font-bold text-black mb-4`}>
          📖 Your Bookings
        </Text>

        {bookings?.length ? (
          <FlatList
            data={bookings}
            keyExtractor={(item) => item.id}
            contentContainerStyle={tw`pb-6`}
            renderItem={({ item }) => (
              <View style={tw`mb-4 p-4 bg-gray-100 rounded-2xl shadow-sm`}>
                <Text style={tw`text-lg font-semibold text-black mb-1`}>
                  {item.name}
                </Text>
                <Text style={tw`text-sm text-gray-700`}>
                  🏠 Property ID: {item.propertyId}
                </Text>

                <Text style={tw`text-sm text-gray-700`}>
                  🗓️ Check-in: {item.checkIn}
                </Text>
                <Text style={tw`text-sm text-gray-700`}>
                  🗓️ Check-out: {item.checkOut}
                </Text>
                <Text
                  style={tw`mt-2 text-sm font-medium ${
                    item.status === "confirmed"
                      ? "text-green-600"
                      : "text-orange-500"
                  }`}>
                  ✅ Status: {item.status}
                </Text>
              </View>
            )}
          />
        ) : (
          <Text style={tw`text-base text-gray-600`}>No bookings found.</Text>
        )}
      </View>
    </SafeAreaView>
  );
}
