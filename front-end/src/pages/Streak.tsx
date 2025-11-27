import React, { useState } from 'react';

const StreakPage = () => {
  const [chat, setChat] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setChat([...chat, input]);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 justify-center items-start px-4 py-8 w-full max-w-5xl mx-auto">
      {/* Left: Learning Streak */}
      <div className="flex-1 flex flex-col items-center bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-lg p-8 min-h-[320px] text-white">
        <h2 className="text-3xl font-bold mb-2">Learning Streak</h2>
        <p className="mb-6 text-lg text-white/80 text-center">
          Keep the momentum going! Every day counts towards your learning journey.
        </p>
        <div className="text-center mt-4">
          <div className="text-5xl font-bold mb-2">7 Days</div>
          <div className="text-xl mb-4">Week Warrior</div>
          <div className="flex justify-center gap-8">
            <div>
              <div className="text-2xl font-bold">15</div>
              <div className="text-sm">Longest Streak</div>
            </div>
            <div>
              <div className="text-2xl font-bold">45</div>
              <div className="text-sm">Total Days</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Chatbot Widget */}
      <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-lg p-8 min-h-[320px]">
        <h2 className="text-2xl font-bold mb-2 text-purple-700">AI Learning Assistant</h2>
        <p className="mb-4 text-gray-600">
          Ask me anything about your progress or JavaScript topics!
        </p>
        <div className="flex-1 flex flex-col gap-2 overflow-y-auto mb-4">
          {chat.map((msg, idx) => (
            <div key={idx} className="self-end bg-blue-100 text-blue-900 px-4 py-2 rounded-full max-w-xs">
              {msg}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
            type="text"
            placeholder="Type your question..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default StreakPage;