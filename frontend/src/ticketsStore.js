import { ref } from 'vue'

export const items = ref([])

export const isLoading = ref(false)
export const errorMessage = ref('')

export async function loadItems(getTickets) {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const data = await getTickets()
    items.value = data
  } catch (error) {
    errorMessage.value = error.message || 'Не удалось загрузить заявки.'
  } finally {
    isLoading.value = false
  }
}