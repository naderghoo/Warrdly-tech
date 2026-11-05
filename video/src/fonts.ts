import { continueRender, delayRender, staticFile } from "remotion";

const faces: { file: string; weight: string; range: string }[] = [
  { file: "arabic-400", weight: "400", range: "U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF, U+200C-200F" },
  { file: "arabic-600", weight: "600", range: "U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF, U+200C-200F" },
  { file: "arabic-700", weight: "700", range: "U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF, U+200C-200F" },
  { file: "latin-400", weight: "400", range: "U+0000-00FF, U+0131, U+0152-0153, U+2000-206F, U+2190-21FF, U+2212, U+2713" },
  { file: "latin-600", weight: "600", range: "U+0000-00FF, U+0131, U+0152-0153, U+2000-206F, U+2190-21FF, U+2212, U+2713" },
  { file: "latin-700", weight: "700", range: "U+0000-00FF, U+0131, U+0152-0153, U+2000-206F, U+2190-21FF, U+2212, U+2713" },
];

export const FONT = "Plex";

let started = false;
export function loadFonts() {
  if (started || typeof document === "undefined") return;
  started = true;
  const handle = delayRender("fonts");
  Promise.all(
    faces.map((f) => {
      const face = new FontFace(FONT, `url(${staticFile(`fonts/ibm-plex-sans-arabic-${f.file}-normal.woff2`)}) format("woff2")`, {
        weight: f.weight,
        unicodeRange: f.range,
      });
      return face.load().then((loaded) => document.fonts.add(loaded));
    }),
  )
    .then(() => continueRender(handle))
    .catch((e) => {
      console.error(e);
      continueRender(handle);
    });
}
