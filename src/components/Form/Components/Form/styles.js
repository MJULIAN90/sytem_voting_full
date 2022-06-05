import { colors } from "../../../../Assets";

const styles = {
    container:{
        display: "flex", 
        justifyContent: "center"
    },
    containerLabels:{
        display: "flex", 
        flexDirection: "column", 
        textAlign: "left", 
        margin: 5,
    },
    containerInputs:{
        display: "flex", 
        flexDirection: "column", 
        margin: 5,
    },
    stylesInput1:{
        margin: 3, 
        height: 30, 
        borderRadius: 5,
    },
    stylesTextarea:{
        margin: 3, 
        height: 60, 
        borderRadius: 5, 
        borderColor: "black",
    },
    stylesButton:{
        borderRadius: 5, 
        borderColor: "white", 
        background: colors.buttonBlue, 
        color: "white", 
        height: 40, 
        marginTop: 10, 
        marginBottom: 20
    }
}

export default styles;