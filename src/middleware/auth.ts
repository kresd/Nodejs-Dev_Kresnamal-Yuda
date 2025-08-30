import jwt from "jsonwebtoken";

export const requiredAuth = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
    res.locals.user = decoded;
    req.user = decoded;
    return next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.redirect("/login");
  }
};

export const authGuard = (req, res, next) => {
  console.log("🔍 Path:", req.path);

  const publicPaths = ["/login", "/"];

  if (publicPaths.includes(req.path)) {
    console.log("Public path, skip auth");
    return next();
  }

  console.log("Protected, running requiredAuth");
  return requiredAuth(req, res, next);
};

