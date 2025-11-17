import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { moodMap, type EmojiMood } from '@/data/emojiDictionary';
import { getProductRecommendations } from '@/data/productDictionary';
import { FloatingEmojis } from '@/components/FloatingEmojis';
import { Sparkles, Share2, Download, ExternalLink, ShoppingBag } from 'lucide-react';
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
  const [compareMode, setCompareMode] = useState(false);
  const [emojiInput2, setEmojiInput2] = useState('');
  const [result2, setResult2] = useState<CombinedResult | null>(null);
  const [displayEmojis2, setDisplayEmojis2] = useState<string[]>([]);

  const interpretEmojis = (input: string = emojiInput, isSecondInput: boolean = false) => {
    if (!input.trim()) return;

    // Split input into individual characters/emojis
    const emojis = Array.from(input);
    if (isSecondInput) {
      setDisplayEmojis2(emojis);
    } else {
      setDisplayEmojis(emojis);
    }

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
      
      if (isSecondInput) {
        setResult2(newResult);
      } else {
        setResult(newResult);
        
        // Only save to history for primary input
        if (!compareMode) {
          const updatedHistory = [newResult, ...vibeHistory].slice(0, 10);
          setVibeHistory(updatedHistory);
          localStorage.setItem('vibeHistory', JSON.stringify(updatedHistory));
        }
      }
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

    if (isSecondInput) {
      setResult2(newResult);
    } else {
      setResult(newResult);
      
      // Only save to history for primary input (not in compare mode second input)
      if (!compareMode) {
        const updatedHistory = [newResult, ...vibeHistory].slice(0, 10);
        setVibeHistory(updatedHistory);
        localStorage.setItem('vibeHistory', JSON.stringify(updatedHistory));
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, isSecondInput: boolean = false) => {
    if (e.key === 'Enter') {
      if (isSecondInput) {
        interpretEmojis(emojiInput2, true);
      } else {
        interpretEmojis();
      }
    }
  };

  const handleCompareMode = () => {
    setCompareMode(!compareMode);
    if (!compareMode) {
      // Entering compare mode - clear second input
      setEmojiInput2('');
      setResult2(null);
      setDisplayEmojis2([]);
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

  const renderVibeCard = (vibeResult: CombinedResult, emojis: string[], showShare: boolean = true) => (
    <>
      <Card className="p-8 shadow-float backdrop-blur-sm bg-card/90 border-2 border-border rounded-3xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-foreground">
              {vibeResult.moods.join(' + ')}
            </h2>
          </div>
          {showShare && (
            <Button
              onClick={shareVibe}
              className="h-12 px-6 rounded-2xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold shadow-soft hover:shadow-float transition-all hover:scale-105 gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share ✨
              <Download className="w-4 h-4" />
            </Button>
          )}
        </div>
        <div className="text-6xl text-center mb-4">
          {emojis.slice(0, 5).join(' ')}
        </div>
      </Card>

      <Card className="p-8 shadow-float backdrop-blur-sm bg-card/90 border-2 border-border rounded-3xl">
        <h3 className="text-2xl font-bold mb-4 text-center text-foreground">
          Story 📖
        </h3>
        <p className="text-lg text-foreground/90 text-center leading-relaxed">
          {vibeResult.combinedStory}
        </p>
      </Card>

      {(() => {
        const products = getProductRecommendations(vibeResult.moods);
        return products.length > 0 ? (
          <Card className="p-8 shadow-float backdrop-blur-sm bg-card/90 border-2 border-border rounded-3xl">
            <div className="flex items-center justify-center gap-2 mb-6">
              <ShoppingBag className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold text-center text-foreground">
                Perfect for Your Vibe 🛍️
              </h3>
            </div>
            <p className="text-center text-foreground/70 mb-6">
              Products that match your {vibeResult.moods.join(' + ')} energy
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {products.map((product, index) => (
                <a
                  key={index}
                  href={product.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 rounded-2xl bg-background/50 hover:bg-background/80 border-2 border-border/50 hover:border-primary/50 transition-all hover:scale-[1.02] hover:shadow-float"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      {product.category}
                    </span>
                    <ExternalLink className="w-4 h-4 text-foreground/50 group-hover:text-primary transition-colors" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-sm text-foreground/70">
                    {product.description}
                  </p>
                  <div className="mt-4 text-sm font-semibold text-primary group-hover:underline">
                    View Product →
                  </div>
                </a>
              ))}
            </div>
            <p className="text-xs text-center text-foreground/50 mt-6">
              Note: Replace affiliate links with your own to start earning commissions
            </p>
          </Card>
        ) : null;
      })()}
    </>
  );

  return (
    <div 
      className="min-h-screen transition-all duration-700 bg-gradient-default relative overflow-hidden"
      style={result && !compareMode ? { background: result.gradient } : {}}
    >
      <FloatingEmojis emojis={compareMode ? [...displayEmojis, ...displayEmojis2] : displayEmojis} />
      
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
          <p className="text-xl text-foreground/80 mb-4">
            What's Your Vibe Today? ✨
          </p>

          <div className="flex justify-center gap-4 mb-8">
            <Button
              onClick={handleCompareMode}
              variant={compareMode ? "default" : "outline"}
              className="rounded-2xl px-6 h-12 font-semibold transition-all hover:scale-105"
            >
              {compareMode ? "✓ Compare Mode" : "Compare Vibes"}
            </Button>
          </div>

          {/* Input Section */}
          <div className={compareMode ? "grid md:grid-cols-2 gap-4" : ""}>
            <Card className="p-6 shadow-soft backdrop-blur-sm bg-card/80 border-2 border-border">
              {compareMode && (
                <h3 className="text-lg font-bold text-foreground mb-4 text-center">Vibe 1</h3>
              )}
              <div className="flex gap-3 flex-col sm:flex-row">
                <Input
                  type="text"
                  placeholder="Drop your emojis here... 😊✨🌈"
                  value={emojiInput}
                  onChange={(e) => setEmojiInput(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, false)}
                  className="text-2xl h-14 text-center rounded-2xl border-2 border-border focus:border-primary transition-colors"
                />
                <Button
                  onClick={() => interpretEmojis()}
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

            {compareMode && (
              <Card className="p-6 shadow-soft backdrop-blur-sm bg-card/80 border-2 border-border">
                <h3 className="text-lg font-bold text-foreground mb-4 text-center">Vibe 2</h3>
                <div className="flex gap-3 flex-col sm:flex-row">
                  <Input
                    type="text"
                    placeholder="Drop your emojis here... 🔥🚀💡"
                    value={emojiInput2}
                    onChange={(e) => setEmojiInput2(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, true)}
                    className="text-2xl h-14 text-center rounded-2xl border-2 border-border focus:border-primary transition-colors"
                  />
                  <Button
                    onClick={() => interpretEmojis(emojiInput2, true)}
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
                        onClick={() => setEmojiInput2(prev => prev + emoji)}
                        className="text-4xl hover:scale-125 transition-transform cursor-pointer bg-background/50 hover:bg-background/80 rounded-xl p-2 border border-border/50 hover:border-primary/50"
                        title={moodMap[emoji].mood}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Results Section */}
        {result && !compareMode && (
          <div className="space-y-6 animate-fade-in-up">
            {renderVibeCard(result, displayEmojis, true)}

            {/* Vibe History */}
            {vibeHistory.length > 0 && !compareMode && (
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

        {/* Comparison View */}
        {compareMode && (result || result2) && (
          <div className="space-y-6 animate-fade-in-up">
            <Card className="p-6 shadow-float backdrop-blur-sm bg-card/90 border-2 border-border rounded-3xl">
              <h2 className="text-3xl font-bold text-center text-foreground mb-4">
                Vibe Comparison 🔄
              </h2>
              <p className="text-center text-foreground/70 mb-6">
                See how different emoji combinations create unique vibes
              </p>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Vibe 1 */}
              <div className="space-y-6">
                {result ? (
                  <>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-foreground mb-2">Vibe 1</h3>
                    </div>
                    {renderVibeCard(result, displayEmojis, false)}
                  </>
                ) : (
                  <Card className="p-12 shadow-float backdrop-blur-sm bg-card/90 border-2 border-border rounded-3xl">
                    <div className="text-center">
                      <div className="text-6xl mb-4">✨</div>
                      <p className="text-lg text-foreground/70">
                        Decode your first vibe above
                      </p>
                    </div>
                  </Card>
                )}
              </div>

              {/* Vibe 2 */}
              <div className="space-y-6">
                {result2 ? (
                  <>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-foreground mb-2">Vibe 2</h3>
                    </div>
                    {renderVibeCard(result2, displayEmojis2, false)}
                  </>
                ) : (
                  <Card className="p-12 shadow-float backdrop-blur-sm bg-card/90 border-2 border-border rounded-3xl">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🎭</div>
                      <p className="text-lg text-foreground/70">
                        Decode your second vibe above
                      </p>
                    </div>
                  </Card>
                )}
              </div>
            </div>

            {/* Comparison Insights */}
            {result && result2 && (
              <Card className="p-8 shadow-float backdrop-blur-sm bg-card/90 border-2 border-border rounded-3xl">
                <h3 className="text-2xl font-bold text-center text-foreground mb-6">
                  Comparison Insights 💡
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-background/50 border border-border/50">
                    <h4 className="font-bold text-lg text-foreground mb-3">Mood Difference</h4>
                    <p className="text-foreground/80">
                      <span className="font-semibold">Vibe 1:</span> {result.moods.join(', ')}
                    </p>
                    <p className="text-foreground/80 mt-2">
                      <span className="font-semibold">Vibe 2:</span> {result2.moods.join(', ')}
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-background/50 border border-border/50">
                    <h4 className="font-bold text-lg text-foreground mb-3">Emoji Count</h4>
                    <p className="text-foreground/80">
                      <span className="font-semibold">Vibe 1:</span> {displayEmojis.length} emoji{displayEmojis.length !== 1 ? 's' : ''}
                    </p>
                    <p className="text-foreground/80 mt-2">
                      <span className="font-semibold">Vibe 2:</span> {displayEmojis2.length} emoji{displayEmojis2.length !== 1 ? 's' : ''}
                    </p>
                  </div>
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
