import { useEffect, useState } from 'react';

interface FloatingEmojisProps {
  emojis: string[];
}

interface FloatingEmoji {
  id: number;
  emoji: string;
  left: number;
  delay: number;
  duration: number;
}

export const FloatingEmojis = ({ emojis }: FloatingEmojisProps) => {
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);

  useEffect(() => {
    if (emojis.length === 0) {
      setFloatingEmojis([]);
      return;
    }

    const newFloatingEmojis: FloatingEmoji[] = [];
    for (let i = 0; i < 15; i++) {
      newFloatingEmojis.push({
        id: i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
      });
    }
    setFloatingEmojis(newFloatingEmojis);
  }, [emojis]);

  if (floatingEmojis.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {floatingEmojis.map((item) => (
        <div
          key={item.id}
          className="absolute text-4xl opacity-30"
          style={{
            left: `${item.left}%`,
            bottom: '-50px',
            animation: `float ${item.duration}s ease-in-out ${item.delay}s infinite`,
          }}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  );
};
