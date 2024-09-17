import { Image, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import Colors from "../../constants/Colors";

export default function ProductListItem({ item }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "/product-details",
          params: { productId: item.$id },
        });
      }}
      style={{
        marginTop: "2%",
        marginBottom: "2%",
      }}
    >
      <View
        style={{
          padding: 10,
          marginRight: 10,
          backgroundColor: "#fff",
          borderRadius: 10,
        }}
      >
        <Image
          source={{ uri: item?.image }}
          style={{
            width: 150,
            height: 135,
            objectFit: "cover",
            borderRadius: 10,
          }}
        />
        <Text
          style={{
            fontFamily: "outfit-med",
            fontSize: 18,
          }}
        >
          {item.name}
        </Text>
        <View>
          <Text
            style={{
              color: Colors.PRIMARY,
              fontfamily: "outfit",
            }}
          >
            ₹ {item?.price} / {item?.unit}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
