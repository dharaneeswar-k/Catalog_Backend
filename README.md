Backend README

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. Install dependencies: `npm install`
3. Seed DB: `node seed/seed.js`
4. Start server: `npm run dev` (needs nodemon) or `npm start`

API endpoints:
- GET /api/projects
- GET /api/projects/:prid
- GET /api/projects/search?query=...
- POST /api/admin/login  (body: { email, password }) -> { token }
- Protected admin: POST/PUT/DELETE /api/projects (requires Authorization: Bearer <token>)
