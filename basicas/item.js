import { validate } from "bycontract";

export class Item {
    #nome;

    constructor(nome) {
        validate(nome, "String");
        this.#nome = nome;
    }

    get nome() {
        return this.#nome;
    }
}