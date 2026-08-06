import { useRef, useState } from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const videoName = "renewal_demo";

function track(name) {
  window.gtag?.("event", name, { video_name: videoName });
}

export default function RenewalDemoYoutube() {
  const [halfFired, setHalfFired] = useState(false);
  const playFired = useRef(false);

  return (
    <LiteYouTubeEmbed
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
      onEnd={() => track("video_complete")}
    />
  );
}
