import { useState } from 'react'
import { useCarList, useCarDetails } from '@/hooks/useCars'
import { useAddCar } from '@/hooks/addCars'
import { useServiceHistory } from '@/hooks/useServiceHistory'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { format } from 'date-fns'
import { Car, Settings, Wrench, Info } from 'lucide-react'
import CarDetails from '@/components/CarDetails'
import ServiceHistoryList from '@/components/ServiceHistoryList'
import ChatAssistant from '@/components/ChatAssistant'
import Layout from '@/components/Layout'
import { AddCarForm } from '@/components/AddCarForm'

const Dashboard = () => {
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const { cars, isLoading: carsLoading } = useCarList()
  const { car, isLoading: carDetailsLoading } = useCarDetails(selectedCarId)
  const { entries, isLoading: entriesLoading } =
    useServiceHistory(selectedCarId)

  const handleCarChange = (value: string) => {
    setSelectedCarId(Number(value))
  }

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Vehicle Dashboard
            </h1>
            <p className="text-gray-500">
              Monitor and manage your vehicle information
            </p>
          </div>

          <div className="w-full md:w-64 mt-4 md:mt-0">
            <Select
              value={selectedCarId?.toString() || ''}
              onValueChange={handleCarChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a vehicle" />
              </SelectTrigger>
              <SelectContent>
                {carsLoading ? (
                  <SelectItem value="loading">Loading cars...</SelectItem>
                ) : cars.length === 0 ? (
                  <SelectItem value="none">No vehicles found</SelectItem>
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

        {!selectedCarId ? (
          <Card className="border-2 border-dashed border-gray-200 p-8">
            <div className="text-center">
              <Car className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No vehicle selected
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Please select a vehicle from the dropdown above to view its
                details
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {carDetailsLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-[200px] w-full rounded-lg" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Skeleton className="h-[100px] rounded-lg" />
                  <Skeleton className="h-[100px] rounded-lg" />
                  <Skeleton className="h-[100px] rounded-lg" />
                </div>
              </div>
            ) : (
              <>
                {car && (
                  <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="service">Service History</TabsTrigger>
                      <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-4">
                      <CarDetails car={car} />
                    </TabsContent>

                    <TabsContent value="service" className="mt-4">
                      <ServiceHistoryList
                        entries={entries || []}
                        isLoading={entriesLoading}
                        carId={car.id}
                      />
                    </TabsContent>

                    <TabsContent value="assistant" className="mt-4">
                      <ChatAssistant car={car} />
                    </TabsContent>
                  </Tabs>
                )}
              </>
            )}
          </div>
        )}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Add a new car</CardTitle>
          <CardDescription>Add a new car to your list</CardDescription>
        </CardHeader>
        <CardContent>
          <AddCarForm />
        </CardContent>
      </Card>
    </Layout>
  )
}

export default Dashboard
