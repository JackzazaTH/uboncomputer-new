import React, { useRef } from 'react';
import { UploadCloud, X } from 'lucide-react';

interface ImageUploadProps {
  label: string;
  currentImages: string[];
  onImagesChange: (base64Images: string[]) => void;
  maxImages?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, currentImages, onImagesChange, maxImages = 10 }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const remainingSlots = maxImages - currentImages.length;
      const filesToProcess = Array.from(files).slice(0, remainingSlots);

      if (files.length > remainingSlots && remainingSlots > 0) {
        alert(`คุณสามารถอัปโหลดรูปภาพได้อีก ${remainingSlots} รูปเท่านั้น`);
      }

      const newImages: string[] = [];
      let processedCount = 0;

      if (filesToProcess.length === 0) return;

      filesToProcess.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          processedCount++;
          if (processedCount === filesToProcess.length) {
            onImagesChange([...currentImages, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    onImagesChange(currentImages.filter((_, index) => index !== indexToRemove));
  };

  const triggerFileInput = () => {
    if (currentImages.length < maxImages) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1">
        {currentImages.length > 0 && (
          <div className="mb-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {currentImages.map((image, index) => (
              <div key={index} className="relative group aspect-square">
                <img src={image} alt={`Preview ${index + 1}`} className="w-full h-full object-contain rounded-md border bg-white" />
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleRemoveImage(index); }}
                  className="absolute top-1 right-1 bg-red-600/80 backdrop-blur-sm rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={`Remove image ${index + 1}`}
                >
                  <X size={14} />
                </button>
                {index === 0 && <span className="absolute bottom-1 left-1 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded">ปก</span>}
              </div>
            ))}
          </div>
        )}
        
        <div 
          onClick={triggerFileInput}
          className={`flex justify-center items-center w-full min-h-[8rem] p-2 rounded-md border-2 border-dashed border-gray-300 relative transition-colors ${currentImages.length < maxImages ? 'cursor-pointer hover:border-orange-500' : 'cursor-not-allowed bg-gray-50'}`}
        >
          {currentImages.length < maxImages && (
            <div className="text-center">
              <UploadCloud size={40} className="mx-auto text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                <span className="font-semibold text-orange-600">อัปโหลดรูปภาพ</span> ({currentImages.length}/{maxImages})
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF</p>
            </div>
          )}
           {currentImages.length >= maxImages && (
            <div className="text-center text-gray-500">
                <p>อัปโหลดรูปภาพครบจำนวนสูงสุดแล้ว</p>
            </div>
           )}
        </div>
        
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple
        className="hidden"
        disabled={currentImages.length >= maxImages}
      />
    </div>
  );
};

export default ImageUpload;
