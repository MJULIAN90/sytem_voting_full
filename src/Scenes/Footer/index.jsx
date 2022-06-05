import React from 'react'

const Footer = () => {
  return (
    <div style={{
      background: "radial-gradient(circle, rgba(0, 134, 205, 1) 0%, rgba(0, 0, 0, 1) 100%)", fontSize: 10, color: "white", position: "absolute", bottom: 0, textAlign: "center", width: "100%",
      boxShadow: '-10px -6px 5px black'
    }} >
      <div style={{ marginBottom: 8, marginTop: 8 }}>
        <div>© {new Date().getFullYear()} Original designs by </div>
        <div>Andrés Felipe Velásquez Trujillo</div>
        <div>Martin Julian Ruiz Velásquez </div>
      </div>
    </div>
  )
}

export default Footer 