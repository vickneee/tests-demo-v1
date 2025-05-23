const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app-tours'); // Your Express app
const Tour = require('../models/tourModel');
const User = require('../models/userModel');

// Create a new instance of the supertest agent
const api = supertest(app);

const tours = [
  {
    name: 'Helsinki in 5 Days Tour',
    info: 'Discover the charm of Helsinki in 5 days with our expert guides.',
    image: 'https://www.course-api.com/images/tours/tour-1.jpeg',
    price: '1900',
  },
  {
    name: 'London in 7 Days Tour',
    info: 'Explore the best of London in 7 days with our expert guides.',
    image: 'https://www.course-api.com/images/tours/tour-2.jpeg',
    price: '2195',
  },
];

let token = null;

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api
  .post('/api/users/signup')
  .send({
    name: 'John Doe',
    email: 'john@example.com',
    password: '4wa94=Vr++',
    phone_number: '1234567890',
    gender: 'Male',
    date_of_birth: '1990-01-01',
    membership_status: 'Inactive',
  });
  token = result.body.token;
});

describe('Given there are initially some tours saved', () => {
  beforeEach(async () => {
    await Tour.deleteMany({});
    await Promise.all([
      api.post('/api/tours').
        set('Authorization', 'bearer ' + token).
        send(tours[0]),
      api.post('/api/tours').
        set('Authorization', 'bearer ' + token).
        send(tours[1]),
    ]);
  });
  
  describe('Fetching Tours', () => {
    it('should return all tours as JSON when GET /api/tours is called', async () => {
        await api
        .get('/api/tours')
        .set('Authorization', 'bearer ' + token)
        .expect(200)
        .expect('Content-Type', /application\/json/);
      },
    );
  });
  
  it('should create one tour when POST /api/tours is called', async () => {
    const newTour = {
      name: 'Paris in 3 Days Tour',
      info: 'Experience the beauty of Paris in just 3 days.',
      image: 'https://www.course-api.com/images/tours/tour-3.jpeg',
      price: '1500',
    };
    await api.post('/api/tours')
    .set('Authorization', 'bearer ' + token)
    .send(newTour)
    .expect(201);
  });
  
  it('should return one tour by ID when GET /api/tours/:id is called', async () => {
      const tour = await Tour.findOne();
      
      await api
      .get(`/api/tours/${tour._id}`)
      .set('Authorization', 'bearer ' + token)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    },
  );
  
  it('should update one tour by ID when PUT /api/tours/:id is called', async () => {
      const tour = await Tour.findOne();
      
      const updatedTour = {
        name: 'Updated Tour Name',
        info: 'Updated tour information.',
        image: 'https://www.course-api.com/images/tours/tour-4.jpeg',
        price: '2000',
      };
      await api
      .patch('/api/tours/' + tour._id)
      .set('Authorization', 'bearer ' + token)
      .send(updatedTour)
      .expect(200);
      const updatedTourCheck = await Tour.findById(tour._id);
      expect(updatedTourCheck.toJSON()).toEqual(
        expect.objectContaining(updatedTour),
      );
    },
  );
  
  it(
    'should delete one tour by ID when DELETE /api/tours/:id is called', async () => {
      const tour = await Tour.findOne();
      
      await api
      .delete('/api/tours/' + tour._id)
      .set('Authorization', 'bearer ' + token)
      .expect(204);
      const tourCheck = await Tour.findById(tour._id);
      expect(tourCheck).toBeNull();
    },
  );
});

afterAll(() => {
  mongoose.connection.close();
});
