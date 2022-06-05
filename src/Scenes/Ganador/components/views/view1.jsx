import React from 'react'
import { colors } from '../../../../Assets'
import Footer from '../../../Footer'
import { stylesView1 } from "./styles";


const View1 = ({ searchVotes}) => {

    const onSearchVotes = (e)=>{
        searchVotes (e)
        e.target[0].value = "";
    }
    
  return (
      <div style={stylesView1.container}>
          <p>Consulta los votos de tu candidato</p>
          <form onSubmit={onSearchVotes} style={stylesView1.containerForm}>
              <input type="text" placeholder="INGRESE NOMBRE" style={stylesView1.styleInput} />
              <button style={stylesView1.styleButton}>
                  Buscar
              </button>
          </form>
          <Footer />
      </div>
  )
}

export default View1