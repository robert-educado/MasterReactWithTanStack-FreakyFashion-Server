// import { describe, it, expect } from 'vitest'; // or from 'jest'
// import request from 'supertest';
// import { app } from './app'; // your Hono app

// describe('API Endpoints', () => {
//   it('should return hello world on GET /', async () => {
//     const res = await request(app.fetch).get('/');
//     expect(res.status).toBe(200);
//     expect(res.text).toBe('Hello World');
//   });

//   it('should handle POST /data', async () => {
//     const res = await request(app.fetch)
//       .post('/data')
//       .send({ name: 'Alice' })
//       .set('Content-Type', 'application/json');

//     expect(res.status).toBe(201);
//     expect(res.body).toEqual({ message: 'Data received', name: 'Alice' });
//   });
// });
