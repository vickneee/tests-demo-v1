const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app-workouts'); // Your Express app
const User = require('../models/userModel');
const Workout = require('../models/workoutModel');
const workouts = require('../data/workouts.js');

// Create a new instance of the supertest agent
const api = supertest(app);

let token = null;

// Setup before all tests
beforeAll(async () => {
  await User.deleteMany({});
  const result = await api
  .post('/api/user/signup')
  .send({
    name: "John Doe",
    email: "test@example.com",
    password: "S5g5T7!et",
    phone_number: '1234567890',
    gender: 'male',
    date_of_birth: '1990-01-01',
    membership_status: 'inactive'
  });
  token = result.body.token;
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
  });
  
  describe('Fetching Workouts', () => {
    
    it('should return workouts as JSON', async () => {
      
      await api
      .get('/api/workouts')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    });
  });
  
  describe('Adding Workouts', () => {
    
    it('should successfully add a new workout', async () => {
      const newWorkout = {
        title: 'testworkout',
        reps: 10,
        load: 100,
      };
      
      await api
      .post('/api/workouts')
      .set('Authorization', `Bearer ${token}`)
      .send(newWorkout)
      .expect(201);
    });
  });
  
  describe('Fetching a Single Workout by id', () => {
  
    it('should return workout as JSON', async () => {
      const workout = await Workout.findOne();
      
      await api
      .get(`/api/workouts/${workout._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    });
  });
  
  describe('Update Workout by id', () => {
    
    it('should successfully update a workout', async () => {
      const workout = await Workout.findOne();
      
      const updateWorkout = {
        title: 'Updated workout',
      };
      await api
      .patch(`/api/workouts/${workout._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updateWorkout)
      .expect(200);
    });
  });
  
  describe('Delete a Single Workout by id', () => {
    it('should return workout as JSON', async () => {
      const workout = await Workout.findOne();
      
      await api
      .delete(`/api/workouts/${workout._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);
      const tourCheck = await Workout.findById(workout._id);
      expect(tourCheck).toBeNull();
    });
  });
});

// Cleanup after all tests
afterAll(async () => {
  await mongoose.connection.close();
});
