import { useRef, useState } from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const videoName = "renewal_demo";

function track(name) {
  window.gtag?.("event", name, { video_name: videoName });
}

export default function RenewalDemoYoutube({ showEndCta = false }) {
  const [halfFired, setHalfFired] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [playback, setPlayback] = useState(0);
  const playFired = useRef(false);
  const completionFired = useRef(false);

  const replay = () => {
    completionFired.current = false;
    setCompleted(false);
    setPlayback((value) => value + 1);
  };

  if (showEndCta && completed) {
    return (
      <section
        className="aspect-video bg-v6-dark px-6 py-8 sm:px-12 flex flex-col items-center justify-center text-center"
        aria-label="Next step after the renewal operations walkthrough"
      >
        <p className="max-w-xl text-xl font-bold leading-tight text-white sm:text-3xl">
          Stop managing renewals in spreadsheets and follow-up chaos.
        </p>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
          See where your renewal process is leaking revenue.
        </p>
        <a
          href="/renewal-audit-call/"
          className="mt-6 rounded-xl bg-v6-copper px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-v6-copper-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-v6-dark"
          onClick={() => track("renewal_video_end_cta_click")}
        >
          Book a Renewal Alignment Call →
        </a>
        <button
          type="button"
          className="mt-4 text-sm font-medium text-white/75 underline underline-offset-4 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-v6-dark"
          onClick={replay}
        >
          Replay demo
        </button>
      </section>
    );
  }

  return (
    <LiteYouTubeEmbed
      key={playback}
      id="ZtYqSi4Kg5E"
      title="Renewal Operations walkthrough"
      poster="maxresdefault"
      lazyLoad
      enableJsApi
      rel="0"
      onPlay={() => {
        if (!playFired.current) {
          playFired.current = true;
          track("video_play");
        }
      }}
      onStateChange={({ currentTime, duration }) => {
        if (!halfFired && duration && currentTime / duration >= 0.5) {
          setHalfFired(true);
          track("video_50");
        }
      }}
      onEnd={() => {
        if (completionFired.current) return;
        completionFired.current = true;
        track("video_complete");
        if (showEndCta) setCompleted(true);
      }}
    />
  );
}
