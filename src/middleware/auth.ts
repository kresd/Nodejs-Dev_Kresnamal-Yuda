import jwt from "jsonwebtoken";

export const requiredAuth = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.redirect("/login");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    res.locals.user = decoded;
    return next();
  } catch {
    return res.redirect("/login");
  }
};

export const authGuard = (req, res, next) => {
  const publicPaths = ["/login"];

  if (req.path === "/") {
    const token = req.cookies?.token;
    if (token) {
      try {
        jwt.verify(token, process.env.JWT_SECRET!);
        return res.redirect("/features/compare");
      } catch {
        return res.redirect("/login");
      }
    }
    return res.redirect("/login");
  }

  if (publicPaths.some((p) => req.path.startsWith(p))) {
    return next();
  }

  return requiredAuth(req, res, next);
};
