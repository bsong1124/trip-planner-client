const About = () => {
  return (
    <section className="flex flex-col justify-center max-w-screen-md mx-8 md:mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-emerald-500 mb-4">
        Welcome to Journey Craft
      </h1>
      <p>
        Streamline your trip planning experience with our user-friendly
        application! No more feeling overwhelmed by the endless things to do and
        limited time, our app is designed to inject a dose of fun into the
        process while ensuring you make the most of every moment. Let us take
        the stress out of planning so you can focus on the excitement of your
        upcoming adventure. Your ultimate travel experience starts here!
      </p>
      <h2 className="text-2xl font-medium text-center text-emerald-500 mt-12 mb-4">
        Acknowledgements
      </h2>
      <p>
        The team wishes to express profound appreciation to{" "}
        <a
          href="https://tripadvisor-content-api.readme.io/reference/overview"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-500 underline hover:text-emerald-600"
        >
          TripAdvisor
        </a>{" "}
        for providing an indispensable foundation for JourneyCraft's success
        through the utilization of their free API. TripAdvisor's generous
        offering played a fundamental role in shaping the app's functionality
        and enhancing the overall user experience.
      </p>
    </section>
  );
};

export default About;
