// Sistema de niveles progresivos tipo Candy Crush
export const gamelevels = [
  // Nivel 1 - Tutorial básico
  {
    id: 1,
    title: "Primer Día",
    description: "Aprende lo básico del inventario",
    gridCols: 6,
    gridRows: 6,
    objective: "Coloca todos los items en el grid",
    obstaclesFixed: [
      // Algunos obstáculos en el centro
      { row: 2, col: 2, type: 'block', name: 'Muro' },
      { row: 3, col: 3, type: 'block', name: 'Muro' }
    ],
    availableItems: [
      { id: 101, name: 'Knife', shape: [[0,0]], rotatable: false },
      { id: 102, name: 'Herb', shape: [[0,0]], rotatable: false },
      { id: 103, name: 'Key', shape: [[0,0]], rotatable: false }
    ],
    stars: 1
  },

  // Nivel 2 - Introducir formas rectangulares
  {
    id: 2,
    title: "Día de Entrenamiento",
    description: "Items más grandes",
    gridCols: 6,
    gridRows: 6,
    objective: "Organiza el equipo básico",
    obstaclesFixed: [
      { row: 0, col: 2, type: 'block', name: 'Caja' },
      { row: 1, col: 2, type: 'block', name: 'Caja' },
      { row: 4, col: 4, type: 'block', name: 'Muro' }
    ],
    availableItems: [
      { id: 201, name: 'Pistol', shape: [[0,0], [1,0]], rotatable: true },
      { id: 202, name: 'Pills', shape: [[0,0], [1,0]], rotatable: true },
      { id: 203, name: 'Ammo', shape: [[0,0]], rotatable: false }
    ],
    stars: 1
  },

  // Nivel 3 - Formas L
  {
    id: 3,
    title: "Primer Encuentro",
    description: "Aparecen formas complejas",
    gridCols: 7,
    gridRows: 6,
    objective: "Acomoda el equipo en L",
    obstaclesFixed: [
      { row: 0, col: 0, type: 'fixed', name: 'Rifle', shape: [[0,0], [1,0], [2,0]] },
      { row: 5, col: 4, type: 'block', name: 'Debris' },
      { row: 5, col: 5, type: 'block', name: 'Debris' }
    ],
    availableItems: [
      { id: 301, name: 'L-Gun', shape: [[0,0], [0,1], [1,1]], rotatable: true },
      { id: 302, name: 'Aid Kit', shape: [[0,0], [1,0]], rotatable: true },
      { id: 303, name: 'Card', shape: [[0,0]], rotatable: false }
    ],
    stars: 1
  },

  // Nivel 4 - Más obstáculos
  {
    id: 4,
    title: "Laboratorio",
    description: "El espacio se reduce",
    gridCols: 8,
    gridRows: 6,
    objective: "Laboratorio lleno de obstáculos",
    obstaclesFixed: [
      // Crear un pasillo con obstáculos
      { row: 1, col: 1, type: 'block', name: 'Mesa' },
      { row: 1, col: 2, type: 'block', name: 'Mesa' },
      { row: 3, col: 4, type: 'block', name: 'Equipment' },
      { row: 3, col: 5, type: 'block', name: 'Equipment' },
      { row: 2, col: 6, type: 'fixed', name: 'T-Virus', shape: [[0,0]] }
    ],
    availableItems: [
      { id: 401, name: 'Knife', shape: [[0,0], [0,1]], rotatable: true },
      { id: 402, name: 'Syringe', shape: [[0,0], [1,0], [1,1]], rotatable: true },
      { id: 403, name: 'Sample', shape: [[0,0]], rotatable: false },
      { id: 404, name: 'Data', shape: [[0,0], [1,0]], rotatable: true }
    ],
    stars: 1
  },

  // Nivel 5 - Formas T y Z
  {
    id: 5,
    title: "Crisis",
    description: "Formas complejas bajo presión",
    gridCols: 8,
    gridRows: 8,
    objective: "Sobrevive con formas complejas",
    obstaclesFixed: [
      // Crear un patrón más complejo
      { row: 2, col: 2, type: 'block', name: 'Wall' },
      { row: 2, col: 3, type: 'block', name: 'Wall' },
      { row: 2, col: 4, type: 'block', name: 'Wall' },
      { row: 5, col: 1, type: 'fixed', name: 'Case', shape: [[0,0], [1,0], [0,1], [1,1]] },
      { row: 6, col: 6, type: 'block', name: 'Rubble' }
    ],
    availableItems: [
      { id: 501, name: 'T-Piece', shape: [[0,0], [1,0], [2,0], [1,1]], rotatable: true },
      { id: 502, name: 'Z-Part', shape: [[0,0], [1,0], [1,1], [2,1]], rotatable: true },
      { id: 503, name: 'Key', shape: [[0,0]], rotatable: false }
    ],
    stars: 1
  },

  // Nivel 6 - Desafío mayor
  {
    id: 6,
    title: "Escape Final",
    description: "El inventario más complejo",
    gridCols: 10,
    gridRows: 8,
    objective: "Organiza todo para escapar",
    obstaclesFixed: [
      // Patrón complejo de obstáculos
      { row: 0, col: 4, type: 'block', name: 'Exit Door' },
      { row: 1, col: 0, type: 'fixed', name: 'Rifle', shape: [[0,0], [1,0], [2,0]] },
      { row: 3, col: 3, type: 'block', name: 'Pillar' },
      { row: 3, col: 4, type: 'block', name: 'Pillar' },
      { row: 4, col: 3, type: 'block', name: 'Pillar' },
      { row: 4, col: 4, type: 'block', name: 'Pillar' },
      { row: 7, col: 8, type: 'fixed', name: 'Aid', shape: [[0,0], [1,0]] }
    ],
    availableItems: [
      { id: 601, name: 'Shotgun', shape: [[0,0], [1,0], [2,0]], rotatable: true },
      { id: 602, name: 'L-Scope', shape: [[0,0], [0,1], [1,1]], rotatable: true },
      { id: 603, name: 'Z-Key', shape: [[0,0], [1,0], [1,1], [2,1]], rotatable: true },
      { id: 604, name: 'Med Kit', shape: [[0,0], [1,0], [2,0], [1,1]], rotatable: true },
      { id: 605, name: 'Battery', shape: [[0,0]], rotatable: false }
    ],
    stars: 1
  }
];

// Items básicos para uso general
export const baseItems = [
  {
    name: 'Block',
    shape: [[0,0]],
    color: 'bg-gradient-to-br from-gray-800 to-black',
    image: null,
    category: 'obstacle'
  }
];

// Items con imágenes de Resident Evil
export const allItems = [
  // Nivel Fácil - Items simples
  {
    id: 1,
    name: 'Knife',
    shape: [[0,0], [0,1]], // 1x2 vertical
    rotatable: true,
    color: 'bg-gradient-to-br from-gray-600 to-gray-800',
    category: 'weapon',
    pattern: false,
    rotation: 0,
    image: 'https://images.unsplash.com/photo-1589648508211-fa8971fbeb12',
    level: 'easy'
  },
  {
    id: 2,
    name: 'Herb',
    shape: [[0,0]], // 1x1
    rotatable: false,
    color: 'bg-gradient-to-br from-green-500 to-green-700',
    category: 'health',
    pattern: false,
    rotation: 0,
    image: 'https://images.unsplash.com/photo-1605176173609-a0067079b419',
    level: 'easy'
  },
  {
    id: 3,
    name: 'Key',
    shape: [[0,0]], // 1x1
    rotatable: false,
    color: 'bg-gradient-to-br from-blue-500 to-blue-700',
    category: 'key',
    pattern: true,
    rotation: 0,
    image: 'https://images.unsplash.com/photo-1674009598613-6f8ce45351a4',
    level: 'easy'
  },
  {
    id: 4,
    name: 'Pills',
    shape: [[0,0], [1,0]], // 2x1
    rotatable: true,
    color: 'bg-gradient-to-br from-red-500 to-red-700',
    category: 'health',
    pattern: true,
    rotation: 0,
    image: 'https://images.pexels.com/photos/7723394/pexels-photo-7723394.jpeg',
    level: 'easy'
  },
  {
    id: 5,
    name: 'Ammo',
    shape: [[0,0]], // 1x1
    rotatable: false,
    color: 'bg-gradient-to-br from-yellow-600 to-orange-700',
    category: 'ammo',
    pattern: false,
    rotation: 0,
    image: 'https://images.unsplash.com/photo-1724140334358-663a798d4888',
    level: 'easy'
  },
  {
    id: 6,
    name: 'Card',
    shape: [[0,0], [1,0]], // 2x1
    rotatable: true,
    color: 'bg-gradient-to-br from-blue-400 to-blue-600',
    category: 'key',
    pattern: true,
    rotation: 0,
    image: 'https://images.pexels.com/photos/33578985/pexels-photo-33578985.jpeg',
    level: 'easy'
  },

  // Nivel Normal - Formas más complejas
  {
    id: 7,
    name: 'Pistol',
    shape: [[0,0], [0,1], [1,1]], // Forma L pequeña
    rotatable: true,
    color: 'bg-gradient-to-br from-gray-700 to-black',
    category: 'weapon',
    pattern: false,
    rotation: 0,
    image: 'https://images.unsplash.com/photo-1577081467890-d407baf6fc1f',
    level: 'normal'
  },
  {
    id: 8,
    name: 'Aid Kit',
    shape: [[0,0], [1,0], [1,1]], // Forma L
    rotatable: true,
    color: 'bg-gradient-to-br from-red-600 to-red-800',
    category: 'health',
    pattern: true,
    rotation: 0,
    image: 'https://images.unsplash.com/photo-1561328165-f0b762a9508e',
    level: 'normal'
  },

  // Nivel Difícil - Formas complejas
  {
    id: 9,
    name: 'Rifle',
    shape: [[0,0], [1,0], [2,0]], // 3x1
    rotatable: true,
    color: 'bg-gradient-to-br from-gray-800 to-black',
    category: 'weapon',
    pattern: true,
    rotation: 0,
    image: 'https://images.unsplash.com/photo-1632106280914-a491a201f226',
    level: 'hard'
  },
  {
    id: 10,
    name: 'T-Virus',
    shape: [[0,0], [1,0], [2,0], [1,1]], // Forma T
    rotatable: true,
    color: 'bg-gradient-to-br from-green-400 to-green-700',
    category: 'virus',
    pattern: true,
    rotation: 0,
    image: 'https://images.unsplash.com/photo-1732360106288-19ce099b2cbd',
    level: 'hard'
  },
  {
    id: 11,
    name: 'Z-Part',
    shape: [[0,0], [1,0], [1,1], [2,1]], // Forma Z
    rotatable: true,
    color: 'bg-gradient-to-br from-orange-600 to-red-700',
    category: 'part',
    pattern: false,
    rotation: 0,
    image: 'https://images.unsplash.com/photo-1565893181249-01ce9a9094aa',
    level: 'hard'
  },
  {
    id: 12,
    name: 'Case',
    shape: [[0,0], [1,0], [2,0], [0,1], [1,1], [2,1]], // 3x2
    rotatable: true,
    color: 'bg-gradient-to-br from-amber-800 to-amber-900',
    category: 'container',
    pattern: true,
    rotation: 0,
    image: 'https://images.unsplash.com/photo-1704656296628-794703d8a727',
    level: 'hard'
  }
];

// Función para obtener progreso del jugador
export const getPlayerProgress = () => {
  const saved = localStorage.getItem('puzzleInventoryProgress');
  return saved ? JSON.parse(saved) : { currentLevel: 1, completedLevels: [], stars: 0 };
};

// Función para guardar progreso
export const savePlayerProgress = (progress) => {
  localStorage.setItem('puzzleInventoryProgress', JSON.stringify(progress));
};

// Función para obtener nivel actual
export const getCurrentLevel = () => {
  const progress = getPlayerProgress();
  return gamelevels.find(level => level.id === progress.currentLevel) || gamelevels[0];
};

// Función para completar nivel
export const completeLevel = (levelId, stars = 1) => {
  const progress = getPlayerProgress();
  
  if (!progress.completedLevels.includes(levelId)) {
    progress.completedLevels.push(levelId);
    progress.stars += stars;
  }
  
  // Desbloquear siguiente nivel
  if (levelId === progress.currentLevel && levelId < gamelevels.length) {
    progress.currentLevel = levelId + 1;
  }
  
  savePlayerProgress(progress);
  return progress;
};

// Función para preparar items del nivel con imágenes
export const prepareGameLevel = (levelData) => {
  const itemImages = {
    'Knife': 'https://images.unsplash.com/photo-1589648508211-fa8971fbeb12',
    'Herb': 'https://images.unsplash.com/photo-1605176173609-a0067079b419',
    'Key': 'https://images.unsplash.com/photo-1674009598613-6f8ce45351a4',
    'Pistol': 'https://images.unsplash.com/photo-1577081467890-d407baf6fc1f',
    'Pills': 'https://images.pexels.com/photos/7723394/pexels-photo-7723394.jpeg',
    'Ammo': 'https://images.unsplash.com/photo-1724140334358-663a798d4888',
    'L-Gun': 'https://images.unsplash.com/photo-1632106280914-a491a201f226',
    'Aid Kit': 'https://images.unsplash.com/photo-1561328165-f0b762a9508e',
    'Card': 'https://images.pexels.com/photos/33578985/pexels-photo-33578985.jpeg',
    'Rifle': 'https://images.unsplash.com/photo-1577081467890-d407baf6fc1f',
    'T-Virus': 'https://images.unsplash.com/photo-1732360106288-19ce099b2cbd',
    'Case': 'https://images.unsplash.com/photo-1704656296628-794703d8a727'
  };

  return {
    ...levelData,
    availableItems: levelData.availableItems.map(item => ({
      ...item,
      color: 'bg-gradient-to-br from-gray-600 to-gray-800',
      image: itemImages[item.name] || null,
      pattern: false,
      rotation: 0
    }))
  };
};

// Items para nivel especial (grid grande)
export const specialLevelItems = [
  {
    id: 101,
    name: 'Briefcase',
    width: 4,
    height: 3,
    color: 'bg-gradient-to-br from-amber-800 to-amber-900',
    category: 'container',
    pattern: true
  },
  {
    id: 102,
    name: 'Document',
    width: 2,
    height: 3,
    color: 'bg-gradient-to-br from-amber-200 to-amber-400',
    category: 'document',
    pattern: true
  },
  {
    id: 103,
    name: 'Shotgun',
    width: 4,
    height: 1,
    color: 'bg-gradient-to-br from-amber-800 to-amber-900',
    category: 'weapon',
    pattern: false
  },
  // Más items grandes para nivel especial...
];