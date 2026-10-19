
import { ref } from 'vue'

export const items = ref([
  {
    id: 1,
    number: 'A-101',
    title: 'Насос не запускается',
    description: 'После запуска оборудование не выходит на рабочий режим.',
    pumpId: 2,
    status: 'New',
    createdAt: new Date().toLocaleString('ru-RU'),
  },
  {
    id: 2,
    number: 'A-102',
    title: 'Проверить вентиль',
    description: 'Необходимо проверить состояние вентиля.',
    pumpId: 1,
    status: 'InProgress',
    createdAt: new Date().toLocaleString('ru-RU'),
  },
])
