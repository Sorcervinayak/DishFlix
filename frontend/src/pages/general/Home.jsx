import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Added missing import
import "../../styles/reels.css";

const Home = () => { // Fixed: home -> Home (PascalCase for components)
  const [videos, setVideos] = useState([]); // Fixed: video -> videos for better naming
  const videoRefs = useRef(new Map());
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (!(video instanceof HTMLVideoElement)) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            video.play().catch(() => {
              /*ignore autoplay errors*/
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0, 0.25, 0.6, 0.9, 1] }
    );

    // Observe all current videos
    videoRefs.current.forEach((vid) => {
      if (vid) observer.observe(vid);
    });

    return () => observer.disconnect();
  }, [videos]); // Added videos dependency

 useEffect(() => {
  console.log("🔄 Fetching videos from API...");
  axios
    .get("http://localhost:3000/api/food", { withCredentials: true })
    .then((res) => {
      console.log("✅ API Response:", res.data);
      console.log("📹 Food items found:", res.data.foods);
      console.log("🔢 Number of videos:", res.data.foods);
      
      setVideos(res.data.foods || res.data || []);
    })
    .catch((error) => {
      console.error("❌ Error fetching videos:", error);
      console.log("Error details:", error.response?.data);
      setVideos([]);
    });
}, []);

  const setVideoRef = (id) => (el) => {
    if (!el) {
      videoRefs.current.delete(id);
      return;
    }
    videoRefs.current.set(id, el);
  };

  return (
    <div ref={containerRef} className="reels-page">
      <div className="reels-feed" role="list">
        {videos && videos.length > 0 ? ( // Added check for empty state
          videos.map((item) => (
            <section key={item._id} className="reel" role="listitem">
              <video
                ref={setVideoRef(item._id)}
                className="reel-video"
                src={item.video}
                muted
                playsInline
                loop
                preload="metadata"
              />

              <div className="reel-content">
                <p className="reel-description" title={item.description}>
                  {item.description}
                </p>
                
                {item.foodPartner && (
                  <Link
                    className="reel-btn"
                    to={"/food-partner/" + item.foodPartner}
                    aria-label="Visit store"
                  >
                    Visit store
                  </Link>
                )}
              </div>
            </section>
          ))
        ) : (
          <div className="no-videos">No videos found</div> // Added empty state
        )}
      </div>
    </div>
  );
};

export default Home; // Fixed: home -> Home