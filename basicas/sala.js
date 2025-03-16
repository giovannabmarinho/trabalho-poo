import { validate } from "bycontract";
import { Engine } from "./engine.js";

export class Sala {
	#nome;
	#itens;
	objetos;
	#portas;
	#engine;
	
	constructor(nome,engine) {
		validate(arguments,["String",Engine]);
		this.#nome = nome;
		this.#itens = new Map();
		this.objetos = new Map();
		this.#portas = new Map();
		this.#engine = engine;
	}

	get nome() {
		return this.#nome;
	}
	
	get objetos() {
		return this.#itens;
	}

	get ferramentas() {
		return this.objetos;
	}
	
	get portas(){
		return this.#portas;
	}

	get engine(){
		return this.#engine;
	}

    adicionarPorta(sala) {
        validate(sala, Sala);
        this.portas.set(sala.nome, sala);
    }
	
	objetosDisponiveis(){
		let arrObjs = [...this.#itens.values()];
    	return arrObjs.map(obj=>obj.nome+":"+obj.descricao);
	}

	ferramentasDisponiveis(){
		let arrFer = [...this.objetos.values()];
    	return arrFer.map(f=>f.nome);		
	}
	
	portasDisponiveis(){
		let arrPortas = [...this.#portas.values()];
    	return arrPortas.map(sala=>sala.nome);
	}
	
	pegar(nomeFerramenta) {
		validate(nomeFerramenta,"String");
		let ferramenta = this.objetos.get(nomeFerramenta);
		if (ferramenta != null) {
			this.#engine.mochila.guarda(ferramenta);
			this.objetos.delete(nomeFerramenta);
			return true;
		}else {
			return false;
		}
	}

	ir(porta) {
		validate(porta,"String");
		return this.#portas.get(porta);
	}

	textoDescricao() {
		let descricao = `Você está em ${this.nome}\n`;

        if (this.objetos.size == 0){
            descricao += "Não há objetos na sala\n";
        } else {
            descricao += "Objetos: "+this.objetosDisponiveis()+"\n";
        }
		
        if (this.ferramentas.size == 0){
            descricao += "Não há ferramentas na sala\n";
        }else{
            descricao += "Ferramentas: "+this.ferramentasDisponiveis()+"\n";
        }
        descricao += "Portas: "+this.portasDisponiveis()+"\n";
		return descricao;
	}

	usa(ferramenta,objeto){
		return false;
	}
}