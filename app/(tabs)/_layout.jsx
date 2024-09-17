import React from "react";
import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constants/Colors";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.PRIMARY,
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Entypo name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="add-new-product"
                options={{
                    title: "Add",
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="add-circle" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Entypo name="user" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
