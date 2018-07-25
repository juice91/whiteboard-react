import React from 'react';
import './flexfullscreen.scss';
import Docker from '../../components/layout/docker';

export default function FlexFullScreen(props) {
  return (
    <div className="flexfullscreen">
      <Docker />
      <div className="flexfullscreen position-absolute">{props.children}</div>
    </div>
  );
}
