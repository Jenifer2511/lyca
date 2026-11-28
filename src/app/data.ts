import seed from "../../server/catalogue-seed.json"
export type ProductGroup = { name: string; items: string[] }
export type Category = {
  id: string
  title: string
  shortTitle: string
  description: string
  image: string
  imageAlt: string
  imageCaption: string
  groups: ProductGroup[]
  note?: string
}

const images = {
  fruit: "/images/fruit.webp",
  companyStory: "/images/selected/dried-fruit.jpg",
  companyHero: "https://i.pinimg.com/736x/88/39/17/8839172c0a7eb0bd6649fbb4650e6383.jpg",
  applicationsHero: "/images/editorial/applications-hero.jpg",
  applicationBakery: "/images/editorial/application-bakery.jpg",
  homeCoffee: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkV0ZAZm9ohC_h7_XaJat_aseHVf9Bt80W7yQNJI8pzqtXzaA2zt3TgJM&s=10",
  homeCoconut: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmFhDUkcoGSpgZwEttWvLCzOeeOX30aeOu84ABQjxgQQ&s=10",
  homeFruit: "/images/berries.webp",
  homeConnection: "https://images.pexels.com/photos/4871338/pexels-photo-4871338.jpeg?auto=compress&cs=tinysrgb&w=1600",
  homeApplications: "/images/editorial/home-applications.jpg",
  foodColours: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLKfBds6cpAfEOS1uFn56aGOMO30QM2pSqnMxoEfpYMA&s",
  fruitPreparations: "https://i.pinimg.com/736x/b2/e7/b1/b2e7b14b8ccc364acd9357c5d11db571.jpg",
  dairyIngredients: "/images/selected/dairy-ingredients.jpg",
  sprayDriedPowders: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF8WEtKoWPszVex-Tr9CnrJhayh-qnPvID0sFtoKs5pw&s=10",
  culinarySauces: "/images/selected/culinary-sauces.jpg",
  globalNetwork: "/images/selected/global-network.jpg",
  citrus: "/images/citrus.webp",
  mango: "/images/mango.webp",
  coconut: "/images/coconut.webp",
  coffee: "/images/coffee.webp",
  dairy: "/images/editorial/application-dairy.jpg",
  berries: "/images/berries.webp",
  powder: "/images/powder.webp",
  colors: "/images/colors.webp",
  cocoa: "/images/cocoa.webp",
  tomato: "/images/tomato.webp",
  patisserie: "/images/patisserie.webp",
  dessert: "/images/dessert.webp",
  blueberries: "/images/blueberries.webp",
}

export { images }

export const categories: Category[] = seed

export const offices = [
  {
    country: "United Arab Emirates",
    flagCode: "ae",
    city: "SPC Free Zone, Sharjah, UAE",
    email: "mohamed@lycafoods.com",
  },
  {
    country: "Kuwait",
    flagCode: "kw",
    city: "Business Plaza, Kuwait City, Kuwait",
    email: "sales@lycafoods.com",
  },
  {
    country: "India",
    flagCode: "in",
    city: "Erode, Tamil Nadu, India",
    email: "sales2@lycafoods.com",
  },
  {
    country: "Egypt",
    flagCode: "eg",
    city: "Cairo, Egypt",
    email: "ruaa.k@lycafoods.com",
  },
  {
    country: "Tanzania",
    flagCode: "tz",
    city: "Dar es Salaam, Tanzania",
    email: "marcelina.m@lycafoods.com",
  },
  {
    country: "Sri Lanka",
    flagCode: "lk",
    city: "Nittambuwa, Sri Lanka",
    email: "mano.p@lycafoods.com",
  },
]
