// src/StoryTree.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebase"; // Add Firebase Firestore integration
import { doc, getDoc, updateDoc } from "firebase/firestore"; // Firebase Firestore methods

function StoryTree() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [newNode, setNewNode] = useState("");

  useEffect(() => {
    const fetchStory = async () => {
      const docRef = doc(db, "stories", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setStory(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };
    fetchStory();
  }, [id]);

  const handleAddNode = async () => {
    if (newNode.length < 250 || newNode.length > 500) {
      alert("Node text must be between 250 and 500 words.");
      return;
    }

    // TODO: Add Firebase backend integration to update the story with a new node
    try {
      const docRef = doc(db, "stories", id);
      await updateDoc(docRef, {
        nodes: [...story.nodes, { text: newNode, timestamp: new Date() }],
      });
      console.log("Node added!");
      setNewNode("");
    } catch (e) {
      console.error("Error adding node: ", e);
    }
  };

  if (!story) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{story.title}</h2>
      <div>
        {story.nodes.map((node, index) => (
          <div key={index}>
            <p>{node.text}</p>
          </div>
        ))}
      </div>
      <textarea
        value={newNode}
        onChange={(e) => setNewNode(e.target.value)}
        placeholder="Add a new node (250-500 words)"
        minLength={250}
        maxLength={500}
      />
      <button onClick={handleAddNode}>Add Node</button>
    </div>
  );
}

export default StoryTree;
