import { Client, ID, Databases, Query } from "react-native-appwrite";
export const config = {
  endpoint: process.env.EXPO_PUBLIC_ENDPOINT,
  platform: process.env.EXPO_PUBLIC_PLATFORM,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_DATABASE_ID,
  userCollectionId: process.env.EXPO_PUBLIC_USER_COLLECTION_ID,
  productsCollectionId: process.env.EXPO_PUBLIC_PRODUCTS_COLLECTION_ID,
  categoriesCollenctionId: process.env.EXPO_PUBLIC_CATEGORIES_COLLECTION_ID,
  sliderCollectionId: process.env.EXPO_PUBLIC_SLIDERS_COLLECTION_ID
};

const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

// const account = new Account(client);
const databases = new Databases(client);

export const createUser = async (userId, clerkEmail, clerkName, cAvatar) => {
  try {
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      userId,
      {
        fullname: clerkName,
        email: clerkEmail,
        isFarmer: false,
        avatar: cAvatar,
      },
    );
    return newUser;
  } catch (e) {
    console.error(e);
  }
};

export const getUsers = async () => {
  const response = await databases.listDocuments(
    config.databaseId,
    config.userCollectionId,
  );
  return response.documents;
};

export const getUser = async (id) => {
  const response = await databases.listDocuments(
    config.databaseId,
    config.userCollectionId,
    [Query.equal("$id", [id])],
  );
  return response.documents;
};

export { client, databases };
