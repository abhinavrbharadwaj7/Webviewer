import React, { useRef, useEffect, useState } from 'react';
import WebViewer from '@pdftron/webviewer';
import './App.css';

const App = () => {
  const viewer = useRef<HTMLDivElement>(null);
  const [instance, setInstance] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default to open
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Toggle sidebar visibility
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && instance) {
      setSelectedFile(file.name);
      instance.Core.documentViewer.loadDocument(file);
    }
  };

  // WebViewer initialization
  useEffect(() => {
    WebViewer.WebComponent(
      {
        path: '/webviewer/lib',
        licenseKey: 'demo:1739462040884:61626d250300000000d81aaecf9fedc5abe3f8d142c975cdd26f2ade06',
      },
      viewer.current as HTMLDivElement,
    ).then((inst) => {
      setInstance(inst);
    });
  }, []);

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      <header className="header">
        <div className="header-container">
          <button 
            className="hamburger" 
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            ☰
          </button>
          <h1 className="logo">
            <span role="img" aria-label="Document">📄</span>
            WebViewer Pro
          </h1>
          <div className="header-controls">
           
            <button 
              className="theme-toggle"
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Toggle theme"
            >
              {isDarkMode ? '🌞' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      <div className="main-content">
        <div 
          ref={sidebarRef}
          className={`sidebar ${isSidebarOpen ? 'open' : ''}`}
        >
          <div className="sidebar-header">
            <h2>Document Controls</h2>
          </div>
          
          <div className="sidebar-body">
            <div className="file-upload-card">
              <label className="upload-label">
                <span className="upload-icon">📁</span>
                <input 
                  type="file" 
                  onChange={handleFileChange}
                  accept=".pdf,.docx,.xlsx,.pptx,.jpg,.png"
                  className="file-input"
                />
                <span className="upload-text">
                  {selectedFile || 'Choose File'}
                </span>
              </label>
              <p className="file-types">Supported formats: PDF, DOCX, XLSX, PPTX, JPG, PNG</p>
            </div>

            <nav className="features-menu">
              {[
                'UI Customization',
                'PDF, DOCX, EXCEL , PPTX, IMAGE, PNG Viewer',
                'DOCX Editor',
                'Annotations',
                'Digital Signature',
                'Real-Time Collaboration'
              ].map((feature) => (
                <div 
                  key={feature} 
                  className="feature-item"
                >
                  {feature}
                </div>
              ))}
            </nav>
          </div>
        </div>

        <div className="viewer-container">
          <div className="webviewer" ref={viewer}></div>
        </div>
      </div>
    </div>
  );
};

export default App;