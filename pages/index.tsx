import { useEffect, useState } from 'react'
import Questionario from '../components/Questionario'
import QuestaoModel from '../models/Questao'
import { useRouter } from 'next/router'

const BASE_URL = 'http://localhost:3000/api'

export default function Home() {
  const router = useRouter()
  const [ids, setIds] = useState<number[]>([])
  const [questao, setQuestao] = useState<QuestaoModel>()
  const [respostasCertas, setRespostasCertas] = useState<number>(0)

  async function carregarIdsQuestoes(){
    const resp = await fetch(`${BASE_URL}/questionario`)
    const ids = await resp.json()
    setIds(ids);
  }

  async function carregarQuestao(id: number){
    const resp = await fetch(`${BASE_URL}/questoes/${id}`)
    const json = await resp.json()
    const questao = QuestaoModel.criarUsandoObjeto(json);
    setQuestao(questao);
  }

  function questapRespondida(questaoRespondida: QuestaoModel){
    setQuestao(questaoRespondida)

    const acertou = questaoRespondida.acertou;
    if(acertou)
      setRespostasCertas(respostasCertas + 1)
  }

  function idProximaPergunta(){
    if(questao){
      const proximoIndice = ids.indexOf(questao.id) + 1;

      return ids[proximoIndice];
    }
  }

  function irPraProximoPasso(){
    console.log("log");
    
    const proximoId = idProximaPergunta();

    proximoId ? irPraProximaQuestao(proximoId) : finalizar()
  }

  function irPraProximaQuestao(proximoId: number){
    carregarQuestao(proximoId)
  }

  function finalizar(){
    router.push({
      pathname: "/resultado",
      query: {
        total: ids.length,
        certas: respostasCertas
      }
    })
  }

  useEffect(() => {
    carregarIdsQuestoes()
  }, [])

  useEffect(() => {
    ids.length > 0 && carregarQuestao(ids[0])
  }, [ids])

  return ( questao ?
      <Questionario questao={questao} ultima={idProximaPergunta() === undefined} questaoRespondida={questapRespondida} irPraProximoPasso={irPraProximoPasso}/> : false
    
  )
}
