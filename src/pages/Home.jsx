import Hero from "../components/home/Hero";
import HeaderSection from "../components/UI/HeaderSection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <HeaderSection />
      <main className="min-h-screen bg-white">
        <Hero />
      </main>
      <Footer />
    </>
  );
};

export default Home;
