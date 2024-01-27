import { Document, Schema, model, Types } from "mongoose";

export interface UserModel extends Document {
  id: Types.ObjectId;
  emailAddress: string;
  password: string;
  phoneNumber: string;
  dateCreated: number;
  accessType: string[];
}

const userSchema = new Schema<UserModel>({
  emailAddress: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  dateCreated: { type: Number },
  accessType: { type: [] },
});

export default model<UserModel>("user", userSchema);
