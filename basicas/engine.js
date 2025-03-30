import { validate } from "bycontract";
import promptsync from 'prompt-sync';
import { Mochila } from "./mochila.js";
import { Sala } from "./sala.js";
import { GuardaRoupa } from "../jogo/Objetos.js"

const prompt = promptsync({ sigint: true });

function sleep(tempo) {
	return new Promise(resolve => {
		setTimeout(resolve, tempo);
	});
}

// Ações disponíveis para o jogador
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
	#vidasPorco;

	constructor() {
		this.#mochila = new Mochila();
		this.#salaAtual = null;
		this.#fim = false;
		this.#vidasPorco = 30;
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

	#desgastarLanterna() {
		const lanterna = this.#mochila.pegar("lanterna")
		if (lanterna) {
			lanterna.cargas -= 1;
		}
	}

	#diminuirVidasPorco() {
		this.#vidasPorco -= 1;
	}

	#getCargasLanterna() {
		const lanterna = this.#mochila.pegar("lanterna")
		if (lanterna) {
			return lanterna.cargas;
		}
	}

	// Para criar um jogo deriva-se uma classe a partir de
	// Engine e se sobrescreve o método "criarCenario"
	criarCenario() { }

	async fimDeJogo() {
		console.log("Você ouve um miado de tristeza")
		await sleep(2000)
		console.log("Outro miado, porém mais baixo")
		await sleep(2000)
		console.log("Você corre até o quarto de onde vem o miado e grita pelo seu gato, mas não recebe nenhuma resposta")
		await sleep(5000)
		console.log("Porco será lembrado para sempre com muito carinho")
	}

	// Para poder acionar o método "jogar" deve-se garantir que 
	// o método "criarCenario" foi acionado antes
	async jogar() {
		// Descrição de introdução inicial do jogo ao jogador
		console.log("Você chega em sua casa, liga a luz da sala e vê um bilhete. No bilhete está escrito:\nOie, não achei o Porco. Vê se ele tá escondido por aí. Logo voltamos.\n- Mãe") ;

		// Loop de lógica básica do jogo
		while (!this.#fim) {

			if (this.#vidasPorco < 1) {
				await this.fimDeJogo();
				this.#fim = true
				break
			}

			console.log("-------------------------");

			const cargasLanterna = this.#getCargasLanterna();

			console.log(this.salaAtual.textoDescricao(cargasLanterna > 0));

			if (cargasLanterna !== undefined) {
				console.log("Você tem " + cargasLanterna  + " cargas na sua lanterna");
			}

			const acoes = Object.values(Acao).join(", ")

			const acao = prompt(`O que voce deseja fazer (${acoes})? `);
			const tokens = acao.split(" ");

			switch (tokens[0]) {
				// Finalizar o jogo
				case Acao.Fim:
					this.#fim = true;
					break;

				// Pegar um objeto que está na sala atual
				case Acao.Pegar:
					const itemPegar = this.salaAtual.pegar(tokens[1])
					if (itemPegar != null) {
						this.#mochila.guardar(itemPegar);
						console.log("Ok! " + tokens[1] + " guardado!");
					} else {
						console.log("Item " + tokens[1] + " não encontrado.");
					}
					break;

				// Visualizar inventário do jogador
				case Acao.Inventario:
					console.log("Itens disponíveis para serem usados: " + this.#mochila.inventario());
					break;
				
				// Usar um item em algum objeto que está na sala atual
				case Acao.Usar:
					const itemUsar = this.mochila.pegar(tokens[1]);

					if (!itemUsar) {
						console.log("Item nâo encontrado")
						break;
					}

					if (!tokens[2]) {
						console.log("É necessário dizer onde você quer usar o item. Ex: 'usar item_da_mochila objeto_da_sala'")
						break;
					}

					const [usou, objeto] = this.salaAtual.usar(itemUsar, tokens[2])

					if (usou) {
						this.mochila.remover(itemUsar);
						console.log("Objeto usado com sucesso!");

						// Condição de vitória do Jogo
						if (objeto instanceof GuardaRoupa) {
							this.#fim = true;
							console.log("Parabéns, você salvou seu gato, o Porco!");
						}
					} else {
						console.log("Não é possível usar " + tokens[1] + "sobre" + tokens[2] + " nesta sala");
					}
					break;

				// Ir para outra sala
				case Acao.Ir:
					const novaSala = this.salaAtual.ir(tokens[1]);
					if (novaSala == null) {
						console.log("Sala desconhecida...");
					} else {
						this.#salaAtual = novaSala;
						this.#desgastarLanterna();
						this.#diminuirVidasPorco();
					}
					break;

				// Inspecionar objeto que está na sala atual
				case Acao.Inspecionar:
					this.salaAtual.inspecionar(tokens[1]);
					break;

				// Caso de outro comando desconhecido inserido
				default:
					console.log("Comando desconhecido: " + tokens[0]);
					break;
			}
		}
	}
}