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
            src="/sand-lake-shores/images/hero/beach.jpg" 
            alt="Sand Lake Shores" 
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
                <img src="/sand-lake-shores/cabin_icon.png" alt="Sand Lake Shores" className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-3 text-white drop-shadow-2xl leading-tight">
                About Sand Lake Shores
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
          <div className="max-w-4xl mx-auto">
            {/* Welcome & Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-900 mb-6">
                Welcome to Your Lakeside Paradise
              </h2>
              <p className="text-lg text-amber-800 mb-8 leading-relaxed max-w-3xl mx-auto">
                Welcome to Sand Lake Shores – Rustic Comfort, Lakeside Bliss. Discover the perfect blend of timeless charm and modern comfort at our handcrafted cottage, nestled along 200 feet of private shoreline in Ontario's pristine lake country.
              </p>
              
              {/* Quick Facts */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-2">4</div>
                  <div className="text-amber-800 font-medium">Bedrooms</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-2">3</div>
                  <div className="text-amber-800 font-medium">Bathrooms</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-2">8</div>
                  <div className="text-amber-800 font-medium">Guests</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-2">200'</div>
                  <div className="text-amber-800 font-medium">Shoreline</div>
                </div>
              </div>
            </motion.div>

            {/* Location & Setting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-12 items-center mb-16"
            >
              <div>
                <h3 className="text-2xl font-serif font-bold text-amber-900 mb-4">
                  Perfect Location
                </h3>
                <p className="text-amber-800 mb-4 leading-relaxed">
                  Located in the southern Almaguin Highlands, just west of Algonquin Park, north of Huntsville, and east of Hwy 11. We're at the end of Hwy 518 on Sand Lake, about 10 km north of Kearney.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                    <span className="text-amber-800">2 acres of private woodland</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                    <span className="text-amber-800">15 minutes to amenities</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                    <span className="text-amber-800">2 hours from Toronto</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="/sand-lake-shores/images/hero/living_room.jpg" 
                  alt="Sand Lake Shores living room with lake views" 
                  className="w-full h-80 object-cover shadow-2xl rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent rounded-lg"></div>
              </div>
            </motion.div>

            {/* What Makes Us Special */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h3 className="text-2xl font-serif font-bold text-amber-900 mb-8 text-center">
                What Makes Sand Lake Shores Special
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center bg-amber-50 p-6 rounded-lg">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏠</span>
                  </div>
                  <h4 className="text-lg font-serif font-bold text-amber-900 mb-2">Handcrafted Comfort</h4>
                  <p className="text-amber-700 text-sm">Traditional craftsmanship meets modern luxury in our four-bedroom cottage</p>
                </div>
                
                <div className="text-center bg-amber-50 p-6 rounded-lg">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌊</span>
                  </div>
                  <h4 className="text-lg font-serif font-bold text-amber-900 mb-2">Lakeside Living</h4>
                  <p className="text-amber-700 text-sm">200 feet of private shoreline with sandy beach, dock, and water activities</p>
                </div>
                
                <div className="text-center bg-amber-50 p-6 rounded-lg">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h4 className="text-lg font-serif font-bold text-amber-900 mb-2">Perfect Balance</h4>
                  <p className="text-amber-700 text-sm">Secluded paradise with easy access to amenities and attractions</p>
                </div>
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
              Experience the perfect blend of adventure and relaxation at Sand Lake Shores
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
                    src="/sand-lake-shores/images/hero/kitchen.jpg" 
                    alt="Fully equipped kitchen at Sand Lake Shores" 
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
                    src="/sand-lake-shores/images/hero/dock.jpg" 
                    alt="Private dock at Sand Lake Shores" 
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
                    src="/sand-lake-shores/images/hero/bonfire.jpg" 
                    alt="Bonfire area at Sand Lake Shores" 
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
            <h2 className="text-3xl font-serif font-bold text-white mb-4">Ready to Experience Sand Lake Shores?</h2>
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