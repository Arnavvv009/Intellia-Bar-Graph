import React, { useState, useRef, useEffect } from 'react';
import BarGraph3D from './BarGraph3D';

export default function GraphRotator({
  data,
  maxScale = 10,
  scaleStep = 2,
  title = '',
  xLabel = '',
  yLabel = '',
  highlight = null,
  size = 240,
  onBarClick = null,
  tallyMode = null,
  activeTallyList = [],
  showValues = false,
  autoRotate = false,
}) {
  const [rotationX, setRotationX] = useState(-20);
  const [rotationY, setRotationY] = useState(-18);
  const [userInteracted, setUserInteracted] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const startRotationX = useRef(0);
  const startRotationY = useRef(0);
  const stageRef = useRef(null);

  useEffect(() => {
    if (!autoRotate || userInteracted) return;
    let animId;
    const tick = () => {
      setRotationY((prev) => (prev - 0.4) % 360);
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [autoRotate, userInteracted]);

  useEffect(() => {
    setUserInteracted(false);
    setRotationX(-20);
    setRotationY(-18);
  }, [data]);

  const handleStart = (clientX, clientY) => {
    isDragging.current = true;
    setUserInteracted(true);
    startX.current = clientX;
    startY.current = clientY;
    startRotationX.current = rotationX;
    startRotationY.current = rotationY;
  };

  const handleMove = (clientX, clientY) => {
    if (!isDragging.current) return;
    const deltaX = clientX - startX.current;
    const deltaY = clientY - startY.current;
    const newRotationY = (startRotationY.current + deltaX * 1.0) % 360;
    const newRotationX = Math.max(-60, Math.min(10, startRotationX.current - deltaY * 0.6));
    setRotationY(newRotationY < 0 ? newRotationY + 360 : newRotationY);
    setRotationX(newRotationX);
  };

  const handleEnd = () => {
    isDragging.current = false;
  };

  const onMouseDown = (e) => {
    handleStart(e.clientX, e.clientY);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  const onMouseMove = (e) => handleMove(e.clientX, e.clientY);
  const onMouseUp = () => {
    handleEnd();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  const onTouchStart = (e) => {
    if (e.touches.length === 0) return;
    handleStart(e.touches[0].clientX, e.touches[0].clientY);
  };
  const onTouchMove = (e) => {
    if (e.touches.length === 0) return;
    handleMove(e.touches[0].clientX, e.touches[0].clientY);
  };
  const onTouchEnd = () => handleEnd();

  return (
    <div
      ref={stageRef}
      className="view-3d-stage"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{
        touchAction: 'none',
        width: `${size * 1.35}px`,
        height: `${size}px`,
        maxWidth: '100%'
      }}
    >
      <BarGraph3D
        data={data}
        maxScale={maxScale}
        scaleStep={scaleStep}
        title={title}
        xLabel={xLabel}
        yLabel={yLabel}
        highlight={highlight}
        rotationX={rotationX}
        rotationY={rotationY}
        size={size}
        onBarClick={onBarClick}
        tallyMode={tallyMode}
        activeTallyList={activeTallyList}
        showValues={showValues}
      />
    </div>
  );
}
