import { Button } from "@/components/ui/button";
import { SelectItem, SelectTrigger, SelectValue, Select, SelectContent } from "../../../components/ui/select";
import { Search } from "lucide-react";
export function OrderTableFilters () {
    return (
        <form className="flex items-center gap-2">
            <span className="text-sm font-semibold">Filtros:</span>
            <input placeholder="ID do pedido" className="h-8 w-auto" />
            <input placeholder="Nome do cliente" className="h-8 w-[320px]" />
            <Select defaultValue="all">
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

            <Button type="submit" variant="secondary" size="xs">
                <Search className="mr-2 h-4 w-4" />
                Filtrar resultados
            </Button>
            
            <Button type="button" variant="outline" size="xs">
                Limpar filtros
            </Button>
        </form>
    )
}