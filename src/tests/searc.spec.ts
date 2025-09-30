import { test, expect } from "@playwright/test";

test.describe("Search page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("renders search input", async ({ page }) => {
    const input = page.getByTestId("search");
    await expect(input).toBeVisible();
  });

  test("filters results by query", async ({ page }) => {
    const input = page.getByTestId("search");
    await input.fill("next");

    const response = await page.waitForResponse(
      (resp) => resp.url().includes("/api/search") && resp.status() === 200
    );
    const responseBody = await response.json();
    const items = page.locator("ul li");
    await expect(items).toHaveCount(1);
    expect(responseBody.results[0].title).toContain("Next.js");
  });

  test("updates URL and shows latest results on fast typing (race-safe)", async ({
    page,
  }) => {
    const input = page.getByTestId("search");
    await input.fill("nex");
    await input.fill("react");

    await expect(page).toHaveURL(/\?q=react/);
    const items = page.locator("ul li");
    await expect(items.first()).toContainText(/React/i);
  });

  test("clearing input shows full dataset", async ({ page }) => {
    const input = page.getByTestId("search");
    await input.fill("a");
    await input.fill("");
    const items = page.locator("ul li");
    await expect(items).toHaveCount(5);
  });
});
