export {};

declare module '*.png';

declare global {
    interface Window {
        game: {
            DIFFICULT?: string;
            GAME_STATUS: string;
            DECK_CARDS: string[];
            RANDOM_CARDS: string[];
            TIMER: string;
        }
    }
}

// declare global {
//     interface Window {
//         FB:any;
//     }
// }

// declare interface window.game {
//         DIFFICULT: string;
//         GAME_STATUS: string;
//         DECK_CARDS: string[];
//         RANDOM_CARDS: string[];
//         TIMER: string;
// };
