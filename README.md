# Kibreab Kebede — Personal Portfolio

A responsive, multi-page static portfolio built for GitHub Pages.

## Pages

- `index.html` — Home and email-draft contact form
- `books.html` — Current and finished books
- `portfolio.html` — Projects, GitHub, and CV preview
- `about.html` — Music, walking, food, cinema, football, NBA, New York, and the wedding plan
- `social.html` — Animated social-profile pendulums
- `404.html` — Custom not-found page

## Preview locally

Run a local web server from the project folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

VS Code users can also use the Live Server extension.

## Deploy to GitHub Pages

1. Create a GitHub repository. The metadata currently assumes the repository name `kibreab-kebede`.
2. Upload the contents of this folder to the root of the repository.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` folder.
6. Save and wait for the deployment URL.

If the repository name or domain is different, update the canonical and Open Graph URLs in all HTML files, plus `robots.txt` and `sitemap.xml`.

## Update the main information

Editable links and contact values live in:

```text
assets/js/site-data.js
```

The visible HTML also contains the same URLs so that navigation and profile links still work without JavaScript. Update both when changing a public link.

## Replace the CV

Replace:

```text
assets/documents/kibreab-kebede-cv.pdf
```

Keep the same filename, or update the links in `portfolio.html` and `assets/js/site-data.js`.

## Add a project repository

Open `portfolio.html`, find the relevant project card, and add a secure external link using:

```html
<a href="https://github.com/..." target="_blank" rel="noopener noreferrer">
  View Repository
</a>
```

Do not add repository or live-demo buttons unless a real URL exists.

## Contact form behavior

The Home-page form uses a `mailto:` link. It opens the visitor’s configured email application with the message pre-filled. GitHub Pages does not process or send form submissions on its own. Automatic submission would require a form provider or a backend endpoint.

## Images

Images are stored by subject:

```text
assets/images/personal/
assets/images/books/
assets/images/about/
assets/images/cinema/
assets/images/football/
```

WebP files are already optimized. When replacing an image, preserve the filename or update the corresponding HTML path. Keep useful alt text and explicit dimensions.

## Accessibility and motion

The site includes:

- Semantic landmarks and heading hierarchy
- Skip-to-content link
- Keyboard-accessible mobile navigation
- Focus-visible states
- Accessible CV dialog with focus trapping and restoration
- Reduced-motion support
- Pendulums that pause on hover or keyboard focus and become static on touch devices

## Third-party assets

See `THIRD-PARTY-NOTICES.md` for icon attribution and publishing notes for supplied media.
