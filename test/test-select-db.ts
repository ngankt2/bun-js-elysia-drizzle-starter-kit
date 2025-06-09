import {db} from "@src/db/connection";
import {users} from "@src/db/schema";

async function run(){
    const blogList = await db
        .select()
        .from(users)
        .limit(10);

    console.log(blogList);
}
run().then()