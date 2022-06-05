import { colors } from "../../../../Assets";

export const stylesView1 = {
    container: { 
        textAlign: "center", 
        fontWeight: 'bold' 
    },
    containerForm: { 
        display: 'flex', 
        justifyContent: "center", 
        marginTop: 60, 
        marginBottom: 20 
    },
    styleInput:{
        maxWidth: 150, 
        height: 40,
        borderRadius: 5
    },
    styleButton:{
        borderRadius: 5, 
        borderColor: "white",
        background: colors.buttonBlue,
        color: "white"
    }
};

export const stylesView2 = {
    container: {
        justifyContent: "center", 
        display: "flex", 
        textAlign: "center"
    },
    containerText: { 
        display: "flex", 
        flexDirection: "column", 
        textAlign: "center", 
        fontWeight: "bold" 
    },
};

export const stylesView3 = {
    containerViews: {
        height: 140,
        display: "grid",
        gridTemplateColumns: '1fr 1fr 1fr'
    }
};

