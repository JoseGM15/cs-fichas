import React from 'react'
import { Upload, BookOpen } from 'lucide-react'
import './Header.css'

function Header({ onUploadClick }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <BookOpen size={32} className="logo" />
          <div>
            <h1>CS Fichas</h1>
            <p>Repositorio Público de Contenidos</p>
          </div>
        </div>
        <button className="upload-btn" onClick={onUploadClick}>
          <Upload size={20} />
          Subir Contenido
        </button>
      </div>
    </header>
  )
}

export default Header