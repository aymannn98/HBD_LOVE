const photoNames = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg','7.jpg','8.jpg','9.jpg','10.jpg','11.jpg','12.jpg','13.jpg','14.jpg','15.jpg','16.jpg','17.jpg','18.jpg','19.jpg','20.jpg','21.jpg','22.jpg','23.jpg','24.jpg','25.jpg','26.jpg','27.jpg','28.jpg'];
const stage = document.querySelector('#photoStage');
const words = document.querySelector('#words');
const angles = [-6, 5, -4, 7, -7, 4];

// Each photo shows for 3.6 seconds, then the messages appear.
photoNames.forEach((name, index) => {
  const photo = document.createElement('img');
  photo.className = 'memory-photo';
  photo.src = `PHOTOS/${name}`;
  photo.alt = `Memory ${index + 1}`;
  photo.style.setProperty('--angle', `${angles[index]}deg`);
  photo.style.animationDelay = `${index * 3.6}s`;
  photo.onerror = () => {
    const missing = document.createElement('div');
    missing.className = 'memory-photo missing-photo';
    missing.style.setProperty('--angle', `${angles[index]}deg`);
    missing.style.animationDelay = `${index * 3.6}s`;
    missing.textContent = `Put ${name} in the PHOTOS folder`;
    photo.replaceWith(missing);
  };
  stage.append(photo);
});

setTimeout(() => { stage.hidden = true; words.hidden = false; }, photoNames.length * 3600);

const canvas = document.querySelector('#stars');
const ctx = canvas.getContext('2d');
const dots = Array.from({length:85},()=>({x:Math.random(),y:Math.random(),s:1+Math.random()*2.5,v:.08+Math.random()*.25}));
function draw(){canvas.width=innerWidth;canvas.height=innerHeight;ctx.clearRect(0,0,canvas.width,canvas.height);dots.forEach(d=>{d.y-=d.v/100;if(d.y<0){d.y=1;d.x=Math.random()}ctx.fillStyle='rgba(255,211,232,.7)';ctx.fillRect(d.x*canvas.width,d.y*canvas.height,d.s,d.s)});requestAnimationFrame(draw)}draw();
