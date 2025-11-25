import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HeroSection from "../../component/Disease/Hero";
import TipsSection from "../../component/Disease/TipsSection";
import DetectionSection from "../../component/Disease/DetectionSection";
import RemediesSection from "../../component/Disease/RemediesSection";
import EndingSection from "../../component/Disease/EndingSection";

import { detectDisease } from "../../api/MlApis";

const PotatoDiseaseLandingPage = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [result, setResult] = useState(null);

  return (
    <div className="w-full font-sans">
      <ToastContainer position="top-right" autoClose={3000} />
      <HeroSection />
      <TipsSection />
      <DetectionSection
        detectDiseaseApi={detectDisease}
        user={user}
        authLoading={authLoading}
        setResult={setResult}
        result={result}
      />
      <RemediesSection result={result} /> {/* Always visible */}
      <EndingSection />
    </div>
  );
};

export default PotatoDiseaseLandingPage;
