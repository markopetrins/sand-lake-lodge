import { useState, useEffect } from 'react';
import { siteContent } from '../content/siteContent';

// Custom hook to manage editable content
export const useContent = () => {
  const [content, setContent] = useState(siteContent);

  useEffect(() => {
    // Load content from localStorage if it exists
    const loadContent = () => {
      const savedContent = localStorage.getItem('sandLakeLodgeContent');
      if (savedContent) {
        try {
          const parsedContent = JSON.parse(savedContent);
          setContent(parsedContent);
        } catch (error) {
          console.error('Error loading saved content:', error);
          setContent(siteContent);
        }
      }
    };

    // Load content on mount
    loadContent();

    // Listen for content updates from the admin interface
    const handleContentUpdate = (event) => {
      setContent(event.detail);
    };

    window.addEventListener('contentUpdated', handleContentUpdate);

    return () => {
      window.removeEventListener('contentUpdated', handleContentUpdate);
    };
  }, []);

  return content;
};

export default useContent;
