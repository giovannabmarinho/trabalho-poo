import { validate } from "bycontract";
import { Engine } from "./engine.js";

export class Sala {
	#nome;
	#objetos;
	#itens;
	#portas;
	
	constructor(nome) {
		validate(arguments,["String",Engine]);
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
		validate(nomeItem,"String");
		const item = this.itens.get(nomeItem);
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

	usar(item, objeto){
		return false;
	}
}