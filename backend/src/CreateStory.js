// src/CreateStory.js

import React, { useState } from "react";
import { db } from "./firebase"; // Add Firebase Firestore integration
import { addDoc, collection } from "firebase/firestore"; // Firebase Firestore methods

function CreateStory() {
  const [storyText, setStoryText] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (storyText.length < 250 || storyText.length > 500) {
      alert("Story text must be between 250 and 500 words.");
      return;
    }

    // TODO: Add Firebase backend integration to save story to Firestore

    try {
      const docRef = await addDoc(collection(db, "stories"), {
        title,
        storyText,
        nodes: [{ text: storyText, timestamp: new Date() }], // Initial node
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div>
      <h2>Create a New Story Tree</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Story Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your story (250-500 words)"
          value={storyText}
          onChange={(e) => setStoryText(e.target.value)}
          required
          minLength={250}
          maxLength={500}
        />
        <button type="submit">Create Story</button>
      </form>
    </div>
  );
}

export default CreateStory;
