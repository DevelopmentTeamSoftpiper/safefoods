import { createRouter } from 'next-connect';
import { verifyToken, verifyTokenAndAdmin } from '@/helpers/verityToken';
import db from '@/utils/db';
import Product from '@/models/Products';
import applyCors from '@/middleware/cors';
import Order from '@/models/Order';


const router = createRouter().use(verifyToken).use(verifyTokenAndAdmin);

router.post(async(req, res)=>{
    try {
    
        db.connectDb();

        const found = await Order.find({}).populate("products");
        db.disconnectDb();
        if(found){
          return res.json({
            message: "Order has been found successfully",
            order: found
          });
        }else{
          return res.json({
            message: "something went wrong",
          });
        }
       
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})




export default applyCors(router.handler());