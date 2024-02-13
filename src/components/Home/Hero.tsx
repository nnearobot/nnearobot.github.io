import { Exo_2, Major_Mono_Display } from 'next/font/google';

const exo2 = Exo_2({
  weight: ['400'],
  subsets: ['latin']
})

const majorMonoDisplay = Major_Mono_Display({
  weight: ['400'],
  subsets: ['latin']
})


function Hero() {
  return (
    <section className="hero relative">
      <div className="relative z-10 px-4 py-40 md:px-8">
          <div className="space-y-5 text-center">
              <h1 className={`text-white font-bold mx-auto ${majorMonoDisplay.className} text-2xl sm:text-4xl md:text-5xl lg:text-6xl`}>Rimma Maksiutova</h1>
              <p className={`max-w-2xl mx-auto text-zinc-300 ${exo2.className} sm:text-md md:text-lg lg:text-xl capitalize`}>Fullstack software engineer</p>
          </div>
      </div>
    </section>
  );
}


export default Hero;
