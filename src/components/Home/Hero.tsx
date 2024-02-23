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
      <div className="relative px-4 md:px-8 pt-20 md:pt-32 pb-32 md:pb-40">
          <div className="space-y-5 text-center">
              <h1 className={`text-white font-bold mx-auto ${majorMonoDisplay.className} text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl`}>Rimma Maksiutova</h1>
              <p className={`max-w-2xl mx-auto text-zinc-300 ${exo2.className} text-sm xs:text-md md:text-lg lg:text-xl capitalize`}>Fullstack software engineer</p>
          </div>
      </div>
    </section>
  );
}


export default Hero;
