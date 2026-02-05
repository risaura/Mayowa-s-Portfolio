class SceneManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.cameraX = 0;
        this.worldWidth = 3000;
        this.time = 0;
        this.isNightTime = false;
        
        // Toggle day/night every 30 seconds
        setInterval(() => {
            this.isNightTime = !this.isNightTime;
        }, 30000);
        
        this.sections = {
            center: { x: 0, width: 1200, name: 'Home' },
            aboutMe: { x: -1200, width: 1200, name: 'About Me' },
            games: { x: 1200, width: 1800, name: 'Games' }
        };
        
        this.currentSection = 'center';
    }

    moveCamera(dx) {
        this.cameraX += dx;
        this.cameraX = Math.max(-1200, Math.min(1800, this.cameraX));
        
        const characterWorldX = this.cameraX;
        
        if (characterWorldX < 0) {
            if (this.currentSection !== 'aboutMe') {
                this.currentSection = 'aboutMe';
                this.onSectionEnter('aboutMe');
            }
        } else if (characterWorldX < 1200) {
            if (this.currentSection !== 'center') {
                this.currentSection = 'center';
                this.onSectionEnter('center');
            }
        } else {
            if (this.currentSection !== 'games') {
                this.currentSection = 'games';
                this.onSectionEnter('games');
            }
        }
    }

    onSectionEnter(section) {
        console.log('Entered section:', section);
        const indicator = document.getElementById('sectionIndicator');
        if (indicator) {
            indicator.textContent = this.sections[section].name;
            indicator.classList.remove('hidden');
            indicator.classList.add('show');
        }
    }

    drawBackground() {
        this.time += 0.01;
        
        // Room walls
        const wallColor = this.isNightTime ? '#3a4a5a' : '#e8dcc8';
        this.ctx.fillStyle = wallColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Floor (wooden)
        const floorY = this.canvas.height - 200;
        const floorGradient = this.ctx.createLinearGradient(0, floorY, 0, this.canvas.height);
        floorGradient.addColorStop(0, this.isNightTime ? '#4a3626' : '#8B6F47');
        floorGradient.addColorStop(1, this.isNightTime ? '#3a2616' : '#6B5437');
        this.ctx.fillStyle = floorGradient;
        this.ctx.fillRect(0, floorY, this.canvas.width, 200);
        
        // Wood planks
        this.ctx.strokeStyle = this.isNightTime ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)';
        this.ctx.lineWidth = 2;
        for (let i = 0; i < this.canvas.height; i += 40) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, floorY + i);
            this.ctx.lineTo(this.canvas.width, floorY + i);
            this.ctx.stroke();
        }
        
        // Window (large)
        const windowX = this.canvas.width - 350;
        const windowY = 80;
        const windowWidth = 300;
        const windowHeight = 400;
        
        // Window frame
        this.ctx.fillStyle = '#3a3a3a';
        this.ctx.fillRect(windowX - 10, windowY - 10, windowWidth + 20, windowHeight + 20);
        
        // Window panes - day or night
        if (this.isNightTime) {
            // Night sky
            const nightGradient = this.ctx.createLinearGradient(windowX, windowY, windowX, windowY + windowHeight);
            nightGradient.addColorStop(0, '#0a0a2e');
            nightGradient.addColorStop(1, '#1a1a3e');
            this.ctx.fillStyle = nightGradient;
            this.ctx.fillRect(windowX, windowY, windowWidth, windowHeight);
            
            // Stars
            this.ctx.fillStyle = '#ffffff';
            for (let i = 0; i < 20; i++) {
                const starX = windowX + (i * 37) % windowWidth;
                const starY = windowY + (i * 51) % windowHeight;
                this.ctx.fillRect(starX, starY, 2, 2);
            }
            
            // Moon
            this.ctx.fillStyle = '#f0f0d0';
            this.ctx.beginPath();
            this.ctx.arc(windowX + windowWidth - 80, windowY + 80, 40, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Moon craters
            this.ctx.fillStyle = '#d0d0b0';
            this.ctx.beginPath();
            this.ctx.arc(windowX + windowWidth - 70, windowY + 75, 8, 0, Math.PI * 2);
            this.ctx.arc(windowX + windowWidth - 90, windowY + 85, 6, 0, Math.PI * 2);
            this.ctx.fill();
        } else {
            // Day sky
            const skyGradient = this.ctx.createLinearGradient(windowX, windowY, windowX, windowY + windowHeight);
            skyGradient.addColorStop(0, '#87CEEB');
            skyGradient.addColorStop(1, '#B0E2FF');
            this.ctx.fillStyle = skyGradient;
            this.ctx.fillRect(windowX, windowY, windowWidth, windowHeight);
            
            // Sun
            this.ctx.fillStyle = '#FFD700';
            this.ctx.beginPath();
            this.ctx.arc(windowX + 80, windowY + 100, 50, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Clouds
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            this.ctx.beginPath();
            this.ctx.arc(windowX + 150, windowY + 200, 40, 0, Math.PI * 2);
            this.ctx.arc(windowX + 180, windowY + 200, 35, 0, Math.PI * 2);
            this.ctx.arc(windowX + 210, windowY + 200, 40, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        // Window cross bars
        this.ctx.strokeStyle = '#3a3a3a';
        this.ctx.lineWidth = 8;
        this.ctx.beginPath();
        this.ctx.moveTo(windowX + windowWidth / 2, windowY);
        this.ctx.lineTo(windowX + windowWidth / 2, windowY + windowHeight);
        this.ctx.moveTo(windowX, windowY + windowHeight / 2);
        this.ctx.lineTo(windowX + windowWidth, windowY + windowHeight / 2);
        this.ctx.stroke();
        
        // Bed in background
        const bedX = 50;
        const bedY = this.canvas.height - 350;
        
        // Bed frame
        this.ctx.fillStyle = '#5a3a1a';
        this.ctx.fillRect(bedX, bedY + 80, 200, 20);
        
        // Mattress
        this.ctx.fillStyle = '#4a7ba7';
        this.ctx.fillRect(bedX, bedY, 200, 80);
        
        // Pillow
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(bedX + 20, bedY + 10, 50, 30);
        
        // Blanket
        this.ctx.fillStyle = '#8b4789';
        this.ctx.fillRect(bedX + 70, bedY + 30, 120, 50);
        
        // Bean bag
        const beanBagX = this.canvas.width / 2 - 100;
        const beanBagY = this.canvas.height - 280;
        
        this.ctx.fillStyle = '#d35400';
        this.ctx.beginPath();
        this.ctx.ellipse(beanBagX, beanBagY, 80, 60, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.fillStyle = '#e67e22';
        this.ctx.beginPath();
        this.ctx.ellipse(beanBagX, beanBagY - 10, 70, 50, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Candles (with flickering flame)
        this.drawCandle(150, this.canvas.height - 380);
        this.drawCandle(this.canvas.width - 450, 200);
    }

    drawCandle(x, y) {
        // Candle body
        this.ctx.fillStyle = '#f4e4c1';
        this.ctx.fillRect(x, y, 15, 40);
        
        // Wick
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(x + 7.5, y);
        this.ctx.lineTo(x + 7.5, y - 5);
        this.ctx.stroke();
        
        // Flame (flickering)
        const flicker = Math.sin(this.time * 10) * 2;
        const flameGradient = this.ctx.createRadialGradient(x + 7.5, y - 10, 0, x + 7.5, y - 10, 15);
        flameGradient.addColorStop(0, '#ffff00');
        flameGradient.addColorStop(0.5, '#ff9900');
        flameGradient.addColorStop(1, 'rgba(255, 69, 0, 0)');
        
        this.ctx.fillStyle = flameGradient;
        this.ctx.beginPath();
        this.ctx.ellipse(x + 7.5, y - 10 + flicker, 8, 12, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Glow
        if (!this.isNightTime) return;
        this.ctx.fillStyle = 'rgba(255, 200, 100, 0.1)';
        this.ctx.beginPath();
        this.ctx.arc(x + 7.5, y - 10, 50, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawSections() {
        this.ctx.save();
        
        // Floating sign that follows camera
        this.drawFloatingSign();
        
        this.drawCenterSection();
        this.drawAboutMeSection();
        this.drawGamesSection();
        this.ctx.restore();
    }

    drawFloatingSign() {
        // Sign always at top center of screen
        const signX = this.canvas.width / 2 - 200;
        const signY = 30;
        
        this.ctx.fillStyle = 'rgba(139, 69, 19, 0.95)';
        this.ctx.fillRect(signX, signY, 400, 60);
        
        this.ctx.strokeStyle = '#5a3a1a';
        this.ctx.lineWidth = 4;
        this.ctx.strokeRect(signX, signY, 400, 60);
        
        this.ctx.fillStyle = '#FFD700';
        this.ctx.font = 'bold 24px Poppins';
        this.ctx.textAlign = 'center';
        this.ctx.fillText("Mayowa's Room", signX + 200, signY + 35);
        
        this.ctx.fillStyle = '#FFF';
        this.ctx.font = '14px Poppins';
        this.ctx.fillText("← About Me | Games →", signX + 200, signY + 52);
    }

    drawCenterSection() {
        const sectionX = this.sections.center.x - this.cameraX;
        
        if (sectionX > -this.sections.center.width && sectionX < this.canvas.width) {
            // Just character alone in center - no signs needed
        }
    }

    drawAboutMeSection() {
        const sectionX = this.sections.aboutMe.x - this.cameraX;
        
        if (sectionX > -this.sections.aboutMe.width && sectionX < this.canvas.width) {
            // Clean white panel
            const panelWidth = 700;
            const panelHeight = this.canvas.height - 280;
            const panelX = this.canvas.width / 2 - panelWidth / 2;
            const panelY = 110;
            
            // Shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            this.ctx.fillRect(panelX + 5, panelY + 5, panelWidth, panelHeight);
            
            // White background
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillRect(panelX, panelY, panelWidth, panelHeight);
            
            // Border
            this.ctx.strokeStyle = '#667eea';
            this.ctx.lineWidth = 3;
            this.ctx.strokeRect(panelX, panelY, panelWidth, panelHeight);
            
            // Title
            this.ctx.fillStyle = '#667eea';
            this.ctx.font = 'bold 36px Poppins';
            this.ctx.textAlign = 'center';
            this.ctx.fillText("Welcome to Mayowa's Home!", panelX + panelWidth / 2, panelY + 50);
            
            this.ctx.font = 'bold 24px Poppins';
            this.ctx.fillText('About Me', panelX + panelWidth / 2, panelY + 85);
            
            // Content
            this.ctx.fillStyle = '#333';
            this.ctx.font = '16px Poppins';
            this.ctx.textAlign = 'left';
            const lines = [
                'Hello, my name is Mayowa. I am 17 years old and I am from Avon, Indiana.',
                'I am interested in all things Medicine, Computer Science, Web Game',
                'Development and Engineering. These are my projects that I\'ve developed',
                'over some time. Feel free to play and let me know what you think!',
                '',
                'I recreated classic games to play, but added my own mini-twists to them,',
                'because my school banned all websites that had these games, but since',
                'it is my website, it is not on the registry.',
                '',
                'FOR ROBLOX USERS (Update): The game is coming together, I plan to',
                'release everything by May 2026. Due to college applications, I haven\'t',
                'been able to put much time into finishing the games. I am a one man',
                'operation and it will take some time. I am sorry for the delay and hope',
                'to post some more updates soon.'
            ];
            
            lines.forEach((line, i) => {
                this.ctx.fillText(line, panelX + 30, panelY + 125 + i * 24);
            });
            
            // Contact button
            const btnX = panelX + panelWidth / 2 - 120;
            const btnY = panelY + panelHeight - 50;
            const btnWidth = 240;
            const btnHeight = 40;
            
            this.ctx.fillStyle = '#667eea';
            this.ctx.fillRect(btnX, btnY, btnWidth, btnHeight);
            this.ctx.strokeStyle = '#764ba2';
            this.ctx.lineWidth = 3;
            this.ctx.strokeRect(btnX, btnY, btnWidth, btnHeight);
            
            this.ctx.fillStyle = '#FFF';
            this.ctx.font = 'bold 16px Poppins';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('📧 Send Me a Message', btnX + btnWidth / 2, btnY + 25);
            
            window.contactButton = {
                x: btnX,
                y: btnY,
                width: btnWidth,
                height: btnHeight
            };
        }
    }

    drawGamesSection() {
        const sectionX = this.sections.games.x - this.cameraX;
        
        if (sectionX > -this.sections.games.width && sectionX < this.canvas.width) {
            // Clean white panel for games
            const panelWidth = Math.min(900, this.canvas.width - 100);
            const panelHeight = this.canvas.height - 280;
            const panelX = this.canvas.width / 2 - panelWidth / 2;
            const panelY = 110;
            
            // Shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            this.ctx.fillRect(panelX + 5, panelY + 5, panelWidth, panelHeight);
            
            // White background
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillRect(panelX, panelY, panelWidth, panelHeight);
            
            // Border
            this.ctx.strokeStyle = '#667eea';
            this.ctx.lineWidth = 3;
            this.ctx.strokeRect(panelX, panelY, panelWidth, panelHeight);
            
            // Title
            this.ctx.fillStyle = '#667eea';
            this.ctx.font = 'bold 36px Poppins';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('My Games', panelX + panelWidth / 2, panelY + 50);
            
            const games = [
                { name: 'Flappy Bird', icon: '🐦', color: '#87CEEB' },
                { name: 'Panda', icon: '🐼', color: '#90EE90' },
                { name: 'Pong', icon: '🏓', color: '#FFB6C1' },
                { name: 'Pong 2P', icon: '🏓', color: '#DDA0DD' },
                { name: 'Snake Race', icon: '🐍', color: '#98FB98' }
            ];
            
            const cardWidth = 240;
            const cardHeight = 180;
            const gap = 30;
            const startX = panelX + 50;
            const startY = panelY + 90;
            
            window.gameCards = [];
            
            games.forEach((game, index) => {
                const col = index % 3;
                const row = Math.floor(index / 3);
                const x = startX + col * (cardWidth + gap);
                const y = startY + row * (cardHeight + gap);
                
                // Card shadow
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
                this.ctx.fillRect(x + 3, y + 3, cardWidth, cardHeight);
                
                // Card background
                this.ctx.fillStyle = '#f8f9fa';
                this.ctx.fillRect(x, y, cardWidth, cardHeight);
                
                // Thumbnail
                this.ctx.fillStyle = game.color;
                this.ctx.fillRect(x, y, cardWidth, 120);
                
                // Icon
                this.ctx.font = '60px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(game.icon, x + cardWidth / 2, y + 75);
                
                // Title
                this.ctx.fillStyle = '#333';
                this.ctx.font = 'bold 18px Poppins';
                this.ctx.fillText(game.name, x + cardWidth / 2, y + 145);
                
                // Subtitle
                this.ctx.fillStyle = '#666';
                this.ctx.font = '14px Poppins';
                this.ctx.fillText('Click to play', x + cardWidth / 2, y + 165);
                
                // Border
                this.ctx.strokeStyle = '#ddd';
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(x, y, cardWidth, cardHeight);
                
                window.gameCards[index] = {
                    x: x,
                    y: y,
                    width: cardWidth,
                    height: cardHeight,
                    game: game.name
                };
            });
        }
    }
}

class Character {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = canvas.width / 2;
        this.y = canvas.height - 250;
        this.height = 120;
        this.width = 50;
        this.frame = 0;
        this.frameCount = 0;
        this.isWalking = false;
        this.facingRight = true;
        this.walkSpeed = 6;
        this.velocity = 0;
        this.waveFrame = 0;
        this.isWaving = true;
        
        this.phrases = [
            "Hi! Welcome to my room! 👋",
            "Use Arrow Keys to explore!",
            "Check out my projects!",
            "Move around!",
            "Games to the right!",
            "About me to the left!"
        ];
        
        this.setupControls();
        
        setTimeout(() => {
            this.isWaving = false;
        }, 3000);
    }

    setupControls() {
        this.keys = {};
        
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            this.isWaving = false;
            if(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space'].includes(e.code)) {
                e.preventDefault();
            }
        });
        
        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });

        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = (e.clientX - rect.left) * (this.canvas.width / rect.width);
            const mouseY = (e.clientY - rect.top) * (this.canvas.height / rect.height);
            
            if (this.isPointInCharacter(mouseX, mouseY)) {
                this.onCharacterClick();
            }
        });
    }

    isPointInCharacter(x, y) {
        return x >= this.x - this.width / 2 && x <= this.x + this.width / 2 && 
               y >= this.y - this.height && y <= this.y;
    }

    onCharacterClick() {
        if (window.achievementSystem) {
            achievementSystem.unlock('first_click');
        }
        if (window.audioManager) {
            audioManager.play('click');
        }
        this.showSpeech(this.phrases[Math.floor(Math.random() * this.phrases.length)]);
        if (this.velocity === 0) {
            this.velocity = -15;
        }
        this.isWaving = true;
        setTimeout(() => {
            this.isWaving = false;
        }, 2000);
    }

    showSpeech(text) {
        const bubble = document.getElementById('speechBubble');
        const speechText = document.getElementById('speechText');
        
        if (!bubble || !speechText) return;
        
        speechText.textContent = text;
        bubble.classList.remove('hidden');
        
        bubble.style.left = this.x + 'px';
        bubble.style.top = (this.y - 150) + 'px';
        
        setTimeout(() => {
            bubble.classList.add('hidden');
        }, 2500);
    }

    update() {
        this.isWalking = false;
        
        if (this.keys['ArrowLeft'] || this.keys['KeyA']) {
            this.facingRight = false;
            this.isWalking = true;
            if (window.sceneManager) {
                sceneManager.moveCamera(-this.walkSpeed);
            }
        }
        
        if (this.keys['ArrowRight'] || this.keys['KeyD']) {
            this.facingRight = true;
            this.isWalking = true;
            if (window.sceneManager) {
                sceneManager.moveCamera(this.walkSpeed);
            }
        }
        
        if ((this.keys['ArrowUp'] || this.keys['KeyW'] || this.keys['Space']) && this.velocity === 0) {
            this.velocity = -15;
        }
        
        this.velocity += 0.6;
        this.y += this.velocity;
        
        const groundY = this.canvas.height - 250;
        if (this.y >= groundY) {
            this.y = groundY;
            this.velocity = 0;
        }
        
        if (this.isWalking) {
            this.frameCount++;
            if (this.frameCount % 8 === 0) {
                this.frame = (this.frame + 1) % 2;
            }
        } else {
            this.frameCount = 0;
        }
        
        if (this.isWaving) {
            this.waveFrame++;
        }
    }

    draw() {
        this.ctx.save();
        
        const scale = 1;
        const baseX = this.x;
        const baseY = this.y;
        
        if (!this.facingRight) {
            this.ctx.translate(baseX * 2, 0);
            this.ctx.scale(-1, 1);
        }
        
        // Shadow
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.beginPath();
        this.ctx.ellipse(baseX, baseY + 5, 25, 8, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // REALISTIC PROPORTIONS - Taller character
        const legMove = this.isWalking ? (this.frame === 0 ? -3 : 3) : 0;
        
        // Legs (jeans - blue)
        this.ctx.fillStyle = '#4A90E2';
        this.ctx.fillRect(baseX - 12, baseY - 50, 10, 45);
        this.ctx.fillRect(baseX + 2, baseY - 50 + legMove, 10, 45 - Math.abs(legMove));
        
        // Shoes (white sneakers)
        this.ctx.fillStyle = '#f5f5f5';
        this.ctx.fillRect(baseX - 15, baseY - 5, 14, 8);
        this.ctx.fillRect(baseX + 2, baseY - 5 + legMove, 14, 8);
        
        // Shoe soles
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(baseX - 15, baseY + 3, 14, 2);
        this.ctx.fillRect(baseX + 2, baseY + 3 + legMove, 14, 2);
        
        // Torso (blue shirt/hoodie)
        this.ctx.fillStyle = '#2E5090';
        this.ctx.fillRect(baseX - 18, baseY - 95, 36, 45);
        
        // Hoodie pocket
        this.ctx.strokeStyle = '#1a3a6a';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(baseX - 12, baseY - 75, 24, 15);
        
        // Neck
        this.ctx.fillStyle = '#C49A6C';
        this.ctx.fillRect(baseX - 8, baseY - 100, 16, 8);
        
        // Arms
        this.ctx.fillStyle = '#2E5090';
        
        if (this.isWaving) {
            // Waving right arm
            const waveAngle = Math.sin(this.waveFrame * 0.2) * 30;
            this.ctx.save();
            this.ctx.translate(baseX + 18, baseY - 90);
            this.ctx.rotate((waveAngle - 45) * Math.PI / 180);
            this.ctx.fillRect(0, 0, 10, 35);
            // Hand
            this.ctx.fillStyle = '#C49A6C';
            this.ctx.fillRect(0, 32, 10, 12);
            this.ctx.restore();
            
            // Left arm
            this.ctx.fillStyle = '#2E5090';
            this.ctx.fillRect(baseX - 28, baseY - 90, 10, 35);
            this.ctx.fillStyle = '#C49A6C';
            this.ctx.fillRect(baseX - 28, baseY - 58, 10, 12);
        } else {
            const armSwing = this.isWalking ? (this.frame === 0 ? 3 : -3) : 0;
            // Arms
            this.ctx.fillRect(baseX - 28, baseY - 90 + armSwing, 10, 35);
            this.ctx.fillRect(baseX + 18, baseY - 90 - armSwing, 10, 35);
            
            // Hands
            this.ctx.fillStyle = '#C49A6C';
            this.ctx.fillRect(baseX - 28, baseY - 58 + armSwing, 10, 12);
            this.ctx.fillRect(baseX + 18, baseY - 58 - armSwing, 10, 12);
        }
        
        // Head (realistic proportions)
        this.ctx.fillStyle = '#8B5A3C';
        this.ctx.beginPath();
        this.ctx.ellipse(baseX, baseY - 110, 16, 18, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Hair (afro - larger and more detailed)
        this.ctx.fillStyle = '#000';
        this.ctx.beginPath();
        this.ctx.ellipse(baseX, baseY - 115, 22, 20, 0, Math.PI, 0);
        this.ctx.fill();
        
        // Hair sides
        this.ctx.beginPath();
        this.ctx.ellipse(baseX - 18, baseY - 110, 14, 16, 0, 0, Math.PI * 2);
        this.ctx.ellipse(baseX + 18, baseY - 110, 14, 16, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Eyes (more realistic)
        this.ctx.fillStyle = '#FFF';
        this.ctx.beginPath();
        this.ctx.ellipse(baseX - 6, baseY - 112, 3, 4, 0, 0, Math.PI * 2);
        this.ctx.ellipse(baseX + 6, baseY - 112, 3, 4, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Pupils
        this.ctx.fillStyle = '#2a1a0a';
        this.ctx.beginPath();
        const pupilX = this.facingRight ? 1 : -1;
        this.ctx.ellipse(baseX - 6 + pupilX, baseY - 112, 2, 3, 0, 0, Math.PI * 2);
        this.ctx.ellipse(baseX + 6 + pupilX, baseY - 112, 2, 3, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Nose
        this.ctx.fillStyle = '#6B4423';
        this.ctx.fillRect(baseX + 2, baseY - 108, 3, 6);
        
        // Smile
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(baseX, baseY - 103, 8, 0.2, Math.PI - 0.2);
        this.ctx.stroke();
        
        this.ctx.restore();
    }
}
