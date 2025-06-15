import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { fetchProperties } from "../../services/api";
import { StatusBar } from "expo-status-bar";
import tw from "../../utils/tw";
import { SafeAreaView } from "react-native-safe-area-context";

// Property type
type Property = {
  id: string;
  title?: string;
  features?: string[];
  price: number;
  images: string[];
  location: {
    address?: string;
    city?: string;
    state?: string;
  };
};

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const {
    data = [],
    isLoading,
    error,
  } = useQuery<Property[]>({
    queryKey: ["properties"],
    queryFn: fetchProperties,
  });

  const filtered = data.filter((p) =>
    (p?.title || "").toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center bg-white`}>
        <ActivityIndicator size="large" color="#2AAE72" />
        <Text style={tw`mt-2 text-gray-600`}>Loading properties...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center bg-white`}>
        <Text style={tw`text-red-500 text-lg`}>Failed to load properties.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar style="dark" />
      <View style={tw`px-4 py-3`}>
        {/* Search Bar */}
        <View
          style={tw`flex-row items-center bg-gray-100 px-4 py-2 rounded-full mb-4`}>
          <Ionicons name="search" size={20} color="gray" style={tw`mr-2`} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search by title..."
            style={tw`flex-1 text-base text-gray-800`}
            placeholderTextColor="gray"
          />
        </View>

        {/* Property List */}
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={tw`text-center text-gray-500 mt-10`}>
              No properties found.
            </Text>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push(`/property/${item.id}`)}
              style={tw`mb-5 bg-white rounded-2xl shadow-md`}>
              <Image
                source={{
                  uri: item?.images?.[0] || "https://via.placeholder.com/300",
                }}
                style={tw`h-48 w-full rounded-t-2xl`}
                resizeMode="cover"
              />
              <View style={tw`p-4`}>
                <Text style={tw`text-xl font-bold text-black`}>
                  {(item.title || "Unnamed Property").charAt(0).toUpperCase() +
                    (item.title || "Unnamed Property").slice(1)}
                </Text>
                <Text style={tw`text-gray-500`}>
                  {item.location?.city || "Unknown City"},{" "}
                  {item.location?.state || "Unknown State"}
                </Text>
                <Text style={tw`text-pink-600 font-semibold mt-1`}>
                  ₹{item.price} / month
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
