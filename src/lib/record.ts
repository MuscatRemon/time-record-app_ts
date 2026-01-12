import supabase from "@/utils/supabase";

export async function GetAllRecords() {
  const tableName = "study-record-ts";
  const response = await supabase.from(tableName).select("*");

  if (response.error) {
    throw new Error(response.error.message);
  }

  console.log(response.data);
}
