import { Client, Account } from "react-native-appwrite";
import { ID,Databases } from "react-native-appwrite";
export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.ScreenBuds",
  projectId: "66e7ef58000705877878",
  databseId: "66e7f0b500009ed54283",
  userCollectionId: "66e7f0d6003c747f4509",
  timeCollectionId: "66e7f1030036b709083e",
  storageId: "66e7f5320015078f8579",
};
// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const databases = new Databases(client);

// Async function to create a new user
export async function createUser(email, password, username) {
    try {
      const response = await account.create(ID.unique(), email, password, username);
      if(!response) throw Error;
      console.log("User created successfully:", response);
      await SignIn(email,password);
      const newUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        {
          accountId: newAccount.$id,
          email: email,
          username: username,
        }
      );
  
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw error; // Throw the error to handle it in calling function
    }
  }

export async function SignIn(email,password) {
    try {
        const session = await account.createEmailSession(email,password);
        return session;
    } catch (error) {
        throw new Error(error);
    }
}