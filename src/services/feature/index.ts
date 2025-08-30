import { supabase } from "../../config/supabase";

const compareInputs = async ({
  source,
  target,
  matchMode,
}: {
  source: string;
  target: string;
  matchMode: "sensitive" | "insensitive";
}) => {
  const totalChars = source.length;
  let matchCount = 0;

  source.split("").forEach((charSource) => {
    let found = false;

    target.split("").forEach((charTarget) => {
      if (found) return;

      if (matchMode === "sensitive") {
        if (charSource === charTarget) {
          matchCount++;
          found = true;
        }
      } else {
        if (charSource.toLowerCase() === charTarget.toLowerCase()) {
          matchCount++;
          found = true;
        }
      }
    });
  });

  const percentage = (matchCount / totalChars) * 100;
  const { error } = await supabase.from("comparison_results").insert([
    {
      source,
      target,
      match_mode: matchMode,
      percentage,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) throw new Error(`Failed to save comparison: ${error.message}`);

  return { source, target, matchMode, percentage };
};

const getComparisonHistory = async () => {
  const { data, error } = await supabase
    .from("comparison_results")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
};

const deleteComparisonHistory = async (id: string) => {
  console.log(id)
  const { error } = await supabase
    .from("comparison_results")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  return { message: "Record deleted successfully" };
};

export default {
  compareInputs,
  getComparisonHistory,
  deleteComparisonHistory
};
