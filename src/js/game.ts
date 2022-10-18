// https://itchef.ru/articles/71769/
// https://coderoad.ru/60044026/TypeScript-%D0%A1%D0%B2%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%BE-X-%D0%BD%D0%B5-%D1%81%D1%83%D1%89%D0%B5%D1%81%D1%82%D0%B2%D1%83%D0%B5%D1%82-%D0%B2-Window-typeof-globalThis-%D0%BF%D1%80%D0%B5%D0%B4%D0%BB%D0%B0%D0%B3%D0%B0%D0%B5%D0%BC%D0%BE%D0%B5
// https://bestprogrammer.ru/izuchenie/poshagovoe-rukovodstvo-po-typescript-dlya-nachinayushhih
// https://www.typescriptlang.org/docs/handbook/dom-manipulation.html
//

import '/style.scss';
import { templateEngine } from './templateEngine';
// import {} from './utilits-functions';
import * as _ from 'lodash';

window.game = {
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
    TIMER: '',
};

const screenDifficult = document.querySelector('.screen-difficult') as HTMLDivElement;
const blockDifficult = screenDifficult.querySelector('.difficult') as HTMLDivElement;
const fieldButtons = blockDifficult.querySelector('.difficult__field-buttons') as HTMLDivElement;
const buttonStart = blockDifficult.querySelector('.difficult__button-start') as HTMLButtonElement;

const screenPlay = document.querySelector('.screen-play') as HTMLDivElement;

const screenEndGame = document.querySelector('.screen-end-game_hidden') as HTMLDivElement;

fieldButtons.addEventListener('click', (event) => {
    const target = event.target as HTMLButtonElement;

    window.game.DIFFICULT = target.dataset.level;

    const buttonsLevel = fieldButtons.querySelectorAll('.difficult__button-level') as NodeListOf<HTMLButtonElement>;
    for (const buttonLevel of Array.from(buttonsLevel)) {
        buttonLevel.classList.remove('difficult__button-level_select');
    }

    target.classList.add('difficult__button-level_select');
});

buttonStart.addEventListener('click', () => {
    if (window.game.DIFFICULT || (!(window.game.DIFFICULT === '') && !(window.game.DIFFICULT === undefined))) {
        screenDifficult.classList.add('screen-difficult_hidden');
        screenPlay.classList.remove('screen-play_hidden');
    }

    const buttonsLevel = fieldButtons.querySelectorAll('.difficult__button-level') as NodeListOf<HTMLButtonElement>;
    for (const buttonLevel of Array.from(buttonsLevel)) {
        buttonLevel.classList.add('difficult__button-level_alert');
        setTimeout(() => buttonLevel.classList.remove('difficult__button-level_alert'), 1500);
    }

    window.game.GAME_STATUS = 'PLAY';

    renderGamePlay();
});

function renderGamePlay() {
    const timerScale = screenPlay.querySelector('.header__timer-scale') as HTMLDivElement;
    const blockCards = screenPlay.querySelector('.screen-play__block-cards') as HTMLDivElement;
    const buttonStartAgain = screenPlay.querySelector('.header__button-start-again') as HTMLButtonElement;

    blockCards.innerHTML = '';
    timerScale.textContent = '00.00';
    window.game.RANDOM_CARDS = [];
    window.game.TIMER = '';

    switch (window.game.DIFFICULT) {
        case '3':
            blockCards.style.width = 315 + 'px';
            break;
        case '6':
            blockCards.style.width = 425 + 'px';
            break;
        case '9':
            blockCards.style.width = 645 + 'px';
            break;

        default:
            blockCards.style.width = 645 + 'px';

            break;
    }

    function getRandomCard(arr: string[]): string {
        let randomCard: number = Math.floor(Math.random() * arr.length);

        return arr[randomCard];
    }

    function shuffleDeckCards(arr: string[]): string[] {
        let shuffleArr: string[] = arr.concat(arr);

        for (let i = shuffleArr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [shuffleArr[i], shuffleArr[j]] = [shuffleArr[j], shuffleArr[i]];
        }

        return shuffleArr;
    }

    function disableCard(card: HTMLDivElement): void {
        card.style.pointerEvents = 'none';
    }

    function unDisableCard(card: HTMLDivElement): void {
        card.style.pointerEvents = 'auto';
    }

    for (let i = 0; i < Number(window.game.DIFFICULT); i++) {
        const randomCard: string = getRandomCard(window.game.DECK_CARDS);

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

    const fragmentBlockCards: DocumentFragment = document.createDocumentFragment();

    const shuffleCards: string[] = shuffleDeckCards(window.game.RANDOM_CARDS);
    shuffleCards.forEach((card) => {
        fragmentBlockCards.appendChild(
            templateEngine({
                tag: 'div',
                cls: ['card'],
                attrs: {
                    'data-card_name': card,
                },
            })
        );
    });

    blockCards.appendChild(fragmentBlockCards);

    function handleTimer(): void {
        sec++;

        if (sec >= 60) {
            min++;
            sec = 0;
        }

        // minutes = Number(minutes);
        let minutes: string = min < 10 ? '0' + String(min) : String(min);
        // seconds = Number(seconds);
        let seconds: string = sec < 10 ? '0' + String(sec) : String(sec);

        window.game.TIMER = `${minutes}.${seconds}`;

        timerScale.innerText = window.game.TIMER;

        if (window.game.GAME_STATUS !== 'PLAY') {
            clearInterval(startTimer);
        }
    }

    let sec: number = 0;
    let min: number = 0;
    let startTimer = setInterval(handleTimer, 1000);

    const cards = blockCards.querySelectorAll('.card') as NodeListOf<HTMLDivElement>; //////////////////////////////

    Array.from(cards).forEach((card) => {
        card.style.backgroundImage = `url(./static/${card.dataset.card_name}.png`;
        disableCard(card);
    });
    setTimeout(() => {
        cards.forEach((card) => {
            card.style.backgroundImage = `url(./static/card_back.png`;
            unDisableCard(card);
        });
    }, 5000);

    let hasSelectedCard: boolean = false;
    let firstSelectCard: HTMLDivElement;
    let secondSelectCard: HTMLDivElement;

    function selectCard(this: HTMLDivElement): void {
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

        checkCard();
    }

    function checkCard(): void {
        if (firstSelectCard.dataset.card_name === secondSelectCard.dataset.card_name) {
            disableCard(secondSelectCard);
            firstSelectCard.classList.add('card-face');
            secondSelectCard.classList.add('card-face');

            if (Array.from(cards).every((card) => card.classList.contains('card-face'))) {
                window.game.GAME_STATUS = 'win';
                renderScreenEndGame(window.game.GAME_STATUS, 'Вы выиграли!');
                return;
            } else {
                // firstSelectCard = null;
                // secondSelectCard = null;
                return;
            }
        }

        window.game.GAME_STATUS = 'lose';
        renderScreenEndGame(window.game.GAME_STATUS, 'Вы проиграли!');
    }

    cards.forEach((card) => {
        card.addEventListener('click', selectCard);
    });

    buttonStartAgain.addEventListener('click', () => {
        clearInterval(startTimer);
        renderGamePlay();
    });
}

function renderScreenEndGame(status: string, message: string): void {
    screenEndGame.innerHTML = '';
    screenEndGame.appendChild(
        templateEngine({
            tag: 'div',
            cls: ['end-game', 'block'],
            content: [
                {
                    tag: 'div',
                    cls: ['end-game__field-images'],
                    content: [
                        {
                            tag: 'img',
                            cls: ['end-game__image', 'block__image'],
                            attrs: {
                                src: `./static/${status}.png`,
                                alt: status,
                            },
                        },
                    ],
                },
                {
                    tag: 'h2',
                    cls: ['end-game__title', 'block__title'],
                    content: message,
                },
                {
                    tag: 'p',
                    cls: ['end-game__text', 'block__text'],
                    content: 'Затраченное время:',
                },
                {
                    tag: 'p',
                    cls: ['end-game__time', 'block__time'],
                    content: window.game.TIMER,
                },
                {
                    tag: 'button',
                    cls: ['end-game__button-start-again', 'button-start'],
                    content: 'Играть снова',
                },
            ],
        })
    );

    const buttonStartAgain = document.querySelector('.end-game__button-start-again') as HTMLButtonElement;

    buttonStartAgain.addEventListener('click', () => {
        screenEndGame.classList.add('screen-end-game_hidden');
        screenDifficult.classList.remove('screen-difficult_hidden');
    });

    screenPlay.classList.add('screen-play_hidden');
    screenEndGame.classList.remove('screen-end-game_hidden');
}
