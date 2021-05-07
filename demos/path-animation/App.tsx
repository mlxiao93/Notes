import './App.scss'
import React, { useRef, useState } from 'react'
import PathAnimation, { PathAnimationRefCurrent } from './PathAnimation'

export default function App() {

  // const [isEnd, setIsEnd] = useState<boolean>(false);

  const startRef = useRef(null);
  const endRef = useRef(null);
  const aniRef = useRef<PathAnimationRefCurrent>(null);

  function onClick() {
    aniRef.current.play();
  }

  function onEnd() {
    console.log('animation end');
  }

  return <div className="app">
    
    <PathAnimation style={{width: '16px', height: '16px', background: 'red', borderRadius: '100%'}} 
      onEnd={onEnd}
      startRef={endRef} endRef={startRef} ref={aniRef} />

    <div className="start" ref={startRef} />


    <div className="end" ref={endRef} onClick={onClick} />

  </div>
}