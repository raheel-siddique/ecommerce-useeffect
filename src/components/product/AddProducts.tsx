import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddProduct = () => {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here using formData
    console.log(formData);
    // navigate('/')
    axios.post('http://localhost:3001/products', formData)
    .then((res:any)=>{
        toast.success('Product added successfully!', {
            position: toast.POSITION.TOP_RIGHT,
          });
          setTimeout(()=>{
            navigate('/')

          },3000)

    })
    
    
    .catch((error:any)=>{
        toast.error('Error adding product!', {
            position: toast.POSITION.TOP_RIGHT,
          });
    });
  };

  return (
    <>
      <h1>Add Products</h1>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" maxWidth={400} mx="auto">
          <TextField
            label="Product Title"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            label="Category"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            multiline
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            label="Price"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="number"
            inputProps={{ step: 'any' }} // Allow decimal values
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Product
          </Button>
        </Box>
      </form>
      <ToastContainer />
    </>
  );
};

export default AddProduct;
