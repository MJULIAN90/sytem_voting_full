import './styles.css';
import React, { useState } from 'react'
import { Form, Badge, Container } from 'react-bootstrap'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import styles from './styles';
const ipfs = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

export default File = ({ setUrl, isExistWinner }) => {
  const [file, setFile] = useState({})
  const [loading, setLoading] = useState(false)
  const [uploaded, setUploaded] = useState(false)

  const uploadFile = async (e) => {
    setLoading(true)
    e.preventDefault()

    try {
      const added = await ipfs.add(file)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setUrl(url)
      setUploaded(true)
    } catch (err) {
    }
    setLoading(false)
  }

  const preUpload = (e) => {
    if (e.target.value !== '') {
      setFile(e.target.files[0])
    } else {
      setFile({})
    }
  }

  const fileAndUploadButton = () => {
    if (file.name) {
      if (!loading) {
        return (
          <div style={styles.container}>
            <h5 style={styles.stylesH5}>
              {file.name} <Badge pill>{file.size} kb</Badge>
            </h5>

            {uploaded ? (
              <h5>  </h5>
            ) : (
                <div style={{ marginRight: 170 }}>
                  <button type='submit' style={styles.stylesButton} > Enviar </button>
              </div>
            )}
          </div>
        )
      } else {
        return (
          <Container style={styles.stylesLoading}>
            <h4>Cargando ...</h4>
          </Container>
        )
      }
    }
  }

  return (
    <div style={{ marginLeft:160 }}>
      <Form onSubmit={uploadFile}>
        <Form.Control
          required
          type='file'
          onChange={(e) => preUpload(e)}
          className={isExistWinner ? 'choose2' : 'choose'}
          style={{color:"white"}}
          disabled={isExistWinner}
        />
        {fileAndUploadButton()}
      </Form>
    </div>
  )
}