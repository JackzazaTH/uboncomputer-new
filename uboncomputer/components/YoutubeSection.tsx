

import React from 'react';
import { Youtube, Play, ArrowRight } from 'lucide-react';
import { YoutubeVideo } from '../types';

interface VideoThumbnailProps {
  video: YoutubeVideo;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ video }) => (
  <a href={video.link} target="_blank" rel="noopener noreferrer" className="block relative rounded-xl overflow-hidden shadow-lg group aspect-video">
    <img 
      src={video.imageUrl} 
      alt={video.alt} 
      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
    />
    <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-colors group-hover:bg-black/40">
      <div className="w-16 h-16 bg-red-600/80 rounded-full flex items-center justify-center transition-all transform group-hover:scale-110 group-hover:bg-red-600">
        <Play 
          size={32} 
          className="text-white drop-shadow-lg" 
          fill="white"
        />
      </div>
    </div>
  </a>
);

interface YoutubeSectionProps {
  title: string;
  videos: YoutubeVideo[];
}

const YoutubeSection: React.FC<YoutubeSectionProps> = ({ title, videos }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="flex items-center text-2xl font-bold text-gray-900">
            <Youtube size={28} className="text-red-600" />
            <span className="ml-3">{title}</span>
          </h2>
          <a
            href="https://www.youtube.com"
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-semibold text-gray-600 hover:text-orange-600 flex items-center transition-colors"
          >
            ดูทั้งหมด
            <ArrowRight size={16} className="ml-1" />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoThumbnail key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default YoutubeSection;