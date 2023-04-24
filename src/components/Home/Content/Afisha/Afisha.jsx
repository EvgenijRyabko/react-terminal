import axios from "axios";
import React from "react";
import { useState, useEffect, useCallback } from "react";

const Afisha = ({terminalId}) => {
    const [data, setData] = useState([]);

    const formatDate = useCallback((date) => {
        return new Date(date).toISOString()
            .replace(/T/, ' ')      // replace T with a space
            .replace(/\..+/, '')    // delete the dot and everything after
    }, []);

    const deleteAfisha = useCallback(async (id) => {
        try{
            const res = await axios({
                method: 'delete',
                url: `http://localhost:8080/api/terminal/afisha/del/${id}`
            });

            return res.data;
        }catch(e){
            console.log(new Error(e).message);
        }
    }, []);

    const getAfishes = useCallback(async ()=>{
        const res = await axios({
            method: 'get',
            url: `http://localhost:8080/api/terminal/afisha/getBy/${terminalId}`
        });

        return res.data;
    }, [terminalId]);

    useEffect(() => {
        if (terminalId){
            (async () => {
                const data = await getAfishes();

                setData(data);
            })();
        }
    }, [terminalId]);

    const onDelete = async (id) => {
        await deleteAfisha(id);

        const data = await getAfishes();

        setData(data);
    }

    return (
        <tbody>
            {
                data.map(el => 
                        <tr key={el.id}>
                            <td>{el.path_url}</td>
                            <td>{formatDate(el.date_crt)}</td>
                            <td>
                                <button 
                                    className="rounded-[6px] w-[100px] h-[30px] bg-rose-600 text-white font-semibold"
                                    onClick={()=>{onDelete(el.id)}}>
                                    Remove
                                </button>
                            </td>
                        </tr>)
            }
        </tbody>
    )
}

export default Afisha;