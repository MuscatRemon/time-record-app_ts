import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App.tsx";
import { Provider } from "../components/ui/provider.tsx";

let mockDB = [{ id: 1, title: "React", time: 2 }];

vi.mock("@/utils/supabase", () => {
  return {
    default: {
      from: vi.fn(() => ({
        select: vi.fn().mockImplementation(async () => ({
          data: [...mockDB],
          error: null,
        })),
        // insert: vi.fn().mockImplementation(async ({ title, time }) => {
        //   const newItem = {
        //     id: mockDB.length + 1,
        //     title: title,
        //     time: Number(time),
        //   };
        //   mockDB.push(newItem);
        //   return { data: [...mockDB], error: null };
        // }),
        // delete: vi.fn().mockImplementation(() => {
        //   return {
        //     eq: vi.fn(async (field, value) => {
        //       const mocDBIndex = value - 1;
        //       mockDB.splice(mocDBIndex, 1); // 削除
        //       return { status: 204 };
        //     }),
        //   };
        // }),
      })),
    },
  };
});

describe("time-record-app-tsテスト", () => {
  it("h1が表示されている", () => {
    render(
      <Provider>
        <App />
      </Provider>
    );

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
