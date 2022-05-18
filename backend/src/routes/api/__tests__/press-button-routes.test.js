import routes from '../press-button-routes';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import axios from 'axios';
import connectToDatabase from '../../../database/db-connect';
import { PressButton } from '../../../database/schema';

let mongod, app, server;

const TEST_PORT = 6666;

// Some dummy data to test with
const pressedButton = {
  _id: new mongoose.mongo.ObjectId('000000000000000000000001'),
  pressed: true,
};

const unpressedButton = {
  _id: new mongoose.mongo.ObjectId('000000000000000000000002'),
  pressed: false,
};

const dummyButtons = [pressedButton, unpressedButton];

// Start database and server before any tests run
beforeAll(async (done) => {
  mongod = new MongoMemoryServer();

  await mongod.getUri().then((cs) => connectToDatabase(cs));

  app = express();
  app.use(express.json());
  app.use('/api/pressButtons', routes);
  server = app.listen(TEST_PORT, done);
});

// Populate database with dummy data before each test
beforeEach(async () => {
  await PressButton.insertMany(dummyButtons);
});

// Clear database after each test
afterEach(async () => {
  await PressButton.deleteMany({});
});

// Stop db and server before we finish
afterAll((done) => {
  server.close(async () => {
    await mongoose.disconnect();
    await mongod.stop();
    done();
  });
});

it('retrieves a single PressButton successfully', async () => {
  const response = await axios.get(
    `http://localhost:${TEST_PORT}/api/pressButtons/get/000000000000000000000001`
  );
  expect(response.status).toBe(200);

  const responseButton = response.data;
  expect(responseButton._id.toString()).toEqual(pressedButton._id.toString());
  expect(responseButton.pressed).toEqual(pressedButton.pressed);
});

it('Creates a new PressButton', async () => {
  const newPressButton = {
    pressed: false,
  };

  const response = await axios.post(
    `http://localhost:${TEST_PORT}/api/pressButtons`,
    newPressButton
  );

  // Check response is as expected
  expect(response.status).toBe(201);
  expect(response.data).toBeDefined();
  const rButton = response.data;
  expect(rButton.pressed).toBe(false);
  expect(rButton._id).toBeDefined();
  expect(response.headers.location).toBe(`/api/pressButtons/${rButton._id}`);

  // Check that the PressButton was actually added to the database
  const dbButton = await PressButton.findById(rButton._id);
  expect(dbButton.pressed).toBe(false);
});

it('updates a PressButton state successfully', async () => {
  const toUpdate = {
    _id: new mongoose.mongo.ObjectId('000000000000000000000001'),
    pressed: false,
  };

  const response = await axios.put(
    `http://localhost:${TEST_PORT}/api/pressButtons/set/000000000000000000000001`,
    toUpdate
  );

  // Check response
  expect(response.status).toBe(204);

  // Ensure DB was updated
  const dbButton = await PressButton.findById('000000000000000000000001');
  expect(dbButton.pressed).toBe(false);
});

it('Gives a 404 when updating a nonexistant PressButton', async () => {
  try {
    const toUpdate = {
      _id: new mongoose.mongo.ObjectId('000000000000000000000010'),
      pressed: true,
    };

    await axios.put(
      `http://localhost:${TEST_PORT}/api/pressButtons/set/000000000000000000000010`,
      toUpdate
    );
    fail('Should have returned a 404');
  } catch (err) {
    const { response } = err;
    expect(response).toBeDefined();
    expect(response.status).toBe(404);

    // Make sure something wasn't added to the db
    expect(await PressButton.countDocuments()).toBe(2);
  }
});
