import React, { useState } from 'react';

export const UpdateContext = React.createContext('');

const Context = ({ children }) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');


    const fetchData = (Title, Description) => {
        console.log(Title);
        console.log(Description);

        setTitle(Title)
        setDesc(Description)
    };



    return (
        <div>
            <UpdateContext.Provider value={{ title, setTitle, desc, setDesc, fetchData }}>
                {children}
            </UpdateContext.Provider>
        </div>
    );
};

export default Context;
