import { useEffect, useRef, useState } from "react";
import { formatDuration } from "../utils/format";
import { formatTimeAgo } from "../utils/formatTimeAgo";

type VideoGridItemProps = {
  id: string;
  title: string;
  channel: {
    id: string;
    name: string;
    profileUrl: string;
  };
  views: number;
  postedAt: Date;
  duration: number;
  thumbnailUrl: string;
  videoUrl: string;
};

const VIEW_FORMATTER = Intl.NumberFormat(undefined, {
  notation: "compact",
});

const VideoGridItem = ({
  id,
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}: VideoGridItemProps) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current == null) return;

    if (isVideoPlaying) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isVideoPlaying]);
  return (
    <div
      className='flex flex-col gap-2'
      onMouseEnter={() => setIsVideoPlaying(true)}
      onMouseLeave={() => setIsVideoPlaying(false)}
    >
      <a href={`watch?v=${id}`} className='relative aspect-video'>
        <img
          src={thumbnailUrl}
          className={`block object-cover w-full h-full transition-[border-radius] duration-200 ${
            isVideoPlaying ? "rounded-none" : "rounded-xl"
          }`}
        />
        <div className='absolute px-0.5 text-sm rounded bottom-1 right-1 bg-secondary-dark text-secondary'>
          {formatDuration(duration)}
        </div>
        <video
          ref={videoRef}
          muted
          playsInline
          src={videoUrl}
          className={`block h-full object-cover absolute inset-0 transition-opacity duration-200 ${
            isVideoPlaying ? "opacity-100  delay-200" : "opacity-0"
          }`}
        />
      </a>
      <div className='flex gap-2'>
        <a href={`@${channel.id}`} className='flex-shrink-0'>
          <img
            src={`${channel.profileUrl}`}
            alt='channel profile url'
            className='object-contain w-10 h-10 rounded-full'
          />
        </a>

        <div className='flex flex-col'>
          <a href={`/watch?v=${id}`} className='font-bold line-clamp-2'>
            {title}
          </a>
          <a href={`/@${channel.id}`} className='text-sm text-secondary-text'>
            {channel.name}
          </a>
          <div className='text-sm text-secondary-text'>
            {VIEW_FORMATTER.format(views)} Views{" "}
            <span className='inline-block w-2 h-2 rounded-full bg-secondary'></span>{" "}
            {formatTimeAgo(postedAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGridItem;
