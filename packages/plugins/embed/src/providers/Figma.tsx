import { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ProviderRenderProps } from '../types';

const Figma = ({ provider, width, height, attributes, children }: ProviderRenderProps) => {
  const figmaRootRef = useRef(null);

  const { isIntersecting: isInViewport } = useIntersectionObserver(figmaRootRef, {
    freezeOnceVisible: true,
    rootMargin: '50%',
  });

  const onRef = (node) => {
    figmaRootRef.current = node;
    attributes.ref(node);
  };

  return (
    <div className="relative" {...attributes} ref={onRef}>
      {isInViewport && (
        <iframe
          src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(provider?.url || '')}`}
          frameBorder={0}
          allowFullScreen
          className="absolute top-0 left-0 rounded-[3px]"
          width={width}
          height={height}
        />
      )}
      {children}
    </div>
  );
};

export { Figma };
