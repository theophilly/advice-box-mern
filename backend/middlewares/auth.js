import jwt from 'jsonwebtoken';

export const ensureLogin = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    let user;
    console.log(typeof token, token);
    try {
      user = await jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  } else {
    return res.status(400).json({ message: 'You need to login' });
  }
};

export const adminMiddleware = (req, res, next) => {
  //   if (!req.user.role) {
  //     res.status(500).json({ message: "Access denied" });
  //   }
  console.log(req.user);
  if (req.user.role !== 'admin') {
    return res.status(500).json({ message: 'Access denied' });
  }

  next();
};

export const userLoginMiddleware = (req, res, next) => {
  //   if (!req.user.role) {
  //     res.status(500).json({ message: "Access denied" });
  //   }

  if (req.user.role !== 'user' && req.user.role !== 'admin') {
    return res.status(500).json({ message: 'Access denied' });
  }

  next();
};
