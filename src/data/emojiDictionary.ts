export interface EmojiMood {
  mood: string;
  colors: string[];
  story: string;
  gradient: string;
}

export const moodMap: Record<string, EmojiMood> = {
  '😊': {
    mood: 'Happy & Content',
    colors: ['#FFD93D', '#FFA96B', '#FF8E53'],
    story: 'Your day is filled with sunshine and gentle smiles. Small moments of joy dance around you like butterflies.',
    gradient: 'gradient-happy'
  },
  '😂': {
    mood: 'Laughing & Joyful',
    colors: ['#FFD93D', '#FFBE0B', '#FB5607'],
    story: 'Laughter echoes through your soul! The universe is sharing its best jokes with you today.',
    gradient: 'gradient-happy'
  },
  '😍': {
    mood: 'In Love',
    colors: ['#FF6B9D', '#FFC2D1', '#FFE5EC'],
    story: 'Hearts flutter and sparkle everywhere you look. Love is painting your world in rosy hues.',
    gradient: 'gradient-love'
  },
  '🥰': {
    mood: 'Affectionate & Warm',
    colors: ['#FF8FAB', '#FFB3C6', '#FFE5EC'],
    story: 'Wrapped in warmth and tenderness, your heart glows like a cozy fireplace on a winter evening.',
    gradient: 'gradient-love'
  },
  '😢': {
    mood: 'Sad & Reflective',
    colors: ['#6C8EBF', '#8FA3BF', '#B4C7E7'],
    story: 'Sometimes tears water the garden of growth. Your feelings are valid, and healing is on its way.',
    gradient: 'gradient-sad'
  },
  '😭': {
    mood: 'Deeply Emotional',
    colors: ['#5B7C99', '#7B9AB8', '#B4C7E7'],
    story: 'Waves of emotion wash over you. Remember, even storms pass and leave rainbows behind.',
    gradient: 'gradient-sad'
  },
  '🎉': {
    mood: 'Celebrating & Excited',
    colors: ['#FF006E', '#FB5607', '#FFBE0B'],
    story: 'Confetti of joy rains down! Life is throwing you a party and every moment sparkles with possibility.',
    gradient: 'gradient-excited'
  },
  '🔥': {
    mood: 'Energetic & Passionate',
    colors: ['#FF4D00', '#FF6B35', '#FF9F1C'],
    story: 'Your energy blazes like wildfire! Passion fuels your every move and the world feels your heat.',
    gradient: 'gradient-energetic'
  },
  '✨': {
    mood: 'Magical & Inspired',
    colors: ['#B794F6', '#E0BBE4', '#FEC8D8'],
    story: 'Magic sparkles in your wake. The universe is whispering secrets and showing you miracles.',
    gradient: 'gradient-energetic'
  },
  '😴': {
    mood: 'Sleepy & Peaceful',
    colors: ['#9FEDD7', '#B8E6D5', '#D4F1F4'],
    story: 'Soft clouds of tranquility embrace you. Rest is a gift you deserve, and dreams await.',
    gradient: 'gradient-peaceful'
  },
  '🌙': {
    mood: 'Dreamy & Calm',
    colors: ['#A7C7E7', '#B8D8E8', '#D4E7F4'],
    story: 'The moon watches over your peaceful thoughts. Serenity flows through you like a gentle stream.',
    gradient: 'gradient-calm'
  },
  '🌟': {
    mood: 'Hopeful & Bright',
    colors: ['#FFE66D', '#FFEA00', '#FFF07C'],
    story: 'You shine like a star in the night sky! Hope illuminates your path forward.',
    gradient: 'gradient-happy'
  },
  '🤔': {
    mood: 'Thoughtful & Curious',
    colors: ['#9B9ECE', '#AEB4D6', '#C6CADD'],
    story: 'Your mind wanders through fascinating paths. Questions lead to wonderful discoveries.',
    gradient: 'gradient-mysterious'
  },
  '😎': {
    mood: 'Cool & Confident',
    colors: ['#4ECDC4', '#44A8A0', '#95E1D3'],
    story: 'Confidence radiates from you like summer sunshine. You\'ve got this, and the world knows it!',
    gradient: 'gradient-calm'
  },
  '🤗': {
    mood: 'Warm & Welcoming',
    colors: ['#FFB5A7', '#FFCDBF', '#FFE5E0'],
    story: 'Open arms and an open heart. Your warmth creates a safe haven for others.',
    gradient: 'gradient-love'
  },
  '😌': {
    mood: 'Content & Zen',
    colors: ['#A8E6CF', '#B8E6D5', '#C8F2E0'],
    story: 'Inner peace flows like a gentle river. You\'re perfectly aligned with this moment.',
    gradient: 'gradient-peaceful'
  },
  '🥳': {
    mood: 'Party Mode',
    colors: ['#FF6B9D', '#C73866', '#FF89B5'],
    story: 'It\'s celebration time! Every moment is a reason to dance and rejoice.',
    gradient: 'gradient-excited'
  },
  '😇': {
    mood: 'Pure & Innocent',
    colors: ['#E8F4FF', '#D0E8FF', '#B8DCFF'],
    story: 'Innocence and goodness surround you like a protective halo. Your intentions are pure light.',
    gradient: 'gradient-peaceful'
  },
  '🤩': {
    mood: 'Starstruck & Amazed',
    colors: ['#FFB627', '#FF8C42', '#FF6B9D'],
    story: 'Wonder fills your eyes! The world reveals its magic just for you.',
    gradient: 'gradient-excited'
  },
  '🌈': {
    mood: 'Colorful & Optimistic',
    colors: ['#FF6B9D', '#FFB627', '#44A8A0', '#B794F6'],
    story: 'Life is a rainbow of possibilities! Each color represents a different adventure waiting for you.',
    gradient: 'gradient-happy'
  },
  '💪': {
    mood: 'Strong & Determined',
    colors: ['#FF6B35', '#FF8C42', '#FFA96B'],
    story: 'Your strength knows no bounds! Mountains bow before your determination.',
    gradient: 'gradient-energetic'
  },
  '🌸': {
    mood: 'Gentle & Blooming',
    colors: ['#FFB7CE', '#FFCCE0', '#FFE1ED'],
    story: 'Like a flower in spring, you\'re blooming beautifully. Growth happens in gentle moments.',
    gradient: 'gradient-love'
  },
  '🍕': {
    mood: 'Hungry & Satisfied',
    colors: ['#FF6B35', '#FFB627', '#FFA96B'],
    story: 'Life\'s simple pleasures bring the most joy. Good food, good vibes, good times!',
    gradient: 'gradient-happy'
  },
  '☕': {
    mood: 'Cozy & Contemplative',
    colors: ['#B89470', '#C4A582', '#D4C4B0'],
    story: 'Wrapped in comfort like a warm blanket. Simple moments hold profound peace.',
    gradient: 'gradient-peaceful'
  },
  '🎨': {
    mood: 'Creative & Expressive',
    colors: ['#FF6B9D', '#FFB627', '#44A8A0', '#B794F6'],
    story: 'Your creativity knows no bounds! The world is your canvas, paint it with your unique colors.',
    gradient: 'gradient-energetic'
  },
  '🦋': {
    mood: 'Transforming & Free',
    colors: ['#B794F6', '#D4A5F9', '#E8C5FB'],
    story: 'You\'re undergoing a beautiful transformation. Spread your wings and embrace change!',
    gradient: 'gradient-energetic'
  },
  '🌺': {
    mood: 'Tropical & Vibrant',
    colors: ['#FF6B9D', '#FF8FA3', '#FFB3C1'],
    story: 'Island vibes flow through your spirit. Life is a tropical paradise when you choose joy.',
    gradient: 'gradient-love'
  },
  '🎵': {
    mood: 'Musical & Rhythmic',
    colors: ['#B794F6', '#9B9ECE', '#7B8CDE'],
    story: 'Life has a soundtrack and you\'re dancing to its rhythm. Let the music move your soul!',
    gradient: 'gradient-energetic'
  },
  '⭐': {
    mood: 'Stellar & Outstanding',
    colors: ['#FFE66D', '#FFEA00', '#FFF07C'],
    story: 'You\'re a superstar! Your light guides others through their darkest nights.',
    gradient: 'gradient-happy'
  },
  '🌻': {
    mood: 'Sunny & Optimistic',
    colors: ['#FFD93D', '#FFBE0B', '#FFB627'],
    story: 'Like a sunflower, you turn toward the light. Your positivity is contagious!',
    gradient: 'gradient-happy'
  },
  '🎀': {
    mood: 'Cute & Playful',
    colors: ['#FFB7CE', '#FFC9DD', '#FFDAEA'],
    story: 'Everything feels extra adorable today! Life\'s too short not to add a little bow on top.',
    gradient: 'gradient-love'
  },
};
