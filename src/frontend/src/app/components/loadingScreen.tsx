export default function LoadingScreen() {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
        <div className="space-x-2 flex">
          <div className="animate-pulse-fast h-4 w-4 bg-white rounded-full"></div>
          <div className="animate-pulse-medium h-4 w-4 bg-white rounded-full"></div>
          <div className="animate-pulse-slow h-4 w-4 bg-white rounded-full"></div>
        </div>
  
        <style jsx>{`
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.5);
            }
          }
          .animate-pulse-fast {
            animation: pulse 0.6s infinite;
          }
          .animate-pulse-medium {
            animation: pulse 0.8s infinite;
          }
          .animate-pulse-slow {
            animation: pulse 1s infinite;
          }
        `}</style>
      </div>
    );
  }