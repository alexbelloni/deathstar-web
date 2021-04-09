import './Questions.css';
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Button from '../components/Button';
import Arrow from '../components/Arrow';
import DataSender from '../api/DataSender';

const Questions = (props) => {
    const [loggedUser] = useState(props.user);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState("");
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState();
    const [selectedAnswerIndexes, setSelectedAnswerIndexes] = useState([]);

    useEffect(() => {
        setLoading(true);

        DataSender({
            token: loggedUser.token,
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
    }, [loggedUser]);

    if (redirect) return <Redirect to={redirect} />
    if (!loggedUser) return <Redirect to="/" />

    function handleClick() {
        setRedirect("login");
    }

    function handleDone(e, order) {
        if (order >= questions.length - 1) {
            setRedirect("profile");
        } else {
            setCurrentQuestion(questions[order + 1]);
        }
    }

    return (
        <section className="page questions">

            <div className="profile">
                <img className="avatar" alt='avatar' src={loggedUser.avatar ||
                    "https://lolfilter.com/files/thumbnails/950142184754388.png"
                } />
                <div className="info">
                    <span className="username">{loggedUser.name}</span>
                    <span className="email">{loggedUser.email}</span>
                    <span className="email">{loggedUser.country}</span>
                </div>
            </div>
            <div className="signout-area">
                <Arrow caption="Profile" click={() => setRedirect('profile')} />
                <Arrow caption="Sign out" click={handleClick} />
            </div>

            <div className="separator"></div>

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
                                return <Button key={i} caption={option.title} selected={selectedAnswerIndexes.some(a => a === i)} click={() => {
                                    const arr = selectedAnswerIndexes.slice(0)
                                    const index = arr.findIndex(a => a === i);
                                    if (index > -1) {
                                        arr.splice(index, 1);
                                    } else {
                                        arr.push(i);
                                    }
                                    setSelectedAnswerIndexes(arr);
                                }}></Button>
                            })}
                        </article>
                        <article className="submit-area">
                            <Button caption="Done" click={e=>handleDone(e, currentQuestion && currentQuestion.order)}></Button>
                        </article>

                    </>
                )}
            <div className="separator"></div>
            {error && <p>{error.toUpperCase()}</p>}
            {props.footer}
        </section>
    );
}

export default Questions;