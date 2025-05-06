
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { fetchAllCars, fetchCarDetails } from '@/services/api';
import { Car } from '@/types';

export function useCarList() {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadCars = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchAllCars();
        setCars(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load cars';
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

    loadCars();
  }, [toast]);

  return { cars, isLoading, error, setCars };
}

export function useCarDetails(carId: number | null) {
  const [car, setCar] = useState<Car | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!carId) return;

    const loadCarDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchCarDetails(carId);
        setCar(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load car details';
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

    loadCarDetails();
  }, [carId, toast]);

  return { car, isLoading, error };
}
