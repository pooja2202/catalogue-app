'use client'

import { useEffect,useState } from "react";
import Button from "../components/Button";
import { apiRequest } from "@/services/API";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
    category: string;
}
interface ProductCardPaginationProps {
  productsData: Product[];
}

const ProductCardPagination = ({ productsData }: ProductCardPaginationProps) => {

    const categories = ["All", "electronics", "jewelery", "men's clothing","women's clothing"]; 
   const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 6;

  const handleCategoryChange = (category: string) => {
    setCurrentPage(1);
    setSelectedCategory(category);
  };

  const handleSortChange = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };


  const filteredProductsByCategory = selectedCategory !== 'All'
    ? productsData.filter((product) => product.category === selectedCategory)
    : productsData;

  const filteredProductsBySearch = searchTerm.length > 0
    ? filteredProductsByCategory.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredProductsByCategory;

  const sortedProducts = [...filteredProductsBySearch].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  
  return (
  
     <div className="container mx-auto p-4">
  <div className="flex flex-wrap gap-2 justify-center mb-4">
  {categories.map((category) => (
    <button
      key={category}
      onClick={() => handleCategoryChange(category)}
      className={`${
        selectedCategory === category
          ? 'bg-amber-400 text-black text-base min-w-4 w-40 min-h-10 h-10'
          : 'bg-zinc-200 text-black text-base min-w-4 w-40 min-h-10 h-10'
      }`}
    >
      {category}
    </button>
  ))}
</div>
 <div className="flex justify-center mt-4">
        <button onClick={handleSortChange} className="bg-zinc-200 text-black text-base min-w-4 w-40 min-h-10 h-10">
          {sortOrder === 'asc' ? 'Sort Price in Asc' : 'Sort Price in Desc'}
        </button>
      </div>
        <div className="flex justify-center mt-4">
        <input
          type="text"
          placeholder="Search by product name"
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {displayedProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-md shadow-md">
            <img src={product.image} alt={product.name} className="mb-2 w-full h-40 object-contain" />
            <h2 className="text-lg font-bold mb-2">{product.name}</h2>
            <p className="text-gray-700">${product.price}</p>
            <p className="text-gray-500 mt-2">{product.description}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
       <div className="pagination flex gap-2">
        <button onClick={prevPage} disabled={currentPage=== 1} className="bg-zinc-200 text-black text-base min-w-4 w-40 min-h-10 h-10">
          Prev
        </button>
        <button onClick={nextPage} disabled={indexOfLastItem >= productsData.length} className="bg-zinc-200 text-black text-base min-w-4 w-40 min-h-10 h-10">
          Next
        </button>
      </div>
      </div>
    </div>
  );
};

export default ProductCardPagination;