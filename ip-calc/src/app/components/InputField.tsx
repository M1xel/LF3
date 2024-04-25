import React, { useState } from "react";

interface InputFieldProps {
    content: string;
    maxLength: number; 
}

const InputField = ({content, maxLength}: InputFieldProps) => {
    const [value, setvalue] = useState("") 

    return (
        <div>
            <label> Input {content}:</label>
            <input id={`${content}-input-field`} maxLength={maxLength} value={value} onChange={(changeValue) => setvalue(changeValue.target.value)}></input>
            <label id={`invalid-${content}`}></label>
            <p>{value}</p>
        </div>
    );
};

export default InputField;
