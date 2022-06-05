import React from 'react';
import { View1, View2, View3 } from './components';
import styles from "./styles";


const Ganador = (props) => {
  const {
    infoWinner,
    resultsCandidates,
    isExistWinner,
    seeVoting
  } = props;

  const searchVotes = (event) => {
    event.preventDefault()
    seeVoting(event.target[0].value)
  }

  return (
    <div style={{ width: "100%" }}>
      <div style={styles.containerViews}>
        <View1 searchVotes={searchVotes} />
        <View2 isExistWinner={isExistWinner} infoWinner={infoWinner} />
        <View3 isExistWinner={isExistWinner} resultsCandidates={resultsCandidates} />
      </div>
    </div>
  );
}

export default Ganador;