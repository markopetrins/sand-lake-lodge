import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaCar } from 'react-icons/fa';

const About = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="images/hero/beach.jpg" 
            alt="Sand Lake Lodge" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <div className="mb-4 md:mb-6">
              <div className="inline-block p-2 md:p-3 bg-amber-50/60 backdrop-blur-sm rounded-full mb-3">
                <img src="cabin_icon.png" alt="Sand Lake Lodge" className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-3 text-white drop-shadow-2xl leading-tight">
                About Sand Lake Lodge
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-4 text-amber-100 font-light drop-shadow-lg max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-2">
                Your lakeside sanctuary
              </p>
              <div className="w-16 md:w-20 h-0.5 md:h-1 bg-amber-400 mx-auto mb-4"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center lg:text-left order-2 lg:order-1"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-900 mb-6">
                Welcome to Your Lakeside Paradise
              </h2>
              <p className="text-lg text-amber-800 mb-6 leading-relaxed">
                Sand Lake Lodge is more than just a place to stay—it's your personal retreat in the heart of Ontario's pristine lake country. Here, you'll find the perfect balance of seclusion and accessibility, where every detail has been thoughtfully crafted to create an unforgettable experience.
              </p>
              <p className="text-lg text-amber-800 mb-6 leading-relaxed">
                Our handcrafted log cabin stands as a testament to traditional craftsmanship while offering all the modern comforts you expect. With 3 bedrooms, a bunkbed room, 3 bathrooms, a dedicated playroom, and spacious living areas, we can comfortably accommodate up to 8 guests.
              </p>
              <p className="text-lg text-amber-800 mb-8 leading-relaxed">
                Whether you're seeking a romantic getaway, a family adventure, or a peaceful solo retreat, Sand Lake Lodge provides the perfect backdrop for your story. With 200 feet of private shoreline, stunning sunset views, and endless outdoor activities, your perfect escape awaits.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                    <span className="text-amber-800 font-medium">3 bedrooms + bunkbed room</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                    <span className="text-amber-800 font-medium">3 full bathrooms</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                    <span className="text-amber-800 font-medium">Dedicated playroom</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                    <span className="text-amber-800 font-medium">Sleeps up to 8 guests</span>
                  </div>
                </div>
              </div>
              <Link
                to="/booking"
                className="bg-amber-800 text-white px-8 py-4 rounded-none font-semibold hover:bg-amber-900 transition-all duration-300 inline-block border-2 border-amber-700 hover:border-amber-600 transform hover:-translate-y-1 shadow-lg"
              >
                Reserve Your Stay
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative order-1 lg:order-2"
            >
              <div className="relative">
                <img 
                  src="images/hero/living_room.jpg" 
                  alt="Sand Lake Lodge living room with lake views" 
                  className="w-full h-80 md:h-96 object-cover shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Guest Experience */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-900 mb-4">Your Perfect Getaway Awaits</h2>
            <p className="text-lg md:text-xl text-amber-700 max-w-2xl mx-auto">
              Experience the perfect blend of adventure and relaxation at Sand Lake Lodge
            </p>
          </motion.div>

                     <div className="grid md:grid-cols-3 gap-8">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.1 }}
               viewport={{ once: true }}
               className="text-center"
             >
               <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                                   <img 
                    src="images/hero/kitchen.jpg" 
                    alt="Fully equipped kitchen at Sand Lake Lodge" 
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                 <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">Fully Equipped Kitchen</h3>
                 <p className="text-amber-700">Everything you need to prepare delicious meals with lake views</p>
               </div>
             </motion.div>

             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
               viewport={{ once: true }}
               className="text-center"
             >
               <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                                   <img 
                    src="images/hero/dock.jpg" 
                    alt="Private dock at Sand Lake Lodge" 
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                 <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">Private Dock</h3>
                 <p className="text-amber-700">Your own dock for fishing, swimming, or simply enjoying the water</p>
               </div>
             </motion.div>

             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.3 }}
               viewport={{ once: true }}
               className="text-center"
             >
               <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                                   <img 
                    src="images/hero/bonfire.jpg" 
                    alt="Bonfire area at Sand Lake Lodge" 
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                 <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">Bonfire Area</h3>
                 <p className="text-amber-700">Perfect spot for evening gatherings and stargazing</p>
               </div>
             </motion.div>
           </div>
        </div>
      </section>

      {/* Location & Access */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-serif font-bold text-amber-900 mb-2">Perfect Location, Easy Access</h2>
            <p className="text-lg text-amber-700 max-w-2xl mx-auto">
              Secluded yet accessible - the best of both worlds
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4 p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors duration-300"
            >
              <div className="flex-shrink-0">
                <FaMapMarkerAlt className="text-2xl text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-amber-900 mb-1">Secluded Paradise</h3>
                <p className="text-sm text-amber-700">
                  2 acres of private woodland, 200 feet of shoreline, 15 min to amenities
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4 p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors duration-300"
            >
              <div className="flex-shrink-0">
                <FaCar className="text-2xl text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-amber-900 mb-1">Easy Arrival</h3>
                <p className="text-sm text-amber-700">
                  Paved access, private driveway, 2 hours from Toronto
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4 p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors duration-300"
            >
              <div className="flex-shrink-0">
                <FaClock className="text-2xl text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-amber-900 mb-1">Flexible Timing</h3>
                <p className="text-sm text-amber-700">
                  Check-in: 4:00 PM | Check-out: 11:00 AM
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 bg-gradient-to-r from-amber-800 to-amber-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-serif font-bold text-white mb-4">Ready to Experience Sand Lake Lodge?</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
              <div className="text-center">
                <FaPhone className="text-2xl text-amber-200 mx-auto mb-2" />
                <h3 className="text-lg font-serif font-bold text-white mb-1">Call Us</h3>
                <p className="text-amber-100 text-sm">416-832-9144</p>
              </div>
              <div className="text-center">
                <FaEnvelope className="text-2xl text-amber-200 mx-auto mb-2" />
                <h3 className="text-lg font-serif font-bold text-white mb-1">Email Us</h3>
                <p className="text-amber-100 text-sm">hello@sandlakelodge.com</p>
              </div>
              <div className="text-center">
                <FaMapMarkerAlt className="text-2xl text-amber-200 mx-auto mb-2" />
                <h3 className="text-lg font-serif font-bold text-white mb-1">Find Us</h3>
                <p className="text-amber-100 text-sm">Ontario Lake Country</p>
              </div>
            </div>
            <div className="space-x-4">
              <Link
                to="/booking"
                className="bg-amber-100 text-amber-900 px-8 py-4 rounded-none font-bold text-lg hover:bg-white transition-all duration-300 inline-block shadow-xl border-2 border-amber-200 hover:border-white transform hover:-translate-y-1"
              >
                Book Your Stay
              </Link>
              <Link
                to="/gallery"
                className="bg-transparent border-2 border-amber-200 text-amber-100 px-8 py-4 rounded-none font-semibold hover:bg-amber-200 hover:text-amber-900 transition-all duration-300 inline-block"
              >
                View Gallery
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About; 