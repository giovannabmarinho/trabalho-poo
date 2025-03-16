import { validate } from "bycontract";
import { Sala, Engine, Item } from "../basicas/index.js";
import { ChaveGaveta, ChaveGuardaRoupa, SacheGato } from "./ItensDemo.js";
import { GuardaRoupa, PortaChaves, ArmarioBanheiro, Mesa } from "./ObjetosDemo.js";

export class QuartoPais extends Sala {
	constructor() {
		super("quarto_pais");
        
		const guardaRoupa = new GuardaRoupa();
		this.objetos.set(guardaRoupa.nome, guardaRoupa);
	}
}

export class SalaDeEstar extends Sala {
	constructor() {
		super("sala_de_estar");
        
		const portaChaves = new PortaChaves();
		this.objetos.set(portaChaves.nome,portaChaves);

		const chaveGuardaRoupa = new ChaveGuardaRoupa();
		this.itens.set(chaveGuardaRoupa.nome, chaveGuardaRoupa);
	
		const chaveArmario = new ChaveGaveta();
		this.itens.set(chaveArmario.nome, chaveArmario);
	}
}

export class Banheiro extends Sala {
	constructor() {
		super("banheiro");

        const armario = new ArmarioBanheiro();
        this.objetos.set(armario.nome,armario);
	}
}

export class Cozinha extends Sala {
	constructor() {
		super("cozinha");
        
		const sache = new SacheGato();
		this.itens.set(sache.nome, sache);

		const mesa = new Mesa();
		this.objetos.set(mesa.nome, mesa);
	}
}
