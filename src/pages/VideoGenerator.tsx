import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  Play, 
  Download, 
  Film, 
  Wand2,
  Clock,
  Volume2,
  Eye,
  Share2,
  Users,
  Sparkles,
  BarChart3,
  Zap,
  Star,
  Heart,
  Music,
  Camera,
  Video,
  Mic,
  Palette
} from 'lucide-react';

const VideoGenerator = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const processingSteps = [
    'Analyzing audio content...',
    'Extracting key concepts...',
    'Generating visual scenes...',
    'Creating animations...',
    'Adding voiceover sync...',
    'Finalizing video...'
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleGenerateVideo = () => {
    setIsProcessing(true);
    setProcessingStep(0);

    // Simulate processing steps
    const interval = setInterval(() => {
      setProcessingStep(prev => {
        if (prev >= processingSteps.length - 1) {
          clearInterval(interval);
          setIsProcessing(false);
          setGeneratedVideo('https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4');
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  const previousGenerations = [
    {
      title: 'Machine Learning Basics',
      duration: '5:42',
      thumbnail: 'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=300',
      date: '2 hours ago',
      views: '1.2k',
      category: 'AI'
    },
    {
      title: 'Quantum Physics Introduction',
      duration: '8:15',
      thumbnail: 'https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=300',
      date: '1 day ago',
      views: '856',
      category: 'Science'
    },
    {
      title: 'Data Structures Overview',
      duration: '12:30',
      thumbnail: 'https://images.pexels.com/photos/3184424/pexels-photo-3184424.jpeg?auto=compress&cs=tinysrgb&w=300',
      date: '3 days ago',
      views: '2.1k',
      category: 'Programming'
    }
  ];

  const aiEnhancements = [
    { icon: <Mic className="w-5 h-5" />, label: 'Auto Captions', desc: 'Generate accurate subtitles', checked: true, color: 'from-purple-500 to-pink-500' },
    { icon: <Palette className="w-5 h-5" />, label: 'Visual Diagrams', desc: 'Add relevant illustrations', checked: true, color: 'from-blue-500 to-cyan-500' },
    { icon: <Music className="w-5 h-5" />, label: 'Background Music', desc: 'Subtle educational soundtrack', checked: false, color: 'from-green-500 to-emerald-500' },
    { icon: <Star className="w-5 h-5" />, label: 'Key Points', desc: 'Highlight important concepts', checked: true, color: 'from-yellow-500 to-orange-500' },
    { icon: <Camera className="w-5 h-5" />, label: 'Scene Transitions', desc: 'Smooth visual transitions', checked: true, color: 'from-red-500 to-pink-500' },
    { icon: <Video className="w-5 h-5" />, label: 'Motion Graphics', desc: 'Dynamic visual elements', checked: false, color: 'from-indigo-500 to-purple-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-400/15 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-300/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-pink-300/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        
        {/* Morphing Shapes */}
        <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-gradient-to-r from-violet-400/30 to-purple-400/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2.5s' }}></div>
        
        {/* Floating Icons */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-purple-300/20 animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          >
            {[<Film />, <Video />, <Camera />, <Music />, <Mic />, <Palette />, <Star />, <Heart />][i]}
          </div>
        ))}
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
      
      <div className="relative z-10 container mx-auto px-6 py-12 max-w-7xl">
        {/* Enhanced Header */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 mb-8 shadow-2xl border border-purple-200/20 transform hover:scale-[1.01] transition-all duration-500 relative overflow-hidden">
          {/* Animated Border */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-violet-500/20 rounded-2xl animate-pulse"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="transform hover:scale-105 transition-all duration-300">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 bg-clip-text text-transparent mb-3 drop-shadow-lg animate-pulse">
                AI Video Generator
              </h1>
              <p className="text-purple-100 text-lg">Transform recorded sessions into engaging animated videos with AI</p>
            </div>
            <div className="mt-6 md:mt-0 flex items-center gap-4">
              <div className="flex items-center gap-2 bg-purple-500/30 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-400/50 shadow-lg transform hover:scale-105 transition-all duration-300 animate-pulse">
                <div className="w-3 h-3 bg-purple-300 rounded-full animate-pulse shadow-lg shadow-purple-300/50"></div>
                <span className="text-purple-100 font-medium">AI Active</span>
              </div>

            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Enhanced Upload Section */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-purple-200/20 transform hover:scale-[1.02] transition-all duration-500 relative overflow-hidden">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl animate-pulse"></div>
              </div>
              
              <div className="relative z-10 flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-500/30 rounded-full animate-pulse">
                  <Upload className="w-6 h-6 text-purple-200" />
                </div>
                <h3 className="text-2xl font-semibold text-purple-100">Upload Recording</h3>
              </div>
              
              {!selectedFile ? (
                <div className="border-2 border-dashed border-purple-300/50 rounded-2xl p-12 text-center bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm transform hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
                  {/* Floating Elements */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-purple-300/30 rounded-full animate-float-particle"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${30 + i * 10}%`,
                          animationDelay: `${i * 0.5}s`,
                          animationDuration: `${3 + i * 0.5}s`
                        }}
                      />
                    ))}
                  </div>
                  
                  <div className="relative z-10 p-4 bg-purple-500/20 rounded-full mb-6 mx-auto w-fit transform hover:scale-110 transition-all duration-300 animate-bounce">
                    <Upload className="w-12 h-12 text-purple-200" />
                  </div>
                  <h4 className="text-xl font-semibold text-purple-100 mb-3">Upload your recording</h4>
                  <p className="text-purple-200 mb-6 text-lg">
                    Support for MP3, MP4, WAV files up to 500MB
                  </p>
                  <label className="btn-3d bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold cursor-pointer hover:shadow-2xl transition-all inline-block transform hover:scale-105 animate-pulse">
                    <div className="flex items-center gap-2">
                      <Upload className="w-5 h-5" />
                      Choose File
                    </div>
                    <input
                      type="file"
                      accept="audio/*,video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-8 backdrop-blur-sm border border-purple-300/30 relative overflow-hidden">
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 animate-pulse"></div>
                  
                  <div className="relative z-10 flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-purple-500/30 rounded-full animate-pulse">
                        <Film className="w-8 h-8 text-purple-200" />
                      </div>
                      <div>
                        <p className="font-semibold text-purple-100 text-lg">{selectedFile.name}</p>
                        <p className="text-purple-200">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="text-red-300 hover:text-red-200 p-2 rounded-full hover:bg-red-500/20 transition-all duration-300"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div>
                      <label className="block text-sm font-semibold text-purple-200 mb-3">
                        Video Style
                      </label>
                      <select className="w-full px-4 py-3 border border-purple-300/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-purple-500/20 backdrop-blur-sm transition-all duration-300 hover:bg-purple-500/30 text-purple-100">
                        <option className="bg-purple-800">Educational Animated</option>
                        <option className="bg-purple-800">Professional Slides</option>
                        <option className="bg-purple-800">Whiteboard Style</option>
                        <option className="bg-purple-800">Infographic</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-purple-200 mb-3">
                        Duration
                      </label>
                      <select className="w-full px-4 py-3 border border-purple-300/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-purple-500/20 backdrop-blur-sm transition-all duration-300 hover:bg-purple-500/30 text-purple-100">
                        <option className="bg-purple-800">Auto (Original)</option>
                        <option className="bg-purple-800">Condensed (50%)</option>
                        <option className="bg-purple-800">Summary (25%)</option>
                        <option className="bg-purple-800">Highlights Only</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-purple-200 mb-3">
                        Quality
                      </label>
                      <select className="w-full px-4 py-3 border border-purple-300/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-purple-500/20 backdrop-blur-sm transition-all duration-300 hover:bg-purple-500/30 text-purple-100">
                        <option className="bg-purple-800">HD (1080p)</option>
                        <option className="bg-purple-800">Standard (720p)</option>
                        <option className="bg-purple-800">Mobile (480p)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleGenerateVideo}
                    disabled={isProcessing}
                    className="w-full btn-3d bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-8 rounded-xl font-semibold hover:shadow-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-3 transform hover:scale-105 animate-pulse"
                  >
                    <Wand2 className="w-5 h-5" />
                    <span>{isProcessing ? 'Generating...' : 'Generate Animated Video'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Enhanced Processing Status */}
            {isProcessing && (
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-purple-200/20 transform hover:scale-[1.02] transition-all duration-500 relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>
                
                <div className="relative z-10 flex items-center gap-3 mb-6">
                  <div className="p-3 bg-purple-500/30 rounded-full animate-pulse">
                    <Zap className="w-6 h-6 text-purple-200" />
                  </div>
                  <h3 className="text-2xl font-semibold text-purple-100">Processing Video</h3>
                </div>
                <div className="space-y-4">
                  {processingSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-xl hover:bg-purple-500/20 transition-all duration-300 relative overflow-hidden">
                      {/* Step Background Animation */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${index < processingStep ? 'from-purple-500/20 to-pink-500/20' : 'from-gray-500/10 to-gray-500/10'} rounded-xl transition-all duration-500`}></div>
                      
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 relative z-10 ${
                        index < processingStep ? 'bg-purple-500 shadow-lg shadow-purple-500/50 animate-pulse' :
                        index === processingStep ? 'bg-pink-500 animate-pulse shadow-lg shadow-pink-500/50' :
                        'bg-purple-300/30'
                      }`}>
                        {index < processingStep ? (
                          <div className="w-4 h-4 bg-white rounded-full"></div>
                        ) : index === processingStep ? (
                          <div className="w-4 h-4 bg-white rounded-full animate-ping"></div>
                        ) : (
                          <div className="w-4 h-4 bg-purple-200 rounded-full"></div>
                        )}
                      </div>
                      <span className={`text-lg relative z-10 ${
                        index <= processingStep ? 'text-purple-100 font-medium' : 'text-purple-200'
                      }`}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <div className="bg-purple-300/30 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 shadow-lg animate-pulse"
                      style={{ width: `${(processingStep / processingSteps.length) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-purple-200 mt-3 text-center">
                    Estimated time remaining: {Math.max(0, (processingSteps.length - processingStep) * 2)} minutes
                  </p>
                </div>
              </div>
            )}

            {/* Enhanced Generated Video Preview */}
            {generatedVideo && (
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-purple-200/20 transform hover:scale-[1.02] transition-all duration-500 relative overflow-hidden">
                {/* Animated Border */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-violet-500/10 rounded-2xl animate-pulse"></div>
                
                <div className="relative z-10 flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-500/30 rounded-full animate-pulse">
                      <Play className="w-6 h-6 text-purple-200" />
                    </div>
                    <h3 className="text-2xl font-semibold text-purple-100">Generated Video</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="btn-3d p-3 text-purple-200 hover:text-white bg-purple-500/20 rounded-full backdrop-blur-sm hover:bg-purple-500/30 transition-all duration-300 transform hover:scale-110 hover:-rotate-12 border border-purple-300/30">
                      <Download className="w-5 h-5" />
                    </button>
                    <button className="btn-3d p-3 text-purple-200 hover:text-white bg-purple-500/20 rounded-full backdrop-blur-sm hover:bg-purple-500/30 transition-all duration-300 transform hover:scale-110 hover:rotate-12 border border-purple-300/30">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl aspect-video flex items-center justify-center shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border border-purple-300/30 relative overflow-hidden">
                  {/* Video Background Animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-pulse"></div>
                  <button className="bg-purple-500/30 hover:bg-purple-500/50 text-white p-6 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg animate-pulse relative z-10">
                    <Play className="w-12 h-12" />
                  </button>
                </div>
                
                <div className="mt-6 grid grid-cols-3 gap-6 text-center">
                  <div className="p-4 bg-purple-500/20 rounded-xl backdrop-blur-sm transform hover:scale-105 transition-all duration-300 border border-purple-300/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>
                    <div className="relative z-10 flex items-center justify-center gap-2 text-purple-200 mb-2">
                      <Clock className="w-5 h-5" />
                      <span className="font-medium">Duration</span>
                    </div>
                    <p className="font-bold text-lg text-purple-100">8:42</p>
                  </div>
                  <div className="p-4 bg-purple-500/20 rounded-xl backdrop-blur-sm transform hover:scale-105 transition-all duration-300 border border-purple-300/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>
                    <div className="relative z-10 flex items-center justify-center gap-2 text-purple-200 mb-2">
                      <Eye className="w-5 h-5" />
                      <span className="font-medium">Quality</span>
                    </div>
                    <p className="font-bold text-lg text-purple-100">1080p HD</p>
                  </div>
                  <div className="p-4 bg-purple-500/20 rounded-xl backdrop-blur-sm transform hover:scale-105 transition-all duration-300 border border-purple-300/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>
                    <div className="relative z-10 flex items-center justify-center gap-2 text-purple-200 mb-2">
                      <Volume2 className="w-5 h-5" />
                      <span className="font-medium">Audio</span>
                    </div>
                    <p className="font-bold text-lg text-purple-100">Enhanced</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-8">
            {/* Enhanced Previous Generations */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-purple-200/20 transform hover:scale-[1.02] transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>
              
              <div className="relative z-10 flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/30 rounded-full animate-pulse">
                  <Film className="w-5 h-5 text-purple-200" />
                </div>
                <h3 className="text-xl font-semibold text-purple-100">Recent Videos</h3>
              </div>
              <div className="space-y-4">
                {previousGenerations.map((video, index) => (
                  <div 
                    key={video.title}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-purple-500/20 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:translate-x-2 border border-purple-300/20 relative overflow-hidden"
                    onMouseEnter={() => setHoveredCard(video.title)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Card Background Animation */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${hoveredCard === video.title ? 'from-purple-500/20 to-pink-500/20' : 'from-transparent to-transparent'} rounded-xl transition-all duration-300`}></div>
                    
                    <div className="relative overflow-hidden rounded-lg transform hover:scale-110 transition-all duration-300">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-20 h-14 object-cover shadow-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-purple-900/40"></div>
                      <div className="absolute top-1 left-1 px-2 py-1 bg-purple-500/80 rounded text-xs text-white font-medium">
                        {video.category}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-purple-100 line-clamp-2 mb-1">
                        {video.title}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-purple-200">
                        <span>{video.duration}</span>
                        <span>•</span>
                        <span>{video.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {video.views}
                        </span>
                      </div>
                    </div>
                    <button className="p-2 text-purple-200 hover:text-white bg-purple-500/20 rounded-full hover:bg-purple-500/30 transition-all duration-300 transform hover:scale-110 hover:rotate-12 border border-purple-300/30">
                      <Play className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced AI Enhancement Options */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-purple-200/20 transform hover:scale-[1.02] transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>
              
              <div className="relative z-10 flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/30 rounded-full animate-pulse">
                  <Sparkles className="w-5 h-5 text-purple-200" />
                </div>
                <h3 className="text-xl font-semibold text-purple-100">AI Enhancements</h3>
              </div>
              <div className="space-y-4">
                {aiEnhancements.map((option, index) => (
                  <label 
                    key={index} 
                    className="flex items-start gap-4 cursor-pointer group p-3 rounded-xl hover:bg-purple-500/20 transition-all duration-300 border border-purple-300/20 relative overflow-hidden"
                    onMouseEnter={() => setHoveredCard(option.label)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Option Background Animation */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${hoveredCard === option.label ? option.color : 'from-transparent to-transparent'} opacity-20 rounded-xl transition-all duration-300`}></div>
                    
                    <input 
                      type="checkbox" 
                      defaultChecked={option.checked}
                      className="mt-1 w-5 h-5 text-purple-600 border-purple-300 rounded focus:ring-purple-500 transition-all duration-300 group-hover:scale-110 bg-purple-500/20 relative z-10" 
                    />
                    <div className="relative z-10">
                      <span className="font-medium text-purple-100 block group-hover:text-white transition-colors duration-300">{option.label}</span>
                      <span className="text-sm text-purple-200">{option.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Enhanced Usage Stats */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-purple-200/20 transform hover:scale-[1.02] transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>
              
              <div className="relative z-10 flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/30 rounded-full animate-pulse">
                  <BarChart3 className="w-5 h-5 text-purple-200" />
                </div>
                <h3 className="text-xl font-semibold text-purple-100">This Month</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-purple-200 font-medium">Videos Generated</span>
                    <span className="font-bold text-purple-100">12/20</span>
                  </div>
                  <div className="w-full bg-purple-300/30 rounded-full h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 shadow-lg animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-purple-200 font-medium">Storage Used</span>
                    <span className="font-bold text-purple-100">2.4/10 GB</span>
                  </div>
                  <div className="w-full bg-purple-300/30 rounded-full h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full transition-all duration-500 shadow-lg animate-pulse" style={{ width: '24%' }}></div>
                  </div>
                </div>
                <div className="pt-4 border-t border-purple-300/30">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-200 font-medium">Total Views</span>
                    <span className="font-bold text-purple-100">45.2k</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGenerator;