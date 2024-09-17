import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductInfo from "../../components/ProductDetails/ProductInfo";
import { config, databases } from "../../lib/appwrite-config";
import { Query } from "react-native-appwrite";
import { ActivityIndicator } from "react-native";
import Colors from "../../constants/Colors";

export default function ProductDetails() {
  const { productId } = useLocalSearchParams();

  const navigation = useNavigation();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSingleProduct = async () => {
    try {
      setLoading(true);
      const response = await databases.listDocuments(
        config.databaseId,
        config.productsCollectionId,
        [Query.equal("$id", productId)],
      );
      setProduct(response.documents[0]);
      console.log(product);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
    });
    getSingleProduct();
  }, []);
  return (
    <SafeAreaView
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/*Product  Info */}
      {loading ? (
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      ) : (
        <ProductInfo product={product} />
      )}

      {/*Product Properties  */}

      {/*About  */}

      {/*Farner Details  */}

      {/*Contact Button  */}
    </SafeAreaView>
  );
}
