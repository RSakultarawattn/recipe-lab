
const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Recipe = require('../lib/models/recipe');

describe('recipe-lab routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('creates a recipe', () => {
    return request(app)
      .post('/api/v1/recipes')
      .send({
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
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
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
      });
  });
  it('finds a recipe by id via GET', async() => {
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
      .get(`/api/v1/recipes/${recipe.id}`)
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
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
      });
  });
    
  it.only('gets all recipes', async() => {
    const recipes = await Promise.all([
      { name: 'moonshine', directions: [], ingredients: [] },
      { name: 'pizza', directions: [], ingredients: [] },
      { name: 'beer', directions: [], ingredients: [] }
    ].map(recipe => Recipe.insert(recipe)));

    return request(app)
      .get('/api/v1/recipes/')
      .then(res => {
        recipes.forEach(recipe => {
          expect(res.body).toContainEqual(recipe);
        });
      });
  });

  it('updates a recipe by id', async() => {
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
      .put(`/api/v1/recipes/${recipe.id}`)
      .send({
        name: 'great moonshine',
        directions: [
          'make',
          'some',
          'freaking',
          'shine',
          'yo yo'
        ],
        ingredients: [
          {
            name: 'corn',
            measurement: 'ears',
            amount: 15
          }
        ]
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          name: 'great moonshine',
          directions: [
            'make',
            'some',
            'freaking',
            'shine',
            'yo yo'
          ],
          ingredients: [
            {
              name: 'corn',
              measurement: 'ears',
              amount: 15
            }
          ]
        });
      });
  });
  it('removes a recipe using DELETE', async() => {
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
    return request(app)
      .delete(`/api/v1/recipes/${recipe.id}`)
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
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
      });
  });

});
