import express from 'express';
import * as pressButtonDao from '../../database/dao';

// const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

const router = express.Router();

// Create a press button
router.post('/', async (req, res) => {
  const newButton = await pressButtonDao.createPressButton(req.body);
  res
    .status(HTTP_CREATED)
    .header('location', `/api/pressButtons/${newButton._id}`)
    .json(newButton);
});

// Retrieve single press button
router.get('/get/:id', async (req, res) => {
  const { id } = req.params;
  const pressButton = await pressButtonDao.retrievePressButton(id);
  if (pressButton) {
    res.json(pressButton);
  } else {
    res.sendStatus(HTTP_NOT_FOUND);
  }
});

// Update state
router.put('/set/:id', async (req, res) => {
  const { id } = req.params;
  const pressButton = {
    ...req.body,
    _id: id,
  };
  // console.log(pressButton)
  const success = await pressButtonDao.updatePressButton(pressButton);
  res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);
});

export default router;
