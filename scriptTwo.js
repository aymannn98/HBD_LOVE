// CHANGE ONLY THIS PART IF YOU WANT A DIFFERENT NAME OR MORE PHOTOS.
const name = 'Sunshine';

const photos = [
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg',
    '5.jpg',
    '6.jpg',
    '7.jpg',
    '8.jpg',
    '9.jpg',
    '10.jpg',
    '11.jpg',
    '12.jpg',
    '13.jpg',
    '14.jpg',
    '15.jpg',
    '16.jpg',
    '17.jpg',
    '18.jpg',
    '19.jpg',
    '20.jpg',
    '21.jpg',
    '22.jpg',
    '23.jpg',
    '24.jpg',
    '25.jpg',
    '26.jpg',
    '27.jpg',
    '28.jpg'
];

document.querySelector('h1').innerHTML =
    `Happy Birthday,<br>${name}! 🎂`;

const area = document.querySelector('#photoArea');

photos.forEach((file, number) => {

    const photo = document.createElement('img');

    photo.className = 'photo';

    photo.src = `PHOTOS/${file}`;

    photo.alt = `Birthday memory ${number + 1}`;

    photo.style.setProperty(
        '--turn',
        `${[-6, 5, -4, 7, -7, 4][number % 6]}deg`
    );

    photo.style.animationDelay =
        `${1 + number * 6.6}s`;

    photo.onerror = () => {

        const box = document.createElement('div');

        box.className = 'photo missing-photo';

        box.style.setProperty(
            '--turn',
            `${[-6, 5, -4, 7, -7, 4][number % 6]}deg`
        );

        box.style.animationDelay =
            `${1 + number * 6.6}s`;

        box.textContent =
            `Put ${file} inside the PHOTOS folder`;

        photo.replaceWith(box);
    };

    area.append(photo);
});


// ==========================================
// FALLING CONFETTI
// ==========================================

const canvas = document.querySelector('#confetti');
const pen = canvas.getContext('2d');

const bits = Array.from({ length: 70 }, () => ({
    x: Math.random(),
    y: Math.random() - 1,
    size: 3 + Math.random() * 5,
    speed: 1 + Math.random() * 2,
    color: [
        '#ff5794',
        '#fff080',
        '#74d7ff',
        '#a87eea'
    ][Math.floor(Math.random() * 4)]
}));

function confetti() {

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    pen.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    bits.forEach(b => {

        b.y += b.speed / canvas.height;

        if (b.y > 1) {
            b.y = -0.04;
            b.x = Math.random();
        }

        pen.fillStyle = b.color;

        pen.fillRect(
            b.x * canvas.width,
            b.y * canvas.height,
            b.size,
            b.size * 1.6
        );
    });

    requestAnimationFrame(confetti);
}

confetti();
confetti();