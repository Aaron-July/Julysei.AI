import React, { useState, useRef, useEffect } from 'react';
import { Message, ChatMode } from '../types';
import { createChatSession } from '../services/geminiService';
import { useLiveApi } from '../hooks/useLiveApi';
import { MessageCircle, X, Send, Mic, MicOff, Phone, Activity } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { GenerateContentResponse } from '@google/genai';

interface ChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
  initialMessage?: string;
  triggerConfig?: number;
}

export const Chatbot = ({ isOpen, onToggle, initialMessage, triggerConfig }: ChatbotProps) => {
  const [mode, setMode] = useState<ChatMode>(ChatMode.TEXT);
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: 'model', text: "Hi! I'm Julysei's AI Assistant. How can I help you build your dream project today?" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatSessionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Live API Hook
  const { connect, disconnect, connectionState, isSpeaking } = useLiveApi();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Update input text when initialMessage changes (triggered by parent form submission)
  useEffect(() => {
    if (initialMessage && isOpen) {
        setInputText(initialMessage);
        // Focus the input to let user hit send immediately
        setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
    }
  }, [initialMessage, triggerConfig, isOpen]);

  useEffect(() => {
    // Initialize standard chat session
    try {
        chatSessionRef.current = createChatSession();
    } catch (e) {
        console.error("Failed to init chat session", e);
    }
  }, []);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: inputText };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      if (!chatSessionRef.current) {
          chatSessionRef.current = createChatSession();
      }
      const result = await chatSessionRef.current.sendMessageStream({ message: userMsg.text });
      
      let fullText = "";
      const botMsgId = (Date.now() + 1).toString();
      
      setMessages(prev => [...prev, { id: botMsgId, role: 'model', text: '' }]);

      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        const text = c.text || "";
        fullText += text;
        setMessages(prev => prev.map(m => m.id === botMsgId ? { ...m, text: fullText } : m));
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: "I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleMode = () => {
    if (mode === ChatMode.TEXT) {
      setMode(ChatMode.VOICE);
      // Don't auto-connect, let user click "Call"
    } else {
      setMode(ChatMode.TEXT);
      disconnect(); // Disconnect if leaving voice mode
    }
  };

  const handleVoiceToggle = () => {
      if (connectionState.isConnected) {
          disconnect();
      } else {
          connect();
      }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={onToggle}
        className={`fixed bottom-6 right-6 z-[110] p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer ${isOpen ? 'rotate-90 bg-brand-surface text-brand-muted border border-brand-border/10' : 'bg-brand-highlight text-brand-base'}`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-brand-surface border border-brand-border/10 rounded-2xl shadow-2xl z-[100] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          
          {/* Header */}
          <div className="p-4 bg-brand-base border-b border-brand-border/10 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${mode === ChatMode.VOICE && connectionState.isConnected ? 'bg-green-500 animate-pulse' : 'bg-brand-highlight'}`} />
                <span className="font-bold text-brand-text">Julysei Assistant</span>
            </div>
            <button 
                onClick={toggleMode}
                className="text-xs px-2 py-1 rounded bg-brand-surface hover:bg-brand-border/10 text-brand-text transition-colors flex items-center gap-1 cursor-pointer border border-brand-border/5"
            >
                {mode === ChatMode.TEXT ? <><Phone className="w-3 h-3" /> Switch to Voice</> : <><MessageCircle className="w-3 h-3" /> Switch to Text</>}
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto bg-brand-base/50 relative">
            
            {mode === ChatMode.TEXT ? (
                // --- Text Chat UI ---
                <div className="p-4 space-y-4">
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                                msg.role === 'user' 
                                ? 'bg-brand-highlight text-brand-base rounded-br-none' 
                                : 'bg-brand-surface border border-brand-border/10 text-brand-text rounded-bl-none [&>ul]:list-disc [&>ul]:pl-4 [&>ol]:list-decimal [&>ol]:pl-4 [&>p]:mb-2 last:[&>p]:mb-0'
                            }`}>
                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-brand-surface border border-brand-border/10 rounded-2xl rounded-bl-none p-3 flex gap-1">
                                <span className="w-1.5 h-1.5 bg-brand-muted rounded-full animate-bounce" />
                                <span className="w-1.5 h-1.5 bg-brand-muted rounded-full animate-bounce delay-100" />
                                <span className="w-1.5 h-1.5 bg-brand-muted rounded-full animate-bounce delay-200" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            ) : (
                // --- Voice Chat UI ---
                <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-6">
                    <div className="relative">
                        {/* Status Ring / Glow */}
                        {connectionState.isConnected && (
                            <div className="absolute inset-0 rounded-full bg-brand-highlight/30 animate-ping duration-1000" />
                        )}
                        
                        <div className={`relative z-10 w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                            connectionState.isConnected 
                                ? isSpeaking 
                                    ? 'bg-brand-surface border-4 border-brand-highlight shadow-[0_0_30px_rgba(78,205,196,0.4)] scale-110' 
                                    : 'bg-brand-surface border-2 border-brand-highlight shadow-[0_0_15px_rgba(78,205,196,0.2)]'
                                : 'bg-brand-border/5 border border-brand-border/10'
                        }`}>
                             {connectionState.isConnected ? (
                                 <Activity className={`w-12 h-12 transition-colors duration-200 ${isSpeaking ? 'text-brand-highlight' : 'text-brand-highlight/70'}`} />
                             ) : (
                                 <MicOff className="w-12 h-12 text-brand-muted" />
                             )}
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-brand-text font-bold text-lg">
                            {connectionState.isConnected ? "Live Conversation" : "Voice Assistant"}
                        </h3>
                        <p className="text-sm text-brand-muted mt-2">
                            {connectionState.isConnecting 
                                ? "Connecting to Gemini Live..." 
                                : connectionState.isConnected 
                                    ? "Listening... Speak naturally."
                                    : "Start a voice call to discuss your project in real-time."}
                        </p>
                        {connectionState.error && (
                            <p className="text-xs text-red-400 mt-2">{connectionState.error}</p>
                        )}
                    </div>

                    <button
                        onClick={handleVoiceToggle}
                        disabled={connectionState.isConnecting}
                        className={`px-8 py-3 rounded-full font-bold shadow-lg transition-all transform active:scale-95 flex items-center gap-2 cursor-pointer ${
                            connectionState.isConnected 
                            ? 'bg-red-500 hover:bg-red-600 text-white' 
                            : 'bg-brand-highlight hover:bg-teal-400 text-brand-base'
                        }`}
                    >
                        {connectionState.isConnected ? <><Phone className="w-4 h-4 rotate-135" /> End Call</> : <><Mic className="w-4 h-4" /> Start Call</>}
                    </button>
                </div>
            )}
          </div>

          {/* Text Input Area (Only for Text Mode) */}
          {mode === ChatMode.TEXT && (
              <div className="p-3 bg-brand-base border-t border-brand-border/10">
                <form 
                    onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                    className="flex gap-2"
                >
                    <label htmlFor="chat-input" className="sr-only">Type your message</label>
                    <input
                        ref={inputRef}
                        id="chat-input"
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 bg-brand-surface text-brand-text text-sm rounded-full px-4 py-2 border border-brand-border/10 focus:outline-none focus:border-brand-highlight focus:ring-2 focus:ring-brand-highlight/20 transition-all"
                    />
                    <button 
                        type="submit" 
                        aria-label="Send message"
                        disabled={!inputText.trim() || isTyping}
                        className="p-2 bg-brand-highlight text-brand-base rounded-full hover:bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-highlight/50"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
              </div>
          )}
        </div>
      )}
    </>
  );
};