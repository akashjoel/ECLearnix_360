import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCourseById } from '../data/courses';
import { CreditCard, Building2, Wallet, Smartphone, Shield, CheckCircle2, Loader2, ArrowLeft, Tag, Percent, Sparkles, Zap, Star, Gift, Lock, Globe, Award } from 'lucide-react';
import api from '../services/api';

const paymentMethods = [
  { id: 'card', label: 'Card', icon: <CreditCard className="w-5 h-5" />, color: 'from-blue-500 to-cyan-500' },
  { id: 'upi', label: 'UPI', icon: <Smartphone className="w-5 h-5" />, color: 'from-purple-500 to-pink-500' },
  { id: 'netbanking', label: 'Net Banking', icon: <Building2 className="w-5 h-5" />, color: 'from-green-500 to-emerald-500' },
  { id: 'wallet', label: 'Wallet', icon: <Wallet className="w-5 h-5" />, color: 'from-orange-500 to-red-500' },
];

const Checkout: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [method, setMethod] = useState('card');
  const [isPaying, setIsPaying] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const particleRef = useRef<HTMLDivElement>(null);
  const course = useMemo(() => getCourseById(courseId || ''), [courseId]);

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
        particle.className = 'absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full pointer-events-none animate-float-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 4 + 3) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        particleRef.current.appendChild(particle);
        
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 7000);
      }
    };

    const interval = setInterval(() => {
      createParticle();
    }, 500);

    return () => clearInterval(interval);
  }, []);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Course not found.</p>
          <button onClick={() => navigate('/paths')} className="text-blue-600 hover:underline">Back to Learning Paths</button>
        </div>
      </div>
    );
  }

  const handlePay = async () => {
    setIsPaying(true);
    try {
      // Try backend checkout session (will work if backend + auth token available)
      const successUrl = window.location.origin + `/checkout/${course.id}?status=success`;
      const cancelUrl = window.location.origin + `/checkout/${course.id}?status=cancel`;
      const resp: any = await (api as any).request?.('/payments/create-checkout', {
        method: 'POST',
        body: JSON.stringify({ priceId: `price_${course.id}`, successUrl, cancelUrl })
      });
      if (resp?.success && resp?.data?.session?.url) {
        window.location.href = resp.data.session.url;
        return;
      }
      // Fallback to demo success
      await new Promise((r) => setTimeout(r, 1500));
      setSuccess(true);
    } catch (e) {
      // Demo fallback if API not available or unauthorized
      await new Promise((r) => setTimeout(r, 1500));
      setSuccess(true);
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating Icons */}
        <div className="absolute top-20 left-20 w-8 h-8 text-blue-400/30 animate-float hover:scale-150 hover:text-blue-400 cursor-pointer">
          <Star className="w-full h-full" />
        </div>
        <div className="absolute top-40 right-32 w-6 h-6 text-purple-400/30 animate-float hover:scale-150 hover:text-purple-400 cursor-pointer" style={{ animationDelay: '1s' }}>
          <Gift className="w-full h-full" />
        </div>
        <div className="absolute bottom-32 left-32 w-10 h-10 text-green-400/30 animate-float hover:scale-150 hover:text-green-400 cursor-pointer" style={{ animationDelay: '2s' }}>
          <Award className="w-full h-full" />
        </div>
        <div className="absolute bottom-20 right-20 w-8 h-8 text-orange-400/30 animate-float hover:scale-150 hover:text-orange-400 cursor-pointer" style={{ animationDelay: '3s' }}>
          <Zap className="w-full h-full" />
        </div>
      </div>

      {/* Dynamic Particle System */}
      <div ref={particleRef} className="fixed inset-0 pointer-events-none z-10"></div>

      {/* Interactive Cursor Trail */}
      <div 
        className="fixed w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-150 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`
        }}
      />
      <div 
        className="fixed w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 6,
          top: mousePosition.y - 6,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`,
          animationDelay: '0.1s'
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto p-6">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-6 inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transform hover:scale-105 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}>
          {/* Course Summary */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-6 transform hover:scale-[1.02] transition-all duration-500 relative overflow-hidden group">
            {/* Card Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-pulse"></div>
            
            <div className="relative z-10">
              <div className="flex items-start gap-4">
                <div className="w-28 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-500">
                  <Sparkles className="w-8 h-8 text-purple-600 animate-pulse" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">{course.title}</h1>
                  <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 transform hover:scale-110 transition-transform duration-300">
                      <Tag className="w-3 h-3" /> {course.tags[0]}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 transform hover:scale-110 transition-transform duration-300 animate-pulse">
                      <Percent className="w-3 h-3" /> {course.discount}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
                  <p className="text-xs text-gray-500 mb-2">What you get</p>
                  <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                    <li>{course.modules.length} modules, {course.progress.total} total lessons</li>
                    <li>Hands-on projects + downloadable resources</li>
                    <li>Mentor support forum</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
                  <p className="text-xs text-gray-500 mb-2">Guarantees</p>
                  <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                    <li>7‑day money-back guarantee</li>
                    <li>Certificate of completion</li>
                    <li>Lifetime access</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-6 transform hover:scale-[1.02] transition-all duration-500 relative overflow-hidden group">
            {/* Card Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 animate-pulse"></div>
            
            <div className="relative z-10">
              {/* Price with 3D effect */}
              <div className="mb-5 transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-extrabold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
                  {course.price}
                </div>
                <div className="text-sm text-gray-500 line-through">{course.originalPrice}</div>
                <div className="text-xs text-green-600 font-semibold mt-1 animate-bounce">{course.discount}</div>
              </div>

              {/* Payment methods with 3D hover effects */}
              <div className="mb-4 grid grid-cols-2 gap-2">
                {paymentMethods.map((m, index) => (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
                      method === m.id 
                        ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-lg' 
                        : 'border-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className={`p-1 rounded ${method === m.id ? 'bg-gradient-to-r ' + m.color + ' text-white' : 'bg-gray-100'} transform hover:rotate-12 transition-transform duration-300`}>
                      {m.icon}
                    </div>
                    <span className="text-sm font-medium">{m.label}</span>
                  </button>
                ))}
              </div>

              {/* Mock card inputs with 3D effects */}
              {method === 'card' && (
                <div className="space-y-3 mb-4 transform transition-all duration-500">
                  <div className="relative group">
                    <input className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transform group-hover:scale-105 transition-all duration-300" placeholder="Card number" />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <CreditCard className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input className="px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transform hover:scale-105 transition-all duration-300" placeholder="MM/YY" />
                    <input className="px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transform hover:scale-105 transition-all duration-300" placeholder="CVV" />
                  </div>
                  <input className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transform hover:scale-105 transition-all duration-300" placeholder="Cardholder name" />
                </div>
              )}

              {/* Pay button with enhanced 3D effects */}
              {!success ? (
                <button
                  onClick={handlePay}
                  disabled={isPaying}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-60 relative overflow-hidden group"
                >
                  {/* Shine effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                  
                  {isPaying ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
                  {isPaying ? 'Processing...' : 'Proceed to Pay Securely'}
                </button>
              ) : (
                <div className="text-center transform transition-all duration-500">
                  <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3 animate-bounce">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="font-semibold text-gray-900 mb-1">Payment Successful</p>
                  <p className="text-sm text-gray-600 mb-4">You now have full access to this course.</p>
                  <button onClick={() => navigate(`/course/${course.id}`)} className="text-blue-600 font-semibold hover:underline transform hover:scale-105 transition-transform duration-300">Go to Course</button>
                </div>
              )}

              {/* Trust badges with hover effects */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] text-gray-500">
                <div className="p-2 rounded-lg bg-gray-50 transform hover:scale-105 transition-transform duration-300 hover:bg-blue-50 hover:text-blue-600">
                  <Lock className="w-3 h-3 mx-auto mb-1" />
                  SSL Secure
                </div>
                <div className="p-2 rounded-lg bg-gray-50 transform hover:scale-105 transition-transform duration-300 hover:bg-green-50 hover:text-green-600">
                  <Gift className="w-3 h-3 mx-auto mb-1" />
                  7‑Day Refund
                </div>
                <div className="p-2 rounded-lg bg-gray-50 transform hover:scale-105 transition-transform duration-300 hover:bg-purple-50 hover:text-purple-600">
                  <Globe className="w-3 h-3 mx-auto mb-1" />
                  24/7 Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-particle {
          0% { transform: translateY(100vh) scale(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) scale(1); opacity: 0; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-particle {
          animation: float-particle 7s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Checkout;