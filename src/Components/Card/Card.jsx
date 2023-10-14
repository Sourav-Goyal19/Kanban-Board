import { useState } from 'react';
import { FiClock, FiMoreHorizontal } from 'react-icons/fi';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import './Card.css';
import { Chip } from '../Chip/Chip';
import { Dropdown } from '../Dropdown/Dropdown';
import { Cardinfo } from '../CardInfo/Cardinfo';

const Card = ({ card, boardId, onDelete, onDragStart, onDragEnd, updateCard }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const date = new Date(card.date).toISOString().substring(0, 10);

    const handleDragStart = () => {
        onDragStart(boardId, card.id);
    };

    const handleDragEnd = () => {
        onDragEnd();
    };

    const handleDeleteCard = () => {
        onDelete(boardId, card.id);
    };

    return (
        <>
            {showInfo && <Cardinfo updateCard={updateCard} boardId={boardId} card={card} onDelete={onDelete} onClose={() => setShowInfo(false)} />}
            <div
                className='card'
                onClick={() => setShowInfo(true)}
                draggable
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className="top">
                    <div className="top-label">
                        {card?.labels?.map((item, index) => (
                            <Chip key={index} text={item.text} color={item.color} />
                        ))}
                    </div>
                    <div className='card' onClick={() => setShowInfo(true)}>
                        <div
                            className="top-more"
                            onClick={(event) => {
                                event.stopPropagation();
                                setShowDropdown(!showDropdown);
                            }}
                        >
                            <FiMoreHorizontal size={25} />
                            {showDropdown && (
                                <Dropdown>
                                    <p onClick={handleDeleteCard}>Delete Card</p>
                                </Dropdown>
                            )}
                        </div>
                    </div>

                </div>
                <div className="middle">{card?.title}</div>
                <div className="footer">
                    <div className="footer_data">
                        <FiClock />
                        <p>{date}</p>
                    </div>
                    {card.tasks.length > 0 && (
                        <div className="footer_data">
                            <AiOutlineCheckCircle />
                            <p>{card.tasks.filter(task => task.completed).length}/{card.tasks.length}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Card;
