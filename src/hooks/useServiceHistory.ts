
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { fetchServiceHistory, createServiceEntry } from '@/services/api';
import { ServiceHistoryEntry } from '@/types';

export function useServiceHistory(carId?: number) {
  const [entries, setEntries] = useState<ServiceHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadServiceHistory = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchServiceHistory(carId);
        setEntries(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load service history';
        setError(errorMessage);
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadServiceHistory();
  }, [carId, toast]);

  const addServiceEntry = async (
    carId: number,
    entryData: Omit<ServiceHistoryEntry, 'id' | 'car_id' | 'created_at' | 'updated_at'>
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      const newEntry = await createServiceEntry(carId, entryData);
      setEntries(prev => [...prev, newEntry]);
      toast({
        title: 'Success',
        description: 'Service entry added successfully',
      });
      return newEntry;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add service entry';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { entries, isLoading, error, addServiceEntry };
}
