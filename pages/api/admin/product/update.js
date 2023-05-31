import { createRouter } from 'next-connect';
import { verifyTokenAndAdmin } from '@/helpers/verityToken';
import db from '@/utils/db';

import slugify from 'slugify';
import Product from '@/models/Products';


const router = createRouter().use(verifyTokenAndAdmin);

router.post(async(req, res)=>{
    try {
        const { id, title, price,image,originalPrice,shortDescription,
            description,brand,category,subCategory,bestDeal,discountedSale} = req.body;
        db.connectDb();
        const updated = await Product.findByIdAndUpdate(id, { title, slug: slugify(title),price,image,originalPrice,shortDescription,description,brand,
            category,subCategory,bestDeal,discountedSale });
            db.disconnectDb();
        if(updated){
          return res.json({
            message: "Product has been updated successfully",
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




export default router.handler();