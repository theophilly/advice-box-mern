import jwt from "jsonwebtoken";

export const ensureLogin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    let user;

    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(400).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  } else {
    return res.status(400).json({ message: "You need to login" });
  }
};

export const adminMiddleware = (req, res, next) => {
  //   if (!req.user.role) {
  //     res.status(500).json({ message: "Access denied" });
  //   }
  console.log(req.user);
  if (req.user.role !== "admin") {
    return res.status(500).json({ message: "Access denied" });
  }

  next();
};

export const userLoginMiddleware = (req, res, next) => {
  //   if (!req.user.role) {
  //     res.status(500).json({ message: "Access denied" });
  //   }
  console.log(req.user);
  if (req.user.role !== "user" && req.user.role !== "admin") {
    return res.status(500).json({ message: "Access denied" });
  }

  next();
};
