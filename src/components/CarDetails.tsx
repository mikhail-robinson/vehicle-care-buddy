
import { Car as CarType } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { format } from 'date-fns';
import { Car, Check, Wrench, Info } from 'lucide-react';

interface CarDetailsProps {
  car: CarType;
}

const CarDetails: React.FC<CarDetailsProps> = ({ car }) => {
  // Calculate next service based on last service record (simplified)
  const lastService = car.service_history_entries && car.service_history_entries.length > 0
    ? car.service_history_entries.sort((a, b) => 
        new Date(b.serviced_at).getTime() - new Date(a.serviced_at).getTime()
      )[0]
    : null;
    
  const lastServiceDate = lastService 
    ? new Date(lastService.serviced_at)
    : null;
    
  const daysSinceLastService = lastServiceDate
    ? Math.floor((new Date().getTime() - lastServiceDate.getTime()) / (1000 * 60 * 60 * 24))
    : null;
    
  // Simple maintenance status calculation based on days since last service  
  const getMaintenanceStatus = () => {
    if (!daysSinceLastService) return { status: 'Unknown', color: 'bg-gray-400', percentage: 0 };
    
    if (daysSinceLastService > 180) {
      return { status: 'Service Due', color: 'bg-red-500', percentage: 100 };
    } else if (daysSinceLastService > 150) {
      return { status: 'Service Soon', color: 'bg-yellow-500', percentage: 80 };
    } else {
      return { status: 'Good', color: 'bg-green-500', percentage: Math.min(daysSinceLastService / 180 * 100, 60) };
    }
  };
  
  const maintenanceStatus = getMaintenanceStatus();
  
  return (
    <div className="space-y-4 animate-fade-in">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center">
            <Car className="h-5 w-5 text-dashboard-accent mr-2" />
            <CardTitle>{car.year} {car.make} {car.model}</CardTitle>
          </div>
          <CardDescription>License Plate: {car.plate}</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Vehicle Details</h3>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Make:</span>
                  <span className="text-sm font-medium">{car.make}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Model:</span>
                  <span className="text-sm font-medium">{car.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Year:</span>
                  <span className="text-sm font-medium">{car.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">License Plate:</span>
                  <span className="text-sm font-medium">{car.plate}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Maintenance Status</h3>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Status:</span>
                  <span className={`text-sm font-medium ${
                    maintenanceStatus.status === 'Good' ? 'text-green-500' : 
                    maintenanceStatus.status === 'Service Soon' ? 'text-yellow-500' : 
                    maintenanceStatus.status === 'Service Due' ? 'text-red-500' : 'text-gray-500'
                  }`}>
                    {maintenanceStatus.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Last Service:</span>
                  <span className="text-sm font-medium">
                    {lastServiceDate ? format(lastServiceDate, 'MMM dd, yyyy') : 'No record'}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Service Interval:</span>
                    <span className="font-medium">{daysSinceLastService ?? '--'} days ago</span>
                  </div>
                  <Progress value={maintenanceStatus.percentage} className={maintenanceStatus.color} />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Service Records</h3>
              <span className="p-1.5 bg-blue-100 text-blue-600 rounded-full">
                <Info className="h-4 w-4" />
              </span>
            </div>
            <p className="text-3xl font-bold mb-2">
              {car.service_history_entries?.length || 0}
            </p>
            <p className="text-sm text-gray-500">Total service records</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Current Mileage</h3>
              <span className="p-1.5 bg-green-100 text-green-600 rounded-full">
                <Check className="h-4 w-4" />
              </span>
            </div>
            <p className="text-3xl font-bold mb-2">
              {lastService ? lastService.mileage.toLocaleString() : '--'}
            </p>
            <p className="text-sm text-gray-500">Last recorded mileage</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Next Service</h3>
              <span className="p-1.5 bg-purple-100 text-purple-600 rounded-full">
                <Wrench className="h-4 w-4" />
              </span>
            </div>
            <p className="text-3xl font-bold mb-2">
              {lastServiceDate ? format(new Date(lastServiceDate.getTime() + 180 * 24 * 60 * 60 * 1000), 'MMM yyyy') : '--'}
            </p>
            <p className="text-sm text-gray-500">Estimated next service</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CarDetails;
