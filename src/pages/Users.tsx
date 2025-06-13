
import { useState } from "react";
import { Search, UserPlus, Edit, Trash2, Shield, User } from "lucide-react";
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

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([
    {
      id: "USR001",
      nama: "Kombes Pol. Ahmad Suryadi",
      nrp: "76050845",
      jabatan: "Kapolda",
      unit: "POLDA Daerah Istimewa Yogyakarta",
      email: "ahmad.suryadi@polri.go.id",
      telepon: "0274-512070",
      status: "Aktif",
      role: "Admin",
      lastLogin: "2024-01-16 09:30"
    },
    {
      id: "USR002",
      nama: "AKBP Siti Fatimah",
      nrp: "78120956",
      jabatan: "Wakapolda",
      unit: "POLDA Daerah Istimewa Yogyakarta",
      email: "siti.fatimah@polri.go.id",
      telepon: "0274-512071",
      status: "Aktif",
      role: "Supervisor",
      lastLogin: "2024-01-16 08:45"
    },
    {
      id: "USR003",
      nama: "Kompol Budi Hartono",
      nrp: "80051067",
      jabatan: "Kapolres Yogyakarta",
      unit: "Polres Yogyakarta",
      email: "budi.hartono@polri.go.id",
      telepon: "0274-512500",
      status: "Aktif",
      role: "Operator",
      lastLogin: "2024-01-16 10:15"
    },
    {
      id: "USR004",
      nama: "AKP Dewi Sartika",
      nrp: "82071178",
      jabatan: "Kapolres Sleman",
      unit: "Polres Sleman",
      email: "dewi.sartika@polri.go.id",
      telepon: "0274-868123",
      status: "Aktif",
      role: "Operator",
      lastLogin: "2024-01-15 16:20"
    },
    {
      id: "USR005",
      nama: "Iptu Rizky Pratama",
      nrp: "85091289",
      jabatan: "Kapolres Bantul",
      unit: "Polres Bantul",
      email: "rizky.pratama@polri.go.id",
      telepon: "0274-367309",
      status: "Non-Aktif",
      role: "User",
      lastLogin: "2024-01-10 14:30"
    }
  ]);

  const getStatusBadge = (status: string) => {
    return status === "Aktif" ? 
      <Badge className="bg-green-500">Aktif</Badge> : 
      <Badge variant="destructive">Non-Aktif</Badge>;
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Admin":
        return <Badge className="bg-red-500"><Shield className="h-3 w-3 mr-1" />Admin</Badge>;
      case "Supervisor":
        return <Badge className="bg-blue-500"><User className="h-3 w-3 mr-1" />Supervisor</Badge>;
      case "Operator":
        return <Badge className="bg-yellow-500"><User className="h-3 w-3 mr-1" />Operator</Badge>;
      case "User":
        return <Badge variant="outline"><User className="h-3 w-3 mr-1" />User</Badge>;
      default:
        return <Badge>{role}</Badge>;
    }
  };

  const handleEditUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      toast({
        title: "Edit Pengguna",
        description: `Membuka form edit untuk ${user.nama}`,
      });
      console.log("Edit user:", user);
    }
  };

  const handleDeleteUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setUsers(users.filter(u => u.id !== userId));
      toast({
        title: "Pengguna Dihapus",
        description: `${user.nama} berhasil dihapus dari sistem.`,
      });
    }
  };

  const filteredUsers = users.filter(user =>
    user.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.nrp.includes(searchTerm) ||
    user.jabatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.unit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        <Header title="Users" />
        
        <main className="p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Manajemen Pengguna</h1>
                <p className="text-gray-600">Kelola pengguna sistem SIMOLA 110</p>
              </div>
              <Button className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Tambah Pengguna
              </Button>
            </div>

            {/* Search Bar */}
            <div className="flex-1 relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari pengguna berdasarkan nama, NRP, jabatan, atau unit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Statistik Pengguna */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Pengguna</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.length}</div>
                <p className="text-xs text-gray-500">Terdaftar</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Pengguna Aktif</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {users.filter(u => u.status === "Aktif").length}
                </div>
                <p className="text-xs text-green-600">Sedang aktif</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Admin</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {users.filter(u => u.role === "Admin").length}
                </div>
                <p className="text-xs text-red-600">Hak akses penuh</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Online Hari Ini</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {users.filter(u => u.lastLogin.includes("2024-01-16")).length}
                </div>
                <p className="text-xs text-blue-600">Login hari ini</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabel Pengguna */}
          <Card>
            <CardHeader>
              <CardTitle>Daftar Pengguna</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>NRP</TableHead>
                    <TableHead>Jabatan</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.nama}</TableCell>
                      <TableCell>{user.nrp}</TableCell>
                      <TableCell>{user.jabatan}</TableCell>
                      <TableCell className="max-w-48 truncate">{user.unit}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell className="text-sm text-gray-500">{user.lastLogin}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditUser(user.id)}
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
                                <AlertDialogTitle>Hapus Pengguna</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Apakah Anda yakin ingin menghapus pengguna {user.nama}? 
                                  Tindakan ini tidak dapat dibatalkan.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Tidak</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteUser(user.id)}>
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
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Users;
