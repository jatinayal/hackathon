import strikePlusImg from '../assets/images/strikePlus.png';
import strikeUltraImg from '../assets/images/strikeUltra.png';

export const plansData = [
  {
    id: "strike-plus",
    name: "Strike Plus",
    theme: "silver",
    tagline: "MEMBERSHIP PLAN",
    subtitle: "All existing Strike courses with access for your selected duration.",
    badge: null,
    isMostPopular: false,
    bannerImage: strikePlusImg,
    variants: [
      {
        duration: "2 Years",
        label: "2 Years",
        sellingPrice: 9999,
        originalPrice: 19999,
        discount: "50% OFF",
        isPopular: false
      },
      {
        duration: "3 Years",
        label: "3 Years",
        sellingPrice: 11499,
        originalPrice: 19999,
        discount: "42% OFF",
        isPopular: false
      },
      {
        duration: "4 Years",
        label: "4 Years",
        sellingPrice: 12499,
        originalPrice: 19999,
        discount: "38% OFF",
        isPopular: true
      }
    ],
    features: [
      { text: "All current courses included", highlight: false },
      { text: "HD recordings", highlight: false },
      { text: "Live class access during plan", highlight: false },
      { text: "Notes", highlight: false },
      { text: "Resume Review", highlight: false },
      { text: "Certificates", highlight: false },
      { text: "System Design Platform", highlight: false },
      { text: "DSA Platform", highlight: false },
      { text: "Coder Arena Platform", highlight: false }
    ],
    buttonText: "Get Strike Plus"
  },
  {
    id: "strike-ultra",
    name: "Strike Ultra",
    theme: "gold",
    tagline: "MEMBERSHIP PLAN",
    subtitle: "This plan includes all existing courses, plus upcoming courses for your selected duration.",
    badge: "BEST VALUE",
    isMostPopular: true,
    bannerImage: strikeUltraImg,
    variants: [
      {
        duration: "2 Years",
        label: "2 Years",
        sellingPrice: 11999,
        originalPrice: 24999,
        discount: "52% OFF",
        isPopular: false
      },
      {
        duration: "3 Years",
        label: "3 Years",
        sellingPrice: 12999,
        originalPrice: 24999,
        discount: "48% OFF",
        isPopular: false
      },
      {
        duration: "4 Years",
        label: "4 Years",
        sellingPrice: 13499,
        originalPrice: 24999,
        discount: "46% OFF",
        isPopular: true
      }
    ],
    features: [
      { text: "Everything in Strike Plus", highlight: true },
      { text: "Upcoming batches included", highlight: false },
      { text: "Coder Arena Platform", highlight: false },
      { text: "Certificates", highlight: false },
      { text: "Resume Review", highlight: false },
      { text: "Notes", highlight: false },
      { text: "System Design Platform", highlight: false },
      { text: "DSA platform", highlight: false }
    ],
    buttonText: "Get Strike Ultra"
  }
];
