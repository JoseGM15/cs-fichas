import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ContentView from './components/ContentView'
import UploadModal from './components/UploadModal'

function App() {
  const [selectedCategory, setSelectedCategory] = useState('Documentos')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [contents, setContents] = useState({
    Documentos: [],
    Fotos: [],
    Textos: []
  })

  // Cargar contenido del localStorage
  useEffect(() => {
    const savedContents = localStorage.getItem('csContents')
    if (savedContents) {
      setContents(JSON.parse(savedContents))
    }
  }, [])

  const handleAddContent = (newContent) => {
    const updatedContents = {
      ...contents,
      [selectedCategory]: [...contents[selectedCategory], newContent]
    }
    setContents(updatedContents)
    localStorage.setItem('csContents', JSON.stringify(updatedContents))
    setShowUploadModal(false)
  }

  const handleDeleteContent = (index) => {
    const updatedCategory = contents[selectedCategory].filter((_, i) => i !== index)
    const updatedContents = {
      ...contents,
      [selectedCategory]: updatedCategory
    }
    setContents(updatedContents)
    localStorage.setItem('csContents', JSON.stringify(updatedContents))
  }

  return (
    <div className="app">
      <Header onUploadClick={() => setShowUploadModal(true)} />
      <div className="app-container">
        <Sidebar 
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <ContentView 
          category={selectedCategory}
          contents={contents[selectedCategory]}
          onDelete={handleDeleteContent}
          isAuthenticated={isAuthenticated}
        />
      </div>
      {showUploadModal && (
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