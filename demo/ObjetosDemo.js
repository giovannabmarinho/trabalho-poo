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

	inspecionar() {
		return "Miauuuuuuu";
	}
}

export class PortaChaves extends Objeto {
	constructor() {
		super("porta_chaves");
	}

	inspecionar() {
		return "Você vê duas chaves no porta chaves";
	}
}

export class Mesa extends Objeto {
	constructor() {
		super("mesa");
	}

	inspecionar() {
		return "Há um sachê para gatos em cima dela.";
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
		return "É um armário com gavetas.";
	}
}
