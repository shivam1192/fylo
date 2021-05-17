import React, { useContext,useState,useEffect } from 'react';
import { Container, Row,Col, Card, Button, Modal,Table } from 'react-bootstrap';
import InfiniteScroll from "react-infinite-scroll-component";
import { DataContext } from '../Context/DataContext';
import '../App.css';
import { BiUpArrowAlt } from "react-icons/bi";

const ShowQuestion = () =>{
   const columns = [
     { dataField: 'bank_id', text: 'bank_id' },
       { dataField: 'ifsc', text: 'ifsc' },
       { dataField: 'branch', text: 'branch'},
       { dataField: 'city', text: 'city'},
       { dataField: 'district', text: 'district'},
       { dataField: 'state', text: 'state'},
       { dataField: 'address', text: 'address'}
     ];



    const [city,setCity] = useState('BANGALORE')
      const [dataset,setDataset] = useState([])
      const [searchData,setSearchdata] = useState('bangalore')
      const [pages,setPage] = useState(1)
      const [counts,setCount] = useState(5)
      useEffect(()=>{
        const fun = async() => {
            fetch('https://apiservies.herokuapp.com/api/branches?q='+city+'&limit='+counts+'&offset='+(pages-1)*counts)
            .then(response => response.json())
            .then(dataset2 => setDataset(dataset2)) //setData([...dataset2,...dataset.items])
        }
        fun()
      },[])

      const handleSubmit=(event)=>{
          console.log(event.target.value);
          setDataset([])
          const fun = async() => {
              fetch('https://apiservies.herokuapp.com/api/branches?q='+event.target.value+'&limit='+counts+'&offset='+(pages-1)*counts)
              .then(response => response.json())
              .then(dataset2 => setDataset(dataset2))  //setData([...dataset2,...dataset.items])
          }
          fun()
          setCity(event.target.value)
      }
      const handleLimit=(event)=>{
          console.log(event.target.value);
          const fun = async() => {
              fetch('https://apiservies.herokuapp.com/api/branches?q='+city+'&limit='+event.target.value+'&offset='+(pages-1)*counts)
              .then(response => response.json())
              .then(dataset2 => setDataset(dataset2))  //setData([...dataset2,...dataset.items])
          }
          fun()
          setCount(event.target.value)
      }
      const handleNext=()=>{
          const fun = async() => {
              fetch('https://apiservies.herokuapp.com/api/branches?q='+city+'&limit='+counts+'&offset='+(pages)*counts) //0-5 1, 5-10 2
              .then(response => response.json())
              .then(dataset2 => setDataset(dataset2))  //setData([...dataset2,...dataset.items])
          }
          fun()
          setPage(pages+1)
      }
      const handlePrevious=()=>{
          const fun = async() => {
              fetch('https://apiservies.herokuapp.com/api/branches?q='+city+'&limit='+counts+'&offset='+(pages-2)*counts)
              .then(response => response.json())
              .then(dataset2 => setDataset(dataset2))  //setData([...dataset2,...dataset.items])
          }
          fun()
          setPage(pages-1)
      }
      const handleChange=(e)=>{
           setSearchdata(e.target.value)
       }
       const dynamic = dataset.filter(d=>{
          console.log(d.city.toLowerCase().indexOf(''));
           return (d.city.toLowerCase().indexOf(searchData) !==-1 || d.bank_id.indexOf(searchData) !==-1 || d.ifsc.indexOf(searchData) !==-1 || d.branch.indexOf(searchData) !==-1 || d.district.indexOf(searchData) !==-1 || d.state.indexOf(searchData) !==-1 || d.address.indexOf(searchData) !==-1)
       })
      // .rowC{display:flex; flex-direction:row;}
    return(
        <>
        <div>
        <form onChange={handleSubmit}>
         <label>
           Select the City:
           <select value={city}>
             <option value="PUNE">PUNE</option>
             <option value="BANGALORE">BANGALORE</option>
             <option value="MUMBAI">MUMBAI</option>
             <option value="NAGPUR">NAGPUR</option>
             <option value="DEHRAHDUN">DEHRAHDUN</option>

           </select>
         </label>
       </form>
       <div style={{float: 'right'}}>
       <input type="text" value={searchData} placeholder="Search" className="mr-sm-2" onChange={handleChange}/>
       </div>
       </div>
       {dataset.length ?
         <>
         <Table striped bordered hover>
           <thead>
             <tr>
               <th>bank_id</th>
               <th>branch</th>
               <th>city</th>
               <th>district</th>
               <th>state</th>
               <th>IFSC</th>
               <th>address</th>
             </tr>
           </thead>
           <tbody>
           {
              dataset.map((item, key)=>{
                return (
                  <tr>
                  <td>{item.bank_id}</td>

                    <td>{item.branch}</td>
                    <td>{item.city}</td>
                    <td>{item.district}</td>
                    <td>{item.state}</td>
                    <td>{item.ifsc}</td>
                    <td>{item.address}</td>

                  </tr>
                )
              })
            }
           </tbody>
         </Table>
         <div>
         <form onChange={handleLimit}>
          <label> Limit per page
            <select value={counts}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </label>
        </form>
        <div style={{float: 'right'}}>
              {pages==1?<><Button disabled onClick={handlePrevious}>Previous</Button>{pages}<Button onClick={handleNext}>Next</Button></>:<><Button onClick={handlePrevious}>Previous</Button>{pages}<Button onClick={handleNext}>Next</Button></>}
          </div>
        </div>
         </>
         :<>Loading...</> }

        </>
    )
}
export default ShowQuestion;
