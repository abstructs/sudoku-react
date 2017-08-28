const React = require('react');
const ReactDOM = require('react-dom');

// TODO: Create react state
// TODO: Render board from state
// TODO: Allow user to change values
// TODO: Function for valid boards
// TODO: Solve function

class Board extends React.Component {
  constructor(props) {
    super(props);

    var blankGame = [];

    for(var i = 0; i < 9; i++) {
      blankGame.push([]);
      for(var j = 0; j < 9; j++) {
        blankGame[i].push(0);
      }
    }

    var gameFromInternet1 = [
      [0, 0, 0,  0, 0, 8,  5, 0, 0],
      [7, 0, 0,  4, 1, 0,  0, 6, 8],
      [3, 5, 8,  2, 0, 0,  0, 4, 0],
      [9, 0, 5,  8, 4, 0,  1, 0, 6],
      [8, 6, 0,  0, 7, 0,  2, 0, 3],
      [0, 0, 0,  0, 5, 0,  0, 0, 0],
      [0, 8, 0,  7, 0, 0,  0, 0, 2],
      [0, 0, 6,  0, 2, 9,  8, 3, 0],
      [4, 0, 3,  1, 0, 0,  7, 0, 0]
    ];

    this.state = {values: gameFromInternet1};

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.makeBoard = this.makeBoard.bind(this);
    this.isValidBoard = this.isValidBoard.bind(this);
    this.BOARD_HEIGHT = 9;
    this.BOARD_WIDTH = 9;
  }
  
  handleKeyDown(event, rowIndex, colIndex) {
    if(event.target.value.length < 1 && event.keyCode >= 48 && event.keyCode <= 57) {
      var newArr = this.state.values.slice();
      newArr[rowIndex][colIndex] = parseInt(String.fromCharCode(event.keyCode));
      this.setState({values: newArr});
    }
    else if (event.keyCode == 8) {
      var newArr = this.state.values.slice();
      newArr[rowIndex][colIndex] = 0;
      this.setState({values: newArr});
    }
  }

  isValidBoard() {
    var testBoard = this.state.values.slice();

    var rows = [];
    var columns = [];
    var units = [];
    

    for (var i = 0; i < testBoard.length; i++) {
      rows.push([]);
      columns.push([]);      
      for (var j = 0; j < this.BOARD_WIDTH; j++) {
        rows[i].push(testBoard[i][j]); 
        
      }
      for (var j = 0; j < this.BOARD_HEIGHT; j++) {
        columns[i].push(testBoard[j][i]);
      }
    }

    for(var i = 0; i < this.BOARD_HEIGHT; i += 3) {
      for(var j = 0; j < this.BOARD_WIDTH; j += 3) {
        units.push(testBoard[j].slice(i, i + 3).concat(testBoard[j + 1].slice(i, i + 3)).concat(testBoard[j + 2].slice(i, i + 3)));
      }
    }

    console.log(units);
    console.log(testBoard);

    return <div></div>;
  }

  makeBoard() {
    const board = this.state.values.map((row, rowIndex) => (
      <div className="columns is-gapless" style={{width: 500, height: 12}}>{row.map((col, colIndex) => (
        <div className="column is-0" style={{width: 25, height: 25}}>
          <Box rowIndex={rowIndex} colIndex={colIndex} value={this.state.values[rowIndex][colIndex]} handleKeyDown={this.handleKeyDown}/>
        </div>
      ))}
      </div>
    ));

    return board;
  }

  render() {
    return ( 
      <div className="">
        {this.makeBoard()}
        {this.isValidBoard()}
      </div>
    );
  }
}

class Box extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
  } 

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
  }

  handleKeyDown(event) {
    var index = {
      rowIndex: this.props.rowIndex,
      colIndex: this.props.colIndex
    }
    
    this.props.handleKeyDown(event, index.rowIndex, index.colIndex);
  }

  render() {
    if (this.props.value == 0) {
      return <input className="input has-text-centered" type="text" value={''} onKeyDown={this.handleKeyDown} />  
    }
    else {
      return <input className="input has-text-centered" type="text" value={this.props.value} onKeyDown={this.handleKeyDown} />
    }
  }
}

ReactDOM.render(
    <Board />,
    document.getElementById('app')
);