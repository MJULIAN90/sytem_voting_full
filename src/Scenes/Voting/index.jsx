import React from "react";
import styles from "./styles";
import Carousels from "../../components/Card/components/Carousels";

const Voting = (props) => {

  return (
    <div style={styles.container}>
        <Carousels {...props} />
    </div>
  );
};

export default Voting;