import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { gamelevels, getCurrentLevel, prepareGameLevel, completeLevel, getPlayerProgress } from '../data/mock';
import InventoryItem from './InventoryItem';
import GridSlot from './GridSlot';
import { rotateItem, canPlaceShape, getShapeCells, getShapeBounds } from '../utils/itemUtils';

const InventoryPanel = () => {
  const [currentLevelData, setCurrentLevelData] = useState(() => {
    return prepareGameLevel(getCurrentLevel());
  });
  const [playerProgress, setPlayerProgress] = useState(getPlayerProgress());
  const [gridItems, setGridItems] = useState({});
  const [availableItems, setAvailableItems] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragPreview, setDragPreview] = useState({ x: 0, y: 0, visible: false });
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const gridRef = useRef(null);

  const GRID_SIZE = 40;
  const GRID_COLS = currentLevelData.gridCols;
  const GRID_ROWS = currentLevelData.gridRows;

  // Inicializar nivel al cargar componente
  useEffect(() => {
    initializeLevel();
  }, []);

  const initializeLevel = () => {
    const levelData = prepareGameLevel(getCurrentLevel());
    setCurrentLevelData(levelData);
    setAvailableItems([...levelData.availableItems]);
    
    // Inicializar grid con obstáculos fijos
    const initialGrid = {};
    levelData.obstaclesFixed.forEach(obstacle => {
      if (obstacle.type === 'block') {
        // Obstáculos simples
        const key = `${obstacle.row}-${obstacle.col}`;
        initialGrid[key] = {
          id: `obstacle-${obstacle.row}-${obstacle.col}`,
          name: obstacle.name,
          isObstacle: true,
          col: obstacle.col,
          row: obstacle.row,
          shape: [[0,0]],
          color: 'bg-gradient-to-br from-red-800 to-red-900',
          removable: false
        };
      } else if (obstacle.type === 'fixed' && obstacle.shape) {
        // Items fijos con formas
        const cells = getShapeCells(obstacle.shape, obstacle.col, obstacle.row);
        cells.forEach(cell => {
          initialGrid[cell.key] = {
            id: `fixed-${obstacle.row}-${obstacle.col}`,
            name: obstacle.name,
            isFixed: true,
            col: obstacle.col,
            row: obstacle.row,
            shape: obstacle.shape,
            color: 'bg-gradient-to-br from-blue-700 to-blue-800',
            removable: false
          };
        });
      }
    });
    
    setGridItems(initialGrid);
  };

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
    return canPlaceShape(item.shape, col, row, gridItems, GRID_COLS, GRID_ROWS);
  };

  const placeItem = (item, col, row) => {
    if (!canPlaceItem(item, col, row)) return false;

    const newGridItems = { ...gridItems };
    const placedItem = { ...item, col, row, id: Date.now(), originalId: item.id };

    // Marcar todas las celdas ocupadas por la forma del item
    const cells = getShapeCells(item.shape, col, row);
    cells.forEach(cell => {
      newGridItems[cell.key] = placedItem;
    });

    setGridItems(newGridItems);
    setAvailableItems(prev => prev.filter(i => i.id !== item.id));
    
    // Verificar si el nivel está completo
    checkLevelCompletion(prev => prev.filter(i => i.id !== item.id));
    
    return true;
  };

  const checkLevelCompletion = (remainingItems) => {
    if (remainingItems.length === 0) {
      // ¡Nivel completado!
      setTimeout(() => {
        setShowCompletionModal(true);
        const newProgress = completeLevel(currentLevelData.id);
        setPlayerProgress(newProgress);
      }, 500);
    }
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

  const handleItemRotate = (item) => {
    const rotatedItem = rotateItem(item);
    setAvailableItems(prev => 
      prev.map(i => i.id === item.id ? rotatedItem : i)
    );
  };

  const handleLevelChange = (newLevel) => {
    setCurrentLevel(newLevel);
    setGridItems({});
    setAvailableItems(getItemsForLevel(newLevel));
    setDraggedItem(null);
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
          const bounds = getShapeBounds(item.shape);
          
          cells.push(
            <div
              key={`item-${item.id}`}
              className="absolute cursor-pointer hover:brightness-110 transition-all"
              style={{
                left: item.col * GRID_SIZE,
                top: item.row * GRID_SIZE,
                width: bounds.width * GRID_SIZE,
                height: bounds.height * GRID_SIZE,
                zIndex: 10
              }}
              onClick={() => removeItem(item)}
            >
              <div 
                className={`relative w-full h-full rounded border-2 border-yellow-400 shadow-lg ${item.color} text-white font-bold text-sm overflow-hidden`}
                style={{
                  backgroundImage: item.pattern ? 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.1) 4px, rgba(255,255,255,0.1) 8px)' : 'none'
                }}
              >
                {/* Imagen de fondo */}
                {item.image && (
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-60 rounded"
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                )}

                {/* Renderizar cada celda de la forma */}
                {item.shape.map(([x, y], index) => (
                  <div
                    key={index}
                    className="absolute border border-yellow-300"
                    style={{
                      left: x * GRID_SIZE,
                      top: y * GRID_SIZE,
                      width: GRID_SIZE,
                      height: GRID_SIZE,
                      backgroundColor: 'currentColor',
                      opacity: 0.7
                    }}
                  />
                ))}
                
                {/* Nombre del item centrado con mejor contraste */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="drop-shadow-lg text-center bg-black bg-opacity-60 rounded px-2 py-1">
                    {item.name}
                  </span>
                </div>

                {/* Indicador de que se puede rotar */}
                {item.rotatable && (
                  <div className="absolute top-1 right-1 w-4 h-4 bg-green-500 rounded-full text-xs flex items-center justify-center">
                    ↻
                  </div>
                )}
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
          {/* Selector de nivel */}
          <div className="mb-3">
            <div className="flex gap-1 justify-center mb-2">
              {Object.entries(levelConfigs).map(([level, config]) => (
                <Button
                  key={level}
                  variant={currentLevel === level ? "default" : "outline"}
                  size="sm"
                  className={`text-xs px-2 py-1 ${
                    currentLevel === level 
                      ? 'bg-yellow-600 text-black border-yellow-400' 
                      : 'bg-gray-700 text-yellow-400 border-yellow-600 hover:bg-yellow-600 hover:text-black'
                  }`}
                  onClick={() => handleLevelChange(level)}
                >
                  {config.title}
                </Button>
              ))}
            </div>
            <p className="text-yellow-300 text-center text-xs">
              {currentConfig.description}
            </p>
          </div>

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
                onItemRotate={handleItemRotate}
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
            width: getShapeBounds(draggedItem.shape).width * 24,
            height: getShapeBounds(draggedItem.shape).height * 24
          }}
        >
          <div className={`relative w-full h-full rounded border-2 border-yellow-400 ${draggedItem.color} text-white font-bold text-xs`}>
            {/* Renderizar forma en la vista previa */}
            {draggedItem.shape.map(([x, y], index) => (
              <div
                key={index}
                className="absolute border border-yellow-300"
                style={{
                  left: x * 24,
                  top: y * 24,
                  width: 24,
                  height: 24,
                  backgroundColor: 'currentColor',
                  opacity: 0.8
                }}
              />
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-center">{draggedItem.name}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPanel;