import React from "react";
import HeroVideo from "./_components/hero-video";
import { getHeroVideo } from "./lib/sanity-queries";
import About from "./_components/about";
import Filmography from "./_components/filmography";
import Photography from "./_components/photography";
import Poetry from "./_components/poetry";
import Contact from "./_components/contact";
import MobileInfiniteScroll from "./_components/mobile-infinite-scroll";
import DesktopParallax from "./_components/desktop-parallax";

export default async function Home() {
  const videoData = await getHeroVideo();

  if (!videoData) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-fjalla-one text-4xl mb-4">Welcome</h1>
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <HeroVideo videoData={videoData} />
      <About />
      <div className="block lg:hidden">
        <MobileInfiniteScroll />
      </div>
      <div className="hidden lg:block">
        <DesktopParallax />
      </div>
      <Filmography />
      <Photography />
      <Poetry />
      <Contact />

    </div>
  );
}