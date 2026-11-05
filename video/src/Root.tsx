import React from "react";
import { Composition } from "remotion";
import { H, Hero, LOOP, W } from "./Hero";

export const Root: React.FC = () => (
  <>
    <Composition id="HeroAr" component={Hero} durationInFrames={LOOP} fps={30} width={W} height={H} defaultProps={{ locale: "ar" as const }} />
    <Composition id="HeroEn" component={Hero} durationInFrames={LOOP} fps={30} width={W} height={H} defaultProps={{ locale: "en" as const }} />
  </>
);
