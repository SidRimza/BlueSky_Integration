'use client';

import { useState } from 'react';
import PostCreation from './Components/PostForm';

export default function Home() {
  const [clear, setClear] = useState(false)
  const handlePost = async ({title, description, image, setLoading}) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('text', title);
      formData.append('description', description);
  
      const response = await fetch('/api/postToBluesky', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) throw new Error('Failed to post');
      
      alert('Posted successfully!');
    } catch (error) {
      console.error('Error posting:', error);
      alert('Failed to post.');
    } finally {
      setLoading(false);
      setClear(true)
    }
  };  

  return (
    <div>
      <h1>Post to Bluesky</h1>
      <PostCreation onSubmit={handlePost} clear={clear} />
    </div>
  );
}