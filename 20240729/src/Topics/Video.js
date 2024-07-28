import React, { useState } from 'react';
import video1 from '../video/監視器1.mp4';
import video2 from '../video/監視器2.mp4';
import video3 from '../video/監視器3.mp4';
import video4 from '../video/監視器4.mp4';
import video5 from '../video/監視器5.mp4';
import video6 from '../video/fly.mp4';
import VideoPlayer from './VideoPlayer';
export default function Video() {
    // 定义一个数组包含所有视频源
    const videos = [video1, video2, video3, video4, video5, video6];
  
    // 使用useState来存储当前视频索引
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  
    // 切换视频的函数
    const changeVideo = (index) => {
      setCurrentVideoIndex(index);
    };
  
    return (
      <div className="video-container">
        <VideoPlayer src={videos[currentVideoIndex]} />
        <div className="video-controls">
          {videos.map((_, index) => (
            <button key={index} onClick={() => changeVideo(index)}>
              Video {index + 1}
            </button>
          ))}
        </div>
      </div>
    );
  }