import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import WhyNelsolar from "@/components/WhyNelsolar";
import SolarCalculator from "@/components/SolarCalculator";
import TestimonialsSection from "@/components/TestimonialsSection";
import PartnersSection from "@/components/PartnersSection";
import InstallationSection from "@/components/InstallationSection";
import ConsultationSection from "@/components/ConsultationSection";
import FAQSection from "@/components/FAQSection";
import TeamSection from "@/components/TeamSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ProductsSection />
      <WhyNelsolar />
      <SolarCalculator />
      <TestimonialsSection />
      <PartnersSection />
      <InstallationSection />
      <ConsultationSection />
      <FAQSection />
      <TeamSection />
      <Footer />
    </>
  );
}
