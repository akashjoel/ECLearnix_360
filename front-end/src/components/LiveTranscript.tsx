import React, { useState, useEffect, useRef } from 'react';
import { liveTranscriptService, TranscriptMessage } from '../services/liveTranscriptService';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Trash2, 
  Send,
  Bot,
  User,
  Clock,
  Loader2
} from 'lucide-react';

interface LiveTranscriptProps {
  className?: string;
}

const LiveTranscript: React.FC<LiveTranscriptProps> = ({ className = '' }) => {
  const [transcriptMessages, setTranscriptMessages] = useState<TranscriptMessage[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState('Ready to start recording');
  const [speechSupported, setSpeechSupported] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if speech recognition is supported
    setSpeechSupported(liveTranscriptService.isSpeechRecognitionSupported());

    // Set up event listeners
    liveTranscriptService.onTranscriptChange(setTranscriptMessages);
    liveTranscriptService.onStatusUpdate(setStatus);

    // Cleanup on unmount
    return () => {
      liveTranscriptService.stopListening();
    };
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcriptMessages]);

  const handleToggleListening = () => {
    if (isListening) {
      liveTranscriptService.stopListening();
    } else {
      liveTranscriptService.startListening();
    }
    setIsListening(liveTranscriptService.getListeningState());
  };

  const handleClearTranscript = () => {
    liveTranscriptService.clearTranscript();
  };

  const handleTextInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
      const text = e.currentTarget.value.trim();
      liveTranscriptService['addUserMessage'](text);
      liveTranscriptService['processUserInput'](text);
      e.currentTarget.value = '';
    }
  };

  const getMessageIcon = (type: 'user' | 'ai') => {
    return type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />;
  };

  const getMessageBgColor = (type: 'user' | 'ai') => {
    return type === 'user' 
      ? 'bg-blue-500/20 border-blue-500/30' 
      : 'bg-purple-500/20 border-purple-500/30';
  };

  const getStatusColor = () => {
    if (status.includes('Error')) return 'text-red-400';
    if (status.includes('Listening')) return 'text-green-400';
    if (status.includes('Processing')) return 'text-yellow-400';
    return 'text-white/70';
  };

  if (!speechSupported) {
    return (
      <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 ${className}`}>
        <div className="flex items-center justify-center space-x-3">
          <MicOff className="w-6 h-6 text-red-400" />
          <span className="text-white">Speech recognition not supported in this browser</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Live Transcript</h3>
              <p className={`text-sm ${getStatusColor()}`}>{status}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all duration-300"
              title={isExpanded ? 'Minimize' : 'Expand'}
            >
              {isExpanded ? '−' : '+'}
            </button>
            
            <button
              onClick={handleClearTranscript}
              className="p-2 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/30 transition-all duration-300"
              title="Clear transcript"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-0 overflow-hidden'}`}>
        {/* Messages */}
        <div className="p-6 space-y-4 max-h-64 overflow-y-auto">
          {transcriptMessages.length === 0 ? (
            <div className="text-center py-8">
              <Mic className="w-12 h-12 text-white/30 mx-auto mb-4" />
              <p className="text-white/70">Start recording to see live transcription...</p>
            </div>
          ) : (
            transcriptMessages.map((message) => (
              <div key={message.id} className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' ? 'bg-blue-500/20' : 'bg-purple-500/20'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-blue-400" />
                  ) : (
                    <Bot className="w-4 h-4 text-purple-400" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-white">
                      {message.type === 'user' ? 'You' : 'AI Assistant'}
                    </span>
                    <span className="text-xs text-white/50">
                      {liveTranscriptService.formatTimestamp(message.timestamp)}
                    </span>
                    {message.isProcessing && (
                      <Loader2 className="w-3 h-3 text-yellow-400 animate-spin" />
                    )}
                  </div>
                  
                  <div className={`p-3 rounded-lg border ${getMessageBgColor(message.type)}`}>
                    <p className="text-white text-sm">{message.text}</p>
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-white/20">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Type your question or start recording..."
              className="flex-1 bg-white/10 text-white placeholder-white/50 rounded-lg px-4 py-2 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              onKeyPress={handleTextInput}
            />
            
            <button
              onClick={handleToggleListening}
              className={`p-3 rounded-full transition-all duration-300 ${
                isListening 
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 animate-pulse' 
                  : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
              }`}
              title={isListening ? 'Stop recording' : 'Start recording'}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Compact View */}
      {!isExpanded && (
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${
                isListening ? 'bg-green-400 animate-pulse' : 'bg-white/30'
              }`} />
              <span className="text-white/70 text-sm">
                {transcriptMessages.length} messages
              </span>
            </div>
            
            <button
              onClick={handleToggleListening}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                isListening 
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                  : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
              }`}
            >
              {isListening ? 'Stop Recording' : 'Start Recording'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveTranscript;
