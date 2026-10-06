export interface MissingProductItem {
  producto: string;
  variante: string;
  nombre: string;
  categoria: 'Alimentos' | 'Snack / Heno' | 'Salud' | 'Higiene' | 'Accesorios';
  marca: string;
  precioBruto: number;
  precioNeto: number;
  costoNeto: number;
}

export const MISSING_ALIMENTOS: MissingProductItem[] = [
  // Royal Canin
  {
    producto: "Royal",
    variante: "Hypoallergenic small dog 2 kgs",
    nombre: "Royal - Hypoallergenic small dog 2 kgs",
    categoria: "Alimentos",
    marca: "Royal Canin",
    precioBruto: 26000,
    precioNeto: 21849,
    costoNeto: 14505
  },
  {
    producto: "Royal",
    variante: "Hypoallergenic gato 1,5 kgs",
    nombre: "Royal - Hypoallergenic gato 1,5 kgs",
    categoria: "Alimentos",
    marca: "Royal Canin",
    precioBruto: 26500,
    precioNeto: 22269,
    costoNeto: 12207
  },
  {
    producto: "Royal",
    variante: "Hypoalergenic 10,1 kgs",
    nombre: "Royal - Hypoalergenic 10,1 kgs",
    categoria: "Alimentos",
    marca: "Royal Canin",
    precioBruto: 88000,
    precioNeto: 73950,
    costoNeto: 55687
  },
  {
    producto: "Royal",
    variante: "Renal gato 2 kgs",
    nombre: "Royal - Renal gato 2 kgs",
    categoria: "Alimentos",
    marca: "Royal Canin",
    precioBruto: 26190,
    precioNeto: 22008,
    costoNeto: 15962
  },
  {
    producto: "Royal",
    variante: "Urinary care 1,5 kgs",
    nombre: "Royal - Urinary care 1,5 kgs",
    categoria: "Alimentos",
    marca: "Royal Canin",
    precioBruto: 19500,
    precioNeto: 16387,
    costoNeto: 11137
  },
  {
    producto: "Royal",
    variante: "Urinary care 7,5 kgs",
    nombre: "Royal - Urinary care 7,5 kgs",
    categoria: "Alimentos",
    marca: "Royal Canin",
    precioBruto: 67000,
    precioNeto: 56303,
    costoNeto: 42905
  },
  {
    producto: "Royal perro",
    variante: "Hepatic 10,1",
    nombre: "Royal perro - Hepatic 10,1",
    categoria: "Alimentos",
    marca: "Royal Canin",
    precioBruto: 82000,
    precioNeto: 68908,
    costoNeto: 48813
  },
  {
    producto: "Royal perro",
    variante: "Puppy Mini 3 kgs",
    nombre: "Royal perro - Puppy Mini 3 kgs",
    categoria: "Alimentos",
    marca: "Royal Canin",
    precioBruto: 27000,
    precioNeto: 22689,
    costoNeto: 14393
  },
  {
    producto: "Royal perro",
    variante: "Dachshund 7.5 kgs",
    nombre: "Royal perro - Dachshund 7.5 kgs",
    categoria: "Alimentos",
    marca: "Royal Canin",
    precioBruto: 57000,
    precioNeto: 47899,
    costoNeto: 38585
  },
  {
    producto: "Royal",
    variante: "Mini Adult 2,5 kgs",
    nombre: "Royal - Mini Adult 2,5 kgs",
    categoria: "Alimentos",
    marca: "Royal Canin",
    precioBruto: 25000,
    precioNeto: 21008,
    costoNeto: 13357
  },
  {
    producto: "Royal",
    variante: "Mini Adult 7,5 kgs",
    nombre: "Royal - Mini Adult 7,5 kgs",
    categoria: "Alimentos",
    marca: "Royal Canin",
    precioBruto: 52000,
    precioNeto: 43697,
    costoNeto: 34572
  },
  {
    producto: "Royal",
    variante: "Yorkshire 2,5 kgs",
    nombre: "Royal - Yorkshire 2,5 kgs",
    categoria: "Alimentos",
    marca: "Royal Canin",
    precioBruto: 25000,
    precioNeto: 21008,
    costoNeto: 14276
  },
  {
    producto: "Royal gato",
    variante: "Castrado 4 kgs",
    nombre: "Royal gato - Castrado 4 kgs",
    categoria: "Alimentos",
    marca: "Royal Canin",
    precioBruto: 34000,
    precioNeto: 28571,
    costoNeto: 21090
  },
  {
    producto: "Royal",
    variante: "Castrado 1,5 kgs",
    nombre: "Royal - Castrado 1,5 kgs",
    categoria: "Alimentos",
    marca: "Royal Canin",
    precioBruto: 19000,
    precioNeto: 15966,
    costoNeto: 10179
  },
  {
    producto: "Royal",
    variante: "Indoor 1,5 kgs",
    nombre: "Royal - Indoor 1,5 kgs",
    categoria: "Alimentos",
    marca: "Royal Canin",
    precioBruto: 20000,
    precioNeto: 16807,
    costoNeto: 10179
  },
  {
    producto: "Royal",
    variante: "Indoor +7   1,5kgs",
    nombre: "Royal - Indoor +7   1,5kgs",
    categoria: "Alimentos",
    marca: "Royal Canin",
    precioBruto: 20000,
    precioNeto: 16807,
    costoNeto: 10587
  },
  {
    producto: "Royal",
    variante: "Lata gastrointestinal perro",
    nombre: "Royal - Lata gastrointestinal perro",
    categoria: "Alimentos",
    marca: "Royal Canin",
    precioBruto: 4000,
    precioNeto: 3361,
    costoNeto: 2387
  },
  {
    producto: "Royal",
    variante: "Lata Recovery",
    nombre: "Royal - Lata Recovery",
    categoria: "Alimentos",
    marca: "Royal Canin",
    precioBruto: 3800,
    precioNeto: 3193,
    costoNeto: 2195
  },
  {
    producto: "Royal pouch",
    variante: "Sensory Taste",
    nombre: "Royal pouch - Sensory Taste",
    categoria: "Alimentos",
    marca: "Royal Canin",
    precioBruto: 2600,
    precioNeto: 2185,
    costoNeto: 1204
  },
  {
    producto: "Royal pouch",
    variante: "Sensory Smell",
    nombre: "Royal pouch - Sensory Smell",
    categoria: "Alimentos",
    marca: "Royal Canin",
    precioBruto: 2600,
    precioNeto: 2185,
    costoNeto: 1204
  },

  // Purina Pro Plan
  {
    producto: "Proplan gato",
    variante: "Kitten 1 kgs",
    nombre: "Proplan gato - Kitten 1 kgs",
    categoria: "Alimentos",
    marca: "Purina Pro Plan",
    precioBruto: 11000,
    precioNeto: 9244,
    costoNeto: 6523
  },
  {
    producto: "Proplan gato",
    variante: "Urinary 3 kgs",
    nombre: "Proplan gato - Urinary 3 kgs",
    categoria: "Alimentos",
    marca: "Purina Pro Plan",
    precioBruto: 28000,
    precioNeto: 23529,
    costoNeto: 16559
  },
  {
    producto: "Proplan gato",
    variante: "Urinary 7,5 kgs",
    nombre: "Proplan gato - Urinary 7,5 kgs",
    categoria: "Alimentos",
    marca: "Purina Pro Plan",
    precioBruto: 54000,
    precioNeto: 45378,
    costoNeto: 31571
  },
  {
    producto: "Proplan gato",
    variante: "Adulto 3 kgs",
    nombre: "Proplan gato - Adulto 3 kgs",
    categoria: "Alimentos",
    marca: "Purina Pro Plan",
    precioBruto: 26000,
    precioNeto: 21849,
    costoNeto: 15007
  },
  {
    producto: "Proplan gato",
    variante: "Sterilized 7,5 kgs",
    nombre: "Proplan gato - Sterilized 7,5 kgs",
    categoria: "Alimentos",
    marca: "Purina Pro Plan",
    precioBruto: 54000,
    precioNeto: 45378,
    costoNeto: 31571
  },
  {
    producto: "Proplan Pouch",
    variante: "Gato Adulto pollo",
    nombre: "Proplan Pouch - Gato Adulto pollo",
    categoria: "Alimentos",
    marca: "Purina Pro Plan",
    precioBruto: 1600,
    precioNeto: 1345,
    costoNeto: 927
  },
  {
    producto: "Proplan Pouch",
    variante: "Gato adulto salmon",
    nombre: "Proplan Pouch - Gato adulto salmon",
    categoria: "Alimentos",
    marca: "Purina Pro Plan",
    precioBruto: 1600,
    precioNeto: 1345,
    costoNeto: 980
  },
  {
    producto: "Proplan perro",
    variante: "Puppy razas pequeñas 3 kgs",
    nombre: "Proplan perro - Puppy razas pequeñas 3 kgs",
    categoria: "Alimentos",
    marca: "Purina Pro Plan",
    precioBruto: 25000,
    precioNeto: 21008,
    costoNeto: 13377
  },
  {
    producto: "Proplan perro",
    variante: "Puppy raza mediana 1 kg",
    nombre: "Proplan perro - Puppy raza mediana 1 kg",
    categoria: "Alimentos",
    marca: "Purina Pro Plan",
    precioBruto: 11000,
    precioNeto: 9244,
    costoNeto: 1
  },
  {
    producto: "Proplan perro",
    variante: "Puppy razas medianas 3 kgs",
    nombre: "Proplan perro - Puppy razas medianas 3 kgs",
    categoria: "Alimentos",
    marca: "Purina Pro Plan",
    precioBruto: 24000,
    precioNeto: 20168,
    costoNeto: 12936
  },
  {
    producto: "Proplan perro",
    variante: "Adulto raza mediana 12 kgs",
    nombre: "Proplan perro - Adulto raza mediana 12 kgs",
    categoria: "Alimentos",
    marca: "Purina Pro Plan",
    precioBruto: 56000,
    precioNeto: 47059,
    costoNeto: 32296
  },
  {
    producto: "Proplan perro",
    variante: "Adulto raza grande 12 kgs",
    nombre: "Proplan perro - Adulto raza grande 12 kgs",
    categoria: "Alimentos",
    marca: "Purina Pro Plan",
    precioBruto: 56000,
    precioNeto: 47059,
    costoNeto: 32296
  },
  {
    producto: "Proplan perro",
    variante: "Reduce calorias  raza mediana a grande12 kgs",
    nombre: "Proplan perro - Reduce calorias  raza mediana a grande12 kgs",
    categoria: "Alimentos",
    marca: "Purina Pro Plan",
    precioBruto: 57000,
    precioNeto: 47899,
    costoNeto: 32296
  },
  {
    producto: "Proplan perro",
    variante: "Reduce calorias razas pequeñas 3 kgs",
    nombre: "Proplan perro - Reduce calorias razas pequeñas 3 kgs",
    categoria: "Alimentos",
    marca: "Purina Pro Plan",
    precioBruto: 24000,
    precioNeto: 20168,
    costoNeto: 14339
  },
  {
    producto: "Proplan perro",
    variante: "sensitive skin salmon 12 kgs",
    nombre: "Proplan perro - sensitive skin salmon 12 kgs",
    categoria: "Alimentos",
    marca: "Purina Pro Plan",
    precioBruto: 58000,
    precioNeto: 48739,
    costoNeto: 33539
  },
  {
    producto: "Proplan perro",
    variante: "Sensitive skin razas medianas y grandes 3 kgs",
    nombre: "Proplan perro - Sensitive skin razas medianas y grandes 3 kgs",
    categoria: "Alimentos",
    marca: "Purina Pro Plan",
    precioBruto: 24000,
    precioNeto: 20168,
    costoNeto: 13453
  },

  // Virbac HPM & Veterinario
  {
    producto: "Senior Neutered dog",
    variante: "3 kgs",
    nombre: "Senior Neutered dog - 3 kgs",
    categoria: "Alimentos",
    marca: "Virbac",
    precioBruto: 31000,
    precioNeto: 26050,
    costoNeto: 15206
  },
  {
    producto: "Senior cat",
    variante: "3kgs",
    nombre: "Senior cat - 3kgs",
    categoria: "Alimentos",
    marca: "Virbac",
    precioBruto: 40000,
    precioNeto: 33613,
    costoNeto: 19874
  },
  {
    producto: "Adult cat salmon",
    variante: "1,5 kgs",
    nombre: "Adult cat salmon - 1,5 kgs",
    categoria: "Alimentos",
    marca: "Virbac",
    precioBruto: 24000,
    precioNeto: 20168,
    costoNeto: 13034
  },
  {
    producto: "Adult cat salmon",
    variante: "7 kg",
    nombre: "Adult cat salmon - 7 kg",
    categoria: "Alimentos",
    marca: "Virbac",
    precioBruto: 67000,
    precioNeto: 56303,
    costoNeto: 38223
  },
  {
    producto: "Kidney support perro",
    variante: "3 kgs",
    nombre: "Kidney support perro - 3 kgs",
    categoria: "Alimentos",
    marca: "Virbac",
    precioBruto: 35000,
    precioNeto: 29412,
    costoNeto: 18765
  },
  {
    producto: "Kidney support perro",
    variante: "12 kgs",
    nombre: "Kidney support perro - 12 kgs",
    categoria: "Alimentos",
    marca: "Virbac",
    precioBruto: 88000,
    precioNeto: 73950,
    costoNeto: 47791
  },
  {
    producto: "Kidney & Joint",
    variante: "N°2 de 1,5 kg",
    nombre: "Kidney & Joint - N°2 de 1,5 kg",
    categoria: "Alimentos",
    marca: "Virbac",
    precioBruto: 34000,
    precioNeto: 28571,
    costoNeto: 14791
  },
  {
    producto: "Baby dog large-medium",
    variante: "3 kgs",
    nombre: "Baby dog large-medium - 3 kgs",
    categoria: "Alimentos",
    marca: "Virbac",
    precioBruto: 30000,
    precioNeto: 25210,
    costoNeto: 13067
  },
  {
    producto: "Adult dog large-medium",
    variante: "12kgs",
    nombre: "Adult dog large-medium - 12kgs",
    categoria: "Alimentos",
    marca: "Virbac",
    precioBruto: 73000,
    precioNeto: 61345,
    costoNeto: 41781
  },
  {
    producto: "Adulto dog small-toy",
    variante: "3 kgs",
    nombre: "Adulto dog small-toy - 3 kgs",
    categoria: "Alimentos",
    marca: "Virbac",
    precioBruto: 27000,
    precioNeto: 22689,
    costoNeto: 15437
  },
  {
    producto: "Adulto dog small-toy",
    variante: "7 kgs",
    nombre: "Adulto dog small-toy - 7 kgs",
    categoria: "Alimentos",
    marca: "Virbac",
    precioBruto: 55000,
    precioNeto: 46218,
    costoNeto: 27408
  },
  {
    producto: "Adult Neutered",
    variante: "Small and toy 3 kgs",
    nombre: "Adult Neutered - Small and toy 3 kgs",
    categoria: "Alimentos",
    marca: "Virbac",
    precioBruto: 29000,
    precioNeto: 24370,
    costoNeto: 15344
  },
  {
    producto: "Dissolution prevention dog",
    variante: "12 kgs",
    nombre: "Dissolution prevention dog - 12 kgs",
    categoria: "Alimentos",
    marca: "Virbac",
    precioBruto: 83000,
    precioNeto: 69748,
    costoNeto: 46820
  },
  {
    producto: "Hypoallergy perro",
    variante: "12 kgs",
    nombre: "Hypoallergy perro - 12 kgs",
    categoria: "Alimentos",
    marca: "Virbac",
    precioBruto: 99000,
    precioNeto: 83193,
    costoNeto: 51858
  },
  {
    producto: "Weight loss & control",
    variante: "1,5 kgs",
    nombre: "Weight loss & control - 1,5 kgs",
    categoria: "Alimentos",
    marca: "Virbac",
    precioBruto: 27000,
    precioNeto: 22689,
    costoNeto: 15114
  },

  // Belcando & Leonardo
  {
    producto: "Latas Belcando",
    variante: "Pollo con pato y zanahoria 800 grs",
    nombre: "Latas Belcando - Pollo con pato y zanahoria 800 grs",
    categoria: "Alimentos",
    marca: "Belcando",
    precioBruto: 8000,
    precioNeto: 6723,
    costoNeto: 4295
  },
  {
    producto: "Latas Belcando",
    variante: "Cordero 400",
    nombre: "Latas Belcando - Cordero 400",
    categoria: "Alimentos",
    marca: "Belcando",
    precioBruto: 5500,
    precioNeto: 4622,
    costoNeto: 3059
  }
];

export const MISSING_SNACKS_HENO: MissingProductItem[] = [
  {
    producto: "Mazuri",
    variante: "hedgehog 500 grs",
    nombre: "Mazuri - hedgehog 500 grs",
    categoria: "Alimentos",
    marca: "Mazuri",
    precioBruto: 7500,
    precioNeto: 6303,
    costoNeto: 4609
  },
  {
    producto: "Mazuri",
    variante: "Rabbit 2,5 kgs",
    nombre: "Mazuri - Rabbit 2,5 kgs",
    categoria: "Alimentos",
    marca: "Mazuri",
    precioBruto: 24000,
    precioNeto: 20168,
    costoNeto: 16421
  },
  {
    producto: "Naturale",
    variante: "Ballica",
    nombre: "Naturale - Ballica",
    categoria: "Snack / Heno",
    marca: "Naturale",
    precioBruto: 4500,
    precioNeto: 3782,
    costoNeto: 1660
  },
  {
    producto: "Naturale",
    variante: "Ballica/topinambur",
    nombre: "Naturale - Ballica/topinambur",
    categoria: "Snack / Heno",
    marca: "Naturale",
    precioBruto: 5500,
    precioNeto: 4622,
    costoNeto: 2550
  },
  {
    producto: "Naturale",
    variante: "Alfalfa",
    nombre: "Naturale - Alfalfa",
    categoria: "Snack / Heno",
    marca: "Naturale",
    precioBruto: 4365,
    precioNeto: 3668,
    costoNeto: 1660
  },
  {
    producto: "Timothy snack",
    variante: "Palitos de hierba timothy",
    nombre: "Timothy snack - Palitos de hierba timothy",
    categoria: "Snack / Heno",
    marca: "Timothy",
    precioBruto: 4000,
    precioNeto: 3361,
    costoNeto: 1950
  },
  {
    producto: "Timothy snack",
    variante: "Palitos de hierba de zanahoria",
    nombre: "Timothy snack - Palitos de hierba de zanahoria",
    categoria: "Snack / Heno",
    marca: "Timothy",
    precioBruto: 5000,
    precioNeto: 4202,
    costoNeto: 2490
  },
  {
    producto: "Timothy snack",
    variante: "Pastel de dientes de verduras y frutas",
    nombre: "Timothy snack - Pastel de dientes de verduras y frutas",
    categoria: "Snack / Heno",
    marca: "Timothy",
    precioBruto: 7000,
    precioNeto: 5882,
    costoNeto: 3250
  },
  {
    producto: "Timothy",
    variante: "Stick",
    nombre: "Timothy - Stick",
    categoria: "Snack / Heno",
    marca: "Timothy",
    precioBruto: 2500,
    precioNeto: 2101,
    costoNeto: 1090
  },
  {
    producto: "Timothy",
    variante: "bowl L",
    nombre: "Timothy - bowl L",
    categoria: "Snack / Heno",
    marca: "Timothy",
    precioBruto: 5000,
    precioNeto: 4202,
    costoNeto: 2250
  },
  {
    producto: "Timothy",
    variante: "Shapes",
    nombre: "Timothy - Shapes",
    categoria: "Snack / Heno",
    marca: "Timothy",
    precioBruto: 2500,
    precioNeto: 2101,
    costoNeto: 980
  },
  {
    producto: "Natural dogs",
    variante: "Chicken",
    nombre: "Natural dogs - Chicken",
    categoria: "Snack / Heno",
    marca: "Natural dogs",
    precioBruto: 3800,
    precioNeto: 3193,
    costoNeto: 2145
  },
  {
    producto: "Natural dogs",
    variante: "Beef",
    nombre: "Natural dogs - Beef",
    categoria: "Snack / Heno",
    marca: "Natural dogs",
    precioBruto: 3800,
    precioNeto: 3193,
    costoNeto: 2145
  },
  {
    producto: "Churu gato",
    variante: "Tuna Bonito",
    nombre: "Churu gato - Tuna Bonito",
    categoria: "Snack / Heno",
    marca: "Inaba Churu",
    precioBruto: 2800,
    precioNeto: 2353,
    costoNeto: 1264
  },
  {
    producto: "Churu gato",
    variante: "Pop Tuna",
    nombre: "Churu gato - Pop Tuna",
    categoria: "Snack / Heno",
    marca: "Inaba Churu",
    precioBruto: 2800,
    precioNeto: 2353,
    costoNeto: 1666
  },
  {
    producto: "Churu gato",
    variante: "Pop Chicken",
    nombre: "Churu gato - Pop Chicken",
    categoria: "Snack / Heno",
    marca: "Inaba Churu",
    precioBruto: 2800,
    precioNeto: 2353,
    costoNeto: 1666
  },
  {
    producto: "Churu Juicy Bites",
    variante: "Shrimp-Seafood",
    nombre: "Churu Juicy Bites - Shrimp-Seafood",
    categoria: "Snack / Heno",
    marca: "Inaba Churu",
    precioBruto: 3000,
    precioNeto: 2521,
    costoNeto: 1633
  },
  {
    producto: "Bil Jac",
    variante: "Peanut Butter & banana flavor",
    nombre: "Bil Jac - Peanut Butter & banana flavor",
    categoria: "Snack / Heno",
    marca: "Bil Jac",
    precioBruto: 4500,
    precioNeto: 3782,
    costoNeto: 2232
  },
  {
    producto: "Bil Jac",
    variante: "Chicken liver",
    nombre: "Bil Jac - Chicken liver",
    categoria: "Snack / Heno",
    marca: "Bil Jac",
    precioBruto: 4000,
    precioNeto: 3361,
    costoNeto: 1808
  },
  {
    producto: "Prebióticos",
    variante: "Articular perro",
    nombre: "Prebióticos - Articular perro",
    categoria: "Snack / Heno",
    marca: "You Up",
    precioBruto: 2375,
    precioNeto: 1996,
    costoNeto: 1386
  },
  {
    producto: "Qchefs",
    variante: "Granulado perro",
    nombre: "Qchefs - Granulado perro",
    categoria: "Snack / Heno",
    marca: "Qchefs",
    precioBruto: 9500,
    precioNeto: 7983,
    costoNeto: 5599
  },
  {
    producto: "Catnip",
    variante: "Hierba gatera",
    nombre: "Catnip - Hierba gatera",
    categoria: "Snack / Heno",
    marca: "",
    precioBruto: 4500,
    precioNeto: 3782,
    costoNeto: 2554
  }
];

export const MISSING_SALUD: MissingProductItem[] = [
  {
    producto: "Apoquel",
    variante: "5.4 mg",
    nombre: "Apoquel - 5.4 mg",
    categoria: "Salud",
    marca: "Zoetis",
    precioBruto: 42000,
    precioNeto: 35294,
    costoNeto: 27530
  },
  {
    producto: "Nexgard Spectra",
    variante: "7,6 a 15 kgs",
    nombre: "Nexgard Spectra - 7,6 a 15 kgs",
    categoria: "Salud",
    marca: "Boehringer Ingelheim",
    precioBruto: 12500,
    precioNeto: 10504,
    costoNeto: 6725
  },
  {
    producto: "Nexgard Spectra",
    variante: "30,1 a 60 kgs",
    nombre: "Nexgard Spectra - 30,1 a 60 kgs",
    categoria: "Salud",
    marca: "Boehringer Ingelheim",
    precioBruto: 17500,
    precioNeto: 14706,
    costoNeto: 9295
  },
  {
    producto: "Simparica Trio",
    variante: "20 a 40 kgs",
    nombre: "Simparica Trio - 20 a 40 kgs",
    categoria: "Salud",
    marca: "Zoetis",
    precioBruto: 19500,
    precioNeto: 16387,
    costoNeto: 10485
  },
  {
    producto: "Revolution",
    variante: "0-2,5kgs",
    nombre: "Revolution - 0-2,5kgs",
    categoria: "Salud",
    marca: "Zoetis",
    precioBruto: 13000,
    precioNeto: 10924,
    costoNeto: 6185
  },
  {
    producto: "Ehliquantel",
    variante: "",
    nombre: "Ehliquantel",
    categoria: "Salud",
    marca: "",
    precioBruto: 1500,
    precioNeto: 1261,
    costoNeto: 257
  },
  {
    producto: "Previcox",
    variante: "227 mg",
    nombre: "Previcox - 227 mg",
    categoria: "Salud",
    marca: "Merial",
    precioBruto: 29000,
    precioNeto: 24370,
    costoNeto: 16030
  },
  {
    producto: "Drag Pharma",
    variante: "Condrovet",
    nombre: "Drag Pharma - Condrovet",
    categoria: "Salud",
    marca: "Drag Pharma",
    precioBruto: 24700,
    precioNeto: 20756,
    costoNeto: 14116
  },
  {
    producto: "Drag Pharma",
    variante: "Apeticat jarabe 100 ml",
    nombre: "Drag Pharma - Apeticat jarabe 100 ml",
    categoria: "Salud",
    marca: "Drag Pharma",
    precioBruto: 12000,
    precioNeto: 10084,
    costoNeto: 6482
  },
  {
    producto: "Drag Pharma",
    variante: "Hasyun",
    nombre: "Drag Pharma - Hasyun",
    categoria: "Salud",
    marca: "Drag Pharma",
    precioBruto: 8500,
    precioNeto: 7143,
    costoNeto: 4732
  },
  {
    producto: "Matipet",
    variante: "crema 50 gr",
    nombre: "Matipet - crema 50 gr",
    categoria: "Salud",
    marca: "Drag Pharma",
    precioBruto: 13000,
    precioNeto: 10924,
    costoNeto: 7110
  },
  {
    producto: "Collar isabelino",
    variante: "Perro 30 cms",
    nombre: "Collar isabelino - Perro 30 cms",
    categoria: "Salud",
    marca: "Buster",
    precioBruto: 12500,
    precioNeto: 10504,
    costoNeto: 6890
  }
];

export const MISSING_ACCESORIOS_HIGIENE: MissingProductItem[] = [
  {
    producto: "Arena Sanitcat",
    variante: "7kgs",
    nombre: "Arena Sanitcat - 7kgs",
    categoria: "Higiene",
    marca: "Sanicat",
    precioBruto: 10000,
    precioNeto: 8403,
    costoNeto: 6144
  },
  {
    producto: "Litter",
    variante: "10lts",
    nombre: "Litter - 10lts",
    categoria: "Higiene",
    marca: "Kaytee",
    precioBruto: 15000,
    precioNeto: 12605,
    costoNeto: 9618
  },
  {
    producto: "Bedding",
    variante: "4lts",
    nombre: "Bedding - 4lts",
    categoria: "Higiene",
    marca: "Carefresh",
    precioBruto: 6000,
    precioNeto: 5042,
    costoNeto: 3209
  },
  {
    producto: "Bolsas para perros",
    variante: "Klint",
    nombre: "Bolsas para perros - Klint",
    categoria: "Higiene",
    marca: "Klint",
    precioBruto: 3500,
    precioNeto: 2941,
    costoNeto: 2153
  },
  {
    producto: "Toallas húmedas",
    variante: "Camon Talco",
    nombre: "Toallas húmedas - Camon Talco",
    categoria: "Higiene",
    marca: "Camon",
    precioBruto: 5000,
    precioNeto: 4202,
    costoNeto: 2969
  },
  {
    producto: "Bandana kulcan",
    variante: "",
    nombre: "Bandana kulcan",
    categoria: "Accesorios",
    marca: "Kulcan",
    precioBruto: 6000,
    precioNeto: 5042,
    costoNeto: 3353
  },
  {
    producto: "Varilla",
    variante: "figuras",
    nombre: "Varilla - figuras",
    categoria: "Accesorios",
    marca: "",
    precioBruto: 3500,
    precioNeto: 2941,
    costoNeto: 553
  },
  {
    producto: "Rascadores",
    variante: "curvo diseño flores",
    nombre: "Rascadores - curvo diseño flores",
    categoria: "Accesorios",
    marca: "",
    precioBruto: 5500,
    precioNeto: 4622,
    costoNeto: 1590
  },
  {
    producto: "Corta uñas Mastergroomer",
    variante: "gato",
    nombre: "Corta uñas Mastergroomer - gato",
    categoria: "Accesorios",
    marca: "Mastergroomer",
    precioBruto: 6500,
    precioNeto: 5462,
    costoNeto: 3289
  },
  {
    producto: "Arenero gato XL con pala",
    variante: "",
    nombre: "Arenero gato XL con pala",
    categoria: "Accesorios",
    marca: "",
    precioBruto: 20000,
    precioNeto: 16807,
    costoNeto: 6500
  },
  {
    producto: "Kong",
    variante: "Kitty",
    nombre: "Kong - Kitty",
    categoria: "Accesorios",
    marca: "Kong",
    precioBruto: 5500,
    precioNeto: 4622,
    costoNeto: 2730
  },
  {
    producto: "Filtros  dispensador de agua",
    variante: "6 unidades",
    nombre: "Filtros  dispensador de agua - 6 unidades",
    categoria: "Accesorios",
    marca: "",
    precioBruto: 9500,
    precioNeto: 7983,
    costoNeto: 5874
  },
  {
    producto: "Plato silicona",
    variante: "750 ml",
    nombre: "Plato silicona - 750 ml",
    categoria: "Accesorios",
    marca: "",
    precioBruto: 8500,
    precioNeto: 7143,
    costoNeto: 4111
  },
  {
    producto: "Plato silicona",
    variante: "350ml",
    nombre: "Plato silicona - 350ml",
    categoria: "Accesorios",
    marca: "",
    precioBruto: 7500,
    precioNeto: 6303,
    costoNeto: 3046
  },
  {
    producto: "Arnes colores con luz",
    variante: "XL",
    nombre: "Arnes colores con luz - XL",
    categoria: "Accesorios",
    marca: "",
    precioBruto: 30000,
    precioNeto: 25210,
    costoNeto: 14450
  },
  {
    producto: "Comedero doble para gato",
    variante: "",
    nombre: "Comedero doble para gato",
    categoria: "Accesorios",
    marca: "",
    precioBruto: 15000,
    precioNeto: 12605,
    costoNeto: 6990
  },
  {
    producto: "Dispensador de agua",
    variante: "Celeste",
    nombre: "Dispensador de agua - Celeste",
    categoria: "Accesorios",
    marca: "",
    precioBruto: 35000,
    precioNeto: 29412,
    costoNeto: 16790
  },
  {
    producto: "Bola giratoria 3 más 1",
    variante: "",
    nombre: "Bola giratoria 3 más 1",
    categoria: "Accesorios",
    marca: "",
    precioBruto: 4000,
    precioNeto: 3361,
    costoNeto: 1850
  }
];
