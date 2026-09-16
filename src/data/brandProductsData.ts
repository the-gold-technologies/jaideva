export interface BrandProductItem {
  id: string;
  name: string;
  slug: string;
  specs: string;
  description: string;
  packaging: string[];
  applications: string[];
  coverImage: string;
}

export interface BrandCategory {
  name: string;
  slug: string;
  description: string;
  coverImage: string;
  products: BrandProductItem[];
}

export interface BrandData {
  id: string;
  number: number;
  name: string;
  flag: string;
  country: string;
  authStatus: "Authorized Industrial Partner" | "Certified Multi-Brand Stockist";
  isDirectAuthorized: boolean;
  tagline: string;
  about: string;
  heroImage: string;
  categories: BrandCategory[];
}

export const BRAND_PRODUCTS: BrandData[] = [
  {
    id: "hp-lubricants",
    number: 1,
    name: "HP Lubricants",
    flag: "🇮🇳",
    country: "India (HQ)",
    authStatus: "Authorized Industrial Partner",
    isDirectAuthorized: true,
    tagline: "India's Premier Lubricant Solutions & Direct Refinery Supply Authority",
    about:
      "HP Lubricants is India's largest lubricant brand, offering an exhaustive spectrum of high-performance automotive and heavy industrial oils. Backed by state-of-the-art refinery testing, direct pipeline infrastructure, and ISO-certified batch blending, HP Lubricants ensures maximum machine longevity, thermal stability, and operational efficiency across critical power, steel, manufacturing, and transport infrastructure.",
    heroImage: "/oil-drums-warehouse.jpg",
    categories: [
      {
        name: "Engine Oils",
        slug: "engine-oils",
        description:
          "Advanced synthetic and multi-grade engine fluids for commercial transport, heavy haulage, and passenger vehicles.",
        coverImage: "/engine-oil-bottles.jpg",
        products: [
          {
            id: "hp-racer-4t-20w40",
            name: "HP Racer 4T 20W-40",
            slug: "hp-racer-4t-20w40",
            specs: "API SL | JASO MA2 | SAE 20W-40",
            description:
              "Premium four-stroke motorcycle and scooter engine oil with high friction stability and clutch anti-slippage.",
            packaging: ["900ml", "1L", "50L", "210L Drum"],
            applications: ["Two-Wheelers", "Four-Stroke Motorcycles", "Scooters"],
            coverImage: "/engine-oil-bottles.jpg",
          },
          {
            id: "hp-milcy-turbo-15w40",
            name: "HP Milcy Turbo 15W-40",
            slug: "hp-milcy-turbo-15w40",
            specs: "API CI-4 Plus / SL | MB 228.3 | SAE 15W-40",
            description:
              "Severe-duty turbo-charged diesel engine oil engineered for extended drain intervals, soot dispersion, and bore protection.",
            packaging: ["7.5L", "10L", "20L Bucket", "210L Drum"],
            applications: ["Heavy Commercial Vehicles", "Earthmovers", "Diesel Gensets"],
            coverImage: "/engine-oil-hero.jpg",
          },
          {
            id: "hp-neosynth-5w30",
            name: "HP Neosynth 5W-30",
            slug: "hp-neosynth-5w30",
            specs: "API SP | ILSAC GF-6 | Full Synthetic",
            description:
              "100% full synthetic motor oil delivering maximum fuel efficiency and cold-cranking protection for modern petrol/diesel cars.",
            packaging: ["1L", "3.5L", "4L Canister", "210L Drum"],
            applications: ["Modern Turbocharged Cars", "SUVs", "Hybrid Powertrains"],
            coverImage: "/engine-oil-bottles.jpg",
          },
        ],
      },
      {
        name: "Gear Oils",
        slug: "gear-oils",
        description:
          "High extreme-pressure (EP) industrial enclosed gear oils and automotive differential fluids.",
        coverImage: "/industrial-gear-oil.jpg",
        products: [
          {
            id: "hp-gear-oil-ep-90",
            name: "HP Gear Oil EP 90",
            slug: "hp-gear-oil-ep-90",
            specs: "API GL-4 | IS:1118-1992 | EP 90",
            description:
              "Multi-purpose extreme pressure gear lubricant formulated for hypoid, spiral bevel, and synchromesh gearboxes.",
            packaging: ["1L", "5L", "20L Bucket", "210L Drum"],
            applications: ["Manual Transmissions", "Hypoid Differentials", "Steering Gears"],
            coverImage: "/industrial-gear-oil.jpg",
          },
          {
            id: "hp-parthan-ep-220",
            name: "HP Parthan EP 220",
            slug: "hp-parthan-ep-220",
            specs: "ISO VG 220 | DIN 51517 Part 3 (CLP) | AGMA 9005-E02",
            description:
              "Premium lead-free extreme pressure industrial gear oil with excellent demulsibility and anti-micropitting defense.",
            packaging: ["20L Bucket", "210L Refinery Barrel", "Bulk Road Tanker"],
            applications: ["Steel Rolling Mills", "Cement Ball Mills", "Paper Machine Drives"],
            coverImage: "/oil-drums-warehouse.jpg",
          },
          {
            id: "hp-parthan-ep-320",
            name: "HP Parthan EP 320",
            slug: "hp-parthan-ep-320",
            specs: "ISO VG 320 | DIN 51517 Part 3 | US Steel 224",
            description:
              "Heavy-duty industrial enclosed gear lubricant built to withstand continuous heavy shock loading and high temperatures.",
            packaging: ["20L", "210L Drum", "Tanker Delivery"],
            applications: ["Crusher Gearboxes", "Extruders", "Heavy Mining Conveyors"],
            coverImage: "/industrial-gear-oil.jpg",
          },
        ],
      },
      {
        name: "Hydraulic Oils",
        slug: "hydraulic-oils",
        description:
          "Anti-wear hydraulic fluids engineered for high-pressure industrial hydraulic pumps and machine tools.",
        coverImage: "/oil-drums-warehouse.jpg",
        products: [
          {
            id: "hp-enklo-68",
            name: "HP Enklo 68",
            slug: "hp-enklo-68",
            specs: "ISO VG 68 | DIN 51524 Part 2 (HLP) | Parker Denison HF-0",
            description:
              "High performance anti-wear hydraulic oil providing oxidation stability, anti-foam, and rapid water separation.",
            packaging: ["20L Bucket", "210L Refinery Barrel", "Bulk Road Tanker"],
            applications: ["Plastic Injection Molding", "CNC Hydraulic Packs", "Hydraulic Presses"],
            coverImage: "/oil-drums-warehouse.jpg",
          },
          {
            id: "hp-enklo-46",
            name: "HP Enklo 46",
            slug: "hp-enklo-46",
            specs: "ISO VG 46 | DIN 51524 Part 2 | Eaton Vickers I-286-S",
            description:
              "Premium anti-wear hydraulic oil formulated for rotary vane, piston, and gear type hydraulic pumps under severe duty.",
            packaging: ["20L", "210L Drum", "Bulk Tanker"],
            applications: ["Mobile Construction Equipment", "Machine Tool Hydraulics", "Forklifts"],
            coverImage: "/industrial-gear-oil.jpg",
          },
          {
            id: "hp-enklo-32",
            name: "HP Enklo 32",
            slug: "hp-enklo-32",
            specs: "ISO VG 32 | DIN 51524 Part 2 | High Viscosity Index",
            description:
              "Light viscosity anti-wear fluid designed for tight-clearance servo valves and high-cycle industrial automation.",
            packaging: ["20L Bucket", "210L Drum"],
            applications: ["Servo-Controlled Machine Tools", "Precision Robotics", "Low Temp Hydraulics"],
            coverImage: "/oil-drums-warehouse.jpg",
          },
        ],
      },
      {
        name: "Greases",
        slug: "greases",
        description:
          "Heavy lithium and specialty complex greases for bearings, chassis, high-temp kilns, and multi-purpose lubrication.",
        coverImage: "/industrial-gear-oil.jpg",
        products: [
          {
            id: "hp-lithon-2",
            name: "HP Lithon 2",
            slug: "hp-lithon-2",
            specs: "NLGI 2 | Lithium Base | Drop Point 190°C",
            description:
              "Premium multi-purpose lithium grease with high mechanical shear stability, anti-rust, and water resistance.",
            packaging: ["1kg", "5kg", "18kg Pail", "180kg Barrel"],
            applications: ["Electric Motor Bearings", "Industrial Rollers", "General Plant Lubrication"],
            coverImage: "/industrial-gear-oil.jpg",
          },
          {
            id: "hp-ap3-grease",
            name: "HP AP3 Grease",
            slug: "hp-ap3-grease",
            specs: "NLGI 3 | Premium Lithium Soap | Drop Point 195°C",
            description:
              "High shear resistance grease designed specifically for automotive wheel bearings and heavy industrial shaft collars.",
            packaging: ["500g", "1kg", "3kg", "18kg Pail", "180kg Drum"],
            applications: ["Commercial Truck Wheel Bearings", "Textile Machinery", "Farm Equipment"],
            coverImage: "/industrial-gear-oil.jpg",
          },
          {
            id: "hp-high-temp-grease",
            name: "HP High Temp Complex EP Grease",
            slug: "hp-high-temp-grease",
            specs: "NLGI 2 | Lithium Complex EP | Drop Point >260°C",
            description:
              "High drop point extreme-pressure grease formulated for continuous operation in furnace cars, asphalt dryers, and steel plants.",
            packaging: ["18kg Pail", "180kg Drum"],
            applications: ["Furnace Rollers", "Cement Kiln Exhaust Fans", "Continuous Casters"],
            coverImage: "/oil-drums-warehouse.jpg",
          },
        ],
      },
      {
        name: "Industrial Oils",
        slug: "industrial-oils",
        description:
          "Turbine oils, circulating lubricants, and heavy machinery oils for continuous 24/7 manufacturing plants.",
        coverImage: "/oil-drums-warehouse.jpg",
        products: [
          {
            id: "hp-turbinol-46",
            name: "HP Turbinol 46",
            slug: "hp-turbinol-46",
            specs: "ISO VG 46 | DIN 51515 Part 1 (L-TD) | GE GEK 32568",
            description:
              "Inhibited steam and gas turbine oil offering exceptional oxidation resistance and rapid air release.",
            packaging: ["210L Refinery Barrel", "Bulk Tanker"],
            applications: ["Power Plant Turbines", "Centrifugal Compressors", "Heavy Hydro Plants"],
            coverImage: "/oil-drums-warehouse.jpg",
          },
          {
            id: "hp-compressor-68",
            name: "HP Compressor Oil 68",
            slug: "hp-compressor-68",
            specs: "ISO VG 68 | DIN 51506 VDL | Low Carbon Residue",
            description:
              "Severe duty reciprocating and screw air compressor oil designed to prevent carbon valve build-up.",
            packaging: ["20L Bucket", "210L Drum"],
            applications: ["Reciprocating Air Compressors", "Rotary Screw Compressors"],
            coverImage: "/oil-drums-warehouse.jpg",
          },
        ],
      },
      {
        name: "Specialty Products",
        slug: "specialty-products",
        description:
          "Transformer dielectric fluids, heat transfer oils, and industrial rust preventives.",
        coverImage: "/oil-lab-quality.jpg",
        products: [
          {
            id: "hp-transformer-oil-60",
            name: "HP Transformer Oil 60",
            slug: "hp-transformer-oil-60",
            specs: "IEC 60296 | IS:335 | High Breakdown Voltage >60 kV",
            description:
              "Uninhibited mineral insulating electrical oil with superior cooling properties and low dielectric dissipation factor.",
            packaging: ["210L Sealed Refinery Drum", "Dedicated Tanker Delivery"],
            applications: ["High Voltage Transformers", "Switchgear", "Circuit Breakers"],
            coverImage: "/oil-lab-quality.jpg",
          },
          {
            id: "hp-thermic-fluid-32",
            name: "HP Thermic Fluid 32",
            slug: "hp-thermic-fluid-32",
            specs: "ISO VG 32 | High Bulk Thermal Stability to 300°C",
            description:
              "Mineral based circulating heat transfer fluid designed to resist cracking and thermal sludge formation in closed heat systems.",
            packaging: ["210L Drum", "Bulk Delivery"],
            applications: ["Textile Processing", "Chemical Reactors", "Plywood Presses"],
            coverImage: "/oil-drums-warehouse.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "valvoline",
    number: 2,
    name: "Valvoline",
    flag: "🇺🇸",
    country: "United States",
    authStatus: "Certified Multi-Brand Stockist",
    isDirectAuthorized: false,
    tagline: "Over 150 Years of Severe-Duty Fleet Innovation & Extended Drain Chemistry",
    about:
      "Valvoline has pioneered heavy fleet lubrication since 1866. Engineered specifically for severe-duty commercial transport, mining haulers, and high-hour industrial equipment, Valvoline's patented chemistry ensures maximum thermal breakdown defense, soot dispersion, and extended drain intervals.",
    heroImage: "/engine-oil-hero.jpg",
    categories: [
      {
        name: "Automotive Lubricants",
        slug: "automotive-lubricants",
        description: "Full synthetic motor oils and premium passenger vehicle lubricants.",
        coverImage: "/engine-oil-bottles.jpg",
        products: [
          {
            id: "valvoline-synpower-5w40",
            name: "Valvoline SynPower 5W-40",
            slug: "valvoline-synpower-5w40",
            specs: "API SP / SN Plus | ACEA A3/B4 | Full Synthetic",
            description: "Advanced full synthetic passenger car engine oil delivering maximum thermal breakdown protection.",
            packaging: ["1L", "4L", "210L Drum"],
            applications: ["Turbocharged Gasoline Engines", "European Passenger Cars"],
            coverImage: "/engine-oil-bottles.jpg",
          },
          {
            id: "valvoline-all-climate-20w50",
            name: "Valvoline All-Climate 20W-50",
            slug: "valvoline-all-climate-20w50",
            specs: "API SL/CF | Multi-Grade Engine Protection",
            description: "High viscosity mineral engine oil providing thick protective film under high ambient heat.",
            packaging: ["1L", "5L", "50L", "210L Drum"],
            applications: ["Commercial Taxis", "Heavy Duty Utility Vehicles"],
            coverImage: "/engine-oil-hero.jpg",
          },
        ],
      },
      {
        name: "Commercial Vehicle Lubricants",
        slug: "commercial-vehicle-lubricants",
        description: "Cummins endorsed heavy diesel engine oils for long-haul trucking fleets.",
        coverImage: "/engine-oil-hero.jpg",
        products: [
          {
            id: "valvoline-premium-blue-15w40",
            name: "Valvoline Premium Blue 15W-40",
            slug: "valvoline-premium-blue-15w40",
            specs: "Cummins CES 20086 | API CK-4 / CJ-4 | SAE 15W-40",
            description: "Exclusively endorsed by Cummins, offering extended drain intervals and superior oxidation resistance.",
            packaging: ["7.5L", "15L", "50L", "210L Drum"],
            applications: ["Cummins Diesel Engines", "Highway Fleets", "Mining Haulers"],
            coverImage: "/engine-oil-hero.jpg",
          },
          {
            id: "valvoline-all-fleet-extra",
            name: "Valvoline All-Fleet Extra 15W-40",
            slug: "valvoline-all-fleet-extra",
            specs: "API CI-4 / CH-4 | Volvo VDS-3 | MB 228.3",
            description: "Engineered for high-mileage heavy commercial vehicles operating in severe road conditions.",
            packaging: ["10L", "20L", "210L Drum"],
            applications: ["Heavy Buses", "Multi-Axle Trucks", "Excavators"],
            coverImage: "/engine-oil-bottles.jpg",
          },
        ],
      },
      {
        name: "Industrial Lubricants",
        slug: "industrial-lubricants",
        description: "Stationary gas engine oils, heavy gear fluids, and circulating oils.",
        coverImage: "/industrial-gear-oil.jpg",
        products: [
          {
            id: "valvoline-geo-40",
            name: "Valvoline GEO LA 40",
            slug: "valvoline-geo-40",
            specs: "Low Ash Stationary Gas Engine Oil | SAE 40",
            description: "Formulated for high-output natural gas and biogas stationary industrial engines.",
            packaging: ["208L Drum", "Bulk Tanker"],
            applications: ["Power Cogeneration Plants", "Landfill Gas Gensets"],
            coverImage: "/oil-drums-warehouse.jpg",
          },
        ],
      },
      {
        name: "Greases",
        slug: "greases",
        description: "Severe shock-load mining and multi-purpose industrial greases.",
        coverImage: "/industrial-gear-oil.jpg",
        products: [
          {
            id: "valvoline-crimson-ep2",
            name: "Valvoline Crimson EP 2",
            slug: "valvoline-crimson-ep2",
            specs: "NLGI 2 | Calcium Sulfonate Complex | High Water Washout",
            description: "Tacky extreme-pressure grease engineered for severe wash-off conditions and vibrating screens.",
            packaging: ["18kg Pail", "180kg Drum"],
            applications: ["Mining Conveyors", "Excavator Pivot Pins", "Marine Terminals"],
            coverImage: "/industrial-gear-oil.jpg",
          },
        ],
      },
      {
        name: "Specialty Products",
        slug: "specialty-products",
        description: "Heavy duty coolants, brake fluids, and transmission fluids.",
        coverImage: "/oil-lab-quality.jpg",
        products: [
          {
            id: "valvoline-zerex-hd-coolant",
            name: "Valvoline ZEREX HD Extended Life Coolant",
            slug: "valvoline-zerex-hd-coolant",
            specs: "Organic Acid Technology (OAT) | ASTM D6210",
            description: "Protects heavy diesel engine cylinder liners against cavitation and pitting for up to 1,000,000 km.",
            packaging: ["5L", "20L", "210L Drum"],
            applications: ["Heavy Diesel Cooling Systems", "Industrial Gensets"],
            coverImage: "/oil-lab-quality.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "gs-caltex",
    number: 3,
    name: "GS Caltex",
    flag: "🇰🇷",
    country: "South Korea",
    authStatus: "Certified Multi-Brand Stockist",
    isDirectAuthorized: false,
    tagline: "World-Class Kixx Group II/III Synthetic Base Oil Technology",
    about:
      "GS Caltex operates one of the world's largest single-site petroleum refineries and base oil manufacturing facilities. Its flagship Kixx lubricant portfolio leverages ultra-pure Group II and Group III synthetic base oils, ensuring superior oxidation resistance, reduced friction, and exceptional fuel economy under severe loads.",
    heroImage: "/engine-oil-bottles.jpg",
    categories: [
      {
        name: "Automotive Lubricants",
        slug: "automotive-lubricants",
        description: "Kixx PAO synthetic engine oils and high-performance motor formulations.",
        coverImage: "/engine-oil-bottles.jpg",
        products: [
          {
            id: "kixx-pao-1-0w30",
            name: "Kixx PAO 1 0W-30",
            slug: "kixx-pao-1-0w30",
            specs: "100% PAO Synthetic | API SP | ACEA C2/C3",
            description: "Top-tier polyalphaolefin synthetic oil for ultra-low friction and high thermal stability.",
            packaging: ["1L", "4L Can", "200L Drum"],
            applications: ["High-End Performance Vehicles", "Direct Injection Engines"],
            coverImage: "/engine-oil-bottles.jpg",
          },
          {
            id: "kixx-hdx-ck4",
            name: "Kixx HDX CK-4 15W-40",
            slug: "kixx-hdx-ck4",
            specs: "API CK-4 / CJ-4 | Volvo VDS-4.5 | Cummins CES 20086",
            description: "Low-SAPS heavy duty diesel engine oil preserving particulate filters (DPF).",
            packaging: ["15L", "20L", "200L Drum"],
            applications: ["Euro VI Fleets", "Heavy Construction Equipment"],
            coverImage: "/engine-oil-hero.jpg",
          },
        ],
      },
      {
        name: "Industrial Lubricants",
        slug: "industrial-lubricants",
        description: "GS Hydro anti-wear hydraulic fluids and industrial gear oils.",
        coverImage: "/industrial-gear-oil.jpg",
        products: [
          {
            id: "gs-hydro-hd-68",
            name: "GS Hydro HD 68",
            slug: "gs-hydro-hd-68",
            specs: "ISO VG 68 | DIN 51524 Part 2 | Denison HF-0",
            description: "High anti-wear hydraulic oil providing rapid air release and exceptional thermal stability.",
            packaging: ["20L", "200L Drum"],
            applications: ["Industrial Hydraulic Systems", "Precision Presses"],
            coverImage: "/industrial-gear-oil.jpg",
          },
        ],
      },
      {
        name: "Greases",
        slug: "greases",
        description: "GS Golden Pearl lithium complex greases.",
        coverImage: "/oil-drums-warehouse.jpg",
        products: [
          {
            id: "gs-golden-pearl-ep2",
            name: "GS Golden Pearl EP 2",
            slug: "gs-golden-pearl-ep2",
            specs: "NLGI 2 | Premium Lithium EP | High Drop Point",
            description: "Heavy multi-purpose grease offering high shear endurance and anti-rust protection.",
            packaging: ["18kg Pail", "180kg Drum"],
            applications: ["Heavy Industrial Bearings", "Truck Chassis"],
            coverImage: "/oil-drums-warehouse.jpg",
          },
        ],
      },
      {
        name: "Specialty Lubricants",
        slug: "specialty-lubricants",
        description: "GS Thermic heat transfer fluids and compressor oils.",
        coverImage: "/oil-lab-quality.jpg",
        products: [
          {
            id: "gs-thermic-32",
            name: "GS Thermic Heat Transfer Oil 32",
            slug: "gs-thermic-32",
            specs: "ISO VG 32 | Operating Temp to 310°C",
            description: "Synthetic based heat transfer fluid preventing carbon fouling in thermal boiler circuits.",
            packaging: ["200L Drum", "Bulk Tanker"],
            applications: ["Industrial Heaters", "Chemical Reactors"],
            coverImage: "/oil-lab-quality.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "idemitsu",
    number: 4,
    name: "Idemitsu",
    flag: "🇯🇵",
    country: "Japan",
    authStatus: "Certified Multi-Brand Stockist",
    isDirectAuthorized: false,
    tagline: "Tight-Tolerance Japanese OEM Precision Fluids & Machine Tool Chemistry",
    about:
      "Idemitsu is Japan's premier OEM lubricant partner, formulating factory-fill fluids for world-leading Japanese automotive and machinery manufacturers. Its specialized Daphne product line is engineered for high-speed spindles, EDM dielectric spark erosion, and ultra-tight tolerance CNC machine tools.",
    heroImage: "/industrial-gear-oil.jpg",
    categories: [
      {
        name: "Automotive Lubricants",
        slug: "automotive-lubricants",
        description: "Precision Japanese OEM motor oils and nano-synthetic fluids.",
        coverImage: "/engine-oil-bottles.jpg",
        products: [
          {
            id: "idemitsu-ifg7-0w20",
            name: "Idemitsu IFG7 0W-20",
            slug: "idemitsu-ifg7-0w20",
            specs: "API SP | ILSAC GF-6A | Nano-Tailored Synthetic",
            description: "Ultra-low viscosity Japanese OEM synthetic motor oil delivering high thermal response.",
            packaging: ["1L", "3.5L", "200L Drum"],
            applications: ["Japanese OEM Cars", "Hybrid Vehicles"],
            coverImage: "/engine-oil-bottles.jpg",
          },
        ],
      },
      {
        name: "Industrial Lubricants",
        slug: "industrial-lubricants",
        description: "Daphne precision high-speed spindle oils and slideway fluids.",
        coverImage: "/industrial-gear-oil.jpg",
        products: [
          {
            id: "daphne-super-spindle-2",
            name: "Daphne Super Spindle Oil 2",
            slug: "daphne-super-spindle-2",
            specs: "Viscosity 2 cSt @ 40°C | Ultra-Low Friction",
            description: "Formulated for ultra-high-speed CNC grinding and milling spindles exceeding 30,000 RPM.",
            packaging: ["20L Can", "200L Drum"],
            applications: ["High-Speed CNC Spindles", "Precision Internal Grinders"],
            coverImage: "/industrial-gear-oil.jpg",
          },
        ],
      },
      {
        name: "Gear Oils",
        slug: "gear-oils",
        description: "Daphne Super Gear oils for precision closed gearboxes.",
        coverImage: "/oil-drums-warehouse.jpg",
        products: [
          {
            id: "daphne-super-gear-220",
            name: "Daphne Super Gear Oil 220",
            slug: "daphne-super-gear-220",
            specs: "ISO VG 220 | High EP | Sludge Resistant",
            description: "Precision Japanese industrial gear oil preventing micro-pitting under repetitive reverse torque.",
            packaging: ["20L", "200L Drum"],
            applications: ["Machine Tool Gearboxes", "Robotic Drive Joints"],
            coverImage: "/oil-drums-warehouse.jpg",
          },
        ],
      },
      {
        name: "Hydraulic Oils",
        slug: "hydraulic-oils",
        description: "Non-zinc ashless hydraulic fluids for tight-clearance servo valves.",
        coverImage: "/oil-drums-warehouse.jpg",
        products: [
          {
            id: "daphne-super-hydro-46a",
            name: "Daphne Super Hydro 46A",
            slug: "daphne-super-hydro-46a",
            specs: "ISO VG 46 | Ashless Non-Zinc | Long Drain",
            description: "Eliminates copper corrosion and valve sticking in electro-hydraulic servo machine tools.",
            packaging: ["20L", "200L Drum"],
            applications: ["Electro-Hydraulic Servo Systems", "Plastic Injection Machines"],
            coverImage: "/oil-drums-warehouse.jpg",
          },
        ],
      },
      {
        name: "Greases",
        slug: "greases",
        description: "Daphne Eponex high-temperature polyurea greases.",
        coverImage: "/industrial-gear-oil.jpg",
        products: [
          {
            id: "daphne-eponex-ep2",
            name: "Daphne Eponex Grease EP 2",
            slug: "daphne-eponex-ep2",
            specs: "NLGI 2 | Polyurea Thickener | Drop Point 260°C",
            description: "High-speed precision bearing grease with 3x longer life than conventional lithium soaps.",
            packaging: ["16kg Pail", "180kg Drum"],
            applications: ["Precision Machine Tool Bearings", "Robotic Linear Guides"],
            coverImage: "/industrial-gear-oil.jpg",
          },
        ],
      },
      {
        name: "Specialty Products",
        slug: "specialty-products",
        description: "Daphne Dielectric EDM machining fluids and thin-film anti-rust oils.",
        coverImage: "/oil-lab-quality.jpg",
        products: [
          {
            id: "daphne-dielectric-cut-68",
            name: "Daphne Cut Dielectric EDM Fluid",
            slug: "daphne-dielectric-cut-68",
            specs: "Synthetic Dielectric | Odorless | High Flash Point",
            description: "Specialized dielectric fluid for spark erosion electrical discharge machines.",
            packaging: ["20L", "200L Drum"],
            applications: ["CNC Sinker EDM Machines", "Die & Mold Spark Erosion"],
            coverImage: "/oil-lab-quality.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "molygraph-lubricants",
    number: 5,
    name: "Molygraph Lubricants",
    flag: "🇮🇳",
    country: "India",
    authStatus: "Certified Multi-Brand Stockist",
    isDirectAuthorized: false,
    tagline: "Engineered Specialty High-Temp Greases, Pastes & Extreme Tribology",
    about:
      "Molygraph is India's leading manufacturer of engineered specialty greases, anti-seize pastes, and high-temperature tribological lubricants. Built specifically for cement kilns, steel mills, continuous casters, and heavy forging plants where conventional lubricants melt or wash off under extreme pressure.",
    heroImage: "/oil-drums-warehouse.jpg",
    categories: [
      {
        name: "Industrial Lubricants",
        slug: "industrial-lubricants",
        description: "High temperature conveyor chain fluids and slideway oils.",
        coverImage: "/oil-drums-warehouse.jpg",
        products: [
          {
            id: "molylube-chain-oil-280",
            name: "Molylube Ultra High Temp Chain Oil",
            slug: "molylube-chain-oil-280",
            specs: "Operating Temp to 280°C | Zero Residue Synthetic",
            description: "Synthetic ester chain lubricant that does not produce carbon varnishing in paint ovens and stenters.",
            packaging: ["20L Bucket", "210L Drum"],
            applications: ["Paint Shop Conveyors", "Textile Stenter Chains", "Glass Annealing"],
            coverImage: "/oil-drums-warehouse.jpg",
          },
        ],
      },
      {
        name: "Specialty Lubricants",
        slug: "specialty-lubricants",
        description: "Open gear compounds and high vacuum silicone fluids.",
        coverImage: "/industrial-gear-oil.jpg",
        products: [
          {
            id: "molylube-open-gear-1000",
            name: "Molylube Open Gear Sprayable Compound",
            slug: "molylube-open-gear-1000",
            specs: "Asphalt-Free | Extreme Pressure Solid MoS2 Package",
            description: "Sprayable open girth gear lubricant for rotary cement kilns and ball mills.",
            packaging: ["18kg Pail", "180kg Drum"],
            applications: ["Cement Kiln Girth Gears", "Sugar Mill Drives"],
            coverImage: "/industrial-gear-oil.jpg",
          },
        ],
      },
      {
        name: "Greases",
        slug: "greases",
        description: "Calcium sulfonate complex and bentone non-melting greases.",
        coverImage: "/industrial-gear-oil.jpg",
        products: [
          {
            id: "molygraph-superlube-2000",
            name: "Molygraph Superlube 2000",
            slug: "molygraph-superlube-2000",
            specs: "NLGI 2 | Calcium Sulfonate Complex | 4-Ball Weld >600 kg",
            description: "Resists extreme shock loading, chemical exposure, and water flooding in rolling mills.",
            packaging: ["18kg Pail", "180kg Drum"],
            applications: ["Steel Rolling Mills", "Continuous Casters", "Mining Wash Plants"],
            coverImage: "/industrial-gear-oil.jpg",
          },
        ],
      },
      {
        name: "Metalworking Fluids",
        slug: "metalworking-fluids",
        description: "Heavy duty stamping, deep drawing, and fine blanking lubricants.",
        coverImage: "/oil-lab-quality.jpg",
        products: [
          {
            id: "molygraph-formchem-50",
            name: "Molygraph Formchem 50 Drawing Oil",
            slug: "molygraph-formchem-50",
            specs: "Chlorine-Free EP Lubricant | Water Washable",
            description: "Prevents die scoring and galling in severe deep drawing and heavy gauge sheet stamping.",
            packaging: ["20L", "210L Drum"],
            applications: ["Automotive Body Panel Stamping", "Deep Drawing Presses"],
            coverImage: "/oil-lab-quality.jpg",
          },
        ],
      },
      {
        name: "Assembly & Maintenance Products",
        slug: "assembly-maintenance-products",
        description: "Anti-seize copper pastes, moly assembly sprays, and wire rope compounds.",
        coverImage: "/oil-drums-warehouse.jpg",
        products: [
          {
            id: "molygraph-kopal-1000",
            name: "Molygraph Kopal 1000 Copper Anti-Seize",
            slug: "molygraph-kopal-1000",
            specs: "Operating Temp to 1100°C | Lead-Free",
            description: "Prevents thread galling, welding, and corrosion on high-heat turbine bolts and exhaust studs.",
            packaging: ["500g Tin", "1kg", "5kg", "20kg Pail"],
            applications: ["Turbine Casing Studs", "Furnace Flanges", "Exhaust Manifolds"],
            coverImage: "/oil-drums-warehouse.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "motul-tech",
    number: 6,
    name: "Motul Tech",
    flag: "🇫🇷",
    country: "France",
    authStatus: "Certified Multi-Brand Stockist",
    isDirectAuthorized: false,
    tagline: "French Industrial Fluid Technology & Metal Transformation Chemistry",
    about:
      "MotulTech is the dedicated heavy industrial division of France's Motul Group. Specializing in high-performance CNC metalworking coolants, neat cutting oils, dielectric spark erosion fluids, and accelerated quench oils, MotulTech products optimize tool life, machine uptime, and metal transformation quality.",
    heroImage: "/oil-lab-quality.jpg",
    categories: [
      {
        name: "Metalworking Fluids",
        slug: "metalworking-fluids",
        description: "Supracool biostable water soluble cutting and grinding emulsions.",
        coverImage: "/oil-lab-quality.jpg",
        products: [
          {
            id: "supracool-9620",
            name: "MotulTech Supracool 9620",
            slug: "supracool-9620",
            specs: "Bio-Stable Semi-Synthetic Coolant | Chlorine & Boron Free",
            description: "Long-life machining emulsion delivering high tool lubricity on titanium, inconel, and stainless alloys.",
            packaging: ["20L", "208L Drum"],
            applications: ["Aerospace Multi-Axis CNC", "High Pressure Through-Spindle Machining"],
            coverImage: "/oil-lab-quality.jpg",
          },
        ],
      },
      {
        name: "Industrial Lubricants",
        slug: "industrial-lubricants",
        description: "High temperature quench fluids and slideway machine tool oils.",
        coverImage: "/industrial-gear-oil.jpg",
        products: [
          {
            id: "motultech-thermocool-32",
            name: "MotulTech Thermocool 32",
            slug: "motultech-thermocool-32",
            specs: "ISO VG 32 | High Thermal Stability to 320°C",
            description: "Resists thermal cracking and deposit formation in high-heat industrial circulation boilers.",
            packaging: ["208L Drum", "Bulk Tanker"],
            applications: ["Plastic Molding Heaters", "Chemical Reactors"],
            coverImage: "/industrial-gear-oil.jpg",
          },
        ],
      },
      {
        name: "Greases",
        slug: "greases",
        description: "High temperature and heavy mechanical load greases.",
        coverImage: "/oil-drums-warehouse.jpg",
        products: [
          {
            id: "motultech-thermogrease-300",
            name: "MotulTech Thermogrease 300",
            slug: "motultech-thermogrease-300",
            specs: "Synthetic Base | Operating Temp to 300°C",
            description: "Engineered for high-temperature furnace exhaust bearings and drying fans.",
            packaging: ["18kg Pail", "180kg Drum"],
            applications: ["Furnace Fans", "Asphalt Processing"],
            coverImage: "/oil-drums-warehouse.jpg",
          },
        ],
      },
      {
        name: "Specialty Products",
        slug: "specialty-products",
        description: "Accelerated metal quenching oils and rust inhibitors.",
        coverImage: "/oil-lab-quality.jpg",
        products: [
          {
            id: "motultech-thermocut-quench",
            name: "MotulTech Severe Quench Oil 20",
            slug: "motultech-thermocut-quench",
            specs: "Accelerated Quench Speed | Low Drag-Out",
            description: "Delivers maximum surface hardness without distortion during steel heat treatment.",
            packaging: ["208L Drum"],
            applications: ["Gear Tooth Hardening", "Bearing Ring Quenching"],
            coverImage: "/oil-lab-quality.jpg",
          },
        ],
      },
      {
        name: "Maintenance Solutions",
        slug: "maintenance-solutions",
        description: "Machine sump cleaners and degreasing agents.",
        coverImage: "/oil-lab-quality.jpg",
        products: [
          {
            id: "safco-clean-degreaser",
            name: "MotulTech Safco Clean Degreaser",
            slug: "safco-clean-degreaser",
            specs: "Zero-Residue Solvent | High Dielectric",
            description: "Quick-drying degreasing solvent for machine tools and metal parts before painting.",
            packaging: ["20L Canister", "208L Drum"],
            applications: ["Machine Shop Maintenance", "Pre-Assembly Cleaning"],
            coverImage: "/oil-lab-quality.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "deep-pneumatics",
    number: 7,
    name: "Deep Pneumatics",
    flag: "🇮🇳",
    country: "India",
    authStatus: "Certified Multi-Brand Stockist",
    isDirectAuthorized: false,
    tagline: "Industrial Rotary Screw Compressors, Clean Air Treatment & Specialized Fluids",
    about:
      "Deep Pneumatics is an industrial leader providing high-efficiency rotary screw compressors, air treatment dryers, pneumatic filtration units, and custom synthetic compressor fluids. Engineered to provide continuous, carbon-free compressed air for critical automation, pneumatic machinery, and heavy industrial facilities.",
    heroImage: "/industrial-gear-oil.jpg",
    categories: [
      {
        name: "Air Compressors",
        slug: "air-compressors",
        description: "Rotary screw air compressors and heavy industrial power units.",
        coverImage: "/industrial-gear-oil.jpg",
        products: [
          {
            id: "deep-screw-compressor-37kw",
            name: "Deep Rotary Screw Compressor 37 kW",
            slug: "deep-screw-compressor-37kw",
            specs: "37 kW (50 HP) | 215 CFM @ 8 Bar | Direct Drive",
            description: "Continuous duty direct-coupled industrial screw compressor with smart micro-processor control.",
            packaging: ["Complete Unit"],
            applications: ["Manufacturing Plants", "Textile Automation", "Automotive Assembly"],
            coverImage: "/industrial-gear-oil.jpg",
          },
        ],
      },
      {
        name: "Pneumatic Products",
        slug: "pneumatic-products",
        description: "FRL filter-regulator-lubricator units and high-speed directional solenoid valves.",
        coverImage: "/industrial-gear-oil.jpg",
        products: [
          {
            id: "deep-frl-trio",
            name: "Deep Industrial FRL Trio Combination",
            slug: "deep-frl-trio",
            specs: "1/2\" to 1\" Port | 5 Micron Filtration | Auto Drain",
            description: "Clean moisture separation, precise pressure regulation, and micro-fog lubrication for air tools.",
            packaging: ["Box Unit"],
            applications: ["Pneumatic Tool Lines", "Machine Tool Air Prep"],
            coverImage: "/industrial-gear-oil.jpg",
          },
        ],
      },
      {
        name: "Air Treatment Solutions",
        slug: "air-treatment-solutions",
        description: "Refrigerated compressed air dryers and coalescing particulate micro filters.",
        coverImage: "/oil-lab-quality.jpg",
        products: [
          {
            id: "deep-ref-dryer-150",
            name: "Deep Refrigerated Air Dryer 150 CFM",
            slug: "deep-ref-dryer-150",
            specs: "+3°C Pressure Dew Point | R134a Eco Refrigerant",
            description: "Eliminates pipe condensation, rust, and water damage across factory air lines.",
            packaging: ["Self-Contained Cabinet"],
            applications: ["CNC Machine Air Lines", "Spray Painting Booths"],
            coverImage: "/oil-lab-quality.jpg",
          },
        ],
      },
      {
        name: "Industrial Equipment",
        slug: "industrial-equipment",
        description: "Vertical air receiver pressure vessels and condensate oil-water separators.",
        coverImage: "/oil-drums-warehouse.jpg",
        products: [
          {
            id: "deep-air-receiver-1000l",
            name: "Deep 1000L Vertical Air Receiver Tank",
            slug: "deep-air-receiver-1000l",
            specs: "1000 Liters | 10 Bar Design Pressure | ASME Certified",
            description: "Dampens compressor pulsations and acts as a surge storage tank for high-demand bursts.",
            packaging: ["Vertical Vessel"],
            applications: ["Centralized Compressed Air Utility"],
            coverImage: "/oil-drums-warehouse.jpg",
          },
        ],
      },
      {
        name: "Compressor Lubricants",
        slug: "compressor-lubricants",
        description: "Extended drain synthetic screw and reciprocating compressor oils.",
        coverImage: "/oil-drums-warehouse.jpg",
        products: [
          {
            id: "deep-synthec-8000h",
            name: "Deep UltraSynthec 8000h Compressor Oil",
            slug: "deep-synthec-8000h",
            specs: "ISO VG 46 | 100% PAO Synthetic | 8000 Operating Hours",
            description: "Prevents varnish and carbon sludge in high-temperature rotary screw compressors.",
            packaging: ["20L Bucket", "210L Drum"],
            applications: ["Rotary Screw Air Compressors", "Continuous Duty Vane Units"],
            coverImage: "/oil-drums-warehouse.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "lubricon",
    number: 8,
    name: "Lubricon",
    flag: "🇮🇳",
    country: "India",
    authStatus: "Certified Multi-Brand Stockist",
    isDirectAuthorized: false,
    tagline: "Custom Industrial Blends, Severe-Duty Circulating & Plant-Specific Fluids",
    about:
      "Lubricon delivers customized industrial lubricant blends, precision slideway fluids, and plant-specific process oils formulated to match machinery configurations. Designed for continuous manufacturing lines, severe circulating sumps, heavy machine tools, and specialized industrial gear drives.",
    heroImage: "/oil-drums-warehouse.jpg",
    categories: [
      {
        name: "Engine Oils",
        slug: "engine-oils",
        description: "Heavy fleet multi-grade diesel engine oils.",
        coverImage: "/engine-oil-bottles.jpg",
        products: [
          {
            id: "lubricon-fleet-15w40",
            name: "Lubricon Fleet Master 15W-40",
            slug: "lubricon-fleet-15w40",
            specs: "API CI-4 / SL | Heavy Fleet Protection",
            description: "Multi-grade commercial diesel fluid designed for heavy transport and off-road engines.",
            packaging: ["20L", "210L Drum"],
            applications: ["Commercial Fleet Vehicles", "Industrial Tractors"],
            coverImage: "/engine-oil-bottles.jpg",
          },
        ],
      },
      {
        name: "Gear Oils",
        slug: "gear-oils",
        description: "Severe duty enclosed industrial gear oils ISO 150 to 460.",
        coverImage: "/industrial-gear-oil.jpg",
        products: [
          {
            id: "lubricon-gear-ep-220",
            name: "Lubricon Industrial Gear EP 220",
            slug: "lubricon-gear-ep-220",
            specs: "ISO VG 220 | High EP | DIN 51517 Part 3",
            description: "Heavy anti-scuff industrial gear fluid for enclosed helical and bevel gearboxes.",
            packaging: ["20L", "210L Drum"],
            applications: ["Industrial Gearboxes", "Crusher Drives"],
            coverImage: "/industrial-gear-oil.jpg",
          },
        ],
      },
      {
        name: "Hydraulic Oils",
        slug: "hydraulic-oils",
        description: "Anti-wear hydraulic fluids with thermal stability.",
        coverImage: "/oil-drums-warehouse.jpg",
        products: [
          {
            id: "lubricon-hydro-68",
            name: "Lubricon Hydro AW 68",
            slug: "lubricon-hydro-68",
            specs: "ISO VG 68 | Anti-Wear | DIN 51524 Part 2",
            description: "High anti-wear hydraulic oil for heavy duty industrial pumps and presses.",
            packaging: ["20L", "210L Drum"],
            applications: ["Hydraulic Machinery", "Die Casting Machines"],
            coverImage: "/oil-drums-warehouse.jpg",
          },
        ],
      },
      {
        name: "Greases",
        slug: "greases",
        description: "Lithium complex extreme pressure multi-purpose greases.",
        coverImage: "/industrial-gear-oil.jpg",
        products: [
          {
            id: "lubricon-lithoplex-2",
            name: "Lubricon Litho-Plex EP 2",
            slug: "lubricon-lithoplex-2",
            specs: "NLGI 2 | Lithium Complex Soap | High Drop Point",
            description: "General plant multi-purpose grease offering high shear endurance under heavy vibration.",
            packaging: ["18kg Pail", "180kg Drum"],
            applications: ["Conveyor Bearings", "Industrial Rollers"],
            coverImage: "/industrial-gear-oil.jpg",
          },
        ],
      },
      {
        name: "Specialty Lubricants",
        slug: "specialty-lubricants",
        description: "Heat transfer thermal fluids and rubber process extender oils.",
        coverImage: "/oil-lab-quality.jpg",
        products: [
          {
            id: "lubricon-thermol-300",
            name: "Lubricon Thermol-300 Thermal Fluid",
            slug: "lubricon-thermol-300",
            specs: "Thermal Fluid | Operating Temp to 300°C",
            description: "Mineral circulating heat transfer oil with high resistance to thermal degradation.",
            packaging: ["210L Drum", "Bulk Tanker"],
            applications: ["Industrial Process Heaters", "Plywood Hot Presses"],
            coverImage: "/oil-lab-quality.jpg",
          },
        ],
      },
      {
        name: "Industrial Lubricants",
        slug: "industrial-lubricants",
        description: "Slideway ISO 68/220 machine tool lubricants and spindle oils.",
        coverImage: "/industrial-gear-oil.jpg",
        products: [
          {
            id: "lubricon-waylube-68",
            name: "Lubricon Waylube ISO 68",
            slug: "lubricon-waylube-68",
            specs: "ISO VG 68 | Anti-Stick-Slip | DIN 51502 CGLP",
            description: "Eliminates jerky stick-slip motion on horizontal CNC machine tool ways and slides.",
            packaging: ["20L Bucket", "210L Drum"],
            applications: ["Horizontal CNC Lathes", "Milling Machine Slideways"],
            coverImage: "/industrial-gear-oil.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "tw-chemin",
    number: 9,
    name: "TW Chemin",
    flag: "🇩🇪",
    country: "Germany",
    authStatus: "Certified Multi-Brand Stockist",
    isDirectAuthorized: false,
    tagline: "European Precision Metalworking Chemistry, CNC Coolants & Rust Defense",
    about:
      "TW Chemin represents German precision chemical formulations for multi-axis CNC metal cutting, surface preparation, and long-term corrosion prevention. Formulated with bio-stable biocides, zero-chlorine lubricity boosters, and thin-film dewatering anti-corrosion barriers.",
    heroImage: "/oil-lab-quality.jpg",
    categories: [
      {
        name: "Industrial Chemicals",
        slug: "industrial-chemicals",
        description: "Precision degreasers, ultrasonic cleaners, and machine sump conditioners.",
        coverImage: "/oil-lab-quality.jpg",
        products: [
          {
            id: "tw-solvclean-100",
            name: "TW SolvClean 100 Industrial Degreaser",
            slug: "tw-solvclean-100",
            specs: "Fast Evaporating | Zero Residue | Non-Corrosive",
            description: "Removes stubborn machining oils, greases, and carbon deposits from metal parts.",
            packaging: ["20L Can", "200L Drum"],
            applications: ["Ultrasonic Wash Tanks", "Pre-Assembly Cleaning"],
            coverImage: "/oil-lab-quality.jpg",
          },
        ],
      },
      {
        name: "Lubrication Solutions",
        slug: "lubrication-solutions",
        description: "Bio-stable semi-synthetic CNC coolants and neat cutting oils.",
        coverImage: "/oil-lab-quality.jpg",
        products: [
          {
            id: "tw-coolpro-500",
            name: "TW CoolPro 500 Semi-Synthetic Coolant",
            slug: "tw-coolpro-500",
            specs: "Biostable Emulsion | Chlorine-Free | Anti-Foam",
            description: "High performance cutting fluid designed for steel, cast iron, and aluminum alloys.",
            packaging: ["20L", "200L Drum"],
            applications: ["CNC Milling & Turning", "High Pressure Drilling"],
            coverImage: "/oil-lab-quality.jpg",
          },
        ],
      },
      {
        name: "Specialty Chemicals",
        slug: "specialty-chemicals",
        description: "Dewatering rust preventives and thin-film corrosion inhibitors.",
        coverImage: "/oil-lab-quality.jpg",
        products: [
          {
            id: "tw-rustguard-200",
            name: "TW RustGuard Dewatering 200",
            slug: "tw-rustguard-200",
            specs: "Rapid Dewatering | Thin Oily Film | 12+ Months Protection",
            description: "Displaces water instantly from wet machined parts, leaving an anti-corrosion barrier.",
            packaging: ["20L", "200L Drum"],
            applications: ["Export Packaging", "Intermediate Storage Parts"],
            coverImage: "/oil-lab-quality.jpg",
          },
        ],
      },
      {
        name: "Maintenance Products",
        slug: "maintenance-products",
        description: "Machine tool slide fluids and multi-purpose penetrating sprays.",
        coverImage: "/oil-drums-warehouse.jpg",
        products: [
          {
            id: "tw-moisture-displacer",
            name: "TW MoistureDisplacer 40 Spray",
            slug: "tw-moisture-displacer",
            specs: "High Dielectric | Penetrating & Lubricating",
            description: "Frees rusted bolts, displaces moisture from electrical circuits, and stops squeaks.",
            packaging: ["500ml Aerosol", "5L Can", "20L Can"],
            applications: ["Maintenance Toolkits", "Electrical Switchgear Maintenance"],
            coverImage: "/oil-drums-warehouse.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "filtermist",
    number: 10,
    name: "Filtermist",
    flag: "🇬🇧",
    country: "United Kingdom",
    authStatus: "Certified Multi-Brand Stockist",
    isDirectAuthorized: false,
    tagline: "UK World Leaders in Centrifugal Oil Mist Extraction & Machine Shop Clean Air",
    about:
      "Filtermist is the international standard in oil mist collectors, centrifugal smoke eliminators, and workshop air filtration units since 1969. Engineered to capture hazardous oil mist directly at the CNC machine source, recover valuable coolants, and protect workers' health.",
    heroImage: "/engine-oil-hero.jpg",
    categories: [
      {
        name: "Oil Mist Collectors",
        slug: "oil-mist-collectors",
        description: "Centrifugal oil mist collectors mounted directly on CNC machine enclosures.",
        coverImage: "/engine-oil-hero.jpg",
        products: [
          {
            id: "filtermist-fx4002",
            name: "Filtermist FX4002 Centrifugal Mist Collector",
            slug: "filtermist-fx4002",
            specs: "Airflow 1250 m³/h | 1.1 kW Motor | Low Noise 70 dB(A)",
            description: "Direct-drive centrifugal unit removing oil mist and returning condensed coolant into the sump.",
            packaging: ["Complete Collector Unit"],
            applications: ["CNC Turning Centers", "Milling Enclosures"],
            coverImage: "/engine-oil-hero.jpg",
          },
          {
            id: "filtermist-fx5002",
            name: "Filtermist FX5002 Mist Collector",
            slug: "filtermist-fx5002",
            specs: "Airflow 1750 m³/h | 1.5 kW | High Volume Mist Extraction",
            description: "Higher throughput extraction unit for high-pressure through-spindle coolant CNC centers.",
            packaging: ["Complete Collector Unit"],
            applications: ["High-Pressure Machining Centers", "Large Enclosures"],
            coverImage: "/engine-oil-hero.jpg",
          },
        ],
      },
      {
        name: "Filtration Systems",
        slug: "filtration-systems",
        description: "High-efficiency HEPA afterfilters and activated carbon packs for smoke and odor.",
        coverImage: "/oil-lab-quality.jpg",
        products: [
          {
            id: "filtermist-hepa-afterfilter",
            name: "Filtermist HEPA H13 Afterfilter",
            slug: "filtermist-hepa-afterfilter",
            specs: "Efficiency 99.95% @ 0.3 Micron | H13 Standard",
            description: "Mounted on top of the Filtermist collector to eliminate dry smoke and sub-micron oil particulate.",
            packaging: ["Filter Pack"],
            applications: ["Neat Oil Machining", "High Speed Grinding Smoke"],
            coverImage: "/oil-lab-quality.jpg",
          },
        ],
      },
      {
        name: "Industrial Air Filtration",
        slug: "industrial-air-filtration",
        description: "Workshop ambient air purifiers and centralized ducting extraction systems.",
        coverImage: "/oil-lab-quality.jpg",
        products: [
          {
            id: "filtermist-smoke-eliminator",
            name: "Filtermist Industrial Smoke Eliminator",
            slug: "filtermist-smoke-eliminator",
            specs: "Multi-Stage High Performance Sub-Micron Filtration",
            description: "Captures dense smoke generated by heat treatment and severe high-speed machining.",
            packaging: ["Filtration Unit"],
            applications: ["Heat Treatment Shops", "Heavy Machining Plants"],
            coverImage: "/oil-lab-quality.jpg",
          },
        ],
      },
      {
        name: "Extraction Solutions",
        slug: "extraction-solutions",
        description: "Mounting stands, flexible ducting kits, and digital airflow monitor sensors.",
        coverImage: "/industrial-gear-oil.jpg",
        products: [
          {
            id: "filtermist-f-monitor",
            name: "Filtermist F-Monitor Airflow Sensor",
            slug: "filtermist-f-monitor",
            specs: "Digital LED Status Indicator | Airflow & Filter Monitor",
            description: "Monitors airflow volume and alerts machine operators when afterfilters require maintenance.",
            packaging: ["Sensor Gauge Kit"],
            applications: ["Continuous Airflow Monitoring", "Preventive Maintenance"],
            coverImage: "/industrial-gear-oil.jpg",
          },
        ],
      },
    ],
  },
];
