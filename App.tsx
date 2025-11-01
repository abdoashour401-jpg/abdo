import React, { useState, useCallback } from 'react';
import { editImage } from './services/geminiService';
import ImageUploader from './components/ImageUploader';
import ResultDisplay from './components/ResultDisplay';
import { SparklesIcon } from './components/icons/SparklesIcon';

const App: React.FC = () => {
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [editedImageUrl, setEditedImageUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = useCallback((file: File) => {
    setOriginalImageFile(file);
    setOriginalImageUrl(URL.createObjectURL(file));
    setEditedImageUrl(null);
    setError(null);
  }, []);

  const handleGenerate = async () => {
    if (!originalImageFile || !prompt) {
      setError('الرجاء رفع صورة وإدخال تعليمات.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImageUrl(null);

    try {
      const generatedImageUrl = await editImage(originalImageFile, prompt);
      setEditedImageUrl(generatedImageUrl);
    } catch (e) {
      console.error(e);
      setError('فشل في تحويل الصورة. قد لا يكون النموذج مناسبًا لهذه المهمة. الرجاء تجربة تعليمات أو صورة مختلفة.');
    } finally {
      setIsLoading(false);
    }
  };

  const backgrounds = [
    { name: 'الأهرامات', prompt: 'Change the background to the pyramids of Giza at sunset.' },
    { name: 'المعبد', prompt: 'Change the background to the inside of an ancient Egyptian temple.' },
    { name: 'نهر النيل', prompt: 'Change the background to a scenic view of the Nile River with traditional boats.' },
    { name: 'هيروغليفية', prompt: 'Change the background to a stone wall covered in hieroglyphics.' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header 
        className="bg-cover bg-center bg-no-repeat py-16 md:py-20 text-center relative shadow-2xl" 
        style={{ backgroundImage: "url('/logo.png')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div> {/* Overlay */}
        <div className="container mx-auto relative">
            <h1 
                className="text-5xl md:text-6xl font-bold text-yellow-400" 
                style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}
            >
                ميرت آمون
            </h1>
             <p 
                className="mt-2 text-lg text-gray-200"
                style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}
            >
                حوّل صورك بلمسة فرعونية
            </p>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6">
            <div className="bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700">
              <h2 className="text-lg font-semibold text-amber-300 mb-4 border-b border-gray-600 pb-3">١. ارفع الصورة</h2>
              <ImageUploader onImageSelect={handleImageSelect} />
            </div>
            
            <div className="bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700">
              <h2 className="text-lg font-semibold text-amber-300 mb-4 border-b border-gray-600 pb-3">٢. أدخل التعليمات</h2>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="مثال: أضف فلتر قديم، اجعل السماء وقت الغروب، أزل الشخص في الخلفية..."
                className="w-full h-32 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors placeholder-gray-400"
                disabled={!originalImageFile || isLoading}
              />
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-400 mb-3 text-center">أو اختر خلفية جاهزة</h3>
                <div className="grid grid-cols-2 gap-3">
                  {backgrounds.map((bg) => (
                    <button
                      key={bg.name}
                      onClick={() => setPrompt(bg.prompt)}
                      disabled={!originalImageFile || isLoading}
                      className={`p-3 bg-gray-700 border border-gray-600 rounded-lg text-sm text-center transition-all duration-200 
                                 ${prompt === bg.prompt ? 'ring-2 ring-amber-500 border-amber-500 text-white' : 'text-gray-300 hover:bg-gray-600 hover:border-gray-500'}
                                 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-700 disabled:hover:border-gray-600`}
                    >
                      {bg.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <button
              onClick={handleGenerate}
              disabled={!originalImageFile || !prompt || isLoading}
              className="w-full flex items-center justify-center gap-3 bg-amber-600 text-black font-bold py-3 px-4 rounded-lg hover:bg-amber-500 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  جاري التحويل...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5" />
                  حوّل الصورة
                </>
              )}
            </button>

            {error && <p className="text-red-400 text-sm mt-4 p-3 bg-red-900/50 rounded-lg border border-red-700">{error}</p>}
          </div>

          {/* Results Column */}
          <div className="lg:col-span-8 xl:col-span-9">
            <ResultDisplay
              originalImageUrl={originalImageUrl}
              editedImageUrl={editedImageUrl}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
      
      <footer className="w-full text-center py-4 mt-8 border-t border-gray-800">
        <div className="container mx-auto">
          <a href="/privacy.html" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
            سياسة الخصوصية
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;