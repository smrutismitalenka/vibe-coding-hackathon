import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { moodMap, type EmojiMood } from '@/data/emojiDictionary';
import { FloatingEmojis } from '@/components/FloatingEmojis';
import { Sparkles } from 'lucide-react';

const Index = () => {
  const [emojiInput, setEmojiInput] = useState('');
  const [result, setResult] = useState<EmojiMood | null>(null);
  const [displayEmojis, setDisplayEmojis] = useState<string[]>([]);

  const interpretEmojis = () => {
    if (!emojiInput.trim()) return;

    // Split input into individual characters/emojis
    const emojis = Array.from(emojiInput);
    setDisplayEmojis(emojis);

    // Find first matching emoji in our dictionary
    for (const emoji of emojis) {
      if (moodMap[emoji]) {
        setResult(moodMap[emoji]);
        return;
      }
    }

    // If no match found, show default mood
    setResult({
      mood: 'Mysterious Vibes',
      colors: ['#B794F6', '#9B9ECE', '#7B8CDE'],
      story: 'Your emojis speak a unique language! Sometimes the best vibes are the ones we create ourselves.',
      gradient: 'gradient-mysterious'
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      interpretEmojis();
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${result ? `bg-${result.gradient}` : 'bg-gradient-default'} relative overflow-hidden`}>
      <FloatingEmojis emojis={displayEmojis} />
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              Emoji Interpreter
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
          </Card>
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-6 animate-fade-in-up">
            {/* Mood Card */}
            <Card className="p-8 shadow-float backdrop-blur-sm bg-card/90 border-2 border-border rounded-3xl">
              <h2 className="text-3xl font-bold mb-4 text-center text-foreground">
                Your Vibe: {result.mood}
              </h2>
              
              {/* Color Palette */}
              <div className="flex justify-center gap-3 mb-6 flex-wrap">
                {result.colors.map((color, idx) => (
                  <div
                    key={idx}
                    className="w-16 h-16 rounded-full shadow-soft hover:scale-110 transition-transform cursor-pointer"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>

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
                {result.story}
              </p>
            </Card>
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
