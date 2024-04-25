import React, { useState } from "react";

interface InputFieldProps {
    content: string;
    maxLength: number; 
    providedRegex: RegExp | undefined;
}

const InputField = ({content, maxLength, providedRegex}: InputFieldProps) => {
    const [value, setvalue] = useState("") 

    //Function to check where the given regex as a parameter matches or doesnt match
    const checkRegex = (value: string, regex: RegExp | undefined) => {
        if (regex && !regex.test(value)) {
            return false;
        }
        return true;
    };

    //[Debug] some value printing
    if (checkRegex(value, providedRegex)){
        console.log(content, value);
    }


    return (
        <div>
            <label> Input {content}:</label>
            <input maxLength={maxLength} value={value} onChange={(changeValue) => setvalue(changeValue.target.value)}></input>
            <label>{checkRegex(value, providedRegex) ? '' : 'Invalid input'}</label>
        </div>
    );
};

export default InputField;
