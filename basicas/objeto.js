import { validate } from "bycontract";

export class Objeto {
    #nome;
    #acaoOk;
    #inspecaoOk;
        
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

    get inspecaoOk() {
        return this.#inspecaoOk
    }

    set acaoOk(acaoOk) {
        validate(acaoOk,"Boolean");
        this.#acaoOk = acaoOk;
    }

    set inspecaoOk(inspecaoOk) {
        validate(inspecaoOk,"Boolean");
        this.#inspecaoOk = inspecaoOk;
    }

    usar(item){
        return false;
    }

    inspecionar() {
        this.#inspecaoOk = true
    }
}