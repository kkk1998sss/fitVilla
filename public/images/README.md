# Site images (required for deployment)

Images in this folder are used by the landing page (logo, hero, features, locations, experience).

**Why copy?** The app (and Vercel) can only serve files that live **inside this project** under `public/`. It cannot use a path on your PC (e.g. Downloads). So we copy once from your "Fitvilla photos" folder into `public/images/`; then you commit this folder so the deployed site has the same files.

**If images are missing on Vercel:**

1. You already have **Fitvilla photos** (e.g. in Downloads). From the project root run once: **`npm run copy-assets`** — this copies from that folder into `public/images/`.
2. Commit and push so Vercel gets the files:

   ```bash
   git add public/images
   git commit -m "Add images for deployment"
   git push
   ```

4. Redeploy on Vercel (or wait for the automatic deploy from the push).

Expected structure after running the script:
- `logo/fitvilla-logo.png`
- `hero/hero-1.jpg` … `hero-9.jpg`, `athlete-female.png`, `athlete-male.png`
- `locations/sector-76.jpg`, `sector-133.jpg`, `mayur-vihar.jpg`
- `experience/experience.jpg`
