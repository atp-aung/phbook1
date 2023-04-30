const AddForm = ({ addPrs, newName, newPh, hdNameChg, hdPhChg }) => {
  return (
    <>
      <h3>Phonebook</h3>
      <form onSubmit={addPrs}>
        <div>
          name: <input value={newName} onChange={hdNameChg} />
        </div>
        <div>
          number:{" "}
          <input placeholder="091234" onChange={hdPhChg} value={newPh} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default AddForm;
