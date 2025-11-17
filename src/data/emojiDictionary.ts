export interface EmojiMood {
  mood: string;
  color: string;
  story: string;
}

export const moodMap: Record<string, EmojiMood> = {
  "😂": { mood: "Playful", color: "#FFD93D", story: "You're all about fun energy today!" },
  "🌧️": { mood: "Cozy", color: "#6E8CA0", story: "Perfect day for warm drinks and calm vibes." },
  "🔥": { mood: "Energetic", color: "#FF5733", story: "You're bringing the heat and momentum!" },
  "🚀": { mood: "Ambitious", color: "#4CAF50", story: "Sky is not the limit — momentum mode activated!" },
  "💡": { mood: "Inspired", color: "#F4E869", story: "Ideas are flowing like magic today." },
  "😊": { mood: "Content", color: "#F7A4A4", story: "Soft smiles and warm energy." },
  "😎": { mood: "Confident", color: "#2EC4B6", story: "You're in cool mode — nothing can shake you." },
  "🧠": { mood: "Focused", color: "#7D5BA6", story: "Brain sharp. Vision clear. You're locked in." },
  "🎉": { mood: "Celebratory", color: "#FFB5E8", story: "A party mood is surrounding you!" },
  "🌈": { mood: "Hopeful", color: "#A5DEE4", story: "Positive vibes radiating everywhere." }
};
