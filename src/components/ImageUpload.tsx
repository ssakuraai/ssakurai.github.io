import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  label: string;
  currentImage?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, label, currentImage }) => {
  const { theme } = useTheme();
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onImageUpload(acceptedFiles[0]);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1
  });

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-opacity-100' : 'border-opacity-50'}
          ${theme === 'light' 
            ? `border-pink-400 ${isDragActive ? 'bg-pink-50' : 'hover:bg-pink-50'}`
            : `border-pink-300 ${isDragActive ? 'bg-purple-800' : 'hover:bg-purple-800'}`
          }`}
      >
        <input {...getInputProps()} />
        
        {currentImage ? (
          <div className="relative">
            <img 
              src={currentImage} 
              alt="Uploaded preview" 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className={`absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity
              ${theme === 'light' ? 'bg-pink-100/80' : 'bg-purple-900/80'}`}>
              <p className={theme === 'light' ? 'text-pink-700' : 'text-pink-300'}>
                Click or drag to replace
              </p>
            </div>
          </div>
        ) : (
          <>
            <Upload 
              className={`mx-auto mb-4 ${
                theme === 'light' ? 'text-pink-400' : 'text-pink-300'
              }`} 
              size={48} 
            />
            <p className={theme === 'light' ? 'text-pink-700' : 'text-pink-300'}>
              {isDragActive ? 'Drop your image here' : label}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;