import React,{useContext, useEffect, useState} from 'react';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { useHistory } from "react-router-dom";
import { postContext } from '../../store/PostContext';
import Heart from '../../assets/Heart';
import './Post.css';

function Posts() {

  
  const {Firebase} = useContext(FirebaseContext);
  const [posts, setPosts] = useState([]);
  const history = useHistory();
  const {setProductDet} = useContext(postContext);

  useEffect(() => {
    Firebase.firestore().collection('products').get()
    .then((snap)=>{
      const posts = snap.docs.map((product)=>{
        return {
          ...product.data(),
          id: product.id
        }
      })
      setPosts(posts);
    })
    .catch((err)=>{
      console.log(err)
    });
    // eslint-disable-next-line
  }, [])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {
            posts.map((post)=>{
              return (
                <div className="card" onClick={()=>{
                  setProductDet(post)
                  history.push('/view');
                }}>
                  <div className="favorite">
                    <Heart></Heart>
                  </div>
                  <div className="image">
                    <img src={post.imageUrl} alt="Product" />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9; {post.price}</p>
                    <span className="kilometer">{post.category}</span>
                    <p className="name"> {post.name}</p>
                  </div>
                  <div className="date">
                    <span>{post.date}</span>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="ph" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
        </div>
    </div> 
  );
}

export default Posts;
