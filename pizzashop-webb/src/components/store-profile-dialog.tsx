import { getManagedRestaurant } from "@/api/get-managed-restaurant";
import { Button } from "./ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const StoreProfileSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(10).max(1000),
})

type StoreProfileSchema = z.infer<typeof StoreProfileSchema>

export function StoreProfileDialog() {
    const { data: managedRestaurant } = useQuery({
        queryKey: ['managed-restaurant'],
        queryFn: getManagedRestaurant,
    })

    const { register, handleSubmit } = useForm<StoreProfileSchema>({
            resolver: zodResolver(StoreProfileSchema),
            values: {
                name: managedRestaurant?.name ?? "",
                description: managedRestaurant?.description ?? "",
            },
        })


    return <DialogContent>
        <DialogHeader>
            <DialogTitle>Perfil da loja</DialogTitle>
            <DialogDescription>
                Atualize as informações do seu estabelecimento visíveis ao seu cliente.
            </DialogDescription>
        </DialogHeader>

        <form>

            <div className="space-y-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right" htmlFor="name">Nome</label>
                    <input className="col-span-3 border-1" id="name" {...register("name")} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right" htmlFor="description">Descrição</label>
                    <Textarea className="col-span-3" id="description" {...register("description")} />
                </div>     
            </div>
            
            <DialogFooter>
                <Button variant="ghost" type="button">Cancelar</Button>
                <Button type="submit" variant="success">Salvar</Button>
            </DialogFooter>
        </form>
    </DialogContent>
}