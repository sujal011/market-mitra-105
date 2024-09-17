import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import ProductListItem from "../../components/Home/ProductListItem";
import Colors from "../../constants/Colors";
import { config, databases } from "../../lib/appwrite-config";
import auth from "@react-native-firebase/auth";
import { Query } from "react-native-appwrite";

const UserProducts = () => {
  const navigation = useNavigation();
  const [userProducts, setUserProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const user = auth().currentUser;
  const cEmailAddress = user?.email;

  const getUserProducts = async () => {
    try {
      setLoader(true);
      const response = await databases.listDocuments(
        config.databaseId,
        config.productsCollectionId,
        [Query.equal("email", cEmailAddress)],
      );
      setUserProducts(response.documents);
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  const OnDeletePost = (id) => {
    console.log("delete this ", id);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "",
    });
    getUserProducts();
  }, []);
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-med",
          fontSize: 30,
        }}
      >
        My Products
      </Text>
      {loader && <ActivityIndicator size={"large"} color={Colors.PRIMARY} />}
      <FlatList
        numColumns={2}
        data={userProducts}
        refreshing={loader}
        onRefresh={() => getUserProducts()}
        renderItem={({ item, index }) => <ProductListItem item={item} />}
      />

      {userProducts?.length == 0 && <Text>No Product Found</Text>}
    </View>
  );
};

export default UserProducts;

const styles = StyleSheet.create({
  deleteButton: {
    bakgroundColor: Colors.LIGHT_PRIMARY,
    padding: 5,
    borderRadius: 3,
    marginTop: 5,
    marginRight: 10,
  },
});
