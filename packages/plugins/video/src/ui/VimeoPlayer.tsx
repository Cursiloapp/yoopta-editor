import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const VIMEO_API_URI = 'https://vimeo.com/api/v2/video';

function VimeoPlayer({ videoId, children, attributes, ...other }) {
  const vimeoRootRef = useRef(null);
  const [src, setSrc] = useState(null);
  const [isFrameLoaded, setFrameLoaded] = useState(false);

  const { isIntersecting: isInViewport } = useIntersectionObserver(vimeoRootRef, {
    freezeOnceVisible: true,
    rootMargin: '50%',
  });

  useEffect(() => {
    fetch(`${VIMEO_API_URI}/${videoId}.json`)
      .then((data) => data.json())
      .then((data) => setSrc(data[0].thumbnail_medium))
      .catch(() => setSrc(null));
  }, [videoId]);

  const onRef = (el) => {
    vimeoRootRef.current = el;
    attributes.ref(el);
  };

  return (
    <div {...attributes} ref={onRef} className="relative">
      <img
        src={src || ''}
        alt="vimeo_video_preview"
        width="100%"
        height="100%"
        className="absolute top-0 left-0 w-full h-full"
        style={{
          opacity: isInViewport && isFrameLoaded ? 0 : 1,
          zIndex: isInViewport && isFrameLoaded ? -1 : 0,
        }}
      />
      {isInViewport && (
        <iframe
          title="Video Player"
          // https://developer.vimeo.com/player/embedding
          src={`https://player.vimeo.com/video/${videoId}?badge=0&byline=0&portrait=0&title=0`}
          frameBorder={0}
          allowFullScreen
          onLoad={() => setFrameLoaded(true)}
          className="absolute top-0 left-0 rounded-[3px]"
          {...other}
        />
      )}
      {children}
    </div>
  );
}

export default VimeoPlayer;
