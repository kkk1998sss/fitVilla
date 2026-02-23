# FitVilla assets – images and videos from Google Drive

The site uses images and videos from the **Fitvilla photos** Google Drive folder.  
I can’t download from Drive for you; follow these steps so the app can use them.

---

## Images not showing on Vercel?

Vercel only has what’s in your Git repo. The app can only serve images from **inside the project** (`public/images/`), not from a path on your PC (e.g. Downloads). So we copy once from your existing “Fitvilla photos” folder into `public/images/`, then commit that folder.

**Fix (you already have the asset folder):**

1. From the project root run once: **`npm run copy-assets`** — it uses your existing “Fitvilla photos” path (Downloads or `FITVILLA_DRIVE_PATH`).
2. Then commit and push the **copied** images:
   ```bash
   git add public/images
   git commit -m "Add images for deployment"
   git push
   ```
3. Vercel will redeploy automatically; images will then show on the live site.

---

## 1. Download the folder from Google Drive

1. Open: [Fitvilla photos – Google Drive](https://drive.google.com/drive/folders/158FPqmKZ89JRpr43mYrAOz-GxuHgK46m)
2. Select the **Fitvilla photos** folder (or the files you need).
3. Right‑click → **Download** (or use the toolbar download button).
4. Unzip if you get a `.zip` and put the folder in a known place, e.g.:
   - **Option A:** `C:\Users\<YourName>\Downloads\Fitvilla photos`
   - **Option B:** Inside the project: `fitvilla\Fitvilla photos`

You should see:
- A subfolder **Raw vids** (videos)
- Many JPGs: DSC05615.JPG, DSC05616.JPG, … DSC05645.JPG (and possibly more)

---

## 2. Copy files into the project (choose one)

### Option A – Run the script (recommended)

From the **fitvilla** folder (where `package.json` is):

```bash
# If the downloaded folder is in your Downloads folder (default):
npm run copy-assets

# Or set the path yourself (PowerShell):
$env:FITVILLA_DRIVE_PATH="C:\Users\kunda\Downloads\Fitvilla photos"; npm run copy-assets
```

This will copy all in-use assets into `public/`:
- **Logo:** `fitvilla-logo.png` → `public/images/logo/` (from root or a `logo` subfolder in Drive)
- **Hero:** `athlete-female.png`, `athlete-male.png` → `public/images/hero/` (from root or a `hero` subfolder)
- **Hero images:** first 9 JPGs → `public/images/hero/hero-1.jpg` … `hero-9.jpg`
- **Locations:** next 3 images → `public/images/locations/sector-76.jpg`, `sector-133.jpg`, `mayur-vihar.jpg`
- **Experience:** 1 image → `public/images/experience/experience.jpg`
- **Videos:** hero + 3 card videos → `public/videos/hero.mp4`, `card-1.mp4`, `card-2.mp4`, `card-3.mp4`

### Option B – Manual copy

| From (inside Fitvilla photos) | To (inside fitvilla/public/) |
|-------------------------------|-----------------------------|
| Logo PNG | `images/logo/fitvilla-logo.png` |
| Athlete cutouts (PNG) | `images/hero/athlete-female.png`, `images/hero/athlete-male.png` |
| **Raw vids** → first `.mp4` or `.mov` | `videos/hero.mp4` |
| First 9 JPGs | `images/hero/hero-1.jpg` … `hero-9.jpg` |
| Next 3 photos | `images/locations/sector-76.jpg`, `sector-133.jpg`, `mayur-vihar.jpg` |
| One more image | `images/experience/experience.jpg` |

---

## 3. What the site uses

- **Navbar & footer:** `public/images/logo/fitvilla-logo.png`
- **Landing hero:** `public/videos/hero.mp4`, `public/images/hero/hero-1.jpg` (poster), `athlete-female.png`, `athlete-male.png`
- **Features & video cards:** `public/images/hero/hero-1.jpg` … `hero-9.jpg`, `public/videos/card-1.mp4` … `card-3.mp4`
- **Locations:** `public/images/locations/sector-76.jpg`, `sector-133.jpg`, `mayur-vihar.jpg`
- **Experience:** `public/images/experience/experience.jpg`

---

## 4. Deployment (Vercel etc.)

**Images** are committed to the repo, so after you run `npm run copy-assets` you can commit and push `public/images/` and deployed builds will show logo, athletes, hero, locations, and experience images.

**Videos** are committed so they work on Vercel. After `npm run copy-assets`, run `git add public/videos` and commit. If the repo gets too large (e.g. push fails), host videos on Vercel Blob or Cloudinary and switch the code to those URLs.

After copying (script or manual), restart or refresh the app so the new assets show.
