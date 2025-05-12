import { ObjectId } from "mongodb";

export interface Card {
  _id?: ObjectId;
  title: string;
  description: string;
  createdAt?: Date;
}
