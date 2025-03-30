import { Sala } from "../basicas/index.js";
import { ChaveGaveta, ChaveGuardaRoupa, Lanterna, SacheGato, VarinhaGato } from "./Itens.js";
import { GuardaRoupa, PortaChaves, ArmarioBanheiro, Mesa, CaixaFerramentas } from "./Objetos.js";

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
	
		const chaveArmario = new ChaveGaveta();
		this.itens.set(chaveArmario.nome, chaveArmario);
	}
}

export class Banheiro extends Sala {
	constructor() {
		super("banheiro");

        const armario = new ArmarioBanheiro();
        this.objetos.set(armario.nome,armario);

		const chaveGuardaRoupa = new ChaveGuardaRoupa();
		this._itens.set(chaveGuardaRoupa.nome, chaveGuardaRoupa);
	}

	get itens() {
		if (this.objetos.get('armario_banheiro').acaoOk) {
			return this._itens;
		}
		return new Map()
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

export class QuartoJogador extends Sala {
	constructor() {
		super("quarto_jogador")

		const varinha = new VarinhaGato();
		this.itens.set(varinha.nome, varinha);
	}
}

export class Jardim extends Sala {
	constructor() {
		super("jardim")

		const caixaFerramentas = new CaixaFerramentas();
		this.objetos.set(caixaFerramentas.nome, caixaFerramentas);

		const lanterna = new Lanterna();
		this._itens.set(lanterna.nome, lanterna);
	}

	get itens() {
		if (this.objetos.get('caixa_ferramentas').inspecaoOk) {
			return this._itens;
		}
		return new Map()
	}

	textoDescricao() {
		console.log("A lua cheia ilumina o jardim");

		return super.textoDescricao(true)
	}
}