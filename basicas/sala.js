import { validate } from "bycontract";
import { Item } from "./item.js";

export class Sala {
	#nome;
	#objetos;
	#itens;
	#portas;
	
	constructor(nome) {
		validate(nome, "String");
		this.#nome = nome;
		this.#objetos = new Map();
		this.#itens = new Map();
		this.#portas = new Map();
	}

	get nome() {
		return this.#nome;
	}
	
	get objetos() {
		return this.#objetos;
	}

	get itens() {
		return this.#itens;
	}
	
	get portas(){
		return this.#portas;
	}

    adicionarPorta(sala) {
        validate(sala, Sala);
        this.portas.set(sala.nome, sala);
    }
	
	objetosDisponiveis(){
		const objetos = [...this.#objetos.values()];
    	return objetos.map(obj=>obj.nome).join(", ");
	}

	itensDisponiveis(){
		const itens = [...this.#itens.values()];
    	return itens.map(f=>f.nome).join(", ");
	}
	
	portasDisponiveis(){
		let arrPortas = [...this.#portas.values()];
    	return arrPortas.map(sala=>sala.nome).join(", ");
	}
	
	pegar(nomeItem) {
		validate(nomeItem, "String");
		const item = this.itens.get(nomeItem);

		// Caso o item tenha sido encontrado nessa sala, retornamos ele e removemos ele da sala
		if (item != null) {
			this.itens.delete(nomeItem);
			return item;
		} else {
			return null;
		}
	}

	ir(porta) {
		validate(porta,"String");
		return this.#portas.get(porta);
	}

	textoDescricao() {
		let descricao = `Você está em ${this.nome}\n`;

        if (this.#objetos.size == 0){
            descricao += "Objetos: não há objetos na sala\n";
        } else {
            descricao += "Objetos: "+this.objetosDisponiveis()+"\n";
        }
		
        if (this.#itens.size == 0){
            descricao += "Itens: não há itens na sala\n";
        } else {
            descricao += "Itens: "+this.itensDisponiveis()+"\n";
        }

        descricao += "Portas: "+this.portasDisponiveis()+"\n";

		return descricao;
	}

	/**
	 * 
	 * @param {*} item - Instância da classe Item que será usado em algum objeto dessa sala
	 * @param {*} nomeObjeto - nome do objeto que será buscado nessa sala
	 * @returns  [Boolean, Objeto]
	 */
	usar(item, nomeObjeto) {
		validate(arguments, [Item, "String"]);

		const objeto = this.objetos.get(nomeObjeto);

		if (!objeto) {
			return [false, undefined];
		}

		const usou = objeto.usar(item);

		return [usou, objeto];
	}

	inspecionar(nomeObjeto) {
		validate(arguments, ["String"]);

		const objeto = this.objetos.get(nomeObjeto);

		if (!objeto) {
			console.log("Item nâo encontrado");
		} else {
			console.log(objeto.inspecionar());
		}
	}
}