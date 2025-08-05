"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Photo {
  asset: {
    _id: string;
    url: string;
  };
  alt?: string;
}

const InfiniteMovingImages = ({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}: {
  items: Photo[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "220s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((photo, idx) => (
          <li
            className="relative w-[200px] h-[150px] shrink-0 rounded-2xl overflow-hidden border border-slate-700"
            key={`${photo.asset._id}-${idx}`}
          >
            <Image
              src={photo.asset.url}
              alt={photo.alt || "Photography"}
              fill
              className="object-cover"
              sizes="200px"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export function MobileInfiniteScrollClient({ photos }: { photos: Photo[] }) {
  // Split photos into two arrays for the two rows
  const midpoint = Math.ceil(photos.length / 2);
  const firstRowPhotos = photos.slice(0, midpoint);
  const secondRowPhotos = photos.slice(midpoint);

  return (
    <div className="hidden w-full bg-black py-8">
      {/* First row - Left to Right */}
      <InfiniteMovingImages
        items={firstRowPhotos}
        direction="right"
        speed="slow"
        className="mb-4"
      />

      {/* Second row - Right to Left */}
      <InfiniteMovingImages
        items={secondRowPhotos}
        direction="left"
        speed="slow"
      />
    </div>
  );
}