import { useState, useEffect } from "react";
import prsService from "./services/persons";
import AddForm from "./AddForm";
import Numbers from "./Numbers";
import Filter from "./Filter";

const App = () => {
  const [prs, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPh, setNewPh] = useState("");
  const [filBox, setFilBox] = useState("");

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
        prsService.create(perObj).then((response) => {
          setPersons(prs.concat(response.data));
          setNewName("");
          setNewPh("");
        });
      } else {
        window.alert(`${perObj.name} already exist`);
        setNewName("");
        setNewPh("");
      }
      console.log(prs);
    }
  };

  return (
    <>
      <Filter hdFiltChg={hdFiltChg} />
      <AddForm
        addPrs={addPrs}
        newName={newName}
        newPh={newPh}
        hdNameChg={hdNameChg}
        hdPhChg={hdPhChg}
      />
      <Numbers shNaNum={prs} filBox={filBox} />
    </>
  );
};

export default App;
