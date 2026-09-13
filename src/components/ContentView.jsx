import React, { useState } from 'react'
import { Download, Copy, Trash2, Eye } from 'lucide-react'
import './ContentView.css'

function ContentView({ category, contents, onDelete, isAuthenticated }) {
  const [copiedId, setCopiedId] = useState(null)

  const handleCopy = (content, id) => {
    navigator.clipboard.writeText(content.text || content.url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDownload = (content) => {
    if (content.type === 'file' && content.url) {
      const link = document.createElement('a')
      link.href = content.url
      link.download = content.name
      link.click()
    }
  }

  return (
    <div className="content-view">
      <div className="content-header">
        <h2>{category}</h2>
        <p className="content-count">{contents.length} elemento{contents.length !== 1 ? 's' : ''}</p>
      </div>

      {contents.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📁</div>
          <h3>Sin contenido</h3>
          <p>No hay {category.toLowerCase()} en esta categoría aún.</p>
        </div>
      ) : (
        <div className="content-grid">
          {contents.map((content, index) => (
            <div key={index} className="content-card">
              <div className="card-header">
                {content.type === 'image' ? (
                  <img src={content.url} alt={content.name} className="card-image" />
                ) : (
                  <div className="card-icon">
                    <Eye size={32} />
                  </div>
                )}
              </div>
              <div className="card-body">
                <h3>{content.name}</h3>
                {content.description && <p className="description">{content.description}</p>}
              </div>
              <div className="card-actions">
                {content.type === 'text' ? (
                  <button
                    className={`action-btn copy ${copiedId === index ? 'copied' : ''}`}
                    onClick={() => handleCopy(content, index)}
                    title="Copiar contenido"
                  >
                    <Copy size={16} />
                    {copiedId === index ? 'Copiado' : 'Copiar'}
                  </button>
                ) : (
                  <button
                    className="action-btn download"
                    onClick={() => handleDownload(content)}
                    title="Descargar"
                  >
                    <Download size={16} />
                    Descargar
                  </button>
                )}
                {isAuthenticated && (
                  <button
                    className="action-btn delete"
                    onClick={() => onDelete(index)}
                    title="Eliminar"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ContentView