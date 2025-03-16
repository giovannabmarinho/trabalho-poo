import { validate } from "bycontract";
import { Objeto, Item } from "../basicas/index.js";
import { ChaveGuardaRoupa, ChaveGaveta } from "./ItensDemo.js";

export class GuardaRoupa extends Objeto {
	constructor() {
		super("guarda_roupa");
	}

	usar(item) {
        validate(item, Item);
		if (item instanceof ChaveGuardaRoupa) {
			this.acaoOk = true;
			return true;
		}

		return false;
	}
}

export class PortaChaves extends Objeto {
	constructor() {
		super("porta_chaves");
	}

	inspecionar() {
		console.log("Você vê uma chave no porta chaves");
	}
}

export class Mesa extends Objeto {
	constructor() {
		super("mesa");
	}

	inspecionar() {
		console.log("Sache");
	}
}

export class ArmarioBanheiro extends Objeto {
	constructor() {
		super("armario_banheiro");
	}

	usar(item) {
        validate(item, Item);
		if (item instanceof ChaveGaveta) {
			this.acaoOk = true;
			return true;
		}
		return false;
	}

	inspecionar() {
		if (this.acaoOk) {
			console.log("É um armário com gavetas. Uma delas possui uma chave. As outras possuem produtos de higiene pessoal")
		} else {
			console.log("É um armário com gavetas. Uma delas está trancada. As outras possuem produtos de higiene pessoal")
		}
	}
}
