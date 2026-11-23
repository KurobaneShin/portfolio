import { describe, expect, test } from "bun:test";
import { isLive, publishedAt } from "../app/modules/blog.schedule";

describe("isLive", () => {
  test("a day-only date goes live at midnight in São Paulo", () => {
    expect(publishedAt("2026-12-07")).toBe(Date.parse("2026-12-07T03:00:00Z"));
    expect(isLive("2026-12-07", Date.parse("2026-12-07T02:59:59Z"))).toBe(false);
    expect(isLive("2026-12-07", Date.parse("2026-12-07T03:00:00Z"))).toBe(true);
  });

  test("a full timestamp goes live at that instant", () => {
    const date = "2026-11-23T14:05:00-03:00";
    expect(isLive(date, Date.parse("2026-11-23T17:04:59Z"))).toBe(false);
    expect(isLive(date, Date.parse("2026-11-23T17:05:00Z"))).toBe(true);
  });

  test("a malformed date never goes live", () => {
    expect(isLive("soon", Date.parse("2100-01-01T00:00:00Z"))).toBe(false);
  });
});
