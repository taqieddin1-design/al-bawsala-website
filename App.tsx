import React, { useEffect, useState } from 'react';
import { auth } from './lib/firebase';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import Auth from './components/Auth';

import Intro from './content/Intro';
import Lesson1 from './content/Lesson1';
import Lesson2 from './content/Lesson2';
import Lesson3 from './content/Lesson3';
import Review from './content/Review';

import Unit2_Intro from './content/Unit2_Intro';
import Unit2_Lesson1 from './content/Unit2_Lesson1';
import Unit2_Lesson2 from './content/Unit2_Lesson2';
import Unit2_Lesson3 from './content/Unit2_Lesson3';
import Unit2_Review from './content/Unit2_Review';

import Unit3_Intro from './content/Unit3_Intro';
import Unit3_Lesson1 from './content/Unit3_Lesson1';
import Unit3_Lesson2 from './content/Unit3_Lesson2';
import Unit3_Lesson3 from './content/Unit3_Lesson3';
import Unit3_Review from './content/Unit3_Review';

import Unit4_Intro from './content/Unit4_Intro';
import Unit4_Lesson1 from './content/Unit4_Lesson1';
import Unit4_Lesson2 from './content/Unit4_Lesson2';
import Unit4_Lesson3 from './content/Unit4_Lesson3';
import Unit4_Review from './content/Unit4_Review';

import Glossary from './content/Glossary';

import { Printer, LogOut, Moon, Sun } from 'lucide-react';
import Comments from './components/Comments';
import SectionWrapper from './components/SectionWrapper';
import ProgressIndicator from './components/ProgressIndicator';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handlePrint = () => {
    window.print();
  };

  const handleLogout = () => {
    signOut(auth);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Auth onSuccess={() => {}} />;
  }

  const sections = [
    { id: 'u1-intro', component: <Intro />, title: 'مقدمة الوحدة الأولى' },
    { id: 'u1-lesson1', component: <Lesson1 />, title: 'تغير المناخ والأنشطة البشرية' },
    { id: 'u1-lesson2', component: <Lesson2 />, title: 'حساب الانبعاثات' },
    { id: 'u1-lesson3', component: <Lesson3 />, title: 'أمثلة محلولة ' },
    { id: 'u1-review', component: <Review />, title: 'مراجعة الوحدة الأولى' },
    
    { id: 'u2-intro', component: <Unit2_Intro />, title: 'مقدمة الوحدة الثانية' },
    { id: 'u2-lesson1', component: <Unit2_Lesson1 />, title: 'تشوه الصخور' },
    { id: 'u2-lesson2', component: <Unit2_Lesson2 />, title: 'الطيات' },
    { id: 'u2-lesson3', component: <Unit2_Lesson3 />, title: 'الصدوع' },
    { id: 'u2-review', component: <Unit2_Review />, title: 'مراجعة الوحدة الثانية' },
    
    { id: 'u3-intro', component: <Unit3_Intro />, title: 'مقدمة الوحدة الثالثة' },
    { id: 'u3-lesson1', component: <Unit3_Lesson1 />, title: 'الزلازل' },
    { id: 'u3-lesson2', component: <Unit3_Lesson2 />, title: 'موجات الزلازل' },
    { id: 'u3-lesson3', component: <Unit3_Lesson3 />, title: 'رصد الزلازل' },
    { id: 'u3-review', component: <Unit3_Review />, title: 'مراجعة الوحدة الثالثة' },
    
    { id: 'u4-intro', component: <Unit4_Intro />, title: 'مقدمة الوحدة الرابعة' },
    { id: 'u4-lesson1', component: <Unit4_Lesson1 />, title: 'المياه الجوفية' },
    { id: 'u4-lesson2', component: <Unit4_Lesson2 />, title: 'الخزانات الجوفية' },
    { id: 'u4-lesson3', component: <Unit4_Lesson3 />, title: 'تلوث المياه الجوفية' },
    { id: 'u4-review', component: <Unit4_Review />, title: 'مراجعة الوحدة الرابعة' },
    
    { id: 'glossary', component: <Glossary />, title: 'المصطلحات' }
  ];

  return (
    <div className="font-sans text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 min-h-screen relative transition-colors duration-200" dir="rtl">
      
      <ProgressIndicator totalSections={sections.length} />
      
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 left-6 z-50 no-print flex gap-3 flex-col sm:flex-row">
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="bg-sky-100 hover:bg-sky-200 text-sky-800 dark:bg-sky-900 dark:hover:bg-sky-800 dark:text-sky-100 p-4 rounded-full shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center group border border-sky-200 dark:border-sky-800"
          title={darkMode ? 'الوضع النهاري' : 'الوضع الليلي'}
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out px-0 group-hover:px-2 font-bold text-base">
            {darkMode ? 'الوضع النهاري' : 'الوضع الليلي'}
          </span>
        </button>
        <button 
          onClick={handleLogout}
          className="bg-gray-800 hover:bg-gray-900 text-white dark:bg-gray-700 dark:hover:bg-gray-600 p-4 rounded-full shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center group border border-gray-700"
          title="تسجيل الخروج"
        >
          <LogOut size={24} />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out px-0 group-hover:px-2 font-bold text-base">
            تسجيل الخروج
          </span>
        </button>
        <button 
          onClick={handlePrint}
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center group border border-emerald-700"
          title="طباعة إلى PDF"
        >
          <Printer size={28} />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out px-0 group-hover:px-2 font-bold text-lg">
            تصدير PDF
          </span>
        </button>
      </div>

      {/* Main Print Container */}
      <div className="print-container bg-gray-50 dark:bg-gray-900 print:bg-white overflow-hidden pb-20 pt-8">
        <div className="text-center no-print mb-8 space-y-2">
          <h1 className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-400">مرحباً {user.displayName || 'يا صديقي الطموح'}</h1>
          <p className="text-gray-500 dark:text-gray-400">لنكمل معاً رحلة التفوق والنجاح!</p>
        </div>

        {sections.map((section) => (
          <SectionWrapper key={section.id} id={section.id} title={section.title}>
            {section.component}
          </SectionWrapper>
        ))}
        
        <Comments />
      </div>

    </div>
  );
}

