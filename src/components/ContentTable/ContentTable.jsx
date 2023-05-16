import React from 'react';
import trashIcon from '../../assets/trashIcon.svg';
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
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          {dataArray.map((el) => (
            <tr key={el.id}>
              {[...keys].map((key, id) => (
                <td key={id} className="min-w-[300px]">
                  {el[keys[id]]}
                </td>
              ))}
              <td>
                <button
                  type="button"
                  className="grid min-w-[100px]"
                  onClick={() => {
                    deleteHandler(el.id);
                  }}
                >
                  <img
                    className="h-[calc(30px+1vw)] justify-self-center"
                    src={trashIcon}
                    alt="delete"
                  />
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
