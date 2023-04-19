import React from "react";
import Afisha from "./Afisha/Afisha";
import classes from "./Content.module.css";

const Content = ({ terminalId }) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden p-2">
            <table className={classes.contentTable}>
              <thead>
                <tr>
                  <th>File name</th>
                  <th>Creation date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <Afisha terminalId={terminalId} />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
