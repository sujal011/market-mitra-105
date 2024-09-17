import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { openURL } from "expo-linking";

const OwnerInfo = ({ users, phone_number }) => {
  const openWP = () => {
    const phoneNumber = phone_number ? phone_number : users.phone_number;
    openURL(
      `https://wa.me/+91${phoneNumber}?text=I'm%20interested%20in%20buying%20your%20product`,
    );
  };
  const openCall = () => {
    const phoneNumber = phone_number ? phone_number : users.phone_number;
    openURL(`tel:+91${phoneNumber}`);
  };

  return (
    <View>
      <View
        style={{
          borderWidth: 1,
          borderRadius: 15,
          padding: 10,
          marginVertical: "5%",
          marginHorizontal: "2%",
          paddingHorizontal: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={styles.container}>
          <Image
            source={{ uri: users?.avatar }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 90,
            }}
          />
          <View>
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 18,
              }}
            >
              Farmer
            </Text>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 17,
              }}
            >
              {users?.fullname}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Ionicons name="send" size={30} color={Colors.PRIMARY} />
        </View>
      </View>
      <View
        style={{
          borderRadius: 15,
          padding: 10,
          marginVertical: "1%",
          marginHorizontal: "2%",
          paddingHorizontal: 20,
          paddingVertical: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={openCall}
          style={{
            backgroundColor: Colors.PRIMARY,
            padding: "3%",
            borderRadius: 20,
          }}
        >
          <Ionicons name="call" size={50} color={Colors.BG} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={openWP}
          style={{
            backgroundColor: Colors.PRIMARY,
            padding: "3%",
            borderRadius: 20,
          }}
        >
          <Ionicons name="logo-whatsapp" size={50} color={Colors.BG} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OwnerInfo;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    // justifyContent:'space-between',
    alignItems: "center",
    gap: 20,
  },
});
