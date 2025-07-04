import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    const { db } = await connectToDatabase()

    const records = await db
      .collection("medicalRecords")
      .find({ userId: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json({ records })
  } catch (error) {
    console.error("Get medical records error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, recordType, title, description, doctorName, hospitalName, date, attachments, vitals } =
      await request.json()

    const { db } = await connectToDatabase()

    const record = {
      userId: new ObjectId(userId),
      recordType, // 'lab-result', 'prescription', 'diagnosis', 'vitals'
      title,
      description,
      doctorName,
      hospitalName,
      date: new Date(date),
      attachments: attachments || [],
      vitals: vitals || {},
      createdAt: new Date(),
    }

    const result = await db.collection("medicalRecords").insertOne(record)

    return NextResponse.json({
      message: "Medical record added successfully",
      recordId: result.insertedId,
    })
  } catch (error) {
    console.error("Add medical record error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
