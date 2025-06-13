
import { useState } from "react";
import { ArrowLeft, Edit, MapPin, Clock, User, Phone, Mail, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ReportDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [newNote, setNewNote] = useState("");
  const [status, setStatus] = useState("Diproses");

  // Sample report data - in real app this would come from API
  const report = {
    id: id || "RPT001",
    tanggal: "2024-01-15",
    waktu: "14:30",
    jenis: "Darurat",
    kategori: "Kecelakaan",
    lokasi: "Jl. Sudirman No. 123, Jakarta Pusat",
    koordinat: "-6.2088, 106.8456",
    pelapor: "Ahmad Rizki",
    telepon: "081234567890",
    email: "ahmad.rizki@email.com",
    status: "Diproses",
    prioritas: "Tinggi",
    deskripsi: "Kecelakaan lalu lintas melibatkan 2 kendaraan (mobil dan motor). Korban mengalami luka ringan dan telah dibawa ke RS terdekat. Kondisi lalu lintas terganggu, perlu penanganan segera untuk mengatur arus lalu lintas.",
    petugas: "Iptu Budi Hartono",
    unitPenanganan: "Polres Metro Jakarta Pusat - Unit Laka Lantas",
    estimasiSelesai: "2024-01-15 16:00",
    lampiran: [
      { name: "foto_kejadian_1.jpg", size: "2.3 MB", type: "image" },
      { name: "foto_kejadian_2.jpg", size: "1.8 MB", type: "image" },
      { name: "sketsa_lokasi.pdf", size: "456 KB", type: "document" }
    ]
  };

  const timeline = [
    {
      id: 1,
      timestamp: "2024-01-15 14:30",
      action: "Laporan Diterima",
      user: "Sistem",
      description: "Laporan kecelakaan diterima melalui hotline 110"
    },
    {
      id: 2,
      timestamp: "2024-01-15 14:32",
      action: "Verifikasi Laporan",
      user: "Operator Duty",
      description: "Laporan telah diverifikasi dan dikategorikan sebagai darurat"
    },
    {
      id: 3,
      timestamp: "2024-01-15 14:35",
      action: "Penugasan Petugas",
      user: "Iptu Budi Hartono",
      description: "Petugas telah ditugaskan untuk menangani kasus ini"
    },
    {
      id: 4,
      timestamp: "2024-01-15 14:40",
      action: "Petugas di Lokasi",
      user: "Iptu Budi Hartono",
      description: "Petugas telah tiba di lokasi kejadian"
    }
  ];

  const handleUpdateStatus = () => {
    console.log("Updating status to:", status);
    alert(`Status laporan berhasil diupdate menjadi: ${status}`);
  };

  const handleAddNote = () => {
    if (!newNote.trim()) {
      alert("Mohon masukkan catatan");
      return;
    }
    console.log("Adding note:", newNote);
    alert("Catatan berhasil ditambahkan");
    setNewNote("");
  };

  const handleEditReport = () => {
    navigate(`/reports/${id}/edit`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Selesai":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Diproses":
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case "Ditolak":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Diproses":
        return <Badge className="bg-blue-500">Diproses</Badge>;
      case "Selesai":
        return <Badge className="bg-green-500">Selesai</Badge>;
      case "Menunggu":
        return <Badge className="bg-yellow-500">Menunggu</Badge>;
      case "Ditolak":
        return <Badge className="bg-red-500">Ditolak</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (prioritas: string) => {
    switch (prioritas) {
      case "Tinggi":
        return <Badge variant="destructive">Tinggi</Badge>;
      case "Sedang":
        return <Badge variant="secondary">Sedang</Badge>;
      case "Rendah":
        return <Badge variant="outline">Rendah</Badge>;
      default:
        return <Badge>{prioritas}</Badge>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        <Header title="Detail Laporan" />
        
        <main className="p-6">
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="outline" onClick={() => navigate("/reports")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Detail Laporan {report.id}</h1>
                <p className="text-gray-600">Informasi lengkap laporan dan timeline penanganan</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Report Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Informasi Laporan</CardTitle>
                    <Button onClick={handleEditReport}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Laporan
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">ID Laporan</Label>
                      <p className="font-semibold">{report.id}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Tanggal & Waktu</Label>
                      <p className="font-semibold">{report.tanggal} {report.waktu}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Jenis</Label>
                      <p className="font-semibold">{report.jenis}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Kategori</Label>
                      <p className="font-semibold">{report.kategori}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Status</Label>
                      <div className="mt-1">{getStatusBadge(report.status)}</div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Prioritas</Label>
                      <div className="mt-1">{getPriorityBadge(report.prioritas)}</div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-500">Lokasi Kejadian</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <p className="font-semibold">{report.lokasi}</p>
                    </div>
                    <p className="text-sm text-gray-500">Koordinat: {report.koordinat}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-500">Deskripsi Kejadian</Label>
                    <p className="mt-1 text-gray-700">{report.deskripsi}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Reporter Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Pelapor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Nama</Label>
                        <p className="font-semibold">{report.pelapor}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Telepon</Label>
                        <p className="font-semibold">{report.telepon}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Email</Label>
                        <p className="font-semibold">{report.email}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Timeline Penanganan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {timeline.map((item, index) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            {getStatusIcon(item.action)}
                          </div>
                          {index < timeline.length - 1 && (
                            <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold">{item.action}</h4>
                            <span className="text-sm text-gray-500">{item.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{item.description}</p>
                          <p className="text-xs text-gray-500">oleh: {item.user}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Aksi Cepat</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="statusUpdate">Update Status</Label>
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Menunggu">Menunggu</SelectItem>
                        <SelectItem value="Diproses">Diproses</SelectItem>
                        <SelectItem value="Selesai">Selesai</SelectItem>
                        <SelectItem value="Ditolak">Ditolak</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={handleUpdateStatus} className="w-full mt-2">
                      Update Status
                    </Button>
                  </div>

                  <div>
                    <Label htmlFor="newNote">Tambah Catatan</Label>
                    <Textarea
                      id="newNote"
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Masukkan catatan atau update..."
                      rows={3}
                    />
                    <Button onClick={handleAddNote} className="w-full mt-2">
                      Tambah Catatan
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Assignment Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Penugasan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Petugas</Label>
                    <p className="font-semibold">{report.petugas}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Unit</Label>
                    <p className="text-sm">{report.unitPenanganan}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Estimasi Selesai</Label>
                    <p className="text-sm">{report.estimasiSelesai}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Attachments */}
              <Card>
                <CardHeader>
                  <CardTitle>Lampiran</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {report.lampiran.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-gray-500">{file.size}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Lihat
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportDetail;
