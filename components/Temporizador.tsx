import styles from '../styles/Temporizador.module.css'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

interface TemporizadorProps {
    duracao: number,
    key: any,
    tempoEsgotado: () => void
}

export default function Temporizador(props: TemporizadorProps){
    return (
        <div className={styles.temporizador}>
            <CountdownCircleTimer 
                key={props.key}
                size={120} 
                isPlaying 
                duration={props.duracao} 
                onComplete={props.tempoEsgotado} 
                colorsTime={[0.33,0.33,0.33]}

                colors={[
                    '#BCE596',
                    '#F7B801',
                    "#ED827A"
                ]}    
            >
                {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
        </div>
    )
}