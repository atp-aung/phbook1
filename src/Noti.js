const Noti = (p) => {
  if (p.notiFlag === 1) {
    return (
      <>
        <p className="notiGood">{p.notiMsg}</p>
      </>
    );
  }
  if (p.notiFlag === 2) {
    return (
      <>
        <p className="notiBad">{p.notiMsg}</p>
      </>
    );
  }
};

export default Noti;
