import { Text, View, Image, ScrollView } from "react-native";

import Colors from "../../constants/Colors";
import OwnerInfo from "./OwnerInfo";

export default function ProductInfo({ product }) {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "50%",
        }}
      >
        <Image
          resizeMode="cover"
          source={{ uri: product?.image }}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>
      <View
        style={{
          padding: "3%",
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 27,
          }}
        >
          {product?.name}
        </Text>

        {/* <ProductSubInfo product={product} /> */}
        <View
          style={{
            padding: "2%",
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 20,
              color: Colors.PRIMARY,
            }}
          >
            ₹ {product?.price} / {product?.unit}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
          }}
        >
          Description:
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 16,
          }}
        >
          {product?.description}
        </Text>
        {/* <Text>{JSON.stringify()}</Text> */}
        <ScrollView>
          <OwnerInfo
            users={product?.users}
            phone_number={product?.phone_number}
          />
        </ScrollView>
      </View>
    </View>
  );
}
