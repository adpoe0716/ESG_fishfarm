import React, { useRef, useEffect } from 'react';

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.load(); // 重新加载视频
      videoElement.play(); // 自动播放视频
    }
  }, [src]);  // 添加src为依赖项

  return (
    <video ref={videoRef} src={src} width="100%" height="100%" loop autoPlay muted />
  );
};

export default VideoPlayer;
