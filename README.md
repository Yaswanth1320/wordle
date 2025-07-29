# 🎯 WORDLE X 

A modern, feature-rich Wordle clone built with React Native and Expo, featuring multiple difficulty levels, high score tracking, and a beautiful dark theme UI.

## ✨ Features

### 🎮 Game Features
- **Multiple Difficulty Levels**:
  - **Easy**: 4-letter words, 6 attempts
  - **Medium**: 5-letter words, 6 attempts  
  - **Hard**: 8-letter words, 8 attempts
- **Smart Word Validation**: Real-time dictionary checking
- **Visual Feedback**: Color-coded letter tiles with animations
- **Keyboard Integration**: On-screen keyboard with visual feedback
- **Game State Management**: Win/lose detection and streak tracking

### 🏆 Scoring & Progress
- **High Score Tracking**: Persistent storage for each difficulty level
- **Player Names**: Save your name with high scores
- **Solved Streak**: Track consecutive wins
- **Score History**: View top 5 scores per difficulty

### 🎨 UI/UX Features
- **Dark Theme**: Modern dark interface with green accents
- **Smooth Animations**: Tile flip animations and keyboard feedback
- **Responsive Design**: Works on mobile, tablet, and web
- **Haptic Feedback**: Tactile responses for better UX
- **Confetti Celebration**: Visual celebration on wins

### 🔧 Technical Features
- **Cross-Platform**: iOS, Android, and Web support
- **Offline Capable**: Works without internet connection
- **Performance Optimized**: Smooth 60fps animations
- **Accessibility**: Screen reader support and keyboard navigation

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Yaswanth1320/wordle.git
   cd wordle
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on your preferred platform**
   ```bash
   # iOS Simulator
   npx expo start --ios
   
   # Android Emulator
   npx expo start --android
   
   # Web Browser
   npx expo start --web
   ```

## 🎯 How to Play

1. **Select Difficulty**: Choose from Easy, Medium, or Hard
2. **Guess the Word**: Type your guess using the on-screen keyboard
3. **Get Feedback**: 
   - 🟩 Green: Letter is correct and in right position
   - 🟨 Yellow: Letter is correct but in wrong position
   - ⬛ Gray: Letter is not in the word
4. **Win or Try Again**: You have 6-8 attempts depending on difficulty

## 🏗️ Project Structure

```
wordle/
├── app/                    # Main app screens
│   ├── _layout.tsx        # Root layout
│   ├── difficulty.jsx     # Difficulty selection screen
│   ├── game.jsx          # Main game screen
│   └── index.jsx         # Home screen
├── components/            # Reusable components
│   ├── DifficultySelector.js
│   ├── Keyboard.js
│   ├── Modals.js
│   ├── WordGrid.js
│   ├── useModals.js
│   └── useWordleGame.js
├── constants/            # Game constants and config
│   └── gameConstants.js
├── services/            # API services
│   └── apiService.js
├── styles/              # Global styles
│   └── globalStyles.js
├── utils/               # Utility functions
│   ├── gameUtils.js
│   └── wordLists.js
└── assets/              # Images and fonts
    └── fonts/
```

## 🛠️ Technologies Used

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **Expo Router**: File-based routing
- **AsyncStorage**: Local data persistence
- **React Native Confetti**: Celebration animations
- **Expo Haptics**: Tactile feedback
- **Michroma Font**: Custom typography

## 🎨 Customization

### Colors
The game uses a consistent color scheme defined in `constants/gameConstants.js`:
- Primary: `#121213` (Dark background)
- Accent: `#4CAF50` (Green for success)
- Error: `#F44336` (Red for errors)
- Difficulty colors: Green (Easy), Yellow (Medium), Red (Hard)

### Fonts
- **Michroma**: Primary game font
- **Space Mono**: Monospace font for technical elements

## 📱 Platform Support

- ✅ iOS (iPhone & iPad)
- ✅ Android (Phone & Tablet)
- ✅ Web (Desktop & Mobile browsers)

## 🔧 Development

### Available Scripts
```bash
npm start          # Start Expo development server
npm run android    # Run on Android emulator
npm run ios        # Run on iOS simulator
npm run web        # Run in web browser
npm run lint       # Run ESLint
```

### Key Components

#### `useWordleGame.js`
Main game logic hook managing:
- Word selection and validation
- Game state management
- Score tracking
- Difficulty handling

#### `Keyboard.js`
On-screen keyboard component with:
- Visual feedback for key states
- Color-coded key backgrounds
- Responsive layout

#### `WordGrid.js`
Game board component featuring:
- Animated tile flips
- Color-coded feedback
- Responsive grid layout

## 🚀 Deployment

### Building for Production

1. **Configure EAS Build**
   ```bash
   npx eas build:configure
   ```

2. **Build for platforms**
   ```bash
   # iOS
   npx eas build --platform ios
   
   # Android
   npx eas build --platform android
   ```

3. **Submit to stores**
   ```bash
   npx eas submit --platform ios
   npx eas submit --platform android
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the original [Wordle](https://www.nytimes.com/games/wordle/index.html) game
- Built with [Expo](https://expo.dev) and [React Native](https://reactnative.dev)
- Icons from [Expo Vector Icons](https://icons.expo.fyi)

---


