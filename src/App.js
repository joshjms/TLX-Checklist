import { useEffect, useRef, useState } from "react";
import "./App.css";

import Users from "./shared/Users.js";
import Problemsets from "./shared/Problemsets.js";

import TableBody from "./components/TableBody";

function App() {
    const [users, setUsers] = useState(Users);
    const [search, setSearch] = useState("");

    let TableHead = Problemsets.map((problemset) => {
        return (
            <>
                <>
                    <div
                        className=""
                        style={{
                            gridColumn: `span ${problemset.problems.length}/span ${problemset.problems.length}`,
                        }}
                    >
                        {problemset.name}
                    </div>
                    {problemset.problems.map((problem) => {
                        return (
                            <div className="w-[100px] pt-10">
                                {problem.name}
                            </div>
                        );
                    })}
                </>
            </>
        );
    });

    const UpdateScores = (i, v) => {
        let newUsers = users.slice();
        newUsers[i] = v;
        
    }

    return (
        <div className="mx-[10%] my-10 overflow-x-scroll">
            <h1 className="text-5xl text-center my-10 font-bold">Scoreboard</h1>
            <div className="form-control">
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Search…"
                        className="input input-bordered w-full max-w-xs"
                        onChange={(e) => {
                            setSearch(e.target.value);
                            let filteredUsers = Users.filter((user) => {
                                return user.handle.startsWith(e.target.value);
                            });
                            setUsers(filteredUsers);
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
            <div className="grid grid-flow-col gap-0 p-10">
                <div className="row-span-2 w-[300px]">Handle</div>
                <div className="row-span-2 w-[100px]">Total</div>
                {TableHead}
            </div>
            <div className="grid grid-flow-col gap-0">
                <TableBody Users={users} />
            </div>
        </div>
    );
}

export default App;
