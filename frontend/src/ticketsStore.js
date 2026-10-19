
import { ref } from 'vue'

export const items = ref([
  {
    id: 1,
    number: 'A-101',
    title: 'Насос не запускается',
    description: 'После включения насос не начинает работу.',
    pumpId: 1,
    status: 'New',
    createdAt: '18.10.2026, 10:00:00',
  },
  {
    id: 2,
    number: 'A-102',
    title: 'Повышенная вибрация',
    description: 'Во время работы насоса появилась сильная вибрация.',
    pumpId: 2,
    status: 'InProgress',
    createdAt: '18.10.2026, 11:30:00',
  },
])

let nextId = Math.max(0, ...items.value.map(item => item.id)) + 1

export function addItem(data) {
  const item = {
    id: nextId,
    number: `A-${100 + nextId}`,
    title: data.title,
    description: data.description,
    pumpId: data.pumpId,
    status: 'New',
    createdAt: new Date().toLocaleString('ru-RU'),
  }

  items.value.push(item)
  nextId += 1
}
