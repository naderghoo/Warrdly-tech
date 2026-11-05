# Site banners (Remotion)

Animated banners for tech.warrdly.com, rendered from React code with the site's colours and Arabic font.
This folder has its own dependencies and is not part of the Next.js build.

```bash
cd video
npm install
npx remotion studio src/index.ts        # preview and tweak
npx remotion render src/index.ts HeroAr out/hero-ar.mp4 --scale=0.75
npx remotion render src/index.ts HeroEn out/hero-en.mp4 --scale=0.75
npx remotion still  src/index.ts HeroAr out/hero-ar.png --frame=0 --scale=0.75
```

Copy the results to `public/hero/` (poster as `.webp`). Every animation repeats within 300 frames, so the 10-second video loops seamlessly.

Licence: Remotion is free for individuals and companies with up to 3 employees; larger companies need a Remotion company licence (remotion.pro).
