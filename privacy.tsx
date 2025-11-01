import React from 'react';
import ReactDOM from 'react-dom/client';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
       <div className="max-w-3xl w-full bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
        <h1 
            className="text-4xl md:text-5xl font-bold text-yellow-400 text-center mb-6" 
            style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}
        >
            سياسة الخصوصية
        </h1>
        <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
                نحن في "ميرت آمون" نحترم خصوصيتك ونلتزم بحمايتها. توضح هذه السياسة كيفية التعامل مع الصور التي ترفعها إلى تطبيقنا.
            </p>
            <h2 className="text-2xl font-semibold text-amber-300 pt-4 border-t border-gray-600">الصور المرفوعة</h2>
            <p>
                عندما تقوم برفع صورة، يتم إرسالها مباشرة إلى خوادم Google لمعالجتها باستخدام نموذج Gemini API.
            </p>
            <p>
                <strong>نحن لا نقوم بتخزين أو جمع أو مشاركة أي من صورك على خوادمنا.</strong> يتم التعامل مع الصور في الذاكرة أثناء عملية التعديل فقط ولا يتم حفظها بعد اكتمال الطلب.
            </p>
             <h2 className="text-2xl font-semibold text-amber-300 pt-4 border-t border-gray-600">خدمة الطرف الثالث</h2>
            <p>
                تتم معالجة الصور بواسطة Google Generative AI API. تخضع استخدامك لهذه الميزة لسياسة خصوصية Google. نوصي بالاطلاع عليها لمزيد من المعلومات.
            </p>
            <p className="mt-8 text-center">
                <a href="/" className="bg-amber-600 text-black font-bold py-3 px-6 rounded-lg hover:bg-amber-500 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    العودة إلى التطبيق الرئيسي
                </a>
            </p>
        </div>
       </div>
    </div>
  );
};


const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <PrivacyPolicy />
  </React.StrictMode>
);
