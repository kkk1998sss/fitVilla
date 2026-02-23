# FitVilla assets – images and videos from Google Drive

The site uses images and videos from the **Fitvilla photos** Google Drive folder.  
I can’t download from Drive for you; follow these steps so the app can use them.

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

This will:
- Copy the first video from **Raw vids** → `public/videos/hero.mp4`
- Copy the first 9 images (DSC05615–23) → `public/images/hero/hero-1.jpg` … `hero-9.jpg`
- Copy 3 images for locations → `public/images/locations/sector-76.jpg`, `sector-133.jpg`, `mayur-vihar.jpg`
- Copy 1 image for Experience section → `public/images/experience/experience.jpg`

### Option B – Manual copy

| From (inside Fitvilla photos) | To (inside fitvilla/public/) |
|-------------------------------|-----------------------------|
| **Raw vids** → first `.mp4` or `.mov` | `videos/hero.mp4` |
| **DSC05615.JPG** (or any gym image) | `images/hero/hero-1.jpg` (for poster/fallback) |
| **DSC05616.JPG**, **DSC05617.JPG**, … | `images/hero/hero-2.jpg`, `hero-3.jpg`, … (optional) |
| Any 3 location photos | `images/locations/sector-76.jpg`, `sector-133.jpg`, `mayur-vihar.jpg` |
| Any 1 gym/interior photo | `images/experience/experience.jpg` |

---

## 3. What the site uses

- **Landing hero:** `public/videos/hero.mp4` (background video) and, if present, `public/images/hero/hero-1.jpg` as poster/fallback.
- **Locations section:** `public/images/locations/sector-76.jpg`, `sector-133.jpg`, `mayur-vihar.jpg`.
- **Experience section:** `public/images/experience/experience.jpg`.

After copying (script or manual), restart or refresh the app so the new assets show.
