import React from 'react'
import styles from './styles'

const index = ({ sendCandidate }) => {

      return (
            <form onSubmit={sendCandidate}>
                  <h1>Incripcion de candidato</h1>
                  <div style={styles.container}>

                        <div style={styles.containerLabels}>
                              <label for="name" style={{ margin: 5, marginTop: 10, width: 30 }}>Nombres:</label>
                              <label for="edad" style={{ margin: 5, marginTop: 15 }}>Edad:</label>
                              <label for="idenfication" style={{ margin: 3, marginTop: 15 }}>Numero de identidad:</label>
                              <label for="resumen" style={{ margin: 3, marginTop: 25 }}>Resumen personal:</label>
                        </div>

                        <div style={styles.containerInputs}>
                              <input type="text" id="name" name="name" placeholder="Ingresa tu nombre" style={styles.stylesInput1} />
                              <input type="number" id="edad" name="edad" placeholder="Ingresa tu edad" style={styles.stylesInput1} />
                              <input type="number" id="idenfication" name="idenfication" placeholder="Ingresa tu documento" style={styles.stylesInput1} />
                              <textarea id="resumen" name="resumen" placeholder="Ingresa un resumen de tu perfil" style={styles.stylesTextarea} />

                        </div>

                  </div>
                  <div >
                        <button type="submit" style={styles.stylesButton}>Subscribe</button>
                  </div>
            </form>)
}

export default index