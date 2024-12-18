import { useState, useCallback } from 'react';

interface FileUploadState {
  fileUrl: string | null;
  isUploading: boolean;
  error: string | null;
}

interface UseFileUploadReturn extends FileUploadState {
  uploadFile: (file: File) => Promise<string | null>;
  removeFile: () => void;
}

export const useFileUpload = (
  options = {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['application/pdf', 'image/jpeg', 'image/png']
  }
): UseFileUploadReturn => {
  const [state, setState] = useState<FileUploadState>({
    fileUrl: null,
    isUploading: false,
    error: null
  });

  const validateFile = (file: File): string | null => {
    if (file.size > options.maxSize) {
      return 'File size exceeds 5MB limit';
    }
    if (!options.allowedTypes.includes(file.type)) {
      return 'Invalid file type. Please upload PDF, JPEG, or PNG files only';
    }
    return null;
  };

  const uploadFile = useCallback(async (file: File): Promise<string | null> => {
    const error = validateFile(file);
    if (error) {
      setState(prev => ({ ...prev, error }));
      return null;
    }

    setState(prev => ({ ...prev, isUploading: true, error: null }));

    try {
      // Create temporary URL for preview
      const tempUrl = URL.createObjectURL(file);
      
      // Store in localStorage for persistence
      const fileData = {
        name: file.name,
        url: tempUrl,
        timestamp: Date.now(),
        expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      };
      
      localStorage.setItem(`temp_file_${file.name}`, JSON.stringify(fileData));
      
      setState(prev => ({
        ...prev,
        fileUrl: tempUrl,
        isUploading: false,
        error: null
      }));
      
      return tempUrl;
    } catch (err) {
      setState(prev => ({
        ...prev,
        isUploading: false,
        error: 'Failed to upload file'
      }));
      return null;
    }
  }, [options]);

  const removeFile = useCallback(() => {
    if (state.fileUrl) {
      URL.revokeObjectURL(state.fileUrl);
      setState({
        fileUrl: null,
        isUploading: false,
        error: null
      });
    }
  }, [state.fileUrl]);

  return {
    ...state,
    uploadFile,
    removeFile
  };
};