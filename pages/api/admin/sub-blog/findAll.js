import { createRouter } from "next-connect";
import db from "@/utils/db";
import applyCors from "@/middleware/cors";
import SubBlog from "@/models/SubBlog";

const router = createRouter();

router.get(async (req, res) => {
  try {
    db.connectDb();
    const subBlog = await SubBlog.find();
    db.disconnectDb();
    return res.json({
      subBlogs: subBlog,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default applyCors(router.handler());
