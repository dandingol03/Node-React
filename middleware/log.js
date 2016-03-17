/**
 * Created by outstudio on 16/3/17.
 */
exports.logger=function logger(req,res,next) {

    console.log(req.url);
    next();
};