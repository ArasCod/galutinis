import { createContext, useEffect, useReducer } from "react";

const QuestionsContext = createContext();

const QuestionsActionTypes = {
    get_all: 'get all the questions from data',
    add: 'add a new one question',
    delete: 'remove one specific question',
    edit: 'edit one specific question'
};

const reducer = (state, action) => {
    switch(action.type){
        case QuestionsActionTypes.get_all:
            return action.data;
        case QuestionsActionTypes.add:
            fetch(`http://localhost:8080/Klausimai`, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(action.data)
            });
            return [...state, action.data];
        case QuestionsActionTypes.delete:
            fetch(`http://localhost:8080/Klausimai/${action.id}`, {method: "DELETE"});
            return state.filter(el => el.id.toString() !== action.id.toString());
        case QuestionsActionTypes.edit:
            fetch(`http://localhost:8080/Klausimai/${action.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(action.data)
            });
            return state.map(el => {
                if(el.id == action.id){
                    return {
                        id: action.id,
                        ...action.data
                    }
                } else {
                    return el;
                }
            });
        default:
            console.log("Error: action type not found", action.type);
            return state
    }
}

const QuestionsProvider = ({ children }) => {

    const [questions, setQuestions] = useReducer(reducer, []);
    
    useEffect(() => {
        fetch(`http://localhost:8080/Klausimai`)
            .then(res => res.json())
            .then(data => setQuestions({
                type: QuestionsActionTypes.get_all,
                data: data
            }));
    }, []);

    return(

        <QuestionsContext.Provider
            value={{
                questions,
                setQuestions,
                QuestionsActionTypes
            }}
        >
            { children }
        </QuestionsContext.Provider>
    );
}

export { QuestionsProvider, QuestionsActionTypes };
export default QuestionsContext;