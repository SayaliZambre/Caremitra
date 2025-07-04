import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const specialty = searchParams.get("specialty")
    const location = searchParams.get("location")

    const { db } = await connectToDatabase()

    const query: any = {}
    if (specialty) query.specialty = specialty
    if (location) query.location = { $regex: location, $options: "i" }

    const doctors = await db.collection("doctors").find(query).sort({ rating: -1 }).toArray()

    return NextResponse.json({ doctors })
  } catch (error) {
    console.error("Get doctors error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const doctorData = await request.json()

    const { db } = await connectToDatabase()

    const doctor = {
      ...doctorData,
      rating: 0,
      totalReviews: 0,
      createdAt: new Date(),
    }

    const result = await db.collection("doctors").insertOne(doctor)

    return NextResponse.json({
      message: "Doctor profile created successfully",
      doctorId: result.insertedId,
    })
  } catch (error) {
    console.error("Create doctor error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
