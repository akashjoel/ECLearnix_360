import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  Users, 
  Volume2, 
  Download, 
  Share2, 
  Save, 
  Calendar, 
  Image,
  Sparkles,
  Zap,
  TrendingUp,
  Activity,
  ArrowRight,
  CheckCircle,
  Play,
  Target,
  Lightbulb,
  BookOpen,
  Star,
  Heart,
  Eye,
  BarChart3,
  PieChart,
  Brain,
  Cpu,
  Database,
  Shield,
  Wifi,
  Cloud,
  Layers,
  GitBranch,
  Palette,
  Music,
  Camera,
  Video,
  BarChart3 as BarChart,
  PieChart as PieChartIcon,
  Activity as ActivityIcon,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Plus,
  Infinity,
  Zap as Lightning,
  Smartphone
} from 'lucide-react';

interface GeneratedDiagram {
  id: string;
  title: string;
  timestamp: string;
  thumbnail: string;
}

function LiveVisualizer() {
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [transcript, setTranscript] = useState('Start recording to see live transcription...');
  const [waveformBars, setWaveformBars] = useState<number[]>(new Array(20).fill(0));
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particleCount, setParticleCount] = useState(0);
  const particleRef = useRef<HTMLDivElement>(null);

  const [generatedDiagrams] = useState<GeneratedDiagram[]>([
    {
      id: '1',
      title: 'Wave Amplitude',
      timestamp: '2:34',
      thumbnail: 'https://study.com/cimages/videopreview/screen_shot_2013-03-04_at_4.48.12_pm_111356.jpg'
    },
    {
      id: '2',
      title: 'Frequency vs Wavelength',
      timestamp: '5:12',
      thumbnail: 'https://media.sciencephoto.com/c0/50/82/39/c0508239-800px-wm.jpg'
    },
    {
      id: '3',
      title: 'Wave Interference',
      timestamp: '8:45',
      thumbnail: 'https://cdn1.byjus.com/wp-content/uploads/2023/03/Wave-Interference-Updated.png'
    }
  ]);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Dynamic particle system
  useEffect(() => {
    const createParticle = () => {
      if (particleRef.current) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full pointer-events-none animate-float-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        particleRef.current.appendChild(particle);
        
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 5000);
      }
    };

    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      createParticle();
      setParticleCount(prev => prev + 1);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Enhanced 3D waveform effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRecording) {
      interval = setInterval(() => {
        setWaveformBars(prev => 
          prev.map(() => Math.random() * 100)
        );
      }, 120);
    } else {
      setWaveformBars(new Array(20).fill(0));
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Sample transcript updates
  useEffect(() => {
    if (isRecording) {
      const transcripts = [
        'Today we will study wave properties in physics...',
        'Wave amplitude is the maximum displacement from equilibrium...',
        'Frequency and wavelength are inversely related...',
        'When two waves meet, they can interfere constructively or destructively...'
      ];
      
      let transcriptIndex = 0;
      const interval = setInterval(() => {
        if (transcriptIndex < transcripts.length) {
          setTranscript(transcripts[transcriptIndex]);
          transcriptIndex++;
        }
      }, 3000);
      
      return () => clearInterval(interval);
    } else {
      setTranscript('Start recording to see live transcription...');
    }
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:00`;
  };

  const handleRecordingToggle = () => {
    if (isRecording) {
      setIsRecording(false);
      setTimer(0);
    } else {
      setIsRecording(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Morphing Shapes */}
        <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-gradient-to-r from-violet-400/30 to-purple-400/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-gradient-to-r from-pink-400/30 to-violet-400/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Dynamic Particle System */}
      <div ref={particleRef} className="fixed inset-0 pointer-events-none z-10"></div>

      {/* Floating Icons */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-8 h-8 text-purple-400/30 animate-float hover:scale-150 hover:text-purple-400 cursor-pointer">
          <Mic className="w-full h-full" />
        </div>
        <div className="absolute top-40 right-32 w-6 h-6 text-pink-400/30 animate-float hover:scale-150 hover:text-pink-400 cursor-pointer" style={{ animationDelay: '1s' }}>
          <Volume2 className="w-full h-full" />
        </div>
        <div className="absolute bottom-32 left-32 w-10 h-10 text-violet-400/30 animate-float hover:scale-150 hover:text-violet-400 cursor-pointer" style={{ animationDelay: '2s' }}>
          <Image className="w-full h-full" />
        </div>
        <div className="absolute bottom-20 right-20 w-8 h-8 text-indigo-400/30 animate-float hover:scale-150 hover:text-indigo-400 cursor-pointer" style={{ animationDelay: '3s' }}>
          <Brain className="w-full h-full" />
        </div>
        <div className="absolute top-1/2 left-10 w-6 h-6 text-purple-400/30 animate-float hover:scale-150 hover:text-purple-400 cursor-pointer" style={{ animationDelay: '0.5s' }}>
          <Zap className="w-full h-full" />
        </div>
        <div className="absolute top-1/2 right-10 w-8 h-8 text-pink-400/30 animate-float hover:scale-150 hover:text-pink-400 cursor-pointer" style={{ animationDelay: '1.5s' }}>
          <Sparkles className="w-full h-full" />
        </div>
      </div>

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

      {/* Enhanced Header with 3D effect */}
      <header className="relative z-10 bg-white/10 backdrop-blur-xl border-b border-white/20 px-6 py-4 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="transform hover:scale-105 transition-all duration-300">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent drop-shadow-lg animate-pulse">
              Live AI Visualizer
            </h1>
            <p className="text-purple-100 mt-1 drop-shadow-sm">Real-time speech-to-diagram conversion for enhanced learning</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-green-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-green-400/30 shadow-lg transform hover:scale-105 transition-all duration-300">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              <span className="text-green-100 font-medium">Live Session</span>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content with enhanced 3D effects */}
          <div className="lg:col-span-2 space-y-8">
            {/* Enhanced Recording Section with 3D card */}
            <div className={`bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 transform hover:scale-[1.02] transition-all duration-500 hover:shadow-3xl hover:shadow-purple-500/20 relative overflow-hidden ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
            }`}>
              {/* Card Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-violet-500/10 animate-pulse"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-semibold text-white drop-shadow-lg">Physics - Wave Properties</h2>
                  <div className="flex items-center gap-2 text-purple-200 bg-white/10 px-3 py-2 rounded-full backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                    <Users className="w-4 h-4" />
                    <span>24 students</span>
                  </div>
                </div>

                <div className="text-center space-y-8">
                  {/* Enhanced 3D recording button */}
                  <div className="relative">
                    <button
                      onClick={handleRecordingToggle}
                      className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 transform hover:scale-110 shadow-2xl ${
                        isRecording 
                          ? 'bg-gradient-to-br from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 animate-pulse shadow-red-500/50' 
                          : 'bg-gradient-to-br from-purple-400 to-pink-600 hover:from-purple-500 hover:to-pink-700 shadow-purple-500/50'
                      }`}
                      style={{
                        boxShadow: isRecording 
                          ? '0 0 60px rgba(239, 68, 68, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.2)' 
                          : '0 0 60px rgba(147, 51, 234, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      <Mic className="w-12 h-12 text-white drop-shadow-lg" />
                      {/* Enhanced Ripple effect */}
                      {isRecording && (
                        <>
                          <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping opacity-75"></div>
                          <div className="absolute inset-0 rounded-full border-2 border-red-200 animate-ping opacity-50" style={{ animationDelay: '0.5s' }}></div>
                          <div className="absolute inset-0 rounded-full border-1 border-red-100 animate-ping opacity-25" style={{ animationDelay: '1s' }}></div>
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-purple-100 text-lg">
                      {isRecording ? 'Recording in progress...' : 'Click to start recording'}
                    </p>
                    <div className="text-4xl font-mono font-bold text-white drop-shadow-2xl transform hover:scale-105 transition-all duration-300">
                      {formatTime(timer)}
                    </div>
                  </div>

                  {/* Enhanced 3D Waveform */}
                  <div className="flex items-center justify-center gap-2 h-20 perspective-1000">
                    {waveformBars.map((height, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-t from-purple-600 to-pink-400 transition-all duration-200 ease-out rounded-full shadow-lg transform-gpu"
                        style={{
                          width: '6px',
                          height: `${Math.max(8, height * 0.6)}px`,
                          opacity: isRecording ? 1 : 0.4,
                          transform: `rotateX(${isRecording ? height * 0.3 : 0}deg) translateZ(${height * 0.1}px)`,
                          boxShadow: isRecording ? `0 0 20px rgba(147, 51, 234, 0.8)` : 'none',
                          animationDelay: `${index * 0.05}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Live Transcript with 3D effect */}
            <div className={`bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 transform hover:scale-[1.01] transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 relative overflow-hidden ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
            }`} style={{ transitionDelay: '200ms' }}>
              {/* Card Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-500/20 rounded-full transform hover:scale-110 transition-transform duration-300">
                    <Volume2 className="w-5 h-5 text-purple-300" />
                  </div>
                  <h3 className="font-semibold text-white text-lg">Live Transcript</h3>
                </div>
                <p className={`text-purple-100 text-lg leading-relaxed transition-all duration-500 ${isRecording ? 'animate-pulse' : ''}`}>
                  {transcript}
                </p>
              </div>
            </div>

            {/* Enhanced AI-Generated Visualization with 3D */}
            <div className={`bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 transform hover:scale-[1.01] transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 relative overflow-hidden ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
            }`} style={{ transitionDelay: '400ms' }}>
              {/* Card Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-violet-500/10 animate-pulse"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-white text-lg">AI-Generated Visualization</h3>
                  <div className="flex gap-3">
                    <button className="p-2 text-white/70 hover:text-white transition-all duration-300 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transform hover:scale-110 hover:-rotate-12">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-white/70 hover:text-white transition-all duration-300 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transform hover:scale-110 hover:rotate-12">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="min-h-80 border-2 border-dashed border-white/30 rounded-xl flex items-center justify-center bg-white/5 backdrop-blur-sm transform hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
                  {/* Floating Elements */}
                  <div className="absolute inset-0">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-float-particle"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${30 + i * 10}%`,
                          animationDelay: `${i * 0.5}s`,
                          animationDuration: `${3 + i}s`
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-center text-white/70 relative z-10">
                    <div className="p-4 bg-white/10 rounded-full mb-4 mx-auto w-fit transform hover:scale-110 transition-all duration-300">
                      <Image className="w-12 h-12 opacity-70" />
                    </div>
                    <p className="text-lg">Real-time diagrams will appear here during recording</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced 3D Sidebar */}
          <div className="space-y-6">
            {/* Enhanced Generated Diagrams with 3D cards */}
            <div className={`bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 relative overflow-hidden ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
            }`} style={{ transitionDelay: '600ms' }}>
              {/* Card Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>
              
              <div className="relative z-10">
                <h3 className="font-semibold text-white text-lg mb-6">Generated Diagrams</h3>
                <div className="space-y-4">
                  {generatedDiagrams.map((diagram, index) => (
                    <div 
                      key={diagram.id}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:translate-x-2 shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/10"
                      style={{ 
                        animationDelay: `${index * 0.1}s`,
                        transform: 'translateZ(0)'
                      }}
                      onMouseEnter={() => setHoveredCard(index)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div className="relative overflow-hidden rounded-lg transform hover:scale-110 transition-all duration-300">
                        <img 
                          src={diagram.thumbnail} 
                          alt={diagram.title}
                          className="w-14 h-14 object-cover shadow-lg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white truncate drop-shadow-sm">{diagram.title}</p>
                        <p className="text-sm text-purple-200">{diagram.timestamp}</p>
                      </div>
                      <button className="p-2 text-white/60 hover:text-white transition-all duration-300 bg-white/10 rounded-full hover:bg-white/20 transform hover:scale-110 hover:rotate-12">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced AI Configuration with 3D styling */}
            <div className={`bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 relative overflow-hidden ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
            }`} style={{ transitionDelay: '800ms' }}>
              {/* Card Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-violet-500/10 animate-pulse"></div>
              
              <div className="relative z-10">
                <h3 className="font-semibold text-white text-lg mb-6">AI Configuration</h3>
                <div className="space-y-6">
                  <div className="transform hover:scale-105 transition-all duration-300">
                    <label className="block text-sm font-medium text-purple-200 mb-3">Subject Focus</label>
                    <select className="w-full px-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/10 backdrop-blur-sm text-white transition-all duration-300 hover:bg-white/20 transform hover:scale-[1.02]">
                      <option className="bg-slate-800">Physics</option>
                      <option className="bg-slate-800">Chemistry</option>
                      <option className="bg-slate-800">Biology</option>
                      <option className="bg-slate-800">Mathematics</option>
                    </select>
                  </div>
                  <div className="transform hover:scale-105 transition-all duration-300">
                    <label className="block text-sm font-medium text-purple-200 mb-3">Grade Level</label>
                    <select className="w-full px-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/10 backdrop-blur-sm text-white transition-all duration-300 hover:bg-white/20 transform hover:scale-[1.02]">
                      <option className="bg-slate-800">Class 6-8</option>
                      <option className="bg-slate-800">Class 9-10</option>
                      <option className="bg-slate-800">Class 11-12</option>
                      <option className="bg-slate-800">Undergraduate</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="flex items-center gap-4 cursor-pointer group">
                      <input type="checkbox" defaultChecked className="w-5 h-5 text-purple-600 border-white/30 rounded focus:ring-purple-500 bg-white/10 transition-all duration-300 group-hover:scale-110" />
                      <span className="text-purple-100 group-hover:text-white transition-colors duration-300">Auto-generate diagrams</span>
                    </label>
                    <label className="flex items-center gap-4 cursor-pointer group">
                      <input type="checkbox" defaultChecked className="w-5 h-5 text-purple-600 border-white/30 rounded focus:ring-purple-500 bg-white/10 transition-all duration-300 group-hover:scale-110" />
                      <span className="text-purple-100 group-hover:text-white transition-colors duration-300">Real-time sharing</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Quick Actions with 3D hover effects */}
            <div className={`bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 relative overflow-hidden ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
            }`} style={{ transitionDelay: '1000ms' }}>
              {/* Card Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>
              
              <div className="relative z-10">
                <h3 className="font-semibold text-white text-lg mb-6">Quick Actions</h3>
                <div className="space-y-3">
                  {[
                    { icon: Save, label: 'Save session recording', color: 'hover:bg-green-500/20' },
                    { icon: Download, label: 'Export all diagrams', color: 'hover:bg-purple-500/20' },
                    { icon: Share2, label: 'Share with students', color: 'hover:bg-pink-500/20' },
                    { icon: Calendar, label: 'Schedule next session', color: 'hover:bg-violet-500/20' }
                  ].map((action, index) => (
                    <button 
                      key={index}
                      className={`w-full flex items-center gap-4 px-4 py-3 text-left text-purple-100 hover:text-white rounded-xl transition-all duration-300 transform hover:scale-105 hover:translate-x-2 bg-white/5 hover:bg-white/15 backdrop-blur-sm border border-white/10 ${action.color}`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="p-2 bg-white/10 rounded-lg transform hover:scale-110 transition-transform duration-300">
                        <action.icon className="w-4 h-4" />
                      </div>
                      <span className="font-medium">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveVisualizer;