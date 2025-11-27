import React, { useState, useEffect, useRef } from 'react';
import Custom3DModel from '../components/Custom3DModel';
import Custom3DLaptop from '../components/Custom3DLaptop';
import Chatbot from '../components/Chatbot';
import { 
  ChevronRight, 
  Users, 
  Briefcase, 
  Award, 
  CheckCircle, 
  Star,
  ArrowRight,
  Code,
  Zap,
  TrendingUp,
  Target,
  Rocket,
  Bell,
  User,
  Shield,
  Palette,
  Moon,
  Sun,
  Wifi,
  Volume2,
  VolumeX,
  Smartphone,
  Mail,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Globe,
  Languages,
  Calendar,
  Clock,
  Database,
  Cloud,
  Download,
  Upload,
  RefreshCw,
  Save,
  X,
  ChevronDown,
  Check,
  AlertCircle
} from 'lucide-react';

const InternshipDashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [counters, setCounters] = useState({ interns: 0, hireRate: 0, companies: 0, rating: 0 });
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    sound: true,
    autoSave: true,
    privacy: 'public',
    language: 'en',
    timezone: 'UTC',
    dataSync: true
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Animate stats when they come into view
      if (statsRef.current && !statsAnimated) {
        const rect = statsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setStatsAnimated(true);
          animateCounters();
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(testimonialInterval);
    };
  }, [statsAnimated]);

  const animateCounters = () => {
    const targets = { interns: 500, hireRate: 95, companies: 50, rating: 4.9 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setCounters({
        interns: Math.floor(targets.interns * easeOutQuart),
        hireRate: Math.floor(targets.hireRate * easeOutQuart),
        companies: Math.floor(targets.companies * easeOutQuart),
        rating: Number((targets.rating * easeOutQuart).toFixed(1))
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounters(targets);
      }
    }, stepDuration);
  };

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineering Intern",
      company: "TechCorp",
      quote: "This internship transformed my career. I learned cutting-edge technologies and worked on real projects that millions of users interact with daily.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Marcus Johnson",
      role: "Data Science Intern", 
      company: "DataVision",
      quote: "The mentorship program was incredible. My supervisor guided me through complex machine learning projects and helped me land a full-time offer.",
      rating: 5,
      avatar: "MJ"
    },
    {
      name: "Elena Rodriguez",
      role: "UX Design Intern",
      company: "DesignHub",
      quote: "I gained hands-on experience with user research, prototyping, and design systems. The collaborative environment was perfect for learning.",
      rating: 5,
      avatar: "ER"
    }
  ];

  const benefits = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Real-World Projects",
      description: "Work on actual products and features that impact thousands of users",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Mentorship",
      description: "Learn from industry veterans who are passionate about your growth",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Cutting-Edge Tech",
      description: "Get hands-on experience with the latest tools and technologies",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Network",
      description: "Connect with professionals and interns from around the world",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Apply Online",
      description: "Submit your application with resume and portfolio",
      icon: <Target className="w-6 h-6" />
    },
    {
      number: "02", 
      title: "Technical Assessment",
      description: "Complete coding challenges and technical interviews",
      icon: <Code className="w-6 h-6" />
    },
    {
      number: "03",
      title: "Final Interview",
      description: "Meet with the team and discuss your goals",
      icon: <Users className="w-6 h-6" />
    },
    {
      number: "04",
      title: "Start Your Journey",
      description: "Begin your internship and accelerate your career",
      icon: <Rocket className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-400/5 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-300/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-300/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Animated Cursor Follower */}
      <div 
        className="fixed w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-150 ease-out"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`
        }}
      />



      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden pt-20 pb-32 min-h-screen flex items-center">
        {/* Custom 3D Background */}
        <div className="absolute inset-0 opacity-30">
          <Custom3DModel />
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full mix-blend-multiply filter blur-xl animate-float"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          />
          <div 
            className="absolute top-40 right-10 w-80 h-80 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full mix-blend-multiply filter blur-xl animate-float-delayed"
            style={{ transform: `translateY(${scrollY * 0.15}px)` }}
          />
          <div 
            className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-r from-pink-400/30 to-yellow-400/30 rounded-full mix-blend-multiply filter blur-xl animate-float-slow"
            style={{ transform: `translateY(${scrollY * 0.05}px)` }}
          />
          
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-float-particle opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className={`text-center transform transition-all duration-1500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
            <div className="inline-block mb-6 px-6 py-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full border border-indigo-200/50 backdrop-blur-sm animate-pulse-slow">
              <span className="text-indigo-600 font-semibold flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                #1 Internship Program 2025
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
              <span className="inline-block animate-text-reveal bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Launch Your
              </span>
              <br />
              <span className="inline-block animate-text-reveal-delayed bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 bg-clip-text text-transparent">
                Tech Career
              </span>
            </h1>
            
            <p className={`text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              Join our world-class internship program and work alongside industry experts on cutting-edge projects that shape the future of technology.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <button className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-5 rounded-full text-lg font-bold transform transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-indigo-500/25 overflow-hidden">
                <span className="relative z-10 flex items-center gap-3">
                  Apply Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </button>
              
              <button className="group relative border-2 border-indigo-600 text-indigo-600 px-12 py-5 rounded-full text-lg font-bold transform transition-all duration-500 hover:scale-110 hover:shadow-xl overflow-hidden">
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  Learn More
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </button>
            </div>
          </div>
          
          {/* Custom 3D Laptop */}
          <div className="absolute bottom-10 right-10 w-80 h-60 opacity-80 hidden lg:block">
            <Custom3DLaptop />
          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <section ref={statsRef} className="py-24 bg-white/70 backdrop-blur-lg border-y border-white/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: `${counters.interns}+`, label: "Active Interns", icon: <Users className="w-8 h-8" /> },
              { number: `${counters.hireRate}%`, label: "Hire Rate", icon: <TrendingUp className="w-8 h-8" /> },
              { number: `${counters.companies}+`, label: "Partner Companies", icon: <Briefcase className="w-8 h-8" /> },
              { number: `${counters.rating}★`, label: "Program Rating", icon: <Star className="w-8 h-8" /> }
            ].map((stat, index) => (
              <div 
                key={index} 
                className={`group text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/30 transform transition-all duration-700 hover:scale-105 hover:shadow-xl hover:bg-white/80 ${statsAnimated ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="text-indigo-600 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Benefits Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block mb-6 px-6 py-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full border border-indigo-200/50 backdrop-blur-sm">
              <span className="text-indigo-600 font-semibold">Why Choose Us</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-800 mb-6 animate-text-reveal">
              Accelerate Your Growth
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We provide everything you need to become a top-tier professional in the tech industry
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className={`group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-white/50 transform transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:-translate-y-4 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl" 
                     style={{ background: `linear-gradient(135deg, ${benefit.color.split(' ')[1]}, ${benefit.color.split(' ')[3]})` }} />
                
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${benefit.color} text-white mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  {benefit.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-indigo-600 transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl"
                     style={{ background: `linear-gradient(90deg, ${benefit.color.split(' ')[1]}, ${benefit.color.split(' ')[3]})` }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Process Section */}
      <section className="py-32 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block mb-6 px-6 py-3 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm">
              <span className="text-white font-semibold">Simple Process</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Your Journey Starts Here
            </h2>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
              Four simple steps to transform your career and join the next generation of tech leaders
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`group relative transform transition-all duration-1000 hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
                style={{ transitionDelay: `${index * 250}ms` }}
              >
                <div className="relative bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-500 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-6xl font-black text-white/20 group-hover:text-white/30 transition-colors duration-300">
                      {step.number}
                    </div>
                    <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      {step.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-indigo-300 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-indigo-100 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {step.description}
                  </p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
                      <ChevronRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-32 bg-gradient-to-br from-gray-50 to-indigo-50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block mb-6 px-6 py-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full border border-indigo-200/50 backdrop-blur-sm">
              <span className="text-indigo-600 font-semibold">Success Stories</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-800 mb-6">
              Transforming Careers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Hear from our interns who have launched successful careers in tech
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-white/50 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600" />
              
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-all duration-1000 ${
                    index === currentTestimonial 
                      ? 'opacity-100 translate-x-0 scale-100' 
                      : 'opacity-0 absolute top-12 left-12 right-12 translate-x-12 scale-95'
                  }`}
                >
                  <div className="flex justify-center mb-8">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-8 h-8 text-yellow-400 fill-current transform transition-all duration-300 hover:scale-125`}
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>
                  
                  <blockquote className="text-2xl md:text-3xl text-gray-700 leading-relaxed mb-12 italic text-center font-light">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6 shadow-lg transform hover:scale-110 transition-transform duration-300">
                        {testimonial.avatar}
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white animate-pulse" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-gray-800 text-xl mb-1">{testimonial.name}</div>
                      <div className="text-gray-600 text-lg">{testimonial.role}</div>
                      <div className="text-indigo-600 font-semibold">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-center mt-12 space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-500 transform hover:scale-125 ${
                      index === currentTestimonial 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 scale-125 shadow-lg' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-32 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse animation-delay-2000" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-block mb-8 px-8 py-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full border border-white/20 backdrop-blur-sm">
              <span className="text-white font-semibold text-lg">Limited Spots Available</span>
            </div>
            
            <h2 className="text-6xl md:text-7xl font-black text-white mb-8 leading-tight">
              Ready to Start Your
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                Journey?
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-16 leading-relaxed max-w-4xl mx-auto">
              Join thousands of students who have accelerated their careers through our internship program.
              Applications are open now - don't miss your chance!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
              <button className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-16 py-6 rounded-full text-xl font-bold transform transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-indigo-500/25 overflow-hidden">
                <span className="relative z-10 flex items-center gap-4">
                  Apply Today
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                <div className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 rounded-full transition-transform duration-300" />
              </button>
              
              <button className="group relative border-2 border-white text-white px-16 py-6 rounded-full text-xl font-bold transform transition-all duration-500 hover:scale-110 overflow-hidden">
                <span className="relative z-10 transition-colors duration-300 group-hover:text-gray-900">
                  Schedule a Call
                </span>
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </button>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400">
              {[
                { icon: <CheckCircle className="w-6 h-6 text-green-400" />, text: "No application fee" },
                { icon: <Clock className="w-6 h-6 text-blue-400" />, text: "Quick response" },
                { icon: <Award className="w-6 h-6 text-yellow-400" />, text: "Certificate included" }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`flex items-center space-x-3 transform transition-all duration-700 hover:scale-110 hover:text-white ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {item.icon}
                  <span className="font-semibold">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-16 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-3 mb-6 group">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <span className="text-3xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                InternshipPro
              </span>
            </div>
            
            <p className="text-gray-400 mb-8 text-lg">
              Accelerating careers, one internship at a time.
            </p>
            
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-8 rounded-full" />
            
            <div className="text-sm text-gray-500">
              © 2025 InternshipPro. All rights reserved. Made with ❤️ for future tech leaders.
            </div>
          </div>
        </div>
      </footer>

      {/* AI Chatbot */}
      <Chatbot />
    </div>
  );
};

export default InternshipDashboard;
