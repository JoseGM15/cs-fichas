import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import FoldersView from './components/FoldersView'
import ContentView from './components/ContentView'
import UploadModal from './components/UploadModal'

function App() {
  const [currentView, setCurrentView] = useState('folders')
  const [selectedFolder, setSelectedFolder] = useState(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  const [contents, setContents] = useState({
    'Primero': [
      { name: 'Primero', description: 'Contenido inicial - Documento 1', type: 'text', text: 'Este es el contenido de ejemplo para Primero' }
    ],
    'Segundo': [
      { name: 'Segundo', description: 'Contenido inicial - Documento 2', type: 'text', text: 'Este es el contenido de ejemplo para Segundo' }
    ],
    'Tercero': [
      { name: 'Tercero', description: 'Contenido inicial - Documento 3', type: 'text', text: 'Este es el contenido de ejemplo para Tercero' }
    ],
    'Cuarto': [
      { name: 'Cuarto', description: 'Contenido inicial - Documento 4', type: 'text', text: 'Este es el contenido de ejemplo para Cuarto' }
    ],
    'Quinto': [
      { name: 'Quinto', description: 'Contenido inicial - Documento 5', type: 'text', text: 'Este es el contenido de ejemplo para Quinto' }
    ]
  })

  useEffect(() => {
    const savedContents = localStorage.getItem('csContents')
    if (savedContents) {
      setContents(JSON.parse(savedContents))
    }
  }, [])

  const folders = [
    { name: 'Primero', icon: '📄', color: '#3b82f6' },
    { name: 'Segundo', icon: '📄', color: '#0ea5e9' },
    { name: 'Tercero', icon: '📄', color: '#06b6d4' },
    { name: 'Cuarto', icon: '📄', color: '#10b981' },
    { name: 'Quinto', icon: '📄', color: '#f59e0b' }
  ]

  const handleFolderClick = (folderName) => {
    setSelectedFolder(folderName)
    setCurrentView('content')
  }

  const handleBack = () => {
    setSelectedFolder(null)
    setCurrentView('folders')
  }

  const handleAddContent = (newContent) => {
    const updatedContents = {
      ...contents,
      [selectedFolder]: [...contents[selectedFolder], newContent]
    }
    setContents(updatedContents)
    localStorage.setItem('csContents', JSON.stringify(updatedContents))
    setShowUploadModal(false)
  }

  const handleDeleteContent = (index) => {
    const updatedFolder = contents[selectedFolder].filter((_, i) => i !== index)
    const updatedContents = {
      ...contents,
      [selectedFolder]: updatedFolder
    }
    setContents(updatedContents)
    localStorage.setItem('csContents', JSON.stringify(updatedContents))
  }

  return (
    <div className="app">
      <Header 
        currentView={currentView}
        selectedFolder={selectedFolder}
        onUploadClick={() => setShowUploadModal(true)}
        onBack={handleBack}
      />
      <div className="app-container">
        {currentView === 'folders' && (
          <FoldersView folders={folders} onFolderClick={handleFolderClick} />
        )}
        {currentView === 'content' && (
          <ContentView
            folder={selectedFolder}
            contents={contents[selectedFolder] || []}
            onDelete={handleDeleteContent}
            isAuthenticated={isAuthenticated}
          />
        )}
      </div>
      {showUploadModal && currentView === 'content' && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onUpload={handleAddContent}
          onAuthenticate={setIsAuthenticated}
          isAuthenticated={isAuthenticated}
        />
      )}
    </div>
  )
}

export default App