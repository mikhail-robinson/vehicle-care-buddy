
export interface Car {
  id: number;
  plate: string;
  make: string;
  model: string;
  year: number;
  created_at: string;
  updated_at: string;
  service_history_entries?: ServiceHistoryEntry[];
}

export interface ServiceHistoryEntry {
  id: number;
  car_id: number;
  service_type: string;
  notes: string;
  serviced_at: string;
  mileage: number;
  created_at: string;
  updated_at: string;
}

export interface ApiError {
  error?: string;
  errors?: Record<string, string[]>;
}
