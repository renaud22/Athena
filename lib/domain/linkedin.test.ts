import { describe, it, expect } from "vitest";

import { linkedinActionLabel, linkedinActionUrl } from "@/lib/domain/linkedin";

describe("linkedinActionUrl (FR14 — lien contextuel)", () => {
  it("ouvre l'éditeur de publication pour un post", () => {
    expect(linkedinActionUrl("post", null)).toContain("shareActive=true");
  });

  it("ouvre le profil du prospect pour un DM quand l'URL est connue", () => {
    const url = "https://www.linkedin.com/in/awa-diop";
    expect(linkedinActionUrl("dm", url)).toBe(url);
  });

  it("retombe sur la messagerie générique pour un DM sans URL", () => {
    expect(linkedinActionUrl("dm", null)).toContain("/messaging/");
  });
});

describe("linkedinActionLabel", () => {
  it("distingue le libellé post / DM", () => {
    expect(linkedinActionLabel("post")).toMatch(/éditeur/i);
    expect(linkedinActionLabel("dm")).toMatch(/messagerie/i);
  });
});
