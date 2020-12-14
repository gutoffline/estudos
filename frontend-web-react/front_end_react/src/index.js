import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(index) {
        return <Square value={this.props.squares[index]} onClick={() => this.props.onClick(index)}/>;
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {

    // Criamos um construtor sempre que precisamos obter as propriedades
    // de um componente do React que seja uma class
    // Também fazemos isso quando precisamos declarar o estado inicial
    // O construtor será executado sempre que o componente for criado
    // Caso contrário, não precisamos nem declarar o construtor
    constructor(props) {
        // Props são as propriedades iniciais daquele componente
        // Envia as props e constrói o React.Component
        super(props);

        // Declaração do estado inicial com um objeto inicial
        // Estados servem para serem alterados depois da inicialização do componente
        this.state = {
            squares: Array(9).fill(null),
            nextMove: 'X'
        };
    }

    handleClick(index) {
        const squares = this.state.squares;

        if (squares[index] || calculateWinner(squares)) {
            return;
        }

        squares[index] = this.state.nextMove;

        const nextMove = this.state.nextMove === 'X' ? 'O' : 'X';

        // Atualiza o estado do componente, passando um novo objeto para ele
        this.setState({ nextMove });
    }

    restartGame() {
        this.setState({
            squares: Array(9).fill(null),
            nextMove: 'X'
        });
    }

    render() {
        const squares = this.state.squares;

        // Next Move
        const nextMove = this.state.nextMove;

        // Winner
        const hasWinner = calculateWinner(squares);
        const winner = nextMove === 'X' ? 'O': 'X';

        // Draw
        const filledSquares = squares.filter(Boolean);
        const draw = !hasWinner && filledSquares.length === squares.length;

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={this.state.squares} onClick={(i) => this.handleClick(i)}/>
                </div>

                <div className="game-info">
                    {!hasWinner && !draw ? 'Próxima jogada: ' + nextMove : ''}
                    {hasWinner ? winner + ' venceu!!' : ''}
                    {draw ? 'Deu velha!!' : ''}<br/>
                    <br/>
                    <button onClick={() => this.restartGame()}>Reiniciar jogo</button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    // Elemento que será renderizado
    <Game/>,
    // Local em que esse elemento será renderizado
    document.getElementById('root')
);

// É interessante separar essa função pois ela não depende do React para acontecer
// Dessa forma, podemos testá-la separadamente.
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    /*
    for (const line of lines) {
        const [a, b, c] = line;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return true;
        }
    }
    return false;
    */

    return lines.some(([a, b, c]) => squares[a] && squares[a] === squares[b] && squares[a] === squares[c]);
}