import React, { useState } from 'react'
import { X, Lock } from 'lucide-react'
import './UploadModal.css'

const PASSWORD = 'escuela2026'

function UploadModal({ onClose, onUpload, onAuthenticate, isAuthenticated }) {
  const [step, setStep] = useState(isAuthenticated ? 'upload' : 'password')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [contentType, setContentType] = useState('text')
  const [textContent, setTextContent] = useState('')
  const [fileContent, setFileContent] = useState(null)
  const [imageUrl, setImageUrl] = useState('')

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (password === PASSWORD) {
      onAuthenticate(true)
      setStep('upload')
      setPasswordError('')
    } else {
      setPasswordError('Contraseña incorrecta')
      setPassword('')
    }
  }

  const handleUpload = (e) => {
    e.preventDefault()
    if (!name.trim()) {
      alert('Por favor ingresa un nombre')
      return
    }

    let content = {
      name,
      description,
      type: contentType
    }

    if (contentType === 'text') {
      if (!textContent.trim()) {
        alert('Por favor ingresa contenido de texto')
        return
      }
      content.text = textContent
    } else if (contentType === 'image') {
      if (!imageUrl.trim()) {
        alert('Por favor ingresa una URL de imagen')
        return
      }
      content.url = imageUrl
    } else if (contentType === 'file') {
      if (!fileContent) {
        alert('Por favor selecciona un archivo')
        return
      }
      content.url = fileContent
    }

    onUpload(content)
    resetForm()
  }

  const resetForm = () => {
    setName('')
    setDescription('')
    setTextContent('')
    setFileContent(null)
    setImageUrl('')
    setContentType('text')
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setFileContent(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        {step === 'password' ? (
          <form onSubmit={handlePasswordSubmit} className="password-form">
            <div className="modal-header">
              <Lock size={32} className="lock-icon" />
              <h2>Acceso Restringido</h2>
              <p>Ingresa la contraseña para subir contenido</p>
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa la contraseña"
                autoFocus
              />
              {passwordError && <span className="error">{passwordError}</span>}
            </div>

            <button type="submit" className="submit-btn">Continuar</button>
          </form>
        ) : (
          <form onSubmit={handleUpload} className="upload-form">
            <div className="modal-header">
              <h2>Subir Contenido</h2>
              <p>Completa el formulario para añadir nuevo contenido</p>
            </div>

            <div className="form-group">
              <label htmlFor="name">Nombre *</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Mi documento importante"
                autoFocus
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Añade una descripción opcional"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contentType">Tipo de Contenido *</label>
              <select
                id="contentType"
                value={contentType}
                onChange={(e) => {
                  setContentType(e.target.value)
                  setFileContent(null)
                  setImageUrl('')
                  setTextContent('')
                }}
              >
                <option value="text">Texto</option>
                <option value="image">Imagen (URL)</option>
                <option value="file">Archivo (URL)</option>
              </select>
            </div>

            {contentType === 'text' && (
              <div className="form-group">
                <label htmlFor="textContent">Contenido *</label>
                <textarea
                  id="textContent"
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder="Pega tu contenido aquí..."
                  rows="5"
                />
              </div>
            )}

            {contentType === 'image' && (
              <div className="form-group">
                <label htmlFor="imageUrl">URL de la Imagen *</label>
                <input
                  id="imageUrl"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>
            )}

            {contentType === 'file' && (
              <div className="form-group">
                <label htmlFor="fileUrl">URL del Archivo *</label>
                <input
                  id="fileUrl"
                  type="url"
                  value={fileContent}
                  onChange={(e) => setFileContent(e.target.value)}
                  placeholder="https://ejemplo.com/archivo.pdf"
                />
              </div>
            )}

            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="submit-btn">
                Subir Contenido
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default UploadModal