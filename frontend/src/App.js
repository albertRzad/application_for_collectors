import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const[users, setUsers] = useState(null)

  useEffect(() =>{
    fetchUsers();
  }, [])

  const fetchUsers = async () =>{
      const res = await axios.get("http://localhost:3000/users")
      console.log(res)
  };

  return (
    <div className="App">
        fsdfdsf
    </div>
  );
}

export default App;
