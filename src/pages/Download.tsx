import { useState } from "react";
import { Calendar, Download as DownloadIcon, FileText, FileSpreadsheet, Filter } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

const Download = () => {
  const [filterPeriod, setFilterPeriod] = useState("monthly");
  const [filterFormat, setFilterFormat] = useState("pdf");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const reportTypes = [
    {
      id: "summary",
      name: "Laporan Ringkasan",
      description: "Ringkasan laporan berdasarkan periode yang dipilih",
      icon: FileText,
      available: true
    },
    {
      id: "detailed",
      name: "Laporan Detail",
      description: "Laporan lengkap dengan semua informasi laporan",
      icon: FileText,
      available: true
    },
    {
      id: "statistics",
      name: "Laporan Statistik",
      description: "Grafik dan analisis data laporan",
      icon: FileSpreadsheet,
      available: true
    },
    {
      id: "users",
      name: "Laporan Pengguna",
      description: "Data aktivitas dan performa pengguna",
      icon: FileText,
      available: false
    }
  ];

  const recentDownloads = [
    {
      id: 1,
      name: "Laporan Bulanan DIY - Januari 2024",
      type: "PDF",
      size: "3.2 MB",
      date: "2024-01-16 10:30",
      status: "Completed"
    },
    {
      id: 2,
      name: "Statistik Laporan DIY - Q4 2023",
      type: "Excel",
      size: "2.1 MB", 
      date: "2024-01-15 14:20",
      status: "Completed"
    },
    {
      id: 3,
      name: "Laporan Detail DIY - Desember 2023",
      type: "PDF",
      size: "5.8 MB",
      date: "2024-01-14 09:15",
      status: "Processing"
    }
  ];

  const handleDownload = (reportType: string) => {
    console.log(`Downloading ${reportType} report...`);
    
    // Validate date range if custom period is selected
    if (filterPeriod === "custom" && (!startDate || !endDate)) {
      toast({
        title: "Error",
        description: "Silakan pilih tanggal mulai dan tanggal akhir untuk periode custom.",
        variant: "destructive",
      });
      return;
    }

    // Simulate download process
    toast({
      title: "Download Dimulai",
      description: `Mengunduh laporan ${reportType} dalam format ${filterFormat.toUpperCase()}...`,
    });

    // Simulate file generation and download
    setTimeout(() => {
      const fileName = `laporan_${reportType}_${format(new Date(), 'yyyy-MM-dd')}.${filterFormat}`;
      const blob = new Blob([`Sample ${reportType} report content`], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Download Selesai",
        description: `File ${fileName} berhasil diunduh.`,
      });
    }, 2000);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        <Header title="Download Reports" />
        
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Download Laporan</h1>
            <p className="text-gray-600">Filter laporan berdasarkan periode dan unduh dalam format PDF atau Excel untuk POLDA DIY.</p>
          </div>

          {/* Filter Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filter Laporan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="period">Periode</Label>
                  <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih periode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Mingguan</SelectItem>
                      <SelectItem value="monthly">Bulanan</SelectItem>
                      <SelectItem value="yearly">Tahunan</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="format">Format</Label>
                  <Select value={filterFormat} onValueChange={setFilterFormat}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="startDate">Tanggal Mulai</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground",
                          filterPeriod !== "custom" && "opacity-50"
                        )}
                        disabled={filterPeriod !== "custom"}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "dd/MM/yyyy") : "Pilih tanggal"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label htmlFor="endDate">Tanggal Akhir</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground",
                          filterPeriod !== "custom" && "opacity-50"
                        )}
                        disabled={filterPeriod !== "custom"}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "dd/MM/yyyy") : "Pilih tanggal"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Report Types */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {reportTypes.map((report) => {
              const Icon = report.icon;
              return (
                <Card key={report.id} className={`${!report.available ? 'opacity-50' : ''}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5" />
                        {report.name}
                      </div>
                      {!report.available && (
                        <Badge variant="secondary">Tidak Tersedia</Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{report.description}</p>
                    <Button 
                      onClick={() => handleDownload(report.id)}
                      disabled={!report.available}
                      className="w-full"
                    >
                      <DownloadIcon className="h-4 w-4 mr-2" />
                      Download {filterFormat.toUpperCase()}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Recent Downloads */}
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Download</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDownloads.map((download) => (
                  <div key={download.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-blue-500" />
                      <div>
                        <h4 className="font-medium">{download.name}</h4>
                        <p className="text-sm text-gray-500">
                          {download.type} • {download.size} • {download.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={download.status === "Completed" ? "default" : "secondary"}>
                        {download.status === "Completed" ? "Selesai" : "Proses"}
                      </Badge>
                      {download.status === "Completed" && (
                        <Button variant="outline" size="sm">
                          <DownloadIcon className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Download;
