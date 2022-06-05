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
        <Button title={'Cerrar votaciones'} action={getWinner} height={40} colorButton={colors.buttonWhite} />
      </div>
    </div>
  )
}

export default Admin;