import Product from "../models/product.js";

// Get all products => /api/v1/products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      products,
    });
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({
      message: "Failed to get products",
    });
  }
};

// Create new Product => /api/v1/admin/products
export const newProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(200).json({
      product,
      message: "Product created successfully",
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      message: "Failed to create product",
    });
  }
};

// Get single product details => /api/v1/products/:id
export const getProductDetails = async (req, res) => {
  const { id } = req?.params;
  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.status(200).json({ product });
};

// update Product Details => /api/v1/products/:id
export const updateProduct = async (req, res) => {
  const { id } = req?.params;
  let product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  product = await Product.findByIdAndUpdate(id, req.body, {new: true});

  res.status(200).json({ product });
};

// Delete Product Details => /api/v1/products/:id
export const deleteProduct = async (req, res) => {
  const { id } = req?.params;
  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  await Product.deleteOne();

  res.status(200).json({ message: "Product Deleted" });
};