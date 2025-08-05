"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

interface Photo {
  asset: {
    _id: string;
    url: string;
  };
  alt?: string;
}

interface ImageLightboxProps {
  photos: Photo[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  categoryTitle: string;
}

export default function ImageLightbox({
  photos,
  currentIndex,
  isOpen,
  onClose,
  categoryTitle,
}: ImageLightboxProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);

  useEffect(() => {
    setCurrentImageIndex(currentIndex);
  }, [currentIndex]);

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const goToPrevious = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, goToNext, goToPrevious, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentPhoto = photos[currentImageIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 text-white hover:text-gray-300 transition-colors duration-200"
        aria-label="Close lightbox"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Image Counter */}
      <div className="absolute top-6 left-6 z-10 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
        {currentImageIndex + 1} / {photos.length}
      </div>

      {/* Category Title */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10 text-white text-lg font-semibold">
        {categoryTitle}
      </div>

      {/* Previous Button */}
      {photos.length > 1 && (
        <button
          onClick={goToPrevious}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors duration-200 p-2"
          aria-label="Previous image"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Next Button */}
      {photos.length > 1 && (
        <button
          onClick={goToNext}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors duration-200 p-2"
          aria-label="Next image"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Main Image */}
      <div className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center">
        <div className="relative w-full h-full">
          <Image
            src={currentPhoto.asset.url}
            alt={currentPhoto.alt || `${categoryTitle} photo ${currentImageIndex + 1}`}
            fill
            className="object-contain"
            sizes="90vw"
            priority
          />
        </div>
      </div>

      {/* Background Click to Close */}
      <div
        className="absolute inset-0 -z-10"
        onClick={onClose}
        aria-label="Close lightbox"
      />

      {/* Thumbnail Strip (Optional - for better navigation) */}
      {photos.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-[90vw] overflow-x-auto pb-2">
          {photos.map((photo, index) => (
            <button
              key={photo.asset._id}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200 ${
                index === currentImageIndex
                  ? "ring-2 ring-white opacity-100"
                  : "opacity-60 hover:opacity-80"
              }`}
            >
              <Image
                src={photo.asset.url}
                alt={photo.alt || `Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}