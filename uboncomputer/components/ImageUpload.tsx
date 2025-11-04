import React, { useRef } from 'react';
import { UploadCloud, X } from 'lucide-react';

interface ImageUploadProps {
  label: string;
  currentImage: string;
  onImageChange: (base64Image: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, currentImage, onImageChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onImageChange('');
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div 
        onClick={triggerFileInput}
        className="mt-1 flex justify-center items-center w-full h-48 rounded-md border-2 border-dashed border-gray-300 p-2 relative cursor-pointer hover:border-orange-500 transition-colors"
      >
        {currentImage ? (
          <>
            <img src={currentImage} alt="Preview" className="max-h-full max-w-full object-contain" />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-1 text-red-600 hover:bg-white shadow-md transition-all"
              aria-label="Remove image"
            >
              <X size={18} />
            </button>
          </>
        ) : (
          <div className="text-center">
            <UploadCloud size={40} className="mx-auto text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-semibold text-orange-600">คลิกเพื่ออัปโหลด</span> หรือลากไฟล์มาวาง
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
