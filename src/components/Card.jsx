import React, { useState } from "react";

function Card({ data, deleteCard, editCardStatus }) {
  const datetime = new Date(data.createdAt).toLocaleString();

  const [showMore, setShowMore] = useState(false);

  const limitString = (str) => {
    if (str.length > 200)
      return { string: str.slice(0, 197).concat("..."), addButton: true };
    else return { string: str, addButton: false };
  };

  return (
    <div className="card">
      <div className="close" onClick={() => deleteCard(data._id)}>
        X
      </div>
      <h3>{data.title}</h3>
      <p>{datetime + " hs"}</p>
      <p>{data.user.userName}</p>
      <button
        className={data.status.toLowerCase()}
        type="button"
        onClick={() => editCardStatus(data)}
      >
        {data.status}
      </button>
      <button className={data.importance.toLowerCase()} type="button">
        {data.importance}
      </button>
      {!showMore ? (
        <>
          <p>{limitString(data.description).string}</p>
          {limitString(data.description).addButton && (
            <button
              type="button"
              onClick={() => {
                setShowMore(!showMore);
              }}
            >
              Ver Mas
            </button>
          )}
        </>
      ) : (
        <>
          <p>{data.description}</p>
          <button
            type="button"
            onClick={() => {
              setShowMore(!showMore);
            }}
          >
            Ver Mas
          </button>
        </>
      )}
    </div>
  );
}

export default Card;
