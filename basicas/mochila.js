import { validate } from "bycontract";
import { Item } from "./item.js";

export class Mochila {
	#itens;

	constructor(){
		this.#itens = [];
	}

	guardar(item){
		validate(item, Item);
		this.#itens.push(item);
	}

	remover(item) {
		validate(item, Item);
		this.#itens = this.#itens.filter(i => i != item);
	}

	pegar(nomeItem){
		validate(arguments,["String"]);
		return this.#itens.find(item => item.nome === nomeItem);
	}

	tem(nomeItem){
		validate(arguments,["String"]);
		return this.#itens.some(item => item.nome === nomeItem);
	}

	inventario(){
		return this.#itens.map(item => item.nome).join(", ");
	}
}