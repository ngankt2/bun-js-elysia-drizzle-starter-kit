import Elysia from "elysia";
import {blogRoute} from "@src/routes/blog";


const datetime = new Date().toISOString();
export const app = new Elysia({})
app
    .get("/", () => {
        return "Private Server is running! this is api. Times:" + new Date().toISOString();
    })
    .use(blogRoute)
    .listen(process.env.APP_PORT || 4000, async () => {
        console.log(
            `Api is running at ${app.server?.hostname}:${app.server?.port}, ${datetime}`
        );
    });

export type App = typeof app;
