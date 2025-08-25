import React from 'react';

import React from 'react';
import { rotateItem, getShapeBounds } from '../utils/itemUtils';

const InventoryItem = ({ item, onDragStart, onItemRotate, isDragging, isMobile = false }) => {
  const handleMouseDown = (e) => {
    e.preventDefault();
    onDragStart(item);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    onDragStart(item);
  };

  const handleDoubleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (item.rotatable && onItemRotate) {
      onItemRotate(item);
    }
  };

  const itemSize = isMobile ? 12 : 16;
  const cellSize = isMobile ? 14 : 18;
  const padding = isMobile ? 2 : 4;

  // Calcular dimensiones basadas en la forma actual
  const bounds = getShapeBounds(item.shape);
  const width = bounds.width * cellSize + padding;
  const height = bounds.height * cellSize + padding;

  // Renderizar la forma usando celdas individuales
  const renderShape = () => {
    return item.shape.map(([x, y], index) => (
      <div
        key={index}
        className="absolute border border-yellow-300"
        style={{
          left: x * cellSize,
          top: y * cellSize,
          width: cellSize,
          height: cellSize,
          backgroundColor: 'currentColor'
        }}
      />
    ));
  };

  return (
    <div
      className={`
        cursor-grab active:cursor-grabbing transition-all duration-200 relative
        ${isDragging ? 'opacity-50 scale-95' : 'hover:scale-105 hover:brightness-110'}
        ${isDragging ? 'pointer-events-none' : ''}
        ${item.rotatable ? 'cursor-pointer' : 'cursor-grab'}
        touch-manipulation
      `}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onDoubleClick={handleDoubleClick}
      style={{
        width: width,
        height: height,
        minWidth: '24px',
        minHeight: '24px'
      }}
    >
      <div 
        className={`
          relative w-full h-full rounded border-2 border-yellow-400 shadow-lg
          ${item.color} text-white font-bold
          transition-all duration-200
          ${isMobile ? 'text-xs' : 'text-xs'}
        `}
        style={{
          backgroundImage: item.pattern ? 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)' : 'none'
        }}
      >
        {/* Renderizar forma */}
        <div className="absolute inset-1">
          {renderShape()}
        </div>
        
        {/* Nombre del item */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="drop-shadow-md text-center leading-tight p-1 z-10">
            {isMobile && item.name.length > 6 ? item.name.slice(0, 4) + '.' : item.name}
          </span>
        </div>

        {/* Indicador de rotación */}
        {item.rotatable && (
          <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white text-xs flex items-center justify-center">
            <span className="text-white text-xs">↻</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryItem;