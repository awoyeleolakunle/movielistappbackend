import { Document, Schema, model, Types } from "mongoose";

export interface UserModel extends Document {
  id: Types.ObjectId;
  emailAddress: string;
  password: string;
  phoneNumber?: string;
  dateCreated?: Date;
  accessType?: string[];
}

const userSchema = new Schema<UserModel>({
  emailAddress: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  dateCreated: { type: Date },
  accessType: { type: [String] },
});

export default model<UserModel>("User", userSchema);
