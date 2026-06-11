Place the favicon image here:

- Filename: `favicon.png`
- Path: the project `public` folder (so the file is served at `/favicon.png`).

How to add the image:

1. Save the attached peacock feather image as `favicon.png`.
2. Move or copy it into the `public/` directory.

Notes:

- `index.html` already references `/favicon.png`.
- You can also provide an SVG as `public/favicon.svg` if you prefer.

To test locally:

```bash
# if using Vite dev server
npm run dev
# then open http://localhost:5173 and check the tab icon
```

If you still see the Vite icon after adding `favicon.png`, do a hard refresh or clear the browser cache (Chrome: `Ctrl+Shift+R`, or open DevTools -> Network -> "Disable cache" then refresh).

Alternatively, after placing `public/favicon.png` you can restart the dev server to ensure the file is served correctly.
