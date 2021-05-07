import React, { useCallback, useState, useRef, useEffect, useImperativeHandle } from "react";


export function usePathAnimation(options: {
  startRef: React.RefObject<HTMLElement>
  endRef: React.RefObject<HTMLElement>
  onEnd?: () => void
  duration?: number
}) {
  const { startRef, endRef, duration = 0.6, onEnd } = options;

  const [status, setStatus] = useState<'none' | 'ready' | 'to'>('none');

  const [xStyle, setXStyle] = useState<React.CSSProperties>({
    position: 'fixed',
    display: 'none',
    pointerEvents: 'none',
    zIndex: 9999999999,
  });
  const [yStyle, setYStyle] = useState<React.CSSProperties>({
    display: 'inline-block',
    width: '100%',
    height: '100%',
  });

  const setStyle = useCallback(() => {
    const startEl = startRef.current;
    const endEl = endRef.current;
    if (!startEl || !endEl) return;

    const {left: endLeft, top: endTop} = endEl.getBoundingClientRect();
    const {left: startLeft, top: startTop} = startEl.getBoundingClientRect();
    const deltaLeft = endLeft - startLeft;
    const deltaTop = endTop - startTop;

    const xTF = 'linear';
    const yTF = 'cubic-bezier(0,.97,1,1.14)';

    if (status === 'none') {
      setXStyle({...xStyle, display: 'none', transition: 'none', transform: 'none', left: startLeft, top: startTop});
      setYStyle({...yStyle, transition: 'none', transform: 'none'})
    } else if (status === 'ready') {
      setXStyle({...xStyle, display: 'flex', transition: `transform ${duration}s ${xTF}`, transform: `translateX(${0}px)`, left: startLeft, top: startTop});
      setYStyle({...yStyle, transition: `transform ${duration}s ${yTF}`, transform: `translateY(${0}px)`})
    } else if (status === 'to') {
      setXStyle({...xStyle, display: 'flex', transform: `translateX(${deltaLeft}px)`, left: startLeft, top: startTop})
      setYStyle({...yStyle, transform: `translateY(${deltaTop}px)`})
    }
  }, [status]);

  const play = useCallback(() => {
    if (status !== 'none') return;
    setStatus('ready');
  }, [setStatus, status]);

  const onTransitionEnd = useCallback(() => {
    setStatus('none');
    onEnd && onEnd();
  }, [onEnd, setStatus]);

  useEffect(() => {
    if (status === 'ready') {
      setStatus('to');
      return
    }
  }, [status])

  useEffect(() => {
    setStyle();
  }, [status])

  return {
    play,
    xStyle,
    yStyle,
    onTransitionEnd
  }
}

export interface PathAnimationRefCurrent {
  play: ReturnType<typeof usePathAnimation>['play']
}

const PathAnimation: React.ForwardRefRenderFunction<
  PathAnimationRefCurrent, 
  Parameters<typeof usePathAnimation>[0] & {
  style?: React.CSSProperties
  className?: string
}> = (props, ref) => {
  const {
    style,
    className,
    ...options
  } = props;

  const { xStyle, yStyle, play, onTransitionEnd } = usePathAnimation(options);

  useImperativeHandle(ref, () => {
    return {
      play
    }
  }, [play])

  return <div className={className} style={{...xStyle}} onTransitionEnd={onTransitionEnd}>
    <div style={{...yStyle, ...style}} />
  </div>
}

export default React.forwardRef(PathAnimation);