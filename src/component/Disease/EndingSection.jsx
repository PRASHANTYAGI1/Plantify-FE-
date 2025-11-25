import { Button, Typography } from "@mui/material";

const EndingSection = ({ scrollToDetection }) => {
  return (
    <section className="relative py-24 flex items-center justify-center text-center bg-gradient-to-r from-green-200 to-blue-200 text-gray-800">
      <div className="max-w-3xl px-4 animate__animated animate__fadeInUp">
        <Typography variant="h3" fontWeight="bold" className="mb-6">
          Protect Your Potato Crops Today
        </Typography>
        <Typography variant="h6" className="mb-4">
          Detect diseases early and apply the right remedies to maximize your yield.
        </Typography>
        <Typography variant="subtitle1" className="mb-8 italic">
          "Healthy crops, healthy life. Early detection saves your harvest."
        </Typography>
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={scrollToDetection}
        >
          Start Detecting Now
        </Button>
      </div>
    </section>
  );
};

export default EndingSection;
