import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "../App.tsx";
import { Provider } from "../components/ui/provider.tsx";

let mockDB = [
  { id: 1, title: "React", time: 2 },
  { id: 2, title: "TEST", time: 4 },
];

vi.mock("@/utils/supabase", () => {
  return {
    default: {
      from: vi.fn(() => ({
        select: vi.fn().mockImplementation(async () => ({
          data: [...mockDB],
          error: null,
        })),
        insert: vi.fn().mockImplementation(async ({ title, time }) => {
          const newItem = {
            id: mockDB.length + 1,
            title: title,
            time: Number(time),
          };
          mockDB.push(newItem);
          return { data: [...mockDB], error: null };
        }),
        upsert: vi.fn().mockImplementation(async ({ id, title, time }) => {
          const itemIndex = mockDB.findIndex((item) => item.id === id);
          mockDB[itemIndex].title = title;
          mockDB[itemIndex].time = Number(time);
          return { data: [...mockDB], error: null };
        }),
        delete: vi.fn().mockImplementation(() => {
          return {
            eq: vi.fn(async (field, value) => {
              const mocDBIndex = value - 1;
              mockDB.splice(mocDBIndex, 1); // 削除
              return { status: 204 };
            }),
          };
        }),
      })),
    },
  };
});

describe("time-record-app-tsテスト", () => {
  it("ローディング中はSpinnerが表示される", () => {
    render(
      <Provider>
        <App />
      </Provider>
    );
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("テーブルを見ることができる", async () => {
    render(
      <Provider>
        <App />
      </Provider>
    );
    expect(await screen.findByRole("table")).toBeInTheDocument();
  });

  it("新規登録ボタンがある", async () => {
    render(
      <Provider>
        <App />
      </Provider>
    );
    expect(
      await screen.findByRole("button", { name: "新規登録" })
    ).toBeInTheDocument();
  });

  it("h1(タイトル)が表示されている", () => {
    render(
      <Provider>
        <App />
      </Provider>
    );
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("学習記録の新規登録ができる", async () => {
    const registerTitle = "React学習vitest";
    const registerTime = "60";
    render(
      <Provider>
        <App />
      </Provider>
    );
    fireEvent.click(await screen.findByRole("button", { name: "新規登録" }));
    await screen.findByRole("dialog");
    fireEvent.change(screen.getByLabelText("学習内容"), {
      target: { value: registerTitle },
    });
    fireEvent.change(screen.getByLabelText("学習時間"), {
      target: { value: registerTime },
    });
    fireEvent.click(screen.getByRole("button", { name: "登録" }));
    expect(await screen.findByText(registerTitle)).toBeInTheDocument();
    expect(await screen.findByText(registerTime)).toBeInTheDocument();
  });

  it("モーダルが新規登録というタイトルになっている", async () => {
    render(
      <Provider>
        <App />
      </Provider>
    );
    fireEvent.click(await screen.findByRole("button", { name: "新規登録" }));
    await screen.findByRole("dialog");
    expect(
      await screen.findByRole("heading", { level: 2, name: "新規登録" })
    ).toBeInTheDocument();
  });

  it("学習内容がないときに登録するとエラーがでる", async () => {
    render(
      <Provider>
        <App />
      </Provider>
    );
    fireEvent.click(await screen.findByRole("button", { name: "新規登録" }));
    await screen.findByRole("dialog");
    fireEvent.click(screen.getByRole("button", { name: "登録" }));
    expect(await screen.findByText("内容の入力は必須です")).toBeInTheDocument();
  });

  it("学習時間がないときに登録するとエラーがでる", async () => {
    render(
      <Provider>
        <App />
      </Provider>
    );
    fireEvent.click(await screen.findByRole("button", { name: "新規登録" }));
    await screen.findByRole("dialog");
    fireEvent.change(screen.getByLabelText("学習時間"), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByRole("button", { name: "登録" }));
    expect(await screen.findByText("時間の入力は必須です")).toBeInTheDocument();
  });

  it("学習時間が0のときに登録するとエラーがでる", async () => {
    render(
      <Provider>
        <App />
      </Provider>
    );
    fireEvent.click(await screen.findByRole("button", { name: "新規登録" }));
    await screen.findByRole("dialog");
    fireEvent.click(screen.getByRole("button", { name: "登録" }));
    expect(
      await screen.findByText("時間は1以上である必要があります")
    ).toBeInTheDocument();
  });

  it("学習記録が削除できる", async () => {
    const deleteTargetTitle = mockDB[0].title;

    vi.stubGlobal(
      "confirm",
      vi.fn(() => true)
    );
    render(
      <Provider>
        <App />
      </Provider>
    );
    await screen.findByRole("table");
    expect(screen.getByText(deleteTargetTitle)).toBeInTheDocument();
    const deleteRow = screen.getByText(deleteTargetTitle).closest("tr")!;
    const deleteButton = within(deleteRow).getByRole("button", {
      name: "Delete",
    });
    fireEvent.click(deleteButton);
    expect(await screen.findByText(deleteTargetTitle)).not.toBeInTheDocument();

    afterEach(() => {
      vi.restoreAllMocks();
    });
  });

  it("編集モーダルのタイトルが記録編集である", async () => {
    const editTargetTitle = mockDB[0].title;
    render(
      <Provider>
        <App />
      </Provider>
    );
    await screen.findByRole("table");
    const editRow = screen.getByText(editTargetTitle).closest("tr")!;
    const editButton = within(editRow).getByRole("button", {
      name: "Edit",
    });
    fireEvent.click(editButton);
    expect(
      await screen.findByRole("heading", { level: 2, name: "記録編集" })
    ).toBeInTheDocument();
  });

  it("編集して登録すると更新される", async () => {
    const editTargetTitle = mockDB[0].title;
    const afterEditTitle = "更新タイトル";
    const afterEditTime = "80";
    render(
      <Provider>
        <App />
      </Provider>
    );
    await screen.findByRole("table");
    const editRow = screen.getByText(editTargetTitle).closest("tr")!;
    const editButton = within(editRow).getByRole("button", {
      name: "Edit",
    });
    fireEvent.click(editButton);
    await screen.findByRole("heading", { level: 2, name: "記録編集" });
    fireEvent.change(screen.getByLabelText("学習内容"), {
      target: { value: afterEditTitle },
    });
    fireEvent.change(screen.getByLabelText("学習時間"), {
      target: { value: afterEditTime },
    });
    fireEvent.click(screen.getByRole("button", { name: "編集" }));
    expect(await screen.findByText(afterEditTitle)).toBeInTheDocument();
    expect(await screen.findByText(afterEditTime)).toBeInTheDocument();
  });
});
