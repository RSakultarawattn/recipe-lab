const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Log = require('../lib/models/Log');
const Recipe = require('../lib/models/recipe');


describe('log routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('creates a log', async() => {
    const recipe = await Recipe.insert({
      name: 'moonshine',
      directions: [
        'make',
        'some',
        'freaking',
        'shine',
        'yo'
      ],
      ingredients: [
        {
          name: 'corn',
          measurement: 'ears',
          amount: 10
        }
      ]
    });
    
    return request(app)
      .post('/api/v1/logs')
      .send({
        dateOfEvent: '2020-12-16', 
        notes: 'yep, some notes and stuff', 
        rating: 8,
        recipeId: recipe.id
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),     
          dateOfEvent: expect.any(String), 
          notes: 'yep, some notes and stuff', 
          rating: 8,
          recipeId: recipe.id
        });
      });
  });
  it('finds a log by id via GET', async() => {
    const recipe = await Recipe.insert({ 
      name: 'moonshine', 
      directions: 
    ['make',
      'some',
      'freaking',
      'shine',
      'yo'
    ],
      ingredients:[
        {
          name: 'corn',
          measurement: 'ears',
          amount: 10
        }
      ]
    });
    
    const log = await Log.insert({
      dateOfEvent: '2020-12-16',
      notes: 'yep, some notes and stuff',
      rating: 8,
      recipeId: recipe.id
    });

    return request(app)
      .get(`/api/v1/logs/${log.id}`)
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          dateOfEvent: expect.any(String),
          notes: 'yep, some notes and stuff',
          rating: 8,
          recipeId: recipe.id
        });
      
      });
    
  });
    
  it('gets all logs', async() => {
    const recipe = await Recipe.insert({
      name: 'moonshine',
      directions: [
        'make',
        'some',
        'freaking',
        'moonshine',
        'yo'
      ],
      ingredients: [
        {
          name: 'corn',
          measurement: 'ears',
          amount: 10

        }
      ]
    });

    const logs = await Promise.all([
      { dateOfEvent: '2020-12-16', notes: 'get baked', rating: 8, recipeId: recipe.id },
      { dateOfEvent: '2020-12-16', notes: 'get baked', rating: 8, recipeId: recipe.id },
      { dateOfEvent: '2020-12-16', notes: 'get way baked', rating: 8, recipeId: recipe.id }

    ].map(log => Log.insert(log)));

    return request(app)
      .get('/api/v1/logs/')
      .then(res => {
        logs.forEach(log => {
          expect(res.body).toContainEqual(log);
        });
      });
  });

  it('updates a log by id', async() => {
    const recipe = await Recipe.insert({
      name: 'moonshine',
      directions: [
        'make',
        'some',
        'freaking',
        'moonshine',
        'yo'
      ],
      ingredients: [
        {
          name: 'corn',
          measurement: 'ears',
          amount: 10
        }
      ]
    });

    const log = await Log.insert({
      dateOfEvent: '2020-12-16',
      notes: 'yep, some notes and stuff',
      rating: 8,
      recipeId: recipe.id
    });

    return request(app)
      .put(`/api/v1/logs/${log.id}`)
      .send({
        dateOfEvent: '2020-12-18',
        notes: 'yep, some more notes and stuff',
        rating: 7,
        recipeId: recipe.id
    
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          dateOfEvent: expect.any(String),
          notes: 'yep, some more notes and stuff',
          rating: 7,
          recipeId: recipe.id
        });
      });
  });

  it('removes a log by id using DELETE', async() => {
    const recipe = await Recipe.insert({
      name: 'moonshine',
      directions: [
        'make',
        'some',
        'shine',
        'yo'
      ],
      ingredients: [
        {
          name: 'corn', 
          measurement: 'ears', 
          amount: 10
        }
      ]
    });

    const log = await Log.insert({
      dateOfEvent: '2020-12-16',
      notes: 'yep, some notes and stuff',
      rating: 8,
      recipeId: recipe.id
    });
    return request(app)
      .delete(`/api/v1/logs/${log.id}`)
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          dateOfEvent: expect.any(String),
          notes: 'yep, some notes and stuff',
          rating: 8,
          recipeId: recipe.id
        });
      });
  });
});


