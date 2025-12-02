import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Phone, ChevronRight, ExternalLink } from 'lucide-react';
import { GoogleGenAI, Chat } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
  isButton?: boolean;
  actionUrl?: string;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Halo Bestie! 👋 Aku Sans AI. Ada yang bisa aku bantu buat momen serumu?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWAPopup, setShowWAPopup] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatSession, setChatSession] = useState<Chat | null>(null);

  // API KEYS LIST (Rotation System)
  const API_KEYS = [
    "AIzaSyCHVn95FnGTPtxMRRBXa_cHCteJKv3KGiY",
    "AIzaSyDYJVMP0Pue7vodzWBeX0I06PgzYFoPJy8",
    "AIzaSyB-ZDRLEvwxly7WOdX11n_u5d34wdqpxIw",
    "AIzaSyDsJOd0dUNYwcIKOUdt1KBGdTwM7J7QQ1k",
    "AIzaSyCBpztyFBeolgyAM_ZXQcsO0NSpwsuh1xM",
    "AIzaSyD2mp7DPiHU_zXZdnK3nLsl1bsJTE7VdyY",
    "AIzaSyD2mp7DPiHU_zXZdnK3nLsl1bsJTE7VdyY",
    "AIzaSyC8TAGHcxgKV7MxpevwitVzaJ3WjVp-RLI"
  ];

  // Track current key index
  const currentKeyIndex = useRef(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const didDrag = useRef(false);

  const shortcuts = [
    "Pricelist dong?",
    "Cara booking?",
    "Lokasi dimana?",
    "Ada paket wedding?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Helper to create a new session with specific key
  const createChatSession = (keyIndex: number) => {
    try {
      if (keyIndex >= API_KEYS.length) {
        console.error("All API Keys exhausted");
        return null;
      }

      const apiKey = API_KEYS[keyIndex];
      const ai = new GoogleGenAI({ apiKey });
      
      return ai.chats.create({
        model: 'gemini-flash-lite-latest',
        config: {
          systemInstruction: `Anda adalah 'Sans AI', customer service virtual dari Sans Photobooth yang super ramah dan asik.

          PERSONALITY & NADA BICARA:
          1. Panggil user dengan sebutan "Bestie" ✨.
          2. Gunakan bahasa Indonesia yang santai, bersahabat, dan sopan (tidak kaku, tidak kasar, tidak "lu gue").
          3. Gunakan emoji secukupnya agar chat terasa hidup dan menyenangkan 😄.
          4. JANGAN gunakan format markdown (seperti tanda bintang *, pagar #, bold, italic). Tulis teks biasa saja.
          
          PANJANG JAWABAN:
          - Jawablah dengan JELAS dan INFORMATIF, tapi tetap ringkas (2-4 kalimat). 
          - Jangan terlalu pendek sampai terkesan ketus, tapi jangan membuat karangan panjang.

          SOP KHUSUS:
          - Jika user bertanya soal PRICELIST, HARGA, BOOKING, atau CUSTOM REQUEST: Jelaskan sekilas layanan kami (Event/Mobile/Self Photo), lalu SARANKAN user untuk "Chat WA Admin" agar mendapat detail lengkapnya.
          - Jika user hanya menyapa atau bertanya info umum (lokasi, fitur): Jawab langsung tanpa menyuruh ke WA.

          INFO PRODUK:
          - Photobooth Event: Unlimited print, kamera Sony Alpha, lighting studio pro.
          - Mobile/Roving: Fotografer keliling, tamu dapat softfile via QR code instan.
          - Self Photo: Studio mandiri dengan remote, privasi terjaga.
          - Lokasi: Surabaya.
          `,
        },
      });
    } catch (error) {
      console.error("Error creating session:", error);
      return null;
    }
  };

  // Initialize first session
  useEffect(() => {
    const session = createChatSession(0);
    if (session) setChatSession(session);
  }, []);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || inputValue;
    if (!textToSend.trim() || isLoading) return;

    setInputValue('');
    // Optimistic UI update
    const currentMessages = [...messages, { role: 'user', text: textToSend } as Message];
    setMessages(currentMessages);
    setIsLoading(true);

    try {
      let resultText = "";
      let success = false;
      let activeSession = chatSession;

      if (!activeSession) {
        activeSession = createChatSession(currentKeyIndex.current);
      }

      // RETRY LOOP LOGIC
      while (!success && currentKeyIndex.current < API_KEYS.length) {
        if (!activeSession) {
           currentKeyIndex.current++;
           activeSession = createChatSession(currentKeyIndex.current);
           continue; 
        }

        try {
          const result = await activeSession.sendMessage({ message: textToSend });
          resultText = result.text;
          success = true;
          
          if (activeSession !== chatSession) {
            setChatSession(activeSession);
          }
        } catch (error) {
          console.warn(`Key at index ${currentKeyIndex.current} failed. Switching...`);
          currentKeyIndex.current++; 
          if (currentKeyIndex.current < API_KEYS.length) {
            activeSession = createChatSession(currentKeyIndex.current);
          }
        }
      }

      if (success) {
        // CLEANUP: Remove markdown symbols (*, #, _, `, >) to ensure clean text
        const cleanText = resultText.replace(/[*_~`#>-]/g, '').trim();
        
        const newMessages = [...currentMessages, { role: 'model', text: cleanText } as Message];

        // LOGIC: Only show WhatsApp Button if the AI explicitly suggests contacting admin/WA
        // or mentions the number. This prevents the button from appearing on every chat.
        const lowerText = cleanText.toLowerCase();
        const triggerKeywords = ["wa admin", "whatsapp admin", "hubungi admin", "0882", "chat wa"];
        
        if (triggerKeywords.some(keyword => lowerText.includes(keyword))) {
           newMessages.push({
             role: 'model',
             text: 'Chat Admin WhatsApp',
             isButton: true,
             actionUrl: 'https://wa.me/6288235479203?text=Halo%20Admin%20Sans,%20mau%20tanya%20pricelist'
           });
        }

        setMessages(newMessages);
      } else {
        throw new Error("Service Unavailable");
      }

    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Waduh, server lagi padat Bestie. Coba chat WA admin langsung aja ya! 🙏' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  const handleWARedirect = () => {
    window.open(`https://wa.me/6288235479203?text=Halo%20Admin%20Sans,%20mau%20tanya%20pricelist`, '_blank');
    setShowWAPopup(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    didDrag.current = false;
    if (scrollContainerRef.current) {
      startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
      scrollLeft.current = scrollContainerRef.current.scrollLeft;
    }
  };

  const handleMouseLeave = () => { isDragging.current = false; };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    didDrag.current = true;
    if (scrollContainerRef.current) {
      const x = e.pageX - scrollContainerRef.current.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none font-sans">
      
      {/* TRIGGER BUTTON */}
      <div 
        className={`absolute bottom-0 right-0 transition-all duration-300 ease-in-out ${
          isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100 pointer-events-auto'
        }`}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 bg-sans-yellow text-black border-2 border-black pl-5 pr-6 py-4 shadow-neo transition-transform hover:-translate-y-1 hover:shadow-neo-lg cursor-pointer"
        >
          <MessageCircle className="w-6 h-6" strokeWidth={2.5} />
          <span className="font-bold font-display uppercase tracking-wider">Chat AI</span>
        </button>
      </div>

      {/* CHAT WINDOW */}
      <div 
        className={`
          relative origin-bottom-right transition-all duration-300 ease-in-out
          bg-white border-2 border-black shadow-neo-lg flex flex-col
          w-[calc(100vw-3rem)] max-w-[350px] md:w-[380px] md:max-w-none h-[500px] max-h-[80vh]
          ${isOpen ? 'scale-100 opacity-100 translate-y-0 pointer-events-auto' : 'scale-0 opacity-0 translate-y-10 pointer-events-none'}
        `}
        onWheel={(e) => e.stopPropagation()}
      >
        
        {/* WA Popup */}
        {showWAPopup && (
          <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center p-6">
             <div className="bg-white border-2 border-black p-6 w-full shadow-neo text-center">
                <div className="w-12 h-12 bg-green-500 border-2 border-black mx-auto mb-4 flex items-center justify-center">
                   <Phone className="text-white w-6 h-6" />
                </div>
                <h4 className="font-bold font-display uppercase mb-2">Switch ke WhatsApp?</h4>
                <div className="flex gap-3 w-full mt-6">
                  <button onClick={() => setShowWAPopup(false)} className="flex-1 py-2 border-2 border-black font-bold uppercase hover:bg-gray-200">Batal</button>
                  <button onClick={handleWARedirect} className="flex-1 py-2 bg-green-500 border-2 border-black text-white font-bold uppercase hover:bg-green-600 shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all">Gas</button>
                </div>
             </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-sans-purple border-b-2 border-black p-4 flex justify-between items-center z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white border-2 border-black flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-black" />
            </div>
            <div>
              <h3 className="font-bold font-display text-white uppercase leading-none">Sans AI</h3>
              <p className="text-xs text-white font-mono flex items-center gap-1 mt-1">
                <span className="w-2 h-2 bg-green-400 border border-black animate-pulse"></span>
                ONLINE
              </p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white hover:text-black hover:bg-white border-2 border-transparent hover:border-black p-1 transition-all cursor-pointer">
            <X size={20} />
          </button>
        </div>

        {/* WA Banner */}
        <button 
          onClick={() => setShowWAPopup(true)}
          className="bg-green-300 border-b-2 border-black px-4 py-2 flex items-center justify-between hover:bg-green-400 cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-black" />
            <span className="text-xs font-bold text-black uppercase">Chat Sans AI Di WhatsApp</span>
          </div>
          <ChevronRight size={16} className="text-black" />
        </button>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f0f0f0] custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.isButton ? (
                 <button 
                   onClick={() => window.open(msg.actionUrl, '_blank')}
                   className="flex items-center gap-2 bg-green-500 text-white px-4 py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-bold uppercase text-sm"
                 >
                    <Phone size={16} /> {msg.text} <ExternalLink size={14} />
                 </button>
              ) : (
                <div 
                  className={`max-w-[85%] p-3 border-2 border-black text-sm font-medium ${
                    msg.role === 'user' 
                      ? 'bg-black text-white shadow-[4px_4px_0px_0px_rgba(139,92,246,1)]' // Purple shadow
                      : 'bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                  }`}
                >
                  {msg.text}
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-3 border-2 border-black flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-xs font-bold uppercase">Typing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t-2 border-black z-20">
          <div 
            ref={scrollContainerRef}
            className="px-4 pt-3 pb-2 overflow-x-auto no-scrollbar flex gap-2 cursor-grab active:cursor-grabbing border-b-2 border-black bg-gray-50"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {shortcuts.map((shortcut, idx) => (
               <button 
                 key={idx}
                 onClick={() => !didDrag.current && handleSend(shortcut)}
                 className="flex-shrink-0 text-xs font-bold uppercase bg-white text-black px-3 py-1 border-2 border-black hover:bg-sans-yellow transition-colors pointer-events-auto shadow-neo-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
               >
                 {shortcut}
               </button>
            ))}
          </div>

          <div className="p-3 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ketik pesan..."
              className="flex-1 bg-white border-2 border-black px-3 py-2 outline-none text-sm font-bold placeholder-gray-400 focus:shadow-neo-sm transition-shadow"
            />
            <button 
              onClick={() => handleSend()}
              disabled={isLoading || !inputValue.trim()}
              className={`px-3 py-2 border-2 border-black transition-all ${
                isLoading || !inputValue.trim() 
                  ? 'bg-gray-200 cursor-not-allowed opacity-50' 
                  : 'bg-sans-purple text-white hover:bg-purple-700 shadow-neo-sm active:shadow-none active:translate-x-[1px] active:translate-y-[1px]'
              }`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;