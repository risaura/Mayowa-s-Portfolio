class Character {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = canvas.width / 2;
        this.y = canvas.height - 150;
        this.width = 60;
        this.height = 80;
        this.frame = 0;
        this.frameCount = 0;
        this.idleAnimation = true;
    }

    update() {
        // Simple idle animation
        this.frameCount++;
        if (this.frameCount % 30 === 0) {
            this.frame = (this.frame + 1) % 2;
        }
    }

    draw() {
        this.ctx.save();
        
        // Character body
        const bounceY = this.frame === 0 ? 0 : -5;
        
        // Shadow
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        this.ctx.ellipse(this.x, this.y + this.height, 25, 8, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Body
        this.ctx.fillStyle = '#4CAF50';
        this.ctx.fillRect(this.x - 20, this.y - 40 + bounceY, 40, 50);
        
        // Head
        this.ctx.fillStyle = '#FFD700';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y - 55 + bounceY, 20, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Eyes
        this.ctx.fillStyle = '#000';
        this.ctx.beginPath();
        this.ctx.arc(this.x - 8, this.y - 58 + bounceY, 3, 0, Math.PI * 2);
        this.ctx.arc(this.x + 8, this.y - 58 + bounceY, 3, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Smile
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y - 52 + bounceY, 10, 0, Math.PI);
        this.ctx.stroke();
        
        // Arms
        this.ctx.fillStyle = '#4CAF50';
        this.ctx.fillRect(this.x - 30, this.y - 35 + bounceY, 10, 30);
        this.ctx.fillRect(this.x + 20, this.y - 35 + bounceY, 10, 30);
        
        // Legs
        this.ctx.fillStyle = '#2E7D32';
        this.ctx.fillRect(this.x - 15, this.y + 10 + bounceY, 12, 25);
        this.ctx.fillRect(this.x + 3, this.y + 10 + bounceY, 12, 25);
        
        this.ctx.restore();
    }
}

class WoodenSign {
    constructor(x, y, text, callback) {
        this.x = x;
        this.y = y;
        this.width = 150;
        this.height = 60;
        this.text = text;
        this.callback = callback;
        this.hovered = false;
    }

    isMouseOver(mouseX, mouseY) {
        return mouseX >= this.x && 
               mouseX <= this.x + this.width && 
               mouseY >= this.y && 
               mouseY <= this.y + this.height;
    }

    draw(ctx) {
        ctx.save();
        
        // Chain
        ctx.strokeStyle = '#4A4A4A';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y - 20);
        ctx.lineTo(this.x + this.width / 2, this.y);
        ctx.stroke();
        
        // Sign post
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Wood texture (darker stripes)
        ctx.fillStyle = '#654321';
        ctx.fillRect(this.x, this.y + 10, this.width, 3);
        ctx.fillRect(this.x, this.y + 30, this.width, 3);
        ctx.fillRect(this.x, this.y + 50, this.width, 3);
        
        // Border
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 4;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        
        // Hover effect
        if (this.hovered) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        
        // Text
        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
        
        // Text shadow for depth
        ctx.fillStyle = '#000';
        ctx.globalAlpha = 0.3;
        ctx.fillText(this.text, this.x + this.width / 2 + 2, this.y + this.height / 2 + 2);
        
        ctx.restore();
    }
}

class Scene {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    drawGround() {
        // Grass
        this.ctx.fillStyle = '#90EE90';
        this.ctx.fillRect(0, this.canvas.height - 100, this.canvas.width, 100);
        
        // Grass details
        this.ctx.fillStyle = '#7CCD7C';
        for (let i = 0; i < this.canvas.width; i += 20) {
            this.ctx.fillRect(i, this.canvas.height - 100, 10, 5);
            this.ctx.fillRect(i + 5, this.canvas.height - 95, 8, 5);
        }
    }

    drawSky() {
        // Sky gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height - 100);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#98D8E8');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height - 100);
        
        // Clouds
        this.drawCloud(100, 80);
        this.drawCloud(400, 120);
        this.drawCloud(700, 60);
    }

    drawCloud(x, y) {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this.ctx.beginPath();
        this.ctx.arc(x, y, 25, 0, Math.PI * 2);
        this.ctx.arc(x + 25, y, 30, 0, Math.PI * 2);
        this.ctx.arc(x + 50, y, 25, 0, Math.PI * 2);
        this.ctx.fill();
    }
}
