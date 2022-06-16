import { useEffect, useState } from "react";
import "./App.css";
import Modal from "./components/Modal";
import { CSSTransition } from "react-transition-group";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function App() {
  const [selectID, setSelectID] = useState("");
  const [arrayDBActive, setArrayDBActive] = useState([]);
  const [selectPack, setSelectPack] = useState("1");

  const [arrayPacks, setArrayPacks] = useState([]);

  useEffect(() => {
    const searchPath = (number) => {
      try {
        return require(`./pack_${number}/db.json`);
      } catch (err) {
        return false;
      }
    };
    let arr = [];
    for (let i = 1; i <= 20; i++) {
      let n = searchPath(i);
      if (n) {
        arr.push(i);
      }
      // else {
      //   break;
      // }
    }
    setArrayPacks(arr);
  }, []);

  return (
    <div className="App">
      <section id="header">
        <div className="container header">
          <span>siGame</span>
        </div>
      </section>

      <section id="main">
        <div className="container main">
          {arrayPacks && (
            <Tabs>
              <div class="nav_tabs">
                <TabList>
                  {arrayPacks.map((tabs, index) => (
                    <Tab key={index} onClick={() => setSelectPack(tabs)}>
                      Пак {tabs}
                    </Tab>
                  ))}
                </TabList>
                <div
                  className="tab_clear"
                  onClick={() =>
                    setArrayDBActive(
                      arrayDBActive.filter((n) => {
                        return n.indexOf(`${selectPack}_`) === -1;
                      })
                    )
                  }
                >
                  Сбросить
                </div>
              </div>
              {arrayPacks.map((tab, index) => (
                <TabPanel key={index}>
                  {require(`./pack_${tab}/db.json`).map((prev) => (
                    <div
                      className={
                        arrayDBActive.filter(
                          (el) => el === `${selectPack}_${prev.id}`
                        ).length
                          ? "card-item active"
                          : "card-item"
                      }
                      onClick={() => {
                        setSelectID(prev.id);
                      }}
                      key={prev.index}
                    >
                      {prev.id}
                    </div>
                  ))}
                </TabPanel>
              ))}
            </Tabs>
          )}
        </div>
      </section>

      <CSSTransition
        in={selectID ? true : false}
        timeout={500}
        classNames="example"
      >
        <Modal
          setArrayDBActive={setArrayDBActive}
          arrayDBActive={arrayDBActive}
          selectID={selectID}
          setSelectID={setSelectID}
          path={`pack_${selectPack}`}
          selectPack={selectPack}
        />
      </CSSTransition>
    </div>
  );
}

export default App;
