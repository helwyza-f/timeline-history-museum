"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function EditEventPage() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    shortDesc: "",
    highlights: "",
    origin: "",
    material: "",
    history: "",
  });

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    const res = await fetch(`/api/events/${id}`);
    const data = await res.json();

    if (data.error) {
      alert("Event tidak ditemukan!");
      router.push("/admin");
      return;
    }

    setFormData({
      title: data.title,
      description: data.description,
      shortDesc: data.shortDesc,
      highlights: data.highlights.join(", "), // Ubah array jadi string
      origin: data.origin || "",
      material: data.material || "",
      history: data.history || "",
    });
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      form.append(key, value || "")
    );

    const res = await fetch(`/api/events/${id}`, {
      method: "PUT",
      body: form,
    });

    if (res.ok) {
      router.push("/admin");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-center text-2xl font-bold mb-4">Edit Event</h2>
      <form onSubmit={handleUpdateEvent} className="grid gap-4">
        <div>
          <Label>Judul</Label>
          <Input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>

        <div>
          <Label>Deskripsi</Label>
          <Textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        <div>
          <Label>Deskripsi Singkat</Label>
          <Input
            type="text"
            value={formData.shortDesc}
            onChange={(e) =>
              setFormData({ ...formData, shortDesc: e.target.value })
            }
          />
        </div>

        <div>
          <Label>Highlights (Pisahkan dengan koma)</Label>
          <Input
            type="text"
            value={formData.highlights}
            onChange={(e) =>
              setFormData({ ...formData, highlights: e.target.value })
            }
          />
        </div>

        <div>
          <Label>Asal (Opsional)</Label>
          <Input
            type="text"
            value={formData.origin}
            onChange={(e) =>
              setFormData({ ...formData, origin: e.target.value })
            }
          />
        </div>

        <div>
          <Label>Material (Opsional)</Label>
          <Input
            type="text"
            value={formData.material}
            onChange={(e) =>
              setFormData({ ...formData, material: e.target.value })
            }
          />
        </div>

        <div>
          <Label>Sejarah (Opsional)</Label>
          <Textarea
            value={formData.history}
            onChange={(e) =>
              setFormData({ ...formData, history: e.target.value })
            }
          />
        </div>

        <Button type="submit" className="w-full">
          Simpan Perubahan
        </Button>
      </form>
    </div>
  );
}
