import { validate } from "bycontract";

export class Objeto {
    #nome;
    #acaoOk;
        
    constructor(nome) {
        validate(nome, "String");
        this.#nome = nome;
    }
    
    get nome(){
        return this.#nome;
    }

    get acaoOk() {
        return this.#acaoOk;
    }

    set acaoOk(acaoOk) {
        validate(acaoOk,"Boolean");
        this.#acaoOk = acaoOk;
    }

    usar(item){
        return false;
    }

    inspecionar() {}
}