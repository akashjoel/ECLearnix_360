import { useState, useEffect, useRef } from 'react';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Settings,
  Users,
  MessageSquare,
  MoreVertical,
  Monitor,
  Grid,
  Maximize2,
  Send,
} from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  isMuted: boolean;
  isVideoOff: boolean;
}

interface VideoCallProps {
  mentorName: string;
  onEndCall: () => void;
}

const VideoCall: React.FC<VideoCallProps> = ({ mentorName, onEndCall }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentStreamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const [isGridView, setIsGridView] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const presenterContainerRef = useRef<HTMLDivElement>(null);
  const presenterGridTileRef = useRef<HTMLDivElement>(null);

  const [participants, setParticipants] = useState<Participant[]>([
    { id: '1', name: 'You', isMuted: false, isVideoOff: false },
    { id: '2', name: mentorName, isMuted: false, isVideoOff: false },
  ]);
  
  const [messages, setMessages] = useState<{ id: string; author: string; text: string }[]>([
    { id: 'm1', author: mentorName, text: 'Hello! Great to meet you. How can I help you today?' },
  ]);
  
  const [chatInput, setChatInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [openParticipantMenuId, setOpenParticipantMenuId] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const toggleParticipantMute = (id: string) => {
    const target = participants.find((p) => p.id === id);
    const nextMuted = !(target?.isMuted);
    setParticipants((prev) => prev.map((p) => (p.id === id ? { ...p, isMuted: nextMuted } : p)));
    if (id === '1') {
      setIsMuted(nextMuted);
    }
    setOpenParticipantMenuId(null);
  };

  const kickParticipant = (id: string) => {
    setParticipants((prev) => prev.filter((p) => p.id !== id));
    setOpenParticipantMenuId(null);
  };

  // Settings state
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [microphones, setMicrophones] = useState<MediaDeviceInfo[]>([]);
  const [speakers, setSpeakers] = useState<MediaDeviceInfo[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string>('');
  const [selectedMicId, setSelectedMicId] = useState<string>('');
  const [selectedSpeakerId, setSelectedSpeakerId] = useState<string>('');
  const [mirrorSelf, setMirrorSelf] = useState<boolean>(true);

  const enumerateDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const vids = devices.filter((d) => d.kind === 'videoinput');
      const mics = devices.filter((d) => d.kind === 'audioinput');
      const outs = devices.filter((d) => d.kind === 'audiooutput');
      setCameras(vids);
      setMicrophones(mics);
      setSpeakers(outs);

      if (!selectedCameraId && vids[0]?.deviceId) setSelectedCameraId(vids[0].deviceId);
      if (!selectedMicId && mics[0]?.deviceId) setSelectedMicId(mics[0].deviceId);
      if (!selectedSpeakerId && outs[0]?.deviceId) setSelectedSpeakerId(outs[0].deviceId);
    } catch (e) {
      // ignore
    }
  };

  const startVideoStream = async (deviceId?: string) => {
    if (callEnded) return;
    try {
      const constraints: MediaStreamConstraints = {
        video: deviceId ? { deviceId: { exact: deviceId } } : true,
        audio: false,
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      // Stop previous tracks
      if (currentStreamRef.current) {
        currentStreamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      currentStreamRef.current = stream;
    } catch (err) {
      console.log('Camera access failed:', err);
    }
  };

  const startScreenShare = async () => {
    if (callEnded || isScreenSharing) return;
    try {
      // Cross-browser fallback for getDisplayMedia
      const getDisplayMedia: (c: any) => Promise<MediaStream> =
        (navigator.mediaDevices && (navigator.mediaDevices as any).getDisplayMedia?.bind(navigator.mediaDevices)) ||
        // @ts-ignore older browsers
        (navigator as any).getDisplayMedia;
      if (!getDisplayMedia) {
        throw new Error('Screen sharing is not supported in this browser.');
      }
      const screenStream: MediaStream = await getDisplayMedia({ video: { cursor: 'always' }, audio: false });
      // Stop camera while sharing
      if (currentStreamRef.current) {
        currentStreamRef.current.getTracks().forEach((t) => t.stop());
        currentStreamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = screenStream;
      }
      screenStreamRef.current = screenStream;
      setIsScreenSharing(true);
      // When user stops from browser UI
      const [track] = screenStream.getVideoTracks();
      if (track) {
        track.addEventListener('ended', () => {
          stopScreenShare();
        });
      }
    } catch (err) {
      console.log('Screen share failed:', err);
    } finally {
      setShowShareMenu(false);
    }
  };

  const stopScreenShare = async () => {
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((t) => t.stop());
      screenStreamRef.current = null;
    }
    setIsScreenSharing(false);
    if (!isVideoOff) {
      await startVideoStream(selectedCameraId || undefined);
    } else if (videoRef.current) {
      // Clear video if camera is off
      videoRef.current.srcObject = null;
    }
  };

  const toggleFullscreen = async () => {
    const container = (isGridView ? presenterGridTileRef.current : presenterContainerRef.current) as any;
    if (!container) return;
    try {
      // @ts-ignore
      const fsEl = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
      if (fsEl) {
        // Exit fullscreen
        // @ts-ignore
        if (document.exitFullscreen) await document.exitFullscreen();
        // @ts-ignore
        else if (document.webkitExitFullscreen) await document.webkitExitFullscreen();
        // @ts-ignore
        else if (document.msExitFullscreen) await document.msExitFullscreen();
        container.style.transform = '';
        if (isGridView && videoRef.current) {
          const v = videoRef.current as HTMLVideoElement;
          v.style.width = '';
          v.style.height = '';
          v.style.objectFit = '';
          container.style.backgroundColor = '';
        }
        return;
      }

      // Enter fullscreen
      container.style.transform = mirrorSelf && !isScreenSharing ? 'scaleX(-1)' : '';
      if (isGridView && videoRef.current) {
        const v = videoRef.current as HTMLVideoElement;
        v.style.width = '100%';
        v.style.height = '100%';
        v.style.objectFit = 'contain';
        container.style.backgroundColor = 'black';
      }
      if (container.requestFullscreen) await container.requestFullscreen();
      else if (container.webkitRequestFullscreen) container.webkitRequestFullscreen();
      else if (container.msRequestFullscreen) container.msRequestFullscreen();

      const onChange = () => {
        // @ts-ignore
        const nowFsEl = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
        if (!nowFsEl) {
          container.style.transform = '';
          if (isGridView && videoRef.current) {
            const v = videoRef.current as HTMLVideoElement;
            v.style.width = '';
            v.style.height = '';
            v.style.objectFit = '';
            container.style.backgroundColor = '';
          }
          document.removeEventListener('fullscreenchange', onChange);
          // @ts-ignore
          document.removeEventListener('webkitfullscreenchange', onChange);
          // @ts-ignore
          document.removeEventListener('MSFullscreenChange', onChange);
        }
      };
      document.addEventListener('fullscreenchange', onChange);
      // @ts-ignore
      document.addEventListener('webkitfullscreenchange', onChange);
      // @ts-ignore
      document.addEventListener('MSFullscreenChange', onChange);
    } catch (e) {
      console.log('Fullscreen failed:', e);
    }
  };

  const endCall = () => {
    try {
      if (currentStreamRef.current) {
        currentStreamRef.current.getTracks().forEach((t) => t.stop());
        currentStreamRef.current = null;
      }
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach((t) => t.stop());
        screenStreamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    } catch {}
    setIsScreenSharing(false);
    setIsVideoOff(true);
    setShowChat(false);
    setShowParticipants(false);
    setCallEnded(true);
    onEndCall();
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = chatInput.trim();
    if (!text) return;
    const newMessage = {
      id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Date.now()),
      author: 'You',
      text,
    };
    setMessages((prev) => [...prev, newMessage]);
    setChatInput('');
    setShowChat(true);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showChat]);

  // Reattach stream to video element when layout changes (e.g., grid toggle) or screen share switches
  useEffect(() => {
    const stream = isScreenSharing ? screenStreamRef.current : currentStreamRef.current;
    if (videoRef.current && stream) {
      try {
        videoRef.current.srcObject = stream;
      } catch {
        // ignore
      }
    }
  }, [isGridView, isScreenSharing]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (callEnded) return;
    if (!isVideoOff) {
      startVideoStream(selectedCameraId || undefined);
    } else {
      // Stop stream when video is turned off
      if (currentStreamRef.current) {
        currentStreamRef.current.getTracks().forEach((t) => t.stop());
        currentStreamRef.current = null;
      }
    }
  }, [isVideoOff, callEnded]);

  // Refresh devices when opening settings (and once on mount when possible)
  useEffect(() => {
    if (showSettings) {
      enumerateDevices();
    }
  }, [showSettings]);

  useEffect(() => {
    enumerateDevices();
  }, []);

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRejoin = async () => {
    setCallEnded(false);
    setIsVideoOff(false);
    await startVideoStream(selectedCameraId || undefined);
  };

  if (callEnded) {
    return (
      <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <div className="w-full max-w-md mx-4 bg-purple-950/90 backdrop-blur-md border border-purple-700/40 rounded-2xl p-8 text-center shadow-2xl animate-fade-in-up">
          <div className="w-14 h-14 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center border border-red-500/40">
            <PhoneOff className="w-7 h-7 text-red-300" />
          </div>
          <h1 className="text-white text-2xl font-semibold mb-2">Session ended</h1>
          <p className="text-purple-200 mb-6">Your mentoring session with {mentorName} has ended.</p>
          <div className="flex items-center justify-center gap-3">
            <button
              className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
              onClick={handleRejoin}
            >
              Rejoin
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700"
              onClick={onEndCall}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex flex-col animate-gradient-xy">
      <header className="bg-purple-950/30 backdrop-blur-sm border-b border-purple-700/30 px-6 py-4 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center animate-pulse-subtle">
                <Video className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-white font-semibold text-lg">Mentoring Session with {mentorName}</h1>
                <p className="text-purple-300 text-sm">{formatDuration(duration)}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                className="px-4 py-2 bg-purple-600/50 hover:bg-purple-600/70 text-white rounded-lg transition-colors"
                onClick={() => setShowShareMenu((s) => !s)}
              >
                <Monitor className="w-5 h-5" />
              </button>
            </div>
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                isGridView
                  ? 'bg-purple-700 text-white hover:bg-purple-700'
                  : 'bg-purple-600/50 hover:bg-purple-600/70 text-white'
              }`}
              onClick={() => setIsGridView((v) => !v)}
            >
              <Grid className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex gap-4 p-4 overflow-hidden">
        <div className="flex-1 min-h-0 flex flex-col gap-4">
          {!isGridView && (
            <>
              <div ref={presenterContainerRef} className="flex-1 relative bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-2xl overflow-hidden border border-purple-700/30 shadow-2xl animate-fade-in-up">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-contain ${mirrorSelf && !isScreenSharing ? 'scale-x-[-1]' : ''}`}
                />
                <div className="absolute bottom-2 right-2 bg-purple-950/80 backdrop-blur-sm px-2 py-1 rounded border border-purple-600/30 flex items-center gap-1">
                  {isMuted ? (
                    <>
                      <MicOff className="w-3.5 h-3.5 text-red-400" />
                      <span className="text-xs text-red-300">Muted</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-3.5 h-3.5 text-green-300" />
                      <span className="text-xs text-green-200">Unmuted</span>
                    </>
                  )}
                </div>
                {isVideoOff && (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center animate-fade-in">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-purple-600/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
                        <span className="text-5xl font-bold text-white">Y</span>
                      </div>
                      <p className="text-purple-300 text-lg">Camera is off</p>
                    </div>
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-purple-950/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-purple-600/30 animate-fade-in-left">
                  <p className="text-white font-medium">You</p>
                </div>
                <button onClick={toggleFullscreen} className="absolute top-4 right-4 w-10 h-10 bg-purple-950/80 backdrop-blur-sm hover:bg-purple-900/80 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 border border-purple-600/30 animate-fade-in-right">
                  <Maximize2 className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 h-32 animate-fade-in-up animation-delay-200">
                {participants.slice(1).map((participant) => (
                  <div
                    key={participant.id}
                    className="relative bg-gradient-to-br from-purple-800/50 to-indigo-800/50 rounded-xl overflow-hidden border border-purple-700/30 group hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 animate-fade-in-up"
                    style={{ animationDelay: `${parseInt(participant.id) * 100}ms` }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-16 h-16 bg-purple-600/30 rounded-full flex items-center justify-center group-hover:animate-pulse-subtle">
                        <span className="text-2xl font-bold text-white">
                          {participant.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                      <div className="bg-purple-950/80 backdrop-blur-sm px-2 py-1 rounded border border-purple-600/30">
                        <p className="text-white text-xs font-medium truncate">
                          {participant.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {participant.isMuted && (
                          <div className="bg-red-500/80 backdrop-blur-sm p-1 rounded border border-red-600/30">
                            <MicOff className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {isGridView && (
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in-up">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  ref={participant.name === 'You' ? presenterGridTileRef : undefined}
                  className="relative bg-gradient-to-br from-purple-800/50 to-indigo-800/50 rounded-xl overflow-hidden border border-purple-700/30 group hover:border-purple-500/50 transition-all duration-300 hover:scale-101 hover:shadow-lg hover:shadow-purple-500/20"
                >
                  {participant.name === 'You' ? (
                    <>
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className={`w-full h-48 md:h-56 lg:h-64 object-contain ${mirrorSelf && !isScreenSharing ? 'scale-x-[-1]' : ''}`}
                      />
                      <button
                        onClick={toggleFullscreen}
                        className="absolute top-2 right-2 w-8 h-8 bg-purple-950/80 backdrop-blur-sm hover:bg-purple-900/80 rounded-md flex items-center justify-center border border-purple-600/30"
                        aria-label="Fullscreen"
                      >
                        <Maximize2 className="w-4 h-4 text-white" />
                      </button>
                      <div className="absolute bottom-2 right-2 bg-purple-950/80 backdrop-blur-sm px-2 py-1 rounded border border-purple-600/30 flex items-center gap-1">
                        {isMuted ? (
                          <>
                            <MicOff className="w-3.5 h-3.5 text-red-400" />
                            <span className="text-xs text-red-300">Muted</span>
                          </>
                        ) : (
                          <>
                            <Mic className="w-3.5 h-3.5 text-green-300" />
                            <span className="text-xs text-green-200">Unmuted</span>
                          </>
                        )}
                      </div>
                      {isVideoOff && (
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center">
                          <div className="w-20 h-20 bg-purple-600/30 rounded-full flex items-center justify-center">
                            <span className="text-3xl font-bold text-white">Y</span>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-48 md:h-56 lg:h-64 flex items-center justify-center">
                      <div className="w-20 h-20 bg-purple-600/30 rounded-full flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">{participant.name.charAt(0)}</span>
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                    <div className="bg-purple-950/80 backdrop-blur-sm px-2 py-1 rounded border border-purple-600/30">
                      <p className="text-white text-xs font-medium truncate">{participant.name}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {participant.isMuted && (
                        <div className="bg-red-500/80 backdrop-blur-sm p-1 rounded border border-red-600/30">
                          <MicOff className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {(showParticipants || showChat) && (
          <div className="w-80 min-h-0 bg-purple-950/30 backdrop-blur-sm rounded-2xl border border-purple-700/30 flex flex-col animate-slide-in-right">
            <div className="flex border-b border-purple-700/30">
              <button
                onClick={() => {
                  setShowParticipants(true);
                  setShowChat(false);
                }}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  showParticipants
                    ? 'text-white bg-purple-600/30 rounded-tl-2xl'
                    : 'text-purple-300 hover:text-white'
                }`}
              >
                Participants ({participants.length})
              </button>
              <button
                onClick={() => {
                  setShowParticipants(false);
                  setShowChat(true);
                }}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  showChat
                    ? 'text-white bg-purple-600/30 rounded-tr-2xl'
                    : 'text-purple-300 hover:text-white'
                }`}
              >
                Chat
              </button>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto p-4">
              {showParticipants && (
                <div className="space-y-2">
                  {participants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center justify-between p-3 bg-purple-900/30 rounded-lg hover:bg-purple-900/50 transition-all duration-300 hover:scale-102 hover:shadow-md animate-fade-in"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-600/30 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-white">
                            {participant.name.charAt(0)}
                          </span>
                        </div>
                        <span className="text-white font-medium">
                          {participant.name}
                        </span>
                      </div>
                      <div className="relative flex items-center gap-2">
                        <div className="bg-purple-950/80 backdrop-blur-sm px-2 py-1 rounded border border-purple-600/30 flex items-center gap-1">
                          {participant.isMuted ? (
                            <>
                              <MicOff className="w-3.5 h-3.5 text-red-400" />
                              <span className="text-xs text-red-300">Muted</span>
                            </>
                          ) : (
                            <>
                              <Mic className="w-3.5 h-3.5 text-green-300" />
                              <span className="text-xs text-green-200">Unmuted</span>
                            </>
                          )}
                        </div>
                        {participant.isVideoOff && (
                          <VideoOff className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {showChat && (
                <div className="space-y-3">
                  {messages.map((m) => (
                    <div key={m.id} className="bg-purple-900/30 rounded-lg p-3 animate-fade-in-up">
                      <p className="text-purple-300 text-xs mb-1">{m.author}</p>
                      <p className="text-white text-sm">{m.text}</p>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
            {showChat && (
              <form onSubmit={handleSendMessage} className="p-4 border-t border-purple-700/30">
                <div className="flex items-end gap-2">
                  <textarea
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    rows={1}
                    placeholder="Type a message..."
                    className="flex-1 resize-none bg-purple-900/30 border border-purple-700/30 rounded-lg px-4 py-2 text-white placeholder-purple-400 focus:outline-none focus:border-purple-500/50 max-h-40"
                  />
                  <button
                    type="submit"
                    className="h-10 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                    disabled={!chatInput.trim()}
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </main>

      {showShareMenu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowShareMenu(false)} />
          <div className="relative w-full max-w-sm mx-4 bg-purple-950/90 backdrop-blur-md border border-purple-700/40 rounded-2xl shadow-2xl animate-fade-in-up">
            <div className="px-5 py-4 border-b border-purple-700/30 flex items-center justify-between">
              <h3 className="text-white font-medium">Share your screen</h3>
              <button className="p-2 hover:bg-purple-800/50 rounded-lg" onClick={() => setShowShareMenu(false)}>
                <span className="text-purple-200">✕</span>
              </button>
            </div>
            <div className="p-5 space-y-3">
              {!isScreenSharing ? (
                <>
                  <p className="text-purple-200 text-sm">Choose what to share in the next step.</p>
                  <button
                    className="w-full py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                    onClick={startScreenShare}
                  >
                    Share screen
                  </button>
                </>
              ) : (
                <>
                  <p className="text-purple-200 text-sm">You are currently sharing your screen.</p>
                  <button
                    className="w-full py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                    onClick={stopScreenShare}
                  >
                    Stop sharing
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowSettings(false)} />
          <div className="relative w-full max-w-lg mx-4 bg-purple-950/90 backdrop-blur-md border border-purple-700/40 rounded-2xl shadow-2xl animate-fade-in-up">
            <div className="px-6 py-4 border-b border-purple-700/30 flex items-center justify-between">
              <h2 className="text-white font-semibold">Settings</h2>
              <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-purple-800/50 rounded-lg">
                <span className="text-purple-200">✕</span>
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm text-purple-300 mb-2">Camera</label>
                <select
                  className="w-full bg-purple-900/40 border border-purple-700/40 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500/60"
                  value={selectedCameraId}
                  onChange={(e) => setSelectedCameraId(e.target.value)}
                >
                  {cameras.map((d) => (
                    <option key={d.deviceId} value={d.deviceId}>{d.label || 'Camera'}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-purple-300 mb-2">Microphone</label>
                  <select
                    className="w-full bg-purple-900/40 border border-purple-700/40 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500/60"
                    value={selectedMicId}
                    onChange={(e) => setSelectedMicId(e.target.value)}
                  >
                    {microphones.map((d) => (
                      <option key={d.deviceId} value={d.deviceId}>{d.label || 'Microphone'}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-purple-300 mb-2">Speakers</label>
                  <select
                    className="w-full bg-purple-900/40 border border-purple-700/40 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500/60"
                    value={selectedSpeakerId}
                    onChange={(e) => setSelectedSpeakerId(e.target.value)}
                  >
                    {speakers.map((d) => (
                      <option key={d.deviceId} value={d.deviceId}>{d.label || 'Speaker'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input id="mirror" type="checkbox" className="accent-purple-500" checked={mirrorSelf} onChange={(e) => setMirrorSelf(e.target.checked)} />
                <label htmlFor="mirror" className="text-purple-200 text-sm">Mirror my video</label>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-purple-700/30 flex items-center justify-end gap-3">
              <button
                className="px-4 py-2 rounded-lg bg-purple-800/40 text-purple-200 hover:bg-purple-800/60"
                onClick={() => setShowSettings(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                onClick={async () => {
                  if (!isVideoOff) await startVideoStream(selectedCameraId || undefined);
                  setShowSettings(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-purple-950/30 backdrop-blur-sm border-t border-purple-700/30 px-6 py-6 animate-fade-in-up">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => {
              const next = !isMuted;
              setIsMuted(next);
              setParticipants((prev) => prev.map((p) => (p.id === '1' ? { ...p, isMuted: next } : p)));
            }}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110 hover:shadow-xl hover:shadow-purple-500/30 active:scale-95 ${
              isMuted
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {isMuted ? (
              <MicOff className="w-6 h-6 text-white" />
            ) : (
              <Mic className="w-6 h-6 text-white" />
            )}
          </button>
          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110 hover:shadow-xl hover:shadow-purple-500/30 active:scale-95 ${
              isVideoOff
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {isVideoOff ? (
              <VideoOff className="w-6 h-6 text-white" />
            ) : (
              <Video className="w-6 h-6 text-white" />
            )}
          </button>
          <button onClick={endCall} className="w-14 h-14 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all shadow-lg hover:scale-105">
            <PhoneOff className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="w-14 h-14 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center transition-all shadow-lg hover:scale-105"
          >
            <Settings className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={() => {
              setShowParticipants(!showParticipants);
              setShowChat(false);
            }}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110 hover:shadow-xl hover:shadow-purple-500/30 active:scale-95 ${
              showParticipants
                ? 'bg-purple-700'
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            <Users className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={() => {
              setShowChat(!showChat);
              setShowParticipants(false);
            }}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110 hover:shadow-xl hover:shadow-purple-500/30 active:scale-95 ${
              showChat
                ? 'bg-purple-700'
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            <MessageSquare className="w-6 h-6 text-white" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default VideoCall;
