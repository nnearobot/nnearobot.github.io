import Header from '@/components/Header'
import Hero from '../components/Home/Hero';

export default function Home() {
  return (
    <>
      <div className="bg-zinc-900 overflow-hidden">
        <Header dark={true} />
        <Hero />
      </div>
    </>
  )
}
