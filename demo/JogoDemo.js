import { Engine } from "../basicas/index.js"
import { Banheiro, Cozinha, QuartoPais, SalaDeEstar } from "./SalasDemo.js";

export class JogoDemo extends Engine {
    criarCenario(){
        // Define as salas que compõem o mapa
        const salaEstar = new SalaDeEstar(this);
        const quartoPais = new QuartoPais(this);
        const cozinha = new Cozinha(this);
        const banheiro = new Banheiro(this);

        // Encadeia as salas através das portas
        salaEstar.adicionarPorta(banheiro);
        salaEstar.adicionarPorta(quartoPais);
        salaEstar.adicionarPorta(cozinha);

        quartoPais.adicionarPorta(salaEstar);

        banheiro.adicionarPorta(salaEstar);

        cozinha.adicionarPorta(salaEstar);

        // Define a sala inicial
        this.salaAtual = salaEstar;
    }
}