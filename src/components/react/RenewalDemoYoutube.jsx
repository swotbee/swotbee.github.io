import { useEffect, useRef } from "react";

const videoId = "ZtYqSi4Kg5E";
const videoName = "renewal_demo";
let youtubeApiPromise;

function track(name) {
  window.gtag?.("event", name, { video_name: videoName });
}

function loadYoutubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (youtubeApiPromise) return youtubeApiPromise;

  youtubeApiPromise = new Promise((resolve) => {
    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      resolve(window.YT);
    };

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.head.appendChild(script);
    }
  });

  return youtubeApiPromise;
}

async function exitVideoFullscreen() {
  try {
    if (document.fullscreenElement && document.exitFullscreen) {
      await document.exitFullscreen();
      return;
    }
    if (document.webkitFullscreenElement && document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  } catch {
    // Some mobile browsers own native video fullscreen and require the viewer to tap Done.
  }
}

export default function RenewalDemoYoutube({ onEnded }) {
  const playerMountRef = useRef(null);
  const playerRef = useRef(null);
  const progressTimerRef = useRef(null);
  const playFiredRef = useRef(false);
  const halfwayFiredRef = useRef(false);
  const completionFiredRef = useRef(false);
  const onEndedRef = useRef(onEnded);

  useEffect(() => {
    onEndedRef.current = onEnded;
  }, [onEnded]);

  useEffect(() => {
    let cancelled = false;

    const stopProgressTracking = () => {
      if (progressTimerRef.current) {
        window.clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
      }
    };

    const startProgressTracking = () => {
      if (progressTimerRef.current) return;
      progressTimerRef.current = window.setInterval(() => {
        const player = playerRef.current;
        const duration = player?.getDuration?.() || 0;
        const currentTime = player?.getCurrentTime?.() || 0;
        if (!halfwayFiredRef.current && duration && currentTime / duration >= 0.5) {
          halfwayFiredRef.current = true;
          track("video_50");
        }
      }, 1000);
    };

    loadYoutubeApi().then((YT) => {
      if (cancelled || !playerMountRef.current) return;

      playerRef.current = new YT.Player(playerMountRef.current, {
        videoId,
        playerVars: {
          playsinline: 1,
          rel: 0,
        },
        events: {
          onStateChange: async ({ data }) => {
            if (data === YT.PlayerState.PLAYING) {
              if (!playFiredRef.current) {
                playFiredRef.current = true;
                track("video_play");
              }
              startProgressTracking();
              return;
            }

            if (data === YT.PlayerState.PAUSED || data === YT.PlayerState.BUFFERING) {
              stopProgressTracking();
              return;
            }

            if (data === YT.PlayerState.ENDED) {
              stopProgressTracking();
              if (!completionFiredRef.current) {
                completionFiredRef.current = true;
                track("video_complete");
              }
              await exitVideoFullscreen();
              onEndedRef.current?.();
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      stopProgressTracking();
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
  }, []);

  return (
    <div className="aspect-video w-full bg-black">
      <div ref={playerMountRef} className="h-full w-full" />
    </div>
  );
}
