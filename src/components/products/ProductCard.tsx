import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Product } from '@/types/product';


interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const calculateDiscountedPrice = (price: number, discountPercentage?: number) => {
    if (!discountPercentage) return price;
    return price - (price * discountPercentage) / 100;
  };

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  const discountedPrice = calculateDiscountedPrice(product.price, product.discountPercentage);

  return (
    <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-45 object-cover cursor-pointer"
        />
        {product.discountPercentage && (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            -{product.discountPercentage}%
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          aria-label="like"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>

      <CardHeader className="pb-1">
        <CardTitle className="text-lg line-clamp-1">{product.title}</CardTitle>
        <CardDescription className="line-clamp-2">{product.description}</CardDescription>
      </CardHeader>

      <CardContent className="pb-1">
        {/* Rating */}
        {renderRating(product.rating)}

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xl font-bold text-green-600">
            ${discountedPrice.toFixed(2)}
          </span>
          {product.discountPercentage && (
            <span className="text-xs text-gray-500 line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="mt-2">
          <Badge variant={product.stock > 0 ? "default" : "destructive"}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </Badge>
        </div>

        {/* Category */}
        <Badge variant="outline" className="mt-2">
          {product.category}
        </Badge>
      </CardContent>

      <CardFooter>
        <Button 
          className="w-full" 
          disabled={product.stock === 0}
          onClick={() => onAddToCart(product)}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;