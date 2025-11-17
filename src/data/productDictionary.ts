export interface Product {
  name: string;
  description: string;
  affiliateLink: string;
  category: string;
}

// Map moods to relevant product recommendations
export const moodProducts: Record<string, Product[]> = {
  "Playful": [
    { name: "Fun Board Games Collection", description: "Keep the playful energy going with exciting games", affiliateLink: "https://amzn.to/your-link", category: "Entertainment" },
    { name: "Colorful Art Supplies", description: "Express your playful creativity", affiliateLink: "https://amzn.to/your-link", category: "Creative" },
    { name: "Party Decorations Kit", description: "Make every moment a celebration", affiliateLink: "https://amzn.to/your-link", category: "Party" }
  ],
  "Cozy": [
    { name: "Luxury Blanket", description: "Perfect for those cozy vibes", affiliateLink: "https://amzn.to/your-link", category: "Home" },
    { name: "Aromatherapy Candles", description: "Create the perfect cozy atmosphere", affiliateLink: "https://amzn.to/your-link", category: "Wellness" },
    { name: "Hot Chocolate Gift Set", description: "Warm drinks for warm vibes", affiliateLink: "https://amzn.to/your-link", category: "Food" }
  ],
  "Energetic": [
    { name: "Fitness Tracker", description: "Channel that energy into fitness goals", affiliateLink: "https://amzn.to/your-link", category: "Fitness" },
    { name: "Energy Drink Variety Pack", description: "Keep the momentum going", affiliateLink: "https://amzn.to/your-link", category: "Nutrition" },
    { name: "Wireless Earbuds", description: "Pump-up music for your energetic vibes", affiliateLink: "https://amzn.to/your-link", category: "Tech" }
  ],
  "Ambitious": [
    { name: "Productivity Planner", description: "Plan your path to success", affiliateLink: "https://amzn.to/your-link", category: "Organization" },
    { name: "Motivational Books Bundle", description: "Fuel your ambitious mindset", affiliateLink: "https://amzn.to/your-link", category: "Books" },
    { name: "Professional Desk Organizer", description: "Organize your workspace for success", affiliateLink: "https://amzn.to/your-link", category: "Office" }
  ],
  "Inspired": [
    { name: "Premium Notebook Set", description: "Capture all those brilliant ideas", affiliateLink: "https://amzn.to/your-link", category: "Stationery" },
    { name: "Inspiration Cards Deck", description: "Daily inspiration at your fingertips", affiliateLink: "https://amzn.to/your-link", category: "Motivation" },
    { name: "Creative Thinking Tools", description: "Tools for the inspired mind", affiliateLink: "https://amzn.to/your-link", category: "Creative" }
  ],
  "Content": [
    { name: "Meditation Cushion", description: "Enhance your peaceful state", affiliateLink: "https://amzn.to/your-link", category: "Wellness" },
    { name: "Tea Collection Set", description: "Relax with premium teas", affiliateLink: "https://amzn.to/your-link", category: "Food" },
    { name: "Gratitude Journal", description: "Reflect on your contentment", affiliateLink: "https://amzn.to/your-link", category: "Journaling" }
  ],
  "Confident": [
    { name: "Style Guide Books", description: "Elevate your confident presence", affiliateLink: "https://amzn.to/your-link", category: "Fashion" },
    { name: "Professional Accessories", description: "Look as confident as you feel", affiliateLink: "https://amzn.to/your-link", category: "Accessories" },
    { name: "Power Pose Cards", description: "Body language for confidence", affiliateLink: "https://amzn.to/your-link", category: "Self-Help" }
  ],
  "Focused": [
    { name: "Noise Cancelling Headphones", description: "Block distractions, stay focused", affiliateLink: "https://amzn.to/your-link", category: "Tech" },
    { name: "Focus Enhancement Supplements", description: "Support your mental clarity", affiliateLink: "https://amzn.to/your-link", category: "Health" },
    { name: "Minimal Desk Setup", description: "Clean workspace, clear mind", affiliateLink: "https://amzn.to/your-link", category: "Office" }
  ],
  "Celebratory": [
    { name: "Party Supplies Kit", description: "Everything for your celebration", affiliateLink: "https://amzn.to/your-link", category: "Party" },
    { name: "Champagne Glasses Set", description: "Toast to your success", affiliateLink: "https://amzn.to/your-link", category: "Drinkware" },
    { name: "Photo Booth Props", description: "Capture the celebratory moments", affiliateLink: "https://amzn.to/your-link", category: "Photography" }
  ],
  "Hopeful": [
    { name: "Vision Board Supplies", description: "Visualize your hopeful future", affiliateLink: "https://amzn.to/your-link", category: "Planning" },
    { name: "Positive Affirmations Cards", description: "Daily doses of hope", affiliateLink: "https://amzn.to/your-link", category: "Motivation" },
    { name: "Sunrise Alarm Clock", description: "Wake up to new possibilities", affiliateLink: "https://amzn.to/your-link", category: "Home" }
  ]
};

// Get product recommendations based on moods
export const getProductRecommendations = (moods: string[]): Product[] => {
  const allProducts: Product[] = [];
  const seenProducts = new Set<string>();

  for (const mood of moods) {
    const products = moodProducts[mood];
    if (products) {
      for (const product of products) {
        if (!seenProducts.has(product.name)) {
          allProducts.push(product);
          seenProducts.add(product.name);
        }
      }
    }
  }

  // Return top 3 products
  return allProducts.slice(0, 3);
};
