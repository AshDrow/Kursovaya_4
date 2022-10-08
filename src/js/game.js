import '/style.scss';
import { templateEngine } from './templateEngine.js';
// import DECK_CARDS from './DECK_CARDS.js';

window.game = {
    // CARDS_QUANTITY: '',
    DIFFICULT: '',
    GAME_STATUS: 'CHOOSE_DIFFICULT',
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

const screenDifficult = document.querySelector('.screen-difficult');
const blockDifficult = screenDifficult.querySelector('.difficult');
const buttonStart = blockDifficult.querySelector('.difficult__button-start');

const screenPlay = document.querySelector('.screen-play');
// const btnStartAgain = screenPlay.querySelector('.header__button-start-again');
const fieldPlay = screenPlay.querySelector('.field-play');

blockDifficult.addEventListener('click', (event) => {
    const target = event.target;

    window.game.DIFFICULT = target.dataset.level;

    const buttonsLevel = blockDifficult.querySelectorAll('.difficult__button-level');
    for (const buttonLevel of buttonsLevel) {
        buttonLevel.classList.remove('difficult__button-level_select');
    }

    target.classList.add('difficult__button-level_select');
});

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

function renderGamePlay() {
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
                cls: ['card'], // 'card__card-back'],
                attrs: {
                    'data-card_name': card,
                    // style: `background-image: url('src/static/${card}.png')`,
                },
                // content: [
                //     {
                //         tag: 'img',
                //         cls: ['card__card-back', 'card__card-back_hidden'],
                //         attrs: {
                //             src: 'src/images/card_back.png',
                //             alt: 'card_back',
                //         },
                //     },
                //     {
                //         tag: 'img',
                //         cls: ['card__card-face'],
                //         attrs: {
                //             src: `src/images/${card}.png`,
                //             alt: card,
                //         },
                //     },
                // ],
            })
        );
    });

    fieldPlay.appendChild(fragmentBlockCards);

    const cards = fieldPlay.querySelectorAll('.card');

    cards.forEach((card) => (card.style.backgroundImage = `url(./static/${card.dataset.card_name}.png`));

    setTimeout(() => {
        cards.forEach((card) => (card.style.backgroundImage = `url(./static/card_back.png`));
    }, 5000);

    let hasSelectedCard = false;
    let firstSelectCard;
    let secondSelectCard;

    function disableCard(card) {
        card.setAttribute('disabled', 'disable');
    }

    function unDisableCard(card) {
        card.removeAttribute('disabled');
    }

    function selectCard() {
        // debugger;
        console.log(this.dataset.card_name);
        this.style.backgroundImage = `url(./static/${this.dataset.card_name}.png`;

        if (this === firstSelectCard) return;

        if (!hasSelectedCard) {
            hasSelectedCard = true;
            firstSelectCard = this;
            disableCard(firstSelectCard);
            return;
        }

        secondSelectCard = this;
        hasSelectedCard = false;

        setTimeout(checkCard, 500);
    }

    function checkCard() {
        if (firstSelectCard.dataset.card_name === secondSelectCard.dataset.card_name) {
            disableCard(secondSelectCard);

            alert('ВЫ УГАДАЛИ!!!');

            firstSelectCard = null;
            secondSelectCard = null;
            return;
        }

        alert('НЕ УГАДАЛИ!!!');

        firstSelectCard.style.backgroundImage = `url(./static/card_back.png`;
        secondSelectCard.style.backgroundImage = `url(./static/card_back.png`;

        unDisableCard(firstSelectCard);
        unDisableCard(secondSelectCard);

        firstSelectCard = null;
        secondSelectCard = null;
    }

    cards.forEach((card) => card.addEventListener('click', selectCard));
}

buttonStart.addEventListener('click', () => {
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

    renderGamePlay();
});

// btnStartAgain.addEventListener('click', () => {
//     fieldCardsFace.classList.add('field-play-face_hidden');
//     fieldCardsBack.classList.remove('field-play-back_hidden');
// });
