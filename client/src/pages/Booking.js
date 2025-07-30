import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendar, FaTimes, FaUsers, FaCheck, FaChevronLeft, FaChevronRight, FaDog, FaSmokingBan, FaBroom } from 'react-icons/fa';

const Booking = () => {
  // Helper function to format dates
  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [isSelectingCheckOut, setIsSelectingCheckOut] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [existingBookingWarning, setExistingBookingWarning] = useState(null);

  // September 1st cutoff date
  const cutoffDate = new Date('2024-09-01');
  
  // Generate calendar data
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay };
  };

  const isDateAvailable = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    
    // Date must be after today and after September 1st
    return date > today && date > cutoffDate;
  };



  const handleDateClick = (date) => {
    if (!isDateAvailable(date)) return;

    // If not selecting check-out yet, set check-in date
    if (!isSelectingCheckOut) {
      setCheckInDate(date);
      setIsSelectingCheckOut(true);
      setSelectedDate(date);
    } else {
      // Selecting check-out date
      if (date <= checkInDate) {
        // If check-out date is before or same as check-in, reset to check-in selection
        setCheckInDate(date);
        setCheckOutDate(null);
        setIsSelectingCheckOut(true);
        setSelectedDate(date);
      } else {
        // Valid check-out date selected
        setCheckOutDate(date);
        setIsSelectingCheckOut(false);
        setSelectedDate(date);
        
        // Calculate number of nights
        const nights = Math.ceil((date - checkInDate) / (1000 * 60 * 60 * 24));
        
        if (nights > 1) {
          // Auto-fill the booking form and show modal
          setFormData({
            ...formData,
            checkIn: checkInDate.toISOString().split('T')[0],
            checkOut: date.toISOString().split('T')[0]
          });
          setShowModal(true);
        }
      }
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Check for existing bookings when email changes
    if (e.target.name === 'email' && e.target.value) {
      checkExistingBookings(e.target.value);
    }
  };

  const checkExistingBookings = async (email) => {
    // TEMPORARILY DISABLED FOR GITHUB PAGES DEMO
    // For demo purposes, we'll just clear any existing warnings
    setExistingBookingWarning(null);
    
    /* ORIGINAL CODE - DISABLED FOR DEMO
    try {
      const response = await fetch('/api/bookings');
      if (response.ok) {
        const bookings = await response.json();
        const existingBookings = bookings.filter(booking => 
          booking.email.toLowerCase() === email.toLowerCase() && 
          (booking.status === 'pending' || booking.status === 'approved')
        );
        
        if (existingBookings.length > 0) {
          const booking = existingBookings[0];
          setExistingBookingWarning({
            message: `You already have a ${booking.status} booking request for ${booking.checkIn} to ${booking.checkOut}. Submitting a new request will automatically cancel your previous booking.`,
            existingBooking: booking
          });
        } else {
          setExistingBookingWarning(null);
        }
      }
    } catch (error) {
      // Silently handle error to avoid exposing internal details
      setExistingBookingWarning(null);
    }
    */
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // TEMPORARILY DISABLED FOR GITHUB PAGES DEMO
    // Simulate successful submission for demo purposes
    setTimeout(() => {
      setSubmitStatus('success');
      setTimeout(() => {
        setShowModal(false);
        setSubmitStatus(null);
        setExistingBookingWarning(null);
        // Reset form data and date selection after modal closes
        setFormData({
          name: '',
          email: '',
          phone: '',
          guests: '',
          message: ''
        });
        setCheckInDate(null);
        setCheckOutDate(null);
        setIsSelectingCheckOut(false);
      }, 3000);
    }, 1000);

    /* ORIGINAL CODE - DISABLED FOR DEMO
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          checkIn: checkInDate ? checkInDate.toISOString().split('T')[0] : selectedDate.toISOString().split('T')[0],
          checkOut: checkOutDate ? checkOutDate.toISOString().split('T')[0] : null,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Don't clear form data immediately - let the success state handle it
        setTimeout(() => {
          setShowModal(false);
          setSubmitStatus(null);
          setExistingBookingWarning(null);
          // Reset form data and date selection after modal closes
          setFormData({
            name: '',
            email: '',
            phone: '',
            guests: '',
            message: ''
          });
          setCheckInDate(null);
          setCheckOutDate(null);
          setIsSelectingCheckOut(false);
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
    */
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDate(null);
    setCheckInDate(null);
    setCheckOutDate(null);
    setIsSelectingCheckOut(false);
    setSubmitStatus(null);
    setExistingBookingWarning(null);
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const renderCalendar = () => {
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 sm:h-12"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const available = isDateAvailable(date);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelectedCheckIn = checkInDate && date.toDateString() === checkInDate.toDateString();
      const isSelectedCheckOut = checkOutDate && date.toDateString() === checkOutDate.toDateString();
      const isInRange = checkInDate && checkOutDate && 
        date > checkInDate && date < checkOutDate;
      
      let className = 'h-10 sm:h-12 flex items-center justify-center cursor-pointer rounded-lg transition-all duration-200 text-sm sm:text-base';
      
      if (isToday) {
        className += ' bg-amber-600 text-white';
      } else if (!available) {
        className += ' bg-gray-100 text-gray-400 cursor-not-allowed';
      } else if (isSelectedCheckIn) {
        className += ' bg-blue-600 text-white';
      } else if (isSelectedCheckOut) {
        className += ' bg-blue-600 text-white';
      } else if (isInRange) {
        className += ' bg-blue-200 text-blue-800';
      } else {
        className += ' bg-amber-100 hover:bg-amber-200 text-amber-800';
      }
      
      days.push(
        <motion.div
          key={day}
          whileHover={available ? { scale: 1.05 } : {}}
          className={className}
          onClick={() => handleDateClick(date)}
        >
          {day}
        </motion.div>
      );
    }
    
    return days;
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
                            src="images/gallery/master.jpg" 
            alt="Master bedroom at Sand Lake Lodge" 
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
                Book Your Stay
              </h1>
                             <p className="text-lg sm:text-xl md:text-2xl mb-4 text-amber-100 font-light drop-shadow-lg max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-2">
                 Request your perfect lakeside getaway
               </p>
              <div className="w-16 md:w-20 h-0.5 md:h-1 bg-amber-400 mx-auto mb-4"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Calendar Section */}
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
              Available Dates
            </h2>
                         <p className="text-lg text-amber-700 max-w-2xl mx-auto">
               Select check-in and check-out dates for your lakeside retreat.
             </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-xl p-3 sm:p-6 md:p-8"
            >
                             {/* Calendar Header */}
               <div className="flex items-center justify-between mb-4 sm:mb-6">
                 <button
                   onClick={handlePrevMonth}
                   className="p-1 sm:p-2 hover:bg-amber-100 rounded-lg transition-colors duration-200"
                 >
                   <FaChevronLeft className="text-amber-600 text-lg sm:text-xl" />
                 </button>
                 <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif font-bold text-amber-900">
                   {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                 </h3>
                 <button
                   onClick={handleNextMonth}
                   className="p-1 sm:p-2 hover:bg-amber-100 rounded-lg transition-colors duration-200"
                 >
                   <FaChevronRight className="text-amber-600 text-lg sm:text-xl" />
                 </button>
               </div>

                             {/* Calendar Grid */}
               <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4 sm:mb-6">
                 {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                   <div key={day} className="h-10 sm:h-12 flex items-center justify-center font-semibold text-amber-700 text-xs sm:text-sm">
                     {day}
                   </div>
                 ))}
                 {renderCalendar()}
               </div>

                             {/* Legend */}
               <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-6 text-xs sm:text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-amber-100 rounded mr-1 sm:mr-2"></div>
                  <span className="text-amber-800">Available</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-100 rounded mr-1 sm:mr-2"></div>
                  <span className="text-gray-600">Unavailable</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-600 rounded mr-1 sm:mr-2"></div>
                  <span className="text-blue-800">Selected</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-200 rounded mr-1 sm:mr-2"></div>
                  <span className="text-blue-800">Range</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-amber-600 rounded mr-1 sm:mr-2"></div>
                  <span className="text-amber-800">Today</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking Information */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-amber-50 p-6 rounded-lg">
                <FaCalendar className="text-4xl text-amber-600 mx-auto mb-4" />
                                 <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">Date Range Selection</h3>
                 <p className="text-amber-700">Select your check-in and check-out dates with our intuitive calendar system</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-amber-50 p-6 rounded-lg">
                <FaUsers className="text-4xl text-amber-600 mx-auto mb-4" />
                <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">Perfect for Groups</h3>
                <p className="text-amber-700">Accommodates up to 8 guests in our spacious lakeside lodge</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-amber-50 p-6 rounded-lg">
                <FaCheck className="text-4xl text-amber-600 mx-auto mb-4" />
                                 <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">Owner Response</h3>
                 <p className="text-amber-700">Owner will respond via email with payment details and confirmation</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* House Rules & Policies */}
      <section className="py-12 md:py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-900 mb-4">House Rules & Policies</h2>
            <p className="text-lg text-amber-700 max-w-2xl mx-auto">
              Please review our policies to ensure a pleasant stay for everyone
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-200"
            >
              <div className="flex items-center mb-4">
                <FaDog className="text-3xl text-amber-600 mr-3" />
                <h3 className="text-xl font-serif font-bold text-amber-900">Pet Friendly</h3>
              </div>
              <p className="text-amber-700 text-sm leading-relaxed">
                Well-behaved pets are welcome with prior approval. Additional cleaning fee may apply.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-200"
            >
              <div className="flex items-center mb-4">
                <FaSmokingBan className="text-3xl text-amber-600 mr-3" />
                <h3 className="text-xl font-serif font-bold text-amber-900">No Smoking</h3>
              </div>
              <p className="text-amber-700 text-sm leading-relaxed">
                Smoking is not allowed inside the cabin. Please use designated outdoor areas.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-200"
            >
              <div className="flex items-center mb-4">
                <FaBroom className="text-3xl text-amber-600 mr-3" />
                <h3 className="text-xl font-serif font-bold text-amber-900">Check-out</h3>
              </div>
              <p className="text-amber-700 text-sm leading-relaxed">
                Please leave the cabin clean and tidy. Check-out by 11 AM unless otherwise arranged.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-amber-900">
                      Request Your Stay
                    </h2>
                    {checkInDate && checkOutDate && (
                      <p className="text-amber-700 text-sm mt-1">
                        {formatDate(checkInDate)} - {formatDate(checkOutDate)}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <FaTimes size={24} />
                  </button>
                </div>

                {checkInDate && checkOutDate && (
                  <div className="mb-6 p-4 bg-amber-50 rounded-lg">
                    <p className="text-amber-800 font-semibold mb-2">
                      Selected Date Range:
                    </p>
                    <div className="space-y-1">
                      <p className="text-amber-700">
                        <span className="font-medium">Check-in:</span> {checkInDate.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                      <p className="text-amber-700">
                        <span className="font-medium">Check-out:</span> {checkOutDate.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                )}

                {submitStatus === 'success' ? (
                  <div className="text-center py-8">
                    <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-8 rounded-lg mb-6">
                      <div className="flex flex-col items-center">
                        <FaCheck className="text-4xl mb-4 text-green-600" />
                        <h3 className="text-xl font-serif font-bold text-green-800 mb-2">
                          Booking Request Confirmed!
                        </h3>
                        <p className="text-green-700 text-center">
                          Your booking request has been submitted successfully! The owner will contact you via email with payment details and confirmation.
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-amber-700">
                      <p>This modal will close automatically in a few seconds.</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {submitStatus === 'error' && (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                        There was an error submitting your booking. Please try again.
                      </div>
                    )}

                    {existingBookingWarning && (
                      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800">
                              Existing Booking Found
                            </h3>
                            <div className="mt-2 text-sm text-yellow-700">
                              <p>{existingBookingWarning.message}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-amber-800 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-amber-800 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-amber-800 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-amber-800 mb-2">
                      Number of Guests *
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    >
                      <option value="">Select guests</option>
                      <option value="1">1 guest</option>
                      <option value="2">2 guests</option>
                      <option value="3">3 guests</option>
                      <option value="4">4 guests</option>
                      <option value="5">5 guests</option>
                      <option value="6">6 guests</option>
                      <option value="7">7 guests</option>
                      <option value="8">8 guests</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="checkIn" className="block text-sm font-medium text-amber-800 mb-2">
                        Check-in Date
                      </label>
                      <input
                        type="text"
                        id="checkIn"
                        name="checkIn"
                        value={formData.checkIn || ''}
                        readOnly
                        className="w-full px-4 py-3 border border-amber-300 rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label htmlFor="checkOut" className="block text-sm font-medium text-amber-800 mb-2">
                        Check-out Date
                      </label>
                      <input
                        type="text"
                        id="checkOut"
                        name="checkOut"
                        value={formData.checkOut || ''}
                        readOnly
                        className="w-full px-4 py-3 border border-amber-300 rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-amber-800 mb-2">
                      Additional Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Tell us about your plans, special requests, or any questions..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-amber-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
                  </button>
                  
                  <div className="text-center text-sm text-amber-700 mt-4">
                    <p>This is a booking request only. No payment will be processed on this site.</p>
                    <p>The owner will contact you via email with payment details and confirmation.</p>
                  </div>
                </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Booking; 