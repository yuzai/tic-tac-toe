import React from 'react';
class Square extends React.Component {
    render() {
        return (
            <button className='square' onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}
class Board extends React.Component {
    rendersquare(i) {
        return (< Square value = {
            this.props.squares[i]
        }
        onClick = {
            () => this.props.onClick(i)
        } />)
    }
    render() {
        return (
            <div>
                <div className = 'board-row'>
                    {this.rendersquare(0)}
                    {this.rendersquare(1)}
                    {this.rendersquare(2)}
                </div>
                <div className = 'board-row'>
                    {this.rendersquare(3)}
                    {this.rendersquare(4)}
                    {this.rendersquare(5)}
                </div>
                <div className = 'board-row'>
                    {this.rendersquare(6)}
                    {this.rendersquare(7)}
                    {this.rendersquare(8)}
                </div>
            </div>
        )
    }
}

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                    clicked: 0
                }
            ],
            stepNumber: 0,
            xIsnext: true,
        };
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();
        const clicked = i;
        if (calculateWinner(squares) || squares[i])
        {
            return;
        }
        squares[i] = this.state.xIsnext
            ? 'X'
            : 'O';
        this.setState({
            history: history.concat([
                {
                    squares: squares,
                    clicked: clicked
                }
            ]),
            stepNumber: history.length,
            xIsnext: !this.state.xIsnext
        });
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsnext: (step % 2)
                ? false
                : true
        });
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();
        const winner = calculateWinner(squares);
        let status;
        if (winner)
            status = 'winner:' + winner;
        else {
            status = 'next player:' + (this.state.xIsnext
                ? 'X'
                : 'O');
        }
        const moves = history.map((state, move) => {
            const desc = move
                ? ((move%2
                    ? 'X'
                    : 'O')+
                    ' move at' + '('+(Math.floor((state.clicked)/3)+1)+','+((state.clicked)%3+1)+')')
                : 'Game start';
            return (
                <li key={move}>
                    <a href='#' onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            );
        });
        return (
            <div className='game'>
                <div className='game-board'>
                    <div className = 'status'>{status}</div>
                    <Board squares={squares} onClick= {(i)=>this.handleClick(i)}/>
                </div>
                <div className='game-info'>
                    <ol>{moves}</ol>
                </div>
            </div>
        );

    }
}

export default Game;

function calculateWinner(squares) {
    const lines = [
        [
            0, 1, 2
        ],
        [
            3, 4, 5
        ],
        [
            6, 7, 8
        ],
        [
            0, 3, 6
        ],
        [
            1, 4, 7
        ],
        [
            2, 5, 8
        ],
        [
            0, 4, 8
        ],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a,
            b,
            c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
