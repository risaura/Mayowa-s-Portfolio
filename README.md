# Game Portfolio

A digital interactive portfolio featuring a 2D character and three playable mini-games.

## Files Included

- `index.html` - Main HTML structure
- `styles.css` - All styling and modal designs
- `character.js` - Character, scene, and wooden sign classes
- `main.js` - Main application controller and event handlers
- `flappyBird.js` - Flappy Bird game implementation
- `snake.js` - Snake game implementation
- `pong.js` - Pong game implementation

## Setup Instructions

1. Create a new folder on your computer for the portfolio
2. Place all the files in the same folder
3. Open `index.html` in a web browser (Chrome, Firefox, Safari, or Edge)

That's it! No server or additional setup needed.

## How to Use

### Main Portfolio Screen
- You'll see a 2D character in the center of the screen
- Two wooden signs appear at the top:
  - **"About Me"** - Click to view information about the developer
  - **"Games"** - Click to see the list of available games

### Playing Games

**Flappy Bird**
- Click or press SPACE to make the bird flap
- Avoid the green pipes
- Score points by passing through gaps

**Snake**
- Use arrow keys (↑↓←→) to control the snake
- Eat red apples to grow and score points
- Don't hit the walls or yourself!

**Pong**
- Use ↑↓ arrow keys or W/S keys to move your paddle
- First to score 5 points wins
- The AI opponent will try to beat you!

## Customization

### Edit About Me Section
Open `index.html` and find the "About Me Modal" section (around line 14-20). Edit the paragraph text to customize your bio.

### Change Colors
Open `styles.css` to modify:
- Background gradients
- Button colors
- Modal styling
- Canvas background colors

### Adjust Game Difficulty
- **Flappy Bird**: In `flappyBird.js`, change `this.pipeSpeed` (line 21) or `this.bird.jump` (line 18)
- **Snake**: In `snake.js`, change `this.speed` (line 25)
- **Pong**: In `pong.js`, change `this.ai.speed` (line 33) or `this.winScore` (line 44)

## Browser Compatibility

Works in all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Features

✨ Fully responsive canvas-based graphics
🎮 Three complete mini-games
🎨 Smooth animations and transitions
📱 Clean modal-based UI
🎯 Score tracking for all games

## Tips for Visual Studio Code

1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. The portfolio will open in your browser with auto-reload on save

Enjoy your game portfolio!
