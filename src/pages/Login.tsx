import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      toast({
        title: "Login Berhasil",
        description: "Selamat datang di SIMOLA 110",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Login Gagal",
        description: "Silakan isi email dan password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">SIMOLA 110</h1>

          {/* Gambar Banner Polda DIY Full */}
          <div className="rounded-lg overflow-hidden shadow border">
            <img
              src="/lovable-uploads/polda-diy-depan.png"
              alt="Polda DIY"
              className="w-full object-cover"
            />
          </div>
        </div>

        {/* Form Login */}
        <Card>
          <CardHeader className="space-y-1">
            <div className="text-center">
              <h3 className="text-lg font-semibold">Masuk ke Sistem</h3>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Masukkan email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                Login
              </Button>

              <div className="text-center">
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Lupa password?
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
