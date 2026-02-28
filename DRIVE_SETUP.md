# Load photos and videos from Google Drive

Local image and video files under `public/images` and `public/videos` have been removed. The app is set to use **Google Drive** when you add file IDs.

## How to get Drive working

1. **Open your folder**  
   [Fitvilla photos on Google Drive](https://drive.google.com/drive/folders/158FPqmKZ89JRpr43mYrAOz-GxuHgK46m)

2. **Get a file ID** (do this for each file you want on the site)  
   - Right‑click the file (e.g. `DSC05615.JPG`) → **Share**  
   - Set to **“Anyone with the link”** → **Copy link**  
   - The link looks like: `https://drive.google.com/file/d/XXXXXXXXXX/view`  
   - The **file ID** is the part `XXXXXXXXXX` (between `/d/` and `/view`)

3. **Paste IDs in the app**  
   Open **`src/lib/asset-urls.ts`** and fill **`driveFileIds`** with the IDs you copied:

   | Asset key       | Use for              | Example file in Drive   |
   |-----------------|----------------------|-------------------------|
   | `hero-1` … `hero-9` | Hero + features images | DSC05615.JPG → hero-1, etc. |
   | `logo`          | Navbar & footer logo | (your logo file)        |
   | `athlete-female`, `athlete-male` | Hero cutouts   | (your PNGs)             |
   | `sector-76`, `sector-133`, `mayur-vihar` | Location images | (your location photos) |
   | `experience`    | Experience section   | (one gym/interior image)|
   | `hero-video`, `card-1-video`, … | Videos        | From **Raw vids** subfolder |

   Example: if the link for DSC05615.JPG is  
   `https://drive.google.com/file/d/1ABC123xyz/view`  
   then in `asset-urls.ts` set  
   `"hero-1": "1ABC123xyz"`.

4. **Env is already set**  
   `.env.local` has `NEXT_PUBLIC_USE_DRIVE_IMAGES=true`. Restart the dev server after editing `asset-urls.ts`:
   ```bash
   npm run dev
   ```

5. **Check**  
   - In the browser, bottom‑left label should say **“Assets: Google Drive”** when at least one ID is set.  
   - Images/videos you added IDs for will load from Drive; the rest will still 404 until you add their IDs.

## Restore local files instead

If you prefer to use local files again:

1. Set in `.env.local`: `NEXT_PUBLIC_USE_DRIVE_IMAGES=false` (or remove the line).
2. Run `npm run copy-assets` (with your “Fitvilla photos” folder in Downloads or `FITVILLA_DRIVE_PATH`).
3. Restart the dev server.
