import axios from "axios";
import { GetStaticProps } from "next";
import { ImageContainer, ProductContainer, ProductDetails } from "../styles/pages/product"
import Image from "next/image"
import { useState } from "react";
import {} from "../styles/pages/api/checkout"
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";

interface ProductProps {
    product: {
        id: string;
        name: string;
        imageUrl: string;
        price: string;
        description: string;
        defaultPriceId: string;
    }
}

export default function Product({ product }: ProductProps) {
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

    async function handleBuyProduct() {
        try {
            setIsCreatingCheckoutSession(true);
            const response = await axios.post('../styles/pages/api/checkout', {
                priceId: product.defaultPriceId,
            })

            const { checkoutUrl } = response.data;


            window.location.href = checkoutUrl;
        } catch (error) {
            setIsCreatingCheckoutSession(false);
            alert('Falha ao redirecionar para o checkout');
        }
    }

    return (
        <ProductContainer>
            <ImageContainer>
                <Image src={product.imageUrl} width={520} height={480} alt="" />
            </ImageContainer>
            <ProductDetails>
                <h1>{product.name}</h1>
                <span>{product.price}</span>
                <p>{product.description}</p>

                <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>Comprar agora</button>
            </ProductDetails>

            
        </ProductContainer>
    )
}

export const getStaticPaths = async () => {
    return {
        paths: [
            { params: { id: 'prod_SPHRAQzoBUjNXd' } },
        ],
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    if (!params || !params.id) {
        return {
            notFound: true,
        };
    }

    const productId = params.id;

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price'],
    });

    if (!product.default_price || typeof product.default_price !== 'object') {
        throw new Error('O produto não possui um preço padrão válido.');
    }

    const price = product.default_price as Stripe.Price;

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: price.unit_amount
                    ? new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                      }).format(Number(price.unit_amount) / 100)
                    : null,
                description: product.description,
                defaultPriceId: price.id,
            },
        },
        revalidate: 60 * 60 * 1, 
    };
};

