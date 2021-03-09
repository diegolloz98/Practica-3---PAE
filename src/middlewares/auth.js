module.exports = function(req, res, next){
    if(req.headers.authentication){
        next();
    }else{
        res.status(401).end("athenticated");
    }
}