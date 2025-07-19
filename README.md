# Wordle React Native App

A production-level Wordle game built with React Native, featuring a clean architecture and modern development practices.

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── WordGrid.js     # Game board component
│   ├── Keyboard.js     # Virtual keyboard component
│   └── Modals.js       # Modal components
├── constants/          # Application constants
│   └── gameConstants.js # Game configuration and constants
├── hooks/              # Custom React hooks
│   ├── useWordleGame.js # Main game logic hook
│   └── useModals.js    # Modal state management hook
├── services/           # API and external services
│   └── apiService.js   # API calls and data fetching
├── styles/             # Global styles and theming
│   └── globalStyles.js # Application-wide styles
├── utils/              # Utility functions
│   └── gameUtils.js    # Game logic utilities
└── App.js              # Main application component
```

## 🚀 Features

### Core Game Features
- ✅ **Wordle Gameplay**: Complete Wordle game with 6 attempts
- ✅ **Word Validation**: Dictionary API integration for word validation
- ✅ **Color Feedback**: Green/Yellow/Gray color system
- ✅ **Keyboard Integration**: Virtual keyboard with color feedback
- ✅ **Game Over Handling**: Shows correct answer after 6 tries

### User Experience
- ✅ **Quick Invalid Word Modal**: Auto-dismissing modal for invalid words
- ✅ **Game Over Modal**: Shows correct answer with reset option
- ✅ **Responsive Design**: Works on different screen sizes
- ✅ **Loading States**: Proper loading indicators
- ✅ **Error Handling**: Comprehensive error management

### Technical Features
- ✅ **Clean Architecture**: Separation of concerns with hooks, services, and utilities
- ✅ **Type Safety**: JSDoc comments for better development experience
- ✅ **Performance Optimized**: Efficient re-renders and state management
- ✅ **Modular Design**: Reusable components and utilities
- ✅ **API Integration**: Wordle API and Dictionary API

## 🛠️ Technologies Used

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **Custom Hooks**: State management and business logic
- **API Integration**: Wordle API and Dictionary API
- **Modern JavaScript**: ES6+ features and async/await

## 📱 Installation & Setup

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
   npm start
   ```

4. **Run on device/simulator**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## 🎮 How to Play

1. **Start the Game**: The app loads with a random 5-letter word
2. **Make Guesses**: Type 5-letter words using the virtual keyboard
3. **Get Feedback**: 
   - 🟩 Green: Letter is in correct position
   - 🟨 Yellow: Letter is in word but wrong position
   - ⬛ Gray: Letter is not in word
4. **Win or Lose**: 
   - Win by guessing the word in 6 tries or less
   - Lose after 6 incorrect guesses

## 🔧 Configuration

### Game Constants (`src/constants/gameConstants.js`)
- `MAX_ATTEMPTS`: Number of allowed guesses (6)
- `WORD_LENGTH`: Length of target word (5)
- `ANIMATION_DELAYS`: Timing for animations
- `API_ENDPOINTS`: API URLs for word validation

### Colors (`src/constants/gameConstants.js`)
- `GREEN`: Correct letter, correct position
- `YELLOW`: Correct letter, wrong position
- `LIGHT_BLACK`: Letter not in word
- `WHITE`: Default keyboard color

## 🏗️ Architecture Overview

### Custom Hooks
- **`useWordleGame`**: Manages game state, API calls, and game logic
- **`useModals`**: Handles modal visibility and animations

### Services
- **`apiService`**: Handles all external API calls
  - Word validation via Dictionary API
  - Game submission via Wordle API
  - Answer discovery for game over

### Utilities
- **`gameUtils`**: Pure functions for game logic
  - Color calculations
  - Word validation
  - State management helpers

### Components
- **`WordGrid`**: Renders the game board with guesses
- **`Keyboard`**: Virtual keyboard with color feedback
- **`Modals`**: Various modal components for user feedback

## 🔌 API Integration

### Wordle API
- **Endpoint**: `https://wordle-api.vercel.app/api/wordle`
- **Method**: POST
- **Purpose**: Submit guesses and get character feedback

### Dictionary API
- **Endpoint**: `https://api.dictionaryapi.dev/api/v2/entries/en/{word}`
- **Method**: GET
- **Purpose**: Validate if words exist in English dictionary

## 🎨 Styling

The app uses a centralized styling system with:
- **Global Styles**: Consistent design tokens
- **Color Constants**: Centralized color management
- **Responsive Design**: Adapts to different screen sizes
- **Dark Theme**: Optimized for dark mode

## 🧪 Development

### Adding New Features
1. Create new components in `src/components/`
2. Add utilities in `src/utils/`
3. Update constants in `src/constants/`
4. Add styles in `src/styles/`

### Testing
- Console logs for debugging game state
- API response logging
- Error boundary handling

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or issues, please open an issue in the repository. 
