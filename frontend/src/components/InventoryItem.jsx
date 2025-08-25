import React from 'react';

const InventoryItem = ({ item, onDragStart, isDragging, isMobile = false }) => {
  const handleMouseDown = (e) => {
    e.preventDefault();
    onDragStart(item);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    onDragStart(item);
  };

  const itemSize = isMobile ? 12 : 16;
  const padding = isMobile ? 4 : 8;

  return (
    <div
      className={`
        cursor-grab active:cursor-grabbing transition-all duration-200
        ${isDragging ? 'opacity-50 scale-95' : 'hover:scale-105 hover:brightness-110'}
        ${isDragging ? 'pointer-events-none' : ''}
        touch-manipulation
      `}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{
        width: item.width * itemSize + padding,
        height: item.height * itemSize + padding,
        minWidth: '32px',
        minHeight: '32px'
      }}
    >
      <div 
        className={`
          w-full h-full rounded border-2 border-yellow-400 shadow-lg
          ${item.color} flex items-center justify-center text-white font-bold
          transition-all duration-200
          ${isMobile ? 'text-xs' : 'text-xs'}
        `}
        style={{
          backgroundImage: item.pattern ? 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)' : 'none'
        }}
      >
        <span className="drop-shadow-md text-center leading-tight p-1">
          {isMobile && item.name.length > 6 ? item.name.slice(0, 4) + '.' : item.name}
        </span>
      </div>
    </div>
  );
};

export default InventoryItem;