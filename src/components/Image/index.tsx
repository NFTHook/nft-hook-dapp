import React, { useState, useRef, useEffect } from 'react';
import Default from './logo.png';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  loadingImg?: string,
  errorImg?: string,
  src: string,
  alt?: string,
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  ...props
}) => {
  const imgRef = useRef<HTMLDivElement>(null);
  const [neededSrc, setNeededSrc] = useState(Default || src);

  useEffect(() => {
    setNeededSrc(src)
  }, [src])

  const onLoad = (url: string) => {
    const imgDom = document.createElement('img');
    imgDom.src = url;
    imgDom.onload = function () {
      setNeededSrc(url);
    }
    imgDom.onerror = () => {
      onError();
    };
  }

  // error
  const onError = () => {
    setNeededSrc(Default);
  }

  return (
    <div ref={imgRef} className="img">
      <img
        src={neededSrc}
        alt={alt}
        onLoad={() => onLoad(src)}
        onError={() => onError()}
        {...props}
      />
    </div>
  );
};

export default Image;
