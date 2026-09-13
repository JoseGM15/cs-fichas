import React from 'react'
import { FileText, Image, Type } from 'lucide-react'
import './Sidebar.css'

function Sidebar({ selectedCategory, onSelectCategory }) {
  const categories = [
    { name: 'Documentos', icon: FileText },
    { name: 'Fotos', icon: Image },
    { name: 'Textos', icon: Type }
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <h2>Categorías</h2>
        <nav className="categories-nav">
          {categories.map(({ name, icon: Icon }) => (
            <button
              key={name}
              className={`category-btn ${selectedCategory === name ? 'active' : ''}`}
              onClick={() => onSelectCategory(name)}
            >
              <Icon size={20} />
              <span>{name}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar