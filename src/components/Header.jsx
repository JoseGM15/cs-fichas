import React from 'react'
import { Upload, BookOpen, ChevronLeft } from 'lucide-react'
import './Header.css'

function Header({ currentView, selectedFolder, onUploadClick, onBack }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          {currentView !== 'folders' && (
            <button className="back-btn" onClick={onBack}>
              <ChevronLeft size={24} />
            </button>
          )}
          <div className="logo-section">
            <BookOpen size={32} className="logo" />
            <div>
              <h1>CS Fichas</h1>
              <p>{currentView === 'folders' ? 'Selecciona un documento' : selectedFolder}</p>
            </div>
          </div>
        </div>
        {currentView === 'content' && (
          <button className="upload-btn" onClick={onUploadClick}>
            <Upload size={20} />
            Agregar
          </button>
        )}
      </div>
    </header>
  )
}

export default Header