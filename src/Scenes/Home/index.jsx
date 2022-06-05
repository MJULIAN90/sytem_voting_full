import React from "react";
import Admin from "../Admin";
import User from "../User";
import NavBar from "../NavBar";
import Ganador from "../Ganador";
import Voting from "../Voting";
import styles  from "./styles";
import useVotaciones from "../../Hooks/useVotaciones";

const Home = () => {
  const hook = useVotaciones();
    const {
     isAdmin,
    } = hook;

  return (
    <div >
      <div > {isAdmin ? <Admin {...hook} /> : <NavBar {...hook} />} </div>
      <div style={styles.container}>

        <div >
          <Voting {...hook} />
        </div>

        <div >
          <User {...hook} />
        </div>

        <div >
          <Ganador {...hook} />
        </div>

      </div>

    </div>

  );
};

export default Home;
