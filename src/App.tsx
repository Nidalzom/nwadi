/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence, useInView, animate } from 'motion/react';
import { 
  MapPin, Phone, Mail, Instagram, Twitter, Youtube, Send, 
  Smile, ShieldCheck, Trophy, Palette, Target, Eye, Menu, X,
  ChevronRight, ChevronLeft, Star, Quote, MessageCircle, Users, BookOpen, Clock,
  ArrowLeft, ArrowRight
} from 'lucide-react';

// --- Sub-components ---

function Counter({ from, to, duration = 2 }: { from: number, to: number, duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(value).toString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, duration, inView]);

  return <span ref={nodeRef}>{from}</span>;
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <img 
        src="/logo.png" 
        alt="نوادي الأجيال" 
        className="h-12 md:h-16 w-auto object-contain" 
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.nextElementSibling?.classList.remove('hidden');
          e.currentTarget.nextElementSibling?.classList.add('flex');
        }} 
      />
      <div className="hidden items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-turquoise to-brand-purple flex items-center justify-center text-white font-bold text-xl shadow-lg">
          ن
        </div>
        <div className="flex flex-col">
          <span className={`font-bold text-xl leading-none mb-1 ${light ? 'text-white' : 'text-brand-navy'}`}>نوادي الأجيال</span>
          <span className={`text-[11px] font-bold leading-none ${light ? 'text-white/80' : 'text-brand-green'}`}>تهتم بمن هم أهم</span>
        </div>
      </div>
    </div>
  );
}

function ProgramsSection() {
  const programs = [
    { id: 1, title: "المبرمج الصغير", age: "8-12 سنة", image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop", color: "bg-brand-turquoise", desc: "تعلم أساسيات البرمجة وتطوير الألعاب بطريقة ممتعة وتفاعلية." },
    { id: 2, title: "الفنون والإبداع", age: "6-10 سنوات", image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=800&auto=format&fit=crop", color: "bg-brand-pink", desc: "اكتشف مواهبك الفنية من خلال الرسم والأشغال اليدوية." },
    { id: 3, title: "أبطال الرياضة", age: "7-14 سنة", image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=800&auto=format&fit=crop", color: "bg-brand-yellow", desc: "أنشطة رياضية متنوعة لبناء اللياقة البدنية وروح الفريق." },
    { id: 4, title: "نادي القراءة", age: "6-12 سنة", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop", color: "bg-brand-purple", desc: "رحلات في عالم الكتب والقصص لتنمية الخيال وحب القراءة." },
    { id: 5, title: "العلوم المرحة", age: "7-11 سنة", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop", color: "bg-brand-green", desc: "تجارب علمية مبسطة ومثيرة تفتح آفاق المعرفة." },
    { id: 6, title: "الروبوت والذكاء", age: "10-15 سنة", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop", color: "bg-brand-navy", desc: "تصميم وبرمجة الروبوتات والتعرف على تقنيات المستقبل." },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const activeProgram = programs[activeIndex];

  // Split programs for left and right columns
  const rightPrograms = programs.slice(0, Math.ceil(programs.length / 2));
  const leftPrograms = programs.slice(Math.ceil(programs.length / 2));

  return (
    <section id="programs" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-turquoise/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="text-center max-w-3xl mx-auto mb-16 px-4">
        <h2 className="text-brand-turquoise font-bold tracking-wider uppercase mb-2">برامجنا</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-brand-navy mb-6">اكتشف عالم نوادي الأجيال</h3>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
          
          {/* Right List (RTL) */}
          <div className="w-full lg:w-1/4 flex flex-col gap-4 order-2 lg:order-1">
            {rightPrograms.map((prog, idx) => {
              const actualIdx = idx;
              const isActive = activeIndex === actualIdx;
              return (
                <button 
                  key={prog.id}
                  onClick={() => setActiveIndex(actualIdx)}
                  className={`relative p-4 rounded-2xl text-right transition-all duration-300 overflow-hidden group flex items-center justify-between ${isActive ? 'bg-brand-light shadow-md scale-105 z-10 border-r-4 ' + prog.color.replace('bg-', 'border-') : 'bg-white hover:bg-gray-50 border border-gray-100'}`}
                >
                  <div>
                    <h4 className={`font-bold text-lg mb-1 ${isActive ? 'text-brand-navy' : 'text-gray-600'}`}>{prog.title}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${prog.color} text-white`}>{prog.age}</span>
                  </div>
                  <ArrowLeft className={`w-5 h-5 transition-transform ${isActive ? 'text-brand-navy translate-x-0' : 'text-gray-300 translate-x-2 group-hover:translate-x-0'}`} />
                </button>
              )
            })}
          </div>

          {/* Center Circle */}
          <div className="w-full lg:w-2/4 flex justify-center order-1 lg:order-2 my-8 lg:my-0">
            <motion.div 
              key={activeProgram.id}
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[450px] md:h-[450px] rounded-full p-4 bg-white shadow-2xl"
            >
              {/* Rotating dashed border */}
              <div className={`absolute inset-0 rounded-full border-4 border-dashed ${activeProgram.color.replace('bg-', 'border-')} animate-[spin_20s_linear_infinite] opacity-40`}></div>
              
              <div className="w-full h-full rounded-full overflow-hidden relative group">
                <img src={activeProgram.image} alt={activeProgram.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/40 to-transparent opacity-90"></div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center text-white">
                  <motion.h3 
                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                    className="text-2xl md:text-3xl font-bold mb-2"
                  >
                    {activeProgram.title}
                  </motion.h3>
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                    className="text-sm md:text-base text-white/90 mb-6 line-clamp-2"
                  >
                    {activeProgram.desc}
                  </motion.p>
                  <motion.button 
                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
                    className={`px-8 py-3 rounded-full font-bold text-sm ${activeProgram.color} hover:scale-105 transition-transform shadow-lg`}
                  >
                    سجل في البرنامج
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Left List (RTL) */}
          <div className="w-full lg:w-1/4 flex flex-col gap-4 order-3">
            {leftPrograms.map((prog, idx) => {
              const actualIdx = idx + rightPrograms.length;
              const isActive = activeIndex === actualIdx;
              return (
                <button 
                  key={prog.id}
                  onClick={() => setActiveIndex(actualIdx)}
                  className={`relative p-4 rounded-2xl text-right transition-all duration-300 overflow-hidden group flex items-center justify-between flex-row-reverse ${isActive ? 'bg-brand-light shadow-md scale-105 z-10 border-l-4 ' + prog.color.replace('bg-', 'border-') : 'bg-white hover:bg-gray-50 border border-gray-100'}`}
                >
                  <div className="text-left">
                    <h4 className={`font-bold text-lg mb-1 ${isActive ? 'text-brand-navy' : 'text-gray-600'}`}>{prog.title}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${prog.color} text-white`}>{prog.age}</span>
                  </div>
                  <ArrowRight className={`w-5 h-5 transition-transform ${isActive ? 'text-brand-navy translate-x-0' : 'text-gray-300 -translate-x-2 group-hover:translate-x-0'}`} />
                </button>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

function PartnersScroll() {
  const partners = [
    "وزارة التعليم", "مؤسسة مسك", "الهيئة العامة للترفيه", "وزارة الرياضة", 
    "جامعة الملك سعود", "أرامكو السعودية", "سابك", "نيوم"
  ];
  
  return (
    <div className="w-full overflow-hidden bg-brand-navy py-12 relative group">
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center relative z-10">
        <h2 className="text-white text-2xl font-bold">شركاء النجاح</h2>
      </div>
      
      <div className="flex overflow-hidden">
        <div className="flex animate-marquee-rtl gap-8 min-w-max px-4">
          {[...partners, ...partners, ...partners, ...partners].map((partner, i) => (
            <div key={i} className="w-48 h-24 bg-white/5 backdrop-blur rounded-2xl border border-white/10 flex items-center justify-center text-white/50 font-bold hover:bg-white hover:text-brand-navy transition-all cursor-pointer grayscale hover:grayscale-0 shrink-0">
              {partner}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  const testimonials = [
    { id: 1, text: "تجربة رائعة جداً، ابني استفاد كثيراً من برنامج المبرمج الصغير وتطورت مهاراته بشكل ملحوظ.", author: "أم محمد", branch: "فرع الرياض", rating: 5 },
    { id: 2, text: "بيئة آمنة ومحفزة، المدربين محترفين والأنشطة متنوعة. أنصح به بشدة لكل أب وأم يبحث عن التميز.", author: "أبو خالد", branch: "فرع الخبر", rating: 5 },
    { id: 3, text: "ابنتي كانت خجولة جداً، وبعد مشاركتها في الفنون والإبداع زادت ثقتها بنفسها وأصبحت اجتماعية.", author: "أم سارة", branch: "فرع الرياض", rating: 5 },
    { id: 4, text: "تنظيم ممتاز واهتمام بأدق التفاصيل. شكراً لجهودكم في بناء جيل واعي ومثقف.", author: "أبو فهد", branch: "فرع الخبر", rating: 4 },
    { id: 5, text: "برامج متكاملة تجمع بين المرح والفائدة. أطفالي ينتظرون الإجازة بفارغ الصبر للعودة للنادي.", author: "أم عبدالله", branch: "فرع الرياض", rating: 5 },
  ];

  return (
    <section className="py-20 bg-brand-light relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-pink font-bold tracking-wider uppercase mb-2">رأي عملائنا</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-brand-navy mb-6">قصص نجاح نصنعها معاً</h3>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar px-4">
          {testimonials.map((test, index) => (
            <motion.div 
              key={test.id} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="min-w-[85vw] md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] snap-center"
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 relative h-full flex flex-col">
                <Quote className="absolute top-6 left-6 w-12 h-12 text-brand-turquoise/10 rotate-180" />
                <div className="flex gap-1 mb-4">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-brand-yellow text-brand-yellow" />
                  ))}
                </div>
                <p className="text-gray-600 text-lg leading-relaxed mb-6 relative z-10 flex-grow">"{test.text}"</p>
                <div className="flex items-center gap-4 border-t border-gray-100 pt-6 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center text-white font-bold text-xl shrink-0">
                    {test.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-navy">{test.author}</h4>
                    <p className="text-sm text-gray-500">{test.branch}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Main App Component ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);

  const services = [
    {
      title: "برامج صيفية متكاملة",
      description: "برامج مصممة خصيصاً لاستثمار أوقات الإجازة بما ينفع ويمتع.",
      icon: <Smile className="w-8 h-8 text-brand-yellow group-hover:animate-bounce" />,
      color: "bg-brand-yellow/10",
      borderColor: "border-brand-yellow"
    },
    {
      title: "أنشطة مهارية وتفاعلية",
      description: "تنمية المهارات الشخصية والاجتماعية من خلال أنشطة تفاعلية هادفة.",
      icon: <Palette className="w-8 h-8 text-brand-pink group-hover:animate-bounce" />,
      color: "bg-brand-pink/10",
      borderColor: "border-brand-pink"
    },
    {
      title: "فعاليات رياضية وترفيهية",
      description: "أنشطة حركية ورياضية تعزز الصحة البدنية وتفرغ الطاقات بإيجابية.",
      icon: <Trophy className="w-8 h-8 text-brand-turquoise group-hover:animate-bounce" />,
      color: "bg-brand-turquoise/10",
      borderColor: "border-brand-turquoise"
    },
    {
      title: "بيئة آمنة بمعايير عالية",
      description: "نحرص على توفير أعلى معايير الأمن والسلامة لراحة بال أولياء الأمور.",
      icon: <ShieldCheck className="w-8 h-8 text-brand-green group-hover:animate-bounce" />,
      color: "bg-brand-green/10",
      borderColor: "border-brand-green"
    }
  ];

  return (
    <div className="min-h-screen font-sans selection:bg-brand-turquoise selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-brand-navy hover:text-brand-turquoise font-medium transition-colors">الرئيسية</a>
              <a href="#about" className="text-brand-navy hover:text-brand-turquoise font-medium transition-colors">من نحن</a>
              <a href="#services" className="text-brand-navy hover:text-brand-turquoise font-medium transition-colors">برامجنا</a>
              <a href="#branches" className="text-brand-navy hover:text-brand-turquoise font-medium transition-colors">فروعنا</a>
              <a href="#contact" className="bg-brand-turquoise hover:bg-brand-turquoise/90 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-md shadow-brand-turquoise/20 hover:shadow-lg hover:shadow-brand-turquoise/30 hover:-translate-y-0.5">
                سجل الآن
              </a>
            </div>

            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-brand-navy p-2"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-white z-40 md:hidden pt-24 px-6"
            >
              <div className="flex flex-col gap-6 text-xl">
                <a href="#home" onClick={() => setIsMenuOpen(false)} className="font-bold text-brand-navy border-b border-gray-100 pb-4">الرئيسية</a>
                <a href="#about" onClick={() => setIsMenuOpen(false)} className="font-bold text-brand-navy border-b border-gray-100 pb-4">من نحن</a>
                <a href="#services" onClick={() => setIsMenuOpen(false)} className="font-bold text-brand-navy border-b border-gray-100 pb-4">برامجنا</a>
                <a href="#branches" onClick={() => setIsMenuOpen(false)} className="font-bold text-brand-navy border-b border-gray-100 pb-4">فروعنا</a>
                <a href="#contact" onClick={() => setIsMenuOpen(false)} className="bg-brand-turquoise text-white text-center py-4 rounded-2xl font-bold mt-4">سجل الآن</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-b from-brand-light to-white">
        {/* Parallax Background Elements */}
        <motion.div style={{ y: y1 }} className="absolute top-20 right-10 w-64 h-64 bg-brand-yellow/20 rounded-full blur-3xl -z-10" />
        <motion.div style={{ y: y2 }} className="absolute bottom-10 left-10 w-80 h-80 bg-brand-purple/10 rounded-full blur-3xl -z-10" />
        <motion.div style={{ y: y1 }} className="absolute top-40 left-1/4 w-40 h-40 bg-brand-turquoise/20 rounded-full blur-2xl -z-10" />
        
        {/* Floating shapes */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 right-1/4 w-12 h-12 rounded-xl bg-brand-pink/30 backdrop-blur-sm -z-10"
        />
        <motion.div 
          animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }} 
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 right-1/3 w-16 h-16 rounded-full bg-brand-turquoise/30 backdrop-blur-sm -z-10"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Right: Text */}
            <div className="text-center lg:text-right">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-turquoise/10 text-brand-turquoise font-semibold mb-6">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-turquoise opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-turquoise"></span>
                  </span>
                  التسجيل متاح الآن لبرامج الصيف
                </div>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl lg:text-7xl font-black text-brand-navy leading-tight mb-6"
              >
                إنطلاقة مشرقة <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-turquoise to-brand-purple">معكم</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              >
                نقدم برامج تعليمية وترفيهية للأطفال والناشئة، نهدف إلى تنمية المهارات وبناء الشخصية في بيئة آمنة ومحفزة لتنشئة جيل واثق ومبدع.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <a href="#contact" className="bg-brand-purple hover:bg-brand-purple/90 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-brand-purple/20 hover:shadow-xl hover:shadow-brand-purple/30 hover:-translate-y-1 text-center">
                  سجل الآن
                </a>
                <a href="#programs" className="bg-white hover:bg-gray-50 text-brand-navy border border-gray-200 px-8 py-4 rounded-2xl font-bold text-lg transition-all text-center">
                  استكشف البرامج
                </a>
              </motion.div>
            </div>

            {/* Left: Images */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              className="relative h-[400px] lg:h-[600px] w-full mt-10 lg:mt-0"
            >
              {/* Main Image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white z-10">
                <img src="https://images.unsplash.com/photo-1503454537195-1dc534baf3f4?q=80&w=1000&auto=format&fit=crop" alt="أطفال" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              
              {/* Floating Labels */}
              <motion.div 
                animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-10 bg-brand-yellow text-white px-6 py-3 rounded-2xl shadow-xl font-bold text-lg z-20 rotate-6"
              >
                حماس ⚡️
              </motion.div>
              <motion.div 
                animate={{ y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 right-0 bg-brand-turquoise text-white px-6 py-3 rounded-2xl shadow-xl font-bold text-lg z-20 -rotate-6"
              >
                فائدة 💡
              </motion.div>
              <motion.div 
                animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-1/3 left-0 bg-brand-purple text-white px-6 py-3 rounded-2xl shadow-xl font-bold text-lg z-20 -rotate-12"
              >
                متعة 🎨
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-brand-navy py-12 relative z-20 -mt-8 mx-4 sm:mx-8 lg:mx-16 rounded-3xl shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-x-reverse divide-white/10">
            <div>
              <div className="text-4xl md:text-5xl font-black text-brand-turquoise mb-2">+<Counter from={0} to={5000} /></div>
              <div className="text-white/80 font-medium">طالب وطالبة</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-brand-yellow mb-2">+<Counter from={0} to={15} /></div>
              <div className="text-white/80 font-medium">برنامج متنوع</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-brand-pink mb-2">+<Counter from={0} to={10} /></div>
              <div className="text-white/80 font-medium">سنوات خبرة</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-brand-purple mb-2"><Counter from={0} to={2} /></div>
              <div className="text-white/80 font-medium">فروع رئيسية</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-brand-turquoise font-bold tracking-wider uppercase mb-2">من نحن</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-brand-navy mb-6">نبني شخصية طفلك بمتعة وإبداع</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="bg-brand-light rounded-3xl p-8 border border-gray-100 relative overflow-hidden group shadow-sm hover:shadow-xl transition-all"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-turquoise/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-brand-turquoise/20 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-brand-turquoise" />
              </div>
              <h4 className="text-2xl font-bold text-brand-navy mb-4">من نحن</h4>
              <p className="text-gray-600 leading-relaxed text-lg">
                شركة متخصصة في تقديم برامج تعليمية وترفيهية للأطفال والناشئة، نهدف إلى تنمية المهارات وبناء الشخصية في بيئة آمنة ومحفزة.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              whileHover={{ y: -8 }}
              className="bg-brand-light rounded-3xl p-8 border border-gray-100 relative overflow-hidden group shadow-sm hover:shadow-xl transition-all"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-brand-yellow/20 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-brand-yellow" />
              </div>
              <h4 className="text-2xl font-bold text-brand-navy mb-4">رؤيتنا</h4>
              <p className="text-gray-600 leading-relaxed text-lg">
                إعداد جيل واثق، مبدع، وقادر على مواجهة تحديات المستقبل بمهارات عالية وقيم راسخة.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -8 }}
              className="bg-brand-light rounded-3xl p-8 border border-gray-100 relative overflow-hidden group shadow-sm hover:shadow-xl transition-all"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-brand-purple/20 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-brand-purple" />
              </div>
              <h4 className="text-2xl font-bold text-brand-navy mb-4">رسالتنا</h4>
              <p className="text-gray-600 leading-relaxed text-lg">
                تقديم تجربة تعليمية ممتعة تجمع بين التعلم والتفاعل والترفيه بإشراف كادر مؤهل.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-brand-light relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-brand-purple font-bold tracking-wider uppercase mb-2">ماذا نقدم</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-brand-navy mb-6">برامج متكاملة لتنمية طفلك</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
              >
                <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold text-brand-navy mb-3">{service.title}</h4>
                <p className="text-gray-600 leading-relaxed relative z-10">{service.description}</p>
                
                {/* Animated Bottom Border */}
                <div 
                  className={`absolute bottom-0 right-0 h-1.5 w-[30%] transition-all duration-300 group-hover:w-full ${service.color.replace('/10', '')}`}
                ></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Carousel */}
      <ProgramsSection />

      {/* Partners Scroll */}
      <PartnersScroll />

      {/* Testimonials */}
      <Testimonials />

      {/* Final CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-turquoise to-brand-purple z-0"></div>
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-0"
        ></motion.div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center text-white">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black mb-6"
          >
            ابدأ رحلة طفلك مع نوادي الأجيال
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-white/90 mb-10"
          >
            سجّل الآن واحصل على خصومات خاصة — فروعنا في الرياض والخبر
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#contact" className="bg-white text-brand-purple px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105 animate-pulse">
              سجل الآن
            </a>
            <a href="tel:0550460749" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:bg-white/10">
              تواصل معنا
            </a>
          </motion.div>
        </div>
      </section>

      {/* Branches & Contact */}
      <section id="branches" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Branches */}
            <div>
              <h2 className="text-brand-turquoise font-bold tracking-wider uppercase mb-2">تواصل معنا</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-brand-navy mb-8">نسعد باستقبالكم في فروعنا</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-brand-light rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                    <MapPin className="w-6 h-6 text-brand-turquoise" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-brand-navy mb-2">فرع الرياض</h4>
                    <p className="text-gray-600">المملكة العربية السعودية، الرياض</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-brand-light rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                    <MapPin className="w-6 h-6 text-brand-purple" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-brand-navy mb-2">فرع الخبر</h4>
                    <p className="text-gray-600">المملكة العربية السعودية، الخبر</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-brand-turquoise/5 rounded-2xl border border-brand-turquoise/20 hover:bg-brand-turquoise/10 transition-colors">
                  <div className="w-12 h-12 bg-brand-turquoise text-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">اتصل بنا</p>
                    <a href="tel:0550460749" className="text-xl font-bold text-brand-navy hover:text-brand-turquoise transition-colors" dir="ltr">
                      055 046 0749
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-brand-purple/5 rounded-2xl border border-brand-purple/20 hover:bg-brand-purple/10 transition-colors">
                  <div className="w-12 h-12 bg-brand-purple text-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">راسلنا</p>
                    <a href="mailto:nawadiksa@gmail.com" className="text-lg font-bold text-brand-navy hover:text-brand-purple transition-colors">
                      nawadiksa@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div id="contact" className="bg-brand-navy rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-turquoise/20 rounded-full blur-3xl -z-0"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-pink/20 rounded-full blur-3xl -z-0"></div>
              
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-2">سجل اهتمامك</h3>
                <p className="text-gray-300 mb-8">اترك بياناتك وسنقوم بالتواصل معك لتزويدك بكافة التفاصيل.</p>
                
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">اسم ولي الأمر</label>
                    <input type="text" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-turquoise focus:border-transparent transition-all" placeholder="الاسم الكامل" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">رقم الجوال</label>
                    <input type="tel" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-turquoise focus:border-transparent transition-all" placeholder="05x xxx xxxx" dir="ltr" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">الفرع المفضل</label>
                    <select className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-turquoise focus:border-transparent transition-all appearance-none">
                      <option value="" className="text-gray-900">اختر الفرع</option>
                      <option value="riyadh" className="text-gray-900">الرياض</option>
                      <option value="khobar" className="text-gray-900">الخبر</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-brand-turquoise hover:bg-brand-turquoise/90 text-white font-bold text-lg py-4 rounded-xl mt-6 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-brand-turquoise/30">
                    إرسال الطلب <Send className="w-5 h-5 rotate-180" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A3A5C] pt-16 pb-8 text-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="bg-white/10 p-4 rounded-2xl inline-block mb-6">
                <Logo light />
              </div>
              <p className="mb-6 leading-relaxed">
                شركة متخصصة في تقديم برامج تعليمية وترفيهية للأطفال والناشئة، نهدف إلى تنمية المهارات وبناء الشخصية في بيئة آمنة ومحفزة.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-6">روابط سريعة</h4>
              <ul className="space-y-3">
                <li><a href="#home" className="hover:text-brand-turquoise transition-colors">الرئيسية</a></li>
                <li><a href="#about" className="hover:text-brand-turquoise transition-colors">من نحن</a></li>
                <li><a href="#services" className="hover:text-brand-turquoise transition-colors">برامجنا</a></li>
                <li><a href="#contact" className="hover:text-brand-turquoise transition-colors">سجل الآن</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-6">فروعنا</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-brand-turquoise" /> الرياض</li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-brand-purple" /> الخبر</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-6">تابعنا</h4>
              <div className="flex flex-wrap gap-3">
                <a href="https://x.com/Nawadiksa" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-all" title="X (Twitter)">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://instagram.com/Nawadiksa" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E1306C] hover:text-white transition-all" title="Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://snapchat.com/add/Nawadiksa" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FFFC00] hover:text-black transition-all" title="Snapchat">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.08 0c-1.8 0-3.52.28-4.96.8-1.48.52-2.6 1.32-3.32 2.36-.72 1.04-1.08 2.28-1.08 3.72 0 1.28.24 2.4.72 3.36.48.96 1.16 1.76 2.04 2.4.88.64 1.92 1.12 3.12 1.44.2.04.36.12.48.24.12.12.16.28.12.48-.04.2-.16.36-.36.48-.2.12-.48.2-.84.24-1.12.08-2.12-.08-3-.48-.88-.4-1.64-.96-2.28-1.68-.16-.2-.4-.28-.72-.24-.32.04-.56.2-.72.48-.16.28-.16.56 0 .84.16.28.4.52.72.72 1.04.64 2.28 1.12 3.72 1.44 1.44.32 3.04.48 4.8.48 1.76 0 3.36-.16 4.8-.48 1.44-.32 2.68-.8 3.72-1.44.32-.2.56-.44.72-.72.16-.28.16-.56 0-.84-.16-.28-.4-.44-.72-.48-.32-.04-.56.04-.72.24-.64.72-1.4 1.28-2.28 1.68-.88.4-1.88.56-3 .48-.36-.04-.64-.12-.84-.24-.2-.12-.32-.28-.36-.48-.04-.2.04-.36.12-.48.12-.12.28-.2.48-.24 1.2-.32 2.24-.8 3.12-1.44.88-.64 1.56-1.44 2.04-2.4.48-.96.72-2.08.72-3.36 0-1.44-.36-2.68-1.08-3.72-.72-1.04-1.84-1.84-3.32-2.36-1.44-.52-3.16-.8-4.96-.8z"/></svg>
                </a>
                <a href="https://tiktok.com/@Nawadiksa" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-black hover:text-white transition-all" title="TikTok">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.8-5.46-.4-2.52.49-5.14 2.37-6.86 1.83-1.68 4.41-2.42 6.83-1.92v4.02c-1.23-.27-2.55-.13-3.66.52-.96.55-1.67 1.48-1.89 2.56-.25 1.25.13 2.58.99 3.49.81.87 2.03 1.29 3.21 1.14 1.43-.17 2.62-1.2 2.98-2.58.15-.58.21-1.19.21-1.79V.02h-.05z"/></svg>
                </a>
                <a href="https://t.me/Nawadiksa" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0088cc] hover:text-white transition-all" title="Telegram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                </a>
                <a href="https://youtube.com/@Nawadiksa" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-all" title="YouTube">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10 text-sm">
            <p>© {new Date().getFullYear()} شركة نوادي الأجيال. جميع الحقوق محفوظة.</p>
            <div className="flex gap-6">
              <span>سجل تجاري: 1010805802</span>
              <a href="https://nawadiksa.net" target="_blank" rel="noopener noreferrer" className="hover:text-brand-turquoise transition-colors">nawadiksa.net</a>
              <span className="text-brand-turquoise font-bold">رؤية 2030</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <AnimatePresence>
        {isScrolled && (
          <motion.a
            href="https://wa.me/966550460749"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            className="fixed bottom-8 left-8 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:bg-[#20bd5a] transition-colors"
            aria-label="تواصل معنا عبر واتساب"
          >
            <MessageCircle className="w-8 h-8" />
            <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-50"></span>
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}
