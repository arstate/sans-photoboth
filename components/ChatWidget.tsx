import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';
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
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            console.warn("API Key not found");
            return;
        }

        const ai = new GoogleGenAI({ apiKey: apiKey });
        
        const chat = ai.chats.create({
          model: 'gemini-2.5-flash',
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
      }
    };

    initChat();
  }, []);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      if (chatSession) {
        const result = await chatSession.sendMessage({ message: userMsg });
        const text = result.text;
        setMessages(prev => [...prev, { role: 'model', text: text }]);
      } else {
        // Fallback jika API key belum siap/error
        setMessages(prev => [...prev, { role: 'model', text: 'Maaf bestie, aku lagi loading nih. Coba refresh ya atau hubungi WA Admin langsung! 🙏' }]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: 'Waduh, koneksi lagi gangguan nih. Coba lagi nanti ya! 😢' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div 
      className={`fixed bottom-6 right-6 z-[100] flex flex-col items-end transition-all duration-500 ease-in-out ${
        isOpen ? 'w-[350px] md:w-[380px]' : 'w-auto'
      }`}
    >
      {/* Tombol Utama (Toggle) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-3 bg-sans-purple hover:bg-purple-800 text-white pl-5 pr-6 py-4 rounded-full shadow-2xl shadow-purple-900/30 transition-all duration-300 hover:scale-105 cursor-pointer"
        >
          <div className="relative">
            <Sparkles className="w-6 h-6 text-sans-yellow animate-pulse" />
          </div>
          <span className="font-bold font-display text-base tracking-wide">Tanya Sesuatu</span>
        </button>
      )}

      {/* Jendela Chat (Popup) */}
      <div 
        className={`bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden flex flex-col transition-all duration-500 origin-bottom-right ${
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0 h-[500px] w-full mt-4' 
            : 'opacity-0 scale-50 translate-y-20 h-0 w-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-sans-purple p-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Sparkles className="w-5 h-5 text-sans-yellow" />
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
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
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

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100 shrink-0">
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
              onClick={handleSend}
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
             <p className="text-[10px] text-gray-400">Powered by Gemini AI ✨</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
