

const makeHandler = (redirectUrl: string) => {
    return (_req: Request) => {
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
};

export { makeHandler };
