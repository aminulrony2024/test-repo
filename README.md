# Portfolio — Md. Aminul Islam Rony

Pure HTML / CSS / JavaScript, multi-page. No build step needed — open `index.html` in a browser, or deploy as static files.

## Setup before going live

1. **Photo** — drop your photo into the `assets/` folder and name it exactly `aminul.jpg`. Used on the home page hero.
2. **Contact form** — go to https://web3forms.com, get a free Access Key (just needs your email, no signup), then open `contact.html` and replace:
   ```html
   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
   ```
   with your real key. Until then the form will show an error and fall back to suggesting your email directly.
3. **Custom domain** — point your domain's DNS to wherever you host these static files (GitHub Pages, Netlify, Vercel, etc.), all work with plain HTML sites.

## Structure

```
index.html        Home
about.html         Education, research interests, tech stack
experience.html    Research Assistant role + HighRadius internship
projects.html      FinPredict, KIIT Portal, AMT extension
contact.html       Contact form + social links
css/style.css      All styling (single stylesheet)
js/main.js         Nav toggle, active link highlight, contact form submit
assets/            Put aminul.jpg here
```

## Notes

- Resume button in the nav and Contact page link directly to your Google Drive resume link.
- If `assets/aminul.jpg` is missing, the hero shows a placeholder box instead of a broken image, so the site never looks broken.
