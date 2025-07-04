import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    const { db } = await connectToDatabase()

    const appointments = await db
      .collection("appointments")
      .find({ userId: new ObjectId(userId) })
      .sort({ appointmentDate: 1 })
      .toArray()

    return NextResponse.json({ appointments })
  } catch (error) {
    console.error("Get appointments error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, doctorId, appointmentDate, appointmentTime, reason, type } = await request.json()

    const { db } = await connectToDatabase()

    const appointment = {
      userId: new ObjectId(userId),
      doctorId: new ObjectId(doctorId),
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      reason,
      type, // 'in-person' or 'video'
      status: "scheduled",
      createdAt: new Date(),
    }

    const result = await db.collection("appointments").insertOne(appointment)

    return NextResponse.json({
      message: "Appointment booked successfully",
      appointmentId: result.insertedId,
    })
  } catch (error) {
    console.error("Book appointment error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { appointmentId, status } = await request.json()

    const { db } = await connectToDatabase()

    await db.collection("appointments").updateOne(
      { _id: new ObjectId(appointmentId) },
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      },
    )

    return NextResponse.json({ message: "Appointment updated successfully" })
  } catch (error) {
    console.error("Update appointment error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
