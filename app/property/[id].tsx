import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  Button,
  Alert,
  Pressable,
  Platform,
} from "react-native";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchPropertyById, bookProperty } from "../../services/api";
import { Property, Booking } from "../../services/types";
import DateTimePicker from "@react-native-community/datetimepicker";
import tw from "twrnc";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ title: "", headerBackTitleVisible: false }} />
      {!id || typeof id !== "string" ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <Text>Loading property ID...</Text>
        </View>
      ) : (
        <PropertyContent id={id} />
      )}
    </>
  );
}

function PropertyContent({ id }: { id: string }) {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);

  const {
    data: property,
    isLoading,
    error,
  } = useQuery<Property>({
    queryKey: ["property", id],
    queryFn: () => fetchPropertyById(id),
  });

  const mutation = useMutation({
    mutationFn: (booking: Booking) => bookProperty(booking),
    onSuccess: () => {
      Alert.alert("Success", "Property booked successfully!");
      router.push("/Booking");
    },
    onError: () => {
      Alert.alert("Error", "Failed to book property");
    },
  });

  const handleBooking = () => {
    if (!property || !checkIn || !checkOut) {
      Alert.alert("Please select check-in and check-out dates");
      return;
    }

    const newBooking: Booking = {
      id: Date.now().toString(),
      propertyId: property.id.toString(),
      userId: "user4",
      checkIn: checkIn.toISOString().split("T")[0],
      checkOut: checkOut.toISOString().split("T")[0],
      status: "confirmed",
      name: property?.title,
    };

    mutation.mutate(newBooking);
  };

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !property) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-red-500`}>Failed to load property</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={tw`p-4`}>
        {property?.images?.[0] && (
          <Image
            source={{ uri: property.images[0] }}
            style={tw`w-full h-64 rounded-2xl mb-4`}
            resizeMode="cover"
          />
        )}
        <Text style={tw`text-2xl font-bold text-black mb-2`}>
          {property?.title
            ? property.title.charAt(0).toUpperCase() + property.title.slice(1)
            : "Unnamed Property"}
        </Text>
        <Text style={tw`text-base text-gray-500 mb-4`}>
          {property?.location?.city}, {property?.location?.state}
        </Text>
        <Text style={tw`text-lg text-pink-600 font-semibold mb-4`}>
          ₹{property?.price} / month
        </Text>

        <Text style={tw`text-lg font-semibold text-black mb-2 mt-2`}>
          Features
        </Text>
        {property?.features?.length > 0 ? (
          property.features.map((feature, index) => (
            <Text key={index} style={tw`text-base text-gray-700 mb-1`}>
              • {feature}
            </Text>
          ))
        ) : (
          <Text style={tw`text-base text-gray-500`}>No features listed.</Text>
        )}
        {property?.location?.coordinates?.latitude &&
          property?.location?.coordinates?.longitude && (
            <>
              <Text style={tw`text-lg font-semibold text-black mt-6 mb-2`}>
                Location
              </Text>
              <MapView
                style={tw`w-full h-64 rounded-xl mb-6`}
                initialRegion={{
                  latitude: property.location.coordinates.latitude,
                  longitude: property.location.coordinates.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}>
                <Marker
                  coordinate={{
                    latitude: property.location.coordinates.latitude,
                    longitude: property.location.coordinates.longitude,
                  }}
                  title={property.title}
                  description={`${property.location.address}, ${property.location.city}`}
                />
              </MapView>
            </>
          )}

        <View style={tw`mt-6`}>
          <Text style={tw`text-lg font-semibold text-black mt-4 mb-2`}>
            Select Check-in Date
          </Text>
          <Pressable
            onPress={() => setShowCheckInPicker(true)}
            style={tw`mb-2 p-2 border rounded-lg`}>
            <Text>
              {checkIn ? checkIn.toDateString() : "Choose Check-in Date"}
            </Text>
          </Pressable>
          {showCheckInPicker && (
            <DateTimePicker
              value={checkIn || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, date) => {
                setShowCheckInPicker(false);
                if (date) setCheckIn(date);
              }}
            />
          )}

          <Text style={tw`text-lg font-semibold text-black mt-4 mb-2`}>
            Select Check-out Date
          </Text>
          <Pressable
            onPress={() => setShowCheckOutPicker(true)}
            style={tw`mb-4 p-2 border rounded-lg`}>
            <Text>
              {checkOut ? checkOut.toDateString() : "Choose Check-out Date"}
            </Text>
          </Pressable>
          {showCheckOutPicker && (
            <DateTimePicker
              value={checkOut || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, date) => {
                setShowCheckOutPicker(false);
                if (date) setCheckOut(date);
              }}
            />
          )}

          <Button title="Book Now" color="#2AAE72" onPress={handleBooking} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
