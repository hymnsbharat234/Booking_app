import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function TabLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#2AAE72",
        tabBarInactiveTintColor: "#727272",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          paddingBottom: 2,
        },
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#2a2a2a",
          height: 60 + insets.bottom, // adds safe area height
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8, // ensures space on devices with nav bars
          paddingTop: 6,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
      })}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Booking"
        options={{
          title: "Booking",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="cog" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 size={24} name="user-cog" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
