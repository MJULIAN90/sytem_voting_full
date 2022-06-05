import React from 'react';
import { images } from '../../Assets'
import styles from "./styles";

const NavBar = (props) => {
  const {

  } = props;

  return (
    <div style={styles.container}>
      <img src={images.logo} height={120} width={120} alt='ERROR' style={{ position: "absolute" }} />
    </div>
  )

}

export default NavBar;