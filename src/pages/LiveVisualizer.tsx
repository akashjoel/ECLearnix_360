import React, { useState, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  Square, 
  Image, 
  Download, 
  Settings,
  Volume2,
  Users,
  Share2
} from 'lucide-react';

const LiveVisualizer = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedDiagram, setGeneratedDiagram] = useState<string | null>(null);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [sessionTitle, setSessionTitle] = useState('Physics - Wave Properties');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleStartRecording = () => {
    setIsRecording(true);
    // Simulate real-time transcription
    setTimeout(() => {
      setCurrentTranscript('Wave properties include amplitude, frequency, and wavelength...');
    }, 2000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsProcessing(true);
    
    // Simulate AI diagram generation
    setTimeout(() => {
      setIsProcessing(false);
      setGeneratedDiagram('https://images.pexels.com/photos/3184424/pexels-photo-3184424.jpeg?auto=compress&cs=tinysrgb&w=400');
    }, 3000);
  };

  const simulatedDiagrams = [
    {
      title: 'Wave Amplitude',
      url: 'https://images.pexels.com/photos/3184424/pexels-photo-3184424.jpeg?auto=compress&cs=tinysrgb&w=300',
      timestamp: '2:34'
    },
    {
      title: 'Frequency vs Wavelength',
      url: 'https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=300',
      timestamp: '5:12'
    },
    {
      title: 'Wave Interference',
      url: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=300',
      timestamp: '8:45'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Live AI Visualizer</h1>
              <p className="text-gray-600">Real-time speech-to-diagram conversion for enhanced learning</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 text-sm">Live Session</span>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Session Control */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <input
                  type="text"
                  value={sessionTitle}
                  onChange={(e) => setSessionTitle(e.target.value)}
                  className="text-lg font-semibold bg-transparent border-none focus:outline-none focus:ring-0 text-gray-900"
                />
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500">24 students</span>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4 mb-6">
                {!isRecording ? (
                  <button
                    onClick={handleStartRecording}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full hover:shadow-lg transition-all"
                  >
                    <Mic className="w-8 h-8" />
                  </button>
                ) : (
                  <button
                    onClick={handleStopRecording}
                    className="bg-red-500 text-white p-4 rounded-full hover:shadow-lg transition-all animate-pulse"
                  >
                    <Square className="w-8 h-8" />
                  </button>
                )}
                
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">
                    {isRecording ? 'Recording...' : 'Click to start recording'}
                  </p>
                  <p className="text-2xl font-mono font-bold text-gray-900">
                    {isRecording ? '00:02:34' : '00:00:00'}
                  </p>
                </div>
              </div>

              {/* Audio Visualizer */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-center space-x-1 h-16">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 bg-blue-500 rounded-full transition-all ${
                        isRecording ? 'animate-pulse' : ''
                      }`}
                      style={{
                        height: isRecording ? `${Math.random() * 60 + 10}px` : '10px',
                        animationDelay: `${i * 0.1}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Live Transcript */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Volume2 className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">Live Transcript</span>
                </div>
                <p className="text-gray-700 min-h-[60px]">
                  {currentTranscript || 'Start recording to see live transcription...'}
                  {isRecording && <span className="animate-pulse">|</span>}
                </p>
              </div>
            </div>

            {/* Generated Diagram Display */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">AI-Generated Visualization</h3>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-500 hover:text-blue-600 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="text-gray-500 hover:text-blue-600 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-200 rounded-lg min-h-[300px] flex items-center justify-center bg-gray-50">
                {isProcessing ? (
                  <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-600">AI is generating visualization...</p>
                  </div>
                ) : generatedDiagram ? (
                  <img
                    src={generatedDiagram}
                    alt="AI Generated Diagram"
                    className="max-w-full max-h-[300px] rounded-lg shadow-md"
                  />
                ) : (
                  <div className="text-center text-gray-500">
                    <Image className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Real-time diagrams will appear here during recording</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Session History */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Diagrams</h3>
              <div className="space-y-4">
                {simulatedDiagrams.map((diagram, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <img
                      src={diagram.url}
                      alt={diagram.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {diagram.title}
                      </p>
                      <p className="text-xs text-gray-500">{diagram.timestamp}</p>
                    </div>
                    <button className="text-gray-400 hover:text-blue-600">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Settings */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject Focus
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                    <option>Physics</option>
                    <option>Mathematics</option>
                    <option>Chemistry</option>
                    <option>Biology</option>
                    <option>Computer Science</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grade Level
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                    <option>Class 6-8</option>
                    <option>Class 9-10</option>
                    <option>Class 11-12</option>
                    <option>College Level</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                    <span className="text-sm text-gray-700">Auto-generate diagrams</span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                    <span className="text-sm text-gray-700">Real-time sharing</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                  Save session recording
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                  Export all diagrams
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                  Share with students
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                  Schedule next session
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveVisualizer;