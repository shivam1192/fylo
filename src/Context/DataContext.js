import React,{createContext,useState,useEffect} from 'react';

export const DataContext = createContext()

const DataContextProvider = (props) => {
    const [data,setData] = useState([])
    const [page,setPage] = useState(1)
    const [searchData,setSearchdata] = useState('');
    useEffect(()=>{
        const fun = async() => {
            fetch('https://api.stackexchange.com/2.2/questions?order=desc&sort=hot&site=stackoverflow&page='+page)
            .then(response => response.json())
            .then(datas => setData([...data,...datas.items]));
        }
        fun()
    },[page])

    return ( 
        <DataContext.Provider value={{data,setData:setData,page,setPage:setPage,searchData,setSearchdata:setSearchdata}}>
           {props.children}
        </DataContext.Provider>
     );
}
 
export default DataContextProvider;
