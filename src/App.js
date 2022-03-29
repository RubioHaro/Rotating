import React from 'react';
import MatrixRotator from './Rotator.js'
import './App.css';

class App extends React.Component {
  state = {
    gridDimension: 10,
    grid: [],
    walls: [],
    start: '',
    end: '',
    total: '',
    error: '',
    clickMode: 'wall'
  };

  componentDidMount() {
    this.setGridState()
  }

  setGridState = (num = 10) => {
    let grid = new Array(num)
    for (let i = 0; i < grid.length; i++) {
      grid[i] = new Array(num).fill({ wall: false, difficulty: 0, color: 'transparent' })
    }
    return this.setState({
      grid
    })
  }

  setMultipleSquareCase = (e, stateKey, color) => {
    let wallBoolean = stateKey === "walls" ? true : false
    let difficulty = stateKey === "walls" ? 1 : 0
    let squarePosition = e.currentTarget.id.split("-")
    this.placeSquares(squarePosition, { wall: wallBoolean, difficulty: difficulty, color: color })

  }

  cleanGrid = (stateCondition, object) => {
    if (!!stateCondition) {
      let grid = this.state.grid
      grid[stateCondition[0]][stateCondition[1]] = object
      return this.setState({
        grid
      })
    }
    return
  }

  substituteSquare = (positionArray, object, key) => {
    let grid = this.state.grid
    grid[positionArray[0]][positionArray[1]] = object
    return this.setState({
      grid,
      [key]: positionArray
    })
  }

  substituteSquares = (positionArray, object) => {
    let grid = this.state.grid
    grid[positionArray[0]][positionArray[1]] = object
    return this.setState({
      grid,
    })
  }

  placeSquare = (squarePosition, object, stateKey) => {
    this.substituteSquare(squarePosition, object, stateKey)
  }

  placeSquares = (squarePosition, object) => {

    this.substituteSquares(squarePosition, object)
  }

  handleClick = (e, clickMode, array = []) => {
    switch (clickMode) {
      case "free":
        this.setMultipleSquareCase(e, "free", "transparent")
        break
      case "wall":
        this.setMultipleSquareCase(e, "walls", "white")
        break
      default:
        return

    }
  }

  renderGrid = () => {
    let grid = this.state.grid
    return <div>{
      grid.map((row, i) =>
        <div style={{ display: 'flex' }}>
          {row.map((element, j) =>
            <div data-difficulty={1} id={`${i}-${j}`} onClick={(e) =>
              this.handleClick(e, this.state.clickMode, [i, j])} style={
                {
                  height: "40px", overflowX: 'hidden', width: '40px', borderStyle: 'solid',
                  backgroundColor: element.color, fontSize: '12px', lineHeight: '40px', textAlign: 'center'
                }}>
              {element.difficulty === 0 ? '' : element.difficulty}
            </div>)}
        </div>
      )}
    </div>
  }

  reset = async () => {
    await this.setGridState(0)
    this.setGridState(this.state.gridDimension)
  }

  selectMode = (e) => {
    this.setState({
      clickMode: e.target.name
    })
  }

  handleChange = (e) => {
    this.setState({
      gridDimension: Number(e.target.value)
    })
  }

  rotateGrid = () => {
    let grid = this.state.grid
    let matrix_rotator = new MatrixRotator(grid)
    let optimalPath = matrix_rotator.getRotatedMatrixRec()
    return this.setState({
      grid: optimalPath,
      // total: sum
    })
  }

  render() {
    return (
      <div className="App-header">
        <div style={{ margin: '30px' }}>
          <div style={{ display: 'flex' }}>
            <button className='btn-principal' name="wall" onClick={(e) => this.selectMode(e)}>Pintar</button>
            <button className='btn-principal' name="free" onClick={(e) => this.selectMode(e)}>Borrar</button>
          </div>
          {this.state.error ? <div> Ha ocurrido un error </div> : null}
          {this.renderGrid()}
          {!!this.state.total ? <div> Cantidad de pasos: {this.state.total} </div> : null}
          {/* <button name="dimension" className='btn-principal' value={this.state.gridDimension} onClick={() => this.reset()}> Limpiar </button> */}
          <p className='cent-text'>
            <button className='btn-principal' onClick={() => this.rotateGrid()}> Rotate 90° </button>
            <p>
              by Rodrigo Rubio Haro
            </p>

            <a className='link' rel="noreferrer" target="_blank" href='https://github.com/RubioHaro/RatMaze/blob/main/src/AStar.js'>
              Codigo Solver
            </a>&nbsp; | &nbsp;
            <a className='link' rel="noreferrer" target="_blank" href='https://github.com/RubioHaro/RatMaze'>
              Github
            </a>
          </p>
        </div>
      </div>
    );
  }
}



export default App;