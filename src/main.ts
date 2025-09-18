// main.ts

const redirectUrl = Deno.env.get("REDIRECT_URL");
const port = 8080;

if (!redirectUrl) {
  console.error("Error: REDIRECT_URL environment variable is not set.");
  Deno.exit(1);
}

const handler = (_req: Request) => {
  const headers = new Headers();
  headers.set("Location", redirectUrl);

  headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
  headers.set("Pragma", "no-cache");
  headers.set("Expires", "0");

  return new Response(null, {
    status: 307,
    statusText: "Temporary Redirect",
    headers: headers,
  });
};

const server: Deno.HttpServer<Deno.NetAddr> = Deno.serve({ handler, port });

console.log(
  `Redirect server running. Forwarding all requests to ${redirectUrl}`,
);

await server.finished;
