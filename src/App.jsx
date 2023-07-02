import './App.css';
import './Components/Board/Board.css';
import Board from './Components/Board/Board';
import { Editable } from './Components/Editable/Editable';
import { useEffect, useState } from 'react';

const App = () => {
  const [boards, setBoards] = useState(JSON.parse(localStorage.getItem('karban')) || []);

  useEffect(() => {
    localStorage.setItem('karban', JSON.stringify(boards));
  }, [boards])

  const [draggedCard, setDraggedCard] = useState(null);
  const addBoard = (title) => {
    const tempBoards = [...boards];
    const newBoard = {
      id: new Date() + Math.random() * 2,
      title: title,
      cards: []
    };
    tempBoards.push(newBoard);
    setBoards(tempBoards);
  };

  const deleteBoard = (id) => {
    const tempBoards = [...boards];
    const newBoards = tempBoards.filter(board => board.id !== id);
    setBoards(newBoards);
  };

  const addCard = (boardId, title) => {
    const tempBoards = [...boards];
    const boardIndex = tempBoards.findIndex(board => board.id === boardId);
    if (boardIndex !== -1) {
      const newCard = {
        id: new Date() + Math.random() * 2,
        title: title,
        tasks: [],
        labels: [],
        desc: "",
        date: new Date(),
      };
      tempBoards[boardIndex].cards.push(newCard);
      setBoards(tempBoards);
    }
  };

  const deleteCard = (boardId, cardId) => {
    const tempBoards = [...boards];
    const boardIndex = tempBoards.findIndex(board => board.id === boardId);
    if (boardIndex !== -1) {
      const cardIndex = tempBoards[boardIndex].cards.findIndex(card => card.id === cardId);
      if (cardIndex !== -1) {
        tempBoards[boardIndex].cards.splice(cardIndex, 1);
        setBoards(tempBoards);
      }
    }
  };

  const handleDragStart = (boardId, cardId) => {
    setDraggedCard({
      boardId,
      cardId,
    });
  };

  const handleDragEnter = (boardId) => {
    if (draggedCard) {
      const tempBoards = [...boards];

      const sourceBoardIndex = tempBoards.findIndex(board => board.id === draggedCard.boardId);
      const destinationBoardIndex = tempBoards.findIndex(board => board.id === boardId);

      if (sourceBoardIndex === destinationBoardIndex) return;

      if (sourceBoardIndex !== -1 && destinationBoardIndex !== -1) {
        const card = tempBoards[sourceBoardIndex].cards.find(card => card.id === draggedCard.cardId);

        if (card) {
          tempBoards[sourceBoardIndex].cards = tempBoards[sourceBoardIndex].cards.filter(card => card.id !== draggedCard.cardId);
          tempBoards[destinationBoardIndex].cards.push(card);
          setBoards(tempBoards);
        }
      }
    }
  };

  const handleDragEnd = () => {
    setDraggedCard(null);
  };

  const updateCard = (boardId, cardId, newCard) => {
    const tempBoards = [...boards];
    const boardIndex = tempBoards.findIndex(board => board.id === boardId);
    if (boardIndex !== -1) {
      const cardIndex = tempBoards[boardIndex].cards.findIndex(card => card.id === cardId);
      if (cardIndex !== -1) {
        tempBoards[boardIndex].cards[cardIndex] = newCard;
        setBoards(tempBoards);
      }
    }
  }

  return (
    <div className='App'>
      <div className="title">
        <h1>Kanban Board</h1>
      </div>
      <div className="outer">
        <div className="boards custom-scroll">
          {boards?.map((item) => (
            <Board
              key={item.id}
              board={item}
              deleteBoard={deleteBoard}
              addCard={addCard}
              deleteCard={deleteCard}
              onDragStart={handleDragStart}
              onDragEnter={handleDragEnter}
              onDragEnd={handleDragEnd}
              updateCard={updateCard}
            />
          ))}
          <div className="new-board">
            <Editable text="Add Board" onSubmit={addBoard} />
          </div>
        </div>
      </div>
    </div>
  );

};

export default App;
