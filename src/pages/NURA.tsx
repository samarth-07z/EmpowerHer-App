// import { useState, useRef, useEffect } from 'react';
// import { Volume2, VolumeX, Play, Pause, Maximize2 } from 'lucide-react';
// import Navigation from '../components/Navigation';
// import SOSButton from '../components/SOSButton';
// import Footer from '../components/Footer';

// const NURA = () => {
//   const [isSoundOn, setIsSoundOn] = useState(true);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // Auto-play video when component mounts
//     if (videoRef.current) {
//       videoRef.current.play().catch(error => {
//         console.log('Auto-play prevented:', error);
//       });
//     }
//   }, []);

//   const toggleSound = () => {
//     if (videoRef.current) {
//       videoRef.current.muted = !isSoundOn;
//       setIsSoundOn(!isSoundOn);
//     }
//   };

//   const togglePlayPause = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const toggleFullscreen = () => {
//     if (!document.fullscreenElement) {
//       containerRef.current?.requestFullscreen();
//       setIsFullscreen(true);
//     } else {
//       document.exitFullscreen();
//       setIsFullscreen(false);
//     }
//   };

//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       setIsFullscreen(!!document.fullscreenElement);
//     };

//     document.addEventListener('fullscreenchange', handleFullscreenChange);
//     return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
//   }, []);

//   return (
//     <div className="min-h-screen relative bg-navy-900">
//       <Navigation />
//       <SOSButton />
      
//       {/* Background Video Container */}
//       <div 
//         ref={containerRef}
//         className="relative w-full h-screen overflow-hidden"
//       >
//         {/* Background Video */}
//         <video
//           ref={videoRef}
//           className="absolute inset-0 w-full h-full object-cover"
//           loop
//           muted={!isSoundOn}
//           playsInline
//         >
//           <source src="/icons/background-video.mp4" type="video/mp4" />
//           <source src="/icons/background-video.webm" type="video/webm" />
//           Your browser does not support the video tag.
//         </video>

//         {/* Video Overlay */}
//         <div className="absolute inset-0 bg-navy-900/40"></div>

//         {/* Content Overlay */}
//         <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
//           {/* Main Title */}
//           <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight">
//             <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
//               NURA
//             </span>
//           </h1>
          
//           {/* Subtitle */}
//           <p className="text-xl md:text-2xl text-blue-200 mb-12 max-w-3xl leading-relaxed">
//             Immerse yourself in a world of tranquility and mindfulness
//           </p>

//           {/* Control Buttons */}
//           <div className="flex items-center space-x-4 mb-8">
//             {/* Play/Pause Button */}
//             <button
//               onClick={togglePlayPause}
//               className="glass-button bg-blue-600/20 border-blue-400/30 hover:bg-blue-600/30 p-4 rounded-full"
//             >
//               {isPlaying ? (
//                 <Pause className="w-6 h-6 text-blue-200" />
//               ) : (
//                 <Play className="w-6 h-6 text-blue-200" />
//               )}
//             </button>

//             {/* Sound Toggle Button */}
//             <button
//               onClick={toggleSound}
//               className={`glass-button p-4 rounded-full transition-all duration-300 ${
//                 isSoundOn 
//                   ? 'bg-green-600/20 border-green-400/30 hover:bg-green-600/30' 
//                   : 'bg-red-600/20 border-red-400/30 hover:bg-red-600/30'
//               }`}
//             >
//               {isSoundOn ? (
//                 <Volume2 className="w-6 h-6 text-green-200" />
//               ) : (
//                 <VolumeX className="w-6 h-6 text-red-200" />
//               )}
//             </button>

//             {/* Fullscreen Button */}
//             <button
//               onClick={toggleFullscreen}
//               className="glass-button bg-purple-600/20 border-purple-400/30 hover:bg-purple-600/30 p-4 rounded-full"
//             >
//               <Maximize2 className="w-6 h-6 text-purple-200" />
//             </button>
//           </div>

//           {/* Status Indicators */}
//           <div className="flex items-center space-x-6 text-sm">
//             <div className="flex items-center space-x-2">
//               <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-green-400' : 'bg-red-400'}`}></div>
//               <span className="text-blue-200">
//                 {isPlaying ? 'Playing' : 'Paused'}
//               </span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className={`w-3 h-3 rounded-full ${isSoundOn ? 'bg-green-400' : 'bg-red-400'}`}></div>
//               <span className="text-blue-200">
//                 Sound {isSoundOn ? 'On' : 'Off'}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Floating Elements */}
//         <div className="absolute inset-0 pointer-events-none">
//           {/* Floating circles */}
//           <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400/10 rounded-full animate-pulse"></div>
//           <div className="absolute top-40 right-32 w-24 h-24 bg-cyan-400/10 rounded-full animate-pulse delay-1000"></div>
//           <div className="absolute bottom-32 left-32 w-20 h-20 bg-purple-400/10 rounded-full animate-pulse delay-2000"></div>
//           <div className="absolute bottom-20 right-20 w-28 h-28 bg-blue-400/10 rounded-full animate-pulse delay-3000"></div>
//         </div>
//       </div>

//       {/* Additional Content Section */}
//       <div className="relative z-20 bg-navy-800 py-20 px-4">
//         <div className="max-w-6xl mx-auto">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             {/* Left Column */}
//             <div>
//               <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//                 Experience <span className="text-blue-400">Serenity</span>
//               </h2>
//               <p className="text-lg text-blue-200 mb-8 leading-relaxed">
//                 NURA is your gateway to a world of peace and mindfulness. Immerse yourself in 
//                 beautiful visuals and soothing sounds designed to reduce stress and enhance your 
//                 well-being journey.
//               </p>
              
//               <div className="space-y-4">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
//                   <span className="text-blue-200">High-quality immersive content</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
//                   <span className="text-blue-200">Customizable audio experience</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
//                   <span className="text-blue-200">Perfect for meditation and relaxation</span>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column */}
//             <div className="glass-card bg-navy-700/50 border-navy-600/30 p-8">
//               <h3 className="text-2xl font-semibold text-white mb-6">Mindfulness Features</h3>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between p-3 rounded-lg bg-navy-600/30">
//                   <span className="text-blue-200">Video Quality</span>
//                   <span className="text-green-400 font-medium">4K Ultra HD</span>
//                 </div>
//                 <div className="flex items-center justify-between p-3 rounded-lg bg-navy-600/30">
//                   <span className="text-blue-200">Audio Quality</span>
//                   <span className="text-green-400 font-medium">Lossless</span>
//                 </div>
//                 <div className="flex items-center justify-between p-3 rounded-lg bg-navy-600/30">
//                   <span className="text-blue-200">Duration</span>
//                   <span className="text-green-400 font-medium">Continuous</span>
//                 </div>
//                 <div className="flex items-center justify-between p-3 rounded-lg bg-navy-600/30">
//                   <span className="text-blue-200">Compatibility</span>
//                   <span className="text-green-400 font-medium">All Devices</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <Footer />
//     </div>
//   );
// };

// export default NURA;
