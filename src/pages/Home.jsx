import HeaderSection from "../components/UI/HeaderSection";
import Hero from "../components/home/Hero";
import Footer from "../components/Footer";
import HeroStats from "../components/home/HeroStats";
import About from "../components/home/About";
import Courses from "../components/home/Courses";
import Facilities from "../components/home/Facilities";
import News from "../components/home/News";
import Management from "../components/home/Management";
import Contact from "../components/home/Contact";

const Home = () => {
  return (
    <>
      <HeaderSection />
      <main className="min-h-screen bg-white">
        <Hero />
        <HeroStats />
        <About />
        <Courses />
        <Facilities />
        <News />
        <Management />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Home;
