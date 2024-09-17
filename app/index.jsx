import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";
import Colors from "../constants/Colors";

import { SafeAreaView } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const onGoogleButtonPress = async () => {
  GoogleSignin.configure({
    webClientId:
      "159697299149-a46o72jf103lp4mtu20suu2c5en3cc73.apps.googleusercontent.com",
    offlineAccess: true,
  });
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  try {
    const result = await GoogleSignin.signIn();
    // console.log(result);
    const idToken = result.data.idToken;
    // Alert.alert(JSON.stringify(idToken));
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    Alert.alert("error", error);
  }
};

export default function LoginScreen() {
  // const onPress = () => {
  //   onGoogleButtonPress().then(() => console.log("signed in with google"));
  // };
  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: Colors.BG,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: "5%",
      }}
    >
      <Image
        source={require("./../assets/images/farmer-using-smartphone.jpg")}
        style={{
          width: "100%",
          height: "73%",
          position: "absolute",
          top: "9%",
        }}
      />
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: "9%",
          width: "80%",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            onGoogleButtonPress().then(() =>
              console.log("Signed in with Google!"),
            )
          }
          style={{
            width: "100%",
            backgroundColor: Colors.PRIMARY,
            textAlign: "center",
            borderRadius: 15,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "5%",
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 20,
              color: Colors.BG,
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
