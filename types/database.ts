import { Models } from "react-native-appwrite";

export enum TASK_IS_DONE_ENUM {
  NOT_DONE = 0,
  DONE = 1,
}

export interface Task extends Models.Document {
  user_id: string;
  title: string;
  is_done: TASK_IS_DONE_ENUM;
  imageURL: string;
}
