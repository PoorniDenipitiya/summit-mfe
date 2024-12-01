/*import React from "react";
import Admin from "./screens/admin";
//import "antd/dist/reset.css";


const App = () => {
  return (
    <div>
      <Admin/>
    </div>
  );
};

export default App;
*/

import React, { useEffect, useState } from "react";
import Admin from "./screens/admin";
import { fetchData, postData } from "./services/api"; // Import BFF functions


const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from BFF when the component mounts
    const getData = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handlePostData = async (newData) => {
    console.log("Sending to BFF:", newData);
    try {
      const result = await postData(newData); // Post new data via BFF
      console.log("Response from BFF:", result);
      setData((prevData) => [...prevData, result]); // Update state with new data
    } catch (error) {
      console.error("Error posting data to BFF:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Pass data and handlers to Admin component */}
      <Admin data={data} onPostData={handlePostData} />
    </div>
  );
};

export default App;
