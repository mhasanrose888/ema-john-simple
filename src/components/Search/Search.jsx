// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from './SearchBar.module.css';



// const Search = () => {
//   const [value, setValue] = useState('');
//   const [suggestions, setSuggestions] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data } = await axios.get(
//           `https://dummyjson.com/products/search?q=${value}`
//         );

//         setSuggestions(data.products);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, [value]);

//   return (
//     <div className={styles.container}>
//       <input
//         type="text"
//         className={styles.textbox}
//         placeholder="Search data..."
//         value={value}
//         onChange={(e) => {
//           setValue(e.target.value);
//         }}
//       />
//     </div>
//   );
// };

// export default Search;





const Search = (props) => {
    const {name} = props.product;
    return (
        <div>
            {
  product.filter(post => {
    if (query === '') {
      return post;
    } else if (post.title.toLowerCase().includes(query.toLowerCase())) {
      return post;
    }
  }).map((post, index) => (
    <div className="box" key={index}>
      <p>{name}</p>
 
    </div>
  ))
}
        </div>
    );
};

export default Search;