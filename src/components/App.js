import imgs from '../imgs'

function App() {
  return (
    <div className="box">
      {imgs.map(img => (
        <img 
          key={img}
          src={img}
          alt="" 
        />
      ))}
    </div>
  );
}

export default App;
