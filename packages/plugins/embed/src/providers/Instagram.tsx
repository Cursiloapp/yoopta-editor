import React, { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

type InstagramProps = {
  provider: {
    id: string;
    url: string;
  };
  width: number | 'auto';
  height: number | 'auto';
  blockId: string;
  attributes: any;
  children: React.ReactNode;
};

const Instagram: React.FC<InstagramProps> = ({ provider, width, height, attributes, children }) => {
  const embedUrl = `https://www.instagram.com/p/${provider.id}/embed`;
  const instagramRootRef = useRef<HTMLEmbedElement>(null);

  const { isIntersecting: isInViewport } = useIntersectionObserver(instagramRootRef, {
    freezeOnceVisible: true,
    rootMargin: '50%',
  });

  return (
    <div className="w-full h-full" {...attributes}>
      <div ref={instagramRootRef}>
        {isInViewport && (
          <iframe
            src={embedUrl}
            width={width === 'auto' ? '100%' : width}
            height={height === 'auto' ? '100%' : height}
            frameBorder="0"
            scrolling="no"
            allowTransparency
            allowFullScreen
            className="absolute top-0 left-0 rounded-[3px]"
          />
        )}
        {children}
      </div>
    </div>
  );
};

export default Instagram;
