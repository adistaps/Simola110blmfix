
import { useState } from "react";
import { Star, Send, MessageCircle, ThumbsUp, AlertCircle, Upload, X } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  const feedbackHistory = [
    {
      id: 1,
      type: "Kepuasan",
      subject: "Pelayanan Sangat Memuaskan",
      message: "Terima kasih atas penanganan laporan pencurian motor saya yang sangat cepat dan profesional",
      rating: 5,
      date: "2024-01-15",
      status: "Direspon",
      response: "Terima kasih atas feedback positifnya. Kami akan terus meningkatkan pelayanan.",
      hasPhoto: true
    },
    {
      id: 2,
      type: "Kepuasan",
      subject: "Petugas Sangat Ramah",
      message: "Petugas yang menangani kasus kecelakaan di Malioboro sangat membantu dan ramah",
      rating: 5,
      date: "2024-01-12",
      status: "Direspon",
      response: "Apresiasi Anda akan kami sampaikan kepada petugas yang bertugas.",
      hasPhoto: true
    },
    {
      id: 3,
      type: "Kepuasan",
      subject: "Respon Cepat",
      message: "Laporan gangguan ketertiban ditangani dengan sangat cepat, tidak sampai 1 jam",
      rating: 4,
      date: "2024-01-10",
      status: "Direspon",
      response: "Terima kasih. Kami berkomitmen memberikan respon terbaik untuk masyarakat.",
      hasPhoto: false
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length !== files.length) {
      toast({
        title: "File Tidak Valid",
        description: "Hanya file gambar yang diperbolehkan (JPG, PNG, GIF)",
        variant: "destructive",
      });
    }
    
    setAttachedFiles(prev => [...prev, ...imageFiles]);
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitFeedback = () => {
    if (!feedbackType || !message || rating === 0) {
      toast({
        title: "Mohon Lengkapi Form",
        description: "Mohon lengkapi semua field yang diperlukan",
        variant: "destructive",
      });
      return;
    }
    
    console.log("Submitting feedback:", { feedbackType, message, rating, email, attachedFiles });
    toast({
      title: "Feedback Berhasil Dikirim",
      description: "Terima kasih atas kepercayaan dan feedback positif Anda!",
    });
    
    // Reset form
    setFeedbackType("");
    setMessage("");
    setRating(0);
    setEmail("");
    setAttachedFiles([]);
  };

  const renderStars = (currentRating: number, interactive: boolean = false) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= currentRating 
                ? "text-yellow-400 fill-current" 
                : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={interactive ? () => setRating(star) : undefined}
          />
        ))}
      </div>
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Direspon":
        return <Badge className="bg-green-500">Direspon</Badge>;
      case "Diperbaiki":
        return <Badge className="bg-blue-500">Diperbaiki</Badge>;
      case "Dalam Pengembangan":
        return <Badge className="bg-yellow-500">Dalam Pengembangan</Badge>;
      case "Menunggu":
        return <Badge variant="outline">Menunggu</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        <Header title="Feedback" />
        
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Feedback Kepuasan Masyarakat</h1>
            <p className="text-gray-600">Bagikan kepuasan Anda terhadap pelayanan POLDA Daerah Istimewa Yogyakarta</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Feedback Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Bagikan Kepuasan Anda
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="feedbackType">Jenis Feedback</Label>
                  <Select value={feedbackType} onValueChange={setFeedbackType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis feedback" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kepuasan">Kepuasan Pelayanan</SelectItem>
                      <SelectItem value="apresiasi">Apresiasi Petugas</SelectItem>
                      <SelectItem value="testimoni">Testimoni Positif</SelectItem>
                      <SelectItem value="saran">Saran Perbaikan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="email">Email (Opsional)</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <Label>Rating Kepuasan</Label>
                  <div className="mt-2">
                    {renderStars(rating, true)}
                    <p className="text-sm text-gray-500 mt-1">
                      {rating === 0 && "Berikan rating untuk pelayanan"}
                      {rating === 1 && "Sangat Tidak Puas"}
                      {rating === 2 && "Tidak Puas"}
                      {rating === 3 && "Cukup Puas"}
                      {rating === 4 && "Puas"}
                      {rating === 5 && "Sangat Puas"}
                    </p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Ceritakan Pengalaman Anda</Label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Bagikan pengalaman positif Anda dengan pelayanan POLDA DIY..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Bukti Foto (Opsional)</Label>
                  <div className="mt-2">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button type="button" variant="outline" className="w-full" asChild>
                        <span className="cursor-pointer">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Foto Kepuasan
                        </span>
                      </Button>
                    </label>
                    
                    {attachedFiles.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {attachedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm">{file.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <Button onClick={handleSubmitFeedback} className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Kirim Feedback Kepuasan
                </Button>
              </CardContent>
            </Card>

            {/* Feedback Statistics */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Statistik Kepuasan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">156</div>
                      <p className="text-sm text-gray-500">Total Feedback</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">4.8</div>
                      <p className="text-sm text-gray-500">Rating Rata-rata</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">89%</div>
                      <p className="text-sm text-gray-500">Sangat Puas</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">145</div>
                      <p className="text-sm text-gray-500">Dengan Foto</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Info Panel */}
              <Card>
                <CardHeader>
                  <CardTitle>Informasi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Tips Feedback Berkualitas:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Ceritakan pengalaman spesifik</li>
                      <li>• Sertakan foto sebagai bukti</li>
                      <li>• Sebutkan nama petugas jika memungkinkan</li>
                      <li>• Berikan saran konstruktif</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Feedback History */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Feedback Kepuasan Terbaru</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedbackHistory.map((feedback) => (
                  <div key={feedback.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline">{feedback.type}</Badge>
                          {getStatusBadge(feedback.status)}
                          {feedback.hasPhoto && (
                            <Badge className="bg-green-500 text-xs">📷 Dengan Foto</Badge>
                          )}
                        </div>
                        <h4 className="font-medium">{feedback.subject}</h4>
                      </div>
                      <div className="text-right">
                        {renderStars(feedback.rating)}
                        <p className="text-sm text-gray-500 mt-1">{feedback.date}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2">{feedback.message}</p>
                    {feedback.response && (
                      <div className="bg-blue-50 p-3 rounded mt-2">
                        <p className="text-sm text-blue-800">
                          <strong>Respon POLDA:</strong> {feedback.response}
                        </p>
                      </div>
                    )}
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

export default Feedback;
