const generateRandomId = () => String(Math.floor(Math.random() * 9999) + 1)
const generateRandomStatus = () =>
  ['pending', 'active', 'completed'][Math.floor(Math.random() * 3)]

export const stops = [
  {
    id: generateRandomId(),
    title: 'Costa del Este 1',
    description: 'Parada en Costa del Este',
    address: 'PH Costa del Este 1',
    latitude: 8.977789,
    longitude: -79.644444,
    status: 'completed',
    holdTime: 3,
    students: [
      {
        id: generateRandomId(),
        name: 'Juan Pérez',
        description: 'Estudiante de informática',
        latitude: 8.977789,
        longitude: -79.644444,
        phone: '+507 666-6666',
        stopStatus: 'completed',
      },
      {
        id: generateRandomId(),
        name: 'María González',
        description: 'Estudiante de ingeniería',
        latitude: 8.977789,
        longitude: -79.644444,
        phone: '+507 555-5555',
        stopStatus: 'completed',
      },
      {
        id: generateRandomId(),
        name: 'Carlos Martínez',
        description: 'Estudiante de administración',
        latitude: 8.977789,
        longitude: -79.644444,
        phone: '+507 444-4444',
        stopStatus: 'completed',
      },
      {
        id: generateRandomId(),
        name: 'Ana López',
        description: 'Estudiante de comunicación',
        latitude: 8.977789,
        longitude: -79.644444,
        phone: '+507 333-3333',
        stopStatus: 'completed',
      },
    ],
  },
  {
    id: generateRandomId(),
    title: 'Costa del Este 2 Tower',
    description: 'Parada en Costa del Este',
    address: 'PH Costa del Este 2',
    latitude: 8.983333,
    longitude: -79.633333,
    status: 'active', // Added status field
    holdTime: 2,
    students: [
      {
        id: generateRandomId(),
        name: 'Pedro Rodríguez',
        description: 'Estudiante de marketing',
        latitude: 8.983333,
        longitude: -79.633333,
        phone: '+50722222222',
      },
      {
        id: generateRandomId(),
        name: 'Isabel Sánchez',
        description: 'Estudiante de diseño',
        latitude: 8.983333,
        longitude: -79.633333,
        phone: '+50711111111',
      },
    ],
  },
  {
    id: generateRandomId(),
    title: ' Costa del Este 3',
    description: 'Parada en Ciudad de Panamá',
    address: 'PH Costa del Este 3',
    latitude: 8.991944,
    longitude: -79.519444,
    status: 'pending', // Added status field
    holdTime: 5,
    students: [
      {
        id: generateRandomId(),
        name: 'David Torres',
        description: 'Estudiante de derecho',
        latitude: 8.991944,
        longitude: -79.519444,
        phone: '+507 777-7777',
      },
    ],
  },
  {
    id: generateRandomId(),
    title: ' Costa del Este 4',
    description: 'Parada en Ciudad de Panamá',
    address: 'PH Costa del Este 4',
    latitude: 8.991944,
    longitude: -79.519444,
    status: 'pending', // Added status field
    holdTime: 5,
    students: [
      {
        id: generateRandomId(),
        name: 'Ankush Mithral',
        description: 'Estudiante de derecho',
        latitude: 8.991944,
        longitude: -79.519444,
        phone: '+507 777-7777',
      },
      {
        id: generateRandomId(),
        name: 'Hina Mithral',
        description: 'Estudiante de medicina',
        latitude: 8.991944,
        longitude: -79.519444,
        phone: '+507 666-6666',
      },
      {
        id: generateRandomId(),
        name: 'Rajesh Kootrapalli',
        description: 'Estudiante de contabilidad',
        latitude: 8.991944,
        longitude: -79.519444,
        phone: '+507 555-5555',
      },
    ],
  },
]
