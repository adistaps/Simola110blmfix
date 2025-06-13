import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const Statistics = () => {
  // Data untuk grafik laporan per bulan di DIY
  const monthlyData = [
    { bulan: "Jan", darurat: 52, kriminal: 89, informasi: 156 },
    { bulan: "Feb", darurat: 61, kriminal: 76, informasi: 178 },
    { bulan: "Mar", darurat: 45, kriminal: 98, informasi: 189 },
    { bulan: "Apr", darurat: 58, kriminal: 82, informasi: 167 },
    { bulan: "May", darurat: 49, kriminal: 105, informasi: 201 },
    { bulan: "Jun", darurat: 67, kriminal: 91, informasi: 183 }
  ];

  // Data untuk pie chart kategori laporan di DIY
  const categoryData = [
    { name: "Kecelakaan", value: 189, color: "#ef4444" },
    { name: "Pencurian", value: 267, color: "#f97316" },
    { name: "Kebakaran", value: 78, color: "#eab308" },
    { name: "Gangguan", value: 203, color: "#22c55e" },
    { name: "Penipuan", value: 145, color: "#3b82f6" },
    { name: "Lainnya", value: 89, color: "#8b5cf6" }
  ];

  // Data untuk trend waktu respons
  const responseTimeData = [
    { waktu: "00:00", avgResponse: 9.2 },
    { waktu: "06:00", avgResponse: 7.1 },
    { waktu: "12:00", avgResponse: 11.5 },
    { waktu: "18:00", avgResponse: 13.8 },
    { waktu: "24:00", avgResponse: 8.9 }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        <Header title="Statistics" />
        
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Statistik & Analitik</h1>
            <p className="text-gray-600">Dashboard analisis data laporan SIMOLA 110 - POLDA DIY</p>
          </div>

          {/* Ringkasan Statistik */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Laporan DIY</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,156</div>
                <p className="text-xs text-green-600">+15.3% dari bulan lalu</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Rata-rata Respons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">9.1 min</div>
                <p className="text-xs text-blue-600">-1.8 min dari target</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Tingkat Penyelesaian</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">96.2%</div>
                <p className="text-xs text-green-600">+2.1% dari bulan lalu</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Laporan Darurat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">346</div>
                <p className="text-xs text-red-600">16.0% dari total</p>
              </CardContent>
            </Card>
          </div>

          {/* Grafik Utama */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Laporan per Bulan */}
            <Card>
              <CardHeader>
                <CardTitle>Trend Laporan Bulanan DIY</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="bulan" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="darurat" fill="#ef4444" name="Darurat" />
                    <Bar dataKey="kriminal" fill="#f97316" name="Kriminal" />
                    <Bar dataKey="informasi" fill="#22c55e" name="Informasi" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Distribusi Kategori */}
            <Card>
              <CardHeader>
                <CardTitle>Distribusi Kategori Laporan DIY</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Grafik Sekunder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Waktu Respons */}
            <Card>
              <CardHeader>
                <CardTitle>Trend Waktu Respons DIY (24 Jam)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={responseTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="waktu" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="avgResponse" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      name="Rata-rata Respons (menit)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Tabel Statistik Detail */}
            <Card>
              <CardHeader>
                <CardTitle>Statistik Detail DIY</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Laporan Terselesaikan Hari Ini</span>
                    <span className="font-semibold">62</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Laporan Dalam Proses</span>
                    <span className="font-semibold">31</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Laporan Menunggu</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Petugas Aktif DIY</span>
                    <span className="font-semibold">189</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Waktu Respons Tercepat</span>
                    <span className="font-semibold">3.1 min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Lokasi Laporan Terbanyak</span>
                    <span className="font-semibold">Kota Yogyakarta</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabel Ranking Lokasi DIY */}
          <Card>
            <CardHeader>
              <CardTitle>Top 10 Lokasi Laporan DIY</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  {[
                    { lokasi: "Jl. Malioboro", jumlah: 67 },
                    { lokasi: "Jl. Kaliurang", jumlah: 54 },
                    { lokasi: "Jl. Parangtritis", jumlah: 48 },
                    { lokasi: "Jl. Sultan Agung", jumlah: 42 },
                    { lokasi: "Jl. Wates", jumlah: 38 }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{index + 1}. {item.lokasi}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${(item.jumlah / 67) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold w-8">{item.jumlah}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  {[
                    { lokasi: "Jl. Bantul", jumlah: 35 },
                    { lokasi: "Jl. Wonosari", jumlah: 32 },
                    { lokasi: "Jl. Magelang", jumlah: 29 },
                    { lokasi: "Jl. Imogiri", jumlah: 26 },
                    { lokasi: "Jl. Godean", jumlah: 23 }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{index + 6}. {item.lokasi}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${(item.jumlah / 67) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold w-8">{item.jumlah}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Statistics;
