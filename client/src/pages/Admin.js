import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaTrash, FaEye, FaLock, FaEnvelope, FaChevronLeft, FaChevronRight, FaUser, FaPhone, FaCheck, FaBan, FaEdit, FaCalendarAlt, FaInbox } from 'react-icons/fa';

const Admin = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDateModal, setShowDateModal] = useState(false);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [isSelectingCheckOut, setIsSelectingCheckOut] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [newBooking, setNewBooking] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '',
    checkIn: '',
    checkOut: '',
    status: 'confirmed'
  });
  const [activeTab, setActiveTab] = useState('calendar'); // 'calendar' or 'requests'
  const [editingBooking, setEditingBooking] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [notification, setNotification] = useState(null);

  const fetchBookings = useCallback(async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/bookings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      } else if (response.status === 401) {
        // Token expired or invalid
        handleLogout();
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, [fetchBookings]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
        fetchBookings();
      } else {
        setLoginError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Login failed. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setBookings([]);
    setLoginData({ email: '', password: '' });
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleStatusUpdate = async (bookingId, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      
      // Use PATCH for all status updates, including 'rejected'
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        
        // Immediately update local state and fetch fresh data
        if (status === 'rejected') {
          // For rejected bookings, remove from local state since they get deleted
          setBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingId));
        } else {
          // For other statuses, update the booking in local state
          setBookings(prevBookings => 
            prevBookings.map(booking => 
              booking.id === bookingId ? { ...booking, status: status, updatedAt: new Date().toISOString() } : booking
            )
          );
        }
        
        await fetchBookings();
        setShowDateModal(false);
        setShowEditModal(false);
        setEditingBooking(null);
        
        // Show success notification
        if (status === 'rejected') {
          showNotification('Booking rejected and deleted successfully');
        } else if (status === 'approved') {
          showNotification('Booking approved successfully');
        } else if (status === 'cancelled') {
          showNotification('Booking cancelled successfully');
        } else {
          showNotification(`Booking status updated to ${status}`);
        }
      } else if (response.status === 401) {
        handleLogout();
      } else {
        const errorData = await response.json();
        console.error('Error data:', errorData);
      }
    } catch (error) {
      console.error('Error updating booking:', error);
      showNotification('Failed to update booking status', 'error');
    }
  };

  const handleEditBooking = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/bookings/${editingBooking.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editingBooking),
      });

      if (response.ok) {
        // Immediately update local state and fetch fresh data
        const updatedBooking = await response.json();
        setBookings(prevBookings => 
          prevBookings.map(booking => 
            booking.id === editingBooking.id ? updatedBooking : booking
          )
        );
        await fetchBookings();
        setShowEditModal(false);
        setEditingBooking(null);
        showNotification('Booking updated successfully');
      } else if (response.status === 401) {
        handleLogout();
      }
    } catch (error) {
      console.error('Error updating booking:', error);
      showNotification('Failed to edit booking', 'error');
    }
  };

  const openEditModal = (booking) => {
    setEditingBooking({ ...booking });
    setShowEditModal(true);
  };

  const handleDeleteBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`/api/bookings/${bookingId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          // Immediately update local state and fetch fresh data
          setBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingId));
          await fetchBookings();
          showNotification('Booking deleted successfully');
          setShowDateModal(false);
        } else if (response.status === 401) {
          handleLogout();
        }
      } catch (error) {
        console.error('Error deleting booking:', error);
        showNotification('Failed to delete booking', 'error');
      }
    }
  };

  const handleAddBooking = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newBooking),
      });

      if (response.ok) {
        const addedBooking = await response.json();
        // Immediately update local state and fetch fresh data
        setBookings(prevBookings => [...prevBookings, addedBooking]);
        await fetchBookings();
        setNewBooking({
          name: '',
          email: '',
          phone: '',
          guests: '',
          checkIn: '',
          checkOut: '',
          status: 'confirmed'
        });
        // Reset date selection
        setCheckInDate(null);
        setCheckOutDate(null);
        setIsSelectingCheckOut(false);
        setShowDateModal(false);
      } else if (response.status === 401) {
        handleLogout();
      }
    } catch (error) {
      console.error('Error adding booking:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPendingBookings = () => {
    return bookings.filter(booking => booking.status === 'pending');
  };

  const getApprovedBookings = () => {
    return bookings.filter(booking => booking.status === 'approved');
  };



  const getCancelledBookings = () => {
    return bookings.filter(booking => booking.status === 'cancelled');
  };



  // Calendar functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay };
  };

  const isDateBooked = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return bookings.some(booking => {
      const checkIn = new Date(booking.checkIn);
      const checkOut = booking.checkOut ? new Date(booking.checkOut) : checkIn;
      const selectedDate = new Date(dateStr);
      
      return selectedDate >= checkIn && selectedDate <= checkOut && booking.status === 'approved';
    });
  };

  const getBookingForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return bookings.find(booking => {
      const checkIn = new Date(booking.checkIn);
      const checkOut = booking.checkOut ? new Date(booking.checkOut) : checkIn;
      const selectedDate = new Date(dateStr);
      
      return selectedDate >= checkIn && selectedDate <= checkOut && booking.status === 'approved';
    });
  };

  const handleDateClick = (date) => {
    // Check if date is already booked
    const booking = getBookingForDate(date);
    if (booking) {
      setSelectedBooking(booking);
      setSelectedDate(date);
      setShowDateModal(true);
      return;
    }

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
          setNewBooking({
            ...newBooking,
            checkIn: checkInDate.toISOString().split('T')[0],
            checkOut: date.toISOString().split('T')[0]
          });
          setShowDateModal(true);
        }
      }
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getMonth() === 11 ? currentDate.getFullYear() + 1 : currentDate.getFullYear(), currentDate.getMonth() === 11 ? 0 : currentDate.getMonth() + 1, 1));
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDay } = getDaysInMonth(currentDate);
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 sm:h-12"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isBooked = isDateBooked(date);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelectedCheckIn = checkInDate && date.toDateString() === checkInDate.toDateString();
      const isSelectedCheckOut = checkOutDate && date.toDateString() === checkOutDate.toDateString();
      const isInRange = checkInDate && checkOutDate && 
        date > checkInDate && date < checkOutDate;
      
      let className = 'h-10 sm:h-12 flex items-center justify-center cursor-pointer rounded-lg transition-all duration-200 text-sm sm:text-base';
      
      if (isToday) {
        className += ' bg-amber-600 text-white';
      } else if (isBooked) {
        className += ' bg-red-100 hover:bg-red-200 text-red-800';
      } else if (isSelectedCheckIn) {
        className += ' bg-blue-600 text-white';
      } else if (isSelectedCheckOut) {
        className += ' bg-blue-600 text-white';
      } else if (isInRange) {
        className += ' bg-blue-200 text-blue-800';
      } else {
        className += ' bg-green-100 hover:bg-green-200 text-green-800';
      }
      
      days.push(
        <motion.div
          key={day}
          whileHover={{ scale: 1.05 }}
          className={className}
          onClick={() => handleDateClick(date)}
        >
          {day}
        </motion.div>
      );
    }
    
    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="pt-16 min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-lg shadow-xl p-8"
          >
            <div className="text-center mb-8">
              <div className="inline-block p-3 bg-amber-50 rounded-full mb-4">
                <img src="/sand-lake-shores/cabin_icon.png" alt="Sand Lake Shores" className="w-8 h-8" />
              </div>
              <h1 className="text-2xl font-serif font-bold text-amber-900 mb-2">
                Admin Login
              </h1>
              <p className="text-amber-700">
                Enter your credentials to access the booking management system
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {loginError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {loginError}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-amber-800 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-amber-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="admin@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-amber-800 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-amber-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-amber-700 transition-colors duration-300"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-amber-600">
                Secure access to Sand Lake Shores booking management
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-amber-700">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="/sand-lake-shores/images/hero/kitchen.jpg" 
            alt="Sand Lake Shores Admin" 
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
                <img src="/sand-lake-shores/cabin_icon.png" alt="Sand Lake Shores" className="w-8 h-8" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-3 text-white drop-shadow-2xl leading-tight">
                Booking Management
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-4 text-amber-100 font-light drop-shadow-lg max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-2">
                Manage confirmed bookings and calendar availability
              </p>
              <div className="w-16 md:w-20 h-0.5 md:h-1 bg-amber-400 mx-auto mb-4"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 bg-white border-b border-amber-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-900">
              Admin Dashboard
            </h2>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
            >
              Logout
            </button>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-amber-100 p-1 rounded-lg max-w-md mx-auto">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md font-semibold transition-all duration-300 ${
                activeTab === 'calendar'
                  ? 'bg-white text-amber-900 shadow-sm'
                  : 'text-amber-700 hover:text-amber-900'
              }`}
            >
              <FaCalendarAlt className="mr-2" />
              Calendar
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md font-semibold transition-all duration-300 ${
                activeTab === 'requests'
                  ? 'bg-white text-amber-900 shadow-sm'
                  : 'text-amber-700 hover:text-amber-900'
              }`}
            >
              <FaInbox className="mr-2" />
              Requests
              {getPendingBookings().length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  {getPendingBookings().length}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50">
          <div className={`px-6 py-4 rounded-lg shadow-lg text-white font-semibold ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {notification.message}
          </div>
        </div>
      )}

      {/* Calendar Section */}
      {activeTab === 'calendar' && (
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
                Calendar Management
              </h2>
              <p className="text-lg text-amber-700 max-w-2xl mx-auto">
                Click on any date to view or manage bookings. Select check-in and check-out dates for multi-night stays.
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
                   <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-100 rounded mr-1 sm:mr-2"></div>
                   <span className="text-green-800">Available</span>
                 </div>
                 <div className="flex items-center">
                   <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-100 rounded mr-1 sm:mr-2"></div>
                   <span className="text-red-800">Booked</span>
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
      )}

      {/* Requests Center */}
      {activeTab === 'requests' && (
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
                Booking Requests Center
              </h2>
              <p className="text-lg text-amber-700 max-w-2xl mx-auto">
                Manage incoming booking requests. Approve, reject, or modify requests as needed.
              </p>
            </motion.div>

            {/* Statistics Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-yellow-500"
              >
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <FaInbox className="text-yellow-600 text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">{getPendingBookings().length}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500"
              >
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FaCheck className="text-green-600 text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Approved</p>
                    <p className="text-2xl font-bold text-gray-900">{getApprovedBookings().length}</p>
                  </div>
                </div>
              </motion.div>



              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-gray-500"
              >
                <div className="flex items-center">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <FaTimes className="text-gray-600 text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Cancelled</p>
                    <p className="text-2xl font-bold text-gray-900">{getCancelledBookings().length}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Requests List */}
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-xl overflow-hidden"
              >
                {/* Pending Requests */}
                {getPendingBookings().length > 0 && (
                  <div className="border-b border-gray-200">
                    <div className="px-6 py-4 bg-yellow-50 border-b border-yellow-200">
                      <h3 className="text-lg font-semibold text-yellow-900 flex items-center">
                        <FaInbox className="mr-2" />
                        Pending Requests ({getPendingBookings().length})
                      </h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {getPendingBookings().map((booking) => (
                        <div key={booking.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                <h4 className="text-lg font-semibold text-gray-900">{booking.name}</h4>
                                <span className="ml-2 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                                  Pending
                                </span>
                              </div>
                              <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <div>
                                  <p className="text-sm text-gray-600 mb-1">
                                    <FaEnvelope className="inline mr-1" />
                                    {booking.email}
                                  </p>
                                  {booking.phone && (
                                    <p className="text-sm text-gray-600 mb-1">
                                      <FaPhone className="inline mr-1" />
                                      {booking.phone}
                                    </p>
                                  )}
                                  <p className="text-sm text-gray-600">
                                    <FaUser className="inline mr-1" />
                                    {booking.guests} guest{booking.guests > 1 ? 's' : ''}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600 mb-1">
                                    <strong>Check-in:</strong> {formatDate(booking.checkIn)}
                                  </p>
                                  {booking.checkOut && (
                                    <p className="text-sm text-gray-600 mb-1">
                                      <strong>Check-out:</strong> {formatDate(booking.checkOut)}
                                    </p>
                                  )}
                                  <p className="text-sm text-gray-600">
                                    <strong>Requested:</strong> {formatDateTime(booking.createdAt)}
                                  </p>
                                </div>
                              </div>
                              {booking.message && (
                                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                  <p className="text-sm text-gray-700">{booking.message}</p>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col gap-2 ml-4">
                              <button
                                onClick={() => handleStatusUpdate(booking.id, 'approved')}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center"
                              >
                                <FaCheck className="mr-1" />
                                Approve
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(booking.id, 'rejected')}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center"
                                title="Reject and delete this booking request"
                              >
                                <FaBan className="mr-1" />
                                Reject & Delete
                              </button>
                              <button
                                onClick={() => openEditModal(booking)}
                                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-200 flex items-center"
                              >
                                <FaEdit className="mr-1" />
                                Modify
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Other Status Requests */}
                {getApprovedBookings().length > 0 && (
                  <div className="border-b border-gray-200">
                    <div className="px-6 py-4 bg-green-50 border-b border-green-200">
                      <h3 className="text-lg font-semibold text-green-900 flex items-center">
                        <FaCheck className="mr-2" />
                        Approved Bookings ({getApprovedBookings().length})
                      </h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {getApprovedBookings().map((booking) => (
                        <div key={booking.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                <h4 className="text-lg font-semibold text-gray-900">{booking.name}</h4>
                                <span className="ml-2 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                  Approved
                                </span>
                              </div>
                              <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <div>
                                  <p className="text-sm text-gray-600 mb-1">
                                    <FaEnvelope className="inline mr-1" />
                                    {booking.email}
                                  </p>
                                  {booking.phone && (
                                    <p className="text-sm text-gray-600 mb-1">
                                      <FaPhone className="inline mr-1" />
                                      {booking.phone}
                                    </p>
                                  )}
                                  <p className="text-sm text-gray-600">
                                    <FaUser className="inline mr-1" />
                                    {booking.guests} guest{booking.guests > 1 ? 's' : ''}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600 mb-1">
                                    <strong>Check-in:</strong> {formatDate(booking.checkIn)}
                                  </p>
                                  {booking.checkOut && (
                                    <p className="text-sm text-gray-600 mb-1">
                                      <strong>Check-out:</strong> {formatDate(booking.checkOut)}
                                    </p>
                                  )}
                                  <p className="text-sm text-gray-600">
                                    <strong>Approved:</strong> {formatDateTime(booking.updatedAt || booking.createdAt)}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2 ml-4">
                              <button
                                onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center"
                              >
                                <FaTimes className="mr-1" />
                                Cancel
                              </button>
                              <button
                                onClick={() => openEditModal(booking)}
                                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-200 flex items-center"
                              >
                                <FaEdit className="mr-1" />
                                Modify
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cancelled Requests */}
                {getCancelledBookings().length > 0 && (
                  <div>
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Cancelled Requests ({getCancelledBookings().length})
                      </h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {getCancelledBookings().map((booking) => (
                        <div key={booking.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                <h4 className="text-lg font-semibold text-gray-900">{booking.name}</h4>
                                <span className="ml-2 px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                                  Cancelled
                                </span>
                              </div>
                              <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <div>
                                  <p className="text-sm text-gray-600 mb-1">
                                    <FaEnvelope className="inline mr-1" />
                                    {booking.email}
                                  </p>
                                  {booking.phone && (
                                    <p className="text-sm text-gray-600 mb-1">
                                      <FaPhone className="inline mr-1" />
                                      {booking.phone}
                                    </p>
                                  )}
                                  <p className="text-sm text-gray-600">
                                    <FaUser className="inline mr-1" />
                                    {booking.guests} guest{booking.guests > 1 ? 's' : ''}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600 mb-1">
                                    <strong>Check-in:</strong> {formatDate(booking.checkIn)}
                                  </p>
                                  {booking.checkOut && (
                                    <p className="text-sm text-gray-600 mb-1">
                                      <strong>Check-out:</strong> {formatDate(booking.checkOut)}
                                    </p>
                                  )}
                                  <p className="text-sm text-gray-600">
                                    <strong>Status Updated:</strong> {formatDateTime(booking.updatedAt || booking.createdAt)}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2 ml-4">
                              <button
                                onClick={() => handleDeleteBooking(booking.id)}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center"
                              >
                                <FaTrash className="mr-1" />
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Empty State */}
                {bookings.length === 0 && (
                  <div className="p-12 text-center">
                    <FaInbox className="mx-auto text-4xl text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No booking requests</h3>
                    <p className="text-gray-500">When guests submit booking requests, they will appear here.</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Date Management Modal */}
      <AnimatePresence>
        {showDateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif font-bold text-amber-900">
                    {checkInDate && checkOutDate 
                      ? `${formatDate(checkInDate)} - ${formatDate(checkOutDate)}`
                      : selectedDate && formatDate(selectedDate)
                    }
                  </h2>
                                     <button
                     onClick={() => {
                       setShowDateModal(false);
                       // Reset date selection when closing modal
                       setCheckInDate(null);
                       setCheckOutDate(null);
                       setIsSelectingCheckOut(false);
                     }}
                     className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                   >
                     <FaTimes size={24} />
                   </button>
                </div>

                {selectedBooking ? (
                  // Show booking details and management options
                  <div className="space-y-4">
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-amber-900 mb-2">Current Booking</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <FaUser className="text-amber-600 mr-2" />
                          <span className="text-amber-800">{selectedBooking.name}</span>
                        </div>
                        <div className="flex items-center">
                          <FaEnvelope className="text-amber-600 mr-2" />
                          <span className="text-amber-800">{selectedBooking.email}</span>
                        </div>
                        {selectedBooking.phone && (
                          <div className="flex items-center">
                            <FaPhone className="text-amber-600 mr-2" />
                            <span className="text-amber-800">{selectedBooking.phone}</span>
                          </div>
                        )}
                        <div className="text-amber-800">
                          <strong>Guests:</strong> {selectedBooking.guests}
                        </div>
                        <div className="text-amber-800">
                          <strong>Check-in:</strong> {formatDate(selectedBooking.checkIn)}
                        </div>
                        {selectedBooking.checkOut && (
                          <div className="text-amber-800">
                            <strong>Check-out:</strong> {formatDate(selectedBooking.checkOut)}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => {
                          setShowModal(true);
                          setShowDateModal(false);
                        }}
                        className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-amber-700 transition-colors duration-300 flex items-center justify-center gap-2"
                      >
                        <FaEye />
                        View Full Details
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(selectedBooking.id, 'cancelled')}
                        className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300 flex items-center justify-center gap-2"
                      >
                        <FaTimes />
                        Cancel Booking
                      </button>
                      <button
                        onClick={() => handleDeleteBooking(selectedBooking.id)}
                        className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-300 flex items-center justify-center gap-2"
                      >
                        <FaTrash />
                        Delete Booking
                      </button>
                    </div>
                  </div>
                ) : (
                  // Show add booking form
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-green-900 mb-2">
                        {checkInDate && checkOutDate ? 'Date Range Selected' : 'Available Date'}
                      </h3>
                      <p className="text-green-800">
                        {checkInDate && checkOutDate 
                          ? `Selected ${formatDate(checkInDate)} to ${formatDate(checkOutDate)}. Add a new booking below.`
                          : 'This date is available. Add a new booking below.'
                        }
                      </p>
                    </div>

                    <form onSubmit={handleAddBooking} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-amber-800 mb-2">
                          Guest Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={newBooking.name}
                          onChange={(e) => setNewBooking({...newBooking, name: e.target.value})}
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
                          value={newBooking.email}
                          onChange={(e) => setNewBooking({...newBooking, email: e.target.value})}
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
                          value={newBooking.phone}
                          onChange={(e) => setNewBooking({...newBooking, phone: e.target.value})}
                          className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="guests" className="block text-sm font-medium text-amber-800 mb-2">
                          Number of Guests *
                        </label>
                        <select
                          id="guests"
                          value={newBooking.guests}
                          onChange={(e) => setNewBooking({...newBooking, guests: e.target.value})}
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

                      <div>
                        <label htmlFor="checkIn" className="block text-sm font-medium text-amber-800 mb-2">
                          Check In Date *
                        </label>
                        <input
                          type="date"
                          id="checkIn"
                          value={checkInDate ? checkInDate.toISOString().split('T')[0] : ''}
                          onChange={(e) => setNewBooking({...newBooking, checkIn: e.target.value})}
                          required
                          className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="checkOut" className="block text-sm font-medium text-amber-800 mb-2">
                          Check Out Date
                        </label>
                        <input
                          type="date"
                          id="checkOut"
                          value={checkOutDate ? checkOutDate.toISOString().split('T')[0] : ''}
                          onChange={(e) => setNewBooking({...newBooking, checkOut: e.target.value})}
                          className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300"
                      >
                        Add Confirmed Booking
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Booking Details Modal */}
      <AnimatePresence>
        {showModal && selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif font-bold text-amber-900">Booking Details</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <FaTimes size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-amber-800 mb-1">Name</label>
                    <p className="text-amber-900 font-semibold">{selectedBooking.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-amber-800 mb-1">Email</label>
                    <p className="text-amber-900">{selectedBooking.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-amber-800 mb-1">Phone</label>
                    <p className="text-amber-900">{selectedBooking.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-amber-800 mb-1">Check In</label>
                    <p className="text-amber-900">{formatDate(selectedBooking.checkIn)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-amber-800 mb-1">Check Out</label>
                    <p className="text-amber-900">{selectedBooking.checkOut ? formatDate(selectedBooking.checkOut) : 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-amber-800 mb-1">Guests</label>
                    <p className="text-amber-900">{selectedBooking.guests}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-amber-800 mb-1">Status</label>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(selectedBooking.status)}`}>
                      {selectedBooking.status}
                    </span>
                  </div>
                  {selectedBooking.message && (
                    <div>
                      <label className="block text-sm font-medium text-amber-800 mb-1">Message</label>
                      <p className="text-amber-900 text-sm">{selectedBooking.message}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Booking Modal */}
      <AnimatePresence>
        {showEditModal && editingBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif font-bold text-amber-900">Edit Booking</h2>
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingBooking(null);
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <FaTimes size={24} />
                  </button>
                </div>

                <form onSubmit={handleEditBooking} className="space-y-4">
                  <div>
                    <label htmlFor="editName" className="block text-sm font-medium text-amber-800 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="editName"
                      value={editingBooking.name}
                      onChange={(e) => setEditingBooking({...editingBooking, name: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="editEmail" className="block text-sm font-medium text-amber-800 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="editEmail"
                      value={editingBooking.email}
                      onChange={(e) => setEditingBooking({...editingBooking, email: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="editPhone" className="block text-sm font-medium text-amber-800 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="editPhone"
                      value={editingBooking.phone || ''}
                      onChange={(e) => setEditingBooking({...editingBooking, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="editGuests" className="block text-sm font-medium text-amber-800 mb-2">
                      Number of Guests *
                    </label>
                    <select
                      id="editGuests"
                      value={editingBooking.guests}
                      onChange={(e) => setEditingBooking({...editingBooking, guests: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    >
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

                  <div>
                    <label htmlFor="editCheckIn" className="block text-sm font-medium text-amber-800 mb-2">
                      Check In Date *
                    </label>
                    <input
                      type="date"
                      id="editCheckIn"
                      value={editingBooking.checkIn}
                      onChange={(e) => setEditingBooking({...editingBooking, checkIn: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="editCheckOut" className="block text-sm font-medium text-amber-800 mb-2">
                      Check Out Date
                    </label>
                    <input
                      type="date"
                      id="editCheckOut"
                      value={editingBooking.checkOut || ''}
                      onChange={(e) => setEditingBooking({...editingBooking, checkOut: e.target.value})}
                      className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="editMessage" className="block text-sm font-medium text-amber-800 mb-2">
                      Additional Message
                    </label>
                    <textarea
                      id="editMessage"
                      value={editingBooking.message || ''}
                      onChange={(e) => setEditingBooking({...editingBooking, message: e.target.value})}
                      rows="4"
                      className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Any additional notes or special requests..."
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-amber-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-amber-700 transition-colors duration-300"
                    >
                      Update Booking
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowEditModal(false);
                        setEditingBooking(null);
                      }}
                      className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin; 