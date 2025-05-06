
import { useState } from 'react';
import { ServiceHistoryEntry } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from 'date-fns';
import { Eye, Clock } from 'lucide-react';
import { useCarList } from '@/hooks/useCars';

interface ServiceHistoryListProps {
  entries: ServiceHistoryEntry[];
  isLoading: boolean;
  carId?: number;
  showCarInfo?: boolean;
}

const ServiceHistoryList: React.FC<ServiceHistoryListProps> = ({ 
  entries, 
  isLoading, 
  carId,
  showCarInfo = false 
}) => {
  const [selectedEntry, setSelectedEntry] = useState<ServiceHistoryEntry | null>(null);
  const { cars } = useCarList();

  const getCarInfo = (carId: number) => {
    const car = cars.find(c => c.id === carId);
    return car ? `${car.year} ${car.make} ${car.model} (${car.plate})` : `Car #${carId}`;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">No service records</h3>
        <p className="mt-1 text-sm text-gray-500">
          {carId ? "This vehicle doesn't have any service records yet." : "No service records found."}
        </p>
        {carId && (
          <div className="mt-6">
            <Button>Add First Service Record</Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {showCarInfo && <TableHead>Vehicle</TableHead>}
              <TableHead>Service Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Mileage</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.id}>
                {showCarInfo && (
                  <TableCell className="font-medium">{getCarInfo(entry.car_id)}</TableCell>
                )}
                <TableCell className="font-medium">{entry.service_type}</TableCell>
                <TableCell>{format(new Date(entry.serviced_at), 'MMM dd, yyyy')}</TableCell>
                <TableCell>{entry.mileage.toLocaleString()}</TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setSelectedEntry(entry)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedEntry} onOpenChange={(open) => !open && setSelectedEntry(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Service Details</DialogTitle>
            <DialogDescription>
              Detailed information about this service record
            </DialogDescription>
          </DialogHeader>
          
          {selectedEntry && (
            <div className="space-y-4">
              {showCarInfo && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Vehicle</h3>
                  <p className="text-base">{getCarInfo(selectedEntry.car_id)}</p>
                </div>
              )}
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Service Type</h3>
                <p className="text-base">{selectedEntry.service_type}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Date</h3>
                <p className="text-base">{format(new Date(selectedEntry.serviced_at), 'MMMM dd, yyyy')}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Mileage</h3>
                <p className="text-base">{selectedEntry.mileage.toLocaleString()} miles</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                <p className="text-base whitespace-pre-wrap">{selectedEntry.notes}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServiceHistoryList;
