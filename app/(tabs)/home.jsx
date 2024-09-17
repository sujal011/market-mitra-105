import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Home/Header";

import ProductListByCategory from "../../components/Home/ProductListByCategory";
import Colors from "../../constants/Colors";
import { createUser } from "../../lib/appwrite-config";

export default function Home() {
  // useEffect(()=>{
  //   createUser();
  // },[])

  return (
    <SafeAreaView
      style={{
        height: "100%",
        width: "100%",
        padding: 20,
        marginTop: 20,
      }}
    >
      <View
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <Header />

        {/* maybe- slider */}

        {/* category */}
        <ScrollView nestedScrollEnabled={true}>
          <ProductListByCategory />
        </ScrollView>

        {/* products */}

        {/*Add New Pet Conditional Rendering */}
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: "5%",
          width: "100%",
        }}
      ></View>
    </SafeAreaView>
  );
}
