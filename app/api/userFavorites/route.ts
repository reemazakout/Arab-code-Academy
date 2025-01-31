import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const fakeDBPath = path.join(process.cwd(), "fakeDB", "db.json");

interface User {
  email: string;
  favorites?: number[];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { success: false, message: "Email is required" },
      { status: 400 }
    );
  }

  try {
    const dbContent = await fs.readFile(fakeDBPath, "utf-8");
    const db = JSON.parse(dbContent);

    const user = db.users.find((user: User) => user.email === email);
    if (!user) {
      console.log("User not found for email:", email);
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      favorites: user.favorites || [],
    });
  } catch (error) {
    console.error("Error reading database:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { success: false, message: "Email is required" },
      { status: 400 }
    );
  }

  try {
    const dbContent = await fs.readFile(fakeDBPath, "utf-8");
    const db = JSON.parse(dbContent);

    const { favorites }: { favorites: number[] } = await request.json();

    if (!Array.isArray(favorites)) {
      return NextResponse.json(
        { success: false, message: "Favorites must be an array of numbers" },
        { status: 400 }
      );
    }

    const userIndex = db.users.findIndex((user: User) => user.email === email);
    if (userIndex === -1) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const currentFavorites = db.users[userIndex].favorites || [];

    let updatedFavorites;

    if (favorites.length > 0) {
      const currentFavoritesSet = new Set<number>(currentFavorites);
      const newFavoritesSet = new Set<number>(favorites);

      const addedFavorites = [...newFavoritesSet].filter(
        (fav) => !currentFavoritesSet.has(fav)
      );

      const removedFavorites = [...currentFavoritesSet].filter(
        (fav) => !newFavoritesSet.has(fav)
      );

      updatedFavorites = Array.from(
        new Set([...currentFavorites, ...addedFavorites])
      );

      updatedFavorites = updatedFavorites.filter(
        (fav) => !removedFavorites.includes(fav)
      );
    } else {
      updatedFavorites = [];
    }

    db.users[userIndex].favorites = updatedFavorites;
    await fs.writeFile(fakeDBPath, JSON.stringify(db, null, 2));

    return NextResponse.json({
      success: true,
      message: "Favorites updated successfully",
      favorites: updatedFavorites,
    });
  } catch (error) {
    console.error("Error updating database:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
