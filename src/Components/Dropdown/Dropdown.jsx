import './Dropdown.css';

export const Dropdown = (props) => {
    return (
        <div className='dropdown'>
            {props.children}
        </div>
    )
}

export default Dropdown