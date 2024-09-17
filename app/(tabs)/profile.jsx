import { Text, View, TouchableOpacity, Image, FlatList } from "react-native";

import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import auth from "@react-native-firebase/auth";

export default function Profile() {
  const user = auth().currentUser;

  const Menu = [
    {
      id: 1,
      name: "List Your Product",
      icon: "add-circle",
      path: "/(tabs)/add-new-product",
    },
    {
      id: 2,
      name: "My Products",
      icon: "bookmark",
      path: "/user-products",
    },
    {
      id: 3,
      name: "Inbox",
      icon: "chatbubble",
      path: "/(tabs)/inbox",
    },
    {
      id: 4,
      name: "logout",
      icon: "exit",
    },
  ];

  const router = useRouter();
  const onPressMenu = (menu) => {
    if (menu.name == "logout") {
      auth().signOut();
      router.replace("/")
    } else {
      router.push(menu.path);
    }
  };
  return (
    <View
      style={{
        padding: 20,
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-med",
          fontSize: 30,
        }}
      >
        Profile
      </Text>

      <View
        style={{
          display: "flex",
          alignltems: "center",
          marginVertical: 25,
        }}
      >
        <Image
          source={{ uri: user?.photoURL }}
          style={{
            width: 80,
            height: 80,
            borderRadius: 99,
          }}
        />

        <Text
          style={{
            fontFamily: "outfit—bold",
            fontSize: 20,
            marginTop: 6,
          }}
        >
          {user?.displayName}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 16,
            color: Colors.GRAY,
          }}
        >
          {user?.email}
        </Text>
      </View>

      <FlatList
        data={Menu}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onPressMenu(item)}
            key={item.id}
            style={{
              marginVertical: 10,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              backgroundColor: Colors.BG,
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Ionicons
              name={item?.icon}
              size={40}
              color={Colors.PRIMARY}
              style={{
                padding: 10,
                backgroundColor: Colors.BG,
                borderRadius: 10,
              }}
            />

            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 20,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
