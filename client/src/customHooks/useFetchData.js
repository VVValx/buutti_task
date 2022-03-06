import { useEffect, useState } from "react";
import Axios from "../services/Axios";

function useFetchData(url, apiCallSuccess) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const { data } = await Axios.get(url);
        setData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    getData();
  }, [url, apiCallSuccess]);

  return { data, loading };
}

export default useFetchData;
