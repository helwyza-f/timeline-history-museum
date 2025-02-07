import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Sesuaikan dengan path Prisma instance

export async function GET(req, { params }) {
  const { id } = await params;

  try {
    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Event tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = await params;
  const formData = await req.formData();

  const highlights =
    formData
      .get("highlights")
      ?.split(",")
      .map((h) => h.trim()) || [];

  try {
    const updatedEvent = await prisma.event.update({
      where: { id: parseInt(id) },
      data: {
        title: formData.get("title"),
        description: formData.get("description"),
        shortDesc: formData.get("shortDesc"),
        highlights: highlights,
        origin: formData.get("origin"),
        material: formData.get("material"),
        history: formData.get("history"),
      },
    });

    return NextResponse.json(updatedEvent);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
