
<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
})

const statusNames = {
  New: 'Новая',
  InProgress: 'В работе',
  Closed: 'Закрыта',
  Cancelled: 'Отменена',
}
</script>

<template>
  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>Номер</th>
          <th>Название</th>
          <th>Насос</th>
          <th>Статус</th>
          <th>Дата создания</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.number }}</td>
          <td>{{ item.title }}</td>
          <td>№ {{ item.pumpId }}</td>
          <td>
            <span class="status">
              {{ statusNames[item.status] || item.status }}
            </span>
          </td>
          <td>{{ item.createdAt }}</td>
        </tr>

        <tr v-if="items.length === 0">
          <td colspan="5" class="empty">
            Заявок пока нет
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrapper {
  overflow-x: auto;
  margin-top: 24px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

th,
td {
  padding: 14px 12px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

th {
  background: #eef3f8;
  color: #183153;
}

.status {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 6px;
  background: #e8eef7;
  color: #183153;
  white-space: nowrap;
}

.empty {
  text-align: center;
  color: #64748b;
  padding: 24px;
}
</style>
