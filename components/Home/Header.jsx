import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";

export default function Header() {
    const user = auth().currentUser;
    const router = useRouter();
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <View>
                <Text
                    style={{
                        fontFamily: "outfit",
                        fontSize: 18,
                    }}
                >
                    Welcome,
                </Text>
                <Text
                    style={{
                        fontFamily: "outfit-med",
                        fontSize: 25,
                    }}
                >
                    {user?.displayName}
                </Text>
            </View>
            <TouchableOpacity
                onPress={() => {
                    router.push("/(tabs)/profile");
                }}
            >
                <Image
                    source={{ uri: user?.photoURL }}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 99,
                    }}
                />
            </TouchableOpacity>
        </View>
    );
}
