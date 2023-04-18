import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Afisha = ({terminalId}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (terminalId){
            (async ()=>{
                const res = await axios({
                    method: 'get',
                    url: `http://localhost:8080/api/terminal/afisha/getBy/${terminalId}`
                });
    
                setData(res.data);
            })();
        }
    }, [terminalId])

    return (
        <tbody>
            {
                data.map(el => 
                        <tr key={el.id}>
                            <td>{el.path_url}</td>
                            <td>{el.date_crt}</td>
                        </tr>)
            }
        </tbody>
    )
}

export default Afisha;