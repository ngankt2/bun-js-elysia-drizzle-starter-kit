import {t} from "elysia";
import {eq, and, count} from 'drizzle-orm';
import {blogs, users, categories} from '@src/db/schema';
import {db} from "@src/db/connection";

// Validation schema for headers, query, and body
const validation = {
    headers: t.Object({
        authorization: t.String({
            description: 'Authentication token obtained from the admin or user dashboard. Required for accessing the API.'
        }),
    }),
    body: t.Object({
        requestId: t.String({
            maxLength: 50,
            description: 'A unique random string used for logging and tracking between the API caller and receiver. Should be unique for each request to facilitate debugging or tracing.',
        }),
        requestTime: t.String({
            description: 'The client’s current timestamp in milliseconds, represented as a string. Example: "1213545154135".',
        }),
        page: t.Optional(t.Numeric({
            minimum: 1,
            default: 1,
            description: 'The page number for pagination, starting from 1.'
        })),
        limit: t.Optional(t.Numeric({
            minimum: 1,
            maximum: 100,
            default: 10,
            description: 'The number of blog posts to return per page, with a maximum of 100.'
        })),
        categoryId: t.Optional(t.Numeric({
            description: 'The ID of the category to filter blog posts. If provided, only blogs in this category are returned.'
        })),
    }, {additionalProperties: true}),
};

/**
 * @url {{api_domain}}/blog/list
 * @method get
 * @description Fetches a paginated list of blogs with their authors and categories
 * @param context
 */
async function main(context: any) {
    try {
        const {page = 1, limit = 10} = context.body;

        // Fetch blogs with joins to users and categories
        const blogList = await db
            .select({
                id: blogs.id,
                title: blogs.title,
                content: blogs.content,
                created_at: blogs.created_at,
            })
            .from(blogs)
            .limit(limit)
            .offset((page - 1) * limit);

        // Count total blogs for pagination metadata
        const totalBlogsResult = await db
            .select({ count: count() })
            .from(blogs);
        const totalBlogs = totalBlogsResult[0].count;

        return {
            status: 'success',
            requestId: context.body.requestId,
            data: {
                blogs: blogList,
                pagination: {
                    page,
                    limit,
                    total: totalBlogs,
                    totalPages: Math.ceil(totalBlogs / limit),
                },
            },
        };
    } catch (error:any) {
        console.error(`Error in blogListController [requestId: ${context.body.requestId}]`, error);
        return {
            status: 'error',
            requestId: context.body.requestId,
            message: 'Failed to fetch blog list',
            error: error.message,
        };
    }
}

export const blogListController = {
    validation,
    main,
};