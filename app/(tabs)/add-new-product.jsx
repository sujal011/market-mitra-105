import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";
import { config, databases } from "../../lib/appwrite-config";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ID, Query } from "react-native-appwrite";
import storage from "@react-native-firebase/storage";
import { utils } from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";

const AddNewProduct = () => {
  const navigation = useNavigation();
  const user = auth().currentUser;
  const cEmailAddress = user?.email;
  const userId = user.uid;
  let imageUrl = ""



  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("vegetables");
  // const [selectedCategoryId,setSelectedCategoryId]=useState();
  const [unit, setUnit] = useState("kilograms");
  const [image, setImage] = useState("");
  // const [imageUri, setImageUri] = useState("");
  const [filename, setFilename] = useState("");
  // const [mimetype,setMimetype] = useState();
  // const [userId, setUserId] = useState("");

  const [formData, setFormData] = useState({
    category: "Vegetables",
    unit: "Kilogram",
  });
  const [loader, setLoader] = useState(false);

  const getCategories = async () => {
    const response = await databases.listDocuments(
      config.databaseId,
      config.categoriesCollenctionId,
    );
    setCategories(response.documents);
  };

  // for getting image from user
  const options = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  }
  const imagePicker = async (useLibrary) => {
    let result;
    if(useLibrary){

      result = await ImagePicker.launchImageLibraryAsync(options);
      console.log(result);

    }else{
      // await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync(options);
      console.log(result);
    }
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setFilename(result.assets[0].fileName);
    }
  };

  const handleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const uploadImage = async () => {
    try {
      const date = Date.now();
      const newFile = (`${date}.${filename}`);
      const reference = storage().ref(newFile);
  const response = await reference.putFile(image);
  console.log("resonse: ", response);

  imageUrl = await storage().ref(newFile).getDownloadURL();
  // setImageUri(imageUrl);
  console.log("image uploaded: ",imageUrl);
    } catch (error) {
      console.error("error uploading image: ",error);
    }

};

  const saveFormData = async () => {
    try {
      setLoader(true);

      if(imageUrl==""){
        await uploadImage();
        await onSubmit();
      }else{
      const newProduct = await databases.createDocument(
        config.databaseId,
        config.productsCollectionId,
        ID.unique(),
        {
          name: formData.name,
          price: parseInt(formData.price),
          description: formData.description,
          image: imageUrl,
          unit: unit,
          categories: selectedCategory,
          users: userId,
          email: cEmailAddress,
          phone_number: formData.phone_number,
        },
      );
      console.log(newProduct);
      Alert.alert("Your Product Successfully Uploaded")
      return newProduct;
    }
    } catch (e) {
      Alert.alert("Error Posting Your Product: ",JSON.stringify(e));
    } finally {
      setLoader(false);
    }
  };

  const onSubmit = async () => {

    if (Object.keys(formData).length != 6) {
      ToastAndroid.show("Enter All Details", ToastAndroid.SHORT);
    }
    else if (formData.phone_number.length != 10) {
      ToastAndroid.show("Enter 10 digit phone number", ToastAndroid.SHORT);
    }
    else if (image == "") {
      ToastAndroid.show("Upload Image Please", ToastAndroid.SHORT);
    }
    else{
      await saveFormData();
  }


  };
  useEffect(() => {
    navigation.setOptions({
      headerTransparent: false,
      headerTitle: "Add New Product",
    });
    getCategories();

  }, []);
  return (
    <SafeAreaView
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
        }}
        style={{
          padding: 20,
          height: "100%",
          width: "100%",
          marginTop: "6%",
          margin: "3%",
        }}
      >
        <View style={{}}>
        <Text
          style={{
            fontFamily: "outfit-med",
            fontSize: 20,

          }}
        >
          Add New Product
        </Text>
        </View>


        {/* image */}
        <View style={{}}>
          {!image ? (
            <View style={{
              display:'flex',
              justifyContent:'space-between',
              flexDirection:'row'
            }}>

            <TouchableOpacity 
            onPress={()=>{imagePicker(true)}} 
            style={{
              display:'flex',
              justifyContent:'center',
            }}>

            <Ionicons
              style={{
                // width: 175,
                // height: 175,
                borderRadius: 15,
                borderColor: Colors.GRAY,
              }}
              name="image-outline"
              size={150}
              color={Colors.GRAY}
              />
              <Text
          style={{
            fontFamily: "outfit",
            fontSize: 20,

          }}
        >
          Upload Image
        </Text>
              </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>{imagePicker(false)}} style={{
              display:'flex',
              justifyContent:'center',
            }}>

            <Ionicons
              style={{
                // width: 175,
                // height: 175,
                borderRadius: 15,
                borderColor: Colors.GRAY,
              }}
              name="camera"
              size={150}
              color={Colors.GRAY}
              />
              <Text
          style={{
            fontFamily: "outfit",
            fontSize: 20,

          }}
        >
          Capture Image
        </Text>
              </TouchableOpacity>
              </View>

          ) : (
            <TouchableOpacity onPress={imagePicker}>

            <Image
              source={{ uri: image }}
              style={{
                width: 175,
                height: 175,
                borderRadius: 15,
                borderColor: Colors.GRAY,
              }}
              />
              </TouchableOpacity>
          )}
        </View>

        {/* Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name *</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleInputChange("name", value)}
          />
        </View>
        {/* Price */}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Price *</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            onChangeText={(value) => handleInputChange("price", value)}
          />
        </View>

        {/*Phone Number */}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number *</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            onChangeText={(value) => handleInputChange("phone_number", value)}
          />
        </View>

        {/* Category */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Category *</Text>
          <Picker
            selectedValue={selectedCategory}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) => {
              // console.log(itemValue);

              setSelectedCategory(itemValue);
              handleInputChange("category", itemValue);
            }}
          >
            {categories.map((category, index) => (
              <Picker.Item
                key={index}
                label={category.name}
                value={category.$id}
              />
            ))}
          </Picker>
        </View>

        {/* unit */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Unit *</Text>
          <Picker
            selectedValue={unit}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) => {
              // console.log(itemValue);
              setUnit(itemValue);
              handleInputChange("unit", itemValue);
            }}
          >
            <Picker.Item label="Kilogram" value="kilograms" />
            <Picker.Item label="Dozen" value="dozen" />
            <Picker.Item label="Gram" value="grams" />
            <Picker.Item label="Litre" value="liters" />
            <Picker.Item label="Pieces" value="pieces" />
            <Picker.Item label="MiliLitre" value="milliLiters" />
          </Picker>
        </View>

        {/* Description */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={styles.input}
            numberOfLines={5}
            multiline={true}
            onChangeText={(value) => handleInputChange("description", value)}
          />
        </View>

        {/* Submit */}
        <TouchableOpacity
          onPress={onSubmit}
          style={styles.button}
          disabled={loader}
        >
          {loader ? (
            <ActivityIndicator size={"large"} color={Colors.BG} />
          ) : (
            <Text
              style={{
                fontFamily: "outfit-med",
                textAlign: "center",
                color: Colors.BG,
                fontSize: 20,
              }}
            >
              Submit
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddNewProduct;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
    width: "95%",
  },
  input: {
    padding: 10,
    backgroundColor: Colors.BG,
    borderRadius: 7,
    fontFamily: "outfit",
  },
  label: {
    marginVertical: 5,
    fontFamily: "outfit",
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 7,
    marginVertical: 10,
    marginBottom: 15,
    width: "95%",
  },
});