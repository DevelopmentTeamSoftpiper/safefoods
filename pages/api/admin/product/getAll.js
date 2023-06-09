import { createRouter } from "next-connect";
import db from "@/utils/db";
import Product from "@/models/Products";
import applyCors from "@/middleware/cors";

const router = createRouter();

router.get(async (req, res) => {
  try {
    db.connectDb();
    const products = await Product.find({}).sort({ updatedAt: -1 });
    db.disconnectDb();
    return res.json({
      products: products,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

export default applyCors(router.handler());
