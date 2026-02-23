"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { getVideoCards } from "@/content/videoCards";
import type { VideoCardItem } from "@/content/videoCards";
import { Card } from "@/components/ui/Card";

function VideoCard({ card, onPlay }: { card: VideoCardItem; onPlay: () => void }) {
  const [videoError, setVideoError] = useState(false);

  return (
    <button
      type="button"
      onClick={onPlay}
      className="experience-fitvilla-rectangle relative block w-full overflow-hidden bg-black text-left focus:outline-none focus:ring-2 focus:ring-fitvilla-cyan focus:ring-inset"
    >
      {videoError ? (
        <Image src={card.imageSrc} alt="" fill className="object-cover" sizes="33vw" unoptimized />
      ) : (
        <video
          src={card.videoSrc}
          className="h-full w-full object-cover"
          muted
          loop
          playsInline
          autoPlay
          poster={card.imageSrc}
          onError={() => setVideoError(true)}
        />
      )}
    </button>
  );
}

function PopupVideo({
  card,
  popupVideoRef,
}: {
  card: VideoCardItem;
  popupVideoRef: React.RefObject<HTMLVideoElement | null>;
}) {
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (!videoError && popupVideoRef.current) popupVideoRef.current.play().catch(() => {});
  }, [card, videoError, popupVideoRef]);

  if (videoError) {
    return <Image src={card.imageSrc} alt="" fill className="object-contain" sizes="80vw" unoptimized />;
  }
  return (
    <video
      ref={popupVideoRef}
      src={card.videoSrc}
      className="h-full w-full object-contain"
      controls
      autoPlay
      loop
      playsInline
      poster={card.imageSrc}
      onError={() => setVideoError(true)}
    />
  );
}

export function VideoCardsSection() {
  const cards = getVideoCards();
  const [popupCard, setPopupCard] = useState<VideoCardItem | null>(null);
  const popupVideoRef = useRef<HTMLVideoElement>(null);

  return (
    <section
      aria-labelledby="video-cards-heading"
      className="scroll-mt-20 border-t border-white/10 bg-black px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="video-cards-heading"
          className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Experience FitVilla
        </h2>

        {/* Experience FitVilla: rectangle cards, increased height, video only (no blur) */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {cards.map((card) => (
            <Card
              key={card.id}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all hover:border-fitvilla-cyan/30 hover:bg-white/[0.08]"
            >
              <VideoCard card={card} onPlay={() => setPopupCard(card)} />
              <div className="p-4 text-center text-sm text-fitvilla-light/80">
                <h3 className="font-bold text-white">{card.title}</h3>
                <p className="mt-1">{card.description}</p>
                <span className="mt-2 inline-block text-fitvilla-cyan/90">Click to play</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Popup modal: play video again when card is clicked */}
      {popupCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-title"
          onClick={() => setPopupCard(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPopupCard(null)}
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black"
              aria-label="Close"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="experience-fitvilla-rectangle relative w-full">
              <PopupVideo card={popupCard} popupVideoRef={popupVideoRef} />
            </div>

            <div className="p-5 text-white">
              <h3 id="popup-title" className="text-xl font-bold">{popupCard.title}</h3>
              <p className="mt-2 text-fitvilla-light/90">{popupCard.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
