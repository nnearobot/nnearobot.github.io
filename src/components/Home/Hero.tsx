import { Exo_2, Major_Mono_Display } from 'next/font/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons'
import { urls } from '@/data/urls';
import SNSLinks from '../SNSLinks';

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
              <p className="mt-16"><a href="/about" className="text-md underline text-zinc-200 hover:text-white">About me</a></p>
              <p className="mt-8"><a href={urls.cv.url} title={urls.cv.title} className="border border-zinc-200 rounded-xl px-4 pt-2 pb-1 text-md text-zinc-200 no-underline">
                <FontAwesomeIcon icon={faCloudArrowDown} className="md:text-xl" /> Download CV
              </a></p>
              <p className="mt-16"><SNSLinks expanded="1" className="text-zinc-500 hover:text-zinc-200 mb-2" /></p>
          </div>
      </div>
    </section>
  );
}


export default Hero;
