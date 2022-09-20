import { useEffect, useRef, useState } from "react";

import Problemsets from "../shared/Problemsets.js";

const getMaxScore = (result) => {
    let maxScore = 0;
    let submissions = result.data.page;
    submissions.forEach((submission, i) => {
        maxScore = Math.max(submission.latestGrading.score, maxScore);
    });
    return maxScore;
};

function UserScores({ User, ChangeTotal }) {
    let Score = new Array(0).fill(0);

    const [scores, setScores] = useState(Score);
    const [totalScore, setTotalScore] = useState(0);

    const getSubmission = async function (username, problemJid, page, i) {
        const url = `https://api.tlx.toki.id/v2/submissions/programming?page=${page}&problemJid=${problemJid}&username=${username}`;
        await fetch(url)
            .then((response) => response.json())
            .then((data) => {
                let maxScore = getMaxScore(data);
                updScore(i, maxScore);
            });
    };

    const updScore = (i, v) => {
        Score[i] = v;
        setScores(Score.slice());
    };

    useEffect(() => {
        let index = 0;
        Problemsets.forEach((problemset, i) => {
            problemset.problems.forEach((problem, j) => {
                getSubmission(User.handle, problem.jid, 1, index++);
            });
        });
    }, []);

    useEffect(() => {
        let Total = 0;
        scores.forEach((s, i) => {
            Total += s;
        });
        setTotalScore(Total);
        console.log(User.id);
        console.log(Total);
        ChangeTotal(User.id, Total);
    }, [scores]);

    return (
        <>
            <div className="w-[400px] p-10">{User.name}</div>
            <div className="w-[150px] text-center p-10"><strong>{totalScore}</strong></div>
            {scores.map((score, i) => (
                <div className="w-[100px] text-center p-10" id={i} key={i} style={{backgroundColor: (score === 100 ? 'rgb(44, 186, 0)' : score >= 80 ? 'rgb(163, 255, 0)' : score >= 50 ? 'rgb(255, 244, 0)' : score >= 30 ? 'rgb(255, 167, 0)' : 'rgb(255, 0, 0)')}}>
                    <p style={{color: 'black'}}>{score}</p>
                </div>
            ))}
        </>
    );
}

export default UserScores;
