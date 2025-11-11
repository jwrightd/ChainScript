import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import StoryTree from "./StoryTree";
import CreateStory from "./CreateStory";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, "user@example.com", "password123"); // Replace with your login method
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <Router>
      <div>
        <nav>
          {user ? (
            <div>
              <span>Welcome, {user.email}</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <button onClick={handleLogin}>Login</button>
          )}
        </nav>
        <Switch>
          <Route path="/story/:id" component={StoryTree} />
          <Route path="/create" component={CreateStory} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    </Router>
  );
}

function HomePage() {
  return (
    <div>
      <h1>Welcome to ChainScript</h1>
      <Link to="/create">Create a New Story Tree</Link>
    </div>
  );
}

export default App;
