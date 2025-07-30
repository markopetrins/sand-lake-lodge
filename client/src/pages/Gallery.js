import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    // Exterior & Patio
    { 
      id: 1, 
      src: '/images/gallery/patio1.jpg', 
      title: 'Outdoor Patio', 
      description: 'Beautiful outdoor space perfect for dining and relaxation', 
      category: 'exterior' 
    },
    { 
      id: 2, 
      src: '/images/gallery/patio2.jpg', 
      title: 'Patio with Lake Views', 
      description: 'Enjoy stunning lake views from our spacious patio', 
      category: 'exterior' 
    },
    { 
      id: 3, 
      src: '/images/gallery/patio3.jpg', 
      title: 'Evening Patio', 
      description: 'Perfect spot for evening gatherings and stargazing', 
      category: 'exterior' 
    },
    { 
      id: 4, 
      src: '/images/gallery/patio4.jpg', 
      title: 'Patio Seating', 
      description: 'Comfortable outdoor seating with lake breezes', 
      category: 'exterior' 
    },
    
    // Interior - Living Areas
    { 
      id: 5, 
      src: '/images/gallery/livingroom.jpg', 
      title: 'Cozy Living Room', 
      description: 'Warm and inviting living space with lake views', 
      category: 'interior' 
    },
    { 
      id: 6, 
      src: '/images/gallery/diningtable.jpg', 
      title: 'Dining Area', 
      description: 'Perfect setting for family meals and gatherings', 
      category: 'interior' 
    },
    
    // Playroom
    { 
      id: 7, 
      src: '/images/gallery/playroom_1.jpg', 
      title: 'Family Playroom', 
      description: 'Dedicated space for kids to play, read, and have fun', 
      category: 'playroom' 
    },
    { 
      id: 8, 
      src: '/images/gallery/playroom2.jpg', 
      title: 'Kids Entertainment Area', 
      description: 'Perfect room for children to enjoy their own space', 
      category: 'playroom' 
    },
    
    // Kitchen
    { 
      id: 9, 
      src: '/images/gallery/kitchen.jpg', 
      title: 'Fully Equipped Kitchen', 
      description: 'Everything you need to prepare delicious meals', 
      category: 'kitchen' 
    },
    { 
      id: 10, 
      src: '/images/gallery/kitchen2.jpg', 
      title: 'Kitchen with Views', 
      description: 'Cook with beautiful lake views', 
      category: 'kitchen' 
    },
    
    // Bedrooms
    { 
      id: 11, 
      src: '/images/gallery/master.jpg', 
      title: 'Master Bedroom', 
      description: 'Comfortable master bedroom with lake views', 
      category: 'bedrooms' 
    },
    { 
      id: 12, 
      src: '/images/gallery/bedroom2.jpg', 
      title: 'Guest Bedroom', 
      description: 'Cozy guest bedroom perfect for visitors', 
      category: 'bedrooms' 
    },
    { 
      id: 13, 
      src: '/images/gallery/bedroom3.jpg', 
      title: 'Additional Bedroom', 
      description: 'Spacious bedroom for family or friends', 
      category: 'bedrooms' 
    },
    { 
      id: 14, 
      src: '/images/gallery/bunkbedroom2.jpg', 
      title: 'Bunk Bed Room', 
      description: 'Perfect for kids with fun bunk bed setup', 
      category: 'bedrooms' 
    },
    
    // Bathrooms
    { 
      id: 15, 
      src: '/images/gallery/bathroom.jpg', 
      title: 'Main Bathroom', 
      description: 'Clean and modern bathroom facilities', 
      category: 'bathrooms' 
    },
    { 
      id: 16, 
      src: '/images/gallery/bathroom2.jpg', 
      title: 'Additional Bathroom', 
      description: 'Convenient bathroom for guests', 
      category: 'bathrooms' 
    },
    { 
      id: 17, 
      src: '/images/gallery/bathroom3.jpg', 
      title: 'Bathroom Detail', 
      description: 'Well-appointed bathroom with all amenities', 
      category: 'bathrooms' 
    }
  ];

  const filteredImages = images;

  const openImage = (image) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    setSelectedImage(filteredImages[prevIndex]);
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="/images/hero/bonfire.jpg" 
            alt="Sand Lake Lodge Gallery" 
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
                 <img src="/cabin_icon.png" alt="Sand Lake Lodge" className="w-6 h-6 md:w-8 md:h-8" />
               </div>
               <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-3 text-white drop-shadow-2xl leading-tight">
                 Photo Gallery
               </h1>
                               <p className="text-lg sm:text-xl md:text-2xl mb-4 text-amber-100 font-light drop-shadow-lg max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-2">
                  Discover the beauty of Sand Lake Lodge
                </p>
               <div className="w-16 md:w-20 h-0.5 md:h-1 bg-amber-400 mx-auto mb-4"></div>
             </div>
          </motion.div>
        </div>
      </section>



      {/* Gallery Grid */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => openImage(image)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                  <div className="aspect-[4/3] relative">
                    <img 
                      src={image.src} 
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-lg font-serif font-bold mb-1">{image.title}</h3>
                      <p className="text-sm text-amber-100">{image.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {filteredImages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-amber-700 text-lg">No images found in this category.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl w-full max-h-[90vh]"
            >
              {/* Close button */}
              <button
                onClick={closeImage}
                className="absolute top-4 right-4 text-white hover:text-amber-200 z-10 bg-black/50 rounded-full p-2 transition-colors duration-300"
              >
                <FaTimes size={24} />
              </button>

              {/* Navigation buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-amber-200 z-10 bg-black/50 rounded-full p-3 transition-colors duration-300"
              >
                <FaChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-amber-200 z-10 bg-black/50 rounded-full p-3 transition-colors duration-300"
              >
                <FaChevronRight size={24} />
              </button>

              {/* Image content */}
              <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
                <div className="relative">
                  <img 
                    src={selectedImage.src} 
                    alt={selectedImage.title}
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h3 className="text-2xl font-serif font-bold text-white mb-2">{selectedImage.title}</h3>
                    <p className="text-amber-100 text-lg">{selectedImage.description}</p>
                  </div>
                </div>
              </div>

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
                {filteredImages.findIndex(img => img.id === selectedImage.id) + 1} of {filteredImages.length}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery; 