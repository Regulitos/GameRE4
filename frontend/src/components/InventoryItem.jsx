import React from 'react';

const InventoryItem = ({ item, onDragStart, isDragging }) => {
  const handleMouseDown = (e) => {
    e.preventDefault();
    onDragStart(item);
  };

  return (
    <div
      className={`
        cursor-grab active:cursor-grabbing transition-all duration-200
        ${isDragging ? 'opacity-50 scale-95' : 'hover:scale-105 hover:brightness-110'}
        ${isDragging ? 'pointer-events-none' : ''}
      `}
      onMouseDown={handleMouseDown}
      style={{
        width: item.width * 16 + 8,
        height: item.height * 16 + 8
      }}
    >
      <div 
        className={`
          w-full h-full rounded border-2 border-yellow-400 shadow-lg
          ${item.color} flex items-center justify-center text-white font-bold text-xs
          transition-all duration-200
        `}
        style={{
          backgroundImage: item.pattern ? 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)' : 'none'
        }}
      >
        <span className="drop-shadow-md text-center leading-tight">
          {item.name}
        </span>
      </div>
    </div>
  );
};

export default InventoryItem;