import {
    pgTable,
    serial,
    text,
    timestamp,
    integer,
} from 'drizzle-orm/pg-core';
import {relations} from "drizzle-orm";

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').unique().notNull(),
    created_at: timestamp('created_at').defaultNow(),
});

// Bảng categories (danh mục)
export const categories = pgTable('categories', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    created_at: timestamp('created_at').defaultNow(),
});

// Bảng blogs (bài viết)
export const blogs = pgTable('blogs', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    content: text('content'),
    category_id: integer('category_id'),
    user_id: integer('user_id'),
    created_at: timestamp('created_at').defaultNow(),
});


// Định nghĩa quan hệ
export const categoriesRelations = relations(categories, ({ many }) => ({
    blogs: many(blogs), // Một category có nhiều blogs
}));

export const blogsRelations = relations(blogs, ({ one }) => ({
    category: one(categories, {
        fields: [blogs.category_id], // Trường trong bảng blogs
        references: [categories.id], // Trường tham chiếu trong bảng categories
    }),
    user: one(users, {
        fields: [blogs.user_id], // Trường trong bảng blogs
        references: [users.id], // Trường tham chiếu trong bảng users
    }),
}));

export const usersRelations = relations(users, ({ many }) => ({
    blogs: many(blogs), // Một user có nhiều blogs
}));