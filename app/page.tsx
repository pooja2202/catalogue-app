'use client'

import { useEffect,useState } from "react";
import { apiRequest } from "@/services/API";
import ProductCardPagination from "@/components/Card";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
    category: string;
}

interface APIProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}


const Home=() =>{

   const [products, setProducts] = useState<Product[]>([]);
   

   const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: APIProduct[] = await response.json();
        const mappedProducts: Product[] = data.map((apiProduct) => ({
          id: apiProduct.id,
          name: apiProduct.title,
          price: apiProduct.price,
          image: apiProduct.image,
          description: apiProduct.description,
          category:apiProduct.category
        }));
        setProducts(mappedProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

  useEffect(() => {
    fetchData();
  }, []);


  return (
   <>
    {products.length > 0 && <ProductCardPagination productsData={products} />}
   </>
  )
}


export default Home;

