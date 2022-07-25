import React, { useState } from "react";
import "../styles/card.css";

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
      <button className="close" onClick={() => deleteCard(data._id)}>
        X
      </button>
      <h3>{data.title}</h3>
      <p>
        <span>{datetime + " hs"}</span>
      </p>
      <p>{data.user.userName}</p>
      <div>
        <button
          className={
            data.status === "IN PROGRESS"
              ? "in_progress"
              : data.status.toLowerCase()
          }
          type="button"
          onClick={() => editCardStatus(data)}
        >
          {data.status}
        </button>
        <button className={data.importance.toLowerCase()} type="button">
          {data.importance}
        </button>
      </div>

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
            Ver Menos
          </button>
        </>
      )}
    </div>
  );
}

export default Card;
