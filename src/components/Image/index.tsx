import React, { useState, useRef } from 'react';
import Default from './defaut_avatar.svg';

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
  const [error, setError] = useState(false);

  const onLoad = (url: string) => {
    console.log('handleOnLoad..')

    setError(false);
    const imgDom = document.createElement('img');
    imgDom.src = url;
    imgDom.onload = function () {
      console.log('onload--');
      setNeededSrc(url);
    }
    imgDom.onerror = () => {
      onError();
    };
  }

  // 加载失败
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
