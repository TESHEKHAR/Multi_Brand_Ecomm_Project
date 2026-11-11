import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/product/productSlice";
import { getBrands } from "../redux/brand/brandSlice";
import { getCategories } from "../redux/category/categorySlice";
import { Select, Input, Pagination, ConfigProvider, theme } from "antd";
import { SearchOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";

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
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#f2b84b",
          colorBgContainer: "#0f1d19",
          colorBgElevated: "#12241f",
          colorBorder: "rgba(255,255,255,0.15)",
          colorText: "#f4ead0",
          colorTextPlaceholder: "#7f8c85",
          borderRadius: 10,
          controlHeight: 44,
        },
      }}
    >
      <section
        id="products"
        aria-labelledby="products-h"
        className="relative overflow-hidden bg-[#0a1311] px-[6vw] py-[90px] text-[#f4ead0]
          before:pointer-events-none before:absolute before:-right-40 before:top-10 before:h-[480px] before:w-[480px] before:bg-[radial-gradient(circle,rgba(242,184,75,.12),transparent_65%)] before:content-['']
          after:pointer-events-none after:absolute after:-bottom-40 after:-left-40 after:h-[480px] after:w-[480px] after:bg-[radial-gradient(circle,rgba(59,155,255,.12),transparent_65%)] after:content-['']"
      >
        <div className="relative z-10 mx-auto max-w-7xl">
          {/* ---------- HEADING ---------- */}
          <div className="mb-10 text-center">
            <Reveal
              as="p"
              className="text-xs font-bold uppercase tracking-[.3em] text-[#f2b84b]"
            >
              Our catalog
            </Reveal>

            <Reveal
              as="h2"
              delay={0.1}
              className="mt-3 text-[clamp(28px,4vw,46px)] font-extrabold leading-[1.1] tracking-[-.02em]"
            >
              <span id="products-h">
                Our{" "}
                <span className="bg-[linear-gradient(100deg,#f2b84b,#ffe3a0,#f2b84b)] bg-clip-text text-transparent">
                  Products
                </span>
              </span>
            </Reveal>

            <Reveal
              as="p"
              delay={0.2}
              className="mx-auto mt-4 max-w-[560px] text-base leading-relaxed text-[#b9c2b6]"
            >
              Browse products from trusted brands. Filter by brand and
              category, or search by name.
            </Reveal>
          </div>

          {/* ---------- FILTER BAR ---------- */}
          <Reveal className="mb-8">
            <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,.08),rgba(255,255,255,.02))] p-4 backdrop-blur-md md:flex-row md:items-center md:justify-between md:p-5">
              <p className="text-sm text-[#b9c2b6]">
                Showing{" "}
                <span className="font-bold text-[#f2b84b]">
                  {filteredProducts.length}
                </span>{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:w-auto">
                <Select
                  placeholder="Select Brand"
                  allowClear
                  className="w-full sm:w-[190px]"
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
                  className="w-full sm:w-[190px]"
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
                  allowClear
                  prefix={<SearchOutlined className="text-[#7f8c85]" />}
                  className="w-full sm:w-[220px]"
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>
          </Reveal>

          {/* ---------- PRODUCTS GRID ---------- */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((p, i) => {
                const hasDiscount =
                  p.discountPrice &&
                  p.listPrice &&
                  Number(p.discountPrice) < Number(p.listPrice);
                const off = hasDiscount
                  ? Math.round(
                      ((p.listPrice - p.discountPrice) / p.listPrice) * 100
                    )
                  : 0;

                return (
                  <Reveal key={p._id} delay={(i % 4) * 0.08} className="h-full">
                    <div className="group relative flex h-full flex-col overflow-hidden rounded-[18px] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,.09),rgba(255,255,255,.02))] shadow-[0_12px_34px_rgba(0,0,0,.45)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#f2b84b]/70 hover:shadow-[0_18px_44px_rgba(0,0,0,.6),0_0_30px_rgba(242,184,75,.2)]">
                      {/* image */}
                      <Link
                        to={`/product/${p.slug}`}
                        className="relative block overflow-hidden bg-[linear-gradient(160deg,#ffffff,#eef1ec)]"
                      >
                        {hasDiscount && (
                          <span className="absolute left-3 top-3 z-10 rounded-full bg-[#f2b84b] px-2.5 py-1 text-[11px] font-black text-[#0a1311] shadow-md">
                            {off}% OFF
                          </span>
                        )}
                        <img
                          src={p.productImage}
                          alt={p.name}
                          loading="lazy"
                          className="h-56 w-full object-contain p-5 transition-transform duration-500 group-hover:scale-110"
                        />
                      </Link>

                      {/* info */}
                      <div className="flex flex-1 flex-col p-5 text-center">
                        <h3 className="line-clamp-2 min-h-[3rem] text-[16px] font-bold leading-snug text-[#f4ead0]">
                          {p.name}
                        </h3>

                        <div className="mt-2 flex items-baseline justify-center gap-2">
                          <span className="text-xl font-extrabold text-[#f2b84b]">
                            ${p.discountPrice || p.listPrice}
                          </span>
                          {hasDiscount && (
                            <span className="text-sm text-[#7f8c85] line-through">
                              ${p.listPrice}
                            </span>
                          )}
                        </div>

                        <Link
                          to={`/product/${p.slug}`}
                          className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#f2b84b] px-5 py-3 pt-3 text-xs font-black uppercase tracking-[.12em] text-[#0a1311] transition-all duration-300 hover:bg-[#f4ead0] [&>span]:transition-transform group-hover:[&>span]:translate-x-1"
                          style={{ marginTop: "1.25rem" }}
                        >
                          View Details
                          <span aria-hidden="true">
                            <ArrowRightOutlined />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </Reveal>
                );
              })
            ) : (
              <div className="col-span-full rounded-2xl border border-dashed border-white/15 bg-white/[.03] px-6 py-16 text-center">
                <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-[#f2b84b]/10 text-2xl text-[#f2b84b]">
                  <SearchOutlined />
                </div>
                <p className="text-lg font-bold text-[#f4ead0]">
                  No products found
                </p>
                <p className="mt-1 text-sm text-[#b9c2b6]">
                  Try a different brand, category or search term.
                </p>
              </div>
            )}
          </div>

          {/* ---------- PAGINATION ---------- */}
          {filteredProducts.length > pageSize && (
            <div className="mt-12 flex justify-center md:justify-end">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredProducts.length}
                onChange={(page) => {
                  setCurrentPage(page);
                  document
                    .getElementById("products")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                showSizeChanger={false}
              />
            </div>
          )}
        </div>
      </section>
    </ConfigProvider>
  );
};

export default HomeProducts;