import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaSave, FaUndo, FaFileExport, FaFileImport, FaEye, FaTimes } from 'react-icons/fa';
import { siteContent } from '../content/siteContent';

const DemoAdmin = () => {
  const [editableContent, setEditableContent] = useState(siteContent);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [notification, setNotification] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  // Load content from localStorage on component mount
  useEffect(() => {
    const savedContent = localStorage.getItem('sandLakeLodgeContent');
    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent);
        setEditableContent(parsedContent);
      } catch (error) {
        console.error('Error loading saved content:', error);
      }
    }
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleContentChange = (section, subsection, field, value) => {
    const newContent = { ...editableContent };
    
    if (subsection && field) {
      newContent[section][subsection][field] = value;
    } else if (subsection) {
      newContent[section][subsection] = value;
    } else {
      newContent[section][field] = value;
    }
    
    setEditableContent(newContent);
    setHasUnsavedChanges(true);
  };

  const handleArrayChange = (section, subsection, index, value) => {
    const newContent = { ...editableContent };
    newContent[section][subsection][index] = value;
    setEditableContent(newContent);
    setHasUnsavedChanges(true);
  };

  const saveContent = () => {
    try {
      localStorage.setItem('sandLakeLodgeContent', JSON.stringify(editableContent));
      setHasUnsavedChanges(false);
      showNotification('Content saved successfully! Changes will appear when you refresh the site.');
      
      // Trigger a custom event to notify other components
      window.dispatchEvent(new CustomEvent('contentUpdated', { 
        detail: editableContent 
      }));
    } catch (error) {
      console.error('Error saving content:', error);
      showNotification('Error saving content', 'error');
    }
  };

  const resetContent = () => {
    if (window.confirm('Are you sure you want to reset all content to defaults? This will lose all your changes.')) {
      setEditableContent(siteContent);
      localStorage.removeItem('sandLakeLodgeContent');
      setHasUnsavedChanges(false);
      showNotification('Content reset to defaults');
      
      // Trigger update event
      window.dispatchEvent(new CustomEvent('contentUpdated', { 
        detail: siteContent 
      }));
    }
  };

  const exportContent = () => {
    try {
      const dataStr = JSON.stringify(editableContent, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sand-lake-lodge-content.json';
      link.click();
      URL.revokeObjectURL(url);
      showNotification('Content exported successfully');
    } catch (error) {
      console.error('Error exporting content:', error);
      showNotification('Error exporting content', 'error');
    }
  };

  const importContent = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedContent = JSON.parse(e.target.result);
          setEditableContent(importedContent);
          setHasUnsavedChanges(true);
          showNotification('Content imported successfully');
        } catch (error) {
          console.error('Error importing content:', error);
          showNotification('Error importing content file', 'error');
        }
      };
      reader.readAsText(file);
    }
  };

  const renderTextInput = (label, value, onChange, type = 'text', rows = null) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-amber-800 mb-2">
        {label}
      </label>
      {rows ? (
        <textarea
          value={value || ''}
          onChange={onChange}
          rows={rows}
          className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        />
      ) : (
        <input
          type={type}
          value={value || ''}
          onChange={onChange}
          className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        />
      )}
    </div>
  );

  const renderArrayInput = (label, items, onItemChange) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-amber-800 mb-2">
        {label}
      </label>
      {items.map((item, index) => (
        <input
          key={index}
          type="text"
          value={item || ''}
          onChange={(e) => onItemChange(index, e.target.value)}
          className="w-full px-3 py-2 mb-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          placeholder={`Item ${index + 1}`}
        />
      ))}
    </div>
  );

  return (
    <div className="pt-16 min-h-screen bg-amber-50">
      {/* Hero Section */}
      <section className="relative py-8 md:py-12 flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="/sand-lake-lodge/images/hero/kitchen.jpg" 
            alt="Content Management" 
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
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-3 text-white drop-shadow-2xl leading-tight">
                Content Management
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-4 text-amber-100 font-light drop-shadow-lg max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-2">
                Edit website content with ease
              </p>
              <div className="w-16 md:w-20 h-0.5 md:h-1 bg-amber-400 mx-auto mb-4"></div>
            </div>
          </motion.div>
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

      {/* Main Content */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Action Bar */}
            <div className="bg-amber-100 rounded-lg p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={saveContent}
                  disabled={!hasUnsavedChanges}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    hasUnsavedChanges 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <FaSave />
                  Save Changes
                </button>
                
                <button
                  onClick={resetContent}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all duration-300"
                >
                  <FaUndo />
                  Reset All
                </button>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={exportContent}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-300"
                >
                  <FaFileExport />
                  Export
                </button>
                
                <label className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-all duration-300 cursor-pointer">
                  <FaFileImport />
                  Import
                  <input
                    type="file"
                    accept=".json"
                    onChange={importContent}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {hasUnsavedChanges && (
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg mb-6">
                <strong>You have unsaved changes.</strong> Don't forget to save your edits!
              </div>
            )}

            {/* Section Navigation */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['global', 'home', 'about', 'navigation', 'footer'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    activeSection === section
                      ? 'bg-amber-600 text-white'
                      : 'bg-white text-amber-600 border border-amber-600 hover:bg-amber-50'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>

            {/* Content Editing Sections */}
            <div className="bg-white rounded-lg shadow-xl p-6">
              
              {/* Global Content */}
              {activeSection === 'global' && (
                <div>
                  <h3 className="text-2xl font-serif font-bold text-amber-900 mb-6">Global Content</h3>
                  
                  {renderTextInput(
                    'Site Name',
                    editableContent.global.siteName,
                    (e) => handleContentChange('global', 'siteName', null, e.target.value)
                  )}
                  
                  {renderTextInput(
                    'Site Tagline',
                    editableContent.global.siteTagline,
                    (e) => handleContentChange('global', 'siteTagline', null, e.target.value),
                    'text',
                    2
                  )}
                  
                  {renderTextInput(
                    'Contact Phone',
                    editableContent.global.contactPhone,
                    (e) => handleContentChange('global', 'contactPhone', null, e.target.value)
                  )}
                  
                  {renderTextInput(
                    'Contact Email',
                    editableContent.global.contactEmail,
                    (e) => handleContentChange('global', 'contactEmail', null, e.target.value),
                    'email'
                  )}
                  
                  {renderTextInput(
                    'Contact Location',
                    editableContent.global.contactLocation,
                    (e) => handleContentChange('global', 'contactLocation', null, e.target.value)
                  )}
                </div>
              )}

              {/* Home Page Content */}
              {activeSection === 'home' && (
                <div>
                  <h3 className="text-2xl font-serif font-bold text-amber-900 mb-6">Home Page Content</h3>
                  
                  {/* Hero Section */}
                  <div className="mb-8 p-4 bg-amber-50 rounded-lg">
                    <h4 className="text-xl font-semibold text-amber-900 mb-4">Hero Section</h4>
                    
                    {renderTextInput(
                      'Main Title',
                      editableContent.home.hero.title,
                      (e) => handleContentChange('home', 'hero', 'title', e.target.value)
                    )}
                    
                    {renderTextInput(
                      'Subtitle',
                      editableContent.home.hero.subtitle,
                      (e) => handleContentChange('home', 'hero', 'subtitle', e.target.value),
                      'text',
                      2
                    )}
                    
                    {renderTextInput(
                      'Primary Button Text',
                      editableContent.home.hero.primaryButton,
                      (e) => handleContentChange('home', 'hero', 'primaryButton', e.target.value)
                    )}
                    
                    {renderTextInput(
                      'Secondary Button Text',
                      editableContent.home.hero.secondaryButton,
                      (e) => handleContentChange('home', 'hero', 'secondaryButton', e.target.value)
                    )}
                  </div>

                  {/* Experience Section */}
                  <div className="mb-8 p-4 bg-amber-50 rounded-lg">
                    <h4 className="text-xl font-semibold text-amber-900 mb-4">Experience Section</h4>
                    
                    {renderTextInput(
                      'Section Title',
                      editableContent.home.experience.sectionTitle,
                      (e) => handleContentChange('home', 'experience', 'sectionTitle', e.target.value)
                    )}
                    
                    {renderTextInput(
                      'Section Subtitle',
                      editableContent.home.experience.sectionSubtitle,
                      (e) => handleContentChange('home', 'experience', 'sectionSubtitle', e.target.value),
                      'text',
                      2
                    )}

                    <div className="grid md:grid-cols-3 gap-4 mt-6">
                      <div>
                        <h5 className="font-semibold text-amber-800 mb-2">Lakeside Living</h5>
                        {renderTextInput(
                          'Title',
                          editableContent.home.experience.lakeside.title,
                          (e) => handleContentChange('home', 'experience', 'lakeside', {...editableContent.home.experience.lakeside, title: e.target.value})
                        )}
                        {renderTextInput(
                          'Description',
                          editableContent.home.experience.lakeside.description,
                          (e) => handleContentChange('home', 'experience', 'lakeside', {...editableContent.home.experience.lakeside, description: e.target.value}),
                          'text',
                          2
                        )}
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-amber-800 mb-2">Water Adventures</h5>
                        {renderTextInput(
                          'Title',
                          editableContent.home.experience.water.title,
                          (e) => handleContentChange('home', 'experience', 'water', {...editableContent.home.experience.water, title: e.target.value})
                        )}
                        {renderTextInput(
                          'Description',
                          editableContent.home.experience.water.description,
                          (e) => handleContentChange('home', 'experience', 'water', {...editableContent.home.experience.water, description: e.target.value}),
                          'text',
                          2
                        )}
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-amber-800 mb-2">Cozy Evenings</h5>
                        {renderTextInput(
                          'Title',
                          editableContent.home.experience.evening.title,
                          (e) => handleContentChange('home', 'experience', 'evening', {...editableContent.home.experience.evening, title: e.target.value})
                        )}
                        {renderTextInput(
                          'Description',
                          editableContent.home.experience.evening.description,
                          (e) => handleContentChange('home', 'experience', 'evening', {...editableContent.home.experience.evening, description: e.target.value}),
                          'text',
                          2
                        )}
                      </div>
                    </div>
                  </div>

                  {/* CTA Section */}
                  <div className="mb-8 p-4 bg-amber-50 rounded-lg">
                    <h4 className="text-xl font-semibold text-amber-900 mb-4">Call to Action</h4>
                    
                    {renderTextInput(
                      'CTA Title',
                      editableContent.home.cta.title,
                      (e) => handleContentChange('home', 'cta', 'title', e.target.value)
                    )}
                    
                    {renderTextInput(
                      'CTA Subtitle',
                      editableContent.home.cta.subtitle,
                      (e) => handleContentChange('home', 'cta', 'subtitle', e.target.value)
                    )}
                    
                    {renderTextInput(
                      'Button Text',
                      editableContent.home.cta.buttonText,
                      (e) => handleContentChange('home', 'cta', 'buttonText', e.target.value)
                    )}
                  </div>
                </div>
              )}

              {/* About Page Content */}
              {activeSection === 'about' && (
                <div>
                  <h3 className="text-2xl font-serif font-bold text-amber-900 mb-6">About Page Content</h3>
                  
                  {/* Hero Section */}
                  <div className="mb-8 p-4 bg-amber-50 rounded-lg">
                    <h4 className="text-xl font-semibold text-amber-900 mb-4">Hero Section</h4>
                    
                    {renderTextInput(
                      'Page Title',
                      editableContent.about.hero.title,
                      (e) => handleContentChange('about', 'hero', 'title', e.target.value)
                    )}
                    
                    {renderTextInput(
                      'Page Subtitle',
                      editableContent.about.hero.subtitle,
                      (e) => handleContentChange('about', 'hero', 'subtitle', e.target.value)
                    )}
                  </div>

                  {/* Main Content */}
                  <div className="mb-8 p-4 bg-amber-50 rounded-lg">
                    <h4 className="text-xl font-semibold text-amber-900 mb-4">Main Content</h4>
                    
                    {renderTextInput(
                      'Section Title',
                      editableContent.about.main.sectionTitle,
                      (e) => handleContentChange('about', 'main', 'sectionTitle', e.target.value)
                    )}
                    
                    {renderTextInput(
                      'Paragraph 1',
                      editableContent.about.main.paragraph1,
                      (e) => handleContentChange('about', 'main', 'paragraph1', e.target.value),
                      'text',
                      3
                    )}
                    
                    {renderTextInput(
                      'Paragraph 2',
                      editableContent.about.main.paragraph2,
                      (e) => handleContentChange('about', 'main', 'paragraph2', e.target.value),
                      'text',
                      3
                    )}
                    
                    {renderTextInput(
                      'Paragraph 3',
                      editableContent.about.main.paragraph3,
                      (e) => handleContentChange('about', 'main', 'paragraph3', e.target.value),
                      'text',
                      3
                    )}

                    {renderArrayInput(
                      'Feature List',
                      editableContent.about.main.features,
                      (index, value) => handleArrayChange('about', 'main.features', index, value)
                    )}
                    
                    {renderTextInput(
                      'Button Text',
                      editableContent.about.main.buttonText,
                      (e) => handleContentChange('about', 'main', 'buttonText', e.target.value)
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Content */}
              {activeSection === 'navigation' && (
                <div>
                  <h3 className="text-2xl font-serif font-bold text-amber-900 mb-6">Navigation</h3>
                  
                  {Object.entries(editableContent.navigation).map(([key, value]) => (
                    renderTextInput(
                      key.charAt(0).toUpperCase() + key.slice(1),
                      value,
                      (e) => handleContentChange('navigation', key, null, e.target.value)
                    )
                  ))}
                </div>
              )}

              {/* Footer Content */}
              {activeSection === 'footer' && (
                <div>
                  <h3 className="text-2xl font-serif font-bold text-amber-900 mb-6">Footer</h3>
                  
                  {Object.entries(editableContent.footer).map(([key, value]) => (
                    renderTextInput(
                      key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
                      value,
                      (e) => handleContentChange('footer', key, null, e.target.value),
                      'text',
                      key === 'description' ? 2 : 1
                    )
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DemoAdmin;
