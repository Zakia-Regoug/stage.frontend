import { useState } from 'react';
import toast from 'react-hot-toast';

interface FormulaireRechercheProps{
  onSearch: (filters: { totalProduits: number; prixMinimum: number; prixMaximum: number }) => void;
}

const FormulaireRecherche = ({ onSearch }: FormulaireRechercheProps) => {
  const [totalProduits, setTotalProduits] = useState(10);
  const [prixMinimum, setPrixMinimum] = useState(0);
  const [prixMaximum, setPrixMaximum] = useState(1000);
 
  

  const handleSearch = () => {
    // Appel de la fonction de recherche avec les filtres actuels
    onSearch({ totalProduits, prixMinimum, prixMaximum });
  };
  //verifier si la valeur saisie est inferieur a 0
  const handleChange = (event: any, setFunction :any) => {
    const newValue = parseInt(event.target.value);
    if (newValue > 0) {
      setFunction(newValue);
    } 
  };

  const handleKeyDownMax = (e: any) =>{
    if (e.key === 'Enter') {
      e.preventDefault();
      const max = parseInt(e.target.value);
      if (max >= prixMinimum) {
        setPrixMaximum(max);
      }else{
        toast.error('Le prix maximum ne peut pas être inférieur au prix minimum.', {
          duration: 9000,
        });
    
      }
    }
  }
  
  const handleKeyDownMin = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const min = parseInt(e.target.value);
      setPrixMinimum(min);
      // Si le prix maximum est inférieur au nouveau prix minimum
      if (prixMaximum < min) {
        toast.error("Le prix mimimum ne doit pas être superieur au prix maximum.",{
          duration:9000,
        });
      }
  };
}

  return (
    <div className="flex items-center bg-gray-100 text-gray-900 p-4">
      <form className="flex space-x-24 items-center justify-center flex-1" onSubmit={handleSearch}>
        <div className="flex space-x-4 items-center">
          <label className="font-lg font-bold" htmlFor="totalProduits">
            Nombre de produits :{' '}
          </label>
          <input
            value={totalProduits}
            id="totalProduits"
            className="h-8 rounded-md w-24 text-black text-xl font-semibold text-center"
            name="totalProduits"
            onChange={(e) => handleChange(e, setTotalProduits)}
            pattern="[0-9]*"
          />
        </div>
        <div className="flex space-x-20">
          <div className="flex space-x-1 items-center">
            <label className="font-lg font-bold" htmlFor="prixMinimum">
              Prix minimum
            </label>
            <button
              className="w-8 h-8 bg-orange-400 text-xl rounded-md font-extrabold"
              type="button"
              onClick={() => {
                if (prixMinimum - 10 >= 0) {
                  setPrixMinimum(prixMinimum - 10);
                }
              }}
            >
              -
            </button>
            <input
              id="prixMinimum"
              value={prixMinimum}
              className="h-8 rounded-md bg-white w-24 p-2 text-xl text-center"
              name="prixMinimum"
              pattern="[0-9]*"
              onKeyDown={handleKeyDownMin}
              onChange={(e) => handleChange(e, setPrixMinimum)}
              
            />
            <button
              className="w-8 h-8 bg-orange-500 text-xl rounded-md font-extrabold"
              type="button"
              onClick={() => setPrixMinimum(prixMinimum + 10)}
            >
              +
            </button>
          </div>

          {/* prix maximum */}
          <div className="flex space-x-1 items-center">
            <label className="font-lg font-bold" htmlFor="prixMaximum">
              Prix Maximum
            </label>
            <button
              className="w-8 h-8 bg-orange-400 text-2xl rounded-md font-extrabold"
              type="button"
              onClick={() => {
                if (prixMaximum - 10 >= 0 && prixMaximum - 10 > prixMinimum) {
                  setPrixMaximum(prixMaximum - 10);
                }
              }}
            >
              -
            </button>
            <input
              id="prixMaximum"
              value={prixMaximum}
              className="h-8 bg-white rounded-md w-24 p-2 text-xl text-center "
              name="prixMaximum"
              pattern="[0-9]*"
              onChange={(e) => handleChange(e, setPrixMaximum)}
              onKeyDown={handleKeyDownMax}
            />
            <button
              className="w-8 h-8 bg-orange-500 text-2xl rounded-md font-extrabold"
              type="button"
              onClick={() => setPrixMaximum(prixMaximum + 10)}
            >
              +
            </button>
          </div>
        </div>

        <input
          className="px-4 cursor-pointer font-bold py-1 text-white text-xl bg-green-600 rounded-lg"
          value="Rechercher"
          type="submit"
        />
      </form>
    </div>
  );
};

export default FormulaireRecherche;
