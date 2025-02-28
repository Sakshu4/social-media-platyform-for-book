import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Smile, Heart, Star, Coffee, Brain, Book } from 'lucide-react';

interface EmotionPickerProps {
  selectedEmotion: string;
  setSelectedEmotion: (emotion: string) => void;
}

const emotions = [
  { id: 'happy', icon: Smile, label: 'Happy & Light', color: 'text-yellow-500' },
  { id: 'romantic', icon: Heart, label: 'Romantic', color: 'text-pink-500' },
  { id: 'inspired', icon: Star, label: 'Inspired', color: 'text-purple-500' },
  { id: 'relaxed', icon: Coffee, label: 'Relaxed', color: 'text-blue-500' },
  { id: 'intellectual', icon: Brain, label: 'Intellectual', color: 'text-green-500' },
  { id: 'adventurous', icon: Book, label: 'Adventurous', color: 'text-red-500' },
];

export default function EmotionPicker({ selectedEmotion, setSelectedEmotion }: EmotionPickerProps) {
  const { isDarkMode } = useTheme();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            How are you feeling today?
          </h2>
          <p className={`text-xl ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Let us recommend books based on your current mood
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {emotions.map((emotion) => (
            <motion.button
              key={emotion.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedEmotion(emotion.id)}
              className={`relative p-6 rounded-xl transition-all duration-300 ${
                selectedEmotion === emotion.id
                  ? `${isDarkMode ? 'bg-dark-600' : 'bg-white'} shadow-xl ring-2 ring-primary-500`
                  : `${isDarkMode ? 'bg-dark-700 hover:bg-dark-600' : 'bg-gray-50 hover:bg-white'} shadow-md`
              }`}
            >
              <div className="flex flex-col items-center space-y-3">
                <motion.div
                  animate={{
                    scale: selectedEmotion === emotion.id ? 1.1 : 1,
                    rotate: selectedEmotion === emotion.id ? [0, 10, -10, 0] : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <emotion.icon className={`w-8 h-8 ${emotion.color}`} />
                </motion.div>
                <span className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {emotion.label}
                </span>
              </div>

              {selectedEmotion === emotion.id && (
                <motion.div
                  layoutId="outline"
                  className="absolute inset-0 rounded-xl ring-2 ring-primary-500"
                  initial={false}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
} 