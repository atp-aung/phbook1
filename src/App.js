import "./App.css";
import { useState, useEffect } from "react";
import prsService from "./services/persons";
import AddForm from "./AddForm";
import Numbers from "./Numbers";
import Filter from "./Filter";
import Noti from "./Noti";

const App = () => {
  const [prs, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPh, setNewPh] = useState("");
  const [filBox, setFilBox] = useState("");
  const [notiMsg, setNotiMsg] = useState("");
  const [notiFlag, setNotiFlag] = useState("");

  useEffect(() => {
    console.log("effect");
    prsService.getAll().then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  console.log("render", prs.length, "persons");

  const hdNameChg = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value);
  };

  const hdPhChg = (e) => {
    console.log(e.target.value);
    setNewPh(e.target.value);
  };

  const hdFiltChg = (e) => {
    setFilBox(e.target.value);
  };

  const addPrs = (e) => {
    e.preventDefault();
    if (newName === "" || newPh === "") {
      window.alert(`name and ph num are required`);
    } else {
      const perObj = {
        name: newName,
        number: newPh,
      };
      const chkDup = prs.map((f) => f.name).indexOf(perObj.name);
      if (chkDup === -1) {
        prsService
          .create(perObj)
          .then((response) => {
            setPersons(prs.concat(response.data));
            setNotiFlag(1);
            setNotiMsg(`${perObj.name} is added`);
            setTimeout(() => {
              setNotiMsg("");
              setNotiFlag("");
            }, 3000);
            setNewName("");
            setNewPh("");
          })
          .catch((error) => {
            // this is the way to access the error message
            console.log(error.response.data.error);
            setNotiFlag(2);
            setNotiMsg(`rrr ${error.response.data.error}`);
            setTimeout(() => {
              setNotiMsg(null);
              setNotiFlag("");
            }, 5000);
            setNewName("");
            setNewPh("");
          });
      } else {
        if (window.confirm(`${perObj.name} already. sure update num?`)) {
          prsService
            .update(prs[chkDup].id, perObj)
            .then((response) => {
              console.log(response);
              prsService.getAll().then((response) => {
                console.log(response);
                setPersons(response.data);
                setNotiFlag(1);
                setNotiMsg(`number of ${perObj.name} is updated`);
                setTimeout(() => {
                  setNotiMsg(null);
                  setNotiFlag("");
                }, 3000);
                setNewName("");
                setNewPh("");
              });
            })
            .catch((error) => {
              console.log("fail update and already deleted");
              prsService.getAll().then((response) => {
                console.log(response);
                setPersons(response.data);
                setNotiFlag(2);
                setNotiMsg(`${error.response.data.error} ghgjh`);
                setTimeout(() => {
                  setNotiMsg(null);
                  setNotiFlag("");
                }, 5000);
                setNewName("");
                setNewPh("");
              });
            });
        }
      }
      console.log(prs);
    }
  };

  const delPers = (ind, nn) => {
    const delAct = () => {
      if (window.confirm(`Delete ${nn}?`)) {
        prsService
          .delPerson(ind)
          .then((response) => {
            console.log("promise deleted");
            prsService.getAll().then((response) => {
              setPersons(response.data);
              setNotiFlag(1);
              setNotiMsg(`${nn} is deleted`);
              setTimeout(() => {
                setNotiMsg(null);
                setNotiFlag("");
              }, 3000);
            });
          })
          .catch((error) => {
            console.log("fail del");
            setNotiFlag(2);
            setNotiMsg(`${nn} is alerady deleted by other`);
            setTimeout(() => {
              setNotiMsg(null);
              setNotiFlag("");
            }, 5000);
          });
      }
    };
    return delAct;
  };

  return (
    <>
      <Noti notiMsg={notiMsg} notiFlag={notiFlag} />
      <Filter hdFiltChg={hdFiltChg} />
      <AddForm
        addPrs={addPrs}
        newName={newName}
        newPh={newPh}
        hdNameChg={hdNameChg}
        hdPhChg={hdPhChg}
      />
      <Numbers shNaNum={prs} filBox={filBox} delPers={delPers} />
    </>
  );
};

export default App;
