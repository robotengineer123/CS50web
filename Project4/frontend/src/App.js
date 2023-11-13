import { useState, useEffect } from 'react';
import './App.css';
import PostFeed from './Components/post-feed';
import UserContext from './user-context';
import Header from './Components/header';
import Login from './Components/login';
import { Register } from './Components/register';
import { fetchPosts} from './Services/httpService';

function App() {
  const [posts, setPosts] = useState([]);
  useEffect( () => {
    const fetchData = async ()=> {
      const posts = await fetchPosts();

      setPosts(posts);
    }
    fetchData(); 
  }, []);

  const [activePage, setActivePage] = useState("All posts")
  const [user, setUser] = useState(null);
  const getComponent = () => {
    let page;
    switch (activePage) {
      case "Login":
        page = <Login setActivePage={setActivePage} />;
        break;
      case "All posts":
        page = <PostFeed posts={posts} />;
        break;
      case "Register":
        page = <Register setActivePage={setActivePage} />;
        break;
      default:
        break;
    }
    return page;
  }
  return (
    <UserContext.Provider value={[user, setUser]}>
        <div className="App">
          <Header setActivePage={setActivePage} />
          {getComponent()}
        </div>
    </UserContext.Provider>
  );
}

export default App;
