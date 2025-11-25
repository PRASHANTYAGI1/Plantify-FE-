import { Card, CardContent, Typography } from "@mui/material";

const tipsData = [
  {
    img: "dse3.png",
    title: "Upload Clear Image",
    text: "Ensure your potato leaf image is clear and properly focused.",
  },
  {
    img: "dse3.png",
    title: "Good Lighting",
    text: "Take the photo in natural lighting for accurate detection.",
  },
  {
    img: "dse2.png",
    title: "Low Confidence",
    text: "If confidence <70%, consult an agricultural expert.",
  },
];

const TipsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        {tipsData.map((tip) => (
          <Card
            key={tip.title}
            className="hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300"
          >
            <CardContent className="flex flex-col items-center text-center">
              <img
                src={tip.img}
                alt={tip.title}
                className="w-full h-40 object-contain rounded-full mb-4"
              />
              <Typography variant="h6" fontWeight="bold">
                {tip.title}
              </Typography>
              <Typography>{tip.text}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TipsSection;
