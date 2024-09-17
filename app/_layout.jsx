import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { View, ActivityIndicator } from "react-native";
import Colors from "../constants/Colors";
import { useFonts } from "expo-font";
import { createUser, getUser } from "../lib/appwrite-config";

export default function RootLayout() {
  const [initializing, setIniitializing] = useState(true);
  const [user, setUser] = useState();
  const router = useRouter();
  const segments = useSegments();

  const [loaded, err] = useFonts({
    "outfit": require("./../assets/fonts/Outfit-Regular.ttf"),
    "outfit-med": require("./../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("./../assets/fonts/Outfit-Bold.ttf"),
  });

  const onAuthStateChanged = async (user) => {
    setUser(user);
    const res = await getUser(user.uid)
    if (res.length === 0){
        const newUser = await createUser(user.uid,user.email,user.displayName,user.photoURL);
    }
    if (initializing) setIniitializing(false);
  };

  useEffect(() => {
    const subscribe = auth().onAuthStateChanged(onAuthStateChanged);

    return subscribe;
  }, []);

  useEffect(() => {
    if (initializing) return;

    const inTabsGroup = segments[0] === "(tabs)";

    if (user && !inTabsGroup) {
      router.replace("/(tabs)/home");
    } else if (!user && inTabsGroup) {
      router.replace("/");
    }
  }, [user, initializing]);

  if ( !loaded) return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size={"large"} color={Colors.PRIMARY} />
    </View>
  )

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
