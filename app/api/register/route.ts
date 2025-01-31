import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import fs from "fs/promises";
import path from "path";
const fakeDBPath = path.join(process.cwd(), "fakeDB", "db.json");
export async function POST(request: Request) {
  try {
    const objFromFrontEnd = await request.json();

    if (!objFromFrontEnd.email || !objFromFrontEnd.password) {
      return NextResponse.json(
        {
          success: false,
          message: "البريد الإلكتروني وكلمة المرور مطلوبان.",
        },
        { status: 400 }
      );
    }

    const dbContent = await fs.readFile(fakeDBPath, "utf-8");
    const parsedData = JSON.parse(dbContent);

    interface User {
      email: string;
      password: string;
    }

    const userExists = parsedData.users.some(
      (user: User) => user.email === objFromFrontEnd.email
    );
    if (userExists) {
      return NextResponse.json(
        {
          success: false,
          message:
            "البريد الإلكتروني مسجل بالفعل. يرجى استخدام بريد إلكتروني آخر.",
        },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(objFromFrontEnd.password, salt);

    const userWithHashedPassword = {
      ...objFromFrontEnd,
      password: hashedPassword,
    };
    parsedData.users.push(userWithHashedPassword);
    await fs.writeFile(
      fakeDBPath,
      JSON.stringify(parsedData, null, 2),
      "utf-8"
    );
    return NextResponse.json({
      success: true,
      message: "تم حفظ بيانات المستخدم بنجاح في db.json",
      data: objFromFrontEnd,
    });
  } catch (error: unknown) {
    console.error("Error saving user data:", error as Error);
    return NextResponse.json(
      {
        success: false,
        message: "فشل في حفظ بيانات المستخدم في db.json",
        error: (error as Error)?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
