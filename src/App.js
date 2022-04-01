import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Axios from 'axios' 
import axios from 'axios';


function App() {
 const [name,setName] = useState('')
 const [age,setAge] = useState(0)
 const [country,setCountry] = useState('')
 const [position,setPosition] = useState('')
 const [wage,setWage] = useState(0)

 const [employeeList, setEmployeeList] = useState([])
 const [newWage,setNewWage] = useState(0)

 const addEmployee= ()=> {
   Axios.post('http://localhost:3001/create',{ 
     name: name,
     age: age,
     country: country,
     position: position,
     wage: wage
   }).then(()=>{
     setEmployeeList([...employeeList, {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage
     },])
   })
 }

 const getEmployees = ()=>{
   Axios.get('http://localhost:3001/employees').then((response)=> {
     setEmployeeList(response.data)
   })
 }

 const updateEmployeeWage = (id)=>{
   Axios.put('http://localhost:3001/update', {
     wage: newWage,
     id:id
   }).then(res => {
     console.log('updated')
     setEmployeeList(employeeList.map((value)=>{
       return value.id == id ? {name:value.name,age:value.age,country:value.country,position:value.position,wage:newWage} : value 
     }))
   })
 }

 const deleteEmployee = (id)=> {
   Axios.delete(`http://localhost:3001/delete/${id}`)
   .then(res =>{
     setEmployeeList(employeeList.filter((val)=>{
       return val.id != id 
     }))
   })
 }

  return (
    <div className="App">
      <Header />
      <div className='info-container'>
      <div className="information">
        <div className="input-box">
        <label>Name</label>
        <input type="text" onChange={(event)=>{setName(event.target.value)}}></input>
        </div>
        <div className="input-box">
        <label>Age</label>
        <input type="number" onChange={(event)=>{setAge(event.target.value)}}></input>
        </div>
        <div className="input-box">
        <label>Country</label>
        <input type="text" onChange={(event)=>{setCountry(event.target.value)}}></input>
        </div>
        <div className="input-box">
        <label>Position</label>
        <input type="text" onChange={(event)=>{setPosition(event.target.value)}}></input>
        </div>
        <div className="input-box">
        <label>Wage (per year)</label>
        <input type="text" onChange={(event)=>{setWage(event.target.value)}}></input>
        </div>
        <div className="input-box">
          <button onClick={addEmployee}>Add Employee</button>
        </div>
      </div>
      </div>

      <div className='ShowEmployeessection'>
        <div className='btnContainer'>
        <button onClick={getEmployees}>ShowEmployees</button>
        </div>
        {employeeList.map((value,key)=>{
            return <ul className='employeesInfo'>
            <li>{'Name : ' + value.name}</li>
            <li>{'Age : ' + value.age}</li>
            <li>{'Country : ' + value.country}</li>
            <li>{'Position : ' + value.position}</li>
            <li>{'Wage : ' + value.wage}</li>

            <div className='update'>
              <input type="text" placeholder="$......" onChange={(event)=>{setNewWage(event.target.value)}}></input>
              <button onClick={()=>{updateEmployeeWage(value.id)}}>UPDATE WAGE</button> 
            </div>
            <button className="delete" onClick={()=> {deleteEmployee(value.id)}}>DELETE EMPLOYEE</button>
          </ul>
        })}
     
      </div>
      
    </div>
  );
}

export default App;
