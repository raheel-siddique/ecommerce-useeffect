import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormControl, InputLabel, Select, MenuItem, Button, Box, Input } from '@mui/material';

const Product=()=>{
  const navigate=useNavigate()
  const [products, setProducts]=useState([])
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const [categories, setCategories] = useState([]);
  const [titles, setTitles] = useState([]);
  

  const fetchProducts = async () => {
    try {
      let url= "http://localhost:3001/products"
      const response = await axios.get(url);
      const data = response.data;

const categories = [...new Set(data?.map((allProducts:any) => allProducts.category))]
const titles = [...new Set(data?.map((allProducts:any) => allProducts.title))]

setCategories(categories)
setTitles(titles)
      setProducts(data);
      console.log(data?.category)
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  useEffect(() => {
   

    fetchProducts();
  }, []);



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `http://localhost:3001/products?_page=${currentPage}&_limit=10`;
        let queryParams = [];
  
        if (searchValue) {
          queryParams.push(`q=${searchValue}`);
        }
  
        if (selectedCategory) {
          queryParams.push(`category=${selectedCategory}`);
        }
  
        if (selectedTitle) {
          queryParams.push(`title=${selectedTitle}`);
        }
  
        if (queryParams.length > 0) {
          url += `&${queryParams.join('&')}`;
        }
  
        const response = await axios.get(url);
        const data = response.data;
  
        const totalCount = Number(response.headers['x-total-count']);
        const totalPagesCount = Math.ceil(totalCount / 10);
  
        setProducts(data);
        setTotalPages(totalPagesCount);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [currentPage, selectedCategory, selectedTitle, searchValue]);
  





  const handleChange = (event:any) => {
    setSelectedCategory(event.target.value);
  };
  const handleChangeTitle = (event:any) => {
    setSelectedTitle(event.target.value);
  };

  const addProducts=()=>{
    navigate("/add-product")
  }

  const deleteProducts=(idx:any)=>{
    axios.delete(`http://localhost:3001/products/${idx}`).then((res:any)=>{
      toast.success('Product Deleted successfully!', {
        position: toast.POSITION.TOP_RIGHT,
      });

      setTimeout(()=>{
           const productsCopy=[...products];
           const updatedProducts=productsCopy.filter((values:any)=>{
            return values.id!==idx;
           })
           setProducts(updatedProducts)
      },2000)

       
    }).catch((err:any)=>{

      toast.error('Error Deleting product!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    })
   
  }


  const handleSearchChange=(e:any)=>{
    setSearchValue(e.target.value)
    setCurrentPage(1); 
  }

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <Button key={i} onClick={() => handlePageChange(i)}>
          {i}
        </Button>
      );
    }
    return pageNumbers;
  };
  const handlePageChange = (newPage:any) => {
    setCurrentPage(newPage);
  };

    return(
        <>
        <h1 className='mt-10 text-5xl text-center text-gray-400 font-bold'>Product List</h1>

        <Button style={{background:'green', color:'white'}} onClick={addProducts}>Add Product</Button>
        <Button style={{background:'blue', color:'white'}} onClick={()=>fetchProducts()}>get All Products</Button>

<div style={{display:'flex', gap:'60px', margin:30}}>
<FormControl fullWidth style={{ marginTop: 20, marginBottom: 20 }}>
        <InputLabel id="search-label">Search</InputLabel>
        <Input
          id="search-input"
          value={searchValue}
          onChange={handleSearchChange}
          label="Search"
        />
      </FormControl>
        <FormControl fullWidth style={{marginTop:20, marginBottom:20}}>
        <InputLabel id="category-label">Select Category</InputLabel>
        <Select
          labelId="category-label"
          id="category-select"
          value={selectedCategory}
          label="Select Category"
          onChange={handleChange}
        >
          <MenuItem value="">Select...</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth style={{marginTop:20, marginBottom:20}}>
        <InputLabel id="category-label">Select Title</InputLabel>
        <Select
          labelId="title-label"
          id="title-select"
          value={selectedTitle}
          label="Select Title"
          onChange={handleChangeTitle}
        >
          <MenuItem value="">Select...</MenuItem>
          {titles.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>

        {loading? (
            <>
  <div className='flex justify-center mt-20'>
              <CircularProgress  color="success" />
              </div>
            </>
        ):
        <Box  style={{ display:'flex',flexDirection: 'row', flexWrap:"wrap" , margin:20}}>
        {products && products?.map((allProducts:any)=>{
            const { title,
            category ,
            description,
            price, 
          id
          }=allProducts
            return(
                <>
                <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 240 }}
        image={"./client-1.jpg"}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title && title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {description && description.slice(0,120)}
        </Typography>
        <Typography gutterBottom variant="h6" component="div" style={{color:'green'}}>
          {category && category}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {`RS${price}$`}
        </Typography>

         <Button style={{backgroundColor:'red', color:'white'}} onClick={()=>{deleteProducts(id)}}>Delete</Button>
      </CardContent>


      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
                </>
            )
        })}
         

 
    </Box>


        }

<div>
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Back
        </Button>
        {renderPageNumbers()}
        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>

<ToastContainer />
    
        </>
    )
}
export default Product