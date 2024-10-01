const request = require('supertest');
const app = require('../index'); // Adjust the path to your server file
const { sequelize } = require('../config/db'); // Import sequelize to sync database
const User = require('../models/User');

beforeAll(async () => {
    await sequelize.sync({ force: true }); // Sync database before tests
});

afterAll(async () => {
    await sequelize.close(); // Close database connection after tests
});

describe('User API', () => {
    it('should create a new user', async () => {
        const res = await request(app)
            .post('/api')
            .send({
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'password123',
                firstName: 'Test',
                lastName: 'User'
            });
        
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('username', 'testuser');
    });

    it('should not allow SQL injection', async () => {
        const res = await request(app)
            .post('/api')
            .send({
                username: 'testuser; DROP TABLE Users;',
                email: 'testuser@example.com',
                password: 'password123',
                firstName: 'Test',
                lastName: 'User'
            });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error', 'Invalid input data');
    });
});
