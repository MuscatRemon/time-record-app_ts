import { Record } from "@/domain/record";
import supabase from "@/utils/supabase";

const tableName = "study-record-ts";

export async function GetAllRecords(): Promise<Record[]> {
  const response = await supabase.from(tableName).select("*");

  if (response.error) {
    throw new Error(response.error.message);
  }

  const recordsData = response.data.map((record) => {
    return new Record(record.id, record.title, record.time, record.created_at);
  });

  return recordsData;
}

export const insertRecord = async (
  inputTitle: string,
  inputTime: number | ""
) => {
  const { error } = await supabase
    .from(tableName)
    .insert({ title: inputTitle, time: inputTime });

  if (error) {
    console.error(error);
  } else {
    console.log(`登録しました`);
  }
};

export const updateRecord = async (
  recordId: number,
  inputTitle: string,
  inputTime: number | ""
) => {
  const { status } = await supabase
    .from(tableName)
    .upsert({ id: recordId, title: inputTitle, time: inputTime })
    .select();

  if (status === 201) {
    console.log("編集しました");
  }
};

export const deleteRecord = async (recordId: number) => {
  if (!confirm("本当に削除しますか？")) {
    console.log("キャンセルしました");
    return;
  }

  const response = await supabase.from(tableName).delete().eq("id", recordId);

  if (response.status === 204) {
    console.log("削除しました");
  }
};
