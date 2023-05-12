import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className='absolute inset-0 flex justify-center items-center'>
      <div style={{ marginBottom: '5rem' }}>
        Hello, currently the chat bot is offline due to lack of budget in the Open Ia API. 
        If you want the application to be online you can support me in the following text :)
      </div>
      <Link href="https://paypal.me/renefuenteskbx?country.x=GT&locale.x=es_XC" legacyBehavior style={{ marginTop: '1rem' }}>
        <a>Support me</a>
      </Link>
    </main>
    
  )
}
