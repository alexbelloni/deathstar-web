import { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import Button from '../components/ColorButton';
import Option from '../components/Option';
import DataSender from '../api/DataSender';
import styled from 'styled-components'
import { UserContext } from '../context';

const Styled = styled.div`
.page {
    padding: 10px 15px;
    display: flex;
    flex-direction: column;
    color: var(--text-light-color);
}

.warning {
    padding: 10px 0;
    display: flex;
    align-items: center;
}

.warning>* {
    margin-right: 10px;
}

.question {
    display: flex;
    padding: 10px 0;
    font-size: 22px;
}

.number {
    font-weight: bolder;
    min-width: 40px;
}

.options {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
}

.buttons {
    display: flex;
    justify-content: center;
}

@media (min-width: 600px){
    .page{
        padding: 10px 100px;
    }
}

@media (min-width: 1100px){
    .page{
        padding: 10px 200px;
    }
}

`

const Questions = (props) => {
    const context = useContext(UserContext);

    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState("");
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState();
    const [selectedAnswerIndexes, setSelectedAnswerIndexes] = useState([]);

    const token = context && context.user && context.user.token;

    useEffect(() => {
        setLoading(true);

        DataSender({
            token,
            route: `questions`,
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => {
                setQuestions(res);
                if (res.length > 0) {
                    setCurrentQuestion(res[0]);
                }
                setLoading(false);
            })
            .catch(e => {
                setError(e.message);
                setLoading(false);
            });
    }, [token]);

    function handleDone(e, order) {
        if (order >= questions.length - 1) {
            setRedirect("/profile");
        } else {
            setCurrentQuestion(questions[order + 1]);
            setSelectedAnswerIndexes([]);
        }
    }

    return !token ? <Redirect to='/' />
        : redirect ? <Redirect to={redirect} />
            : (
                <Styled>
                    <section className="page questions">
                        {loading ? <i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
                            : (
                                <>
                                    <div className="warning">
                                        <span className="fa fa-exclamation-triangle"></span>
                                        <span>It's an valid answer seleting all options or nothing.</span>
                                    </div>
                                    <div className="question">
                                        <span className="number">{currentQuestion && currentQuestion.order + 1} - </span>
                                        <span className="description">{currentQuestion && currentQuestion.title}</span>
                                    </div>
                                    <article className="options">
                                        {currentQuestion && currentQuestion.answers.map((option, i) => {
                                            return <Option key={i} optionId={i} caption={option.title} selected={selectedAnswerIndexes.some(a => a === i)} onSelect={id => {
                                                const arr = selectedAnswerIndexes.slice(0)
                                                const index = arr.findIndex(a => a === id);
                                                if (index > -1) {
                                                    arr.splice(index, 1);
                                                } else {
                                                    arr.push(i);
                                                }
                                                setSelectedAnswerIndexes(arr);
                                            }}></Option>
                                        })}
                                    </article>
                                    <article className="buttons">
                                    <Button caption="Done" click={e => handleDone(e, currentQuestion && currentQuestion.order)} />
                                    </article>
                                </>
                            )}
                        {error && <p>{error.toUpperCase()}</p>}
                    </section>
                </Styled>
            );
}

export default Questions;