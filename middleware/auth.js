

const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {

  const authHeader =
    req.headers.authorization;

  console.log("AUTH HEADER:", authHeader);

  if (!authHeader) {

    return res.status(401).json({
      result: "Access denied"
    });

  }

  const token =
    authHeader.split(" ")[1];

  console.log("TOKEN:", token);

  try {

    const verified =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    console.log("VERIFIED:", verified);

    req.user = verified;

    next();

  } catch (error) {

    console.log(
      "JWT ERROR:",
      error.message
    );

    return res.status(403).json({
      result: "Invalid token"
    });

  }

}

module.exports = verifyToken;



/*
const jwt = require("jsonwebtoken");

function verifyToken(
  req,
  res,
  next
) {

  const authHeader =
    req.headers.authorization;

  if (!authHeader) {

    return res.status(401).json({
      result: "Access denied"
    });

  }

  const token =
    authHeader.split(" ")[1];

  try {

    const verified =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    req.user = verified;

    next();

  } catch (error) {

    return res.status(403).json({
      result: "Invalid token"
    });

  }

}

module.exports = verifyToken;
*/
