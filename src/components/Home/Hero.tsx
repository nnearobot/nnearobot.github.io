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
    <section id="hero" className="relative">
      <div className="relative px-4 md:px-8 pt-20 md:pt-32 pb-32 md:pb-40">
          <div className="text-center">
              <h1 className={`text-white font-bold mx-auto ${majorMonoDisplay.className} text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl`}>Rimma Maksiutova</h1>
              <p className={`max-w-2xl mx-auto text-zinc-300 ${exo2.className} text-sm xs:text-md md:text-lg lg:text-xl capitalize`}>Fullstack software engineer</p>
              <p className="text-center mt-16"><a href="/about" className="border border-zinc-200 rounded-xl px-4 py-2 text-md text-zinc-200">About me</a></p>
          </div>
      </div>
    </section>
  );
}


export default Hero;
