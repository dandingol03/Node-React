/**
 * Created by outstudio on 16/3/17.
 */

module.exports.notfound=notfound;



function notfound(req,res) {
    res.send('request url='+req.url);


}
