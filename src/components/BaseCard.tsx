import React, { useState } from 'react';
import {
  CardWrapper,
  CardAction,
  CardContentSkeleton,
  CardSubtitle,
  CardTitle,
} from './BaseCard.style';
import type { BaseCardProps, Size, CardElementStyles } from '../types';

const configureStyleBasedOnSize = (size: Size): CardElementStyles => {
  switch (size) {
    case 'xs':
      return {
        width: '240px',
        height: '300px',
        titleFont: '18px',
        subtitleFont: '14px',
        padding: '16px 8px',
      };
    case 'sm':
      return {
        width: '300px',
        height: '375px',
        titleFont: '24px',
        subtitleFont: '16px',
        padding: '16px 8px',
      };
    case 'md':
      return {
        width: '400px',
        height: '500px',
        titleFont: '32px',
        subtitleFont: '18px',
        padding: '24px 8px',
      };
    case 'lg':
      return {
        width: '500px',
        height: '640px',
        titleFont: '36px',
        subtitleFont: '24px',
        padding: '32px 16px',
      };
  }
};

export default ({
  imageUrl,
  title,
  subtitle,
  size,
  action,
  loading,
  lazyLoading,
  onImgClick,
}: BaseCardProps) => {
  const [imgLoading, setImgLoading] = useState(lazyLoading);
  const [imgSrc, setImgSrc] = useState(imageUrl);
  const styledElements = configureStyleBasedOnSize(size ?? 'sm');
  if (loading)
    return (
      <CardWrapper
        width={styledElements.width}
        height={styledElements.height}
        $padding={styledElements.padding}
      >
        <CardContentSkeleton height="70%" width="70%" />
        <CardContentSkeleton
          height={styledElements.titleFont}
          width="50%"
          $cardmargintop="24px"
        />
        <CardContentSkeleton height={styledElements.subtitleFont} width="50%" />
        <CardContentSkeleton
          height="50px"
          width="50%"
          $cardborderradius="24px"
        />
      </CardWrapper>
    );
  else
    return (
      <CardWrapper
        width={styledElements.width}
        height={styledElements.height}
        $padding={styledElements.padding}
      >
        {imageUrl ? (
          <img
            loading={lazyLoading ? 'lazy' : 'eager'}
            height="70%"
            width="70%"
            src={imgSrc}
            onLoad={() => setImgLoading(false)}
            onError={() =>
              setImgSrc(
                'https://images.fotmob.com/image_resources/playerimages/26166.png',
              )
            }
            onClick={onImgClick}
            style={{ cursor: onImgClick ? 'pointer' : 'auto' }}
          />
        ) : (
          <CardContentSkeleton height="58%" width="60%" />
        )}
        {imgLoading && (
          <CardContentSkeleton
            style={{ position: 'absolute' }}
            height="58%"
            width="60%"
          />
        )}

        <CardTitle $cardfontsize={styledElements.titleFont}>{title}</CardTitle>
        {subtitle && (
          <CardSubtitle $cardfontsize={styledElements.subtitleFont}>
            {subtitle}
          </CardSubtitle>
        )}
        {action && (
          <CardAction onClick={action.handler}>{action.label}</CardAction>
        )}
      </CardWrapper>
    );
};
