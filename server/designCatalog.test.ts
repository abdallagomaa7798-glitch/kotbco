import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("design catalog integrity", () => {
  it("keeps 36 curated cards with unique images", () => {
    const source = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
    const start = source.indexOf("const designCatalog:");
    const end = source.indexOf("].map(", start);
    const catalog = source.slice(start, end);
    const images = [...catalog.matchAll(/\/manus-storage\/qutb-design-[^\"]+?\.jpg/g)].map((match) => match[0]);
    expect(images).toHaveLength(36);
    expect(new Set(images).size).toBe(36);
    expect(source).not.toContain("Array.from({ length: 1008 }");
  });
});
