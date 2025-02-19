import React from 'react';
import jjmLogo from '../assets/jjmlogo.jpg';

const Loading = () => {
  return (
    <section className="flex items-center justify-center h-screen bg-base-200">
      <div className="flex flex-col items-center animate-fadeIn">
        <img
          src={jjmLogo}
          alt="JJM Logo"
          className="w-16 h-16 rounded-full object-cover animate-spin-slow"
          aria-label="Loading"
        />
        <h2 className="text-lg mt-4 animate-pulse text-gray-700">Loading...</h2>
        <div className="w-1/4 mt-4 bg-gray-300 rounded-full h-1">
          <div className="bg-blue-500 h-1 rounded-full animate-loading-progress"></div>
        </div>
      </div>
    </section>
  );
};

export default Loading;
