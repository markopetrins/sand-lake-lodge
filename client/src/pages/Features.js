import React from 'react';
import { motion } from 'framer-motion';
import { FaBed, FaWifi, FaUtensils, FaHome, FaWater, FaTree } from 'react-icons/fa';

const Features = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="/sand-lake-lodge/images/hero/dock2.jpg" 
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
                <img src="/sand-lake-lodge/cabin_icon.png" alt="Sand Lake Lodge" className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-3 text-white drop-shadow-2xl leading-tight">
                Features & Amenities
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-4 text-amber-100 font-light drop-shadow-lg max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-2">
                Everything you need for the perfect lakeside getaway
              </p>
              <div className="w-16 md:w-20 h-0.5 md:h-1 bg-amber-400 mx-auto mb-4"></div>
            </div>
          </motion.div>
        </div>
      </section>



      {/* Patio & Hot Tub Section */}
      <section className="py-12 md:py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-900 mb-4">
              Outdoor Relaxation
            </h2>
            <p className="text-lg text-amber-700 max-w-2xl mx-auto">
              Unwind in our beautiful outdoor spaces
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Patio */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative mb-6">
                <img 
                  src="/sand-lake-lodge/images/hero/dock.jpg" 
                  alt="Spacious patio at Sand Lake Lodge" 
                  className="w-full h-80 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent rounded-lg"></div>
              </div>
              <h3 className="text-2xl font-serif font-bold text-amber-900 mb-3">Spacious Patio</h3>
              <p className="text-amber-700 leading-relaxed">
                Enjoy outdoor dining and relaxation on our large deck with comfortable seating, 
                perfect for morning coffee or evening gatherings with stunning lake views.
              </p>
            </motion.div>

            {/* Hot Tub */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative mb-6">
                <img 
                  src="/sand-lake-lodge/images/page/hottub.jpg" 
                  alt="Relaxing hot tub at Sand Lake Lodge" 
                  className="w-full h-80 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent rounded-lg"></div>
              </div>
              <h3 className="text-2xl font-serif font-bold text-amber-900 mb-3">Private Hot Tub</h3>
              <p className="text-amber-700 leading-relaxed">
                Soak away your cares in our private hot tub, perfect for relaxing after a day 
                of outdoor activities or stargazing under the night sky.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Local Attractions & Ads */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-900 mb-4">
              Explore Beyond the Lodge
            </h2>
            <p className="text-lg text-amber-700 max-w-2xl mx-auto">
              Discover exciting local attractions and activities near Sand Lake Lodge
            </p>
          </motion.div>

                     <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                           {/* ATV Tours Ad */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-500"
              >
                <div className="relative">
                                  <img 
                  src="/sand-lake-lodge/images/page/atvtours.jpg" 
                  alt="ATV Tours" 
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-serif font-bold mb-2">Thrilling ATV Tours</h3>
                  <p className="text-amber-100 text-sm mb-3">Explore scenic trails and rugged terrain with guided ATV adventures.</p>
                  <a 
                    href="https://www.offroadatvtoursontario.ca" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    Show More
                  </a>
                </div>
              </motion.div>

              {/* Antique Market Ad */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-500"
              >
                <div className="relative">
                                  <img 
                  src="/sand-lake-lodge/images/page/antiquemarket.jpg" 
                  alt="Antique Market" 
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-serif font-bold mb-2">Charming Antique Markets</h3>
                  <p className="text-amber-100 text-sm mb-3">Discover unique treasures and local crafts at nearby antique markets.</p>
                  <a 
                    href="https://www.facebook.com/NostalgiaAntiques" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    Show More
                  </a>
                </div>
              </motion.div>
           </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-12 md:py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-900 mb-4">
              Lodge Features
            </h2>
            <p className="text-lg text-amber-700 max-w-2xl mx-auto">
              Comfort and convenience in every detail
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FaBed className="text-4xl text-amber-600 mb-4" />
              <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">Sleeping Arrangements</h3>
              <ul className="text-amber-700 text-sm space-y-1">
                <li>• 3 bedrooms with queen beds</li>
                <li>• 1 bunkbed room for kids</li>
                <li>• 3 full bathrooms</li>
                <li>• Sleeps up to 8 guests</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FaUtensils className="text-4xl text-amber-600 mb-4" />
              <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">Kitchen & Dining</h3>
              <ul className="text-amber-700 text-sm space-y-1">
                <li>• Fully equipped kitchen</li>
                <li>• Full-size refrigerator</li>
                <li>• Stove, oven & microwave</li>
                <li>• Coffee maker & toaster</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FaWater className="text-4xl text-amber-600 mb-4" />
              <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">Lakeside Features</h3>
              <ul className="text-amber-700 text-sm space-y-1">
                <li>• 200 feet private shoreline</li>
                <li>• Private sandy beach</li>
                <li>• Dock for fishing/swimming</li>
                <li>• Evening firepit</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FaHome className="text-4xl text-amber-600 mb-4" />
              <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">Family Features</h3>
              <ul className="text-amber-700 text-sm space-y-1">
                <li>• Dedicated playroom</li>
                <li>• Family-friendly layout</li>
                <li>• Safe outdoor activities</li>
                <li>• Pet-friendly (with approval)</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FaWifi className="text-4xl text-amber-600 mb-4" />
              <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">Modern Amenities</h3>
              <ul className="text-amber-700 text-sm space-y-1">
                <li>• High-speed WiFi</li>
                <li>• Private parking</li>
                <li>• Natural setting</li>
                <li>• Secluded location</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FaTree className="text-4xl text-amber-600 mb-4" />
              <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">Outdoor Activities</h3>
              <ul className="text-amber-700 text-sm space-y-1">
                <li>• Swimming & fishing</li>
                <li>• Kayaking</li>
                <li>• Hiking trails</li>
                <li>• Wildlife watching</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Features; 