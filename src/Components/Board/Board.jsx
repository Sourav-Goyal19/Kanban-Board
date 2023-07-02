import './Board.css';
import Card from '../Card/Card';
import { Editable } from '../Editable/Editable';
import { FiMoreHorizontal } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import { useState } from 'react';

const Board = ({
  board,
  deleteBoard,
  addCard,
  deleteCard,
  onDragStart,
  onDragEnter,
  onDragEnd,
  updateCard,
}) => {

  const [showDropdown, setShowDropdown] = useState(false);
  
  return (
    <div
      className='board'
      onDragEnter={() => onDragEnter(board.id)}
    >
      <div className="board-top">
        <p>
          {board?.title} <span style={{ fontWeight: 'bold' }}>{board?.cards?.length}</span>
        </p>
        <div className="board-top-more" onClick={() => setShowDropdown(!showDropdown)}>
          {showDropdown ? <RxCross2 cursor={'pointer'} size={25} /> : <FiMoreHorizontal cursor={'pointer'} size={25} />}
          {showDropdown && (
            <div className="dropdown">
              <p onClick={() => deleteBoard(board.id)}>Delete Board</p>
            </div>
          )}
        </div>
      </div>
      <div className="card-container custom-scroll">
        {board?.cards.map((item) => (
          <Card
            key={item.id}
            card={item}
            boardId={board.id}
            onDelete={deleteCard}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            updateCard={updateCard}
          />
        ))}
      </div>
      <Editable text="Add Card" onSubmit={(title) => addCard(board.id, title)} />
    </div>
  );
};

export default Board;