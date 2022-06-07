import Styles from "./Card.module.css";
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import useAlerts from "../../Hooks/useAlerts";
import style from "./style";

function Card({ imagen, item = undefined, voting, isWinner = false, isExistWinner  }) {
    const [show, setShown] = useState(false);
    const { votingUser } = useAlerts();

    const detailsCandidate = () => {
        votingUser(item[1], item[3], item[4], voting, isExistWinner)
    }

    const stylesCard = useSpring({
        transform: show ? "scale(1.1)" : isWinner ? "scale(0.8)" : "scale(1)",
        boxShadow: show
            ? "0 20px 25px rgb(0 0 0 / 25%)"
            : "0 2px 10px rgb(0 0 0 / 8%)"
    });

    return (
        <animated.div
            className={Styles.card}
            style={stylesCard}
            onMouseEnter={() => setShown(true)}
            onMouseLeave={() => setShown(false)}
        >
            <div >
                <img src={item ? item[4] : imagen} alt="" height={160} width={360} />
            </div>
            <h2 >
                {item ?
                    <>
                        {isWinner &&
                            <h6 style={{marginTop:-10, marginBottom:5}}>CANDIDATO GANADOR</h6>
                        }
                        <p style={{ fontSize: 18, fontWeight: "bold" }}>
                            {item[1]}
                        </p>
                    </>
                    : isExistWinner ? 'No disponible' : 'Disponible'}
            </h2>

            <div style={{ height: isWinner && 45 }}>
                {!isWinner ?
                    <button style={style.styleButton} onClick={detailsCandidate} disabled={!item } > Elegir </button>
                    :
                    <>{item && <p>{item[3]} </p>}

                    </>
                }
            </div>
        </animated.div>
    );
}

export default Card;
