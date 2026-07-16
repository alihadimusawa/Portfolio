import HomeSection from "./sections/HomeSection";
import Header from "./sections/Header";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import AboutMe from "./sections/AboutMe";
import ContactFooter from "./sections/ContactFooter";
import { sectionIds } from "./sections/site.data";

export default function Home() {
  return (
    <>
      <Header />
      <main id={sectionIds.mainContent}>
        <HomeSection />
        <Experience />
        <Projects />
        <AboutMe />
      </main>
      <ContactFooter />
    </>
  );
}
