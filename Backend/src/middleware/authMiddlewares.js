const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        alert("no posee token");
        return res.status(401).send({message: "no token provided"});


    }
    try {
        const verfiend = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verfiend;
        next();
    } catch (error) {
        return res.status(401).send({message: "invalid token"});
    }

};