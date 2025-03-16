import {validate} from "bycontract";
import promptsync from 'prompt-sync';
import { Mochila } from "./mochila.js";
import { Sala } from "./sala.js";

const prompt = promptsync({sigint: true});

export class Engine {
	#mochila;
	#salaAtual;
	#fim;

	constructor(){
		this.#mochila = new Mochila();
		this.#salaAtual = null;
		this.#fim = false;
		this.criarCenario();
	}

	get mochila(){
		return this.#mochila;
	}

	get salaAtual(){
		return this.#salaAtual;
	}

	set salaAtual(sala){
		validate(sala, Sala);
		this.#salaAtual = sala;
	}

	indicarFimDeJogo(){
		this.#fim = true;
	}

	// Para criar um jogo deriva-se uma classe a partir de
	// Engine e se sobrescreve o método "criaCenario"
	criarCenario() {}

	// Para poder acionar o método "jogar" deve-se garantir que 
	// o método "criarCenario" foi acionado antes
	jogar() {
		while (!this.#fim) {
			console.log("-------------------------");
			console.log(this.salaAtual.textoDescricao());
			const acao = prompt("O que voce deseja fazer? ");
			const tokens = acao.split(" ");
			switch (tokens[0]) {
				case "fim":
					this.#fim = true;
					break;
				case "pegar":
					if (this.salaAtual.pegar(tokens[1])) {
						console.log("Ok! " + tokens[1] + " guardado!");
					} else {
						console.log("Item " + tokens[1] + " não encontrado.");
					}
					break;
				case "inventario":
					console.log("Itens disponéveis para serem usados: " + this.#mochila.inventario());
					break;
				case "usar":
						if (this.salaAtual.usar(tokens[1], tokens[2])) {
							console.log("Feito !!");
							if (this.#fim == true){
								console.log("Parabens, voce venceu!");
							}
						} else {
							console.log("Não é possível usar " + tokens[1] + "sobre" + tokens[2] + " nesta sala");
						}
					break;
				case "ir":
					const novaSala = this.salaAtual.ir(tokens[1]);
					if (novaSala == null) {
						console.log("Sala desconhecida ...");
					} else {
						this.#salaAtual = novaSala;
					}
					break;
				default:
					console.log("Comando desconhecido: " + tokens[0]);
					break;
			}
		}

		console.log("Jogo encerrado!");
	}
}