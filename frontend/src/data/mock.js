// Sistema de niveles progresivos tipo Candy Crush - Balanceados
export const gamelevels = [
  // Nivel 1 - Tutorial básico (36 total - 2 obstáculos = 34 espacios libres)
  {
    id: 1,
    title: "Primer Día", 
    description: "Aprende lo básico del inventario",
    gridCols: 6,
    gridRows: 6,
    objective: "Llena todo el espacio disponible",
    obstaclesFixed: [
      { row: 2, col: 2, type: 'block', name: 'Muro' },
      { row: 3, col: 3, type: 'block', name: 'Muro' }
    ],
    availableItems: [
      // Menos items 1x1, más formas complejas - 34 espacios necesarios
      { id: 101, name: 'Pistol', shape: [[0,0], [1,0]], rotatable: true }, // 2
      { id: 102, name: 'Rifle', shape: [[0,0], [1,0], [2,0]], rotatable: true }, // 3
      { id: 103, name: 'L-Tool', shape: [[0,0], [0,1], [1,0]], rotatable: true }, // 3
      { id: 104, name: 'Case', shape: [[0,0], [1,0], [0,1], [1,1]], rotatable: false }, // 4
      { id: 105, name: 'Pills', shape: [[0,0], [1,0]], rotatable: true }, // 2
      { id: 106, name: 'Aid Kit', shape: [[0,0], [1,0]], rotatable: true }, // 2
      { id: 107, name: 'Battery', shape: [[0,0], [0,1]], rotatable: true }, // 2
      { id: 108, name: 'Scope', shape: [[0,0], [0,1]], rotatable: true }, // 2
      { id: 109, name: 'Wire', shape: [[0,0], [1,0], [2,0]], rotatable: true }, // 3
      { id: 110, name: 'T-Part', shape: [[0,0], [1,0], [2,0], [1,1]], rotatable: true }, // 4
      { id: 111, name: 'L-Case', shape: [[0,0], [0,1], [1,1]], rotatable: true }, // 3
      { id: 112, name: 'Key', shape: [[0,0]], rotatable: false }, // 1
      { id: 113, name: 'Card', shape: [[0,0]], rotatable: false }, // 1
      { id: 114, name: 'Gem', shape: [[0,0]], rotatable: false }, // 1
      { id: 115, name: 'Med', shape: [[0,0]], rotatable: false }, // 1
      { id: 116, name: 'Long', shape: [[0,0], [1,0], [2,0], [3,0]], rotatable: true } // 4
      // Total: 38 espacios (4 extras) - Solo 4 items de 1x1
    ],
    stars: 1
  },

  // Nivel 2 - Formas rectangulares (36 total - 3 obstáculos = 33 espacios libres)  
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
      // Más desafiante - solo 2 items de 1x1
      { id: 201, name: 'L-Gun', shape: [[0,0], [0,1], [1,0]], rotatable: true }, // 3
      { id: 202, name: 'L-Case', shape: [[0,0], [0,1], [0,2], [1,0]], rotatable: true }, // 4
      { id: 203, name: 'T-Tool', shape: [[0,0], [1,0], [2,0], [1,1]], rotatable: true }, // 4
      { id: 204, name: 'Rifle', shape: [[0,0], [1,0], [2,0]], rotatable: true }, // 3
      { id: 205, name: 'Case', shape: [[0,0], [1,0], [0,1], [1,1]], rotatable: false }, // 4
      { id: 206, name: 'Pills', shape: [[0,0], [1,0]], rotatable: true }, // 2
      { id: 207, name: 'Aid Kit', shape: [[0,0], [1,0]], rotatable: true }, // 2
      { id: 208, name: 'Battery', shape: [[0,0], [0,1]], rotatable: true }, // 2
      { id: 209, name: 'Scope', shape: [[0,0], [0,1]], rotatable: true }, // 2
      { id: 210, name: 'Wire', shape: [[0,0], [1,0], [2,0]], rotatable: true }, // 3
      { id: 211, name: 'Z-Part', shape: [[0,0], [1,0], [1,1], [2,1]], rotatable: true }, // 4
      { id: 212, name: 'Key', shape: [[0,0]], rotatable: false }, // 1
      { id: 213, name: 'Gem', shape: [[0,0]], rotatable: false } // 1
      // Total: 36 espacios (3 extras) - Solo 2 items de 1x1
    ],
    stars: 1
  },

  // Nivel 3 - Formas L (42 total - 5 obstáculos = 37 espacios libres)
  {
    id: 3,
    title: "Primer Encuentro", 
    description: "Aparecen formas complejas",
    gridCols: 7,
    gridRows: 6,
    objective: "Acomoda el equipo en L",
    obstaclesFixed: [
      { row: 0, col: 0, type: 'fixed', name: 'Rifle', shape: [[0,0], [1,0], [2,0]] }, // 3 espacios
      { row: 5, col: 4, type: 'block', name: 'Debris' },
      { row: 5, col: 5, type: 'block', name: 'Debris' }
    ],
    availableItems: [
      // 37 espacios necesarios
      { id: 301, name: 'L-Gun', shape: [[0,0], [0,1], [1,1]], rotatable: true }, // 3
      { id: 302, name: 'L-Tool', shape: [[0,0], [0,1], [1,0]], rotatable: true }, // 3
      { id: 303, name: 'L-Case', shape: [[0,0], [0,1], [0,2], [1,2]], rotatable: true }, // 4
      { id: 304, name: 'Aid Kit', shape: [[0,0], [1,0]], rotatable: true }, // 2
      { id: 305, name: 'Pills', shape: [[0,0], [1,0]], rotatable: true }, // 2
      { id: 306, name: 'Pistol', shape: [[0,0], [1,0]], rotatable: true }, // 2
      { id: 307, name: 'Card', shape: [[0,0]], rotatable: false }, // 1
      { id: 308, name: 'Key', shape: [[0,0]], rotatable: false }, // 1
      { id: 309, name: 'Ammo', shape: [[0,0]], rotatable: false }, // 1
      { id: 310, name: 'Battery', shape: [[0,0], [1,0]], rotatable: true }, // 2
      { id: 311, name: 'Scope', shape: [[0,0], [0,1]], rotatable: true }, // 2
      { id: 312, name: 'Case', shape: [[0,0], [1,0], [2,0]], rotatable: true }, // 3
      { id: 313, name: 'Box', shape: [[0,0], [1,0], [0,1], [1,1]], rotatable: false }, // 4
      { id: 314, name: 'Part', shape: [[0,0], [1,0]], rotatable: true }, // 2
      { id: 315, name: 'Wire', shape: [[0,0], [0,1]], rotatable: true }, // 2
      { id: 316, name: 'Med1', shape: [[0,0]], rotatable: false }, // 1
      { id: 317, name: 'Med2', shape: [[0,0]], rotatable: false }, // 1
      { id: 318, name: 'Gem', shape: [[0,0]], rotatable: false }, // 1
      { id: 319, name: 'Herb', shape: [[0,0]], rotatable: false }, // 1
      { id: 320, name: 'Small', shape: [[0,0]], rotatable: false } // 1
      // Total: 40 espacios (3 extras)
    ],
    stars: 1
  },

  // Nivel 4 - Laboratorio (48 total - 6 obstáculos = 42 espacios libres)
  {
    id: 4,
    title: "Laboratorio",
    description: "El espacio se reduce", 
    gridCols: 8,
    gridRows: 6,
    objective: "Laboratorio lleno de obstáculos",
    obstaclesFixed: [
      { row: 1, col: 1, type: 'block', name: 'Mesa' },
      { row: 1, col: 2, type: 'block', name: 'Mesa' },
      { row: 3, col: 4, type: 'block', name: 'Equipment' },
      { row: 3, col: 5, type: 'block', name: 'Equipment' },
      { row: 2, col: 6, type: 'fixed', name: 'T-Virus', shape: [[0,0]] } // 1 espacio
    ],
    availableItems: [
      // 42 espacios necesarios
      { id: 401, name: 'Knife', shape: [[0,0], [0,1]], rotatable: true }, // 2
      { id: 402, name: 'Syringe', shape: [[0,0], [1,0], [1,1]], rotatable: true }, // 3
      { id: 403, name: 'Sample', shape: [[0,0]], rotatable: false }, // 1
      { id: 404, name: 'Data', shape: [[0,0], [1,0]], rotatable: true }, // 2
      { id: 405, name: 'L-Beaker', shape: [[0,0], [0,1], [1,0]], rotatable: true }, // 3
      { id: 406, name: 'T-Sample', shape: [[0,0], [1,0], [2,0], [1,1]], rotatable: true }, // 4
      { id: 407, name: 'Case', shape: [[0,0], [1,0], [2,0]], rotatable: true }, // 3
      { id: 408, name: 'Pills', shape: [[0,0], [1,0]], rotatable: true }, // 2
      { id: 409, name: 'Aid Kit', shape: [[0,0], [1,0]], rotatable: true }, // 2
      { id: 410, name: 'Battery', shape: [[0,0], [1,0]], rotatable: true }, // 2
      { id: 411, name: 'Card', shape: [[0,0]], rotatable: false }, // 1
      { id: 412, name: 'Key', shape: [[0,0]], rotatable: false }, // 1
      { id: 413, name: 'Scope', shape: [[0,0], [0,1]], rotatable: true }, // 2
      { id: 414, name: 'Tool', shape: [[0,0], [0,1]], rotatable: true }, // 2
      { id: 415, name: 'Box', shape: [[0,0], [1,0], [0,1], [1,1]], rotatable: false }, // 4
      { id: 416, name: 'Wire', shape: [[0,0], [1,0], [2,0]], rotatable: true }, // 3
      { id: 417, name: 'Part', shape: [[0,0], [1,0]], rotatable: true }, // 2
      { id: 418, name: 'Med1', shape: [[0,0]], rotatable: false }, // 1
      { id: 419, name: 'Med2', shape: [[0,0]], rotatable: false }, // 1
      { id: 420, name: 'Gem', shape: [[0,0]], rotatable: false }, // 1
      { id: 421, name: 'Bit1', shape: [[0,0]], rotatable: false }, // 1
      { id: 422, name: 'Bit2', shape: [[0,0]], rotatable: false }, // 1
      { id: 423, name: 'Tiny', shape: [[0,0]], rotatable: false } // 1
      // Total: 46 espacios (4 extras)
    ],
    stars: 1
  },

  // Nivel 5 - Crisis (64 total - 8 obstáculos = 56 espacios libres)
  {
    id: 5,
    title: "Crisis",
    description: "Formas complejas bajo presión",
    gridCols: 8,
    gridRows: 8,
    objective: "Sobrevive con formas complejas", 
    obstaclesFixed: [
      { row: 2, col: 2, type: 'block', name: 'Wall' },
      { row: 2, col: 3, type: 'block', name: 'Wall' },
      { row: 2, col: 4, type: 'block', name: 'Wall' },
      { row: 5, col: 1, type: 'fixed', name: 'Case', shape: [[0,0], [1,0], [0,1], [1,1]] }, // 4 espacios
      { row: 6, col: 6, type: 'block', name: 'Rubble' }
    ],
    availableItems: [
      // 56 espacios necesarios + extras para opciones
      { id: 501, name: 'T-Piece', shape: [[0,0], [1,0], [2,0], [1,1]], rotatable: true }, // 4
      { id: 502, name: 'T-Tool', shape: [[0,0], [1,0], [2,0], [1,1]], rotatable: true }, // 4
      { id: 503, name: 'Z-Part', shape: [[0,0], [1,0], [1,1], [2,1]], rotatable: true }, // 4
      { id: 504, name: 'Z-Case', shape: [[0,0], [1,0], [1,1], [2,1]], rotatable: true }, // 4
      { id: 505, name: 'L-Gun', shape: [[0,0], [0,1], [0,2], [1,2]], rotatable: true }, // 4
      { id: 506, name: 'L-Box', shape: [[0,0], [0,1], [1,0]], rotatable: true }, // 3
      { id: 507, name: 'L-Tool', shape: [[0,0], [0,1], [1,1]], rotatable: true }, // 3
      { id: 508, name: 'Case', shape: [[0,0], [1,0], [2,0]], rotatable: true }, // 3
      { id: 509, name: 'Rifle', shape: [[0,0], [1,0], [2,0]], rotatable: true }, // 3
      { id: 510, name: 'Box', shape: [[0,0], [1,0], [0,1], [1,1]], rotatable: false }, // 4
      { id: 511, name: 'Aid Kit', shape: [[0,0], [1,0]], rotatable: true }, // 2
      { id: 512, name: 'Pills', shape: [[0,0], [1,0]], rotatable: true }, // 2
      { id: 513, name: 'Battery', shape: [[0,0], [1,0]], rotatable: true }, // 2
      { id: 514, name: 'Scope', shape: [[0,0], [0,1]], rotatable: true }, // 2
      { id: 515, name: 'Tool', shape: [[0,0], [0,1]], rotatable: true }, // 2
      { id: 516, name: 'Wire', shape: [[0,0], [1,0], [2,0]], rotatable: true }, // 3
      { id: 517, name: 'Part', shape: [[0,0], [1,0]], rotatable: true }, // 2
      { id: 518, name: 'Key', shape: [[0,0]], rotatable: false }, // 1
      { id: 519, name: 'Card', shape: [[0,0]], rotatable: false }, // 1
      { id: 520, name: 'Ammo', shape: [[0,0]], rotatable: false }, // 1
      { id: 521, name: 'Med1', shape: [[0,0]], rotatable: false }, // 1
      { id: 522, name: 'Med2', shape: [[0,0]], rotatable: false }, // 1
      { id: 523, name: 'Gem', shape: [[0,0]], rotatable: false }, // 1
      { id: 524, name: 'Bit1', shape: [[0,0]], rotatable: false }, // 1
      { id: 525, name: 'Bit2', shape: [[0,0]], rotatable: false }, // 1
      { id: 526, name: 'Tiny', shape: [[0,0]], rotatable: false } // 1
      // Total: 60 espacios (4 extras)
    ],
    stars: 1
  },

  // Nivel 6 - Escape Final (80 total - 8 obstáculos = 72 espacios libres)
  {
    id: 6,
    title: "Escape Final",
    description: "El inventario más complejo",
    gridCols: 10,
    gridRows: 8, 
    objective: "Organiza todo para escapar",
    obstaclesFixed: [
      { row: 0, col: 4, type: 'block', name: 'Exit Door' },
      { row: 1, col: 0, type: 'fixed', name: 'Rifle', shape: [[0,0], [1,0], [2,0]] }, // 3 espacios
      { row: 3, col: 3, type: 'block', name: 'Pillar' },
      { row: 3, col: 4, type: 'block', name: 'Pillar' },
      { row: 4, col: 3, type: 'block', name: 'Pillar' },
      { row: 4, col: 4, type: 'block', name: 'Pillar' },
      { row: 7, col: 8, type: 'fixed', name: 'Aid', shape: [[0,0], [1,0]] } // 2 espacios
    ],
    availableItems: [
      // 72 espacios necesarios + extras
      { id: 601, name: 'Shotgun', shape: [[0,0], [1,0], [2,0]], rotatable: true }, // 3
      { id: 602, name: 'L-Scope', shape: [[0,0], [0,1], [1,1]], rotatable: true }, // 3
      { id: 603, name: 'Z-Key', shape: [[0,0], [1,0], [1,1], [2,1]], rotatable: true }, // 4
      { id: 604, name: 'T-Kit', shape: [[0,0], [1,0], [2,0], [1,1]], rotatable: true }, // 4
      { id: 605, name: 'L-Case', shape: [[0,0], [0,1], [0,2], [1,2]], rotatable: true }, // 4
      { id: 606, name: 'Z-Tool', shape: [[0,0], [1,0], [1,1], [2,1]], rotatable: true }, // 4
      { id: 607, name: 'T-Box', shape: [[0,0], [1,0], [2,0], [1,1]], rotatable: true }, // 4
      { id: 608, name: 'L-Gun', shape: [[0,0], [0,1], [1,0]], rotatable: true }, // 3
      { id: 609, name: 'BigCase', shape: [[0,0], [1,0], [2,0], [0,1], [1,1], [2,1]], rotatable: true }, // 6
      { id: 610, name: 'LongRifle', shape: [[0,0], [1,0], [2,0], [3,0]], rotatable: true }, // 4
      { id: 611, name: 'Case1', shape: [[0,0], [1,0], [2,0]], rotatable: true }, // 3
      { id: 612, name: 'Case2', shape: [[0,0], [1,0], [2,0]], rotatable: true }, // 3
      { id: 613, name: 'Box1', shape: [[0,0], [1,0], [0,1], [1,1]], rotatable: false }, // 4
      { id: 614, name: 'Box2', shape: [[0,0], [1,0], [0,1], [1,1]], rotatable: false }, // 4
      { id: 615, name: 'Aid Kit', shape: [[0,0], [1,0]], rotatable: true }, // 2
      { id: 616, name: 'Pills', shape: [[0,0], [1,0]], rotatable: true }, // 2
      { id: 617, name: 'Battery1', shape: [[0,0], [1,0]], rotatable: true }, // 2
      { id: 618, name: 'Battery2', shape: [[0,0], [1,0]], rotatable: true }, // 2
      { id: 619, name: 'Scope1', shape: [[0,0], [0,1]], rotatable: true }, // 2
      { id: 620, name: 'Scope2', shape: [[0,0], [0,1]], rotatable: true }, // 2
      { id: 621, name: 'Tool1', shape: [[0,0], [0,1]], rotatable: true }, // 2
      { id: 622, name: 'Tool2', shape: [[0,0], [0,1]], rotatable: true }, // 2
      { id: 623, name: 'Wire', shape: [[0,0], [1,0], [2,0]], rotatable: true }, // 3
      { id: 624, name: 'Part1', shape: [[0,0], [1,0]], rotatable: true }, // 2
      { id: 625, name: 'Part2', shape: [[0,0], [1,0]], rotatable: true }, // 2
      { id: 626, name: 'Key', shape: [[0,0]], rotatable: false }, // 1
      { id: 627, name: 'Card', shape: [[0,0]], rotatable: false }, // 1
      { id: 628, name: 'Ammo', shape: [[0,0]], rotatable: false }, // 1
      { id: 629, name: 'Med', shape: [[0,0]], rotatable: false }, // 1
      { id: 630, name: 'Gem', shape: [[0,0]], rotatable: false } // 1
      // Total: 76 espacios (4 extras)
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