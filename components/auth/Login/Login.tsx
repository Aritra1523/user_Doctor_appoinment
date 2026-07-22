"use client";

import useLogin from "@/customHooks/auth/Login/useLogin";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

const Login = () => {
  const { register, handleSubmit, errors, isSubmitting } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    setCurrentTime(`${hour12}:${minutes} ${ampm}`);
    
    if (hours < 12) setGreeting("Good Morning");
    else if (hours < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  // SVG Icons
  const CalendarIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 10H21" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 2V6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 2V6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const ClockIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 6V12L16 14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const DoctorIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 3.87 7 11 7 11s7-7.13 7-11c0-3.87-3.13-7-7-7z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const EmailIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6L12 12L20 6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 6H20V18C20 18.5523 19.5523 19 19 19H5C4.44772 19 4 18.5523 4 18V6Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const LockIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="5" y="11" width="14" height="10" rx="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const EyeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const EyeClosedIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9.9 4.24002C10.5883 4.0789 11.2931 3.99836 12 4.00003C19 4.00003 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29447 13.5719 9.14357 13.1984C8.99268 12.8249 8.9186 12.4247 8.92572 12.0219C8.93283 11.6191 9.02102 11.2219 9.18496 10.8539C9.3489 10.4859 9.5853 10.1547 9.88 9.88003M1 1L23 23M17.94 17.94C16.2306 19.243 14.1495 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06003L17.94 17.94Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const SpinnerIcon = () => (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const today = new Date().getDay();

  return (
    <div className="min-h-screen min-h-[100dvh] flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-sans relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right, rgba(37,99,235,0.06), transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left, rgba(124,58,237,0.04), transparent_50%)] pointer-events-none" />
      
      {/* Floating Animated Orbs */}
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-blue-400/10 blur-2xl animate-float" />
      <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-purple-400/10 blur-2xl animate-float-delay" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-400/15 animate-particle"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 6 + 's',
              animationDuration: Math.random() * 12 + 8 + 's',
            }}
          />
        ))}
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1000px] animate-fadeInUp">
        
        {/* Card */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] overflow-hidden border border-slate-100/80">
          
          {/* Left Panel with Doctor Image */}
          <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 p-8 flex flex-col min-h-[560px] overflow-hidden">
            
            {/* Doctor Image Container */}
            <div className="absolute inset-0">
              <div className="relative w-full h-full">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-700/70 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-blue-600/40 to-transparent z-10" />
                
                {/* Doctor Image - Using a placeholder. Replace with your actual image */}
                <div className="relative w-full h-full">
                  <Image
                    src="/images/doctorPhoto.jpg" // Replace with your image path
                    alt="Doctor"
                    fill
                    className="object-cover object-top animate-zoomIn"
                    priority
                    onError={(e) => {
                      // Fallback if image doesn't load
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  
                  {/* Fallback SVG if image fails to load */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
                    <div className="text-center text-white/20">
                      <svg className="w-32 h-32 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 3.87 7 11 7 11s7-7.13 7-11c0-3.87-3.13-7-7-7z" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="9" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Animated Background Shapes */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5 blur-2xl animate-pulse-slow z-0" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-purple-400/10 blur-2xl animate-pulse-slow-delay z-0" />
            
            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] z-0">
              <div className="w-full h-full" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '20px 20px'
              }} />
            </div>

            {/* Header - Now on top of image */}
            <div className="relative z-20 animate-slideDown">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center animate-pulse-subtle">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 17L12 22L22 17" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 12L12 17L22 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-white font-bold text-base tracking-tight drop-shadow-lg">MediSlotBook</span>
              </div>
              
              <div className="mt-4">
                <p className="text-white/70 text-[11px] font-medium tracking-[0.15em] uppercase drop-shadow">Your Appointments</p>
                <div className="flex items-end gap-2 mt-1">
                  <span className="text-white text-3xl font-bold tracking-tight drop-shadow-lg animate-pulse-text">{currentTime || "10:30 AM"}</span>
                  <span className="text-white/70 text-xs mb-1 drop-shadow">{greeting}</span>
                </div>
              </div>
            </div>

            {/* Calendar - With glass effect on image */}
            <div className="relative z-20 mt-3 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 animate-scaleIn">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/90 text-xs font-medium">January 2026</span>
                <div className="flex gap-0.5">
                  <button className="w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 transition-all hover:scale-105">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18L9 12L15 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button className="w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 transition-all hover:scale-105">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18L15 12L9 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-0.5">
                {days.map((day, index) => (
                  <div key={index} className="text-center">
                    <span className={`text-[10px] font-medium ${index === today ? 'text-white' : 'text-white/50'}`}>
                      {day}
                    </span>
                  </div>
                ))}
                {[...Array(28)].map((_, i) => {
                  const dayNum = i + 1;
                  const isToday = dayNum === 14;
                  return (
                    <div key={i} className="text-center">
                      <div className={`w-full aspect-square rounded-md flex items-center justify-center text-[11px] transition-all duration-300
                        ${isToday 
                          ? 'bg-white text-blue-600 font-bold shadow-lg shadow-blue-500/30 scale-110 animate-bounce-subtle' 
                          : 'text-white/70 hover:bg-white/10 hover:scale-105'
                        }
                      `}>
                        {dayNum}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Appointments - With glass effect */}
            <div className="relative z-20 space-y-2 mt-3">
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-3.5 py-2.5 border border-white/10 flex items-center gap-3 animate-slideInLeft group hover:bg-white/15 transition-all duration-300">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <DoctorIcon />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/90 text-sm font-medium truncate drop-shadow">Dr. Aritra Das</p>
                  <div className="flex items-center gap-1.5 text-white/50 text-[10px]">
                    <ClockIcon />
                    <span>10:00 AM</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-400/20 text-emerald-200 text-[9px] font-semibold rounded-full animate-pulse-status">Confirmed</span>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-xl px-3.5 py-2.5 border border-white/5 flex items-center gap-3 opacity-70 animate-slideInLeft-delay group hover:bg-white/10 transition-all duration-300">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <CalendarIcon />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/70 text-sm font-medium drop-shadow">Available Slot</p>
                  <div className="flex items-center gap-1.5 text-white/30 text-[10px]">
                    <ClockIcon />
                    <span>3:30 PM</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-blue-400/20 text-blue-200 text-[9px] font-semibold rounded-full animate-pulse-available">Available</span>
              </div>
            </div>

            {/* Doctor Badge */}
            <div className="relative z-20 mt-3 flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10 animate-fadeInUp">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-white/80 text-[10px] font-light">Trusted by 50,000+ patients</span>
            </div>
          </div>

          {/* Right Panel - Login */}
          <div className="p-8 lg:p-10 bg-white flex flex-col justify-center">
            <div className="max-w-sm mx-auto w-full">
              {/* Welcome */}
              <div className="mb-6 animate-fadeInRight">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl animate-wave">👋</span>
                  <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">Welcome</span>
                </div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-tight">
                  Your Doctors <br />
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Are Waiting.</span>
                </h1>
                <p className="text-slate-500 text-xs mt-1.5">
                  Login to view and manage your appointments.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Email */}
                <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors duration-300">
                      <EmailIcon />
                    </div>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      {...register("email")}
                      className={`w-full pl-9 pr-3 py-2.5 bg-slate-50 border rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 text-sm ${
                        errors.email 
                          ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' 
                          : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-slate-300'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-[10px] font-medium mt-1.5 flex items-center gap-1 animate-shake">
                      <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-medium text-slate-700">
                      Password
                    </label>
                    <Link 
                      href="/forgotPassword" 
                      className="text-[10px] text-blue-600 hover:text-blue-700 font-medium transition-all hover:underline"
                    >
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors duration-300">
                      <LockIcon />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...register("password")}
                      className={`w-full pl-9 pr-9 py-2.5 bg-slate-50 border rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 text-sm ${
                        errors.password 
                          ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' 
                          : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-slate-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-all duration-300 hover:scale-110"
                    >
                      {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-[10px] font-medium mt-1.5 flex items-center gap-1 animate-shake">
                      <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Remember Me */}
                <div className="flex items-center gap-2 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-0 transition-all duration-200 cursor-pointer"
                  />
                  <label htmlFor="remember" className="text-xs text-slate-600 cursor-pointer hover:text-slate-900 transition-colors">
                    Remember me
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 shadow-[0_4px_12px_rgba(37,99,235,0.25)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.35)] disabled:opacity-60 disabled:cursor-not-allowed text-sm relative overflow-hidden group animate-fadeInUp"
                  style={{ animationDelay: '0.4s' }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <span className="relative flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <SpinnerIcon />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </span>
                </button>

                {/* Register */}
                <p className="text-center text-xs text-slate-600 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
                  New patient?{" "}
                  <Link
                    href="/auth/register"
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-all hover:underline"
                  >
                    Create account
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(-15px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes zoomIn {
          from {
            transform: scale(1.1);
          }
          to {
            transform: scale(1);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(-5deg); }
        }
        
        @keyframes particle {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-25px) translateX(5px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.1); opacity: 0.6; }
        }
        
        @keyframes pulse-slow-delay {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.5; }
        }
        
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes pulse-text {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes pulse-status {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        
        @keyframes pulse-available {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes bounce-subtle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }
        
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out both;
        }
        
        .animate-fadeInRight {
          animation: fadeInRight 0.5s ease-out both;
        }
        
        .animate-slideDown {
          animation: slideDown 0.5s ease-out both;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.5s ease-out both;
        }
        
        .animate-slideInLeft-delay {
          animation: slideInLeft 0.5s ease-out 0.15s both;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out 0.1s both;
        }
        
        .animate-zoomIn {
          animation: zoomIn 0.6s ease-out;
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float-delay 10s ease-in-out infinite 2s;
        }
        
        .animate-particle {
          animation: particle 12s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        
        .animate-pulse-slow-delay {
          animation: pulse-slow-delay 10s ease-in-out infinite 3s;
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 3s ease-in-out infinite;
        }
        
        .animate-pulse-text {
          animation: pulse-text 2s ease-in-out infinite;
        }
        
        .animate-pulse-status {
          animation: pulse-status 2s ease-in-out infinite;
        }
        
        .animate-pulse-available {
          animation: pulse-available 2.5s ease-in-out infinite;
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
        
        .animate-wave {
          animation: wave 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;