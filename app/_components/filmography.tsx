"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { filmographyQuery } from "@/sanity/lib/queries";
import Image from "next/image";

interface Artist {
    department: string;
    name: string;
}

interface FilmData {
    _id: string;
    title: string;
    description: string;
    videoUrl: string;
    thumbnail: {
        asset: {
            _id: string;
            url: string;
        };
        alt?: string;
    };
    artists: Artist[];
    order: number;
}

function MediaPlayer({ 
    videoUrl, 
    thumbnail, 
    title, 
    isPlaying, 
    onPlay, 
    shouldAutoplay 
}: { 
    videoUrl: string;
    thumbnail: { asset: { url: string }; alt?: string };
    title: string;
    isPlaying: boolean;
    onPlay: () => void;
    shouldAutoplay: boolean;
}) {
    // Show thumbnail with play button if not playing
    if (!isPlaying) {
        return (
            <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden cursor-pointer group" onClick={onPlay}>
                <Image
                    src={thumbnail.asset.url}
                    alt={thumbnail.alt || title}
                    fill
                    className="object-cover transition-all duration-300 group-hover:brightness-75"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                />
                
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300" />
                
                {/* Large play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                        <svg
                            className="w-10 h-10 text-white ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>
                
                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-bold text-lg">{title}</h3>
                </div>
            </div>
        );
    }

    // Check if it's an iframe embed code
    if (videoUrl.includes('<iframe') || videoUrl.includes('iframe')) {
        return (
            <div
                className="w-full aspect-video bg-gray-900 rounded-lg overflow-hidden"
                dangerouslySetInnerHTML={{ __html: videoUrl }}
            />
        );
    }

    // Handle YouTube URLs
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
        let embedUrl = '';
        if (videoUrl.includes('youtu.be/')) {
            const videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
            embedUrl = `https://www.youtube.com/embed/${videoId}${shouldAutoplay ? '?autoplay=1&mute=1' : ''}`;
        } else if (videoUrl.includes('youtube.com/watch?v=')) {
            const videoId = videoUrl.split('v=')[1].split('&')[0];
            embedUrl = `https://www.youtube.com/embed/${videoId}${shouldAutoplay ? '?autoplay=1&mute=1' : ''}`;
        }

        return (
            <iframe
                src={embedUrl}
                className="w-full aspect-video rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        );
    }

    // Handle Vimeo URLs
    if (videoUrl.includes('vimeo.com')) {
        const videoId = videoUrl.split('vimeo.com/')[1].split('?')[0];
        const embedUrl = `https://player.vimeo.com/video/${videoId}${shouldAutoplay ? '?autoplay=1&muted=1' : ''}`;

        return (
            <iframe
                src={embedUrl}
                className="w-full aspect-video rounded-lg"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
            />
        );
    }

    // Fallback for other video URLs
    return (
        <video
            src={videoUrl}
            controls
            autoPlay={shouldAutoplay}
            muted={shouldAutoplay}
            className="w-full aspect-video bg-gray-900 rounded-lg"
        />
    );
}

export default function Filmography() {
    const [films, setFilms] = useState<FilmData[]>([]);
    const [selectedFilm, setSelectedFilm] = useState<FilmData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasUserInteracted, setHasUserInteracted] = useState(false);

    useEffect(() => {
        async function fetchFilms() {
            try {
                const data = await client.fetch(filmographyQuery);
                setFilms(data);
                if (data.length > 0) {
                    setSelectedFilm(data[0]); // Select first film by default
                }
            } catch (error) {
                console.error("Error fetching filmography:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchFilms();
    }, []);

    const handleThumbnailClick = (film: FilmData) => {
        setSelectedFilm(film);
        // Always show thumbnail first when clicking any thumbnail
        setIsPlaying(false);
    };

    const handlePlayClick = () => {
        setIsPlaying(true);
        setHasUserInteracted(true);
    };

    if (loading) {
        return (
            <section className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-5xl font-bold mb-4 tracking-wider">FILMOGRAPHY</h2>
                    <p className="text-gray-400">Loading...</p>
                </div>
            </section>
        );
    }

    if (films.length === 0) {
        return (
            <section className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-5xl font-bold mb-4 tracking-wider">FILMOGRAPHY</h2>
                    <p className="text-gray-400">No films available</p>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-black text-white py-12 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold mb-4 tracking-wider">FILMOGRAPHY</h2>
                </div>

                {/* Centered Media Player */}
                <div className="flex justify-center mb-8">
                    {selectedFilm && (
                        <div className="w-full max-w-4xl">
                            <MediaPlayer 
                                videoUrl={selectedFilm.videoUrl}
                                thumbnail={selectedFilm.thumbnail}
                                title={selectedFilm.title}
                                isPlaying={isPlaying}
                                onPlay={handlePlayClick}
                                shouldAutoplay={hasUserInteracted}
                            />
                        </div>
                    )}
                </div>

                {/* Film Details - Left Aligned */}
                <div className="flex justify-center mb-8">
                    {selectedFilm && (
                        <div className="max-w-4xl w-full space-y-4">
                            <h3 className="text-2xl font-bold text-center">{selectedFilm.title}</h3>
                            <p className="text-sm text-gray-300 leading-relaxed text-left">
                                {selectedFilm.description}
                            </p>

                            {/* Artists & Departments */}
                            <div className="space-y-1 text-left">
                                {selectedFilm.artists.map((artist, index) => (
                                    <div key={index} className="text-xs text-gray-300">
                                        <span className="font-semibold">{artist.department}</span> - {artist.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Thumbnails Grid - Centered */}
                <div className="flex justify-center mt-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl w-full">
                        {films.map((film) => (
                            <div
                                key={film._id}
                                className={`relative group cursor-pointer transition-all duration-300 ${selectedFilm?._id === film._id
                                    ? 'ring-2 ring-white'
                                    : 'hover:scale-105'
                                    }`}
                                onClick={() => handleThumbnailClick(film)}
                            >
                                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800">
                                    <Image
                                        src={film.thumbnail.asset.url}
                                        alt={film.thumbnail.alt || film.title}
                                        fill
                                        className="object-cover transition-all duration-300 group-hover:brightness-75"
                                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    />

                                    {/* Title Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-2">
                                        <h4 className="text-white font-bold text-sm leading-tight">
                                            {film.title}
                                        </h4>
                                    </div>

                                    {/* Play Icon Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                            <svg
                                                className="w-6 h-6 text-white ml-1"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}