import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  User, 
  Sparkles, 
  Zap, 
  Brain,
  Rocket,
  Target,
  BookOpen,
  GraduationCap,
  Star,
  CheckCircle,
  ArrowRight,
  Mic,
  Volume2,
  Settings,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI assistant. How can I help you with your internship journey today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const botResponses = [
    "That's a great question! Let me help you with that.",
    "I understand your concern. Here's what I recommend...",
    "Based on your profile, I think this would be perfect for you.",
    "Let me guide you through the best approach for this.",
    "I've found some relevant opportunities for you.",
    "Here's how you can improve your chances of success.",
    "That's an interesting point! Let me elaborate...",
    "I can help you prepare for that interview.",
    "Let me show you some resources that might help.",
    "That's exactly what we're looking for in candidates."
  ];

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`group p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 hover:rotate-12 ${
            isOpen ? 'bg-gradient-to-r from-red-600 to-pink-600' : ''
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div className={`fixed bottom-24 right-6 z-50 transition-all duration-300 ${
          isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
        }`}>
          {/* Chatbot Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-2xl p-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Assistant</h3>
                  <p className="text-xs text-purple-200">Online • Ready to help</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/20 rounded transition-colors duration-200"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          {!isMinimized && (
            <div className="bg-white/95 backdrop-blur-xl rounded-b-2xl shadow-2xl border border-white/20 h-[400px] flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.sender === 'bot' && (
                          <div className="p-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                            <Bot className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs opacity-60 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        {message.sender === 'user' && (
                          <div className="p-1 bg-white/20 rounded-full">
                            <User className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 max-w-[80%] p-3 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <div className="p-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isTyping}
                    className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Interactive Cursor Trail */}
      <div 
        className="fixed w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-150 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`
        }}
      />
      <div 
        className="fixed w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 6,
          top: mousePosition.y - 6,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`,
          animationDelay: '0.1s'
        }}
      />
    </>
  );
};

export default Chatbot; 