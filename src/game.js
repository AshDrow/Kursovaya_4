window.game = {
    DIFFICULT: '',
};

const screenDifficult = document.querySelector('.screen-difficult');
const blockDifficult = screenDifficult.querySelector('.difficult');
const btnStart = blockDifficult.querySelector('.difficult__button-start');

const screenPlay = document.querySelector('.screen-play');

blockDifficult.addEventListener('click', (event) => {
    const target = event.target;

    window.game.DIFFICULT = target.dataset.level;

    const buttonsLevel = blockDifficult.querySelectorAll('.difficult__button-level');
    for (const buttonLevel of buttonsLevel) {
        buttonLevel.classList.remove('difficult__button-level_select');
    }

    target.classList.add('difficult__button-level_select');
});

btnStart.addEventListener('click', () => {
    if (window.game.DIFFICULT || (!(window.game.DIFFICULT === '') && !(window.game.DIFFICULT === undefined))) {
        screenDifficult.classList.add('screen-difficult_hidden');
        screenPlay.classList.remove('screen-play_hidden');
    }

    const buttonsLevel = blockDifficult.querySelectorAll('.difficult__button-level');
    for (const buttonLevel of buttonsLevel) {
        buttonLevel.classList.add('difficult__button-level_alert');
        setTimeout(() => buttonLevel.classList.remove('difficult__button-level_alert'), 1500);
    }
});
