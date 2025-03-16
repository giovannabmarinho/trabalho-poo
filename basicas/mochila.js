import { validate } from "bycontract";
import { Item } from "./item.js";

export class Mochila {
	#ferramentas;

	constructor(){
		this.#ferramentas = [];
	}

	guardar(item){
		validate(item, Item);
		this.#ferramentas.push(item);
	}

	pegar(nomeFerramenta){
		validate(arguments,["String"]);
		let ferramenta = this.#ferramentas.find(f => f.nome === nomeFerramenta);
		return ferramenta;
	}

	tem(nomeFerramenta){
		validate(arguments,["String"]);
		return this.#ferramentas.some(f => f.nome === nomeFerramenta);
	}

	inventario(){
		return this.#ferramentas.map(obj => obj.nome).join(", ");
	}
}