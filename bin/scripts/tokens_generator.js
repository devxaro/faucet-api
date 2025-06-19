import 'dotenv/config';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET_KEY;
const roles = ['ADMIN', 'USER'];
const uid = process.argv.slice(2)[0];

const generateToken = roles => {
  return jwt.sign(
    {
      uid,
      roles
    },
    secret,
    {algorithm: 'HS256', expiresIn: '10000h'}
  );
};

(() => {
  try {
    const result = {
      uid,
      tokens: {}
    };
    roles.forEach(role => (result.tokens[role] = generateToken([role])));
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
})();
