import React from 'react';

const Hero = () => {
  return (
    <section className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">SWOT Bee</h1>
          <p className="py-6">
            Your intelligent business analysis companion
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;