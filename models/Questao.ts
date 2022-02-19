import { embaralhar } from "../functions/arrays"
import RespostaModel from "./Reposta"

export default class QuestaoModel {
    #id: number
    #enunciado: string
    #respostas: RespostaModel[]
    #acertou: boolean
    // #respondida: boolean

    constructor(id: number, enunciado: string, respostas: any[], acertou = false){
        this.#id = id
        this.#enunciado = enunciado
        this.#respostas = respostas
        this.#acertou = acertou
    }

    get id(){
        return this.#id;
    }

    get enunciado(){
        return this.#enunciado;
    }

    get respostas(){
        return this.#respostas;
    }

    get acertou(){
        return this.#acertou;
    }

    get naoRespondida(){
        return !this.respondida
    }

    get respondida() {

        for(let resposta of this.#respostas){
            if(resposta.revelada) return true
        }
        
        return false;
    }

    responderCom(indice: number): QuestaoModel{
        const acertou = this.#respostas[indice]?.certa
        const respostas = this.#respostas.map((resp, i) => {
            const respostaSelecionada = indice === i
            const deveRevelar = respostaSelecionada || resp.certa
            return deveRevelar ? resp.revelar() : resp
        })

        return new QuestaoModel(this.id, this.enunciado, respostas, acertou)
        
    }

    embaralharRespostas(): QuestaoModel {
        let respostasEmbaralhadas = embaralhar(this.#respostas)
        return new QuestaoModel(this.#id, this.#enunciado, respostasEmbaralhadas, this.#acertou)
    }

    static criarUsandoObjeto(obj: QuestaoModel): QuestaoModel {

        const respostas = obj.respostas.map(resp => RespostaModel.criarUsandoObjeto(resp));
        return new QuestaoModel(obj.id, obj.enunciado, respostas, obj.acertou)
    }

    paraObjeto(){
        return {
            id: this.#id,
            enunciado: this.#enunciado,
            acertou: this.#acertou,
            respondida: this.respondida,
            respostas: this.#respostas.map(resp => resp.paraObjeto())
        }
    }
}