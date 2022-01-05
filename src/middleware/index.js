const jwt = require('jsonwebtoken');

const requireSignin =  (req, res, next) => {
    if (req.headers.authorization) {
        
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        const user = jwt.verify(token, process.env.JWT_SECRET);
        console.log(user)
        req.user = user;
    } else {
        
        return res.status(400).json({ msg: "authorization required" })
    }
    next()


}
const userMiddleWare =  (req, res, next) => {
    if (req.user.role !== 'user') return res.status(400).json({ msg: "User Access denied" })
    next()
}
const adminMiddleWare =  (req, res, next) => {
    if (req.user.role !== 'admin') return  res.status(400).json({msg:" Access denied" })
    next()
}

module.exports = {
    requireSignin,
    adminMiddleWare,
    userMiddleWare
}