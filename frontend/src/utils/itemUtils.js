// Utilidades para manejar formas de items y rotaciones

// Rotar una forma 90 grados en sentido horario
export const rotateShape = (shape) => {
  return shape.map(([x, y]) => [y, -x]);
};

// Normalizar una forma para que todas las coordenadas sean positivas
export const normalizeShape = (shape) => {
  if (shape.length === 0) return shape;
  
  const minX = Math.min(...shape.map(([x, y]) => x));
  const minY = Math.min(...shape.map(([x, y]) => y));
  
  return shape.map(([x, y]) => [x - minX, y - minY]);
};

// Obtener el bounding box de una forma
export const getShapeBounds = (shape) => {
  if (shape.length === 0) return { width: 0, height: 0 };
  
  const xs = shape.map(([x, y]) => x);
  const ys = shape.map(([x, y]) => y);
  
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  
  return {
    width: maxX - minX + 1,
    height: maxY - minY + 1
  };
};

// Rotar un item (devuelve nuevo item con forma rotada)
export const rotateItem = (item) => {
  if (!item.rotatable) return item;
  
  let rotatedShape = rotateShape(item.shape);
  rotatedShape = normalizeShape(rotatedShape);
  
  return {
    ...item,
    shape: rotatedShape,
    rotation: (item.rotation + 90) % 360
  };
};

// Verificar si una forma se puede colocar en una posición específica del grid
export const canPlaceShape = (shape, col, row, gridItems, gridCols, gridRows) => {
  for (const [x, y] of shape) {
    const targetCol = col + x;
    const targetRow = row + y;
    
    // Verificar límites del grid
    if (targetCol < 0 || targetCol >= gridCols || targetRow < 0 || targetRow >= gridRows) {
      return false;
    }
    
    // Verificar colisiones con otros items
    const key = `${targetRow}-${targetCol}`;
    if (gridItems[key]) {
      return false;
    }
  }
  
  return true;
};

// Obtener todas las celdas ocupadas por una forma en una posición
export const getShapeCells = (shape, col, row) => {
  return shape.map(([x, y]) => ({
    col: col + x,
    row: row + y,
    key: `${row + y}-${col + x}`
  }));
};

// Verificar si dos formas se superponen
export const shapesOverlap = (shape1, col1, row1, shape2, col2, row2) => {
  const cells1 = new Set(getShapeCells(shape1, col1, row1).map(cell => cell.key));
  const cells2 = getShapeCells(shape2, col2, row2);
  
  return cells2.some(cell => cells1.has(cell.key));
};