import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const brands = [
  { name: 'Nike', logo: require('../assets/logos/nike.png') },
  { name: 'Adidas', logo: require('../assets/logos/adidas.png') },
  { name: 'Puma', logo: require('../assets/logos/puma.png') },
  { name: 'Reebok', logo: require('../assets/logos/reebok.png') },
  { name: 'Gucci', logo: require('../assets/logos/gucci.jpg') },
  { name: 'Levis', logo: require('../assets/logos/levis.jpg') },
];

const BrandSelection = () => {
  const navigate = useNavigate();

  const handleBrandClick = (brandName) => {
    navigate(`/brand/${brandName}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="flex items-center justify-center px-4 py-8 md:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl w-full">
          {brands.map((brand) => (
            <div
              key={brand.name}
              onClick={() => handleBrandClick(brand.name)}
              className="cursor-pointer bg-white p-4 sm:p-6 rounded-xl shadow hover:shadow-lg transition flex items-center justify-center"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-16 md:h-24 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandSelection;
