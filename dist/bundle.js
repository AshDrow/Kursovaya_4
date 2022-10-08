(() => {
    'use strict';
    function e(t) {
        if (null == t || !1 === t) return document.createTextNode('');
        if ('string' == typeof t || 'number' == typeof t || !0 === t) return document.createTextNode(t);
        if (Array.isArray(t)) {
            const a = document.createDocumentFragment();
            return (
                t.forEach((t) => {
                    const n = e(t);
                    a.appendChild(n);
                }),
                a
            );
        }
        const a = document.createElement(t.tag);
        t.cls && a.classList.add(...[].concat(t.cls).filter(Boolean)),
            t.attrs &&
                Object.keys(t.attrs).forEach((e) => {
                    a.setAttribute(e, t.attrs[e]);
                });
        const n = e(t.content);
        return a.appendChild(n), a;
    }
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
    };
    const t = document.querySelector('.screen-difficult'),
        a = t.querySelector('.difficult'),
        n = a.querySelector('.difficult__button-start'),
        s = document.querySelector('.screen-play'),
        c = s.querySelector('.field-play');
    function d() {
        for (let e = 0; e < Number(window.game.DIFFICULT); e++) {
            const a = (t = window.game.DECK_CARDS)[Math.floor(Math.random() * t.length)];
            window.game.RANDOM_CARDS.includes(a) ? (e -= 1) : (window.game.RANDOM_CARDS[e] = a);
        }
        var t;
        const a = document.createDocumentFragment(),
            n = (function (e) {
                let t = e.concat(e);
                for (let e = t.length - 1; e > 0; e--) {
                    let a = Math.floor(Math.random() * (e + 1));
                    [t[e], t[a]] = [t[a], t[e]];
                }
                return t;
            })(window.game.RANDOM_CARDS);
        n.forEach((t) => {
            a.appendChild(e({ tag: 'div', cls: ['card'], attrs: { 'data-card_name': t } }));
        }),
            c.appendChild(a);
        const s = c.querySelectorAll('.card');
        s.forEach((e) => (e.style.backgroundImage = `url(./static/${e.dataset.card_name}.png`)),
            setTimeout(() => {
                s.forEach((e) => (e.style.backgroundImage = 'url(./static/card_back.png'));
            }, 5e3);
        let d,
            i,
            r = !1;
        function l(e) {
            e.setAttribute('disabled', 'disable');
        }
        function o(e) {
            e.removeAttribute('disabled');
        }
        function u() {
            if ((console.log(this.dataset.card_name), (this.style.backgroundImage = `url(./static/${this.dataset.card_name}.png`), this !== d)) {
                if (!r) return (r = !0), (d = this), void l(d);
                (i = this), (r = !1), setTimeout(_, 500);
            }
        }
        function _() {
            if (d.dataset.card_name === i.dataset.card_name) return l(i), alert('ВЫ УГАДАЛИ!!!'), (d = null), void (i = null);
            alert('НЕ УГАДАЛИ!!!'), (d.style.backgroundImage = 'url(./static/card_back.png'), (i.style.backgroundImage = 'url(./static/card_back.png'), o(d), o(i), (d = null), (i = null);
        }
        s.forEach((e) => e.addEventListener('click', u));
    }
    a.addEventListener('click', (e) => {
        const t = e.target;
        window.game.DIFFICULT = t.dataset.level;
        const n = a.querySelectorAll('.difficult__button-level');
        for (const e of n) e.classList.remove('difficult__button-level_select');
        t.classList.add('difficult__button-level_select');
    }),
        n.addEventListener('click', () => {
            (window.game.DIFFICULT || ('' !== window.game.DIFFICULT && void 0 !== window.game.DIFFICULT)) && (t.classList.add('screen-difficult_hidden'), s.classList.remove('screen-play_hidden')),
                (window.game.GAME_STATUS = 'PLAY');
            const e = a.querySelectorAll('.difficult__button-level');
            for (const t of e) t.classList.add('difficult__button-level_alert'), setTimeout(() => t.classList.remove('difficult__button-level_alert'), 1500);
            d();
        });
})();
