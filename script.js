const canvas = document.querySelector('#canvas');

const sliders = {
    size: document.querySelector('#sliders #size'),
    sides: document.querySelector('#sliders #sides'),
}

const defaultEffects = {
    size: 200,
    sides: 5,
    maxLevel: 3,
    scale: 0.5,
    spread: 0.8,
    branches: 2,
}

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

const getValue = (input) => parseInt(input.value);

const renderFractalFromInput = () => {
    const size = getValue(sliders.size);
    const sides = getValue(sliders.sides);
    
    renderFractal({...defaultEffects, size, sides})
}


window.addEventListener('load',function(){
    renderFractal(defaultEffects)
})


sliders.size.oninput = renderFractalFromInput
sliders.sides.oninput = renderFractalFromInput



