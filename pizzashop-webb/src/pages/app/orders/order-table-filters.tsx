import { Button } from "@/components/ui/button";
import { SelectItem, SelectTrigger, SelectValue, Select, SelectContent } from "../../../components/ui/select";
import { Search, X } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

const OrderFiltersSchema = z.object({
    orderId: z.string().optional(),
    customerName: z.string().optional(),
    status: z.string().optional(),
})

type OrderFiltersSchema = z.infer<typeof OrderFiltersSchema>

export function OrderTableFilters () {

        const [searchParams, setSearchParams] = useSearchParams()

        const orderId = searchParams.get('orderId')
        const customerName = searchParams.get('customerName')
        const status = searchParams.get('status')

        const { register, handleSubmit, control, reset } = useForm<OrderFiltersSchema>({
            resolver: zodResolver(OrderFiltersSchema),
            defaultValues: {
                orderId: orderId ?? '',
                customerName: customerName ?? '',
                status: status ?? 'all',
            },
        })

        function handleFilter({ orderId, customerName, status }: OrderFiltersSchema) {
            setSearchParams((state) => {
                if (orderId) {
                    state.set('orderId', orderId)
                } else {
                    state.delete('orderId')
                }

                if (customerName) {
                    state.set('customerName', customerName)
                } else {
                    state.delete('customerName')
                }

                if (status) {
                    state.set('status', status)
                } else {
                    state.delete('status')
                }
                state.set('page', '1')
                return state
            })

            reset({
                orderId: orderId ?? '',
                customerName: customerName ?? '',
                status: status ?? 'all',
            })
        }

        function handleClearFilters() {
            setSearchParams((state) => {
                state.delete('orderId')
                state.delete('customerName')
                state.delete('status')
                state.set('page', '1')
                return state
            })
        }

    return (
        <form onSubmit={handleSubmit(handleFilter)} className="flex items-center gap-2">
            <span className="text-sm font-semibold">Filtros:</span>
            <input placeholder="ID do pedido" className="h-8 w-auto" {...register("orderId")} />
            <input placeholder="Nome do cliente" className="h-8 w-[320px]" {...register("customerName")} />
            <Controller name="status" control={control} render={({ field: { onChange, value, name, disabled } }) => {
                return (
                    <Select defaultValue="all" onValueChange={onChange} disabled={disabled} name={name} value={value}>
                        <SelectTrigger className="h-8 w-[180px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos status</SelectItem>
                            <SelectItem value="pending">Pendente</SelectItem>
                            <SelectItem value="canceled">Cancelado</SelectItem>
                            <SelectItem value="processing">Em preparo</SelectItem>
                            <SelectItem value="delivering">Em entrega</SelectItem>
                            <SelectItem value="delivered">Entregue</SelectItem>
                        </SelectContent>
                    </Select>
                )
                }}
            />
            <Button type="submit" variant="secondary" size="xs">
                <Search className="mr-2 h-4 w-4" />
                Filtrar resultados
            </Button>

            <Button onClick={handleClearFilters} type="button" variant="outline" size="xs">
                <X className="mr-2 h-4 w-4" />
                Limpar filtros
            </Button>
        </form>
    )
}