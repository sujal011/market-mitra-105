import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
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

  const OnDeletePost = async (id) => {
    try {
      setLoader(true)
      await databases.deleteDocument(
        config.databaseId,
        config.productsCollectionId,
        id
      )
      Alert.alert("Product Deleted Successfully.")
      await getUserProducts();
    } catch (error) {
      Alert.alert("Error Deleting your Product.")
    }finally{
      setLoader(false)
    }
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
        height:'100%'
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-med",
          fontSize: 30,
          height:"10%"
        }}
      >
        My Products
      </Text>
      {loader && <ActivityIndicator size={"large"} color={Colors.PRIMARY} />}
      <View style={{
        height:'90%',
        marginBottom:'90%'
      }}>

      <FlatList
        numColumns={2}
        data={userProducts}
        refreshing={loader}
        onRefresh={() => getUserProducts()}
        renderItem={({ item, index }) => (
          <View styles={styles.container}>

          <ProductListItem item={item} />
          <TouchableOpacity 
          onPress={async()=>{
            await OnDeletePost(item.$id);
          }}
          style={styles.myButton}>
                  <Text style={{
                    fontFamily:"outfit-med",
                    color:'#B8001F'
                  }}>Delete</Text>
                </TouchableOpacity>
          </View>
        )}
        />
        </View>

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
  myButton:{
      borderWidth:1,
      borderRadius:15,
      borderColor:"#B8001F",
      padding:'3%',
      width:'80%',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      marginVertical:'2%'
    },
    container:{
      display:'flex',
      justifyContent:'center',
      flexDirection:'column',
      alignItems:'center',
      margin:'auto'
    }
});