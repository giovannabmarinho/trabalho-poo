import { Item } from "../basicas/index.js";

export class ChaveGuardaRoupa extends Item {
	constructor() {
		super("chave_armario");
	}
}

export class ChaveGaveta extends Item {
	constructor() {
		super("chave_gaveta");
	}
}

export class SacheGato extends Item {
	constructor() {
		super("sache_gato");
	}
}

export class VarinhaGato extends Item {
	constructor() {
		super("varinha_gato");
	}
}

export class Lanterna extends Item {
	cargas = 20;

	constructor() {
		super("lanterna");
	}
}