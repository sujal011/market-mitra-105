import {
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { config, databases } from "../../lib/appwrite-config";
import Colors from "../../constants/Colors";

export default function Category({ category }) {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("vegetables");

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        const response = await databases.listDocuments(
            config.databaseId,
            config.categoriesCollenctionId,
        );
        setCategories(response.documents);
    };

    //   categories.map

    return (
        <View
            style={{
                marginTop: 20,
            }}
        >
            <Text
                style={{
                    fontFamily: "outfit-med",
                    fontSize: 20,
                }}
            >
                Category
            </Text>
           
                <FlatList
                    data={categories}
                    horizontal={true}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedCategory(item.$id);
                                category(item.$id);
                            }}
                            style={{
                                flex: 1,
                            }}
                        >
                            <View
                                style={[
                                    styles.container,
                                    selectedCategory == item.$id &&
                                        styles.selectedCategory,
                                ]}
                            >
                                <Image
                                    source={{ uri: item?.image }}
                                    style={{
                                        width: 40,
                                        height: 40,
                                    }}
                                />
                            </View>
                            <Text
                                style={{
                                    textAlign: "center",
                                    fontFamily: "outfit",
                                    color: "black",
                                }}
                            >
                                {item?.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.BG,
        padding: 15,
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 15,
        borderColor: "black",
        margin: 5,
    },
    selectedCategory: {
        backgroundColor: Colors.PRIMARY,
    },
});
