import { validate } from "bycontract";
import { Sala, Engine } from "../basicas/index.js";
import { ChaveGaveta, ChaveGuardaRoupa, SacheGato } from "./ItensDemo.js";
import { GuardaRoupa, PortaChaves, ArmarioBanheiro } from "./ObjetosDemo.js";

export class QuartoPais extends Sala {
	constructor(engine) {
        validate(engine,Engine);
		super("QuartoPais",engine);
        
		const guardaRoupa = new GuardaRoupa();
		this.objetos.set(guardaRoupa.nome, guardaRoupa);
	}

	usar(item, objeto) {
		validate(arguments,["String","String"]);
		return false;
	}
}

export class SalaDeEstar extends Sala {
	constructor(engine) {
        validate(engine,Engine);
		super("Sala_de_Estar",engine);
        
		const portaChaves = new PortaChaves();
		this.objetos.set(portaChaves.nome,portaChaves);
	}

	usar(item, objeto) {
		validate(arguments,["String","String"]);
		if (!this.engine.mochila.tem(item)){
			return false;
		}
		if (!this.objetos.has(objeto)){
			return false;
		}
        let armario = this.objetos.get(objeto);
		return armario.usar(this.engine.mochila.pega(item));
	}
}

export class Banheiro extends Sala {
	constructor(engine) {
        validate(engine,Engine);
		super("Banheiro",engine);

		const chave = new ChaveGuardaRoupa();
		this.itens.set(chave.nome,chave);

        const armario = new ArmarioBanheiro();
        this.objetos.set(armario.nome,armario);
	}

	usar(item, objeto) {
		validate(arguments,["String","String"]);
		return false;
	}
}

export class Cozinha extends Sala {
	constructor(engine) {
        validate(engine,Engine);
		super("Cozinha",engine);
        
		const sache = new SacheGato();
		this.itens.set(sache.nome, sache);
	}

	usar (item,objeto) {
		validate(arguments,["String","String"]);
		if (!this.engine.mochila.tem(item)){
			return false;
		}
		if (!this.objetos.has(objeto)){
			return false;
		}
        let pote = this.objetos.get(objeto);
		let usou = pote.usar(this.engine.mochila.pega(item));
		if (pote instanceof PortaChaves && usou == true){
			this.engine.indicaFimDeJogo();
		}
		return usou;
	}
}
