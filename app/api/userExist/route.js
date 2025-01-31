import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
const fakeDBPath = path.join(process.cwd(), "fakeDB", "db.json");
export async function POST(request) {
    const  {email}  = await request.json();
    console.log("***** IS USER EXIT ?******" );
    console.log("Email received from front-end:", email);
    const dbContent = await fs.readFile(fakeDBPath, "utf-8");
    const parsedData = dbContent ? JSON.parse(dbContent) : { users: [] };
    const emailExists = parsedData.users.some((user) => user.email === email);
    if (emailExists) {
      console.log("Email exists in the database:", email);
    } else {
      console.log("Email not found in the database.");
    }
    return NextResponse.json({ 
      
      exists: emailExists });

}