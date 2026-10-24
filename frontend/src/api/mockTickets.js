const delay = (ms = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms))

let tickets = [
  {
    id: 1,
    number: 'A-101',
    title: 'Проверка насоса',
    description: 'Требуется проверить работу насосного оборудования.',
    status: 'New',
    pumpId: 1,
    createdAt: '2026-10-18T10:00:00',
  },
  {
    id: 2,
    number: 'A-102',
    title: 'Посторонний шум',
    description: 'При работе насоса появился посторонний шум.',
    status: 'InProgress',
    pumpId: 2,
    createdAt: '2026-10-19T11:00:00',
  },
]

let nextId = 3

export async function mockGetTickets() {
  await delay()

  return {
    ok: true,
    status: 200,
    data: [...tickets],
  }
}

export async function mockCreateTicket(body) {
  await delay()

  if (!body.title || body.title.trim().length < 5) {
    return {
      ok: false,
      status: 400,
      data: { message: 'Проверьте поля формы.' },
    }
  }

  if (body.force500) {
    return {
      ok: false,
      status: 500,
      data: { message: 'Сервер не смог обработать запрос.' },
    }
  }

  const ticket = {
    id: nextId,
    number: `A-${100 + nextId}`,
    title: body.title.trim(),
    description: body.description?.trim() ?? '',
    status: 'New',
    pumpId: Number(body.pumpId),
    createdAt: new Date().toISOString(),
  }

  nextId += 1
  tickets.push(ticket)

  return {
    ok: true,
    status: 201,
    data: { ...ticket },
  }
}