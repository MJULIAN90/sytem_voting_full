import React from 'react';
import { colors, images } from '../../Assets'
import styles from './styles';
import Button from '../../components/Button';

const Admin = (props) => {
  const {
    getWinner
  } = props;

  return (
    <div style={styles.container}>
      <img src={images.logo} height={120} width={120} alt='ERROR' style={{ position: "absolute" }} />

      <div style={styles.containerButton}>
        <p style={{ color: 'white', textTransform: "uppercase", width: 160, position: "absolute", top: 5, right: 6 }}>Panel Admin</p>
        <Button title={'Cerrar votaciones'} action={getWinner} height={40} colorButton={colors.buttonWhite} />
      </div>
    </div>
  )
}

export default Admin;