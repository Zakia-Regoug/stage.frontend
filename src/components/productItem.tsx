import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProduitType from './ProduitType';





const ProductItem = () => {
  const { produitId } = useParams();
  const [product, setProduct] = useState<ProduitType | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<ProduitType>(`https://fakestoreapi.com/products/${produitId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [produitId]);

  if (!product) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8 p-16">
        <div className="flex flex-col space-y-2 bg-gray-50 p-4 drop-shadow-lg shadow-lg rounded-md">
            <li key={product.id}>
            
            <div className="text-xl h-32 text-gray-800 text-center font-extrabold">
              {product.title}
            </div>
            <img
              src={product.image}
              className="w-full h-56 object-contain rounded-md mb-4"
            />
            <div className="flex items-center justify-between">
              <div className="text-2xl text-orange-500 font-extrabold">
                {product.price}€
              </div>
              <div className="text-md text-blue-800 font-extrabold">
                avis : {product.rating.rate} / 5
              </div>
            </div>
            
          </li>
            
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
