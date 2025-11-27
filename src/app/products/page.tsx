'use client';
import { useState, useEffect } from 'react';
import useProductsService from '@/apiServices/useProductService';
import { errorMsg } from '@/services/customFn';
import NoData from '@/components/NoData';
import ProductGrid from '@/components/products/ProductGrid';
import { Product } from '@/types/product';
import ProductFilters from '@/components/products/ProductFilter';


export default function ProductsPage() {
  const { loading, getProducts } = useProductsService();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const fetchData = async () => {
    const data = await getProducts();
    if (!data) {
      errorMsg("Failed to load products");
      return;
    }
    setProducts(data.products);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const categories = ["all", ...new Set(products.map(p => p.category))];
  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: Product) => {
    console.log('Adding to cart:', product);
  };

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our amazing collection of products with great deals and discounts
        </p>
      </div>

      {/* Filters */}
      <ProductFilters
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        categories={categories}
        onSearchChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
        resultsCount={filteredProducts.length}
        totalCount={products.length}
      />

      {/* Products Grid */}
      <ProductGrid
        products={filteredProducts}
        loading={loading}
        onAddToCart={handleAddToCart}
      />

      {/* Empty State */}
      {!loading && filteredProducts.length === 0 && (
        <NoData message='No products found' />
      )}
    </div>
  );
}