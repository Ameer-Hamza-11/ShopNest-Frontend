const Disclaimer = () => {
    return (
      <section className="px-4 py-12">
        <div
          className="
            mx-auto
            max-w-4xl
  
            rounded-2xl
            border border-white/5
            bg-zinc-900
  
            p-8 md:p-12
  
            text-zinc-400
            leading-8
  
            shadow-[0_10px_40px_rgba(0,0,0,0.5)]
          "
        >
          <h2
            className="
              mb-8
              border-b
              border-white/10
              pb-4
  
              text-3xl
              font-bold
              text-white
            "
          >
            Legal & Site Disclaimer
          </h2>
  
          <p className="mb-6">
            ShopNest is a personal portfolio and educational project developed
            to demonstrate modern full-stack web development practices. The
            platform showcases frontend and backend development concepts,
            responsive design, authentication systems, and e-commerce
            application architecture.
          </p>
  
          <h3 className="mt-8 mb-3 text-xl font-semibold text-orange-500">
            1. Educational Purpose
          </h3>
  
          <p className="mb-6">
            This website has been created primarily for learning, portfolio,
            and demonstration purposes. It is intended to showcase technical
            skills and software development practices rather than operate as a
            commercial e-commerce platform.
          </p>
  
          <h3 className="mt-8 mb-3 text-xl font-semibold text-orange-500">
            2. Product Information
          </h3>
  
          <p className="mb-6">
            Any products, images, descriptions, or other content displayed on
            this platform may be sample or demonstration data. Such content is
            used solely to illustrate application functionality and user
            interface design.
          </p>
  
          <h3 className="mt-8 mb-3 text-xl font-semibold text-orange-500">
            3. Third-Party Resources
          </h3>
  
          <p className="mb-6">
            This project may utilize publicly available assets, APIs, icons,
            and development tools from third-party providers. Ownership and
            rights of such resources remain with their respective creators and
            organizations.
          </p>
  
          <h3 className="mt-8 mb-3 text-xl font-semibold text-orange-500">
            4. Limitation of Liability
          </h3>
  
          <p className="mb-6">
            The creator of this project makes no warranties regarding the
            completeness, reliability, or accuracy of the information provided.
            Use of this website and its contents is at your own discretion.
          </p>
  
          <div
            className="
              mt-10
  
              rounded-xl
              border border-orange-500/20
              bg-orange-500/5
  
              p-4
            "
          >
            <p className="italic text-zinc-300">
              By accessing and using this website, you acknowledge that it is
              a portfolio project created for educational and demonstration
              purposes and agree to these terms.
            </p>
          </div>
        </div>
      </section>
    );
  };
  
  export default Disclaimer;