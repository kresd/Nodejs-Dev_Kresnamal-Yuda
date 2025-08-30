import jwt from "jsonwebtoken";

export const requiredAuth = (req, res, next) => {
  console.log("🍪 Cookies:", req.cookies);

  const token = req.cookies?.token;
  if (!token) {
    console.log("❌ No token, redirect to /login");
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    res.locals.user = decoded;
    console.log("✅ Auth success:", decoded);
    return next();
  } catch (err) {
    console.error("❌ JWT error:", err.message);
    return res.redirect("/login");
  }
};


export const authGuard = (req, res, next) => {
  const publicPaths = ["/login", "/"];

  if (publicPaths.includes(req.path)) {
    return next();
  }

  return requiredAuth(req, res, next);
};
