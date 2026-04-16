import { useState, useRef, useEffect } from 'react'
import mazitoImg from '../assets/Mazito.png'
import { preguntarChatbot } from '../api'

type Message = {
  id: string
  sender: 'bot' | 'user'
  text: string
}

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: '¡Hola! Soy el asistente virtual "Mazito" del IES Villas de Mazo. ¿En qué te puedo ayudar hoy?'
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) scrollToBottom()
  }, [messages, isTyping, isOpen])

  const handleSend = async (text: string) => {
    if (!text.trim()) return

    // Preparar el historial antes de añadir el nuevo mensaje del usuario
    // El formato esperado por Gemini en el backend es: [{ role: 'user' | 'model', parts: [{ text: string }] }]
    // IMPORTANTE: El historial de Gemini DEBE empezar siempre con un mensaje de 'user'.
    const history = messages
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model' as 'user' | 'model',
        parts: [{ text: msg.text }]
      }))
      .filter((msg, index) => {
        // Si el primer mensaje es del modelo (el saludo inicial), lo saltamos para cumplir la regla de Gemini
        if (index === 0 && msg.role === 'model') return false;
        return true;
      });

    const newMessage: Message = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(),
      sender: 'user',
      text
    }
    
    setMessages(prev => [...prev, newMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      // Llamada real a la API del chatbot enviando el mensaje actual y el historial
      const answerText = await preguntarChatbot(text, history);
      
      setMessages(prev => [...prev, {
        id: crypto.randomUUID ? crypto.randomUUID() : (Date.now() + 1).toString(),
        sender: 'bot',
        text: answerText
      }])
    } catch (error: any) {
      console.error("Chatbot Error:", error);
      
      const apiErrorMessage = error.response?.data?.message || error.response?.data || error.message;
      const displayMessage = apiErrorMessage 
        ? `Error de la API: ${apiErrorMessage}`
        : 'Lo siento, tuve un problema conectándome a mi cerebro digital. Por favor, inténtalo de nuevo más tarde o revisa tu conexión.';

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: displayMessage
      }])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

      {/* Botón flotante para abrir/cerrar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[#98c7d1] rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform duration-300 z-50 group border-[3px] border-white relative"
        aria-label="Abrir asistente Mazito"
      >
        {isOpen ? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            <img src={mazitoImg} alt="Mazito" className="w-[85%] h-[85%] object-contain group-hover:-translate-y-1 transition-transform" />
            <div className="absolute top-0 right-0 w-4 h-4 bg-[#FF9B71] border-2 border-white rounded-full animate-pulse" />
          </div>
        )}
      </button>

      {/* Ventana del Chat */}
      <div
        className={`fixed bottom-28 right-6 w-[calc(100vw-3rem)] sm:w-[420px] max-w-[420px] bg-white rounded-3xl overflow-hidden shadow-[0_12px_50px_rgba(152,199,209,0.4)] border border-[#98c7d1]/20 flex flex-col transition-all duration-300 origin-bottom-right
          ${isOpen ? 'scale-100 opacity-100 pointer-events-auto flex' : 'scale-90 opacity-0 pointer-events-none hidden'}`}
        style={{ height: 'min(600px, calc(100vh - 120px))' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#98c7d1] to-[#7dbac5] px-5 py-4 flex items-center gap-3 relative overflow-hidden flex-shrink-0">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm relative z-10 overflow-hidden">
            <img src={mazitoImg} alt="Mazito" className="w-8 h-8 object-contain" />
          </div>
          <div className="relative z-10 flex-1">
            <h3 className="text-white font-bold text-[0.95rem] leading-tight">Asistente Virtual Mazito</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ECF4E8] animate-pulse" />
              <p className="text-white/90 text-[0.75rem] font-medium">En línea</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors relative z-10 p-1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 bg-[#f4fafa] scroll-smooth">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
              {msg.sender === 'bot' && (
                <div className="w-7 h-7 rounded-full bg-white border border-[#98c7d1]/30 flex flex-col items-center justify-end mr-2 flex-shrink-0 self-end mb-1 overflow-hidden shadow-sm">
                  <img src={mazitoImg} alt="Bot" className="w-[85%] h-[85%] object-contain mb-[1px]" />
                </div>
              )}
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-[0.9rem] leading-relaxed shadow-sm ${msg.sender === 'user'
                ? 'bg-[#98c7d1] text-white rounded-br-sm'
                : 'bg-white border text-fp-dark rounded-bl-sm border-[#98c7d1]/10'
                }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start items-end animate-in fade-in duration-300">
              <div className="w-7 h-7 rounded-full bg-white border border-[#98c7d1]/30 flex items-center justify-center mr-2 flex-shrink-0 mb-1 shadow-sm">
                <img src={mazitoImg} alt="Bot typing" className="w-[85%] h-[85%] object-contain" />
              </div>
              <div className="bg-white border rounded-2xl rounded-bl-sm border-[#98c7d1]/10 px-4 py-3 shadow-sm flex items-center gap-1.5 h-10">
                <div className="w-1.5 h-1.5 rounded-full bg-[#98c7d1]/70 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-[#98c7d1]/70 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-[#98c7d1]/70 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-[#98c7d1]/20 flex-shrink-0">
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
            className="flex items-center gap-2 relative"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribe tu mensaje..."
              disabled={isTyping}
              className="flex-1 bg-[#f4fafa] border border-[#98c7d1]/30 rounded-full pl-4 pr-12 py-2.5 text-[0.9rem] text-fp-dark focus:outline-none focus:border-[#98c7d1] focus:ring-2 focus:ring-[#98c7d1]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-fp-muted/60"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#98c7d1] text-white rounded-full flex items-center justify-center hover:bg-[#7dbac5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              aria-label="Enviar"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-0.5">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Hide scrollbar styles locally if possible via tailwind globals, else inline */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  )
}
