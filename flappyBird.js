class FlappyBird {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvas.width = 400;
        this.canvas.height = 600;
        
        this.bird = {
            x: 100,
            y: 250,
            width: 30,
            height: 30,
            velocity: 0,
            gravity: 0.5,
            jump: -8
        };
        
        this.pipes = [];
        this.pipeWidth = 60;
        this.pipeGap = 150;
        this.pipeSpeed = 2;
        this.frameCount = 0;
        this.score = 0;
        this.gameOver = false;
        
        this.setupControls();
    }

    setupControls() {
        this.handleClick = () => {
            if (!this.gameOver) {
                this.bird.velocity = this.bird.jump;
            }
        };
        
        this.handleKeyPress = (e) => {
            if ((e.code === 'Space' || e.code === 'ArrowUp') && !this.gameOver) {
                e.preventDefault();
                this.bird.velocity = this.bird.jump;
            }
        };
        
        this.canvas.addEventListener('click', this.handleClick);
        document.addEventListener('keydown', this.handleKeyPress);
    }

    reset() {
        this.bird.y = 250;
        this.bird.velocity = 0;
        this.pipes = [];
        this.frameCount = 0;
        this.score = 0;
        this.gameOver = false;
    }

    update() {
        if (this.gameOver) return;
        
        // Update bird
        this.bird.velocity += this.bird.gravity;
        this.bird.y += this.bird.velocity;
        
        // Generate pipes
        this.frameCount++;
        if (this.frameCount % 90 === 0) {
            const pipeHeight = Math.random() * (this.canvas.height - this.pipeGap - 200) + 100;
            this.pipes.push({
                x: this.canvas.width,
                topHeight: pipeHeight,
                scored: false
            });
        }
        
        // Update pipes
        for (let i = this.pipes.length - 1; i >= 0; i--) {
            this.pipes[i].x -= this.pipeSpeed;
            
            // Score
            if (!this.pipes[i].scored && this.pipes[i].x + this.pipeWidth < this.bird.x) {
                this.score++;
                this.pipes[i].scored = true;
                this.updateScoreDisplay();
            }
            
            // Remove off-screen pipes
            if (this.pipes[i].x + this.pipeWidth < 0) {
                this.pipes.splice(i, 1);
            }
        }
        
        // Check collisions
        this.checkCollisions();
    }

    checkCollisions() {
        // Ground and ceiling
        if (this.bird.y + this.bird.height >= this.canvas.height || this.bird.y <= 0) {
            this.gameOver = true;
        }
        
        // Pipes
        for (let pipe of this.pipes) {
            if (this.bird.x + this.bird.width > pipe.x && 
                this.bird.x < pipe.x + this.pipeWidth) {
                if (this.bird.y < pipe.topHeight || 
                    this.bird.y + this.bird.height > pipe.topHeight + this.pipeGap) {
                    this.gameOver = true;
                }
            }
        }
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#87CEEB';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw pipes
        this.ctx.fillStyle = '#228B22';
        for (let pipe of this.pipes) {
            // Top pipe
            this.ctx.fillRect(pipe.x, 0, this.pipeWidth, pipe.topHeight);
            // Bottom pipe
            this.ctx.fillRect(pipe.x, pipe.topHeight + this.pipeGap, 
                this.pipeWidth, this.canvas.height - pipe.topHeight - this.pipeGap);
            
            // Pipe caps
            this.ctx.fillStyle = '#2E8B57';
            this.ctx.fillRect(pipe.x - 5, pipe.topHeight - 20, this.pipeWidth + 10, 20);
            this.ctx.fillRect(pipe.x - 5, pipe.topHeight + this.pipeGap, 
                this.pipeWidth + 10, 20);
            this.ctx.fillStyle = '#228B22';
        }
        
        // Draw bird
        this.ctx.fillStyle = '#FFD700';
        this.ctx.beginPath();
        this.ctx.arc(this.bird.x + 15, this.bird.y + 15, 15, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Bird eye
        this.ctx.fillStyle = '#000';
        this.ctx.beginPath();
        this.ctx.arc(this.bird.x + 20, this.bird.y + 12, 3, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Bird beak
        this.ctx.fillStyle = '#FF8C00';
        this.ctx.beginPath();
        this.ctx.moveTo(this.bird.x + 25, this.bird.y + 15);
        this.ctx.lineTo(this.bird.x + 35, this.bird.y + 15);
        this.ctx.lineTo(this.bird.x + 25, this.bird.y + 20);
        this.ctx.fill();
        
        // Game over text
        if (this.gameOver) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(0, this.canvas.height / 2 - 60, this.canvas.width, 120);
            
            this.ctx.fillStyle = '#FFF';
            this.ctx.font = 'bold 40px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Game Over!', this.canvas.width / 2, this.canvas.height / 2);
            this.ctx.font = '20px Arial';
            this.ctx.fillText(`Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 40);
        }
    }

    updateScoreDisplay() {
        const scoreElement = document.getElementById('gameScore');
        if (scoreElement) {
            scoreElement.textContent = `Score: ${this.score}`;
        }
    }

    cleanup() {
        this.canvas.removeEventListener('click', this.handleClick);
        document.removeEventListener('keydown', this.handleKeyPress);
    }
}
