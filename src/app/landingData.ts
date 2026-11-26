export const landingImages = {
 coconut: "/images/editorial/hero-coconut.jpg", colours: "/images/editorial/hero-colour.jpg",
 botanical: "/images/landing/botanical.webp", fig: "/images/landing/fig.webp",
 dessert: "/images/landing/dessert.webp", drink: "/images/landing/citrus-drink.webp",
}
/** These visuals illustrate ingredient families and creative applications. */
export const landingStories = [
 {title:"Naturally rich.\nBeautifully versatile.",name:"Coconut products",tag:"COCONUT",image:landingImages.coconut,alt:"Coconuts with water poured over them against a dark background",detail:"From coconut milk and cream powder to oils and desiccated formats. Explore the versatility of coconut.",to:"/products#coconut-products"},
 {title:"A palette of\npossibilities.",name:"Colour inspiration",tag:"COLOUR INSPIRATION",image:"https://www.indiatree.com/wp-content/uploads/2024/01/dye-lay.jpg",alt:"A flat lay of food dye ingredients",detail:"Colour, texture and a little imagination. Explore colour ingredients for your next food or beverage idea.",to:"/products#food-colours"},
 {title:"A fresh take\non possibility.",name:"Beverage inspiration",tag:"BEVERAGE INSPIRATION",image:landingImages.botanical,alt:"Avocado and a vivid green liquid splash against an emerald background",detail:"Fresh visual inspiration for your next beverage idea. Tell us the flavour, texture and application you have in mind.",to:"/applications"},
 {title:"Character,\nfrom within.",name:"Fruit inspiration",tag:"FRUIT INSPIRATION",image:landingImages.fig,alt:"A sliced purple fig with glistening water droplets",detail:"Bright notes. Rich character. Explore our fruit concentrates, purees and preparations for your next formulation.",to:"/products#juice-concentrates"},
 {title:"Make every\ncreation memorable.",name:"Dessert applications",tag:"DESSERT APPLICATIONS",image:landingImages.dessert,alt:"Purple pancakes topped with blueberries and a stream of syrup",detail:"Bring flavour, texture and colour together. Explore ingredient ideas for bakery, desserts and confectionery.",to:"/applications"},
 {title:"Your vision.\nOur ingredients.",name:"Your next creation",tag:"THE NEXT CREATION",image:landingImages.drink,alt:"A luminous green drink garnished with citrus in a glass",detail:"From an early concept to a signature taste, the next conversation begins with your idea.",to:"/enquiry"},
] as const
