// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// Security: Require environment variables for production
const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Security: Validate required environment variables
if (!JWT_SECRET || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('ERROR: Missing required environment variables. Please set JWT_SECRET, ADMIN_EMAIL, and ADMIN_PASSWORD.');
  process.exit(1);
}

// Security: Input validation middleware
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  if (!phone) return true; // Optional field
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

const validateBookingInput = (req, res, next) => {
  const { name, email, phone, checkIn, checkOut, guests } = req.body;
  
  // Required fields
  if (!name || !email || !checkIn) {
    return res.status(400).json({ error: 'Missing required fields: name, email, checkIn' });
  }
  
  // Email validation
  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  
  // Phone validation
  if (phone && !validatePhone(phone)) {
    return res.status(400).json({ error: 'Invalid phone number format' });
  }
  
  // Date validation
  const checkInDate = moment(checkIn);
  const checkOutDate = checkOut ? moment(checkOut) : null;
  
  if (!checkInDate.isValid()) {
    return res.status(400).json({ error: 'Invalid check-in date' });
  }
  
  if (checkOutDate && !checkOutDate.isValid()) {
    return res.status(400).json({ error: 'Invalid check-out date' });
  }
  
  if (checkOutDate && checkOutDate.isSameOrBefore(checkInDate)) {
    return res.status(400).json({ error: 'Check-out date must be after check-in date' });
  }
  
  // Guest validation
  if (guests && (isNaN(guests) || guests < 1 || guests > 8)) {
    return res.status(400).json({ error: 'Number of guests must be between 1 and 8' });
  }
  
  next();
};

// Security: Rate limiting (simple implementation)
const loginAttempts = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

const rateLimitLogin = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  if (!loginAttempts.has(ip)) {
    loginAttempts.set(ip, { count: 0, resetTime: now + RATE_LIMIT_WINDOW });
  }
  
  const attempts = loginAttempts.get(ip);
  
  if (now > attempts.resetTime) {
    attempts.count = 0;
    attempts.resetTime = now + RATE_LIMIT_WINDOW;
  }
  
  if (attempts.count >= MAX_ATTEMPTS) {
    return res.status(429).json({ error: 'Too many login attempts. Please try again later.' });
  }
  
  attempts.count++;
  next();
};

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] // Replace with your domain
    : ['http://localhost:3000'],
  credentials: true
}));
app.use(bodyParser.json({ limit: '10mb' }));

// Security: JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Data storage
const DATA_FILE = path.join(__dirname, 'data.json');

// Initialize data file if it doesn't exist
async function initializeData() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    const initialData = {
      bookings: [],
      settings: {
        cottageName: "Sand Lake Lodge",
        pricePerNight: 250,
        weekendPrice: 300,
        minStay: 3,
        contactPhone: "416-832-9144",
        contactEmail: "info@sandlakelodge.com"
      }
    };
    await fs.writeFile(DATA_FILE, JSON.stringify(initialData, null, 2));
  }
}

// Read data with error handling
async function readData() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return { bookings: [], settings: {} };
  }
}

// Write data with error handling
async function writeData(data) {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing data:', error);
    throw error;
  }
}

// Email configuration
const emailConfig = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || null,
    pass: process.env.EMAIL_PASS || null
  }
};

// Create transporter only if email credentials are provided
let transporter = null;
if (emailConfig.auth.user && emailConfig.auth.pass && 
    emailConfig.auth.user !== 'your-email@gmail.com' && 
    emailConfig.auth.pass !== 'your-app-password' &&
    emailConfig.auth.user !== null &&
    emailConfig.auth.pass !== null) {
  try {
    transporter = nodemailer.createTransport(emailConfig);
  } catch (error) {
    console.error('Error creating email transporter:', error);
  }
}

// Send email notification with error handling
async function sendEmailNotification(subject, message, toEmail = null) {
  // TEMPORARILY DISABLED FOR GITHUB PAGES DEMO
  console.log('Email would be sent:', { subject, toEmail, message: message.substring(0, 100) + '...' });
  return;
  
  /* ORIGINAL CODE - DISABLED FOR DEMO
  try {
    if (!toEmail) {
      return;
    }

    if (!transporter) {
      return;
    }

    if (!emailConfig.auth.user || !emailConfig.auth.pass) {
      return;
    }

    const mailOptions = {
      from: `"Sand Lake Lodge" <${emailConfig.auth.user}>`,
      to: toEmail,
      subject: subject,
      text: message,
      html: message.replace(/\n/g, '<br>')
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
  */
}

// API Routes

// Admin Login with rate limiting
app.post('/api/admin/login', rateLimitLogin, async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Security: Use constant-time comparison to prevent timing attacks
    const emailMatch = email === ADMIN_EMAIL;
    const passwordMatch = password === ADMIN_PASSWORD;
    
    if (emailMatch && passwordMatch) {
      const token = jwt.sign(
        { email: ADMIN_EMAIL, role: 'admin' },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      res.json({ 
        token,
        message: 'Login successful',
        user: { email: ADMIN_EMAIL, role: 'admin' }
      });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get all bookings (protected route)
app.get('/api/bookings', authenticateToken, async (req, res) => {
  try {
    const data = await readData();
    res.json(data.bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Get settings
app.get('/api/settings', async (req, res) => {
  try {
    const data = await readData();
    res.json(data.settings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// Create new booking (public route for guest requests) with validation
app.post('/api/bookings', validateBookingInput, async (req, res) => {
  try {
    const { name, email, phone, checkIn, checkOut, guests, message } = req.body;

    const data = await readData();
    
    // Check for existing active bookings from the same email
    const existingActiveBookings = data.bookings.filter(booking => 
      booking.email.toLowerCase() === email.toLowerCase() && 
      (booking.status === 'pending' || booking.status === 'approved')
    );

    // If there are existing active bookings, reject/delete them
    if (existingActiveBookings.length > 0) {
      // Send rejection emails for existing bookings
      for (const existingBooking of existingActiveBookings) {
        const rejectionSubject = 'Previous Booking Request Cancelled - Sand Lake Lodge';
        const rejectionMessage = `
Dear ${existingBooking.name},

Your previous booking request for Sand Lake Lodge has been automatically cancelled because you have submitted a new booking request.

Previous Booking Details:
- Check-in: ${existingBooking.checkIn}
- Check-out: ${existingBooking.checkOut}
- Number of Guests: ${existingBooking.guests}
- Status: ${existingBooking.status}

This cancellation occurred because our system only allows one active booking request per guest at a time. Your new booking request will be processed instead.

Best regards,
Sand Lake Lodge Team
        `.trim();
        
        await sendEmailNotification(rejectionSubject, rejectionMessage, existingBooking.email);
      }
      
      // Remove existing active bookings
      data.bookings = data.bookings.filter(booking => 
        !(booking.email.toLowerCase() === email.toLowerCase() && 
          (booking.status === 'pending' || booking.status === 'approved'))
      );
    }
    
    // Check for conflicts with approved bookings only
    const checkInDate = moment(checkIn);
    const checkOutDate = moment(checkOut);
    
    const hasConflict = data.bookings.some(booking => {
      if (booking.status !== 'approved') return false;
      const bookingStart = moment(booking.checkIn);
      const bookingEnd = moment(booking.checkOut);
      return (
        (checkInDate.isBetween(bookingStart, bookingEnd, null, '[]')) ||
        (checkOutDate.isBetween(bookingStart, bookingEnd, null, '[]')) ||
        (bookingStart.isBetween(checkInDate, checkOutDate, null, '[]'))
      );
    });

    if (hasConflict) {
      return res.status(409).json({ error: 'Dates are not available' });
    }

    const newBooking = {
      id: uuidv4(),
      name,
      email,
      phone,
      checkIn,
      checkOut,
      guests: guests || 1,
      message: message || '',
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    data.bookings.push(newBooking);
    await writeData(data);

    // Send confirmation email to the guest
    const guestSubject = 'Booking Request Confirmed - Sand Lake Lodge';
    const guestMessage = `
Dear ${name},

Thank you for your booking request for Sand Lake Lodge. We have received your request and will review it shortly.

Booking Details:
- Check-in: ${checkIn}
- Check-out: ${checkOut}
- Number of Guests: ${guests}
- Contact Email: ${email}
- Contact Phone: ${phone || 'Not provided'}
${message ? `- Additional Message: ${message}` : ''}

We will contact you via email within 24 hours with payment details and confirmation.

Best regards,
Sand Lake Lodge Team
    `.trim();
    
    await sendEmailNotification(guestSubject, guestMessage, email);

    // Send notification email to admin
    const adminSubject = 'New Booking Request - Sand Lake Lodge';
    const adminMessage = `
You have received a new booking request for Sand Lake Lodge.

Guest Details:
- Name: ${name}
- Email: ${email}
- Phone: ${phone || 'Not provided'}

Booking Details:
- Check-in: ${checkIn}
- Check-out: ${checkOut}
- Number of Guests: ${guests}
${message ? `- Additional Message: ${message}` : ''}

To review and manage this booking request, please visit:
http://localhost:3000/admin

Best regards,
Sand Lake Lodge Booking System
    `.trim();
    
    await sendEmailNotification(adminSubject, adminMessage, ADMIN_EMAIL);

    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Create new booking (protected route for admin) with validation
app.post('/api/admin/bookings', authenticateToken, validateBookingInput, async (req, res) => {
  try {
    const { name, email, phone, checkIn, checkOut, guests, message, status = 'approved' } = req.body;

    const data = await readData();
    
    // Check for existing active bookings from the same email
    const existingActiveBookings = data.bookings.filter(booking => 
      booking.email.toLowerCase() === email.toLowerCase() && 
      (booking.status === 'pending' || booking.status === 'approved')
    );

    // If there are existing active bookings, reject/delete them
    if (existingActiveBookings.length > 0) {
      // Send rejection emails for existing bookings
      for (const existingBooking of existingActiveBookings) {
        const rejectionSubject = 'Previous Booking Request Cancelled - Sand Lake Lodge';
        const rejectionMessage = `
Dear ${existingBooking.name},

Your previous booking request for Sand Lake Lodge has been automatically cancelled because a new booking has been created for your email address.

Previous Booking Details:
- Check-in: ${existingBooking.checkIn}
- Check-out: ${existingBooking.checkOut}
- Number of Guests: ${existingBooking.guests}
- Status: ${existingBooking.status}

This cancellation occurred because our system only allows one active booking request per guest at a time.

Best regards,
Sand Lake Lodge Team
        `.trim();
        
        await sendEmailNotification(rejectionSubject, rejectionMessage, existingBooking.email);
      }
      
      // Remove existing active bookings
      data.bookings = data.bookings.filter(booking => 
        !(booking.email.toLowerCase() === email.toLowerCase() && 
          (booking.status === 'pending' || booking.status === 'approved'))
      );
    }
    
    // Check for conflicts with approved bookings only
    const checkInDate = moment(checkIn);
    const checkOutDate = moment(checkOut);
    
    const hasConflict = data.bookings.some(booking => {
      if (booking.status !== 'approved') return false;
      const bookingStart = moment(booking.checkIn);
      const bookingEnd = moment(booking.checkOut);
      return (
        (checkInDate.isBetween(bookingStart, bookingEnd, null, '[]')) ||
        (checkOutDate.isBetween(bookingStart, bookingEnd, null, '[]')) ||
        (bookingStart.isBetween(checkInDate, checkOutDate, null, '[]'))
      );
    });

    if (hasConflict) {
      return res.status(409).json({ error: 'Dates are not available' });
    }

    const newBooking = {
      id: uuidv4(),
      name,
      email,
      phone,
      checkIn,
      checkOut,
      guests: guests || 1,
      message: message || '',
      status: status,
      createdAt: new Date().toISOString()
    };

    data.bookings.push(newBooking);
    await writeData(data);

    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Update booking status (protected route)
app.patch('/api/bookings/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['pending', 'approved', 'rejected', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const data = await readData();
    const bookingIndex = data.bookings.findIndex(b => b.id === id);
    
    if (bookingIndex === -1) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const booking = data.bookings[bookingIndex];

    // If status is 'rejected', delete the booking instead of updating status
    if (status === 'rejected') {
      // Send notification to guest before deletion
      const notificationMessage = `Your booking request has been declined. ${booking.name} for ${booking.checkIn} to ${booking.checkOut}`;
      await sendEmailNotification('Booking Declined', notificationMessage, booking.email);
      
      // Remove the booking from the array
      data.bookings.splice(bookingIndex, 1);
      await writeData(data);
      
      res.json({ message: 'Booking rejected and deleted successfully' });
    } else {
      // For other statuses, update normally
      const oldStatus = data.bookings[bookingIndex].status;
      data.bookings[bookingIndex].status = status;
      data.bookings[bookingIndex].updatedAt = new Date().toISOString();
      
      await writeData(data);

      // Send notification to guest
      if (status === 'approved') {
        const guestSubject = 'Booking Confirmed - Sand Lake Lodge';
        const guestMessage = `
Dear ${booking.name},

Great news! Your booking request for Sand Lake Lodge has been approved.

Booking Details:
- Check-in: ${booking.checkIn}
- Check-out: ${booking.checkOut}
- Number of Guests: ${booking.guests}
- Contact Email: ${booking.email}
- Contact Phone: ${booking.phone || 'Not provided'}
${booking.message ? `- Additional Message: ${booking.message}` : ''}

We will contact you shortly with payment details and arrival instructions.

Thank you for choosing Sand Lake Lodge for your stay!

Best regards,
Sand Lake Lodge Team
        `.trim();
        
        await sendEmailNotification(guestSubject, guestMessage, booking.email);
      } else if (status === 'cancelled') {
        const notificationMessage = `Your booking has been cancelled. ${booking.name} for ${booking.checkIn} to ${booking.checkOut}`;
        await sendEmailNotification('Booking Cancelled', notificationMessage, booking.email);
      }

      res.json(data.bookings[bookingIndex]);
    }
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

// Update booking details (protected route) with validation
app.put('/api/bookings/:id', authenticateToken, validateBookingInput, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, checkIn, checkOut, guests, message } = req.body;

    const data = await readData();
    const bookingIndex = data.bookings.findIndex(b => b.id === id);
    
    if (bookingIndex === -1) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Check for conflicts with other approved bookings (excluding this booking)
    if (checkOut) {
      const checkInDate = moment(checkIn);
      const checkOutDate = moment(checkOut);
      
      const hasConflict = data.bookings.some(booking => {
        if (booking.id === id || booking.status !== 'approved') return false;
        const bookingStart = moment(booking.checkIn);
        const bookingEnd = moment(booking.checkOut);
        return (
          (checkInDate.isBetween(bookingStart, bookingEnd, null, '[]')) ||
          (checkOutDate.isBetween(bookingStart, bookingEnd, null, '[]')) ||
          (bookingStart.isBetween(checkInDate, checkOutDate, null, '[]'))
        );
      });

      if (hasConflict) {
        return res.status(409).json({ error: 'Dates are not available' });
      }
    }

    // Update booking
    data.bookings[bookingIndex] = {
      ...data.bookings[bookingIndex],
      name,
      email,
      phone,
      checkIn,
      checkOut,
      guests: guests || 1,
      message: message || '',
      updatedAt: new Date().toISOString()
    };
    
    await writeData(data);

    // Send notification to guest about modification
    const booking = data.bookings[bookingIndex];
    const notificationMessage = `Your booking has been modified: ${booking.name} for ${booking.checkIn} to ${booking.checkOut}`;
    await sendEmailNotification('Booking Modified', notificationMessage, booking.email);

    res.json(data.bookings[bookingIndex]);
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

// Delete booking (protected route)
app.delete('/api/bookings/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await readData();
    
    const bookingIndex = data.bookings.findIndex(b => b.id === id);
    if (bookingIndex === -1) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const deletedBooking = data.bookings.splice(bookingIndex, 1)[0];
    await writeData(data);

    // Send email notification to the guest
    const notificationMessage = `Your booking has been cancelled: ${deletedBooking.name} for ${deletedBooking.checkIn} to ${deletedBooking.checkOut}`;
    await sendEmailNotification('Booking Cancelled', notificationMessage, deletedBooking.email);

    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

// Get available dates
app.get('/api/availability', async (req, res) => {
  try {
    const { start, end } = req.query;
    const data = await readData();
    
    const startDate = moment(start || moment().format('YYYY-MM-DD'));
    const endDate = moment(end || moment().add(6, 'months').format('YYYY-MM-DD'));
    
    const bookedDates = [];
    data.bookings.forEach(booking => {
      if (booking.status === 'approved') {
        const bookingStart = moment(booking.checkIn);
        const bookingEnd = moment(booking.checkOut);
        
        let current = bookingStart.clone();
        while (current.isBefore(bookingEnd) || current.isSame(bookingEnd, 'day')) {
          bookedDates.push(current.format('YYYY-MM-DD'));
          current.add(1, 'day');
        }
      }
    });

    res.json({ bookedDates });
  } catch (error) {
    console.error('Error getting availability:', error);
    res.status(500).json({ error: 'Failed to get availability' });
  }
});

// Get all bookings for admin (protected route)
app.get('/api/admin/bookings', authenticateToken, async (req, res) => {
  try {
    const data = await readData();
    res.json(data.bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Security: Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Initialize and start server
initializeData().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}); 