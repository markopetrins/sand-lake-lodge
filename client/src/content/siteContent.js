// Site Content Management
// This file contains all editable text content for the Sand Lake Lodge website
// Content is organized by page and section for easy management

export const siteContent = {
  // Global/Shared Content
  global: {
    siteName: "Sand Lake Lodge",
    siteTagline: "Where time slows down and memories are made by the lake",
    contactPhone: "416-832-9144",
    contactEmail: "hello@sandlakelodge.com",
    contactLocation: "Ontario Lake Country"
  },

  // Home Page Content
  home: {
    hero: {
      title: "Sand Lake Lodge",
      subtitle: "Where time slows down and memories are made by the lake",
      primaryButton: "Plan Your Escape",
      secondaryButton: "Take a Look Around"
    },
    experience: {
      sectionTitle: "Your Perfect Lakeside Experience",
      sectionSubtitle: "Every detail has been thoughtfully crafted to create memories that last a lifetime",
      lakeside: {
        title: "Lakeside Living",
        description: "Wake up to stunning lake views and fall asleep to the gentle sounds of nature"
      },
      water: {
        title: "Water Adventures", 
        description: "Explore the lake with our provided kayaks and water equipment"
      },
      evening: {
        title: "Cozy Evenings",
        description: "Gather around the firepit for stories, s'mores, and stargazing"
      }
    },
    cta: {
      title: "Ready to Begin Your Lakeside Adventure?",
      subtitle: "Your perfect cottage getaway is just a click away.",
      buttonText: "Check Availability & Reserve"
    }
  },

  // About Page Content
  about: {
    hero: {
      title: "About Sand Lake Lodge",
      subtitle: "Your lakeside sanctuary"
    },
    main: {
      sectionTitle: "Welcome to Your Lakeside Paradise",
      paragraph1: "Sand Lake Lodge is more than just a place to stay—it's your personal retreat in the heart of Ontario's pristine lake country. Here, you'll find the perfect balance of seclusion and accessibility, where every detail has been thoughtfully crafted to create an unforgettable experience.",
      paragraph2: "Our handcrafted log cabin stands as a testament to traditional craftsmanship while offering all the modern comforts you expect. With 3 bedrooms, a bunkbed room, 3 bathrooms, a dedicated playroom, and spacious living areas, we can comfortably accommodate up to 8 guests.",
      paragraph3: "Whether you're seeking a romantic getaway, a family adventure, or a peaceful solo retreat, Sand Lake Lodge provides the perfect backdrop for your story. With 200 feet of private shoreline, stunning sunset views, and endless outdoor activities, your perfect escape awaits.",
      features: [
        "3 bedrooms + bunkbed room",
        "3 full bathrooms", 
        "Dedicated playroom",
        "Sleeps up to 8 guests"
      ],
      buttonText: "Reserve Your Stay"
    },
    experience: {
      sectionTitle: "Your Perfect Getaway Awaits",
      sectionSubtitle: "Experience the perfect blend of adventure and relaxation at Sand Lake Lodge",
      kitchen: {
        title: "Fully Equipped Kitchen",
        description: "Everything you need to prepare delicious meals with lake views"
      },
      dock: {
        title: "Private Dock",
        description: "Your own dock for fishing, swimming, or simply enjoying the water"
      },
      bonfire: {
        title: "Bonfire Area",
        description: "Perfect spot for evening gatherings and stargazing"
      }
    },
    location: {
      sectionTitle: "Perfect Location, Easy Access",
      sectionSubtitle: "Secluded yet accessible - the best of both worlds",
      secluded: {
        title: "Secluded Paradise",
        description: "2 acres of private woodland, 200 feet of shoreline, 15 min to amenities"
      },
      access: {
        title: "Easy Arrival", 
        description: "Paved access, private driveway, 2 hours from Toronto"
      },
      timing: {
        title: "Flexible Timing",
        description: "Check-in: 4:00 PM | Check-out: 11:00 AM"
      }
    },
    contact: {
      sectionTitle: "Ready to Experience Sand Lake Lodge?",
      primaryButtonText: "Book Your Stay",
      secondaryButtonText: "View Gallery"
    }
  },

  // Navigation
  navigation: {
    home: "Home",
    about: "About", 
    features: "Features",
    gallery: "Gallery",
    booking: "Book Now",
    admin: "Admin"
  },

  // Footer 
  footer: {
    description: "Your perfect lakeside retreat awaits at Sand Lake Lodge. Experience the tranquility of Ontario's pristine lake country.",
    quickLinks: "Quick Links",
    contact: "Contact Info", 
    followUs: "Follow Us",
    copyright: "© 2024 Sand Lake Lodge. All rights reserved."
  }
};

// Export individual sections for easier imports
export const globalContent = siteContent.global;
export const homeContent = siteContent.home;
export const aboutContent = siteContent.about;
export const navigationContent = siteContent.navigation;
export const footerContent = siteContent.footer;
