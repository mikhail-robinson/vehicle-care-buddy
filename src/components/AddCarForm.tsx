import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useAddCar } from '@/hooks/addCars'

const carFormSchema = z.object({
  plate: z.string().min(1, 'Plate number is required'),
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z
    .string()
    .min(4, 'Year must be 4 digits')
    .max(4, 'Year must be 4 digits')
    .refine((val) => !isNaN(Number(val)), 'Year must be a number')
    .refine(
      (val) => Number(val) >= 1900 && Number(val) <= new Date().getFullYear(),
      'Year must be between 1900 and current year'
    ),
})

type CarFormValues = z.infer<typeof carFormSchema>

export function AddCarForm() {
  const { addCar, isLoading: isAddingCar } = useAddCar()

  const form = useForm<CarFormValues>({
    resolver: zodResolver(carFormSchema),
    defaultValues: {
      plate: '',
      make: '',
      model: '',
      year: '',
    },
  })

  const onSubmit = async (data: CarFormValues) => {
    await addCar({
      plate: data.plate,
      make: data.make,
      model: data.model,
      year: Number(data.year),
    })
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="plate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>License Plate</FormLabel>
              <FormControl>
                <Input placeholder="Enter license plate" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="make"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Make</FormLabel>
              <FormControl>
                <Input placeholder="Enter make" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model</FormLabel>
              <FormControl>
                <Input placeholder="Enter model" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <FormControl>
                <Input placeholder="Enter year" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isAddingCar}>
          {isAddingCar ? 'Adding...' : 'Add Car'}
        </Button>
      </form>
    </Form>
  )
}
