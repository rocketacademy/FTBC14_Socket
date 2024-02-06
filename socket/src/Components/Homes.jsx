import { Link } from "react-router-dom";

function Homes() {
  return (
    <>
      <div>
        <h1>Home</h1>

        <Link to="/chat">Message Room</Link>
        <Link to="/product">Products Room</Link>
      </div>
    </>
  );
}

export default Homes;
