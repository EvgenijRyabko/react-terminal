import React from "react";
import Afisha from "./Afisha/Afisha";

const Content = ({terminalId}) => {
    return (
            <table>
                <thead>
                    <tr>
                        <td>File name</td>
                        <td>Creation date</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <Afisha terminalId={terminalId} />
            </table>
    )
}

export default Content;