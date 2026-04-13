# All Solutions Electric LLC — Website

Production-ready static website for All Solutions Electric LLC.

## Quick Start

```bash
# 1. Clone or download this folder
# 2. Open index.html in browser — done

# Or serve locally with any static server:
npx serve website/
# or
python3 -m http.server 8080 --directory website/
```

## Deployment Options

### Option 1: GitHub Pages (Free, Recommended)

1. Create a GitHub repository (e.g., `allsolutionselectric-website`)
2. Push the contents of the `website/` folder to the repo root
3. Go to **Settings → Pages → Source: Deploy from a branch → main / root**
4. Site will be live at `https://yourusername.github.io/allsolutionselectric-website`

For a custom domain:
- Add a `CNAME` file to the repo root containing your domain (e.g., `allsolutionselectric.com`)
- Configure DNS: add a CNAME record pointing to `yourusername.github.io`

### Option 2: Netlify Drop (Fastest)

1. Go to [netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop the entire `website/` folder
3. Site is live in 30 seconds
4. Connect custom domain in Netlify dashboard

### Option 3: Netlify CLI

```bash
npm install -g netlify-cli
netlify deploy --dir=website --prod
```

### Option 4: Traditional Web Hosting (cPanel/FTP)

1. Zip the contents of `website/` (not the folder itself, but its contents)
2. Upload via FTP or cPanel File Manager to `public_html/`
3. Ensure `index.html` is at the root of `public_html/`

### Option 5: Vercel

```bash
npm install -g vercel
cd website
vercel --prod
```

---

## Before Launch Checklist

### Required Updates (ask the client)

- [ ] **Phone number** — Replace `(000) 000-0000` with real number in:
  - `index.html` → Hero trust items section
  - `index.html` → Contact section (tel: link)
  - `index.html` → Footer

- [ ] **Email address** — Replace `info@allsolutionselectric.com` if different in:
  - `index.html` → Contact section
  - `index.html` → Footer

- [ ] **Business address** — Add to footer if desired

- [ ] **Service area** — Add city/state/region to hero eyebrow text and footer

- [ ] **License number** — Add state contractor license number to footer

- [ ] **Years in business** — Verify "15+ Years Experience" stat

- [ ] **Projects completed** — Verify "500+ Projects Completed" stat

### Form Backend Setup

The contact form currently simulates submission. To make it functional:

**Option A: Formspree (No code, free tier)**
```html
<!-- Replace the form tag in index.html -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```
Sign up at [formspree.io](https://formspree.io) to get your form ID.

**Option B: Netlify Forms (if deployed on Netlify)**
```html
<!-- Add netlify attribute to form tag -->
<form name="contact" netlify netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="contact">
```

**Option C: Custom Backend**
In `assets/js/main.js`, replace the `setTimeout` block with:
```javascript
const response = await fetch('/api/contact', {
  method: 'POST',
  body: new FormData(form),
  headers: { 'Accept': 'application/json' }
});
```

### Image Replacement

Add real photos for maximum impact:

1. **Hero image** — Replace the placeholder in `.hero__image-frame` with:
```html
<img
  src="assets/images/team-hero.jpg"
  alt="All Solutions Electric LLC team working on commercial project"
  width="600"
  height="750"
  loading="eager"
>
```

2. **Project photos** — Replace `.project-placeholder` divs with real `<img>` elements

Recommended image sources if client has no photos:
- Ask client to photograph 3-5 completed projects
- Use licensed stock photos from Unsplash (search: "electrician", "electrical panel", "commercial wiring")

### Optional Enhancements

- [ ] Add Google Analytics: place GA4 snippet before `</head>`
- [ ] Add Google My Business badge/link
- [ ] Add SSL certificate (automatic on Netlify/Vercel/GitHub Pages)
- [ ] Submit sitemap to Google Search Console
- [ ] Add Facebook Pixel if running ads

---

## File Structure

```
website/
├── index.html              ← Main (and only) page
├── assets/
│   ├── css/
│   │   └── main.css        ← All styles
│   └── js/
│       └── main.js         ← All interactions
├── design_decisions.md     ← Design rationale document
└── README.md               ← This file
```

## Browser Support

Tested and supported:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari iOS 14+
- Chrome for Android 90+

CSS features used: `clamp()`, CSS Grid, `backdrop-filter`, CSS Custom Properties, `IntersectionObserver` — all supported in modern browsers.

## Performance

- Zero external JavaScript dependencies
- Fonts loaded from Google Fonts CDN with `display=swap`
- All animations GPU-accelerated (transform/opacity only)
- Images should be served as WebP with JPEG fallback
- Lighthouse target: 95+ Performance, 100 Accessibility, 100 Best Practices

## Contact / Support

For modifications or questions about this codebase, refer to `design_decisions.md` for full documentation of design choices and architecture.