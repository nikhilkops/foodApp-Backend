import { UnauthenticatedError, Unauthorized } from "../errors/customErros.js";
import { ROLE_TYPE } from "../utils/constants.js";
import { verifyJWT } from "../utils/tokenUtils.js";
export const authenticateUser = async (req, res, next) => {
  const { JWT_TOKEN } = req.cookies;
  if (!JWT_TOKEN) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
  try {
    const { userId, role } = verifyJWT(JWT_TOKEN);
    req.user = { userId, role };
    next();
  } catch (err) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

export const authorizePermission = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new Unauthorized("Only Admin have access to this route ");
    }
    next();
  };
};
