import React, { Fragment, useState, useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useHistory } from 'react-router-dom';
import {FirebaseContext, AuthContext} from '../../store/Context'

const Create = () => {
  const {Firebase} = useContext(FirebaseContext);
  const {user} = useContext(AuthContext);
  const history = useHistory();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(); 
  const [image, setImage] = useState(null);
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    const date = new Date()
    Firebase.storage().ref(`/images/${image.name}`).put(image)
    .then(({ref})=>{
      ref.getDownloadURL()
      .then((url)=>{
        Firebase.firestore().collection('products').add({
          name: name,
          category,
          price,
          imageUrl: url,
          userId: user.uid,
          date: date.toLocaleDateString()
        })
      })
      .then(()=> {
        alert('uploaded successfully !!!');
        setTimeout(() => {
          history.push('/');
        }, 2000);
      })
    })
    .catch((err)=>{
      alert(err.message);
    })
  }

  return (
       <Fragment>
      <Header />
      <card>
      <div className="centerDiv py-3">
      <h1 className='pb-4' style={{textDecorationLine: 'underline'}}>Add Product</h1>
          <div style={{lineHeight: 2}}>
            <label htmlFor="productName" >Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="productName"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              name="productName"
              placeholder='product name'
            />
            <br />
            <label htmlFor="category">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="category"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              name="category"
              placeholder='category'
            />
            <br />
            <label htmlFor="price">Price</label>
            <br />
            <input className="input" value={price} onChange={(e)=>setPrice(e.target.value)} type="number" id="price" name="Price" placeholder='price'/>
            <br />
          </div>
          <br />
          <img alt="Product" className='py-3' width="110px" height="150px" src={image ? URL.createObjectURL(image) : ''}></img>
            <br />
            <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            <br /> 
            <button className="uploadBtn" onClick={handleSubmit}>upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
