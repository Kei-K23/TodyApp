import { Account, Client, Databases } from "react-native-appwrite";
import {
  APPWRITE_API_ENDPOINT,
  APPWRITE_PLATFORM_NAME,
  APPWRITE_PROJECT_ID,
} from "./constants";

export const client = new Client()
  .setEndpoint(APPWRITE_API_ENDPOINT!)
  .setProject(APPWRITE_PROJECT_ID!)
  .setPlatform(APPWRITE_PLATFORM_NAME!);

export const account = new Account(client);
export const databases = new Databases(client);
