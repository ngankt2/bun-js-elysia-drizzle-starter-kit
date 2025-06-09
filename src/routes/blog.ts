import Elysia from "elysia";
import {blogListController} from "../controllers/blog/list";

export const blogRoute = new Elysia({prefix: '/blog'})
    .post("/list", blogListController.main,blogListController.validation)
