import { ArrowDown, Plus } from "lucide-react"
import { ButtonLink } from "./components"
import { innovationPhotography, type InnovationPhotoKey } from "./innovationPhotography"
import "./innovation.css"

const approaches = [
  {
    title: "Smarter ingredient solutions",
    copy: "We continuously explore food ingredients and sourcing opportunities to meet the changing requirements of food manufacturers, businesses and consumers.",
  },
  {
    title: "Quality through innovation",
    copy: "From ingredient selection to supply, we focus on improving quality standards, consistency and reliability at every stage.",
  },
  {
    title: "Exploring new possibilities",
    copy: "We embrace emerging food trends, innovative ingredients and evolving applications to create opportunities across the food industry.",
  },
  {
    title: "An efficient supply chain",
    copy: "Innovation also means making ingredient sourcing and distribution more accessible, reliable and efficient for our business partners.",
  },
  {
    title: "Development shaped by you",
    copy: "Every business has different requirements. We explore flexible ingredient solutions that support our customers’ product development and business goals.",
  },
]

function ResearchPhoto({ name, className = "", priority = false }: {
  name: InnovationPhotoKey
  className?: string
  priority?: boolean
}) {
  const photo = innovationPhotography[name]
  return <figure className={`innovation-photo ${className}`}>
    <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height}
      loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" />
  </figure>
}

export function InnovationPage() {
  return <div className="innovation-page">
    <section className="innovation-intro innovation-container" aria-labelledby="innovation-title">
      <div className="innovation-intro-copy">
        <h1 id="innovation-title">Innovation</h1>
        <p className="innovation-tagline">Rethinking food.<br />Redefining possibilities.</p>
        <p className="innovation-intro-body">Better ways to source, develop and deliver food ingredients. At LYCA, innovation begins with understanding what your business needs next.</p>
        <ButtonLink to="/enquiry">Discuss your next idea</ButtonLink>
        <a className="innovation-explore" href="#innovation-approach">Explore our approach <ArrowDown size={16} aria-hidden="true" /></a>
      </div>
      <ResearchPhoto name="research" className="innovation-intro-photo" priority />
    </section>

    <section className="innovation-perspective" aria-labelledby="innovation-perspective-title">
      <div className="innovation-container innovation-two-column">
        <h2 id="innovation-perspective-title">Beyond traditional supply.</h2>
        <div className="innovation-prose">
          <p>Innovation is more than introducing new products. It is discovering better ways to source, deliver, develop and experience food ingredients.</p>
          <p>We believe the future of the food industry lies in combining quality ingredients, evolving consumer needs, responsible sourcing and smarter business practices.</p>
        </div>
      </div>
    </section>

    <section id="innovation-approach" className="innovation-approach innovation-container innovation-two-column" aria-labelledby="innovation-approach-title">
      <div className="innovation-section-intro">
        <h2 id="innovation-approach-title">Our approach.</h2>
        <p>Practical thinking.<br />Better possibilities.</p>
      </div>
      <div className="innovation-approach-list">{approaches.map((approach, index) =>
        <details key={approach.title} name="innovation-approach" open={index === 0}>
          <summary><h3>{approach.title}</h3><Plus size={20} aria-hidden="true" /></summary>
          <p>{approach.copy}</p>
        </details>
      )}</div>
    </section>

    <section className="innovation-research" aria-labelledby="innovation-research-title">
      <div className="innovation-container innovation-research-layout">
        <h2 id="innovation-research-title">Innovation in action.</h2>
        <div>
          <p className="innovation-research-statement">Better possibilities begin with better understanding.</p>
          <p>Quality, ingredient knowledge and product development inform the possibilities we explore.</p>
          <ButtonLink to="/enquiry">Explore your requirements</ButtonLink>
        </div>
      </div>
    </section>

    <section className="innovation-next innovation-container" aria-labelledby="innovation-next-title">
      <ResearchPhoto name="testing" className="innovation-testing-photo" />
      <div className="innovation-next-copy">
        <h2 id="innovation-next-title">What’s next?</h2>
        <p className="innovation-next-intro">A fresh look at what food can become.</p>
        <div className="innovation-next-topics">
          <article><h3>Evolving ingredients</h3><p>Emerging food ingredients and changing consumer preferences invite us to look beyond the familiar.</p></article>
          <article><h3>New applications</h3><p>Different formats, textures and uses can open up new product possibilities for our customers.</p></article>
          <article><h3>Smarter ways of working</h3><p>Technology, better sourcing practices and meaningful partnerships can help make ingredient supply more efficient and responsive.</p></article>
        </div>
      </div>
    </section>

    <section className="innovation-vision innovation-container innovation-two-column" aria-labelledby="innovation-vision-title">
      <h2 id="innovation-vision-title">Nourishing tomorrow.</h2>
      <div className="innovation-prose">
        <p>We aspire to contribute to a smarter, more sustainable and opportunity driven food industry by bringing together innovative ideas, dependable ingredients and meaningful partnerships.</p>
        <p>Building better possibilities with every ingredient.</p>
      </div>
    </section>

    <section className="innovation-contact" aria-labelledby="innovation-contact-title">
      <div className="innovation-container innovation-contact-inner">
        <div>
          <h2 id="innovation-contact-title">Let’s innovate together.</h2>
          <p>For food manufacturers, distributors and business partners. Share your requirements and explore the next possibility with LYCA.</p>
        </div>
        <ButtonLink to="/enquiry">Talk to our team</ButtonLink>
      </div>
    </section>
  </div>
}
