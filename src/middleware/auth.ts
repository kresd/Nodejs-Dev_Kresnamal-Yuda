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
  const publicGetPaths = ["/login"];
  const rootPath = "/";

  if (req.path === rootPath) {
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

  if (req.method === "GET" && publicGetPaths.includes(req.path)) {
    return next();
  }

  if (req.method === "POST" && req.path === "/login") {
    return next();
  }

  return requiredAuth(req, res, next);
};
