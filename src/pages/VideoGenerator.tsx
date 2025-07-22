import React, { useState } from 'react';
import { 
  Upload, 
  Play, 
  Download, 
  Settings, 
  Film, 
  Wand2,
  Clock,
  Volume2,
  Eye,
  Share2
} from 'lucide-react';

const VideoGenerator = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);

  const processingSteps = [
    'Analyzing audio content...',
    'Extracting key concepts...',
    'Generating visual scenes...',
    'Creating animations...',
    'Adding voiceover sync...',
    'Finalizing video...'
  ];

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
      date: '2 hours ago'
    },
    {
      title: 'Quantum Physics Introduction',
      duration: '8:15',
      thumbnail: 'https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=300',
      date: '1 day ago'
    },
    {
      title: 'Data Structures Overview',
      duration: '12:30',
      thumbnail: 'https://images.pexels.com/photos/3184424/pexels-photo-3184424.jpeg?auto=compress&cs=tinysrgb&w=300',
      date: '3 days ago'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">AI Video Generator</h1>
              <p className="text-gray-600">Transform recorded sessions into engaging animated videos</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Recording</h3>
              
              {!selectedFile ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Upload your recording</h4>
                  <p className="text-gray-600 mb-4">
                    Support for MP3, MP4, WAV files up to 500MB
                  </p>
                  <label className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium cursor-pointer hover:shadow-lg transition-all inline-block">
                    Choose File
                    <input
                      type="file"
                      accept="audio/*,video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Film className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">{selectedFile.name}</p>
                        <p className="text-sm text-gray-600">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Video Style
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                        <option>Educational Animated</option>
                        <option>Professional Slides</option>
                        <option>Whiteboard Style</option>
                        <option>Infographic</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                        <option>Auto (Original)</option>
                        <option>Condensed (50%)</option>
                        <option>Summary (25%)</option>
                        <option>Highlights Only</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quality
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                        <option>HD (1080p)</option>
                        <option>Standard (720p)</option>
                        <option>Mobile (480p)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleGenerateVideo}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    <Wand2 className="w-5 h-5" />
                    <span>{isProcessing ? 'Generating...' : 'Generate Animated Video'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Processing Status */}
            {isProcessing && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Video</h3>
                <div className="space-y-4">
                  {processingSteps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        index < processingStep ? 'bg-green-500' :
                        index === processingStep ? 'bg-blue-500 animate-pulse' :
                        'bg-gray-200'
                      }`}>
                        {index < processingStep ? (
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        ) : index === processingStep ? (
                          <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                        ) : (
                          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                        )}
                      </div>
                      <span className={`text-sm ${
                        index <= processingStep ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(processingStep / processingSteps.length) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Estimated time remaining: {Math.max(0, (processingSteps.length - processingStep) * 2)} minutes
                  </p>
                </div>
              </div>
            )}

            {/* Generated Video Preview */}
            {generatedVideo && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Generated Video</h3>
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                      <Download className="w-4 h-4" />
                      <span className="text-sm">Download</span>
                    </button>
                    <button className="text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm">Share</span>
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
                  <button className="bg-white/20 hover:bg-white/30 text-white p-4 rounded-full transition-colors">
                    <Play className="w-8 h-8" />
                  </button>
                </div>
                
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center space-x-1 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Duration</span>
                    </div>
                    <p className="font-semibold">8:42</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center space-x-1 text-gray-600">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">Quality</span>
                    </div>
                    <p className="font-semibold">1080p HD</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center space-x-1 text-gray-600">
                      <Volume2 className="w-4 h-4" />
                      <span className="text-sm">Audio</span>
                    </div>
                    <p className="font-semibold">Enhanced</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Previous Generations */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Videos</h3>
              <div className="space-y-4">
                {previousGenerations.map((video, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-16 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">
                        {video.title}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">{video.duration}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{video.date}</span>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700">
                      <Play className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Enhancement Options */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Enhancements</h3>
              <div className="space-y-3">
                <label className="flex items-start space-x-3">
                  <input type="checkbox" className="mt-1 rounded border-gray-300" defaultChecked />
                  <div>
                    <span className="text-sm font-medium text-gray-900 block">Auto Captions</span>
                    <span className="text-xs text-gray-600">Generate accurate subtitles</span>
                  </div>
                </label>
                <label className="flex items-start space-x-3">
                  <input type="checkbox" className="mt-1 rounded border-gray-300" defaultChecked />
                  <div>
                    <span className="text-sm font-medium text-gray-900 block">Visual Diagrams</span>
                    <span className="text-xs text-gray-600">Add relevant illustrations</span>
                  </div>
                </label>
                <label className="flex items-start space-x-3">
                  <input type="checkbox" className="mt-1 rounded border-gray-300" />
                  <div>
                    <span className="text-sm font-medium text-gray-900 block">Background Music</span>
                    <span className="text-xs text-gray-600">Subtle educational soundtrack</span>
                  </div>
                </label>
                <label className="flex items-start space-x-3">
                  <input type="checkbox" className="mt-1 rounded border-gray-300" defaultChecked />
                  <div>
                    <span className="text-sm font-medium text-gray-900 block">Key Points</span>
                    <span className="text-xs text-gray-600">Highlight important concepts</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Usage Stats */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Videos Generated</span>
                    <span className="font-medium">12/20</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Storage Used</span>
                    <span className="font-medium">2.4/10 GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '24%' }}></div>
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