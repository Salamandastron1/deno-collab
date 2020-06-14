import { Application } from "https://deno.land/x/abc@v1.0.0-rc8/mod.ts";
import { Base64 } from "https://deno.land/x/bb64/mod.ts";
import { abcCors } from "https://deno.land/x/cors/abcCors.ts";

interface UrlRequest {
    url: string;
};

const app = new Application();

const urls: string[] = [];

app
    .use(abcCors())
    .options("/getTiny", (c) => c, abcCors())
    .post("/getTiny", async (c) => {
        const { url }: UrlRequest = await c.body();

        urls.push(url);
        return c.json({ url: Base64.fromString((urls.length - 1).toString()).toString() });
    })
    .get("/:extension", (context) => {
        const realURL: string = urls[parseInt(Base64.fromBase64String(context.url.pathname.substr(1)).toString())]
        return context.redirect(realURL)
    })
    .start({ port: 8080 });

// "/a;sdlkfjas;dlfjli319-13913"

// "localhost:8080/getTiny" => "localhost:8080/a/asdfa"
// "/a/*"