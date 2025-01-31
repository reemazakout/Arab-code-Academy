import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const fakeDBPath = path.join(process.cwd(), "fakeDB", "db.json");

export async function POST(request) {
  try {
    const { userEmail, toolId, isFav } = await request.json();
    if (!userEmail) {
      return NextResponse.json({
        success: false,
        message: "Email address is missing."
      });
    }
    const dbContent = await fs.readFile(fakeDBPath, "utf-8");
    const db = dbContent ? JSON.parse(dbContent) : { users: [], tools: [] };
    const userIndex = db.users.findIndex(user => user.email === userEmail);

    if (userIndex !== -1) {
      const user = db.users[userIndex];
      user.favorites = user.favorites || [];

      if (isFav) {

        if (!user.favorites.includes(toolId)) {
          user.favorites.push(toolId);
        }
      } else {
//remove fav
        user.favorites = user.favorites.filter(id => id !== toolId);
      }


      await fs.writeFile(fakeDBPath, JSON.stringify(db, null, 2), "utf-8");

      return NextResponse.json({
        success: true,
        message: "User's favorite tools updated successfully.",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "User not found."
      });
    }
  } catch (error) {
    console.error("Error updating user favorites:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to update user favorites in db.json",
      error: error.message,
    }, { status: 500 });
  }
}
