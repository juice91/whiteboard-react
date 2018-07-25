import React from 'react';
import './layout.scss';

export default function LayoutElement(props) {
  return <div className="layout-element">{props.children}</div>;
}
