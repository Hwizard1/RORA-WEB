# RORA — Refactored Project

## Structure

```
rora-frontend/
  index.html          ← Standalone HTML/CSS/JS frontend
rora-backend/
  server.js           ← Express REST API
  package.json
  .env.example        ← Copy to .env and configure
```

## Running Locally

### Backend
```bash
cd rora-backend
npm install
cp .env.example .env   # fill in your values
npm run dev            # starts on port 3001
```

### Frontend
Open `rora-frontend/index.html` in a browser, or serve with any static server:
```bash
npx serve rora-frontend
```

## API Endpoints

| Method | Path          | Description                        |
|--------|---------------|------------------------------------|
| GET    | /api/config   | Returns public site configuration  |
| POST   | /api/contact  | Accepts enquiry form submissions   |
| GET    | /health       | Health check                       |

## Deployment Notes
- Set `FRONTEND_ORIGIN` in `.env` to your production domain to lock CORS.
- The frontend `initFromAPI()` function fetches `/api/config` at load — 
  if the API is unreachable, all static content still displays correctly.
- To add gallery images, set `GALLERY_IMG_1` through `GALLERY_IMG_6` 
  in `.env` with direct image URLs.
