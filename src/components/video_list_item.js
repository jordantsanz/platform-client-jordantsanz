import React from 'react';

const VideoListItem = (props) => {
  const imgUrl = props.video.snippet.thumbnails.default.url;

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li onClick={() => props.onVideoSelect(props.video)}>
      <img src={imgUrl} alt="video" />
      <div>{props.video.snippet.title}</div>
    </li>
  );
};

export default VideoListItem;
