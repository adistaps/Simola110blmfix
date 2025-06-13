
import { useState } from "react";
import { Settings as SettingsIcon, Bell, Shield, Monitor, Database, Users, Mail } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: true,
    smsAlerts: false,
    weeklyReport: true,
    urgentOnly: false,
  });

  const [systemSettings, setSystemSettings] = useState({
    autoLogout: "30",
    sessionTimeout: "120",
    maxLoginAttempts: "3",
    passwordPolicy: "strong",
    twoFactorAuth: false,
  });

  const [displaySettings, setDisplaySettings] = useState({
    theme: "light",
    language: "id",
    timezone: "Asia/Jakarta",
    dateFormat: "DD/MM/YYYY",
    itemsPerPage: "10",
  });

  const handleSaveSettings = (section: string) => {
    console.log(`Saving ${section} settings...`);
    alert(`Pengaturan ${section} berhasil disimpan!`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        <Header title="Settings" />
        
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Pengaturan Sistem</h1>
            <p className="text-gray-600">Konfigurasi sistem dan preferensi aplikasi SIMOLA 110</p>
          </div>

          <div className="space-y-6">
            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Pengaturan Notifikasi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Alert</Label>
                        <p className="text-sm text-gray-500">Terima notifikasi melalui email</p>
                      </div>
                      <Switch
                        checked={notifications.emailAlerts}
                        onCheckedChange={(checked) => 
                          setNotifications({...notifications, emailAlerts: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-gray-500">Notifikasi langsung di browser</p>
                      </div>
                      <Switch
                        checked={notifications.pushNotifications}
                        onCheckedChange={(checked) => 
                          setNotifications({...notifications, pushNotifications: checked})
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>SMS Alert</Label>
                        <p className="text-sm text-gray-500">Notifikasi via SMS</p>
                      </div>
                      <Switch
                        checked={notifications.smsAlerts}
                        onCheckedChange={(checked) => 
                          setNotifications({...notifications, smsAlerts: checked})
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Laporan Mingguan</Label>
                        <p className="text-sm text-gray-500">Ringkasan laporan setiap minggu</p>
                      </div>
                      <Switch
                        checked={notifications.weeklyReport}
                        onCheckedChange={(checked) => 
                          setNotifications({...notifications, weeklyReport: checked})
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Hanya Laporan Darurat</Label>
                        <p className="text-sm text-gray-500">Notifikasi khusus laporan darurat</p>
                      </div>
                      <Switch
                        checked={notifications.urgentOnly}
                        onCheckedChange={(checked) => 
                          setNotifications({...notifications, urgentOnly: checked})
                        }
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button onClick={() => handleSaveSettings('notifikasi')}>
                    Simpan Pengaturan Notifikasi
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Pengaturan Keamanan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="autoLogout">Auto Logout (menit)</Label>
                      <Select 
                        value={systemSettings.autoLogout} 
                        onValueChange={(value) => setSystemSettings({...systemSettings, autoLogout: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 menit</SelectItem>
                          <SelectItem value="30">30 menit</SelectItem>
                          <SelectItem value="60">1 jam</SelectItem>
                          <SelectItem value="120">2 jam</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="sessionTimeout">Session Timeout (menit)</Label>
                      <Input
                        id="sessionTimeout"
                        value={systemSettings.sessionTimeout}
                        onChange={(e) => setSystemSettings({...systemSettings, sessionTimeout: e.target.value})}
                        type="number"
                      />
                    </div>

                    <div>
                      <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                      <Select 
                        value={systemSettings.maxLoginAttempts} 
                        onValueChange={(value) => setSystemSettings({...systemSettings, maxLoginAttempts: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 kali</SelectItem>
                          <SelectItem value="5">5 kali</SelectItem>
                          <SelectItem value="10">10 kali</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="passwordPolicy">Password Policy</Label>
                      <Select 
                        value={systemSettings.passwordPolicy} 
                        onValueChange={(value) => setSystemSettings({...systemSettings, passwordPolicy: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic (8 karakter)</SelectItem>
                          <SelectItem value="strong">Strong (8+ dengan angka & simbol)</SelectItem>
                          <SelectItem value="complex">Complex (12+ dengan kombinasi)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-500">Keamanan tambahan dengan 2FA</p>
                      </div>
                      <Switch
                        checked={systemSettings.twoFactorAuth}
                        onCheckedChange={(checked) => 
                          setSystemSettings({...systemSettings, twoFactorAuth: checked})
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button onClick={() => handleSaveSettings('keamanan')}>
                    Simpan Pengaturan Keamanan
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Display Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Pengaturan Tampilan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="theme">Theme</Label>
                      <Select 
                        value={displaySettings.theme} 
                        onValueChange={(value) => setDisplaySettings({...displaySettings, theme: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="auto">Auto (System)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="language">Bahasa</Label>
                      <Select 
                        value={displaySettings.language} 
                        onValueChange={(value) => setDisplaySettings({...displaySettings, language: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="id">Bahasa Indonesia</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select 
                        value={displaySettings.timezone} 
                        onValueChange={(value) => setDisplaySettings({...displaySettings, timezone: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Asia/Jakarta">Asia/Jakarta (WIB)</SelectItem>
                          <SelectItem value="Asia/Makassar">Asia/Makassar (WITA)</SelectItem>
                          <SelectItem value="Asia/Jayapura">Asia/Jayapura (WIT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="dateFormat">Format Tanggal</Label>
                      <Select 
                        value={displaySettings.dateFormat} 
                        onValueChange={(value) => setDisplaySettings({...displaySettings, dateFormat: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="itemsPerPage">Items per Page</Label>
                      <Select 
                        value={displaySettings.itemsPerPage} 
                        onValueChange={(value) => setDisplaySettings({...displaySettings, itemsPerPage: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="20">20</SelectItem>
                          <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button onClick={() => handleSaveSettings('tampilan')}>
                    Simpan Pengaturan Tampilan
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* System Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Manajemen Sistem
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Backup Database</h4>
                      <p className="text-sm text-gray-500 mb-3">Backup otomatis setiap hari pada pukul 02:00</p>
                      <Button variant="outline">
                        <Database className="h-4 w-4 mr-2" />
                        Backup Sekarang
                      </Button>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Clear Cache</h4>
                      <p className="text-sm text-gray-500 mb-3">Hapus cache sistem untuk meningkatkan performa</p>
                      <Button variant="outline">
                        Clear System Cache
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">System Logs</h4>
                      <p className="text-sm text-gray-500 mb-3">Unduh log sistem untuk analisis</p>
                      <Button variant="outline">
                        Download Logs
                      </Button>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">User Management</h4>
                      <p className="text-sm text-gray-500 mb-3">Kelola pengguna dan hak akses</p>
                      <Button variant="outline">
                        <Users className="h-4 w-4 mr-2" />
                        Manage Users
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
