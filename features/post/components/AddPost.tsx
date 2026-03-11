"use client";
import React, { useState, useRef } from "react";
import { ArrowLeft, CloudUpload, X } from "lucide-react";
import Link from "next/link";
import { usePostMutation } from "../hooks/usePost";
import { useRouter } from "next/navigation";

export default function AddPost() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate, isPending } = usePostMutation();
  const router = useRouter();

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        return alert("Please select an image file!");
      }

      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleShare = () => {
    if (!file) return alert("Select an image!");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);

    console.log("Mengirim data...");
    formData.forEach((value, key) => console.log(`${key}:`, value));

    mutate(formData, {
      onSuccess: () => {
        alert("Post Created!");
        router.push("/");
      },
      onError: (error) => {
        console.error("Detail Error API:", error.response?.data);
        alert("Upload failed! Periksa console untuk detail.");
      },
    });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="md:w-[452px] w-full">
        {" "}
        {/* Menggunakan arbitrary value */}
        <header className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="hover:bg-white/10 p-2 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">Add Post</h1>
        </header>
        <main className="space-y-6">
          <section>
            <label className="block text-sm font-medium mb-3 text-gray-300">
              Photo
            </label>

            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
            />

            <div
              onClick={handleBoxClick}
              className="relative border-2 border-dashed border-gray-800 bg-[#0D1117] rounded-xl overflow-hidden min-h-[200px] flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 transition-colors"
            >
              {image ? (
                <div className="w-full h-full relative">
                  <img
                    src={image}
                    alt="Preview"
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setImage(null);
                      setFile(null);
                    }}
                    className="absolute top-2 right-2 bg-black/60 p-1 rounded-full hover:bg-black"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="bg-gray-900 p-3 rounded-lg mb-4">
                    <CloudUpload className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-300 text-center px-4">
                    <span className="text-purple-500 font-semibold">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    PNG or JPG (max. 5mb)
                  </p>
                </>
              )}
            </div>
          </section>

          <section>
            <label className="block text-sm font-medium mb-3 text-gray-300">
              Caption
            </label>
            <textarea
              className="w-full bg-[#0D1117] border border-gray-800 rounded-xl p-4 text-sm focus:ring-1 focus:ring-purple-500 outline-none min-h-[120px] resize-none"
              placeholder="Create your caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </section>

          <button
            className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-full shadow-lg transition-all active:scale-95 ${
              isPending ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleShare}
            disabled={isPending}
          >
            {isPending ? "Sharing..." : "Share"}
          </button>
        </main>
      </div>
    </div>
  );
}
