import { createRouter } from 'next-connect';
import { verifyTokenAndAdmin } from '@/helpers/verityToken';
import db from '@/utils/db';
import Product from '@/models/Products';
import applyCors from '@/middleware/cors';


const router = createRouter();

router.get(async(req, res)=>{
    try {
      const { slug } = req.query;
        db.connectDb();

        const found = await Product.findOne({slug:slug});
        db.disconnectDb();
        if(found){
          return res.json({
            message: "Product has been found successfully",
            product: found
          });
        }else{
          return res.json({
            message: "Product not found with this id",
          });
        }
       
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})




export default applyCors(router.handler());