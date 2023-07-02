import { useState } from 'react';
import './Editable.css'
import { ImCross } from 'react-icons/im';

export const Editable = (props) => {
    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);
    return (
        <div className='editable'>
            {open ?
                (<form onSubmit={(event) => {
                    if (inputValue === "") return;
                    event.preventDefault();
                    props.onSubmit(inputValue);
                    setOpen(false);
                }}>
                    <input autoFocus defaultValue={props.defaultValue || ""} onChange={(e) => setInputValue(e.target.value)} type="text" placeholder={props.placeholder || "Enter Title"} />
                    <div className="editable_footer">
                        <button type="submit" onClick={props.add && props.Add()}>{props.button || "Add"}</button>
                        <ImCross cursor={'pointer'} onClick={() => setOpen(false)} size={17} />
                    </div>
                </form>)
                :
                <p onClick={() => setOpen(true)}>{props.text || "Add Item"}</p>
            }
        </div>
    )
}
