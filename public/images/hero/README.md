# Hero images – required filenames

The app looks for these **exact** paths (do not use raw Drive names like `DSC05615.JPG` here):

| File | Used for |
|------|----------|
| `hero-1.jpg` … `hero-9.jpg` | Hero poster, features section, video cards |
| `athlete-female.png` | Left athlete on hero |
| `athlete-male.png` | Right athlete on hero |

If you have `DSC05615.JPG` (or similar) in `public/images/` instead of here, move and rename it to **`hero-1.jpg`** in this folder. Add `hero-2.jpg` … `hero-9.jpg` for the full features section, or run `npm run copy-assets` to fill this folder from your Fitvilla photos.
