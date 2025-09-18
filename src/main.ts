// main.ts

import { makeHandler } from "./handler.ts";

const redirectUrl = Deno.env.get("REDIRECT_URL");
const port = 8080;

if (!redirectUrl) {
  console.error("Error: REDIRECT_URL environment variable is not set.");
  Deno.exit(1);
}

const handler = makeHandler(redirectUrl);

const server: Deno.HttpServer<Deno.NetAddr> = Deno.serve({ handler, port });

console.log(
  `Redirect server running. Forwarding all requests to ${redirectUrl}`,
);

await server.finished;
