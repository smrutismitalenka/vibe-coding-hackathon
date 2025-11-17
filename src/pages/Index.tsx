import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { moodMap, type EmojiMood } from '@/data/emojiDictionary';
import { FloatingEmojis } from '@/components/FloatingEmojis';
import { Sparkles } from 'lucide-react';

interface CombinedResult {
  moods: string[];
  colors: string[];
  combinedStory: string;
  gradient: string;
}

const Index = () => {
  const [emojiInput, setEmojiInput] = useState('');
  const [result, setResult] = useState<CombinedResult | null>(null);
  const [displayEmojis, setDisplayEmojis] = useState<string[]>([]);

  const interpretEmojis = () => {
    if (!emojiInput.trim()) return;

    // Split input into individual characters/emojis
    const emojis = Array.from(emojiInput);
    setDisplayEmojis(emojis);

    // Find ALL matching emojis in our dictionary
    const matches: EmojiMood[] = [];
    const uniqueEmojis = new Set<string>();
    
    for (const emoji of emojis) {
      if (moodMap[emoji] && !uniqueEmojis.has(emoji)) {
        matches.push(moodMap[emoji]);
        uniqueEmojis.add(emoji);
      }
    }

    if (matches.length === 0) {
      // If no match found, show default mood
      setResult({
        moods: ['Mysterious Vibes'],
        colors: ['#B794F6'],
        combinedStory: "Your emojis speak a unique language! Sometimes the best vibes are the ones we create ourselves.",
        gradient: 'linear-gradient(135deg, #B794F640 0%, #B794F620 100%)'
      });
      return;
    }

    // Combine all the moods
    const moods = matches.map(m => m.mood);
    const colors = matches.map(m => m.color);
    
    // Create a gradient from all colors
    const gradientStops = colors.map((color, index) => {
      const percent = (index / (colors.length - 1)) * 100;
      return `${color}40 ${percent}%`;
    }).join(', ');
    const gradient = `linear-gradient(135deg, ${gradientStops})`;

    // Create a combined story
    let combinedStory = '';
    if (matches.length === 1) {
      combinedStory = matches[0].story;
    } else {
      const moodDescriptions = matches.map(m => m.mood.toLowerCase()).join(', ');
      const storyFragments = matches.map(m => m.story).join(' ');
      combinedStory = `You're feeling ${moodDescriptions} all at once! ${storyFragments}`;
    }

    setResult({
      moods,
      colors,
      combinedStory,
      gradient
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      interpretEmojis();
    }
  };

  return (
    <div 
      className="min-h-screen transition-all duration-700 bg-gradient-default relative overflow-hidden"
      style={result ? { background: result.gradient } : {}}
    >
      <FloatingEmojis emojis={displayEmojis} />
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              Vibe Decoder
            </h1>
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <p className="text-xl text-foreground/80 mb-8">
            What's Your Vibe Today? ✨
          </p>

          {/* Input Section */}
          <Card className="p-6 shadow-soft backdrop-blur-sm bg-card/80 border-2 border-border">
            <div className="flex gap-3 flex-col sm:flex-row">
              <Input
                type="text"
                placeholder="Drop your emojis here... 😊✨🌈"
                value={emojiInput}
                onChange={(e) => setEmojiInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="text-2xl h-14 text-center rounded-2xl border-2 border-border focus:border-primary transition-colors"
              />
              <Button
                onClick={interpretEmojis}
                className="h-14 px-8 text-lg rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-soft hover:shadow-float transition-all hover:scale-105"
              >
                Interpret ✨
              </Button>
            </div>
            
            {/* Emoji Picker */}
            <div className="mt-6">
              <p className="text-sm text-foreground/70 text-center mb-3">Or click to add emojis:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {Object.keys(moodMap).map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setEmojiInput(prev => prev + emoji)}
                    className="text-4xl hover:scale-125 transition-transform cursor-pointer bg-background/50 hover:bg-background/80 rounded-xl p-2 border border-border/50 hover:border-primary/50"
                    title={moodMap[emoji].mood}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-6 animate-fade-in-up">
            {/* Mood Card */}
            <Card className="p-8 shadow-float backdrop-blur-sm bg-card/90 border-2 border-border rounded-3xl">
              <h2 className="text-3xl font-bold mb-4 text-center text-foreground">
                Your Vibe: {result.moods.join(' + ')}
              </h2>

              {/* Emoji Display */}
              <div className="text-6xl text-center mb-4">
                {displayEmojis.slice(0, 5).join(' ')}
              </div>
            </Card>

            {/* Story Card */}
            <Card className="p-8 shadow-float backdrop-blur-sm bg-card/90 border-2 border-border rounded-3xl">
              <h3 className="text-2xl font-bold mb-4 text-center text-foreground">
                Your Story 📖
              </h3>
              <p className="text-lg text-foreground/90 text-center leading-relaxed">
                {result.combinedStory}
              </p>
            </Card>

            {/* Goofy Dance Animation */}
            <div className="text-center py-8">
              <div className="inline-block text-8xl animate-bounce">
                <span className="inline-block animate-spin-slow">🕺</span>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!result && (
          <div className="text-center mt-16 animate-fade-in-up">
            <div className="text-8xl mb-4 animate-float">🎭</div>
            <p className="text-xl text-foreground/70">
              Enter some emojis above to discover your vibe!
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Index;
