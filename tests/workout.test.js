const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const User = require('../models/userModel');
const Workout = require('../models/workoutModel');
const workouts = require('./data/workouts.js');

let token = null;
let id = null;

// Setup before all tests
beforeAll(async () => {
  await User.deleteMany({});
  const result = await api.post('/api/user/signup').send({
    email: 'mattiv@matti.fi',
    password: 'R3g5T7#gh',
  });
  token = result.body.token;
  id = result.body.id;
});

describe('Workout API Tests', () => {
  beforeEach(async () => {
    await Workout.deleteMany({});
    await api.post('/api/workouts').
      set('Authorization', `Bearer ${token}`).
      send(workouts[0]);
    await api.post('/api/workouts').
      set('Authorization', `Bearer ${token}`).
      send(workouts[1]);
    
    id1 = (await Workout.find({}))[0]._id;
    id2 = (await Workout.find({}))[1]._id;
  });
  
  describe('Fetching Workouts', () => {
    it('should return workouts as JSON', async () => {
      await api.get('/api/workouts').
        set('Authorization', `Bearer ${token}`).
        expect(200).
        expect('Content-Type', /application\/json/);
    });
  });
  
  describe('Adding Workouts', () => {
    it('should successfully add a new workout', async () => {
      const newWorkout = {
        title: 'testworkout',
        reps: 10,
        load: 100,
      };
      await api.post('/api/workouts').
        set('Authorization', `Bearer ${token}`).
        send(newWorkout).
        expect(201);
    });
  });
  
  describe('Fetching a Single Workout by id', () => {
    it('should return workout as JSON', async () => {
      await api.get(`/api/workouts/${id1}`).
        set('Authorization', `Bearer ${token}`).
        expect(200).
        expect('Content-Type', /application\/json/);
    });
  });
  
  describe('Update Workout by id', () => {
    it('should successfully update a workout', async () => {
      const updateWorkout = {
        title: 'update workout',
      };
      await api.patch(`/api/workouts/${id1}`).
        set('Authorization', `Bearer ${token}`).
        send(updateWorkout).
        expect(200);
    });
  });
  
  describe('Delete a Single Workout by id', () => {
    it('should return workout as JSON', async () => {
      await api.delete(`/api/workouts/${id1}`).
        set('Authorization', `Bearer ${token}`).
        expect(204);
      // expect('Content-Type', /application\/json/); // 204 has no content
    });
  });
});

// Cleanup after all tests
afterAll(async () => {
  await mongoose.connection.close();
});
