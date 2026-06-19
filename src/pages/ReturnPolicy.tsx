const ReturnPolicy = () => {
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
            Project Usage Policy
          </h2>
  
          <p className="mb-6">
            ShopNest is a portfolio project developed to demonstrate modern
            full-stack web development practices. The platform showcases
            frontend design, backend architecture, authentication,
            database integration, and e-commerce workflows for educational
            and demonstration purposes.
          </p>
  
          <h3 className="mt-8 mb-3 text-xl font-semibold text-orange-500">
            1. Demonstration Environment
          </h3>
  
          <p className="mb-6">
            The products, categories, images, and other content displayed
            throughout this application may consist of sample or placeholder
            data. They are included solely to demonstrate application
            functionality and user experience design.
          </p>
  
          <h3 className="mt-8 mb-3 text-xl font-semibold text-orange-500">
            2. No Commercial Transactions
          </h3>
  
          <p className="mb-6">
            This project is not intended to process real-world purchases,
            financial transactions, or commercial orders. Any checkout,
            cart, or order-related functionality is implemented for learning
            and portfolio demonstration purposes only.
          </p>
  
          <h3 className="mt-8 mb-3 text-xl font-semibold text-orange-500">
            3. Educational Purpose
          </h3>
  
          <p className="mb-6">
            The primary objective of this platform is to showcase software
            engineering concepts including responsive UI development,
            RESTful APIs, authentication systems, state management, and
            database integration using modern web technologies.
          </p>
  
          <h3 className="mt-8 mb-3 text-xl font-semibold text-orange-500">
            4. Continuous Improvement
          </h3>
  
          <p className="mb-6">
            This project is actively maintained and improved as part of an
            ongoing learning journey. Features, designs, and functionality
            may change over time as new technologies and best practices are
            explored.
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
              Thank you for visiting ShopNest. This project represents my
              dedication to learning, building, and improving as a Full
              Stack Developer.
            </p>
          </div>
        </div>
      </section>
    );
  };
  
  export default ReturnPolicy;