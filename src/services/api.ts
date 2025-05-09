import { Car, ServiceHistoryEntry, ApiError } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

// Debug log to verify which API URL is being used
console.log('Using API URL:', API_BASE_URL)

const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

export async function fetchAllCars(): Promise<Car[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/cars`, {
      headers: defaultHeaders,
    })
    if (!response.ok) {
      const errorData: ApiError = await response.json()
      throw new Error(errorData.error || 'Failed to fetch cars')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching cars:', error)
    throw error
  }
}

export async function fetchCarDetails(carId: number): Promise<Car> {
  try {
    const response = await fetch(`${API_BASE_URL}/cars/${carId}`, {
      headers: defaultHeaders,
    })
    if (!response.ok) {
      const errorData: ApiError = await response.json()
      throw new Error(errorData.error || 'Failed to fetch car details')
    }
    return await response.json()
  } catch (error) {
    console.error(`Error fetching car details for ID ${carId}:`, error)
    throw error
  }
}

export async function createCar(
  carData: Omit<Car, 'id' | 'created_at' | 'updated_at'>
): Promise<Car> {
  try {
    const response = await fetch(`${API_BASE_URL}/cars`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({ car: carData }),
    })
    if (!response.ok) {
      const errorData: ApiError = await response.json()
      throw new Error(errorData.error || 'Failed to create car')
    }
    return await response.json()
  } catch (error) {
    console.error('Error creating car:', error)
    throw error
  }
}

export async function fetchServiceHistory(
  carId?: number
): Promise<ServiceHistoryEntry[]> {
  try {
    const url = carId
      ? `${API_BASE_URL}/cars/${carId}/service_history_entries`
      : `${API_BASE_URL}/service_history_entries`

    const response = await fetch(url, {
      headers: defaultHeaders,
    })
    if (!response.ok) {
      const errorData: ApiError = await response.json()
      throw new Error(errorData.error || 'Failed to fetch service history')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching service history:', error)
    throw error
  }
}

export async function createServiceEntry(
  carId: number,
  entryData: Omit<
    ServiceHistoryEntry,
    'id' | 'car_id' | 'created_at' | 'updated_at'
  >
): Promise<ServiceHistoryEntry> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/cars/${carId}/service_history_entries`,
      {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({ service_history_entry: entryData }),
      }
    )
    if (!response.ok) {
      const errorData: ApiError = await response.json()
      throw new Error(errorData.error || 'Failed to create service entry')
    }
    return await response.json()
  } catch (error) {
    console.error('Error creating service entry:', error)
    throw error
  }
}

export async function fetchServiceEntryDetails(
  entryId: number
): Promise<ServiceHistoryEntry> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/service_history_entries/${entryId}`,
      {
        headers: defaultHeaders,
      }
    )
    if (!response.ok) {
      const errorData: ApiError = await response.json()
      throw new Error(
        errorData.error || 'Failed to fetch service entry details'
      )
    }
    return await response.json()
  } catch (error) {
    console.error(
      `Error fetching service entry details for ID ${entryId}:`,
      error
    )
    throw error
  }
}
