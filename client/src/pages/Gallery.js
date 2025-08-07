import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight, FaPlay, FaImage, FaVideo } from 'react-icons/fa';

const Gallery = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [activeTab, setActiveTab] = useState('photos'); // 'photos' or 'videos'
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const modalRef = useRef(null);

  const images = [
    // Exterior & Patio
    { 
      id: 1, 
      src: '/sand-lake-lodge/images/gallery/patio1.jpg', 
      title: 'Outdoor Patio', 
      description: 'Beautiful outdoor space perfect for dining and relaxation', 
      category: 'exterior',
      type: 'image'
    },
    { 
      id: 2, 
      src: '/sand-lake-lodge/images/gallery/patio2.jpg', 
      title: 'Patio with Lake Views', 
      description: 'Enjoy stunning lake views from our spacious patio', 
      category: 'exterior',
      type: 'image'
    },
    { 
      id: 3, 
      src: '/sand-lake-lodge/images/gallery/patio3.jpg', 
      title: 'Evening Patio', 
      description: 'Perfect spot for evening gatherings and stargazing', 
      category: 'exterior',
      type: 'image'
    },
    { 
      id: 4, 
      src: '/sand-lake-lodge/images/gallery/patio4.jpg', 
      title: 'Patio Seating', 
      description: 'Comfortable outdoor seating with lake breezes', 
      category: 'exterior',
      type: 'image'
    },
    { 
      id: 5, 
      src: '/sand-lake-lodge/images/gallery/birdfeeder.jpg', 
      title: 'Bird Feeder', 
      description: 'Enjoy watching local wildlife from the comfort of your patio', 
      category: 'exterior',
      type: 'image'
    },
    { 
      id: 6, 
      src: '/sand-lake-lodge/images/gallery/backofcottage.jpg', 
      title: 'Back of Cottage', 
      description: 'Beautiful rear view of the cottage with natural surroundings', 
      category: 'exterior',
      type: 'image'
    },
    { 
      id: 7, 
      src: '/sand-lake-lodge/images/gallery/barbecue.jpg', 
      title: 'BBQ Area', 
      description: 'Perfect grilling setup for outdoor cooking', 
      category: 'exterior',
      type: 'image'
    },
    { 
      id: 8, 
      src: '/sand-lake-lodge/images/gallery/bonfire.jpg', 
      title: 'Bonfire Area', 
      description: 'Cozy fire pit for evening gatherings and marshmallow roasting', 
      category: 'exterior',
      type: 'image'
    },
    { 
      id: 9, 
      src: '/sand-lake-lodge/images/gallery/dock.jpg', 
      title: 'Private Dock', 
      description: 'Your own private dock for fishing, swimming, and relaxation', 
      category: 'exterior',
      type: 'image'
    },
    { 
      id: 10, 
      src: '/sand-lake-lodge/images/gallery/lake.jpg', 
      title: 'Lake View', 
      description: 'Stunning lake views from the cottage', 
      category: 'exterior',
      type: 'image'
    },
    
    // Interior - Living Areas
    { 
      id: 11, 
      src: '/sand-lake-lodge/images/gallery/livingroom.jpg', 
      title: 'Cozy Living Room', 
      description: 'Warm and inviting living space with lake views', 
      category: 'interior',
      type: 'image'
    },
    { 
      id: 12, 
      src: '/sand-lake-lodge/images/gallery/livingroom2.jpg', 
      title: 'Living Area', 
      description: 'Comfortable seating area perfect for relaxation', 
      category: 'interior',
      type: 'image'
    },
    { 
      id: 13, 
      src: '/sand-lake-lodge/images/gallery/diningtable.jpg', 
      title: 'Dining Area', 
      description: 'Perfect setting for family meals and gatherings', 
      category: 'interior',
      type: 'image'
    },
    
    // Kitchen
    { 
      id: 14, 
      src: '/sand-lake-lodge/images/gallery/kitchen.jpg', 
      title: 'Fully Equipped Kitchen', 
      description: 'Everything you need to prepare delicious meals', 
      category: 'kitchen',
      type: 'image'
    },
    { 
      id: 15, 
      src: '/sand-lake-lodge/images/gallery/kitchen2.jpg', 
      title: 'Kitchen with Views', 
      description: 'Cook with beautiful lake views', 
      category: 'kitchen',
      type: 'image'
    },
    { 
      id: 16, 
      src: '/sand-lake-lodge/images/gallery/kitchenwine.jpg', 
      title: 'Kitchen Wine Area', 
      description: 'Perfect spot for wine storage and entertaining', 
      category: 'kitchen',
      type: 'image'
    },
    
    // Bedrooms
    { 
      id: 17, 
      src: '/sand-lake-lodge/images/gallery/master.jpg', 
      title: 'Master Bedroom', 
      description: 'Comfortable master bedroom with lake views', 
      category: 'bedrooms',
      type: 'image'
    },
    { 
      id: 18, 
      src: '/sand-lake-lodge/images/gallery/bedroom2.jpg', 
      title: 'Guest Bedroom', 
      description: 'Cozy guest bedroom perfect for visitors', 
      category: 'bedrooms',
      type: 'image'
    },
    { 
      id: 19, 
      src: '/sand-lake-lodge/images/gallery/bedroom3.jpg', 
      title: 'Additional Bedroom', 
      description: 'Spacious bedroom for family or friends', 
      category: 'bedrooms',
      type: 'image'
    },
    { 
      id: 20, 
      src: '/sand-lake-lodge/images/gallery/bunkbedroom.jpg', 
      title: 'Bunk Bed Room', 
      description: 'Perfect for kids with fun bunk bed setup', 
      category: 'bedrooms',
      type: 'image'
    },
    { 
      id: 21, 
      src: '/sand-lake-lodge/images/gallery/bunkbedroom2.jpg', 
      title: 'Bunk Room Details', 
      description: 'Cozy bunk room perfect for children', 
      category: 'bedrooms',
      type: 'image'
    },
    
    // Bathrooms
    { 
      id: 22, 
      src: '/sand-lake-lodge/images/gallery/bathroom.jpg', 
      title: 'Main Bathroom', 
      description: 'Clean and modern bathroom facilities', 
      category: 'bathrooms',
      type: 'image'
    },
    { 
      id: 23, 
      src: '/sand-lake-lodge/images/gallery/bathroom2.jpg', 
      title: 'Additional Bathroom', 
      description: 'Convenient bathroom for guests', 
      category: 'bathrooms',
      type: 'image'
    },
    { 
      id: 24, 
      src: '/sand-lake-lodge/images/gallery/bathroom3.jpg', 
      title: 'Bathroom Detail', 
      description: 'Well-appointed bathroom with all amenities', 
      category: 'bathrooms',
      type: 'image'
    },
    
    // Playroom
    { 
      id: 25, 
      src: '/sand-lake-lodge/images/gallery/playroom_1.jpg', 
      title: 'Family Playroom', 
      description: 'Dedicated space for kids to play, read, and have fun', 
      category: 'playroom',
      type: 'image'
    },
    { 
      id: 26, 
      src: '/sand-lake-lodge/images/gallery/playroom2.jpg', 
      title: 'Kids Entertainment Area', 
      description: 'Perfect room for children to enjoy their own space', 
      category: 'playroom',
      type: 'image'
    }
  ];

  const videos = [
    {
      id: 27,
      src: '/sand-lake-lodge/videos/patio_hottub.mp4',
      title: 'Patio & Hot Tub Tour',
      description: 'Relaxing outdoor spaces with hot tub and patio areas',
      category: 'exterior',
      type: 'video'
    },
    {
      id: 28,
      src: '/sand-lake-lodge/videos/top_floor.mp4',
      title: 'Upper Floor Tour',
      description: 'Complete walkthrough of the cottage\'s upper level',
      category: 'interior',
      type: 'video'
    },
    {
      id: 29,
      src: '/sand-lake-lodge/videos/bottom_floor.mp4',
      title: 'Main Floor Tour',
      description: 'Tour of the main living areas and ground floor',
      category: 'interior',
      type: 'video'
    },
    {
      id: 30,
      src: '/sand-lake-lodge/videos/kitchen_living.mp4',
      title: 'Kitchen & Living Area',
      description: 'Detailed look at the kitchen and living spaces',
      category: 'kitchen',
      type: 'video'
    },
    {
      id: 31,
      src: '/sand-lake-lodge/videos/backyard.mp4',
      title: 'Backyard Tour',
      description: 'Beautiful backyard with lake access and outdoor amenities',
      category: 'exterior',
      type: 'video'
    },
    {
      id: 32,
      src: '/sand-lake-lodge/videos/patio.mp4',
      title: 'Patio Overview',
      description: 'Comprehensive view of the outdoor patio and seating areas',
      category: 'exterior',
      type: 'video'
    }
  ];

  const currentMedia = activeTab === 'photos' ? images : videos;

  const openMedia = useCallback((media) => {
    setSelectedMedia(media);
  }, []);

  const closeMedia = useCallback(() => {
    setSelectedMedia(null);
  }, []);

  const nextMedia = useCallback(() => {
    const currentIndex = currentMedia.findIndex(item => item.id === selectedMedia.id);
    const nextIndex = (currentIndex + 1) % currentMedia.length;
    setSelectedMedia(currentMedia[nextIndex]);
  }, [currentMedia, selectedMedia]);

  const prevMedia = useCallback(() => {
    const currentIndex = currentMedia.findIndex(item => item.id === selectedMedia.id);
    const prevIndex = currentIndex === 0 ? currentMedia.length - 1 : currentIndex - 1;
    setSelectedMedia(currentMedia[prevIndex]);
  }, [currentMedia, selectedMedia]);

  // Swipe handlers
  const onTouchStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextMedia();
    }
    if (isRightSwipe) {
      prevMedia();
    }
  };

  // Keyboard navigation and body scroll prevention
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedMedia) return;
      
      if (e.key === 'ArrowLeft') {
        prevMedia();
      } else if (e.key === 'ArrowRight') {
        nextMedia();
      } else if (e.key === 'Escape') {
        closeMedia();
      }
    };

    // Prevent body scroll when modal is open
    if (selectedMedia) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'auto';
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'auto';
    };
  }, [selectedMedia, nextMedia, prevMedia, closeMedia]);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="/sand-lake-lodge/images/hero/bonfire.jpg" 
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
                 <img src="/sand-lake-lodge/cabin_icon.png" alt="Sand Lake Lodge" className="w-6 h-6 md:w-8 md:h-8" />
               </div>
                             <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-3 text-white drop-shadow-2xl leading-tight">
                Gallery & Virtual Tours
              </h1>
                              <p className="text-lg sm:text-xl md:text-2xl mb-4 text-amber-100 font-light drop-shadow-lg max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-2">
                 Discover the beauty of Sand Lake Lodge through photos and video tours
               </p>
               <div className="w-16 md:w-20 h-0.5 md:h-1 bg-amber-400 mx-auto mb-4"></div>
             </div>
          </motion.div>
        </div>
      </section>



            {/* Tab Navigation */}
      <section className="py-8 bg-white border-b border-amber-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="flex space-x-1 bg-amber-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('photos')}
                className={`flex items-center gap-2 px-6 py-3 rounded-md font-semibold transition-all duration-300 ${
                  activeTab === 'photos'
                    ? 'bg-white text-amber-900 shadow-sm'
                    : 'text-amber-700 hover:text-amber-900'
                }`}
              >
                <FaImage />
                Photos ({images.length})
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                className={`flex items-center gap-2 px-6 py-3 rounded-md font-semibold transition-all duration-300 ${
                  activeTab === 'videos'
                    ? 'bg-white text-amber-900 shadow-sm'
                    : 'text-amber-700 hover:text-amber-900'
                }`}
              >
                <FaVideo />
                Videos ({videos.length})
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
          >
            {currentMedia.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => openMedia(item)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                  <div className="aspect-[4/3] relative">
                    {item.type === 'video' ? (
                      <>
                        <video 
                          src={item.src}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          muted
                          playsInline
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <div className="bg-white/80 rounded-full p-4 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
                            <FaPlay className="text-2xl" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <img 
                        src={item.src} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-sm md:text-lg font-serif font-bold mb-0.5 md:mb-1">{item.title}</h3>
                      <p className="text-xs md:text-sm text-amber-100 line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {currentMedia.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-amber-700 text-lg">No {activeTab} found.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Media Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <div 
            ref={modalRef}
            className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onTouchCancel={(e) => e.preventDefault()}
            style={{ touchAction: 'none' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl w-full max-h-[90vh]"
            >
              {/* Close button */}
              <button
                onClick={closeMedia}
                onTouchEnd={(e) => e.stopPropagation()}
                className="absolute top-4 right-4 text-white hover:text-amber-200 z-10 bg-black/50 rounded-full p-2 transition-colors duration-300"
                style={{ touchAction: 'manipulation' }}
              >
                <FaTimes size={24} />
              </button>

              {/* Navigation buttons */}
              <button
                onClick={prevMedia}
                onTouchEnd={(e) => e.stopPropagation()}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-amber-200 z-10 bg-black/50 rounded-full p-3 transition-colors duration-300"
                style={{ touchAction: 'manipulation' }}
              >
                <FaChevronLeft size={24} />
              </button>
              <button
                onClick={nextMedia}
                onTouchEnd={(e) => e.stopPropagation()}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-amber-200 z-10 bg-black/50 rounded-full p-3 transition-colors duration-300"
                style={{ touchAction: 'manipulation' }}
              >
                <FaChevronRight size={24} />
              </button>

              {/* Media content */}
              <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
                <div className="relative">
                  {selectedMedia.type === 'video' ? (
                    <video 
                      src={selectedMedia.src}
                      controls
                      autoPlay
                      className="w-full h-auto max-h-[70vh] object-contain"
                    />
                  ) : (
                    <img 
                      src={selectedMedia.src} 
                      alt={selectedMedia.title}
                      className="w-full h-auto max-h-[70vh] object-contain"
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 md:p-6">
                    <h3 className="text-lg md:text-2xl font-serif font-bold text-white mb-1 md:mb-2">{selectedMedia.title}</h3>
                    <p className="text-sm md:text-lg text-amber-100 line-clamp-2">{selectedMedia.description}</p>
                  </div>
                </div>
              </div>

              {/* Media counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
                {currentMedia.findIndex(item => item.id === selectedMedia.id) + 1} of {currentMedia.length}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery; 