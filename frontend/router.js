import { HomePage } from "./components/homepage.js";
import { ChessBase } from "./components/chess/base.js";
import { TicTacToeBase } from "./components/tictactoe/base.js";

const routes = [
    { path: '/', component: HomePage, name: 'homepage' },
    { path: '/tic-tac-toe', component: TicTacToeBase, name: 'tic-tac-toe-base' },
    { path: '/chess', component: ChessBase, name: 'chess-base' }
]

export const router = new VueRouter({
    routes
})