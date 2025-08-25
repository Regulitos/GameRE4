// Configuraciones de niveles
export const levelConfigs = {
  easy: {
    gridCols: 6,
    gridRows: 6,
    maxItems: 6,
    title: "Principiante",
    description: "Grid 6x6 - ¡Aprende lo básico!"
  },
  normal: {
    gridCols: 8,
    gridRows: 8,
    maxItems: 8,
    title: "Normal", 
    description: "Grid 8x8 - Desafío balanceado"
  },
  hard: {
    gridCols: 8,
    gridRows: 10,
    maxItems: 12,
    title: "Difícil",
    description: "Grid 8x10 - ¡Máximo desafío!"
  },
  expert: {
    gridCols: 12,
    gridRows: 15,
    maxItems: 18,
    title: "Experto",
    description: "Grid 12x15 - ¡Solo para maestros!"
  }
};

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

// Función para obtener items según el nivel
export const getItemsForLevel = (level) => {
  const config = levelConfigs[level];
  if (!config) return [];

  let availableItems = [];
  
  // Incluir items del nivel actual y anteriores
  switch(level) {
    case 'easy':
      availableItems = allItems.filter(item => item.level === 'easy');
      break;
    case 'normal':
      availableItems = allItems.filter(item => ['easy', 'normal'].includes(item.level));
      break;
    case 'hard':
      availableItems = allItems.filter(item => ['easy', 'normal', 'hard'].includes(item.level));
      break;
    case 'expert':
      availableItems = [...allItems];
      break;
    default:
      availableItems = allItems.filter(item => item.level === 'easy');
  }

  return availableItems.slice(0, config.maxItems);
};

// Exportar items por defecto (nivel fácil)
export const mockItems = getItemsForLevel('easy');

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