// app/(tabs)/Profile.tsx

import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "../../utils/tw"; // assumes twrnc is configured
import { fetchProfile } from "../../services/api"; // ✅ Make sure this exists
import { Profile } from "../../services/types";
import { useQuery } from "@tanstack/react-query";

const ProfileScreen = () => {
  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery<Profile>({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });
  if (isLoading) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center bg-white`}>
        <ActivityIndicator size="large" color="#ff00c3" />
      </SafeAreaView>
    );
  }

  if (isError || !profile) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center bg-white`}>
        <Text style={tw`text-red-500`}>Failed to load profile.</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pl-4 pr-4`}>
        {/* Header */}
        <View style={tw`flex-row items-center justify-between mb-6 mt-5`}>
          <Text style={tw`text-2xl font-bold text-black`}>Profile</Text>
          <TouchableOpacity>
            <Feather name="settings" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={tw`items-center mb-6`}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=11" }}
            style={tw`w-24 h-24 rounded-full mb-2`}
          />
          <Text style={tw`text-lg font-semibold text-black`}>
            {profile.name}
          </Text>
          <Text style={tw`text-gray-500`}>{profile?.email}</Text>
        </View>

        {/* Account Options */}
        <View style={tw`bg-gray-100 rounded-xl p-4 mb-6`}>
          <TouchableOpacity style={tw`flex-row items-center py-3`}>
            <Ionicons name="person-outline" size={20} color="black" />
            <Text style={tw`ml-3 text-base text-black`}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex-row items-center py-3`}>
            <Ionicons name="key-outline" size={20} color="black" />
            <Text style={tw`ml-3 text-base text-black`}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex-row items-center py-3`}>
            <Ionicons name="notifications-outline" size={20} color="black" />
            <Text style={tw`ml-3 text-base text-black`}>Notifications</Text>
          </TouchableOpacity>
        </View>

        {/* Support & Log out */}
        <View style={tw`bg-gray-100 rounded-xl p-4`}>
          <TouchableOpacity style={tw`flex-row items-center py-3`}>
            <Ionicons name="help-circle-outline" size={20} color="black" />
            <Text style={tw`ml-3 text-base text-black`}>Help & Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex-row items-center py-3`}>
            <Ionicons name="log-out-outline" size={20} color="red" />
            <Text style={tw`ml-3 text-base text-red-500`}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
