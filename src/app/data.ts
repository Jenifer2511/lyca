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
  homeCoffee: "/images/editorial/collection-coffee.jpg",
  homeCoconut: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmFhDUkcoGSpgZwEttWvLCzOeeOX30aeOu84ABQjxgQQ&s=10",
  homeFruit: "/images/berries.webp",
  homeConnection: "/images/editorial/ingredient-connection.png",
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

export const categories: Category[] = [
  {
    id: "juice-concentrates",
    title: "Juice Concentrates, Purees, Pulps & Pastes",
    shortTitle: "Juice & Fruit Ingredients",
    description:
      "A broad fruit and vegetable portfolio for beverage, dairy, bakery, sauce, and food manufacturing applications.",
    image: images.mango,
    imageAlt: "Mango juice and freshly sliced mango against a dark backdrop",
    imageCaption: "MANGO / CONCENTRATES & PUREES",
    groups: [
      {
        name: "Mango",
        items: [
          "Alphonso Mango Pulp",
          "Totapuri Mango Pulp / Concentrate",
          "Kesar Mango Pulp",
          "Sindhura Mango Pulp",
          "Tommy Atkins Mango Puree",
          "Magdalena Mango Puree",
        ],
      },
      {
        name: "Guava",
        items: [
          "White Guava Juice Concentrate / Pulp",
          "Pink Guava Juice Concentrate / Pulp",
        ],
      },
      {
        name: "Tomato",
        items: [
          "Tomato Paste (CB & HB)",
          "Dehydrated Tomato Flakes",
        ],
      },
      {
        name: "Chilli, Pepper, Ginger & Garlic",
        items: [
          "Red and Green Chilli Puree",
          "Cayenne Pepper Paste",
          "Fermented Red Chilli Paste",
          "Red and Green Ripened Chilli Paste",
          "Ginger Puree",
          "Garlic Paste",
        ],
      },
      {
        name: "Other Concentrates & Purees",
        items: [
          "Frozen Concentrated Orange Juice",
          "Apple Juice Concentrate / Puree / NFC",
          "Red Grape Juice Concentrate",
          "White Grape Juice Concentrate",
          "Sweetening Compound",
          "Low Acid White Grape Juice Concentrate",
          "Pineapple Juice Concentrate",
          "Deionized Pineapple Juice Concentrate",
          "Mixed Fruit Juice Concentrate",
          "Strawberry Puree",
          "Pomegranate Juice Concentrate",
          "Apricot Puree / Diced / Halves / Juice Concentrate",
          "Pear and Peach Juice Concentrate / Puree",
        ],
      },
    ],
    note: "Brochure packaging formats include aseptic packs, aseptic bins, cans, frozen products, and concentrates. Sizes vary by format, and availability should be confirmed for each product.",
  },
  {
    id: "coconut-products",
    title: "Coconut Products",
    shortTitle: "Coconut Products",
    description:
      "Versatile coconut ingredients for confectionery, bakery, beverage, culinary, and prepared food applications.",
    image: images.coconut,
    imageAlt: "Fresh coconut halves and pieces on a dark surface",
    imageCaption: "COCONUT / MILK, OIL & DESICCATED",
    groups: [
      {
        name: "Coconut Range",
        items: [
          "Low-Fat Desiccated Coconut — Fine & Medium",
          "High-Fat Desiccated Coconut — Fine & Medium",
          "Desiccated Coconut Flakes",
          "Coconut Cream Powder",
          "Coconut Sugar",
          "Toasted Coconut Paste",
          "Virgin Coconut Oil",
          "Aseptic Coconut Milk & Water",
        ],
      },
    ],
  },
  {
    id: "coffee-cocoa",
    title: "Coffee & Cocoa",
    shortTitle: "Coffee & Cocoa",
    description:
      "Coffee formats and cocoa ingredients for beverages, desserts, confectionery, and manufactured food applications.",
    image: images.coffee,
    imageAlt: "Roasted coffee beans on dark stone",
    imageCaption: "COFFEE & COCOA / AROMA & DEPTH",
    groups: [
      {
        name: "Coffee",
        items: [
          "Spray-Dried Instant Coffee",
          "Agglomerated Instant Coffee",
          "Decaffeinated Instant Coffee",
          "Instant & Micro-Ground Coffee",
          "Flavoured Instant Coffee",
          "Coffee Extract",
          "Coffee Oil",
          "Raw Caffeine",
          "Naturally Decaffeinated Green Coffee",
        ],
      },
      { name: "Cocoa", items: ["Cocoa Powder"] },
    ],
  },
  {
    id: "dairy-ingredients",
    title: "Dairy Ingredients",
    shortTitle: "Dairy Ingredients",
    description:
      "A structured range for dairy, beverage, bakery, nutrition, dessert, and prepared food applications.",
    image: images.dairyIngredients,
    imageAlt: "Milk bottles, yoghurt, cheese, butter and milk powder arranged on a wooden board",
    imageCaption: "DAIRY / TEXTURE & RICHNESS",
    groups: [
      {
        name: "Dairy Range",
        items: [
          "Whole Milk Powder",
          "Skimmed Milk Powder",
          "Fat-Filled Milk Powder",
          "Milk Stabilizers & Emulsifiers",
          "Unsalted Sweet Cream Lactic Butter",
          "Cheese Powder",
          "Curd Powder",
          "Yoghurt Powder",
          "Whey Protein Powder",
          "Soy Milk Powder",
        ],
      },
    ],
  },
  {
    id: "fruit-preparations",
    title: "Fruit Preparations",
    shortTitle: "Fruit Preparations",
    description:
      "Fruit preparations developed for integration across a wide range of finished food and beverage formats.",
    image: images.fruitPreparations,
    imageAlt: "Blueberries, granola and yoghurt illustrating a fruit preparation application",
    imageCaption: "FRUIT PREPARATIONS / FLAVOUR & TEXTURE",
    groups: [
      {
        name: "Applications",
        items: [
          "Dairy products",
          "Ice cream",
          "Beverages",
          "Bakery products",
          "Desserts",
          "Confectionery",
        ],
      },
    ],
  },
  {
    id: "spray-dried-powders",
    title: "Spray-Dried Powders",
    shortTitle: "Spray-Dried Powders",
    description:
      "Fruit, specialty, and natural colour powders presented in an easy-to-browse ingredient collection.",
    image: images.sprayDriedPowders,
    imageAlt: "Green mangoes and leaves illustrating the source fruit for mango powders",
    imageCaption: "FRUIT & SPECIALTY POWDERS / SOURCE FRUIT",
    groups: [
      {
        name: "Fruit Powders",
        items: [
          "Ripe Mango",
          "Raw Mango",
          "Orange",
          "Tamarind",
          "Pineapple",
          "Pomegranate",
          "Ripe Papaya",
          "Raw Papaya",
          "Sweet Lime",
          "Ripe Banana",
          "Raw Banana",
          "Black Grape",
          "Guava",
          "Strawberry",
          "Apple",
          "Watermelon",
          "Cranberry",
          "Blueberry",
          "Raspberry",
        ],
      },
      {
        name: "Specialty Powders",
        items: [
          "Honey",
          "Vinegar",
          "Apple Cider Vinegar",
          "Jaggery",
          "Coconut Milk",
          "Coconut Water",
          "Amla",
        ],
      },
      {
        name: "Natural Colour Powders",
        items: ["Caramel", "Orange Annatto", "Yellow Annatto", "Beetroot"],
      },
    ],
  },
  {
    id: "food-colours",
    title: "Food Colours",
    shortTitle: "Food Colours",
    description:
      "A varied palette of plant-derived colour ingredients for food and beverage product development.",
    image: images.foodColours,
    imageAlt: "Green mangoes and leaves illustrating the source fruit for mango powders",
    imageCaption: "FOOD COLOURS / A PALETTE OF POSSIBILITIES",
    groups: [
      {
        name: "Natural Colour Range",
        items: [
          "Beetroot",
          "Black Carrot",
          "Orange Carrot",
          "Safflower",
          "Spirulina",
          "Chokeberry",
          "Elderberry",
          "Black Currant",
          "Red Radish",
          "Purple Potato",
          "Dried Apple",
          "Spirulina and Safflower",
          "Hibiscus",
        ],
      },
    ],
  },
]

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
