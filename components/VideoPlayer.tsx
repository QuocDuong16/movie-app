import React from 'react';

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  return (
    <div className="player-wrapper">
      <div className="react-player">
        <iframe
          src={url}
          allowFullScreen
          className="w-full h-full"
          style={{ aspectRatio: '16/9' }} // Đảm bảo tỷ lệ màn hình 16:9
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
