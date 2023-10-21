function Hero() {
  return (
    <section className="hero relative">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-40 md:px-8">
          <div className="space-y-5 max-w-4xl mx-auto text-center">
              <h2 className="text-4xl text-white font-extrabold mx-auto md:text-5xl">Rimma Maksiutova</h2>
              <p className="max-w-2xl mx-auto text-zinc-400">Fullstack software engineer</p>
          </div>
      </div>
      <div className="absolute inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg bg-gradient-mind"></div>
    </section>
  );
}


export default Hero;
