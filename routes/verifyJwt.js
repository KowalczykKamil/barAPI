const jwt = require("jsonwebtoken");


const verifyJwt = (req,res, next)=>{
    const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) {
          res.status(403).json("Your Token is valid!");
      }
      req.user = user;   
      next();
      
    });
   
  } else {
  
   res.status(401).json("Unauthorized user.");

  }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyJwt(req, res, next, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not authorized!");
      }
    });
  };

  const verifyTokenAndAdmin = (req, res, next) => {
    verifyJwt(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You aren't an admin and you can't to do that!");
      }
    });
  };

  

module.exports={verifyJwt, verifyTokenAndAuthorization, verifyTokenAndAdmin};