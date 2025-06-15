// components/BookNowButton.tsx
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { bookProperty } from "../services/api";
import { useRouter } from "expo-router";
import tw from "twrnc";

type Props = {
  propertyId: string;
};

const BookNowButton = ({ propertyId }: Props) => {
  const router = useRouter();
  const userId = "user1"; // Static for demo — you can fetch from state/profile
  const bookingDate = new Date().toISOString();

  const { mutate, isPending } = useMutation({
    mutationFn: bookProperty,
    onSuccess: () => {
      Alert.alert("Success", "Booking confirmed!");
      router.push("/Booking");
    },
    onError: () => {
      Alert.alert("Error", "Failed to book property.");
    },
  });

  return (
    <TouchableOpacity
      onPress={() => mutate({ propertyId, userId, date: bookingDate })}
      style={tw`bg-green-600 p-3 rounded-xl mt-4`}>
      <Text style={tw`text-white text-center text-lg font-semibold`}>
        {isPending ? "Booking..." : "Book Now"}
      </Text>
    </TouchableOpacity>
  );
};

export default BookNowButton;
