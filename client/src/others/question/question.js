import React, { useState, useEffect } from 'react';
import classes from './question.module.css';
import axios from '../../config/axiosConfig';

const Question = (props) => {

    const [qNo, setQNo] = useState(1);
    const [exp, setExp] = useState([]);
    const [usedTime, setUsedTime] = useState("");
    const [submit, setSubmit] = useState([]);
    const [checkAnswer, setCheckAnswer] = useState([]);
    const [question, setQuestion] = useState({
        question: [
            {
                problem: ""
            }
        ]
    });
    const [timestamp, setTime] = useState("");
    const [correct, setCorrect] = useState(false);
    const [incorrect, setIncorrect] = useState(false);
    const [hints, setHints] = useState("");


    useEffect(() => {
        document.title = "MathX";

        axios({
            method: "GET",
            withCredentials: true,
            url: "/v1/users/auth",
        }).then((res) => {
            if (res.data.isAuthenticated !== true) {
                props.history.push("./login");
            } else {
                axios({
                    method: "GET",
                    withCredentials: true,
                    url: "/v1/exercise/generate",
                }).then((res) => {
                    if (res.data !== null) {
                        setQuestion(res.data.data.question);
                    }
                })
                setExp(exp);
                setSubmit(submit);
                let startTime = Date.now();
                console.log(startTime);
                setTime(startTime);
                setCheckAnswer(checkAnswer);
            }
        })
    }, [props]);

    const onSubmitHandler = () => {
        console.log(timestamp);
        console.log(Date.now());
        let time = Date.now() - timestamp;
        console.log(Math.floor(time / 1000));
        setUsedTime(Math.floor(time / 1000));
        let input = "";
        for (let i = 0; i < exp.length; i++) {
            input += exp[i];
        }

        axios({
            method: "POST",
            withCredentials: true,
            url: "/v1/exercise/auth",
            data: {
                questionId: question._id,
                userInput: input,
                userTime: time
            }
        }).then((res) => {
            if (res.data.correct !== "Correct") {
                setIncorrect(true);
                setCorrect(false);
                splitAnswer(res.data.data);
                setHints(res.data.hints);
                // console.log(res.data.data);
                // console.log(hints);
            } else {
                setIncorrect(false);
                setCorrect(true);
            }
        })
    }

    const splitAnswer = (check) => {
        let boolAnswer = [];
        let j = 0;
        for (let i = 0; i < exp.length; i++) {
            if (exp[i] !== "+" && exp[i] !== "-" && exp[i] !== "=") {
                boolAnswer[i] = check[j];
            } else {
                boolAnswer[i] = check[++j];
                j++;
            }
        }
        setCheckAnswer(boolAnswer);
        console.log(boolAnswer);
    }



    const onClickHandler = (val) => {
        let newCheck = checkAnswer.slice();
        let newExp = exp.slice();
        newCheck.push(true);
        newExp.push(val);
        setCheckAnswer(newCheck);
        setExp(newExp);
        setCorrect(false);
        setIncorrect(false);
    }

    const onClearHandler = () => {
        for (let i = 0; i < checkAnswer.length; i++) {
            checkAnswer[i] = true;
        }
        let newExp = exp.slice();
        newExp.pop();
        setExp(newExp);
        setCorrect(false);
        setIncorrect(false);
    }

    const correctLabel = (
        <React.Fragment>
            <h3 style={{ color: "green", marginTop: "20px" }}>恭喜你，答對了!</h3>
            <h5 style={{ color: "green", marginTop: "20px" }}>你使用了{usedTime}秒完成!</h5>
            <button onClick={() => window.location.reload(false)} style={{ marginTop: "10px" }} className="btn btn-success">繼續</button>
        </React.Fragment>
    );

    const incorrectLabel = (
        <React.Fragment>
            <br></br>
            <h5 style={{ color: "red", marginTop: "20px" }}>{hints}</h5>
        </React.Fragment>
    );


    return (
        <React.Fragment>
            <div className={[classes.cardContainer, "card"].join(" ")}>
                <h5 className={[classes.containerHeader, "card-header"].join(" ")} >
                    題目</h5>
                <div className={[classes.containerBody, "card-body"].join(" ")} >
                    <div className={[classes.containerRow, "row"].join(" ")}>
                        <div className={[classes.card, "card col-md-12"].join(" ")} >
                            <div className="card-body">
                                <h5 className="card-title">{question.question[0].problem}</h5>
                                {exp.map((item, index) => {
                                    let stroke = null;
                                    if (item !== "=") {

                                        if (checkAnswer[index] === true || checkAnswer[index] === null) {
                                            stroke = <button key={"bt" + index} className={[classes.expression, "btn btn-secondary"].join(" ")}>{item}</button>
                                        }
                                        else {
                                            stroke = <button key={"bt" + index} style={{ color: "red", fontWeight: "900" }} className={[classes.expression, "btn btn-secondary"].join(" ")}>{item}</button>
                                        }
                                    } else {
                                        if (checkAnswer[index] === true || checkAnswer[index] === null) {
                                            stroke = (<React.Fragment key={"fr" + index}>
                                                <br key={"br" + index} />
                                                <button key={"btn" + index} className={[classes.expression, "btn btn-secondary"].join(" ")}>{item}</button>
                                            </React.Fragment>
                                            );
                                        }
                                        else {
                                            stroke = (<React.Fragment key={"fr" + index}>
                                                <br key={"br" + index} />
                                                <button key={"btn" + index} style={{ color: "red" }} className={[classes.expression, "btn btn-secondary"].join(" ")}>{item}</button>
                                            </React.Fragment>
                                            );
                                        }
                                    }
                                    return (
                                        <React.Fragment key={index}>
                                            {stroke}
                                        </React.Fragment>
                                    );
                                })}
                                {correct && correctLabel}
                                {incorrect && incorrectLabel}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button
                type="button"
                className={[classes.mathButton, "btn btn-secondary"].join(" ")}
                onClick={() => onClickHandler("1")}>1</button>
            <button
                type="button"
                className={[classes.mathButton, "btn btn-secondary"].join(" ")}
                onClick={() => onClickHandler("2")}>2</button>
            <button
                type="button"
                className={[classes.mathButton, "btn btn-secondary"].join(" ")}
                onClick={() => onClickHandler("3")}>3</button>
            <button
                type="button"
                className={[classes.mathButton, "btn btn-primary"].join(" ")}
                onClick={() => onClickHandler("+")}>+</button>
            <br></br>
            <button
                type="button"
                className={[classes.mathButton, "btn btn-secondary"].join(" ")}
                onClick={() => onClickHandler("4")}>4</button>
            <button
                type="button"
                className={[classes.mathButton, "btn btn-secondary"].join(" ")}
                onClick={() => onClickHandler("5")}>5</button>
            <button
                type="button"
                className={[classes.mathButton, "btn btn-secondary"].join(" ")}
                onClick={() => onClickHandler("6")}>6</button>
            <button
                type="button"
                className={[classes.mathButton, "btn btn-primary"].join(" ")}
                onClick={() => onClickHandler("-")}>-</button>
            <br />
            <button
                type="button"
                className={[classes.mathButton, "btn btn-secondary"].join(" ")}
                onClick={() => onClickHandler("7")}>7</button>
            <button
                type="button"
                className={[classes.mathButton, "btn btn-secondary"].join(" ")}
                onClick={() => onClickHandler("8")}>8</button>
            <button
                type="button"
                className={[classes.mathButton, "btn btn-secondary"].join(" ")}
                onClick={() => onClickHandler("9")}>9</button>
            <button
                type="button"
                className={[classes.mathButton, "btn btn-primary"].join(" ")}
                onClick={() => onClickHandler("=")}>=</button>
            <br></br>
            <button
                type="button"
                className={[classes.mathButton, "btn btn-secondary"].join(" ")}
                onClick={() => onClickHandler("0")}>0</button>
            <button
                type="button"
                className={[classes.mathButton, "btn btn-danger"].join(" ")}
                onClick={() => onClearHandler()}>←</button>
            <button
                type="button"
                className={[classes.mathSubmit, "btn btn-success"].join(" ")}
                onClick={() => onSubmitHandler()}>提交</button>
        </React.Fragment >
    );
};

export default Question;