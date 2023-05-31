import { createRouter } from 'next-connect';
import { verifyTokenAndAdmin } from '@/helpers/verityToken';
import db from '@/utils/db';
import PaymentMethods from '@/models/PaymentMethods';


const router = createRouter().use(verifyTokenAndAdmin);

router.post(async(req, res)=>{
    try {
        const { id, name ,description} = req.body;
        db.connectDb();
        const updated = await PaymentMethods.findByIdAndUpdate(id, { name, description });
        db.disconnectDb();
        if(updated){
          return res.json({
            message: "Payment Method has been updated successfully",
          });
        }else{
          return res.json({
            message: "Payment Method not found with this id",
          });
        }
       
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})




export default router.handler();