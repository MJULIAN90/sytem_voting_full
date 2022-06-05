const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

let hardhatVoting;
let contract;
let adminControl;
let candidate1;
let candidate2;
let person1;
let person2;
let resultCandidate1;
let resultCandidate2;

beforeEach(async function () {
  contract = await ethers.getContractFactory("Votaciones");
  [adminControl, candidate1, candidate2, person1, person2] = await ethers.getSigners();
  hardhatVoting = await contract.deploy();
  
  resultCandidate1 = await hardhatVoting.connect(candidate1).representar('candidate1', 30, 'cc1020', 'resumen1', 'img1');
  resultCandidate2 = await hardhatVoting.connect(candidate2).representar('candidate2', 35, 'cc2030', 'resumen2', 'img2');
});

describe("Ver candidatos", function () {

  it("Deberia tener dos candidatos", async function () {
    let candidates = await hardhatVoting.verCandidatos();
    expect(candidates[0]).to.eq(await candidate1.getAddress());
    expect(candidates[1]).to.eq(await candidate2.getAddress());
  });

});

describe("Votar", async function  () {

  it("Se crea un voto", async function () {
    let votando = await hardhatVoting.connect(person1).votar('candidate1');
    let respuestaVoto = await votando.wait()
    let mensajeVotando = respuestaVoto.logs[0].data;
    let decodingObject = new ethers.utils.AbiCoder();
    let decodingMensaje = await decodingObject.decode(
      ["string", "string"],
      mensajeVotando
    )

    expect(decodingMensaje[0]).to.eq('Has votado por')
    expect(decodingMensaje[1]).to.eq('candidate1')
  });

  it("Retorna un error de voto duplicado", async function () {
    try {
      await hardhatVoting.connect(person1).votar('candidate1');
      await hardhatVoting.connect(person1).votar('candidate1');
    } catch (err) {
      assert.include(err.message, 'Ya has votado previamente')
    }
  });

});


describe("Ver votos ", async function () { 

  it("el candidato2 tiene dos votos.", async function () {
    await hardhatVoting.connect(person1).votar('candidate2');
    await hardhatVoting.connect(person2).votar('candidate2');
    let candidates = await hardhatVoting.verVotos('candidate2');
    expect(candidates.toString()).to.eq('2');
  });

  it("el candidato1 tiene 0 votos.", async function () {
    await hardhatVoting.connect(person1).votar('candidate2');
    await hardhatVoting.connect(person2).votar('candidate2');
    let candidates = await hardhatVoting.verVotos('candidate1');

    expect(candidates.toString()).to.eq('0');
  });

});


describe("Ver resultados ", async function () {

  it("Retorna los resultados de los candidatos.", async function () {
    await hardhatVoting.connect(person1).votar('candidate2');
    await hardhatVoting.connect(person2).votar('candidate2');
    let resultados = await hardhatVoting.verResultados();

    assert.include(resultados, 'candidate2,2');
    assert.include(resultados, 'candidate1,0');
  });

});

describe("Candidato ganador ", async function () {

  it("Retorna un candidato ganador.", async function () {
    await hardhatVoting.connect(person1).votar('candidate2');
    await hardhatVoting.connect(person2).votar('candidate2');
    let resultados = await hardhatVoting.connect(adminControl).candidatoGanador();

    let respuestaGanador= await resultados.wait()
    let mensajeGanador = respuestaGanador.logs[0].data;
    let decodingObject = new ethers.utils.AbiCoder();
    let decodingMensaje = await decodingObject.decode(
      ["string", "string"],
      mensajeGanador
    )

    expect(decodingMensaje[0]).to.eq('candidate2');
  });

  it("Retorna un empate entre candidatos.", async function () {
    await hardhatVoting.connect(person1).votar('candidate2');
    await hardhatVoting.connect(person2).votar('candidate1');
    let resultados = await hardhatVoting.connect(adminControl).candidatoGanador();

    let respuestaGanador = await resultados.wait()
    let mensajeGanador = respuestaGanador.logs[0].data;
    let decodingObject = new ethers.utils.AbiCoder();
    let decodingMensaje = await decodingObject.decode(
      ["string", "string"],
      mensajeGanador
    )

    expect(decodingMensaje[0]).to.eq('Hay empate entre los candidatos');
  });

});

