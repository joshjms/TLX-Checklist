import { useEffect, useRef, useState } from "react";
import "./App.css";

import Users from "./shared/Users.js";
import Problemsets from "./shared/Problemsets.js";

import TableBody from "./components/TableBody";

let userList = Users.slice();

console.log(userList);
let userSorted = [];

function App() {
    const [users, setUsers] = useState(userList);
    const [search, setSearch] = useState("");

    let TableHead = Problemsets.map((problemset) => {
        return (
            <>
                <>
                    <div
                        className="px-10 py-5 text-center"
                        style={{
                            gridColumn: `span ${problemset.problems.length}/span ${problemset.problems.length}`,
                            width: `${problemset.problems.length}00px`,
                            backgroundColor: 'rgb(42,48,60)',
                        }}
                    >
                        {problemset.name}
                    </div>
                    {problemset.problems.map((problem) => {
                        return (
                            <div className="w-[100px] px-10 py-5" style={{backgroundColor: 'rgb(42,48,60)'}}>
                                {problem.name}
                            </div>
                        );
                    })}
                </>
            </>
        );
    });

    useEffect(() => {
        userList.forEach((e) => (e.total = 0));
    }, []);

    const onUpdateScores = (i, v) => {
        let newUsers = userList.slice();
        newUsers[i].total = v;
        userList = [...newUsers];
        userSorted = [...userList].sort((a, b) => {
            return b.total - a.total;
        });
        setUsers(
            userSorted.filter((user) => {
                return user.name.toLowerCase().startsWith(search.toLowerCase());
            })
        );
    };

    return (
        <>
            <h1 className="text-5xl text-center my-10 font-bold">Scoreboard</h1>
            <div className="form-control w-[40%] m-auto">
                <div className="input-group m-auto">
                    <input
                        type="text"
                        placeholder="Search…"
                        className="input input-bordered w-full"
                        onChange={(e) => {
                            setSearch(e.target.value);
                            console.log(e.target.value);
                            let filteredUsers = userSorted.filter((user) => {
                                return user.name.toLowerCase().startsWith(e.target.value.toLowerCase());
                            });
                            setUsers(filteredUsers.slice());
                        }}
                    />
                    <button className="btn btn-square">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="mx-[10%] my-10 max-h-[1000px] overflow-scroll">
                <div className="grid grid-flow-col gap-0 sticky top-0" style={{backgroundColor: 'rgb(42,48,60)'}}>
                    <div className="row-span-2 w-[400px] text-center m-auto" >Name</div>
                    <div className="row-span-2 w-[150px] text-center m-auto">Total</div>
                    {TableHead}
                </div>
                <div className="grid grid-flow-col gap-0">
                    <TableBody Users={users} ChangeTotal={onUpdateScores} />
                </div>
            </div>
        </>
    );
}

export default App;
