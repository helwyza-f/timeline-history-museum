"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
export default function AdminPage() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    year: "",
    title: "",
    description: "",
    shortDesc: "",
    highlights: "",
    origin: "",
    material: "",
    history: "",
    image: null,
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await fetch("/api/events");
    const data = await res.json();
    setEvents(data);
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      form.append(key, value || "")
    );

    const res = await fetch("/api/events", {
      method: "POST",
      body: form,
    });

    if (res.ok) {
      fetchEvents();
      setFormData({
        year: "",
        title: "",
        description: "",
        shortDesc: "",
        highlights: "",
        origin: "",
        material: "",
        history: "",
        image: null,
      });
    }
  };

  const handleDeleteEvent = async (id, imagePath) => {
    await fetch("/api/events", {
      method: "DELETE",
      body: JSON.stringify({ id, imagePath }),
    });

    fetchEvents();
  };

  const handleLogout = () => {
    document.cookie = "auth_token=; path=/; max-age=0"; // Hapus cookie
    router.push("/login");
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            List Event
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Gambar</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>Tahun</TableHead>
                <TableHead>Deskripsi Singkat</TableHead>
                <TableHead>Asal</TableHead>
                <TableHead>Material</TableHead>
                <TableHead>Sejarah</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{event.year}</TableCell>
                  <TableCell>{event.shortDesc}</TableCell>
                  <TableCell>{event.origin || "-"}</TableCell>
                  <TableCell>{event.material || "-"}</TableCell>
                  <TableCell>{event.history || "-"}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => router.push(`/admin/edit/${event.id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteEvent(event.id, event.image)}
                      >
                        Hapus
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Tambah Event
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddEvent} className="grid gap-4">
            <div>
              <Label>Tahun</Label>
              <Input
                type="number"
                placeholder="Masukkan Tahun"
                required
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Judul</Label>
              <Input
                type="text"
                placeholder="Masukkan Judul"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Deskripsi</Label>
              <Textarea
                placeholder="Deskripsi Event"
                required
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
                placeholder="Deskripsi Singkat"
                required
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
                placeholder="Contoh: Highlight1, Highlight2"
                required
                value={formData.highlights}
                onChange={(e) =>
                  setFormData({ ...formData, highlights: e.target.value })
                }
              />
            </div>

            {/* Input untuk kolom opsional */}
            <div>
              <Label>Asal (Opsional)</Label>
              <Input
                type="text"
                placeholder="Asal Event (Opsional)"
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
                placeholder="Material Event (Opsional)"
                value={formData.material}
                onChange={(e) =>
                  setFormData({ ...formData, material: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Sejarah (Opsional)</Label>
              <Textarea
                type="text"
                placeholder="Sejarah (Opsional)"
                value={formData.history}
                onChange={(e) =>
                  setFormData({ ...formData, history: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Gambar</Label>
              <Input
                type="file"
                required
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.files[0] })
                }
              />
            </div>

            <Button type="submit" className="w-full">
              Tambah Event
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="flex justify-center mt-4">
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
}
