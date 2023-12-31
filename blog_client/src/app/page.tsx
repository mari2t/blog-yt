"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("http://localhost:3001/api/v1/posts");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Fetching posts failed:", error);
      }
    }
    fetchPosts();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.title}</p>
        </div>
      ))}
    </main>
  );
}
