import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { moodMap, type EmojiMood } from '@/data/emojiDictionary';
import { FloatingEmojis } from '@/components/FloatingEmojis';
import { Sparkles, Share2, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CombinedResult {
  moods: string[];
  colors: string[];
  combinedStory: string;
  gradient: string;
  emojis: string[];
  timestamp: number;
}

const Index = () => {
  const [emojiInput, setEmojiInput] = useState('');
  const [result, setResult] = useState<CombinedResult | null>(null);
  const [displayEmojis, setDisplayEmojis] = useState<string[]>([]);
  const [vibeHistory, setVibeHistory] = useState<CombinedResult[]>(() => {
    const saved = localStorage.getItem('vibeHistory');
    return saved ? JSON.parse(saved) : [];
  });

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
      const newResult = {
        moods: ['Mysterious Vibes'],
        colors: ['#B794F6'],
        combinedStory: "Your emojis speak a unique language! Sometimes the best vibes are the ones we create ourselves.",
        gradient: 'linear-gradient(135deg, #B794F640 0%, #B794F620 100%)',
        emojis,
        timestamp: Date.now()
      };
      
      setResult(newResult);
      
      // Save to history
      const updatedHistory = [newResult, ...vibeHistory].slice(0, 10);
      setVibeHistory(updatedHistory);
      localStorage.setItem('vibeHistory', JSON.stringify(updatedHistory));
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

    const newResult = {
      moods,
      colors,
      combinedStory,
      gradient,
      emojis,
      timestamp: Date.now()
    };

    setResult(newResult);
    
    // Save to history
    const updatedHistory = [newResult, ...vibeHistory].slice(0, 10);
    setVibeHistory(updatedHistory);
    localStorage.setItem('vibeHistory', JSON.stringify(updatedHistory));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      interpretEmojis();
    }
  };

  const shareVibe = async () => {
    if (!result) return;

    // Create a canvas to draw the vibe card
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    result.colors.forEach((color, index) => {
      gradient.addColorStop(index / (result.colors.length - 1), color);
    });
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add semi-transparent overlay for better text visibility
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.roundRect(100, 100, 1000, 600, 40);
    ctx.fill();

    // Draw emojis
    ctx.font = 'bold 120px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(displayEmojis.slice(0, 5).join(' '), canvas.width / 2, 280);

    // Draw mood text
    ctx.font = 'bold 60px Arial';
    ctx.fillStyle = '#1a1a1a';
    ctx.fillText(result.moods.join(' + '), canvas.width / 2, 380);

    // Draw story (wrap text)
    ctx.font = '32px Arial';
    ctx.fillStyle = '#4a4a4a';
    const maxWidth = 900;
    const lineHeight = 45;
    const words = result.combinedStory.split(' ');
    let line = '';
    let y = 480;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && i > 0) {
        ctx.fillText(line, canvas.width / 2, y);
        line = words[i] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, canvas.width / 2, y);

    // Add branding
    ctx.font = 'bold 28px Arial';
    ctx.fillStyle = '#8b5cf6';
    ctx.fillText('✨ Vibe Decoder ✨', canvas.width / 2, y + 80);

    // Convert to blob and download
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `my-vibe-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
      
      toast({
        title: "Vibe Captured! 📸",
        description: "Your vibe is ready to share with the world!",
      });
    });
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
                Let's go
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
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <h2 className="text-3xl font-bold text-foreground">
                    Your Vibe: {result.moods.join(' + ')}
                  </h2>
                  <div className="text-5xl">
                    <span className="inline-block">💃</span>
                  </div>
                </div>
                <Button
                  onClick={shareVibe}
                  className="h-12 px-6 rounded-2xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold shadow-soft hover:shadow-float transition-all hover:scale-105 gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share Your Vibes ✨
                  <Download className="w-4 h-4" />
                </Button>
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
                {result.combinedStory}
              </p>
            </Card>

            {/* Vibe History */}
            {vibeHistory.length > 0 && (
              <Card className="p-8 shadow-float backdrop-blur-sm bg-card/90 border-2 border-border rounded-3xl">
                <h3 className="text-2xl font-bold mb-6 text-center text-foreground">
                  Your Vibe History 🕰️
                </h3>
                <div className="space-y-4">
                  {vibeHistory.map((vibe, index) => (
                    <button
                      key={vibe.timestamp}
                      onClick={() => {
                        setResult(vibe);
                        setDisplayEmojis(vibe.emojis);
                        setEmojiInput(vibe.emojis.join(''));
                      }}
                      className="w-full p-4 rounded-2xl bg-background/50 hover:bg-background/80 border-2 border-border/50 hover:border-primary/50 transition-all hover:scale-[1.02] text-left"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="text-3xl">{vibe.emojis.slice(0, 5).join(' ')}</div>
                          <div className="flex-1">
                            <p className="font-semibold text-foreground">{vibe.moods.join(' + ')}</p>
                            <p className="text-sm text-foreground/60">
                              {new Date(vibe.timestamp).toLocaleDateString()} at {new Date(vibe.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>
            )}
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
