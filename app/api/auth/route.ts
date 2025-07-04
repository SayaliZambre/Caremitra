import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const { email, password, action } = await request.json()
    const { db } = await connectToDatabase()

    if (action === "login") {
      // Login logic
      const user = await db.collection("users").findOne({ email })

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (!isPasswordValid) {
        return NextResponse.json({ error: "Invalid password" }, { status: 401 })
      }

      const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || "fallback-secret", {
        expiresIn: "7d",
      })

      return NextResponse.json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      })
    }

    if (action === "register") {
      // Registration logic
      const existingUser = await db.collection("users").findOne({ email })

      if (existingUser) {
        return NextResponse.json({ error: "User already exists" }, { status: 409 })
      }

      const hashedPassword = await bcrypt.hash(password, 12)

      const result = await db.collection("users").insertOne({
        email,
        password: hashedPassword,
        createdAt: new Date(),
        profile: {
          name: "",
          phone: "",
          dateOfBirth: "",
          medicalHistory: [],
        },
      })

      const token = jwt.sign({ userId: result.insertedId, email }, process.env.JWT_SECRET || "fallback-secret", {
        expiresIn: "7d",
      })

      return NextResponse.json({
        message: "Registration successful",
        token,
        user: {
          id: result.insertedId,
          email,
        },
      })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
