import React from 'react'

const view3 = ({ isExistWinner, resultsCandidates }) => {
    return (
        <div>          
            {isExistWinner ?
                <div style={{ fontWeight: "bold" }} >

                    <p style={{ textAlign: "center" }}>
                        Lista de resultados
                    </p>

                    {resultsCandidates.map(item => {
                        return (
                            <div style={{ marginRight: 20 }}>
                                {`👤   ${item.user}: ${item.votes} votos`}
                                <hr />
                            </div>
                        )
                    })}
                </div>
            : 
                <p style={{ textAlign: "center", fontWeight: "bold" }}>
                    No hay ganador
                </p>}</div>
    )
}

export default view3