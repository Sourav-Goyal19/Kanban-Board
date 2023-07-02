import React, { useEffect, useState } from 'react'
import { Modal } from '../Modal/Modal'
import { Editable } from '../Editable/Editable'
import './Cardinfo.css';
import { PiTextT } from 'react-icons/pi'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { BsCalendarDate, BsTag } from 'react-icons/bs'
import { IoMdCheckboxOutline } from 'react-icons/io'
import { BiSolidTrashAlt } from 'react-icons/bi'
import { Chip } from '../Chip/Chip'

export const Cardinfo = (props) => {
    const colors = ["#a8193d", "#4fcc25", "#1ebffa", "#8da377", "#9975bd", "#cf61a1", "#240959",];
    const date = new Date(props.card.date).toISOString().substring(0, 10);
    const [chooseColor, setChooseColor] = useState("black");
    const [newCard, setNewCard] = useState({ ...props.card });
    
    useEffect(() => {
        props.updateCard(props.boardId, props.card.id, newCard);
    }, [newCard])

    const calculateWidth = () => {
        const completedTasks = props.card.tasks.filter(task => task.completed).length;
        if (completedTasks <= 0) return "0";
        return ((completedTasks / props.card.tasks.length) * 100 + "")
    }

    const addLabel = (text, color) => {
        const newLabel = { text: text, color: color };
        setNewCard({ ...newCard, labels: [...newCard.labels, newLabel] })
        setChooseColor("black");
    }

    const removeLabel = (index) => {
        setNewCard({ ...newCard, labels: [...newCard.labels.slice(0, index), ...newCard.labels.slice(index + 1)] })
    }

    const addTask = (text) => {
        const newTask = {
            id: Date.now() + Math.random(),
            text: text,
            completed: false,
        }
        setNewCard({ ...newCard, tasks: [...newCard.tasks, newTask] })
    }

    const removeTask = (id) => {
        const updatedTasks = newCard.tasks.filter(task => task.id !== id);
        setNewCard({ ...newCard, tasks: updatedTasks });
    };

    const updateTask = (id, completed) => {
        const updatedTasks = newCard.tasks.map(task => {
            if (task.id === id) {
                return {
                    ...task,
                    completed: completed,
                };
            }
            return task;
        });
        setNewCard({ ...newCard, tasks: updatedTasks });
    };


    return (
        <div className='cardInfo'>
            <Modal onClose={props.onClose}>
                <div className="cardInfo-box">
                    <div className="cardInfoMiniBox titleBox">
                        <PiTextT size={35} />
                        Title
                    </div>
                    <div className="box">
                        <Editable onSubmit={(e) => setNewCard({ ...newCard, title: e })} placeholder={"Enter A Title"} text={props.card.title} defaultValue={props.card.title} button={"Set Title"} />
                    </div>
                </div>
                <div className="cardInfo-box">
                    <div className="cardInfoMiniBox titleBox">
                        <AiOutlineUnorderedList size={30} />
                        Description
                    </div>
                    <div className="box">
                        <Editable onSubmit={(e) => setNewCard({ ...newCard, desc: e })} placeholder={"Enter A Description"} text={props.card.desc} defaultValue={props.card.desc} button={"Set Description"} />
                    </div>
                </div>
                <div className="cardInfo-box">
                    <div className="cardInfoMiniBox titleBox">
                        <BsCalendarDate size={29} />
                        Date
                    </div>
                    <div className="box">
                        <input type="date" onChange={(e) => setNewCard({ ...newCard, date: new Date(e.target.value).toISOString().substring(0, 10) })} defaultValue={date} />
                    </div>
                </div>
                <div className="cardInfo-box">
                    <div className="cardInfoMiniBox titleBox">
                        <BsTag size={30} />
                        Labels
                    </div>
                    <div className="labels">
                        {props.card?.labels?.map((item, index) => (
                            <Chip isClose onClose={() => removeLabel(index)} key={index} text={item.text} color={item.color} />
                        ))}
                    </div>
                    <div className="color-labels">
                        {colors.map((color, index) => <li onClick={() => setChooseColor(color)} key={index} style={{ background: color }} className={color === chooseColor && "active"} />)}
                    </div>
                    <div className="box">
                        <Editable onSubmit={(value) => addLabel(value, chooseColor)} placeholder={"Enter A Label"} text={"Add Label"} button={"Add Label"} />
                    </div>
                </div>
                <div className="cardInfo-box">
                    <div className="cardInfoMiniBox titleBox">
                        <IoMdCheckboxOutline size={30} />
                        Tasks
                    </div>
                    <div className="taskBar">
                        <div className={`tasks ${calculateWidth() == "100" && "full"}`} style={{ width: calculateWidth() + "%" }} />
                    </div>
                    <div className="tasks-Container">
                        {props.card.tasks.map((task) => {
                            return (
                                <div key={task.id} className="taskContainer">
                                    <div className="taskCheckBox">
                                        <input type="checkbox" onChange={(e) => updateTask(task.id, e.target.checked)} defaultValue={task.completed} />
                                        <h4 style={{ cursor: 'default' }}>{task.text}</h4>
                                    </div>
                                    <BiSolidTrashAlt onClick={() => removeTask(task.id)} size={25} cursor={'pointer'} />
                                </div>
                            )
                        })}
                    </div>
                    <div className="box">
                        <Editable onSubmit={(value) => addTask(value)} placeholder={"Enter A Task"} text={"Add Task"} button={"Add Task"} />
                    </div>
                </div>
            </Modal>
        </div>
    )
}
