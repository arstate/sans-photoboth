import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles, ChevronRight } from 'lucide-react';
import { GoogleGenAI, Chat } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Halo bestie! 👋 Aku Sans AI. Ada yang bisa aku bantu soal photobooth?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // State untuk instance chat
  const [chatSession, setChatSession] = useState<Chat | null>(null);

  // Refs untuk logika Drag-to-Scroll
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const didDrag = useRef(false); // Flag untuk mencegah klik saat dragging

  // Shortcut Questions
  const shortcuts = [
    "Berapa harganya?",
    "Cara booking gimana?",
    "Lokasi studio dimana?",
    "Ada paket wedding?"
  ];

  // Scroll ke pesan terakhir
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Inisialisasi Gemini Chat saat komponen dimount
  useEffect(() => {
    const initChat = async () => {
      try {
        // Menggunakan process.env.API_KEY secara langsung sesuai standar platform
        // Variabel ini dijamin tersedia oleh environment eksekusi
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const chat = ai.chats.create({
          model: 'gemini-2.5-flash-lite-preview-02-05',
          config: {
            systemInstruction: `Anda adalah 'Sans AI', asisten virtual untuk 'Sans Photobooth' di Surabaya.
            Gaya bicara: Gen-Z, ramah, santai, menggunakan emoji, dan membantu. Gunakan bahasa Indonesia gaul tapi sopan (aku/kamu).
            
            Informasi Layanan:
            1. Event Photobooth: Untuk wedding/party, kamera Sony, cetak instan.
            2. Mobile Photobooth: Fotografer keliling (roving), langsung kirim softfile.
            3. Self Photo Studio: Studio mandiri dengan remote, privasi penuh.
            4. Software Solution: Jual software photobooth (B2B).

            Keunggulan: Hasil HD & Glowing, Share via QR Code, Basecamp Surabaya (bisa ke seluruh Jatim).

            PENTING:
            - Jika ditanya soal HARGA/PRICELIST secara spesifik, arahkan pengguna untuk menghubungi WhatsApp admin di 088235479203 agar dapat penawaran terbaik.
            - Jangan mengarang harga sendiri.
            - Jawablah dengan ringkas (maksimal 3-4 kalimat per chat).
            `,
          },
        });
        setChatSession(chat);
      } catch (error) {
        console.error("Failed to init chat:", error);
        // Fallback message jika inisialisasi gagal total (misal API key kosong dari server)
        setMessages(prev => [...prev, { role: 'model', text: 'Maaf bestie, sistemku lagi maintenance sebentar. Silakan refresh atau WA admin ya! 🙏' }]);
      }
    };

    initChat();
  }, []);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || inputValue;
    if (!textToSend.trim() || isLoading) return;

    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setIsLoading(true);

    try {
      if (chatSession) {
        const result = await chatSession.sendMessage({ message: textToSend });
        const text = result.text;
        setMessages(prev => [...prev, { role: 'model', text: text }]);
      } else {
        // Fallback jika session belum siap
        setMessages(prev => [...prev, { role: 'model', text: 'Sabar ya bestie, aku masih loading nih... Coba kirim ulang bentar lagi! ⏳' }]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: 'Waduh, koneksi putus nih. Coba lagi ya! 😢' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  // --- Logic Drag & Scroll ---
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    didDrag.current = false;
    if (scrollContainerRef.current) {
      startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
      scrollLeft.current = scrollContainerRef.current.scrollLeft;
    }
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault(); // Prevent text selection
    didDrag.current = true; // Mark as dragged
    if (scrollContainerRef.current) {
      const x = e.pageX - scrollContainerRef.current.offsetLeft;
      const walk = (x - startX.current) * 1.5; // Multiplier for scroll speed
      scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Mencegah scroll body saat scrolling horizontal di shortcut
    e.stopPropagation();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  const handleShortcutClick = (shortcut: string) => {
    // Jika user baru saja men-drag (bukan klik), jangan kirim pesan
    if (didDrag.current) return;
    handleSend(shortcut);
  };

  // Mencegah event scroll bocor ke parent saat mouse ada di dalam widget
  const handlePopupWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      
      {/* 1. LAYER TOMBOL (Absolute) */}
      <div 
        className={`absolute bottom-0 right-0 transition-all duration-700 ease-in-out origin-center ${
          isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
        }`}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-3 bg-sans-purple hover:bg-purple-800 text-white pl-5 pr-6 py-4 rounded-full shadow-2xl shadow-purple-900/30 transition-transform hover:scale-105 cursor-pointer"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6 text-sans-yellow animate-pulse" />
          </div>
          <span className="font-bold font-display text-base tracking-wide">Tanya Sesuatu</span>
        </button>
      </div>

      {/* 2. LAYER POPUP CHAT (Absolute & Origin Bottom Right) */}
      <div 
        className={`
          origin-bottom-right transition-all duration-700 ease-in-out
          bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden flex flex-col
          w-[350px] md:w-[380px] h-[500px] overscroll-contain
          ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-0 opacity-0 translate-y-10 pointer-events-none'}
        `}
        style={{ overscrollBehavior: 'contain' }}
        onWheel={handlePopupWheel} // Stop propagation scroll ke body
      >
        {/* Header */}
        <div className="bg-sans-purple p-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <MessageCircle className="w-5 h-5 text-sans-yellow" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg leading-tight">Sans AI</h3>
              <p className="text-purple-200 text-xs flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Online
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 overscroll-contain custom-scrollbar"
          style={{ overscrollBehavior: 'contain' }}
        >
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-sans-purple text-white rounded-br-none' 
                    : 'bg-white text-gray-700 border border-gray-100 shadow-sm rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-gray-100 shadow-sm flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-sans-purple animate-spin" />
                <span className="text-xs text-gray-400">Ngetik...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Shortcut & Input Area */}
        <div className="bg-white border-t border-gray-100 shrink-0">
          {/* Shortcuts Scrollable Area with Drag & Wheel support */}
          <div 
            ref={scrollContainerRef}
            className="px-4 pt-3 pb-1 overflow-x-auto no-scrollbar flex gap-2 cursor-grab active:cursor-grabbing select-none overscroll-contain"
            style={{ overscrollBehavior: 'contain' }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onWheel={handleWheel}
          >
            {shortcuts.map((shortcut, idx) => (
               <button 
                 key={idx}
                 onClick={() => handleShortcutClick(shortcut)}
                 className="flex-shrink-0 text-xs font-medium bg-purple-50 text-sans-purple px-3 py-1.5 rounded-full hover:bg-sans-purple hover:text-white transition-colors border border-purple-100 pointer-events-auto"
               >
                 {shortcut}
               </button>
            ))}
          </div>

          <div className="p-4 pt-2">
            <div className="flex gap-2 items-center bg-gray-100 rounded-full px-4 py-2 border border-transparent focus-within:border-sans-purple/30 focus-within:bg-white focus-within:shadow-sm transition-all">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Tanya harga atau layanan..."
                className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
              />
              <button 
                onClick={() => handleSend()}
                disabled={isLoading || !inputValue.trim()}
                className={`p-2 rounded-full transition-all ${
                  isLoading || !inputValue.trim() 
                    ? 'text-gray-400 bg-gray-200 cursor-not-allowed' 
                    : 'bg-sans-purple text-white hover:bg-purple-800 shadow-md cursor-pointer'
                }`}
              >
                <Send size={16} />
              </button>
            </div>
            <div className="text-center mt-2">
               <p className="text-[10px] text-gray-400">Dibuat oleh Sans Photobooth</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;