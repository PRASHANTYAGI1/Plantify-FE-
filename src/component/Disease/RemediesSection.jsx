import { Card, CardContent, Typography } from "@mui/material";

const RemediesSection = ({ result }) => {
  const remediesData = {
    "Potato___Early_blight": {
      description:
        "Remove infected leaves, avoid overhead watering, and apply fungicides such as chlorothalonil or mancozeb.",
      fertilizer: "Use balanced NPK fertilizers and avoid excessive nitrogen.",
    },
    "Potato___Late_blight": {
      description:
        "Remove infected plants immediately, avoid wetting foliage, and apply fungicides like copper-based sprays.",
      fertilizer: "Potassium-rich fertilizers help plants resist infections.",
    },
    "Potato___healthy": {
      description: "Your potato plant is healthy! Maintain regular care.",
      fertilizer: "Use balanced NPK fertilizers as required.",
    },
  };

  // Determine highest confidence disease
  const highestConfidenceDisease =
    result?.raw_probabilities &&
    Object.entries(result.raw_probabilities).reduce(
      (a, b) => (a[1] > b[1] ? a : b),
      ["", 0]
    )[0];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <Typography variant="h4" className="text-center font-bold mb-12">
          Recommended Remedies & Fertilizers
        </Typography>
        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(remediesData).map(([disease, info]) => (
            <Card
              key={disease}
              className={`p-6 shadow-md rounded-lg transition-transform transform hover:-translate-y-2 hover:shadow-xl ${
                disease === highestConfidenceDisease
                  ? "border-4 border-green-500 bg-green-50 animate__animated animate__pulse"
                  : "bg-white"
              }`}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold" className="mb-2">
                  {disease}
                </Typography>
                <Typography className="mb-2">{info.description}</Typography>
                <Typography className="font-semibold">Recommended Fertilizer:</Typography>
                <Typography>{info.fertilizer}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RemediesSection;
