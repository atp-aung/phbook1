const Filter = (p) => {
  return (
    <>
      <h3>Name Search</h3>
      <div>
        filter for name: <input onChange={p.hdFiltChg} />
      </div>
    </>
  );
};

export default Filter;
