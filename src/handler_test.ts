import { expect } from "jsr:@std/expect";
import { makeHandler } from "./handler.ts";

Deno.test("should redirect to url", async () => {
  const url: string = `https://${crypto.randomUUID()}.dev`;
  const handler = makeHandler(url);

  const req: Request = new Request(url, {
    method: "GET",
    headers: [["Content-Type", "application/json"]],
  });

  const response : Response = await handler(req);

  const location: string = "location";
  const statusCode: number = 307;
  expect(response).toBeDefined();
  expect(response!.headers.has(location)).toBe(true);
  expect(response!.headers.get(location)).toBe(url);
  expect(response!.status).toBe(statusCode);
});

Deno.test("should prevent caching", async () => {
    const url: string = `https://${crypto.randomUUID()}.dev`;
    const handler = makeHandler(url);

    const req: Request = new Request(url, {
        method: "GET",
        headers: [["Content-Type", "application/json"]],
    });

    const response : Response = await handler(req);

    expect(response!.headers.get("Pragma")).toBe("no-cache");
    expect(response!.headers.get("Expires")).toBe("0");
    expect(response!.headers.get("Cache-Control")).toBe("no-cache, no-store, must-revalidate");
});
