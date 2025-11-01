import React from 'react';
import { PhotoIcon } from './icons/PhotoIcon';
import { DownloadIcon } from './icons/DownloadIcon';

interface ResultDisplayProps {
  originalImageUrl: string | null;
  editedImageUrl: string | null;
  isLoading: boolean;
}

const ImageCard: React.FC<{
  title: string;
  imageUrl: string | null;
  isPlaceholder?: boolean;
  isLoading?: boolean;
  isEdited?: boolean;
}> = ({ title, imageUrl, isPlaceholder = false, isLoading = false, isEdited = false }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-4 flex flex-col h-full shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-lg text-gray-300">{title}</h3>
        {isEdited && imageUrl && (
           <a
              href={imageUrl}
              download="edited-image.png"
              className="flex items-center gap-2 text-sm bg-amber-600/50 text-amber-200 py-1.5 px-3 rounded-md hover:bg-amber-600/80 transition-colors"
           >
              <DownloadIcon className="w-4 h-4" />
              تحميل
           </a>
        )}
      </div>
      <div className="aspect-w-1 aspect-h-1 w-full bg-gray-900/50 rounded-lg flex-grow flex items-center justify-center overflow-hidden">
        {isLoading && (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <svg className="animate-spin h-8 w-8 text-amber-400 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>جاري التحويل...</span>
          </div>
        )}
        {!isLoading && imageUrl && <img src={imageUrl} alt={title} className="object-contain w-full h-full" />}
        {!isLoading && !imageUrl && (
          <div className="flex flex-col items-center justify-center text-gray-500">
            <PhotoIcon className="w-16 h-16" />
            <span className="mt-2 text-sm">{isPlaceholder ? 'ارفع صورة للبدء' : 'الصورة المعدلة ستظهر هنا'}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImageUrl, editedImageUrl, isLoading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
      <ImageCard title="الأصلية" imageUrl={originalImageUrl} isPlaceholder={!originalImageUrl} />
      <ImageCard title="المعدّلة" imageUrl={editedImageUrl} isLoading={isLoading} isEdited={true} />
    </div>
  );
};

export default ResultDisplay;