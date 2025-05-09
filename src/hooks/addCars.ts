import { createCar } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { Car } from "@/types";

export function useAddCar() {
    const [cars, setCars] = useState<Car[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const addCar = async (carData: Omit<Car, 'id' | 'created_at' | 'updated_at'>) => {
      try {
        setIsLoading(true);
        setError(null);
        const newCar = await createCar(carData);
        setCars([...cars, newCar]);
        toast({
          title: "Car added successfully",
          description: "Your car has been added to your list",
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to add car";
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    return { addCar, isLoading, error, cars };
}