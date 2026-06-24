import { describe, it, expect } from "vitest";

import { cn } from "@/lib/utils";

describe("cn", () => {
  it("résout les conflits d'utilitaires Tailwind (dernier gagne)", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("ignore les valeurs falsy et joint le reste", () => {
    expect(cn("text-white", false, undefined, "font-bold")).toBe("text-white font-bold");
  });
});
