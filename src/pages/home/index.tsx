import FormulaireRecherche from '../../components/formulaire-recherche';
import Produits from '../../components/produits';
import { useState } from 'react';
const HomePage = () => {

  const [filters, setFilters] = useState({ totalProduits:12, prixMinimum: 10, prixMaximum: 1000});

  const handleSearch = (newFilters: { totalProduits: number; prixMinimum: number; prixMaximum: number }) => {
    // Mettre à jour les filtres lors de la recherche
    setFilters(newFilters);
  };
  return (
    <>
      <FormulaireRecherche onSearch={handleSearch}/>
      <Produits filters={filters}/>
    </>
  );
};

export default HomePage;
