import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';


const BrandProducts = () => {
  const { brandName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        name: 'Air Max 270',
        price: 8999,
        image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e80d99b5-b5f7-49d7-8abc-c992b7d10a2f/W+AIR+MAX+270.png',
      },
      {
        id: 2,
        name: 'Adidas Ultraboost',
        price: 10999,
        image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/2f334171-7100-408e-b1cd-3001fcb77679/NIKE+CALM+FLIP+FLOP.png',
      },
      {
        id: 3,
        name: 'Puma Flyer Runner',
        price: 4499,
        image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_350,h_350/global/107779/01/sv01/fnd/IND/fmt/png/ULTRA-PLAY-TT-Youth-Football-Boots',
      },
      {
        id: 4,
        name: 'Reebok Classic',
        price: 5999,
        image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_350,h_350/global/404686/02/sv01/fnd/IND/fmt/png/X-Ray-2-Square-Women%E2%80%99s-Superior-Comfort-Sneakers',
      },
      {
        id: 5,
        name: 'Gucci Ace Sneakers',
        price: 69999,
        image: 'https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1603887603/456230_02JP0_9064_001_100_0000_Light.jpg',
      },
      {
        id: 6,
        name: 'Levi’s Denim Sneakers',
        price: 3499,
        image: 'https://levi.in/cdn/shop/files/879700159_02_Side_360x.jpg?v=1713513668',
      },
    ];

    setProducts(mockProducts);
  }, [brandName]);

  const formattedBrand =
    brandName.charAt(0).toUpperCase() + brandName.slice(1);

    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
    
        <div className="py-10 px-4 max-w-6xl mx-auto">
          {/* Header Text & Back Link */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-blue-700">
              {formattedBrand} Products
            </h2>
            <Link
              to="/dashboard"
              className="text-sm text-blue-600 hover:underline"
            >
              ← Back to Brands
            </Link>
          </div>
    
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-60 object-contain bg-gray-100"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    ₹{product.price.toLocaleString()}
                  </p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
    
          {/* No Products Message */}
          {products.length === 0 && (
            <p className="text-center text-gray-500 mt-12">
              No products found for {formattedBrand}.
            </p>
          )}
        </div>
      </div>
    );
    
};

export default BrandProducts;
