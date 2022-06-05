import React, { useState } from 'react'
import Form from './Components/Form'
import File from './Components/File'
import styles from './styles';

const FormUser = ({ action, isExistWinner }) => {
  const [url, setUrl] = useState('');

  const sendCandidate = async (event) => {
    event.preventDefault()
    await action(event, url)
    setUrl('')
  }

  return (
    <div style={styles.container}>
      {!url &&
        <>
          {isExistWinner ?
            <h3 style={styles.stylesText}> Votaciones cerradas </h3> :
            <>
              <h3>  Quieres ser candidato </h3>
              <h5>   Sube tu foto</h5>
            </>
          }
        </>}

      {!url ? <File setUrl={setUrl} isExistWinner={isExistWinner} /> : <Form sendCandidate={sendCandidate} />}

    </div>

  )
}

export default FormUser