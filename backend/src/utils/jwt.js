import jwt from 'jsonwebtoken';

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'supersecretjwtkey_replace_in_production', {
    expiresIn: '30d',
  });
};

export default generateToken;
