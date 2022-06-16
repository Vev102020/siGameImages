import React, { useState } from "react";

export default function Modal({
  setSelectID,
  selectID,
  arrayDBActive,
  setArrayDBActive,
  path,
  selectPack,
}) {
  const [active, setActive] = useState(false);

  const tryRequire = (img) => {
    try {
      return require(`../${path}/images/${img}`);
    } catch (err) {
      return null;
    }
  };

  return (
    <>
      {selectID && (
        <section id="modal" className="modal">
          <div className="modal-container">
            {require(`../${path}/db.json`)
              .filter((card) => card.id === selectID)
              .map((el, index) => (
                <div key={index}>
                  <div className="modal-img-contaoner">
                    <img
                      className="modal-img"
                      src={
                        tryRequire(el.img)
                          ? tryRequire(el.img)
                          : require(`../components/no_foto.png`)
                      }
                    />
                  </div>
                  {active && <span className="modal-answer">{el.answer}</span>}
                  {!active && (
                    <button
                      onClick={() => {
                        setActive(true);
                        setArrayDBActive([
                          ...arrayDBActive,
                          `${selectPack}_${selectID}`,
                        ]);
                      }}
                      className="modal-btn"
                    >
                      Показать ответ
                    </button>
                  )}
                </div>
              ))}
            <button
              className="modal-close"
              onClick={() => {
                setSelectID("");
                setActive(false);
              }}
              title="Закрыть"
            />
          </div>
        </section>
      )}
    </>
  );
}
