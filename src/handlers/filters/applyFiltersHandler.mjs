import applyFilters from "../../controllers/filters/applyFilters.mjs";
import Boom from "@hapi/boom";
import HttpStatusCodes from "http-status-codes";

const applyFiltersHandler = async (req,res,next)=>{
    try{
        console.log(req.files)
        const payload = req.body;
        const response = await applyFilters(payload);
        return res.status(HttpStatusCodes.OK).json(response);
    }catch(error){
        const err = Boom.isBoom(error) ? error: Boom.internal(error);
        next(err);
    }
}
export default applyFiltersHandler;