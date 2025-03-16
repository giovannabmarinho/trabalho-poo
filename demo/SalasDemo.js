import { validate } from "bycontract";
import { Sala, Engine } from "../basicas/index.js";
import { ChaveGaveta, ChaveGuardaRoupa } from "./ItensDemo.js";
import { GuardaRoupa, PortaChaves, ArmarioBanheiro } from "./ObjetosDemo.js";

export class QuartoPais extends Sala {
	constructor(engine) {
        validate(engine,Engine);
		super("QuartoPais",engine);
        let martelo = new ChaveGaveta();
		this.ferramentas.set(martelo.nome,martelo);
	}

	usar(ferramenta,objeto) {
		validate(arguments,["String","String"]);
		return false;
	}
}

export class SalaDeEstar extends Sala {
	constructor(engine) {
        validate(engine,Engine);
		super("Sala_de_Estar",engine);
        let armario = new GuardaRoupa();
		this.objetos.set(armario.nome,armario);
	}

	usa(ferramenta,objeto) {
		validate(arguments,["String","String"]);
		if (!this.engine.mochila.tem(ferramenta)){
			return false;
		}
		if (!this.objetos.has(objeto)){
			return false;
		}
        let armario = this.objetos.get(objeto);
		return armario.usar(this.engine.mochila.pega(ferramenta));
	}
}

export class Banheiro extends Sala {
	constructor(engine) {
        validate(engine,Engine);
		super("Banheiro",engine);

		const chave = new ChaveGuardaRoupa();
		this.ferramentas.set(chave.nome,chave);

        const armario = new ArmarioBanheiro();
        this.objetos.set(armario.nome,armario);
	}

	usa(ferramenta,objeto) {
		validate(arguments,["String","String"]);
		return false;
	}
}

export class Cozinha extends Sala {
	constructor(engine) {
        validate(engine,Engine);
		super("Cozinha",engine);
        let poteAcucar = new PortaChaves();
		this.objetos.set(poteAcucar.nome,poteAcucar);
        let poteArroz = new ArmarioBanheiro;
		this.objetos.set(poteArroz.nome,poteArroz);
	}

	usa(ferramenta,objeto) {
		validate(arguments,["String","String"]);
		if (!this.engine.mochila.tem(ferramenta)){
			return false;
		}
		if (!this.objetos.has(objeto)){
			return false;
		}
        let pote = this.objetos.get(objeto);
		let usou = pote.usar(this.engine.mochila.pega(ferramenta));
		if (pote instanceof PortaChaves && usou == true){
			this.engine.indicaFimDeJogo();
		}
		return usou;
	}
}
