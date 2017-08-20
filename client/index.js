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

    var game = [];

    for(var i = 0; i < 9; i++) {
      game.push([]);
      for(var j = 0; j < 9; j++) {
        game[i].push(0);
      }
    }

    this.state = {values: game};

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.makeBoard = this.makeBoard.bind(this);
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