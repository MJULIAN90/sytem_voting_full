// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 < 0.9.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Votaciones{

    //Direccion del propietario del contrato
    address public owner;
    bool public statusVotaciones;
    string public winnerCandidate;

    constructor (){
        owner = msg.sender;
        statusVotaciones= true;
        winnerCandidate = "";
    }

    //Estructura del candidato
    struct Candidato {
      bytes32 idCandidato;
      string nombre;
      uint edad;
      string resumen;
      string imagenUrl;
    }

    //Relacion entre nombre de candidato y el hash de sus datos 
    mapping (address => Candidato) idCandidato;

    //Relacion entre el nombre del candidato y el numero de votos
    mapping (string => uint ) votosCandidatos;

    //Lista para almacenar los nombres de los candidatos 
    address [] candidatos;

    //Lista de los hashes de la identidad de los votantes
    bytes32 [] votantes;

    event incripcion(string, string);
    event voting(string, string);
    event candidatoGanadorEvent(string);

    modifier onlyOwner {
        require(msg.sender == owner, "No tienes los permisos necesarios para ejecutar esta funcion");
        _;
    }

    //Cualquier persona puede usar esta funcion para presentarse a las elecciones
    function representar (string memory _nombrePersona, uint _edadPersona , string memory _idPersona, string memory _resumen, string memory _imgUrl)
    public {

        //Validamos que las votaciones este abiertas
        require( statusVotaciones == true, "Las votaciones estan cerradas");

        require( keccak256(abi.encodePacked(idCandidato[msg.sender].nombre)) == keccak256(abi.encodePacked("")) , "Solo se permite una inscripcion por persona");

        //Hash de los datos del candidato
        bytes32 hashCandidato = keccak256(abi.encodePacked(_nombrePersona, _edadPersona , _idPersona ));

        //Almacenamos los datos del candidato ligado a su addres
        idCandidato[ msg.sender ] = Candidato(hashCandidato, _nombrePersona, _edadPersona, _resumen, _imgUrl);

        //Almacenamos el nombre del candidato
        candidatos.push (msg.sender);

        emit incripcion('Candidato Inscrito', _nombrePersona);
    }

    //Permite obtener los datos de la persona buscada
    function detallesCandidato (address _idCandidato ) public view returns(bytes32, string memory, uint, string memory, string memory) {
        return (idCandidato[_idCandidato].idCandidato, idCandidato[_idCandidato].nombre, idCandidato[_idCandidato].edad, idCandidato[_idCandidato].resumen, idCandidato[_idCandidato].imagenUrl) ;
    }

    //Permite visualizar las personas que se han presentado como candidatos a las votaciones
    function verCandidatos ()public view returns (address [] memory){
        //Devuelve la lista de los candidatos presentados
        return candidatos;
    }

    //los votantes van a poder votar
    function votar (string memory _candidato) public{

        //Validamos que las votaciones este abiertas
        require( statusVotaciones == true, "Las votaciones estan cerradas");

        //Hash de la direccion de la persona que ejecuta esta funcion
        bytes32 hashVotante = keccak256(abi.encodePacked(msg.sender));

        //verficamos si el votante ya ha votado
        for (uint i=0; i<votantes.length; i++){
            require(votantes[i] != hashVotante, "Ya has votado previamente");
        }

        //Almacenamos el hash del votante dentro del array de votantes
        votantes.push(hashVotante);
        
        //Anadimos un voto el candidato seleccionado
        votosCandidatos[_candidato]++ ;

        emit voting('Has votado por', _candidato);
    }

    //Dado el nombre de un candidato nos devuelve el numero de votos que tiene 
    function verVotos(string memory _candidato) public view returns(uint){
        //Devolviendo el numero de votos del candidato
        return votosCandidatos[_candidato];
    }

    //Ver los votos de cada uno de los candidatos
    function verResultados() public view returns(string memory){
        //Guardamos en una variable string los candidatos con sus respectivos votos
        string memory resultados = "";

        //Recorremos el array de candidatos para actualizar el string resultados
        for (uint i=0; i<candidatos.length; i++){
            //Actualizamos el string resultados y anadimos el candidato que ocupa la posicion "i" del array candidatos
            resultados = string(abi.encodePacked ( resultados , "", idCandidato [candidatos[i]].nombre, ",", Strings.toString(verVotos(idCandidato [candidatos[i]].nombre)), "-"));
        }
        // Devolvemos los resultados
        return resultados;
    }

    //Proporcionar el nombre del candidato ganador
    function candidatoGanador() onlyOwner public {
        
        //Revisamos que tengamos candidatos en las votaciones
        require( candidatos.length > 0 , "No tenemos candidatos disponibles");

        // Si ya se eligio un ganador no es necesario nuevamente
        require( statusVotaciones == true , "Las votaciones se han cerrado");

        //La variable ganador contendra el nombre del candidato ganador
        string memory ganador = idCandidato [candidatos[0]].nombre;
        string memory nuevoGanador = '';
        string memory antiguoGanador = '';
        statusVotaciones = false;

        //Recorremos el array de candidatos para determinar el candidato con un numero de votos mayor
        for (uint i=1; i<candidatos.length; i++){
            if(votosCandidatos[ganador] <= votosCandidatos[idCandidato [candidatos[i]].nombre]){
                antiguoGanador = ganador;
                nuevoGanador = idCandidato [ candidatos[i]].nombre;
                ganador = nuevoGanador;
            }
        }

        if ( bytes(nuevoGanador).length  >  0){
            if(votosCandidatos[nuevoGanador] == votosCandidatos[antiguoGanador]){
                ganador = "Hay empate entre los candidatos";
            }
        }

        winnerCandidate = ganador;

        emit candidatoGanadorEvent(ganador);
    }
}