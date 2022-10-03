window.game = {
    // CARDS_QUANTITY: '',
    DIFFICULT: '',
    GAME_STATUS: 'CHOOSE_DIFFICULT',
    // наверное надо запилить колоду карт в отдельный ЖС файл с массивом DECK_CARDS а то преттир заёп
    DECK_CARDS: [
        'spades_ace',
        'spades_king',
        'spades_queen',
        'spades_jack',
        'spades_ten',
        'spades_nine',
        'spades_eight',
        'spades_seven',
        'spades_six',
        'diamonds_ace',
        'diamonds_king',
        'diamonds_queen',
        'diamonds_jack',
        'diamonds_ten',
        'diamonds_nine',
        'diamonds_eight',
        'diamonds_seven',
        'diamonds_six',
        'clubs_ace',
        'clubs_king',
        'clubs_queen',
        'clubs_jack',
        'clubs_ten',
        'clubs_nine',
        'clubs_eight',
        'clubs_seven',
        'clubs_six',
        'hearts_ace',
        'hearts_king',
        'hearts_queen',
        'hearts_jack',
        'hearts_ten',
        'hearts_nine',
        'hearts_eight',
        'hearts_seven',
        'hearts_six',
    ],
    RANDOM_CARDS: [],
};

// let firctCard, secondCard;

const screenDifficult = document.querySelector('.screen-difficult');
const blockDifficult = screenDifficult.querySelector('.difficult');
const buttonStart = blockDifficult.querySelector('.difficult__button-start');

const screenPlay = document.querySelector('.screen-play');
// const btnStartAgain = screenPlay.querySelector('.header__button-start-again');
const fieldPlay = screenPlay.querySelector('.field-play');
const blockCards = fieldPlay.querySelector('.field-play__block-cards');
// const cards = blockCards.querySelectorAll('.card');

function getRandomCard(arr) {
    let randomCard = Math.floor(Math.random() * arr.length);

    return arr[randomCard];
}

function shuffleDeckCards(arr) {
    let shuffleArr = arr.concat(arr);

    for (let i = shuffleArr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [shuffleArr[i], shuffleArr[j]] = [shuffleArr[j], shuffleArr[i]];
    }

    return shuffleArr;
}
//сраный преттир достал, нет времени разбираться с правилами, пришлось функцию добавить сюда
function templateEngine(block) {
    if (block === undefined || block === null || block === false) {
        return document.createTextNode('');
    }

    if (typeof block === 'string' || typeof block === 'number' || block === true) {
        return document.createTextNode(block);
    }

    if (Array.isArray(block)) {
        const fragment = document.createDocumentFragment();
        block.forEach((item) => {
            const elem = templateEngine(item);
            fragment.appendChild(elem);
        });

        return fragment;
    }

    const tag = document.createElement(block.tag);

    if (block.cls) {
        tag.classList.add(...[].concat(block.cls).filter(Boolean));
    }

    if (block.attrs) {
        const keys = Object.keys(block.attrs);

        keys.forEach((key) => {
            tag.setAttribute(key, block.attrs[key]);
        });
    }

    const content = templateEngine(block.content);

    tag.appendChild(content);

    return tag;
}

blockDifficult.addEventListener('click', (event) => {
    const target = event.target;

    window.game.DIFFICULT = target.dataset.level;

    const buttonsLevel = blockDifficult.querySelectorAll('.difficult__button-level');
    for (const buttonLevel of buttonsLevel) {
        buttonLevel.classList.remove('difficult__button-level_select');
    }

    target.classList.add('difficult__button-level_select');
});

buttonStart.addEventListener('click', () => {
    // переделать условие, если не существует или пусто и не определено, хотя вроде и так работает, кек )
    if (window.game.DIFFICULT || (!(window.game.DIFFICULT === '') && !(window.game.DIFFICULT === undefined))) {
        screenDifficult.classList.add('screen-difficult_hidden');
        screenPlay.classList.remove('screen-play_hidden');
    }

    window.game.GAME_STATUS = 'PLAY';

    const buttonsLevel = blockDifficult.querySelectorAll('.difficult__button-level');
    for (const buttonLevel of buttonsLevel) {
        buttonLevel.classList.add('difficult__button-level_alert');
        setTimeout(() => buttonLevel.classList.remove('difficult__button-level_alert'), 1500);
    }

    for (let i = 0; i < Number(window.game.DIFFICULT); i++) {
        const randomCard = getRandomCard(window.game.DECK_CARDS);

        if (!window.game.RANDOM_CARDS.includes(randomCard)) {
            window.game.RANDOM_CARDS[i] = randomCard;
        } else {
            i = i - 1;
        }

        /**
         * const suits = ['spades', 'hearts', 'clubs', 'diamonds'];
         * const ranks = ['ace', 'king', 'queen', 'jack', 'ten', 'nine', 'eight', 'seven', 'six'];
         * сделать две переменные с рандомом на каждый массив
         * результат: название карты = сложить две переменные "spades + '_' + ace"
         */
    }

    const fragmentBlockCards = document.createDocumentFragment();
    const shuffleCards = shuffleDeckCards(window.game.RANDOM_CARDS);
    shuffleCards.forEach((card) => {
        fragmentBlockCards.appendChild(
            templateEngine({
                tag: 'div',
                cls: ['card'],
                attrs: {
                    'data-card': card,
                },
                content: [
                    {
                        tag: 'img',
                        cls: ['card__card-back', 'card__card-back_hidden'],
                        attrs: {
                            src: 'src/images/card_back.png',
                            alt: 'card_back',
                        },
                    },
                    {
                        tag: 'img',
                        cls: ['card__card-face'],
                        attrs: {
                            src: `src/images/${card}.png`,
                            alt: card,
                        },
                    },
                ],
            })
        );
    });

    blockCards.appendChild(fragmentBlockCards);
    // console.log(window.game.RANDOM_CARDS);
    // console.log(shuffleCards);

    // function flipCardBack() {
    //     cardsFace.forEach((cardFace) => {
    //         cardFace.classList.add('card__card-face_hidden');
    //         console.log('face: ' + cardFace);
    //     });
    //     cardsBack.forEach((cardBack) => {
    //         cardBack.classList.remove('card__card-back_hidden');
    //         console.log('back: ' + cardBack);
    //     });
    // }
    setTimeout(() => {
        // debugger;
        // console.log('парам пам пам');
        const cardsFace = blockCards.querySelectorAll('.card__card-face');
        const cardsBack = blockCards.querySelectorAll('.card__card-back');
        // можно переделать на функцию, но пока так
        cardsFace.forEach((cardFace) => {
            cardFace.classList.add('card__card-face_hidden');
            console.log('face: ' + cardFace);
        });
        cardsBack.forEach((cardBack) => {
            cardBack.classList.remove('card__card-back_hidden');
            console.log('back: ' + cardBack);
        });
    }, 5000);
});

// cards.addEventListener('click', (event) => {
//     const target = event.target;
// });
// btnStartAgain.addEventListener('click', () => {
//     fieldCardsFace.classList.add('field-play-face_hidden');
//     fieldCardsBack.classList.remove('field-play-back_hidden');
// });
