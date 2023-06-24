import { useState } from "react";

function App() {
  
  const [total, setTotal] = useState(1);

  const [gameOver,setGameOver] = useState(0);

  const [winner,setWinner] = useState("No One");

  const [message,setMessage] = useState("Won By SomeOne!");

  const empty = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const [board, setBoard] = useState(empty);

  const handleClear = () => {
    setBoard(empty);
    setTotal(1);
    setGameOver(0);
  };

  const checkRow = (row: number) => {
    let result = true;
    const start = board[row][0];
    if (start === "") return false;
    for (let j = 1; j < 3; j++) {
      result &&= start === board[row][j];
    }
    if (result) return true;
    return false;
  };

  const checkCol = (col: number) => {
    let result = true;
    const start = board[0][col];
    if (start === "") return false;
    for (let j = 1; j < 3; j++) {
      result &&= start === board[j][col];
    }
    if (result) return true;
    return false;
  };

  const checkDiagonal = (row: number, col: number) => {
    let result = true;
    if (row === col) {
      const start = board[0][0];
      for (let i = 1; i < 3; i++) result &&= start === board[i][i];
    } else if (row === 2 - col) {
      const start = board[0][2];
      for (let i = 1; i < 3; i++) result &&= start === board[i][2 - i];
    }else{
      result = false;
    }
    if (result) return true;
    return false;
  };

  const isGameOver = (row: number, col: number) => {
    return checkCol(col) || checkRow(row) || checkDiagonal(row, col);
  };

  const markPosition = (row: number, col: number) => {
    const data = board[row][col];
    if (data !== "") return;
    setTotal(total + 1);
    console.log(total);
    const newBoard = [...board];
    newBoard[row][col] = total % 2 === 0 ? "O" : "X";
    setBoard(newBoard);
    if (isGameOver(row, col)){
      setGameOver(1);
      setMessage("Player "+board[row][col] + " Won the Match");
      setWinner(board[row][col]);
    }else if(total === 9)
    {
      setGameOver(2);
      setMessage("Match Draw!");
    }
  };

  return (
    <>
      <div className="w-screen h-screen p-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 ">    
        <div className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden bg-black">
        {
          gameOver !== 0 ?
          <div className="absolute flex items-center justify-center w-screen h-screen backdrop-blur-md">
            <div className="bg-white rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">  
              <div className="flex flex-col items-center justify-center p-6 m-1 space-y-4 text-white bg-black rounded-md">
                <h1 className="text-4xl" >Game Over!</h1>
                <h3 className={`text-2xl ${gameOver===1?"text-green-500":"text-red-400"}`}>{message}</h3>
                {
                  gameOver===1?
                  <h3 className="text-2xl text-green-500">Congratulations Player {winner}</h3>
                  :
                  <h3 className={`text-2xl `}>Both Played Well!</h3>
                }
                <button className="px-4 py-2 text-xl bg-green-700 rounded" onClick={()=>handleClear()}>
                  Play Again!
                </button>
              </div>
            </div>
          </div>
          : null
        }
        <div>
          
        </div>
            <div className="grid grid-cols-3 grid-rows-3 overflow-hidden text-white w-96 h-96">
              <p
                className="flex items-center justify-center border-r-4 border-green-400 text-7xl "
                onClick={() => markPosition(0, 0)}
              >
                {board[0][0]}
              </p>
              <p
                className="flex items-center justify-center border-r-4 border-green-400 text-7xl"
                onClick={() => markPosition(0, 1)}
              >
                {board[0][1]}
              </p>
              <p
                className="flex items-center justify-center border-green-400 text-7xl"
                onClick={() => markPosition(0, 2)}
              >
                {board[0][2]}
              </p>
              <p
                className="flex items-center justify-center border-t-4 border-r-4 border-green-400 text-7xl"
                onClick={() => markPosition(1, 0)}
              >
                {board[1][0]}
              </p>
              <p
                className="flex items-center justify-center border-t-4 border-r-4 border-green-400 text-7xl"
                onClick={() => markPosition(1, 1)}
              >
                {board[1][1]}
              </p>
              <p
                className="flex items-center justify-center border-t-4 border-green-400 text-7xl"
                onClick={() => markPosition(1, 2)}
              >
                {board[1][2]}
              </p>
              <p
                className="flex items-center justify-center border-t-4 border-r-4 border-green-400 text-7xl"
                onClick={() => markPosition(2, 0)}
              >
                {board[2][0]}
              </p>
              <p
                className="flex items-center justify-center border-t-4 border-r-4 border-green-400 text-7xl"
                onClick={() => markPosition(2, 1)}
              >
                {board[2][1]}
              </p>
              <p
                className="flex items-center justify-center border-t-4 border-green-400 text-7xl"
                onClick={() => markPosition(2, 2)}
              >
                {board[2][2]}
              </p>
            </div>
            {/* <button onClick={handleClear} className="px-6 py-2 m-2 mt-8 bg-white ">
              Clear
            </button> */}
          </div>
      </div>
    </>
  );
}

export default App;
