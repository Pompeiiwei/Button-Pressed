import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const pressButtonSchema = new Schema({
  pressed: Boolean
});

const PressButton = mongoose.model('PressButton', pressButtonSchema);

export { PressButton };
