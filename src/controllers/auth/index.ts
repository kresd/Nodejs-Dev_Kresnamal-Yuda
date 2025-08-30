import Service from "@services/auth";
import Handler from "@modules/handler";

export default {
  showLogin: Handler(async (req, res) => {
    res.render("auth/login", { title: "Login", user: null });
  }),
  login: Handler(async (req, res) => {
    const { email, password } = req.body;
    const response = await Service.login({ email, password });

    res.cookie("token", response.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax",
    });

    res.locals.user = response.user;
    res.redirect("/features/compare");
  }),
  showChangePassword: Handler(async (req, res) => {
    res.render("auth/change-password", {
      title: "Change Password",
      success: null,
      error: null,
    });
  }),
  changePassword: Handler(async (req, res) => {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    try {
      const response = await Service.changePassword({
        userId,
        currentPassword,
        newPassword,
      });

      res.render("auth/change-password", {
        title: "Change Password",
        success: response.message,
        error: null,
      });
    } catch (err) {
      res.render("auth/change-password", {
        title: "Change Password",
        success: null,
        error: err.message,
      });
    }
  }),
  logout: Handler(async (req, res) => {
    res.clearCookie("token");
    res.locals.user = null;
    res.redirect("/login");
  }),
};
