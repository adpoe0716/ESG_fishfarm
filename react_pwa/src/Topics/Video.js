import React, { useRef, useEffect } from 'react';
import video1 from '../video/監視器1.mp4';
import video2 from '../video/監視器2.mp4';
import video3 from '../video/監視器3.mp4';
import video4 from '../video/監視器4.mp4';
import video5 from '../video/監視器5.mp4';
import video6 from '../video/fly.mp4';
import './video.css';

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.play();
    }
  }, []);

  return (
    <video ref={videoRef} src={src} width="100%" height="100%" loop autoPlay muted />
  );
};

export default function Video() {
  return (
    <div className="video-grid">
      <VideoPlayer src={video1} />
      <VideoPlayer src={video2} />
      <VideoPlayer src={video3} />
      <VideoPlayer src={video4} />
      <VideoPlayer src={video5} />
      <VideoPlayer src={video6} />
    </div>
  );
}

