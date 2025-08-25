import React from 'react';

const GridSlot = ({ row, col, size, isOccupied, canPlace, isDragging }) => {
  const getSlotClass = () => {
    let baseClass = 'absolute border transition-colors duration-150';
    
    if (isOccupied) {
      return `${baseClass} bg-transparent border-gray-600`;
    }
    
    if (isDragging) {
      if (canPlace && row === 0 && col === 0) { // Solo mostrar preview en posición válida
        return `${baseClass} bg-green-400 bg-opacity-30 border-green-400`;
      } else if (!canPlace) {
        return `${baseClass} bg-red-400 bg-opacity-20 border-red-400`;
      }
    }
    
    return `${baseClass} bg-gray-800 border-gray-600 hover:bg-gray-700`;
  };

  return (
    <div
      className={getSlotClass()}
      style={{
        left: col * size,
        top: row * size,
        width: size,
        height: size,
        zIndex: 1
      }}
    />
  );
};

export default GridSlot;