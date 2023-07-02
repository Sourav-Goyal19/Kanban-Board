import { ImCross } from 'react-icons/im';
import './Chip.css';

export const Chip = (props) => {
    return (
        <div className='chip' style={{backgroundColor: props.color}}>
            <p>{props.text}</p>
            {props.isClose ? <ImCross cursor={'pointer'} size={15} onClick={()=>props.onClose()} />:'' }
        </div>
    )
}

export default Chip
