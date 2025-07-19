import SandiaProduct from "../models/SandiaProduct.js";

export const createSandiaProduct = async (req, res) => {
  try {
    const {
      productName,
      header,
      slug,
      shortDescription,
      description,
      modelNumber,
      warranty,
      includes,
      specifications,
      accessories,
      replacementfilterbags,
      literature,
      listPrice,
      discountPrice,
    } = req.body;

    const baseUrl = `${req.protocol}://${req.get('host')}`;

    const productImages = req.files["productImages"]?.map(file => `${baseUrl}/${file.path}`) || [];
    const literatureFiles = req.files["literature"]?.map(file => `${baseUrl}/${file.path}`) || [];


    const product = new SandiaProduct({
      productName,
      header,
      slug,
      shortDescription,
      description,
      modelNumber,
      warranty,
      includes,
      listPrice,
      discountPrice,
      productImages,
      literature: literatureFiles.length ? literatureFiles : JSON.parse(literature || "[]"),
      specifications: JSON.parse(specifications || "[]"),
      accessories: JSON.parse(accessories || "[]"),
      replacementfilterbags: JSON.parse(replacementfilterbags || "[]"),
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const getAllSandiaProducts = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    const products = await SandiaProduct.find();

    const updatedProducts = products.map(product => {
      const updatedImages = product.productImages.map(img => `${baseUrl}/${img}`);
      const updatedLiterature = product.literature.map(file => `${baseUrl}/${file}`);

      return {
        ...product.toObject(),
        productImages: updatedImages,
        literature: updatedLiterature,
      };
    });

    res.status(200).json({ products: updatedProducts });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


