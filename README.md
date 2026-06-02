# NestJS Supabase Prisma R2 API

Backend setup for:

- Supabase Postgres + Prisma
- User profile module
- Department module
- Explicit user/department relationship table
- CRUD endpoints
- Image upload to Cloudflare R2
- No authentication yet

## Setup

```bash
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate
npm run start:dev
```

Fill `.env` with your Supabase database URL and Cloudflare R2 credentials before running migrations or starting the API.

## Environment

```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@[PROJECT_REF].supabase.co:5432/postgres?schema=public"

R2_ACCOUNT_ID=""
R2_ACCESS_KEY_ID=""
R2_SECRET_ACCESS_KEY=""
R2_BUCKET=""
R2_PUBLIC_URL=""
```

`R2_PUBLIC_URL` should be the public bucket/custom domain base URL. If it is omitted, uploaded image fields store the R2 object key.

## Endpoints

Users:

- `POST /users`
- `GET /users`
- `GET /users/:id`
- `PATCH /users/:id`
- `DELETE /users/:id`
- `POST /users/:id/departments/:departmentId`
- `DELETE /users/:id/departments/:departmentId`

Departments:

- `POST /departments`
- `GET /departments`
- `GET /departments/:id`
- `PATCH /departments/:id`
- `DELETE /departments/:id`

## Upload Fields

Use `multipart/form-data` when uploading images.

User image field:

- `profileImage`

Department image field:

- `image`

For multipart requests, send `departmentIds` as a JSON array string or comma-separated list, and send department `rules` as a JSON object string.

Example department `rules`:

```json
{"canInvite": true, "maxMembers": 25}
```
