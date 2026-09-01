/**
 * RORA API Server
 * Node.js / Express
 * Serves site configuration and handles contact form submissions.
 */

const express  = require('express');
const cors     = require('cors');
const helmet   = require('helmet');
const { body, validationResult } = require('express-validator');

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || '*' }));
app.use(express.json());

// ── Site configuration ──────────────────────────────────────────────────────
// In production, pull this from a database or CMS.
// For now, a single source-of-truth object the frontend fetches at load time.

const siteConfig = {
  company_name:    process.env.COMPANY_NAME    || 'RORA',
  tagline:         process.env.TAGLINE         || 'Innovation Meets Excellence',
  hero_description: process.env.HERO_DESC      || 'Your trusted partner in Agriculture, Construction, Tourism, Arts & Design, Real Estate, and Retail.',
  phone_number:    process.env.PHONE_NUMBER    || '+234806042370',
  email_address:   process.env.EMAIL_ADDRESS   || 'info@rora.com',
  whatsapp_number: process.env.WHATSAPP_NUMBER || '+234806042370',
  facebook_url:    process.env.FACEBOOK_URL    || 'https://www.facebook.com/royalrebirth.art',
  instagram_url:   process.env.INSTAGRAM_URL   || '',
  linkedin_url:    process.env.LINKEDIN_URL    || '',
  twitter_url:     process.env.TWITTER_URL     || '',
  logo_url:        process.env.LOGO_URL        || 'https://i.imgur.com/m6jvFUQ.png',
  gallery_image_1: process.env.GALLERY_IMG_1   || '',
  gallery_image_2: process.env.GALLERY_IMG_2   || '',
  gallery_image_3: process.env.GALLERY_IMG_3   || '',
  gallery_image_4: process.env.GALLERY_IMG_4   || '',
  gallery_image_5: process.env.GALLERY_IMG_5   || '',
  gallery_image_6: process.env.GALLERY_IMG_6   || '',
};

// ── Routes ──────────────────────────────────────────────────────────────────

// GET /api/config — returns public site config for the frontend
app.get('/api/config', (req, res) => {
  res.json(siteConfig);
});

// POST /api/contact — handles enquiry form submissions
app.post(
  '/api/contact',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, phone, message, service } = req.body;

    // TODO: pipe to email service (e.g. Nodemailer, SendGrid) or CRM
    console.log('New enquiry received:', { name, email, phone, service, message });

    res.status(200).json({ success: true, message: 'Enquiry received. We will respond within one business day.' });
  }
);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// 404 fallback
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// ── Start ────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`RORA API running on port ${PORT}`));
