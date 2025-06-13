import { useState } from "react";
import { Search, Download, Eye, Edit, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";

const Reports = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [reports, setReports] = useState([
    {
      id: "RPT001",
      tanggal: "2024-01-15",
      waktu: "14:30",
      jenis: "Darurat",
      kategori: "Kecelakaan",
      lokasi: "Jl. Malioboro No. 123, Yogyakarta",
      pelapor: "Ahmad Rizki",
      status: "Diproses",
      prioritas: "Tinggi",
      deskripsi: "Kecelakaan lalu lintas melibatkan 2 kendaraan"
    },
    {
      id: "RPT002",
      tanggal: "2024-01-15",
      waktu: "15:45",
      jenis: "Kriminal",
      kategori: "Pencurian",
      lokasi: "Jl. Kaliurang No. 45, Sleman",
      pelapor: "Siti Nurhaliza",
      status: "Selesai",
      prioritas: "Sedang",
      deskripsi: "Pencurian motor di depan minimarket"
    },
    {
      id: "RPT003",
      tanggal: "2024-01-15",
      waktu: "16:20",
      jenis: "Informasi",
      kategori: "Gangguan",
      lokasi: "Jl. Parangtritis No. 78, Bantul",
      pelapor: "Budi Santoso",
      status: "Menunggu",
      prioritas: "Rendah",
      deskripsi: "Gangguan ketertiban umum"
    },
    {
      id: "RPT004",
      tanggal: "2024-01-16",
      waktu: "08:15",
      jenis: "Darurat",
      kategori: "Kebakaran",
      lokasi: "Jl. Sultan Agung No. 90, Yogyakarta",
      pelapor: "Dewi Sartika",
      status: "Diproses",
      prioritas: "Tinggi",
      deskripsi: "Kebakaran rumah warga"
    },
    {
      id: "RPT005",
      tanggal: "2024-01-16",
      waktu: "10:30",
      jenis: "Kriminal",
      kategori: "Penipuan",
      lokasi: "Jl. Wates No. 34, Kulon Progo",
      pelapor: "Andi Wijaya",
      status: "Ditolak",
      prioritas: "Sedang",
      deskripsi: "Laporan penipuan online"
    }
  ]);

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

  const handleViewReport = (reportId: string) => {
    navigate(`/reports/${reportId}`);
  };

  const handleEditReport = (reportId: string) => {
    navigate(`/reports/${reportId}/edit`);
  };

  const handleDeleteReport = (reportId: string) => {
    setReports(reports.filter(report => report.id !== reportId));
    toast({
      title: "Laporan Dihapus",
      description: `Laporan ${reportId} berhasil dihapus.`,
    });
  };

  const handleExportReports = () => {
    // Create PDF content
    const reportData = filteredReports.map(report => 
      `${report.id} | ${report.tanggal} ${report.waktu} | ${report.jenis} | ${report.kategori} | ${report.pelapor} | ${report.lokasi} | ${report.status}`
    ).join('\n');

    const pdfContent = `
LAPORAN SIMOLA 110
POLDA DAERAH ISTIMEWA YOGYAKARTA
Generated: ${new Date().toLocaleDateString('id-ID')}

Total Laporan: ${filteredReports.length}

ID | Tanggal/Waktu | Jenis | Kategori | Pelapor | Lokasi | Status
${reportData}
    `;

    // Create and download file
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `laporan-simola110-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Berhasil",
      description: "File laporan berhasil diunduh.",
    });
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.pelapor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.kategori.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.lokasi.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === "all" || report.jenis.toLowerCase() === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredReports.length / 5);
  const startIndex = (currentPage - 1) * 5;
  const paginatedReports = filteredReports.slice(startIndex, startIndex + 5);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        <Header title="Reports" />
        
        <main className="p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Laporan</h1>
                <p className="text-gray-600">Kelola dan pantau semua laporan masuk</p>
              </div>
              <Button className="flex items-center gap-2" onClick={() => navigate("/reports/add")}>
                <Plus className="h-4 w-4" />
                Tambah Laporan
              </Button>
            </div>

            {/* Filter dan Search */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Cari laporan berdasarkan ID, pelapor, kategori, atau lokasi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedFilter === "all" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("all")}
                  size="sm"
                >
                  Semua
                </Button>
                <Button
                  variant={selectedFilter === "darurat" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("darurat")}
                  size="sm"
                >
                  Darurat
                </Button>
                <Button
                  variant={selectedFilter === "kriminal" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("kriminal")}
                  size="sm"
                >
                  Kriminal
                </Button>
                <Button
                  variant={selectedFilter === "informasi" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("informasi")}
                  size="sm"
                >
                  Informasi
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportReports}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>

          {/* Statistik Ringkas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Laporan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reports.length}</div>
                <p className="text-xs text-green-600">+12% dari minggu lalu</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Diproses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {reports.filter(r => r.status === "Diproses").length}
                </div>
                <p className="text-xs text-blue-600">Sedang ditangani</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Selesai</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {reports.filter(r => r.status === "Selesai").length}
                </div>
                <p className="text-xs text-green-600">Sudah diselesaikan</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Menunggu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {reports.filter(r => r.status === "Menunggu").length}
                </div>
                <p className="text-xs text-yellow-600">Belum diproses</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabel Laporan */}
          <Card>
            <CardHeader>
              <CardTitle>Daftar Laporan</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Laporan</TableHead>
                    <TableHead>Tanggal/Waktu</TableHead>
                    <TableHead>Jenis</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Pelapor</TableHead>
                    <TableHead>Lokasi</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Prioritas</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.id}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{report.tanggal}</div>
                          <div className="text-gray-500">{report.waktu}</div>
                        </div>
                      </TableCell>
                      <TableCell>{report.jenis}</TableCell>
                      <TableCell>{report.kategori}</TableCell>
                      <TableCell>{report.pelapor}</TableCell>
                      <TableCell className="max-w-48 truncate">{report.lokasi}</TableCell>
                      <TableCell>{getStatusBadge(report.status)}</TableCell>
                      <TableCell>{getPriorityBadge(report.prioritas)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewReport(report.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditReport(report.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Hapus Laporan</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Apakah Anda yakin ingin menghapus laporan {report.id}? 
                                  Tindakan ini tidak dapat dibatalkan.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Tidak</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteReport(report.id)}>
                                  Ya, Hapus
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#" 
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, i) => (
                      <PaginationItem key={i + 1}>
                        <PaginationLink 
                          href="#" 
                          isActive={currentPage === i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext 
                        href="#"
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Reports;
