import { useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { toast } from "react-toastify";

const DetectionSection = ({ detectDiseaseApi, user, setResult, result }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!selectedFile) return toast.error("Please select an image!");
    if (!user?.token && !localStorage.getItem("token"))
      return toast.error("User not authenticated");

    try {
      setLoading(true);
      const data = await detectDiseaseApi(
        selectedFile,
        user?.token || localStorage.getItem("token")
      );

      setResult(data); // Update parent
      toast.success("Prediction successful!");

      // Show warning if confidence < 70%
      if (data.confidence_percent < 70) {
        toast.warning(
          "Low confidence detected. It is recommended to consult an Agri-Expert."
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to detect disease. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row gap-8">
        {/* Left: Upload Form */}
        <div className="flex-1 bg-gray-50 p-6 rounded-xl shadow-md flex flex-col items-center">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-64 h-64 object-contain mb-4 rounded-lg border animate__animated animate__fadeIn"
            />
          ) : (
            <div className="w-64 h-64 flex items-center justify-center bg-gray-200 border rounded-lg mb-4 text-gray-400 animate__animated animate__fadeIn">
              Image Preview
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4 w-full text-gray-700"
          />
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Detecting..." : "Detect Disease"}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            className="mt-3"
            onClick={handleReset}
          >
            Detect Another
          </Button>
        </div>

        {/* Right: Full API Response */}
        <div className="flex-1 flex flex-col gap-6">
          {!result && (
            <Card className="p-6 bg-gray-50 shadow-md rounded-lg animate__animated animate__fadeInUp">
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Demo Result
                </Typography>
                <Typography>
                  Upload an image to see disease detection and confidence scores.
                </Typography>
              </CardContent>
            </Card>
          )}

          {result && (
            <Card className="p-6 bg-green-50 shadow-md rounded-lg animate__animated animate__fadeInUp">
              <CardContent>
                <Typography variant="h6" fontWeight="bold" className="mb-4">
                  Detection Result
                </Typography>

                <Typography>
                  <span className="font-semibold">Predicted Disease:</span>{" "}
                  {result.predicted_class}
                </Typography>

                <Typography>
                  <span className="font-semibold">Confidence:</span>{" "}
                  {result.confidence_percent.toFixed(2)}%
                </Typography>

                <Typography className="mt-4 font-semibold">All Probabilities:</Typography>
                {result.raw_probabilities &&
                  Object.entries(result.raw_probabilities).map(([disease, value]) => (
                    <Typography key={disease}>
                      {disease}: {value.toFixed(2)}%
                    </Typography>
                  ))}

                {/* Friendly disclaimer */}
                <Typography
                  variant="body2"
                  className="mt-4 text-gray-600 italic"
                >
                  ⚠️ Note: This model may not always be 100% accurate. If you are unsure,
                  please consult an agro-specialist for expert advice.
                </Typography>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default DetectionSection;
