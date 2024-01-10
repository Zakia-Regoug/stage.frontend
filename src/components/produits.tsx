import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProduitType from './ProduitType';

interface ProduitsProps {
  filters: { totalProduits: number; prixMinimum: number; prixMaximum: number };
}
const Produits = ({filters}:ProduitsProps) => {
  const [produits, setProduits] = useState<ProduitType[]>([]);

  const fetchProduits = async () => {
    const response = await axios.get<ProduitType[]>(
      'https://fakestoreapi.com/products?limit=12'
    );
    const filtered = response.data.filter(
      (product) => product.price >= filters.prixMinimum && product.price <= filters.prixMaximum
    );
    setProduits(filtered);
    
  };
  useEffect(() => {
    fetchProduits();
  }, []);

  if (!produits) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <div className="flex justify-end pr-12 pt-6">
        <form>
          <select className="px-2 border border-black text-black text-xl">
            <option>Trier par :</option>
            <option value="1">Prix croissant</option>
            <option value="2">Prix décroissant</option>
          </select>
        </form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-16">
        {produits.map(( produit) => (
          <div key={produit.id} className="flex flex-col space-y-2 bg-gray-50 p-4 drop-shadow-lg shadow-lg rounded-md">
            <li >
            <Link to={`/produit/${produit?.id}`}>
            <div className="text-xl h-32 text-gray-800 text-center font-extrabold">
              {produit.title}
            </div>
            <img
              src={produit.image}
              className="w-full h-56 object-contain rounded-md mb-4"
            />
            <div className="flex items-center justify-between">
              <div className="text-2xl text-orange-500 font-extrabold">
                {produit.price}€
              </div>
              <div className="text-md text-blue-800 font-extrabold">
                avis : {produit.rating.rate} / 5
              </div>
            </div>
            </Link>
            </li>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Produits;
