import Header from '@/components/Header'
import Hero from '../components/Home/Hero';
import Container from '@/components/UI/Container'

export default function Home() {
  return (
    <main className='min-h-screen'>
      <div className="bg-zinc-900 overflow-hidden">
        <Header dark={true} />
        <Hero />
      </div>
    </main>
  )
}
