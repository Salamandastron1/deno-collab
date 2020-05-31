import { Application } from "https://deno.land/x/abc@v1.0.0-rc8/mod.ts";
import { encode, decode } from "https://deno.land/std@0.54.0/encoding/base64.ts";

interface UrlRequest {
    url: string;
};

const app = new Application();

const urls: string[] = [];

app
    .get("/hello", () => {
        return "Hello, Drake";
    })
    .post("/getTiny", async (c) => {
        const { url }: UrlRequest = await c.body();

        urls.push(url);
        return encode((urls.length - 1).toString());
    })
    .start({ port: 8080 });

// "/a;sdlkfjas;dlfjli319-13913"

// "localhost:8080/getTiny" => "localhost:8080/a/asdfa"
// "/a/*"