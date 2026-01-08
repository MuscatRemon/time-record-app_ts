import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App.tsx";
import { Provider } from "../components/ui/provider.tsx";

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
