import { Engine } from "../basicas/index.js"
import { Banheiro, Cozinha, Jardim, QuartoJogador, QuartoPais, SalaDeEstar } from "./Salas.js";

export class JogoDemo extends Engine {
    criarCenario(){
        // Define as salas que compõem o mapa
        const salaEstar = new SalaDeEstar();
        const quartoPais = new QuartoPais();
        const cozinha = new Cozinha();
        const banheiro = new Banheiro();
        const jardim = new Jardim();
        const quartoJogador = new QuartoJogador();

        // Encadeia as salas através das portas
        salaEstar.adicionarPorta(banheiro);
        salaEstar.adicionarPorta(quartoPais);
        salaEstar.adicionarPorta(cozinha);

        quartoPais.adicionarPorta(salaEstar);

        banheiro.adicionarPorta(salaEstar);

        cozinha.adicionarPorta(salaEstar);
        cozinha.adicionarPorta(quartoJogador);
        cozinha.adicionarPorta(jardim);

        jardim.adicionarPorta(cozinha);

        quartoJogador.adicionarPorta(cozinha);

        // Define a sala inicial
        this.salaAtual = salaEstar;
    }
}