import JWT from 'jsonwebtoken';

// Protected routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
    req.user = decode;
    req.company = decode; // Pastikan token JWT berisi companyId
    // req.company = decode; // Pastikan token JWT berisi companyId
    next();
  } catch (error) {
    console.error('Failed to authenticate token', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};
