

const renderFractal = ({ size, sides, maxLevel, scale, spread, branches }) => {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
   
    //Canvas Settings//

    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'purple ';
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';

    const drawBranch = (level) => {
        if (level > maxLevel) return;

        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(size,0);
        ctx.stroke();

        for (let i = 0; i < branches; i++) {
            ctx.save();
            ctx.translate(size-(size/branches)*i,0);
            ctx.rotate(spread);
            ctx.scale(scale,scale);
            drawBranch(level +1);
            ctx.restore();
        
            ctx.save();
            ctx.translate(size-(size/branches)*i,0);
            ctx.rotate(-spread);
            ctx.scale(scale,scale);
            drawBranch(level +1);
            ctx.restore();
        }
    }

    ctx.save();
    ctx.translate(canvas.width/2,canvas.height/2);
    ctx.scale(scale,scale);
    ctx.rotate(0);

    for (let i = 0; i < sides; i++) {
        ctx.rotate((Math.PI * 2)/sides);
        drawBranch(0);
    }

    ctx.restore();
};


const defaultEffects = {
    size: 200,
    sides: 5,
    maxLevel: 3,
    scale: 0.5,
    spread: 0.8,
    branches: 2,
}



window.addEventListener('load', () => {
   
    renderFractal(defaultEffects)
})
