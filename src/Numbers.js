const Numbers = (p) => {
  const pOri = p.shNaNum.map((ob, i) => {
    return (
      <p key={i}>
        {ob.name}: {ob.number}
        <button onClick={p.delPers(ob.id, ob.name)}>delete</button>
      </p>
    );
  });

  const filted = p.shNaNum
    .filter((ob) => ob.name.toLowerCase().includes(p.filBox))
    .map((obb, i) => (
      <p key={i}>
        {obb.name}: {obb.number}
        <button onClick={p.delPers(obb.id, obb.name)}>delete</button>
      </p>
    ));

  const showOpt = p.filBox === "" ? pOri : filted;

  return (
    <>
      <h3>Persons</h3>
      <div>{showOpt}</div>
    </>
  );
};

export default Numbers;
