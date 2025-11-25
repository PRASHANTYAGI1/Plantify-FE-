import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const teamMembers = [
  { name: "Prashant", role: "member-1", logo: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png" },
  { name: "Kunal", role: "Member-2", logo: "https://png.pngtree.com/png-vector/20240131/ourmid/pngtree-man-profile-account-picture-character-png-image_11577305.png" },
  { name: "Prince", role: "Member-3", logo: "https://png.pngtree.com/png-clipart/20230930/original/pngtree-man-avatar-isolated-png-image_13022161.png" },
];

const whatWeDo = [
  {
    title: "Empower Farmers",
    desc: "We connect local farmers directly to markets, helping them grow their business sustainably.",
    img: "https://archive.opengovasia.com/wp-content/uploads/2025/04/Article-Sam_Ind-Apr-02-2025-main.png",
  },
  {
    title: "AI Crop Detection",
    desc: "Our ML model identifies potato plant diseases, ensuring healthier and more productive farms.",
    img: "https://farmonaut.com/wp-content/uploads/2024/09/1-748.jpg",
  },
  {
    title: "Sustainable Commerce",
    desc: "We promote eco-friendly products and practices, driving a digital green revolution.",
    img: "https://blog.converted.in/hs-fs/hubfs/Best%20Strategies%20For%20Green%20Commerce.webp?width=800&height=533&name=Best%20Strategies%20For%20Green%20Commerce.webp",
  },
];

const About = () => {
    
  return (
    <Box sx={{ backgroundColor: "#f7f8f6", fontFamily: "Poppins, sans-serif", overflowX: "hidden" }}>
      {/* Hero Section */}
      <MotionBox
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        sx={{
          textAlign: "center",
          py: { xs: 10, md: 12 },
          px: 2,
          background: "linear-gradient(135deg, #e8f5e9 0%, #f9faf8 50%, #edf7ee 100%)",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: "#2d3a2e" }}>
          About <span style={{ color: "#4f7b49" }}>GreenCart</span>
        </Typography>
        <Typography
          variant="h6"
          sx={{ maxWidth: 800, mx: "auto", color: "#506350", lineHeight: 1.7 }}
        >
          GreenCart connects farmers, eco-sellers, and buyers in one digital ecosystem — blending nature, technology, and sustainability into a smarter agricultural future.
        </Typography>
      </MotionBox>

      {/* Who We Are */}
      <Container sx={{ py: { xs: 6, md: 10 }, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 5, color: "#38543a" }}>
          Who We Are
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 800, mx: "auto", color: "#505a50", lineHeight: 1.8 }}>
          We’re more than a marketplace — we’re a movement. GreenCart brings together farmers, agricultural sellers, and eco-conscious buyers to promote sustainable growth through digital innovation.
        </Typography>
      </Container>

      {/* What We Do */}
      <Box sx={{ backgroundColor: "#eef3ef", py: { xs: 6, md: 10 }, textAlign: "center" }}>
        <Container>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 5, color: "#38543a" }}>
            What We Do 🌾
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {whatWeDo.map((card, index) => (
              <Grid item xs={12} sm={4} key={index} sx={{ display: "flex", justifyContent: "center" }}>
                <MotionCard
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  sx={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                    cursor: "pointer",
                    backgroundColor: "#fff",
                    width: 300,
                    height: 420,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={card.img}
                    alt={card.title}
                    sx={{ height: 220, width: "100%", objectFit: "cover" }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#38543a", mb: 1 }}>
                      {card.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#505a50" }}>
                      {card.desc}
                    </Typography>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

    {/* Our Team */}
    <Container sx={{ py: { xs: 6, md: 10 }, textAlign: "center" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 6, color: "#38543a" }}>
        Meet Our Team 🤝
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 0, flexWrap: "wrap" }}>
        {teamMembers.map((member, index) => (
          <MotionBox
            key={index}
            whileHover={{ y: -10, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            sx={{
              width: 140,
              height: 140,
              borderRadius: "50%",
              backgroundColor: "#f0f5f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              cursor: "pointer",
              boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
              position: "relative",
            }}
          >
            <Avatar
              src={member.logo}
              alt={member.name}
              sx={{ width: 80, height: 80, mb: 1 }}
            />
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#2e4c3a" }}>
              {member.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "#4a564a" }}>
              {member.role}
            </Typography>
          </MotionBox>
        ))}
      </Box>
    </Container>


      {/* Closing Section */}
      <Box sx={{ textAlign: "center", py: 8, background: "linear-gradient(135deg, #e8f5e9 0%, #f9faf8 50%, #edf7ee 100%)", color: "#2e4c3a" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Join the Green Movement 🌎
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, opacity: 0.85, maxWidth: 700, mx: "auto", lineHeight: 1.7 }}>
          Let’s create a future where farming is smart, sustainable, and connected — powered by nature, driven by innovation.
        </Typography>
        <Button variant="contained" sx={{ backgroundColor: "#4caf50", color: "white", fontWeight: "bold", borderRadius: "25px", px: 5, py: 1.5, "&:hover": { backgroundColor: "#43a047" } }}>
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default About;
