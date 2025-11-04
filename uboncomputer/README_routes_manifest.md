# Fix for routes-manifest.json missing on Vercel
This usually means the build didn't run or ran in the wrong directory.
- Root Directory must be the folder that contains `package.json`.
- `vercel.json` now sets `"buildCommand": "next build"` explicitly.
- Do **not** set `outputDirectory` for Next.js. Leave it empty.
- Ensure there is no `output: 'export'` or custom `distDir` in `next.config.js`.
- Local test:
    npm install
    npm run build
    npm start
