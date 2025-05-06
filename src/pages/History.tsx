
import { useState } from 'react';
import { useCarList } from '@/hooks/useCars';
import { useServiceHistory } from '@/hooks/useServiceHistory';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, Plus } from 'lucide-react';
import Layout from '@/components/Layout';
import ServiceHistoryList from '@/components/ServiceHistoryList';

const History = () => {
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const { cars, isLoading: carsLoading } = useCarList();
  const { entries, isLoading: entriesLoading } = useServiceHistory(selectedCarId);

  const handleCarChange = (value: string) => {
    setSelectedCarId(value ? Number(value) : null);
  };

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Service History</h1>
            <p className="text-gray-500">View and manage service records for your vehicles</p>
          </div>
          
          <div className="w-full md:w-64 mt-4 md:mt-0">
            <Select value={selectedCarId?.toString() || ""} onValueChange={handleCarChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by vehicle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All vehicles</SelectItem>
                {carsLoading ? (
                  <SelectItem value="loading">Loading cars...</SelectItem>
                ) : cars.length === 0 ? (
                  <SelectItem value="no-vehicles">No vehicles found</SelectItem>
                ) : (
                  cars.map((car) => (
                    <SelectItem key={car.id} value={car.id.toString()}>
                      {car.year} {car.make} {car.model} ({car.plate})
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-dashboard-accent mr-2" />
              <CardTitle>Service Records</CardTitle>
            </div>
            {selectedCarId && (
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                Add Service
              </Button>
            )}
          </CardHeader>
          <Separator />
          <CardContent className="p-0">
            <ServiceHistoryList 
              entries={entries || []} 
              isLoading={entriesLoading} 
              carId={selectedCarId || undefined} 
              showCarInfo={!selectedCarId}
            />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default History;
