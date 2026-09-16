# 🐍 Snake Game

A classic Snake game built with vanilla JavaScript, HTML5 Canvas, and CSS. Play it directly in your browser!

## 🎮 Play Online

[Play the game here](https://yourusername.github.io/snake-game/)

## ✨ Features

- **Classic Gameplay**: Control the snake to eat food and grow longer
- **Wrap-around Walls**: Snake wraps to the opposite side when hitting walls
- **Progressive Difficulty**: Game speed increases as you score more points
- **Score Tracking**: Keeps track of your current score and high score
- **Smooth Controls**: Use Arrow Keys or WASD to control the snake
- **Responsive Design**: Beautiful gradient background with a clean, modern interface

## 🎯 How to Play

1. Open `index.html` in your web browser
2. Use **Arrow Keys** or **WASD** to control the snake's direction
3. Eat the red food to grow longer and increase your score
4. Avoid running into yourself
5. The snake wraps around when it hits the walls
6. Try to beat your high score!

## 🚀 Getting Started

### Play Locally

1. Clone this repository:
```bash
git clone https://github.com/yourusername/snake-game.git
```

2. Navigate to the project directory:
```bash
cd snake-game
```

3. Open `index.html` in your web browser:
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

### Deploy to GitHub Pages

1. Push the code to your GitHub repository
2. Go to your repository settings
3. Navigate to **Pages** section
4. Select the branch (usually `main`) and root folder
5. Save and wait a few minutes for deployment
6. Your game will be available at `https://yourusername.github.io/snake-game/`

## 🛠️ Technologies Used

- HTML5 Canvas for game rendering
- Vanilla JavaScript for game logic
- CSS3 for styling and animations
- No external dependencies required!

## 📝 Game Rules

- Each food eaten gives you **10 points**
- The snake grows by one segment with each food
- Game speed increases slightly with each food eaten
- Game ends only when the snake collides with itself
- High score persists during your browser session

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎨 Customization

You can easily customize the game by modifying the following in `index.html`:

- **Grid Size**: Change `gridSize` variable (default: 20)
- **Canvas Size**: Modify canvas `width` and `height` attributes
- **Colors**: Update the CSS color values or canvas fill styles
- **Initial Speed**: Adjust `gameSpeed` variable (default: 100ms)
- **Score per Food**: Change the score increment value

## 🐛 Known Issues

None at the moment! If you find any bugs, please open an issue.

## 📧 Contact

If you have any questions or suggestions, feel free to reach out!

---

Made with ❤️ using vanilla JavaScript