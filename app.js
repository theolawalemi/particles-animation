// Heading animation
const resolver = {
    resolve(options, callback) {
        const resolveString = options.resolveString || options.element.getAttribute('data-target-heading');
        const combinedOptions = { ...options, resolveString };
        const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const randomCharacter = (characters) => characters[getRandomInteger(0, characters.length - 1)];
        const doRandomiserEffect = (options, callback) => {
            const { characters, timeout, element, partialString, iterations } = options;
            setTimeout(() => {
                if (iterations >= 0) {
                    const nextOptions = { ...options, iterations: iterations - 1 };
                    element.textContent = (iterations === 0) ? partialString : partialString.slice(0, -1) + randomCharacter(characters);
                    doRandomiserEffect(nextOptions, callback);
                } else if (typeof callback === "function") {
                    callback();
                }
            }, timeout);
        };
        const doResolverEffect = (options, callback) => {
            const { resolveString, characters, offset } = options;
            const partialString = resolveString.substring(0, offset);
            const combinedOptions = { ...options, partialString };
            doRandomiserEffect(combinedOptions, () => {
                const nextOptions = { ...options, offset: offset + 1 };
                if (offset <= resolveString.length) {
                    doResolverEffect(nextOptions, callback);
                } else if (typeof callback === "function") {
                    callback();
                }
            });
        };
        doResolverEffect(combinedOptions, callback);
    },
};

const strings = ['Click Anywhere!'];
let counter = 0;
const options = {
    offset: 0,
    timeout: 5,
    iterations: 10,
    characters: 'abcdefghijklmnopqrstuvwxyz#%&-+_/\\='.split(''),
    resolveString: strings[counter],
    element: document.querySelector('[data-target-heading]'),
};
const callback = () => {
    setTimeout(() => {
        counter = (counter + 1) % strings.length;
        const nextOptions = { ...options, resolveString: strings[counter] };
        resolver.resolve(nextOptions, callback);
    }, 10000);
};
resolver.resolve(options, callback);

// Particles animation
const pop = (e) => {
    const amount = 10;
    const x = e.clientX;
    const y = e.clientY;

    for (let i = 0; i < amount; i++) {
        createParticle(x, y);
    }
};

const createParticle = (x, y) => {
    const particle = document.createElement('particle');
    document.body.appendChild(particle);
    // Emoji content
    particle.innerHTML = '🌈';
    particle.style.fontSize = `${Math.random() * 24 + 16}px`;

    // Replace with your SVG path
    // particle.style.backgroundImage = "url('media/rainbow.png')";
    // particle.style.backgroundSize = 'contain';
    // particle.style.backgroundRepeat = 'no-repeat';

    const size = Math.floor(Math.random() * 32 + 8); // Adjust size range
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    const destinationX = x + (Math.random() - 0.5) * 500;
    const destinationY = y + (Math.random() - 0.5) * 500;

    const rotation = Math.random() * 500;
    const delay = Math.random() * 200;

    gsap.fromTo(
        particle,
        {
            x,
            y,
            rotation: 0,
            opacity: 1,
        },
        {
            x: destinationX,
            y: destinationY,
            rotation,
            opacity: 0,
            duration: Math.random() * 4 + 1, // Random duration between 1 and 5 seconds
            ease: 'power4.out',
            delay: delay / 1000, // Convert delay to seconds
            onComplete: () => particle.remove(),
        }
    );
};

if (document.body.animate) {
    document.body.addEventListener('click', pop);
}

// Cursor animation
const cursor = document.getElementById("cursor");
const isCursor = (event) => {
    gsap.to(cursor, {
        duration: 0.2,
        x: event.clientX,
        y: event.clientY,
        ease: "power2.out"
    });
}
window.addEventListener("mousemove", isCursor);
Array.from(document.querySelectorAll(".hover")).forEach(el => {
    el.addEventListener('mouseover', (event) => {
        event.stopPropagation();
        gsap.to(cursor, { 
            duration: 0.2, 
            scale: 4, 
            backgroundColor: "#ffffff", 
            mixBlendMode: "difference",
            ease: "power2.out"
        });
    });
    el.addEventListener('mouseleave', (event) => {
        event.stopPropagation();
        gsap.to(cursor, { 
            duration: 0.2, 
            scale: 1, 
            backgroundColor: "#ffffff", 
            mixBlendMode: "normal",
            ease: "power2.out"
        });
    });
});

// Create an audio object
document.addEventListener("DOMContentLoaded", () => {
    const audioPlayer = new Audio('media/ambient.mp3');
    audioPlayer.loop = true;
    const playAudio = () => {
        audioPlayer.play();
    };
    document.body.addEventListener('click', playAudio);
});