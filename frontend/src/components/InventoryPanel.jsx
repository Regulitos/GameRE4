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
  }, [currentLevelData.id]);

  const initializeLevel = () => {
    // Usar el nivel actual ya establecido
    setAvailableItems([...currentLevelData.availableItems]);
    
    // Inicializar grid con obstáculos fijos
    const initialGrid = {};
    if (currentLevelData.obstaclesFixed) {
      currentLevelData.obstaclesFixed.forEach(obstacle => {
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
    }
    
    console.log('Initializing level with obstacles:', currentLevelData.obstaclesFixed);
    console.log('Initial grid:', initialGrid);
    
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
    // No se pueden remover obstáculos o items fijos
    if (itemToRemove.isObstacle || itemToRemove.isFixed) {
      return;
    }

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

  const goToNextLevel = () => {
    const nextLevelId = currentLevelData.id + 1;
    const nextLevel = gamelevels.find(level => level.id === nextLevelId);
    
    if (nextLevel) {
      const preparedLevel = prepareGameLevel(nextLevel);
      setCurrentLevelData(preparedLevel);
      setShowCompletionModal(false);
      // initializeLevel se ejecutará automáticamente por el useEffect
    }
  };

  const restartLevel = () => {
    setShowCompletionModal(false);
    initializeLevel();
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
              className="absolute hover:brightness-110 transition-all"
              style={{
                left: item.col * GRID_SIZE,
                top: item.row * GRID_SIZE,
                width: bounds.width * GRID_SIZE,
                height: bounds.height * GRID_SIZE,
                zIndex: 10,
                cursor: item.isObstacle || item.isFixed ? 'not-allowed' : 'pointer'
              }}
              onClick={() => removeItem(item)}
            >
              <div 
                className={`relative w-full h-full rounded border-2 shadow-lg text-white font-bold text-sm overflow-hidden ${
                  item.isObstacle ? 'border-red-500 bg-gradient-to-br from-red-800 to-red-900' :
                  item.isFixed ? 'border-blue-500 bg-gradient-to-br from-blue-700 to-blue-800' :
                  'border-yellow-400 ' + (item.color || 'bg-gradient-to-br from-gray-600 to-gray-800')
                }`}
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
      <Card className="bg-black bg-opacity-80 border-yellow-600 border-2 shadow-2xl backdrop-blur-sm flex-1 max-w-md mx-auto lg:max-w-none">
        <div className="p-3" style={{
          backgroundImage: `linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)`,
        }}>
          {/* Información del nivel actual */}
          <div className="mb-3 text-center">
            <div className="flex justify-between items-center mb-2">
              <span className="text-yellow-400 font-bold">
                Nivel {currentLevelData.id}
              </span>
              <span className="text-yellow-300 text-xs">
                ⭐ {playerProgress.stars}
              </span>
            </div>
            <h3 className="text-yellow-300 font-semibold text-sm mb-1">
              {currentLevelData.title}
            </h3>
            <p className="text-gray-400 text-xs mb-2">
              {currentLevelData.description}
            </p>
            <div className="bg-gray-700 rounded px-2 py-1">
              <p className="text-yellow-200 text-xs font-medium">
                🎯 {currentLevelData.objective}
              </p>
            </div>
          </div>

          <h2 className="text-yellow-400 text-lg lg:text-xl font-bold mb-3 text-center border-b border-yellow-600 pb-2">
            GRID DE MISIÓN
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
      <Card className="bg-black bg-opacity-80 border-yellow-600 border-2 shadow-2xl backdrop-blur-sm lg:w-80 max-w-md mx-auto lg:max-w-none">
        <div className="p-3" style={{
          backgroundImage: `linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)`,
        }}>
          <h2 className="text-yellow-400 text-lg lg:text-xl font-bold mb-3 text-center border-b border-yellow-600 pb-2 drop-shadow-lg">
            ITEMS
          </h2>
          <div className="grid grid-cols-6 lg:grid-cols-4 gap-2 max-h-[300px] lg:max-h-[500px] overflow-y-auto">
            {/* Grid fijo de 24 posiciones (4 filas x 6 columnas) */}
            {Array.from({ length: 24 }, (_, index) => {
              const item = availableItems[index];
              return (
                <div key={`slot-${index}`} className="w-12 h-12 border border-gray-600 rounded flex items-center justify-center">
                  {item ? (
                    <InventoryItem
                      key={item.id}
                      item={item}
                      onDragStart={handleDragStart}
                      onItemRotate={handleItemRotate}
                      isDragging={draggedItem?.id === item.id}
                      isMobile={true}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 rounded opacity-50"></div>
                  )}
                </div>
              );
            })}
          </div>
          {availableItems.length === 0 && (
            <p className="text-gray-500 text-center text-xs lg:text-sm mt-4">
              ¡Nivel completado!
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

      {/* Modal de completar nivel */}
      {showCompletionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="bg-gray-800 border-yellow-600 border-2 p-6 max-w-sm mx-4">
            <div className="text-center">
              <h3 className="text-yellow-400 text-xl font-bold mb-2">
                ¡Nivel Completado!
              </h3>
              <p className="text-yellow-300 mb-1">
                {currentLevelData.title}
              </p>
              <div className="flex justify-center mb-4">
                <span className="text-yellow-400 text-2xl">⭐</span>
              </div>
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={restartLevel}
                  variant="outline"
                  className="bg-gray-700 text-yellow-400 border-yellow-600 hover:bg-yellow-600 hover:text-black"
                >
                  Reintentar
                </Button>
                {currentLevelData.id < gamelevels.length && (
                  <Button
                    onClick={goToNextLevel}
                    className="bg-yellow-600 text-black hover:bg-yellow-500"
                  >
                    Siguiente
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default InventoryPanel;