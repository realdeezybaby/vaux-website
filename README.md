# Vaux Website

A responsive static website recreated from the supplied Vaux concept image.

## Test locally

Open `index.html` in a browser, or run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish with Netlify

1. Create a GitHub repository.
2. Upload every file and the `assets` folder.
3. In Netlify, choose **Add new site → Import an existing project**.
4. Connect GitHub and select the repository.
5. Leave the build command blank.
6. Set the publish directory to `/` and deploy.

## Before going live

In `index.html`, replace:

- `https://calendly.com/` with your actual Calendly booking URL.
- `hello@yourdomain.com` with your business email.
- Placeholder testimonials and results with verified client information.
- Founder name or copy as needed.

## Custom domain

Netlify supports a custom domain directly, so Wix or Squarespace is not required unless you specifically want their editor.
