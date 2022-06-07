import { ethers } from "ethers";
import { useState, useEffect } from "react";
import Votaciones from "../artifacts/contracts/Votaciones.sol/Votaciones.json";
import useAlerts from "./useAlerts";

const useVotaciones = () => {
    const { alert } = useAlerts();
    const addressContract = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(addressContract, Votaciones.abi, signer);
    const decodingObject = new ethers.utils.AbiCoder();

    const [winner, setWinner] = useState('');
    const [quantityVotes, setquantityVotes] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [listCandidate, setlistCandidate] = useState([])
    const [infoWinner, setInfoWinner] = useState(undefined)
    const [resultsCandidates, setResultsCandidates] = useState([])
    const [isExistWinner, setIsExistWinner] = useState(false)
    const [flag, setFlag] = useState(false)

    useEffect(() => {
        window.ethereum.on("accountsChanged", () => {
            window.location.reload();
        })
    }, [])

    useEffect(() => {
        getCandidates()
    }, [flag])

    useEffect(() => {
        getAdmin()
    }, [])

    useEffect(() => {
        getResults()
    }, [winner])

    useEffect(() => {
        findWinner()
    }, [winner])



    const getAdmin = async () => {
        let addressowner = await contract.owner();
        addressowner === (await signer.getAddress())
            ? setIsAdmin(true)
            : setIsAdmin(false);
    }

    const getWinner = async () => {
        try {
            const dataWinner = await contract.candidatoGanador();
            let resultTransaction = await dataWinner.wait();
            let mensaje = resultTransaction.logs[0].data;
            let decodingMensaje = decodingObject.decode(
                ["string"],
                mensaje
            )
            setWinner(decodingMensaje[0])

            return alert(decodingMensaje[0] === 'Hay empate entre los candidatos' ? `${decodingMensaje[0]}` : `Felicidades al ganador ${decodingMensaje[0]}`, 'sucess');

        } catch (error) {
            return alert(error.message.split("'")[1], 'error')
        }
    }

    const getCandidates = async () => {
        let dataCandidatos = await contract.verCandidatos()
        const response = await Promise.all(dataCandidatos.map(async (candidatoId) => await contract.detallesCandidato(candidatoId)));
        setlistCandidate(response)
        return response;
    }

    const findWinner = async () => {
        let isCloseVoting = await contract.statusVotaciones()

        setIsExistWinner(!isCloseVoting)

        if (!isCloseVoting) {
            let list = await getCandidates()
            const nameWinner = await contract.winnerCandidate();

            if (nameWinner !== 'Hay empate entre los candidatos') {
                let info = list.find(person => nameWinner === person[1])
                return setInfoWinner(info)
            } else {
                setInfoWinner('Hay empate entre los candidatos')
            }
        }
    }

    const participateCandidate = async (dataEvent, img) => {
        try {
            const { target: [name, edad, id, resumen] } = dataEvent
            let result = await contract.representar(name.value, parseInt(edad.value), id.value, resumen.value, img)
            let resultTransaction = await result.wait();
            let mensaje = resultTransaction.logs[0].data;
            let decodingMensaje = await decodingObject.decode(
                ["string", "string"],
                mensaje
            )
            setFlag(!flag)
            return alert(decodingMensaje[0], 'success')

        } catch (error) {
            if (error.message.split("'").length === 1) {
                return alert('Error firmando transaccion', 'error')
            }

            return alert(error.message.split("'")[1], 'error')
        }
    }

    const voting = async (name) => {
        try {
            const votingUser = await contract.votar(name)
            let resultTransaction = await votingUser.wait();
            let mensaje = resultTransaction.logs[0].data;
            let decodingMensaje = decodingObject.decode(
                ["string", "string"],
                mensaje
            )
            return alert(`${decodingMensaje[0]} ${decodingMensaje[1]}`, 'sucess')
        } catch (error) {
            return alert(error.message.split("'")[1], 'info')
        }
    }

    const seeVoting = async (name) => {
        let info = listCandidate.find(person => name === person[1])

        if (!info) return alert('No existe candidato con ese nombre', 'info')

        else {
            const results = await contract.verVotos(name);
            setquantityVotes(results.toString())

            return alert(`El candidato ${name} tiene ${results.toString()} votos`, 'info')
        }
    }

    const getResults = async () => {
        const results = await contract.verResultados();
        let a = results.split('-')
        let b = a.map(item => {
            let data = item.split(',')
            let user = data[0]
            let votes = data[1]
            return { user, votes }
        })
        b = b.slice(0, b.length -1 )
        b = b.sort((a, b) => (a.votes < b.votes ? 1 : -1))
        setResultsCandidates(b)
    }

    return {
        winner,
        quantityVotes,
        isAdmin,
        listCandidate,
        infoWinner,
        resultsCandidates,
        isExistWinner,
        participateCandidate,
        getCandidates,
        voting,
        seeVoting,
        getResults,
        getWinner,
    }
};

export default useVotaciones;
