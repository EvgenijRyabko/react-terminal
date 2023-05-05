import React from 'react';
import classes from './ContentTable.module.css';

function ContentTable({ headers, dataArray, keys, deleteHandler = (f) => f }) {
  if (headers.length !== keys.length) return <div>Error to load table</div>;

  return (
    <div className="px-2 min-w-full">
      <table className={classes.contentTable}>
        <thead>
          <tr>
            {headers.map((el, id) => (
              <th key={id}>{el}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataArray.map((el) => (
            <tr key={el.id}>
              {[...keys].map((key, id) => (
                <td>{el[keys[id]]}</td>
              ))}
              <td>
                <button
                  type="button"
                  className="rounded-[6px] w-[100px] h-[30px] bg-rose-600 text-white font-semibold"
                  onClick={() => {
                    deleteHandler(el.id);
                  }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContentTable;