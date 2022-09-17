import { useEffect, useRef, useState } from "react";

import Problemsets from "../shared/Problemsets.js";
import UserScores from "./UserScores.js";

function TableBody({ Users }) {
    let TableBody = Users.map((user, i) => {
        return (
            <div className="grid grid-flow-col gap-0 border-t p-10" id={user.id} key={user.id}>
                <UserScores User={user}/>
            </div>
        );
    });

    return <div>{TableBody}</div>;
}

export default TableBody;
