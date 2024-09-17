import { View, Text, FlatList, Image, Alert, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Category from "./Category";
import { config, databases } from "../../lib/appwrite-config";
import { Query } from "react-native-appwrite";
import ProductListItem from "./ProductListItem";

export default function ProductListByCategory() {
    const [products, setProducts] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        getProducts("vegetables");
    }, []);

    const getProducts = async (category) => {
        // setProducts([])
        setLoader(true);
        try {
            const response = await databases.listDocuments(
                config.databaseId,
                config.productsCollectionId,
                [Query.equal("categories", [category])],
            );
            setProducts(response.documents);
        } catch (error) {
            Alert.alert(error.message);
        } finally {
            setLoader(false);
        }
        // console.log(products)
    };

    return (
        <View style={{
            height:'100%'
        }}>
            <View>
            <Category category={(value) => getProducts(value)} />
            </View>
                <View style={{
                    marginBottom:'100%'
                }}>

                <FlatList
                    numColumns={2}
                    data={products}
                    refreshing={loader}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    onRefresh={() => getProducts("vegetables")}
                    renderItem={({ item, index }) => (
                        <ProductListItem item={item} />
                    )}
                    />
           
                </View>
            
        </View>
    );
}
