'use client'
import { SyntheticEvent, useRef, useState } from 'react';
import MESSAGES from '../data/messages.json'
import AUDIO from '../data/Test-Call.wav'
import { Message } from '@/interfaces/message.interface';

export default function Home() {
  const [progress, setProgress] = useState<number>(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const scrollMsg = useRef<Message>()

  const handleDuration = (time:number) => {
    audioRef.current!.currentTime = time
    audioRef.current!.play()
  }

  const handleTimeChange = (time:number) => {
    const match = MESSAGES.findLast((message) => message.start < progress)

    setProgress(time)

    if(scrollMsg.current !== match) {
      scrollMsg.current = match
      document.getElementById(String(match?.start))?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }

  return (
    <main className="max-w-[720px] mx-auto">
      <header className="py-8 flex justify-center items-center">
        <h1 className="text-2xl font-semibold">Full Stack Developer - Prueba técnica</h1>
      </header>
      <section className='my-4'>
        <ul className='w-full grid gap-2 '>
          {
            MESSAGES.map((msg) => (
              <li id={msg.start.toString()} onClick={() => handleDuration(msg.start)} className={`${msg.role === 'user' && 'justify-self-end'} ${msg.role === 'user' ? 'bg-slate-700': 'bg-slate-800'} cursor-pointer  px-2 py-4 max-w-xl m-2 rounded ${progress < msg.start && 'opacity-50'}`} key={msg.start}>
                {msg.content}
              </li>
            ))
          }
        </ul>
        <div className='w-full flex justify-center items-center mt-8'>
          <audio ref={audioRef} src={AUDIO} onTimeUpdate={(e) => handleTimeChange(e.currentTarget.currentTime)} controls></audio>
        </div>
      </section>
    </main>
  );
}
