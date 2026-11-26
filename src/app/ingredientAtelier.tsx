import { useState } from "react"
import { Link } from "react-router"
import { ArrowUpRight } from "lucide-react"
import { images } from "./data"
import { IngredientPhoto } from "./ingredientPhoto"

type AtelierStory = { name: string; tag: string; image: string; alt: string; detail: string; to: string; position?: string }
// Each gallery photograph is separate from the hero, collections and interior pages.
const atelierStories: AtelierStory[] = [
  { name: "Dairy ingredients", tag: "DAIRY", image: "/images/dairy.webp", alt: "Fresh milk being poured into a glass", detail: "From milk powders and whey proteins to butter and cheese powder. Explore ingredients that bring richness and texture to your next product.", to: "/products#dairy-ingredients" },
  { name: "Colour ingredients", tag: "COLOUR", image: "https://amoretti.com/cdn/shop/articles/colorful-powders-in-bowls-on-dark-background_1200x845.jpg?v=1793731187", alt: "Bowls of natural plant-based color powders", detail: "Discover botanical colour ingredients, from hibiscus and beetroot to spirulina and black carrot.", to: "/products#food-colours" },
  { name: "Beverage inspiration", tag: "BEVERAGES", image: "/images/editorial/atelier-beverage.jpg", alt: "An orange drink being finished with a fresh herb garnish", detail: "Fresh visual inspiration for your next beverage idea. Tell us the flavour, texture and application you have in mind.", to: "/applications" },
  { name: "Fruit ingredients", tag: "FRUIT", image: "https://i.pinimg.com/736x/76/e4/1d/76e41daef8b51acc0a9f8696b62a2499.jpg", alt: "A colorful assortment of tropical fruits with water splashing around them", detail: "Bright citrus notes. Explore fruit concentrates, purees and preparations for beverages and food applications.", to: "/products#juice-concentrates" },
  { name: "Dessert applications", tag: "DESSERTS", image: images.patisserie, alt: "A fruit tart topped with strawberries, blueberries and raspberries", detail: "Bring flavour, texture and colour together. Explore ingredient ideas for bakery, desserts and confectionery.", to: "/applications" },
  { name: "Your next creation", tag: "YOUR NEXT CREATION", image: "https://cdn.builder.io/api/v1/image/assets%2F884d5fc485c54ebe866f566d5dc6bc5a%2F0fb99ca5131f4c2e9698027661697afa?format=webp&width=800&height=1200", alt: "Tomatoes, peppers, and other vegetables falling against a vibrant red background", detail: "From an early concept to a signature taste, the next conversation begins with your idea.", to: "/enquiry" },
]

export function IngredientAtelier() {
  const [active, setActive] = useState(0)
  const current = atelierStories[active]
  return <section className="atelier section" aria-labelledby="atelier-title">
    <div className="atelier-intro reveal"><h2 id="atelier-title">A study in <em>good taste.</em></h2><p>Explore the colours, textures and flavours that give your ideas their character.</p></div>
    <div className="atelier-layout">
      <div className="atelier-menu" role="tablist" aria-label="Explore ingredient collections" aria-orientation="vertical">{atelierStories.map((category, i) => <button key={category.tag} id={`atelier-tab-${i}`} role="tab" type="button" aria-selected={active === i} aria-controls="atelier-panel" tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)} onKeyDown={event => {
        let next = i
        if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (i + 1) % atelierStories.length
        else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (i - 1 + atelierStories.length) % atelierStories.length
        else if (event.key === "Home") next = 0
        else if (event.key === "End") next = atelierStories.length - 1
        else return
        event.preventDefault(); setActive(next); document.getElementById(`atelier-tab-${next}`)?.focus()
      }}><span>{category.name}</span><ArrowUpRight size={18} aria-hidden="true" /></button>)}</div>
      <div className="atelier-exhibit" id="atelier-panel" role="tabpanel" aria-labelledby={`atelier-tab-${active}`} tabIndex={0}>
        <div className="atelier-photograph" key={current.tag}><IngredientPhoto src={current.image} alt={current.alt} style={{ objectPosition: current.position || "center" }} loading="lazy" sizes="(max-width: 700px) 90vw, 55vw" /><span className="atelier-plate">LYCA <i>Collection</i></span></div>
        <div className="atelier-caption"><div><p>{current.tag}</p><span>{current.detail}</span></div><Link to={current.to} aria-label={`Explore ${current.name}`}><ArrowUpRight size={24} /></Link></div>
      </div>
    </div>
  </section>
}
