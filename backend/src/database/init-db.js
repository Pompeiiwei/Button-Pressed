/**
 * init a test press button
 */

import { createPressButton, retrievePressButton } from './dao';
import mongoose from 'mongoose';

export default async function init() {
  const result = await retrievePressButton('000000000000000000000008');
  if (!result)
    createPressButton({
      _id: new mongoose.mongo.ObjectId('000000000000000000000008'),
      pressed: false,
    });
}
