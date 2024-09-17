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
  import MaterialIcons from '@expo/vector-icons/MaterialIcons';
  
  const UserProducts = () => {
    const navigation = useNavigation();
    const [userProducts, setUserProducts] = useState([]);
    const [loader, setLoader] = useState(false);
    const [delLoader, setDelLoader] = useState(false);
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
        setDelLoader(true)
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
        setDelLoader(false)
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
        {(delLoader || loader) && (
                <View style={{
                  height:'100%',
                  width:'100%',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center'
                }}>
                <ActivityIndicator size={"large"} color={Colors.PRIMARY}/>
                  </View>
              )}
        <FlatList
          numColumns={2}
          data={userProducts}
          refreshing={loader}
          onRefresh={() => getUserProducts()}
          renderItem={({ item, index }) => (
  
            <View>
            
              <ProductListItem item={item}/>
              
                <TouchableOpacity 
                onPress={async ()=> await OnDeletePost(item.$id)}
                style={{
                  borderWidth:1,
                  borderRadius:15,
                  borderColor:"#B8001F",
                  padding:'3%',
                  marginVertical:'1%',
                  display:'flex',
                  flexDirection:'row',
                  justifyContent:'center',
                  gap:'2%',
                  alignItems:'center'
                }}>
  
  <MaterialIcons name="delete-outline" size={24} color="#B8001F" />
                  <Text style={{
                    fontFamily:"outfit-med"
                  }}>Delete</Text>
  
                </TouchableOpacity>
                
              </View>
          )
        }
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
  