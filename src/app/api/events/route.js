import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

// GET: Ambil semua event
export async function GET() {
  try {
    const events = await prisma.event.findMany();
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Tambah event baru
export async function POST(req) {
  const formData = await req.formData();
  const year = parseInt(formData.get("year"));
  const title = formData.get("title");
  const description = formData.get("description");
  const shortDesc = formData.get("shortDesc");
  const highlights =
    formData
      .get("highlights")
      ?.split(",")
      .map((h) => h.trim()) || [];
  const origin = formData.get("origin");
  const material = formData.get("material");
  const history = formData.get("history");
  const image = formData.get("image");

  if (!title || !description || !shortDesc || !image) {
    return NextResponse.json(
      { error: "Semua field harus diisi" },
      { status: 400 }
    );
  }

  // Upload gambar ke Supabase
  const { data: imgData, error: imgError } = await supabase.storage
    .from("event-images")
    .upload(`images/${Date.now()}_${image.name}`, image, {
      cacheControl: "3600",
      upsert: false,
    });

  if (imgError)
    return NextResponse.json({ error: imgError.message }, { status: 500 });

  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/event-images/${imgData.path}`;

  try {
    const newEvent = await prisma.event.create({
      data: {
        year,
        title,
        description,
        shortDesc,
        highlights,
        origin,
        material,
        history,
        image: imageUrl,
      },
    });

    return NextResponse.json(newEvent);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Hapus event
export async function DELETE(req) {
  const { id, imagePath } = await req.json();

  await supabase.storage.from("event-images").remove([imagePath]);

  await prisma.event.delete({ where: { id } });

  return NextResponse.json({ message: "Event berhasil dihapus" });
}
