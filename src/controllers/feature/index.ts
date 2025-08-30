import Service from "../../services/feature";
import Handler from "../../modules/handler";
import dayjs from "dayjs";

export default {
  getCompareForm: Handler(async (req, res) => {
    res.render("feature/compare/form", { title: "Compare Inputs" });
  }),
  compareInputs: Handler(async (req, res) => {
    const { source, target, matchMode } = req.body;

    if (!source || !target || !matchMode) {
      return res.render("feature/compare/form", {
        title: "Compare Inputs",
        error: "Semua field wajib diisi",
      });
    }

    const response = await Service.compareInputs({ source, target, matchMode });
    res.render("feature/compare/result", { title: "Result", response });
  }),
  getComparisonHistory: Handler(async (req, res) => {
    try {
      const history = await Service.getComparisonHistory();
      const formattedHistory = history.map((item) => ({
        ...item,
        formattedDate: dayjs(item.created_at).format("DD/MM/YYYY HH:mm"),
      }));

      res.render("feature/compare/history", { history: formattedHistory });
    } catch (err) {
      res.render("feature/compare/history", {
        error: err.message,
        history: [],
      });
    }
  }),
  deleteComparisonHistory: Handler(async (req, res) => {
    try {
      const id = req.params.id;
      await Service.deleteComparisonHistory(id);
      res.redirect("/features/compare/history");
    } catch (err) {
      res.render("feature/compare/history", {
        error: err.message,
        history: [],
      });
    }
  }),
};
