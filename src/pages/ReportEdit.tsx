
import { useState } from "react";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ReportEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [reportData, setReportData] = useState({
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
  });

  const [attachments, setAttachments] = useState([
    { id: 1, name: "foto_kejadian_1.jpg", size: "2.3 MB", type: "image" },
    { id: 2, name: "foto_kejadian_2.jpg", size: "1.8 MB", type: "image" },
    { id: 3, name: "sketsa_lokasi.pdf", size: "456 KB", type: "document" }
  ]);

  const handleInputChange = (field: string, value: string) => {
    setReportData({ ...reportData, [field]: value });
  };

  const handleSave = () => {
    console.log("Saving report:", reportData);
    alert("Laporan berhasil diperbarui!");
    navigate(`/reports/${id}`);
  };

  const handleCancel = () => {
    navigate(`/reports/${id}`);
  };

  const handleRemoveAttachment = (attachmentId: number) => {
    setAttachments(attachments.filter(att => att.id !== attachmentId));
  };

  const handleAddAttachment = () => {
    // Simulate file upload
    const newAttachment = {
      id: Date.now(),
      name: "new_file.jpg",
      size: "1.5 MB",
      type: "image"
    };
    setAttachments([...attachments, newAttachment]);
    alert("File berhasil ditambahkan!");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        <Header title="Edit Laporan" />
        
        <main className="p-6">
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="outline" onClick={handleCancel}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Laporan {reportData.id}</h1>
                <p className="text-gray-600">Perbarui informasi laporan dan data terkait</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Dasar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tanggal">Tanggal Kejadian</Label>
                      <Input
                        id="tanggal"
                        type="date"
                        value={reportData.tanggal}
                        onChange={(e) => handleInputChange('tanggal', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="waktu">Waktu Kejadian</Label>
                      <Input
                        id="waktu"
                        type="time"
                        value={reportData.waktu}
                        onChange={(e) => handleInputChange('waktu', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="jenis">Jenis Laporan</Label>
                      <Select value={reportData.jenis} onValueChange={(value) => handleInputChange('jenis', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Darurat">Darurat</SelectItem>
                          <SelectItem value="Kriminal">Kriminal</SelectItem>
                          <SelectItem value="Informasi">Informasi</SelectItem>
                          <SelectItem value="Keluhan">Keluhan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="kategori">Kategori</Label>
                      <Select value={reportData.kategori} onValueChange={(value) => handleInputChange('kategori', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Kecelakaan">Kecelakaan</SelectItem>
                          <SelectItem value="Pencurian">Pencurian</SelectItem>
                          <SelectItem value="Kebakaran">Kebakaran</SelectItem>
                          <SelectItem value="Gangguan">Gangguan Ketertiban</SelectItem>
                          <SelectItem value="Penipuan">Penipuan</SelectItem>
                          <SelectItem value="Lainnya">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="lokasi">Lokasi Kejadian</Label>
                    <Input
                      id="lokasi"
                      value={reportData.lokasi}
                      onChange={(e) => handleInputChange('lokasi', e.target.value)}
                      placeholder="Alamat lengkap lokasi kejadian"
                    />
                  </div>

                  <div>
                    <Label htmlFor="koordinat">Koordinat (Latitude, Longitude)</Label>
                    <Input
                      id="koordinat"
                      value={reportData.koordinat}
                      onChange={(e) => handleInputChange('koordinat', e.target.value)}
                      placeholder="-6.2088, 106.8456"
                    />
                  </div>

                  <div>
                    <Label htmlFor="deskripsi">Deskripsi Kejadian</Label>
                    <Textarea
                      id="deskripsi"
                      value={reportData.deskripsi}
                      onChange={(e) => handleInputChange('deskripsi', e.target.value)}
                      rows={4}
                      placeholder="Jelaskan detail kejadian yang dilaporkan"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Reporter Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Pelapor</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pelapor">Nama Pelapor</Label>
                      <Input
                        id="pelapor"
                        value={reportData.pelapor}
                        onChange={(e) => handleInputChange('pelapor', e.target.value)}
                        placeholder="Nama lengkap pelapor"
                      />
                    </div>
                    <div>
                      <Label htmlFor="telepon">Nomor Telepon</Label>
                      <Input
                        id="telepon"
                        value={reportData.telepon}
                        onChange={(e) => handleInputChange('telepon', e.target.value)}
                        placeholder="081234567890"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email (Opsional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={reportData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="email@example.com"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Attachments */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Lampiran</CardTitle>
                    <Button onClick={handleAddAttachment} variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Tambah File
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {attachments.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-gray-500">{file.size}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRemoveAttachment(file.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {attachments.length === 0 && (
                      <p className="text-gray-500 text-center py-4">Belum ada lampiran</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status & Priority */}
              <Card>
                <CardHeader>
                  <CardTitle>Status & Prioritas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={reportData.status} onValueChange={(value) => handleInputChange('status', value)}>
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
                  </div>

                  <div>
                    <Label htmlFor="prioritas">Prioritas</Label>
                    <Select value={reportData.prioritas} onValueChange={(value) => handleInputChange('prioritas', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tinggi">Tinggi</SelectItem>
                        <SelectItem value="Sedang">Sedang</SelectItem>
                        <SelectItem value="Rendah">Rendah</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Assignment */}
              <Card>
                <CardHeader>
                  <CardTitle>Penugasan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="petugas">Petugas Penanganan</Label>
                    <Select value={reportData.petugas} onValueChange={(value) => handleInputChange('petugas', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Iptu Budi Hartono">Iptu Budi Hartono</SelectItem>
                        <SelectItem value="Ipda Dewi Sartika">Ipda Dewi Sartika</SelectItem>
                        <SelectItem value="Aiptu Rizky Pratama">Aiptu Rizky Pratama</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="unitPenanganan">Unit Penanganan</Label>
                    <Input
                      id="unitPenanganan"
                      value={reportData.unitPenanganan}
                      onChange={(e) => handleInputChange('unitPenanganan', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="estimasiSelesai">Estimasi Selesai</Label>
                    <Input
                      id="estimasiSelesai"
                      type="datetime-local"
                      value={reportData.estimasiSelesai}
                      onChange={(e) => handleInputChange('estimasiSelesai', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Aksi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button onClick={handleSave} className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Simpan Perubahan
                  </Button>
                  <Button onClick={handleCancel} variant="outline" className="w-full">
                    Batal
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportEdit;
