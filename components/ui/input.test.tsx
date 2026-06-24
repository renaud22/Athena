import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { Input } from "@/components/ui/input";

describe("Input", () => {
  it("rend un champ saisissable et reflète la frappe", async () => {
    render(<Input placeholder="Nom du prospect" />);
    const input = screen.getByPlaceholderText("Nom du prospect");
    await userEvent.type(input, "Awa Diop");
    expect(input).toHaveValue("Awa Diop");
  });
});
