import imgs from '../imgs'

function LazyLoadV4() {
  return (
    <>
      {imgs.map(img => (
        <img
          key={img}
          src={img}
          loading="lazy"
          alt=""
        />
      ))}
    </>
  );
}

export default LazyLoadV4;
