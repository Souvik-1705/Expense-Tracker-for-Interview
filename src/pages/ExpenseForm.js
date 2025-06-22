import React, { useEffect, useState } from 'react';
import "../styles/ExpenseForm.css";

function ExpenseForm() {
    const[amount,setAmount]=useState("");
    const[description,setDescription]=useState("");
    const[category,setCategory]=useState("");
    const[expenses,setExpenses]=useState([]);
    const[editingId,setEditingId]=useState(null);

    const fetchExpenses=async()=>{
        try {
            const res=await fetch("https://expense-tracker-2-76556-default-rtdb.firebaseio.com/expenses.json");
            const data=await res.json();
            if(!data){
                setExpenses([]);
                return;
            }
            const expenseList=Object.keys(data).map((key)=>({
                id:key,
                ...data[key],
            }))
            setExpenses(expenseList);
        } catch (err) {
            console.error("Error fetching expenses:", err);
        }
    };

        useEffect(()=>{
            fetchExpenses();
        },[]);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!amount || !description || !category){
            alert("Please fill all the fields.");
            return;
        }
        const newExpense={
            amount,
            description,
            category
        };
      try {
        if(editingId){
            await fetch(`https://expense-tracker-2-76556-default-rtdb.firebaseio.com/expenses/${editingId}.json`,{
                method:"PUT",
                body:JSON.stringify(newExpense),
                headers:{
                    "Content-Type":"application/json",
                }
            });
            alert("Expense Update Successfully");
            setEditingId(null);
        }else{
            await fetch("https://expense-tracker-2-76556-default-rtdb.firebaseio.com/expenses.json",{
            method:"POST",
            body:JSON.stringify(newExpense),
            headers: {
            "Content-Type": "application/json",
          },
        });
            alert("Expense added successfully");
    }
            setAmount("");
            setCategory("");
            setDescription("");
            fetchExpenses();
        
      } catch (err) {
            console.error("Error adding expense:", err);
      }

    }

    const handleDelete=async(id)=>{
        try {
            await fetch(`https://expense-tracker-2-76556-default-rtdb.firebaseio.com/expenses/${id}.json`,{
                method:"DELETE",
            }
        );
        console.log("Deleted Successfully");
        fetchExpenses();
        } catch (error) {
            console.error("Failed to delete:", error);
        }
    }

    const handleEdit=(expense)=>{
        setAmount(expense.amount);
        setCategory(expense.category);
        setDescription(expense.description);
        setEditingId(expense.id);
    }

  return (
    <div className='expense-container'>
        <h2>Add Expenses</h2>
        <form onSubmit={handleSubmit} className='expense-form'>
            <input type='number' placeholder='Amount' value={amount} onChange={(e)=>setAmount(e.target.value)}/>
            <input type='text' placeholder='Description' value={description} onChange={(e)=>setDescription(e.target.value)}/>
            <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Petrol">Petrol</option>
                <option value="Salary">Salary</option>
                <option value="Travel">Travel</option>
                <option value="Others">Others</option>
            </select>
            <button type='submit'>{editingId? "Update Expense":"Add Expense"}</button>
        </form>
        <div className='expense-list'>
           <h2>All Expenses</h2>
           {expenses.length===0 ?(
            <p>No Expenses added yet.</p>
           ):(
            <ul>
                {expenses.map((expense)=>(
                    <li key={expense.id}>
                        {expense.category}-{expense.description}-₹{expense.amount}
                        <button onClick={()=>handleEdit(expense)} className='edit-btn'>EDIT</button>
                        <button onClick={()=>handleDelete(expense.id)} className='delete-btn'>DELETE</button>
                    </li>
                    
                ))}
            </ul>
           )}
        </div>
    </div>
  )
}

export default ExpenseForm;