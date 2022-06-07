import React from 'react'
import { images } from '../../../../Assets'
import Card from '../../../../components/Card'
import { stylesView2 } from "./styles";


const view2 = ({ isExistWinner, infoWinner }) => {
    return (
        <div style={stylesView2.container}>
            {isExistWinner
                ? infoWinner !== 'Hay empate entre los candidatos' ? <Card item={infoWinner} isWinner /> : 
                        <p style={{ textAlign: "center",fontWeight: 'bold' }}> Hay empate entre los candidatos</p>
                    :   <div style={stylesView2.containerText}>
                    <p>Candidato Ganador</p>
                    <img src={images.interrogacionAzul} height='140' />
                </div>
            }
        </div>
    )
}

export default view2