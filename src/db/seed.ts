import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { users, categories, blogs } from './schema'; // Adjust the path to your schema file

// Database connection configuration
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || '',
});

const db = drizzle(pool);

// Sample data for seeding
const seedData = async () => {
    try {
        // Seed users
        await db.insert(users).values([
            { name: 'John Doe', email: 'john.doe@example.com', created_at: new Date() },
            { name: 'Jane Smith', email: 'jane.smith@example.com', created_at: new Date() },
            { name: 'Alice Johnson', email: 'alice.johnson@example.com', created_at: new Date() },
        ]);

        // Seed categories
        await db.insert(categories).values([
            { name: 'Technology', description: 'Articles about tech trends and innovations', created_at: new Date() },
            { name: 'Lifestyle', description: 'Tips and stories about daily living', created_at: new Date() },
            { name: 'Travel', description: 'Guides and experiences from around the world', created_at: new Date() },
        ]);

        // Seed blogs
        await db.insert(blogs).values([
            {
                title: 'The Future of AI',
                content: 'Exploring the advancements in artificial intelligence and its impact on society.',
                category_id: 1,
                user_id: 1,
                created_at: new Date(),
            },
            {
                title: 'Healthy Living Tips',
                content: 'Practical advice for maintaining a balanced and healthy lifestyle.',
                category_id: 2,
                user_id: 2,
                created_at: new Date(),
            },
            {
                title: 'Top 10 Travel Destinations for 2025',
                content: 'A curated list of must-visit places for your next adventure.',
                category_id: 3,
                user_id: 3,
                created_at: new Date(),
            },
            {
                title: 'Blockchain Explained',
                content: 'An in-depth look at how blockchain technology works.',
                category_id: 1,
                user_id: 1,
                created_at: new Date(),
            },
        ]);

        console.log('Database seeding completed successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await pool.end();
    }
};

// Execute the seeding function
seedData();