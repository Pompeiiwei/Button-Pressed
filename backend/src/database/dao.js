import { PressButton } from './schema';

export async function createPressButton(pressButton) {
  const db = new PressButton(pressButton);
  await db.save();
  return db;
}
export async function retrieveAllButton() {
  return await PressButton.find();
}
export async function retrievePressButton(id) {
  return await PressButton.findById(id);
}

export async function updatePressButton(button) {
  const result = await PressButton.findByIdAndUpdate(button._id, button, {
    new: true,
    useFindAndModify: false,
  });
  return result ? true : false;
}
