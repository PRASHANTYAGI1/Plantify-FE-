import { Button, Typography } from "@mui/material";

const HeroSection = ({ scrollToDetection }) => {
  return (
    <section
      className="relative w-full h-screen flex items-center justify-center text-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1592150621744-aca64f48394a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2091')",
      }}
    >
      {/* Light gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20"></div>

      <div className="relative z-10 text-white px-4 md:px-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 animate__animated animate__fadeInDown">
          Detect Potato Diseases Easily
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto animate__animated animate__fadeInUp">
          Upload images of your potato plants and get quick AI-based disease
          predictions. Know early and protect your crops effectively!
        </p>
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={scrollToDetection}
        >
          Detect Now
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
