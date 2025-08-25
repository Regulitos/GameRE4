import React, { useState, useRef, useCallback } from 'react';
import { Card } from './ui/card';
import { mockItems } from '../data/mock';
import InventoryItem from './InventoryItem';
import GridSlot from './GridSlot';
import { rotateItem, canPlaceShape, getShapeCells, getShapeBounds } from '../utils/itemUtils';

const InventoryPanel = () => {
  const [gridItems, setGridItems] = useState({});
  const [availableItems, setAvailableItems] = useState(mockItems);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragPreview, setDragPreview] = useState({ x: 0, y: 0, visible: false });
  const gridRef = useRef(null);

  const GRID_SIZE = 40;
  const GRID_COLS = 8;
  const GRID_ROWS = 10;

  const getGridPosition = (x, y) => {
    const rect = gridRef.current?.getBoundingClientRect();
    if (!rect) return { col: 0, row: 0 };
    
    const col = Math.floor((x - rect.left) / GRID_SIZE);
    const row = Math.floor((y - rect.top) / GRID_SIZE);
    
    return {
      col: Math.max(0, Math.min(col, GRID_COLS - 1)),
      row: Math.max(0, Math.min(row, GRID_ROWS - 1))
    };
  };

  const canPlaceItem = (item, col, row) => {
    // Verificar que el item quepa dentro del grid
    if (col + item.width > GRID_COLS || row + item.height > GRID_ROWS) {
      return false;
    }

    // Verificar colisiones con otros items
    for (let r = row; r < row + item.height; r++) {
      for (let c = col; c < col + item.width; c++) {
        const key = `${r}-${c}`;
        if (gridItems[key]) {
          return false;
        }
      }
    }

    return true;
  };

  const placeItem = (item, col, row) => {
    if (!canPlaceItem(item, col, row)) return false;

    const newGridItems = { ...gridItems };
    const placedItem = { ...item, col, row, id: Date.now() };

    // Marcar todas las celdas ocupadas por el item
    for (let r = row; r < row + item.height; r++) {
      for (let c = col; c < col + item.width; c++) {
        const key = `${r}-${c}`;
        newGridItems[key] = placedItem;
      }
    }

    setGridItems(newGridItems);
    setAvailableItems(prev => prev.filter(i => i.id !== item.id));
    return true;
  };

  const removeItem = (itemToRemove) => {
    const newGridItems = { ...gridItems };
    
    // Remover el item del grid
    Object.keys(newGridItems).forEach(key => {
      if (newGridItems[key]?.id === itemToRemove.id) {
        delete newGridItems[key];
      }
    });

    setGridItems(newGridItems);
    setAvailableItems(prev => [...prev, {
      ...itemToRemove,
      id: itemToRemove.originalId || itemToRemove.id
    }]);
  };

  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  const handleDragMove = useCallback((e) => {
    if (!draggedItem) return;
    
    setDragPreview({
      x: e.clientX - 16,
      y: e.clientY - 16,
      visible: true
    });
  }, [draggedItem]);

  const handleDrop = (e) => {
    if (!draggedItem) return;

    const { col, row } = getGridPosition(e.clientX, e.clientY);
    
    if (canPlaceItem(draggedItem, col, row)) {
      placeItem(draggedItem, col, row);
    }

    setDraggedItem(null);
    setDragPreview({ x: 0, y: 0, visible: false });
  };

  const renderGrid = () => {
    const cells = [];
    const renderedItems = new Set();

    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        const key = `${row}-${col}`;
        const item = gridItems[key];
        
        if (item && !renderedItems.has(item.id)) {
          renderedItems.add(item.id);
          cells.push(
            <div
              key={`item-${item.id}`}
              className="absolute cursor-pointer hover:brightness-110 transition-all"
              style={{
                left: col * GRID_SIZE,
                top: row * GRID_SIZE,
                width: item.width * GRID_SIZE,
                height: item.height * GRID_SIZE,
                zIndex: 10
              }}
              onClick={() => removeItem(item)}
            >
              <div 
                className={`w-full h-full rounded border-2 border-yellow-400 shadow-lg ${item.color} flex items-center justify-center text-white font-bold text-sm overflow-hidden`}
                style={{
                  backgroundImage: item.pattern ? 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.1) 4px, rgba(255,255,255,0.1) 8px)' : 'none'
                }}
              >
                <span className="drop-shadow-md">{item.name}</span>
              </div>
            </div>
          );
        }
        
        cells.push(
          <GridSlot
            key={key}
            row={row}
            col={col}
            size={GRID_SIZE}
            isOccupied={!!item}
            canPlace={draggedItem ? canPlaceItem(draggedItem, col, row) : false}
            isDragging={!!draggedItem}
          />
        );
      }
    }

    return cells;
  };

  return (
    <div 
      className="flex flex-col lg:flex-row gap-4 p-4 bg-gray-900 min-h-screen"
      onMouseMove={handleDragMove}
      onMouseUp={handleDrop}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDrop}
      style={{ userSelect: 'none' }}
    >
      {/* Panel de inventario - Diseño móvil primero */}
      <Card className="bg-gray-800 border-yellow-600 border-2 shadow-xl flex-1 max-w-md mx-auto lg:max-w-none">
        <div className="p-3">
          <h2 className="text-yellow-400 text-lg lg:text-xl font-bold mb-3 text-center border-b border-yellow-600 pb-2">
            INVENTORY GRID
          </h2>
          <div 
            ref={gridRef}
            className="relative bg-gray-700 border-2 border-gray-600 rounded mx-auto"
            style={{
              width: GRID_COLS * GRID_SIZE,
              height: GRID_ROWS * GRID_SIZE
            }}
            onMouseUp={handleDrop}
            onTouchEnd={handleDrop}
          >
            {renderGrid()}
          </div>
          <div className="mt-3 text-center">
            <p className="text-gray-400 text-xs lg:text-sm">
              Items: {Object.keys(gridItems).length > 0 ? 
                [...new Set(Object.values(gridItems).map(i => i?.id))].length : 0}/{Math.floor((GRID_COLS * GRID_ROWS) / 2)}
            </p>
          </div>
        </div>
      </Card>

      {/* Panel de items disponibles - Compacto para móvil */}
      <Card className="bg-gray-800 border-yellow-600 border-2 shadow-xl lg:w-80 max-w-md mx-auto lg:max-w-none">
        <div className="p-3">
          <h2 className="text-yellow-400 text-lg lg:text-xl font-bold mb-3 text-center border-b border-yellow-600 pb-2">
            ITEMS
          </h2>
          <div className="grid grid-cols-6 lg:grid-cols-4 gap-2 max-h-[300px] lg:max-h-[500px] overflow-y-auto">
            {availableItems.slice(0, 12).map(item => (
              <InventoryItem
                key={item.id}
                item={item}
                onDragStart={handleDragStart}
                isDragging={draggedItem?.id === item.id}
                isMobile={true}
              />
            ))}
          </div>
          {availableItems.length === 0 && (
            <p className="text-gray-500 text-center text-xs lg:text-sm mt-4">
              No hay items
            </p>
          )}
          {availableItems.length > 12 && (
            <p className="text-yellow-400 text-center text-xs mt-2">
              +{availableItems.length - 12} items más
            </p>
          )}
        </div>
      </Card>

      {/* Vista previa del item siendo arrastrado */}
      {dragPreview.visible && draggedItem && (
        <div
          className="fixed pointer-events-none z-50 opacity-70"
          style={{
            left: dragPreview.x,
            top: dragPreview.y,
            width: draggedItem.width * 24,
            height: draggedItem.height * 24
          }}
        >
          <div className={`w-full h-full rounded border-2 border-yellow-400 ${draggedItem.color} flex items-center justify-center text-white font-bold text-xs`}>
            {draggedItem.name}
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPanel;