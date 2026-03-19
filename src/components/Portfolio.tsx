"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

type Props = {
  videoUrl: string;
};

type YouTubeTarget =
  | { kind: "video"; id: string }
  | { kind: "playlist"; id: string };

type YTPlayer = {
  nextVideo: () => void;
  previousVideo: () => void;
  playVideo: () => void;
  destroy: () => void;
};

type YouTubePlayerVars = {
  autoplay: number;
  playsinline: number;
  rel: number;
  modestbranding: number;
  vq: string;
  listType?: "playlist";
  list?: string;
};

type YTPlayerOptions = {
  height: string;
  width: string;
  host: string;
  videoId?: string;
  playerVars: YouTubePlayerVars;
  events: {
    onReady: () => void;
  };
};

type YouTubeWindow = Window &
  typeof globalThis & {
    YT?: {
      Player: new (containerId: string, options: YTPlayerOptions) => YTPlayer;
    };
    __ytApiLoading?: Promise<void>;
    onYouTubeIframeAPIReady?: () => void;
  };

function extractYouTubeTarget(input: string): YouTubeTarget | null {
  try {
    const url = new URL(input);

    if (url.hostname === "youtu.be") {
      const id = url.pathname.replace("/", "").trim();
      return id ? { kind: "video", id } : null;
    }

    const host = url.hostname.replace(/^www\./, "");
    if (host === "youtube.com" || host === "m.youtube.com" || host === "music.youtube.com") {
      const list = url.searchParams.get("list");
      if (list) return { kind: "playlist", id: list };

      const v = url.searchParams.get("v");
      if (v) return { kind: "video", id: v };

      const parts = url.pathname.split("/").filter(Boolean);
      const idx = parts.findIndex((part) => part === "shorts" || part === "embed");
      if (idx >= 0 && parts[idx + 1]) return { kind: "video", id: parts[idx + 1] };
    }
  } catch {
    // Not a valid URL.
  }

  return null;
}

function ensureYouTubeIframeApiLoaded(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  const win = window as YouTubeWindow;
  if (win.YT?.Player) return Promise.resolve();

  if (win.__ytApiLoading) return win.__ytApiLoading;

  win.__ytApiLoading = new Promise<void>((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-yt-iframe-api="true"]');
    if (existing) {
      const check = () => {
        if (win.YT?.Player) resolve();
        else setTimeout(check, 50);
      };
      check();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.dataset.ytIframeApi = "true";

    const prior = win.onYouTubeIframeAPIReady;
    win.onYouTubeIframeAPIReady = () => {
      try {
        prior?.();
      } finally {
        resolve();
      }
    };

    document.head.appendChild(script);
  });

  return win.__ytApiLoading;
}

export default function Portfolio({ videoUrl }: Props) {
  const target = useMemo(() => extractYouTubeTarget(videoUrl), [videoUrl]);
  const playerRef = useRef<YTPlayer | null>(null);
  const [playerReady, setPlayerReady] = useState(false);
  const playerContainerId = useId().replace(/:/g, "_");

  useEffect(() => {
    let cancelled = false;

    const mount = async () => {
      if (!target) return;

      await ensureYouTubeIframeApiLoaded();
      if (cancelled) return;

      const win = window as YouTubeWindow;
      if (!win.YT?.Player) return;

      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          // ignore
        }
        playerRef.current = null;
      }

      setPlayerReady(false);

      const playerVars: YouTubePlayerVars = {
        autoplay: 0,
        playsinline: 1,
        rel: 0,
        modestbranding: 1,
        vq: "hd2160",
      };

      const options: YTPlayerOptions =
        target.kind === "playlist"
          ? {
              height: "100%",
              width: "100%",
              host: "https://www.youtube-nocookie.com",
              playerVars: { ...playerVars, listType: "playlist", list: target.id },
              events: {
                onReady: () => {
                  if (cancelled) return;
                  setPlayerReady(true);
                },
              },
            }
          : {
              height: "100%",
              width: "100%",
              host: "https://www.youtube-nocookie.com",
              videoId: target.id,
              playerVars,
              events: {
                onReady: () => {
                  if (cancelled) return;
                  setPlayerReady(true);
                },
              },
            };

      playerRef.current = new win.YT.Player(playerContainerId, options);
    };

    mount();

    return () => {
      cancelled = true;
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          // ignore
        }
        playerRef.current = null;
      }
    };
  }, [playerContainerId, target]);

  return (
    <section className="w-full py-24 bg-white border-t border-neutral-100 flex justify-center overflow-hidden">
      <div className="max-w-6xl w-full px-6 flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        <div className="flex flex-col w-full lg:w-1/2">
          <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-neutral-400 font-semibold mb-4 ml-[0.3em]">
            Portfolio
          </span>
          <h2 className="text-[clamp(2.2rem,9vw,4.5rem)] font-sans font-thin text-black leading-[1.06] uppercase tracking-[0.16em] sm:tracking-[0.24em] md:tracking-[0.34em] ml-[0.16em] sm:ml-[0.24em] md:ml-[0.34em]">
            <span className="block">Video Tours</span>
            <span className="block text-neutral-500">And Visual</span>
            <span className="block text-neutral-500">Storytelling</span>
          </h2>
          <div className="w-12 h-px bg-black/80 my-10"></div>
          <p className="text-neutral-600 font-light text-lg leading-relaxed max-w-xl">
            A modern listing deserves modern presentation. I create clean, cinematic tours that help buyers feel the home, and
            help sellers attract stronger attention from day one.
          </p>

          <div className="mt-10">
            {target ? (
              <a
                href={videoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded-xl px-10 py-4 bg-black text-white font-sans tracking-widest text-sm uppercase font-semibold hover:bg-neutral-800 transition-colors duration-300"
              >
                {target.kind === "playlist" ? "Open Playlist" : "Watch On YouTube"}
              </a>
            ) : (
              <span className="inline-block rounded-xl px-10 py-4 bg-neutral-200 text-neutral-500 font-sans tracking-widest text-sm uppercase font-semibold cursor-not-allowed">
                Watch On YouTube
              </span>
            )}
          </div>
        </div>

        <div className="w-full lg:w-1/2 min-w-0">
          <div className="relative w-full aspect-video bg-neutral-100 overflow-hidden shadow-lg">
            {target ? (
              <>
                <div id={playerContainerId} className="absolute inset-0 w-full h-full" />
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-auto">
                    <button
                      type="button"
                      disabled={!playerReady}
                      onClick={() => playerRef.current?.previousVideo()}
                      className="w-11 h-11 rounded-full bg-white/85 text-black backdrop-blur-sm shadow-md flex items-center justify-center transition-all duration-300 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
                      aria-label="Previous video"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M15.75 19.5 8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                  </div>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-auto">
                    <button
                      type="button"
                      disabled={!playerReady}
                      onClick={() => playerRef.current?.nextVideo()}
                      className="w-11 h-11 rounded-full bg-white/85 text-black backdrop-blur-sm shadow-md flex items-center justify-center transition-all duration-300 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
                      aria-label="Next video"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M8.25 4.5 15.75 12l-7.5 7.5" />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-center px-10">
                <div className="max-w-md">
                  <p className="text-neutral-500 text-sm uppercase tracking-[0.2em] font-sans">
                    Add A YouTube Link
                  </p>
                  <p className="mt-3 text-neutral-600 font-light">
                    Paste your YouTube URL into the <span className="font-medium">portfolioVideoUrl</span> value in{" "}
                    <span className="font-medium">src/app/page.tsx</span>.
                  </p>
                </div>
              </div>
            )}
          </div>
          <p className="mt-4 text-[10px] text-neutral-500 font-sans uppercase tracking-[0.25em]">
            High-impact visuals, calm execution
          </p>
        </div>
      </div>
    </section>
  );
}
