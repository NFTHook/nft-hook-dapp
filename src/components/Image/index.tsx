import React, { useState, useEffect } from 'react';
import Default from './defaut_avatar.svg';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string>(Default);
  const [imgStatus, setImgStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  useEffect(() => {
    setImgSrc(Default);
    setImgStatus('loading');
    console.log('loading')
  }, [src]);

  const handleLoad = () => {
    setImgSrc(src);
    setImgStatus('loaded');
    console.log('loaded')
  };

  const handleError = () => {
    setImgSrc(Default);
    setImgStatus('error');
    console.log('error')
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onLoad={handleLoad}
      onError={handleError}
      {...props}
    />
  );
};

export default ImageWithFallback;
