import { validate } from "bycontract";
import promptsync from 'prompt-sync';
import { Mochila } from "./mochila.js";
import { Sala } from "./sala.js";
import { GuardaRoupa } from "../demo/ObjetosDemo.js"

const prompt = promptsync({ sigint: true });

const Acao = {
	Ir: 'ir',
	Fim: 'fim',
	Usar: 'usar',
	Inventario: 'inventario',
	Pegar: 'pegar',
	Inspecionar: 'inspecionar'
};

export class Engine {
	#mochila;
	#salaAtual;
	#fim;

	constructor() {
		this.#mochila = new Mochila();
		this.#salaAtual = null;
		this.#fim = false;
		this.criarCenario();
	}

	get mochila() {
		return this.#mochila;
	}

	get salaAtual() {
		return this.#salaAtual;
	}

	set salaAtual(sala) {
		validate(sala, Sala);
		this.#salaAtual = sala;
	}

	indicarFimDeJogo() {
		this.#fim = true;
	}

	// Para criar um jogo deriva-se uma classe a partir de
	// Engine e se sobrescreve o método "criaCenario"
	criarCenario() { }

	// Para poder acionar o método "jogar" deve-se garantir que 
	// o método "criarCenario" foi acionado antes
	jogar() {

		console.log("");

		while (!this.#fim) {
			console.log("-------------------------");
			console.log(this.salaAtual.textoDescricao());

			const acoes = Object.values(Acao).join(", ")

			const acao = prompt(`O que voce deseja fazer (${acoes})? `);
			const tokens = acao.split(" ");

			switch (tokens[0]) {
				case Acao.Fim:
					this.#fim = true;
					break;
				case Acao.Pegar:
					const itemPegar = this.salaAtual.pegar(tokens[1])
					if (itemPegar != null) {
						this.#mochila.guardar(itemPegar);
						console.log("Ok! " + tokens[1] + " guardado!");
					} else {
						console.log("Item " + tokens[1] + " não encontrado.");
					}
					break;
				case Acao.Inventario:
					console.log("Itens disponíveis para serem usados: " + this.#mochila.inventario());
					break;
				case Acao.Usar:
					const itemUsar = this.mochila.pegar(tokens[1]);

					if (!itemUsar) {
						console.log("Item nâo encontrado")
						break;
					}

					const [usou, objeto] = this.salaAtual.usar(itemUsar, tokens[2])

					if (usou) {
						console.log("Feito !!");

						if (objeto instanceof GuardaRoupa) {
							this.#fim = true;
							console.log("Parabéns, você salvou seu gato Porco!");
						}
					} else {
						console.log("Não é possível usar " + tokens[1] + "sobre" + tokens[2] + " nesta sala");
					}
					break;
				case Acao.Ir:
					const novaSala = this.salaAtual.ir(tokens[1]);
					if (novaSala == null) {
						console.log("Sala desconhecida ...");
					} else {
						this.#salaAtual = novaSala;
					}
					break;
				case Acao.Inspecionar:
					this.salaAtual.inspecionar(tokens[1]);
					break;
				default:
					console.log("Comando desconhecido: " + tokens[0]);
					break;
			}
		}

		console.log("Jogo encerrado!");
	}
}