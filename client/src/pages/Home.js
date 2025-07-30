import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of hero images - using the actual images provided
  const heroImages = [
    '/images/hero/back_face.jpg',
    '/images/hero/beach.jpg',
    '/images/hero/bonfire.jpg',
    '/images/page/fire.jpg',
    '/images/hero/kitchen.jpg',
    '/images/hero/living_room.jpg'
  ];

  // Auto-advance images every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 lg:py-24 flex items-center justify-center">
        {/* Animated Background Images */}
        <div className="absolute inset-0 overflow-hidden">
          {heroImages.map((image, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ 
                opacity: currentImageIndex === index ? 1 : 0,
                scale: currentImageIndex === index ? 1 : 1.1
              }}
              transition={{ 
                duration: 2,
                ease: "easeInOut"
              }}
            >
              <div 
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ 
                  backgroundImage: `url(${image})`,
                  backgroundPosition: 'center center',
                  backgroundSize: 'cover'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <div className="mb-6 md:mb-8">
              <div className="inline-block p-2 md:p-3 bg-amber-50/60 backdrop-blur-sm rounded-full mb-3 md:mb-4">
                <img src="/cabin_icon.png" alt="Sand Lake Lodge" className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-3 md:mb-4 text-white drop-shadow-2xl leading-tight">
                Sand Lake Lodge
              </h1>
                          <p className="text-lg sm:text-xl md:text-2xl mb-4 md:mb-6 text-amber-100 font-light drop-shadow-lg max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-2">
              Where time slows down and memories are made by the lake
            </p>
              <div className="w-16 md:w-20 h-0.5 md:h-1 bg-amber-400 mx-auto mb-4 md:mb-6"></div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 md:space-x-6 px-4">
              <Link
                to="/booking"
                className="w-full sm:w-auto bg-amber-700 text-white px-6 md:px-8 lg:px-10 py-3 md:py-4 rounded-none font-semibold text-base md:text-lg hover:bg-amber-800 transition-all duration-300 inline-block shadow-xl border-2 border-amber-600 hover:border-amber-500 transform hover:-translate-y-1"
              >
                Plan Your Escape
              </Link>
              <Link
                to="/gallery"
                className="w-full sm:w-auto bg-transparent border-2 border-amber-200 text-amber-100 px-6 md:px-8 lg:px-10 py-3 md:py-4 rounded-none font-semibold text-base md:text-lg hover:bg-amber-200 hover:text-amber-900 transition-all duration-300 inline-block backdrop-blur-sm"
              >
                Take a Look Around
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Image Navigation Dots */}
        <div className="absolute bottom-4 md:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-4">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-500 border-2 ${
                currentImageIndex === index 
                  ? 'bg-amber-400 border-amber-300 scale-125' 
                  : 'bg-transparent border-amber-200/50 hover:border-amber-200'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-900 mb-4">
              Your Perfect Lakeside Experience
            </h2>
            <p className="text-lg text-amber-700 max-w-2xl mx-auto">
              Every detail has been thoughtfully crafted to create memories that last a lifetime
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            <motion.div 
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-amber-200 to-amber-300 relative">
                <img 
                  src="/images/page/beach2.jpg" 
                  alt="Lakeside living" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-serif font-bold mb-2">Lakeside Living</h3>
                <p className="text-amber-100 text-sm">Wake up to stunning lake views and fall asleep to the gentle sounds of nature</p>
              </div>
            </motion.div>

            <motion.div 
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-amber-200 to-amber-300 relative">
                <img 
                  src="/images/page/kayak.jpg" 
                  alt="Water adventures" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-serif font-bold mb-2">Water Adventures</h3>
                <p className="text-amber-100 text-sm">Explore the lake with our provided kayaks and water equipment</p>
              </div>
            </motion.div>

            <motion.div 
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 md:col-span-2 lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-amber-200 to-amber-300 relative">
                <img 
                  src="/images/page/fire.jpg" 
                  alt="Cozy evenings" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-serif font-bold mb-2">Cozy Evenings</h3>
                <p className="text-amber-100 text-sm">Gather around the firepit for stories, s'mores, and stargazing</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-amber-800 to-amber-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Ready to Begin Your Lakeside Adventure?
            </h2>
            <p className="text-lg md:text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
              Your perfect cottage getaway is just a click away.
            </p>
            <Link
              to="/booking"
              className="bg-amber-100 text-amber-900 px-8 md:px-10 py-4 md:py-5 rounded-none font-bold text-lg md:text-xl hover:bg-white transition-all duration-300 inline-block shadow-xl border-2 border-amber-200 hover:border-white transform hover:-translate-y-1"
            >
              Check Availability & Reserve
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 