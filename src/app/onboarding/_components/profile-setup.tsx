"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface ProfileSetupData {
  name: string;
  image: FileList;
}

export function ProfileSetup() {
  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<ProfileSetupData>();

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setPreviewUrl(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  }

  async function onSubmit(data: ProfileSetupData) {
    // Save user data to local storage
    const userData = {
      name: data.name,
      image: previewUrl,
      initialPlatform: new URLSearchParams(window.location.search).get('platform') || 'youtube',
      connectedPlatforms: [] // Initialize empty array for connected platforms
    };
    localStorage.setItem('userData', JSON.stringify(userData));

    // Navigate to the profile connection page
    router.push("/onboarding?hasProfile=true");
  }

  return (
    <div className="min-h-screen bg-[#FFFBF7] flex flex-col max-w-md mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Create Your Profile</h1>
        <p className="text-gray-600">Let's make your profile stand out to brands</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Profile Image Upload */}
        <div className="relative">
          <div className="relative mx-auto w-48 h-48">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF5F1F] to-pink-500 rounded-3xl rotate-6" />
            <div className="absolute inset-0 bg-white rounded-3xl" />
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                  <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <label
              htmlFor="image-upload"
              className="inline-block px-4 py-2 text-sm font-medium text-[#FF5F1F] bg-white border-2 border-[#FF5F1F] rounded-lg cursor-pointer hover:bg-[#FF5F1F]/5 transition-colors"
            >
              {previewUrl ? "Change Photo" : "Upload Photo"}
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              {...register("image")}
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* Name Input */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Your Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-[#FF5F1F] focus:ring-0 transition-colors"
            placeholder="Enter your name"
            {...register("name", { required: true })}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 text-lg font-medium text-white bg-[#FF5F1F] rounded-xl hover:bg-[#FF5F1F]/90 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Creating Profile..." : "Create Profile"}
        </button>
      </form>
    </div>
  );
} 