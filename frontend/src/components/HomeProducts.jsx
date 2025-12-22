import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/product/productSlice";
import { getBrands } from "../redux/brand/brandSlice";
import { getCategories } from "../redux/category/categorySlice";
import { Select, Input, Pagination } from "antd";
import { Link } from "react-router-dom";

const { Option } = Select;

const HomeProducts = () => {
  const dispatch = useDispatch();

  const { products = [] } = useSelector((state) => state.product);
  const { brands = [] } = useSelector((state) => state.brand);
  const { categories = [] } = useSelector((state) => state.category);

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);

  /* Pagination state */
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // per page products

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getBrands());
    dispatch(getCategories());
  }, [dispatch]);

  /* Brand change */
  const handleBrandChange = (brandId) => {
    setSelectedBrand(brandId);
    setSelectedCategory(null);
    setCurrentPage(1);

    if (brandId) {
      setFilteredCategories(
        categories.filter(
          (c) => c.brand?._id === brandId || c.brand === brandId
        )
      );
    } else {
      setFilteredCategories([]);
    }
  };

  /* Filter + Latest first */
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const brandMatch =
          !selectedBrand ||
          p.brand?._id === selectedBrand ||
          p.brand === selectedBrand;

        const categoryMatch =
          !selectedCategory ||
          p.category?._id === selectedCategory ||
          p.category === selectedCategory;

        const searchMatch =
          !searchText ||
          p.name.toLowerCase().includes(searchText.toLowerCase());

        return brandMatch && categoryMatch && searchMatch;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [products, selectedBrand, selectedCategory, searchText]);

  /* Pagination slice */
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-blue-700">
  Our <span className="text-gray-900">Products</span>
</h2>


      {/* 🔍 FILTER BAR */}
      <div className="flex flex-wrap gap-4 justify-end mb-8">
        <Select
          placeholder="Select Brand"
          allowClear
          style={{ width: 180 }}
          value={selectedBrand}
          onChange={handleBrandChange}
        >
          {brands.map((b) => (
            <Option key={b._id} value={b._id}>
              {b.name}
            </Option>
          ))}
        </Select>

        <Select
          placeholder="Select Category"
          allowClear
          style={{ width: 180 }}
          value={selectedCategory}
          onChange={(v) => {
            setSelectedCategory(v);
            setCurrentPage(1);
          }}
          disabled={!selectedBrand}
        >
          {(filteredCategories.length
            ? filteredCategories
            : categories
          ).map((c) => (
            <Option key={c._id} value={c._id}>
              {c.name}
            </Option>
          ))}
        </Select>

        <Input
          placeholder="Search product"
          style={{ width: 220 }}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* 🧱 PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((p) => (
            <div
              key={p._id}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <img
                src={p.productImage}
                alt={p.name}
                className="h-56 w-full object-contain bg-gray-100 p-4"
              />

              <div className="p-4 text-center">
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-blue-600 font-bold mt-1">
                  ${p.discountPrice || p.listPrice}
                </p>

                <Link
                  to={`/product/${p.slug}`}
                  className="inline-block mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found
          </p>
        )}
      </div>

      {/* 📄 PAGINATION */}
      {filteredProducts.length > pageSize && (
        <div className="flex justify-end mt-10">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredProducts.length}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
};

export default HomeProducts;
