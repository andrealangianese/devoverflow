import { model, models, Schema, Types } from "mongoose";

export interface IModel {}

const AccountSchema = new Schema<IModel>({});

const Model = models?.Account || model<IModel>("Account", AccountSchema);

export default Model;
