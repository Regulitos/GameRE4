// Mock data para items del inventario con formas complejas y rotación
export const mockItems = [
  // Items rectangulares básicos (no se pueden rotar)
  {
    id: 1,
    name: 'Pistol',
    shape: [[0,0], [1,0]], // 2x1 horizontal
    rotatable: true,
    color: 'bg-gradient-to-br from-gray-600 to-gray-800',
    category: 'weapon',
    pattern: false,
    rotation: 0
  },
  {
    id: 2,
    name: 'Ammo',
    shape: [[0,0]], // 1x1
    rotatable: false,
    color: 'bg-gradient-to-br from-yellow-600 to-orange-700',
    category: 'ammo',
    pattern: false,
    rotation: 0
  },
  {
    id: 3,
    name: 'Herb',
    shape: [[0,0]], // 1x1
    rotatable: false,
    color: 'bg-gradient-to-br from-green-500 to-green-700',
    category: 'health',
    pattern: false,
    rotation: 0
  },
  {
    id: 4,
    name: 'Key',
    shape: [[0,0]], // 1x1
    rotatable: false,
    color: 'bg-gradient-to-br from-blue-500 to-blue-700',
    category: 'key',
    pattern: true,
    rotation: 0
  },
  {
    id: 5,
    name: 'L-Gun',
    shape: [[0,0], [0,1], [0,2], [1,2]], // Forma L
    rotatable: true,
    color: 'bg-gradient-to-br from-purple-600 to-purple-800',
    category: 'weapon',
    pattern: false,
    rotation: 0
  },
  {
    id: 6,
    name: 'Aid Kit',
    shape: [[0,0], [1,0]], // 2x1
    rotatable: true,
    color: 'bg-gradient-to-br from-red-500 to-red-700',
    category: 'health',
    pattern: true,
    rotation: 0
  },
  {
    id: 7,
    name: 'T-Item',
    shape: [[0,0], [1,0], [2,0], [1,1]], // Forma T
    rotatable: true,
    color: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
    category: 'special',
    pattern: true,
    rotation: 0
  },
  {
    id: 8,
    name: 'Rifle',
    shape: [[0,0], [1,0], [2,0]], // 3x1
    rotatable: true,
    color: 'bg-gradient-to-br from-gray-700 to-black',
    category: 'weapon',
    pattern: true,
    rotation: 0
  },
  {
    id: 9,
    name: 'Z-Part',
    shape: [[0,0], [1,0], [1,1], [2,1]], // Forma Z
    rotatable: true,
    color: 'bg-gradient-to-br from-orange-600 to-red-700',
    category: 'part',
    pattern: false,
    rotation: 0
  },
  {
    id: 10,
    name: 'Shells',
    shape: [[0,0], [0,1]], // 1x2 vertical
    rotatable: true,
    color: 'bg-gradient-to-br from-red-600 to-red-800',
    category: 'ammo',
    pattern: false,
    rotation: 0
  },
  {
    id: 11,
    name: 'Block',
    shape: [[0,0], [0,1], [1,0], [1,1]], // 2x2
    rotatable: false,
    color: 'bg-gradient-to-br from-indigo-600 to-indigo-800',
    category: 'block',
    pattern: true,
    rotation: 0
  },
  {
    id: 12,
    name: 'Case',
    shape: [[0,0], [1,0], [2,0], [0,1], [1,1], [2,1]], // 3x2
    rotatable: true,
    color: 'bg-gradient-to-br from-amber-800 to-amber-900',
    category: 'container',
    pattern: true,
    rotation: 0
  }
];

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