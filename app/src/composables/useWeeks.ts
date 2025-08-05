import { ref, computed } from 'vue'
import type { Week } from '@/types'

const API_BASE_URL = 'http://localhost:3000'

export const weeks = ref<Week[]>([])
export const weekIsLoading = ref(false)
export const weekError = ref<string | null>(null)

// Computed properties
export const currentWeek = computed(() => {
  return weeks.value.find((week) => week.isCurrentWeek) || null
})

export const getWeekById = (weekId: string) => {
  return weeks.value.find((week) => week.id === weekId) || null
}

// Week actions
export const fetchWeeks = async () => {
  console.log('Fetching weeks from API...')
  weekIsLoading.value = true
  weekError.value = null

  try {
    const response = await fetch(`${API_BASE_URL}/weeks`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const fetchedWeeks: Week[] = await response.json()
    weeks.value = fetchedWeeks

    return fetchedWeeks
  } catch (err) {
    weekError.value = err instanceof Error ? err.message : 'Failed to fetch weeks'
    console.error('Error fetching weeks:', err)
    throw err
  } finally {
    weekIsLoading.value = false
  }
}
