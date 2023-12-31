"use client";
import React, { useEffect, useState } from "react";
import { PostType } from "@/types";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

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

  const handleDelete = async (postId: string) => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/posts/${postId}`);
      fetchPosts();
    } catch (err) {
      alert("削除に失敗しました");
    }
  };
  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Rails & Next.js Blog
      </h2>
      <div className="text-center mb-8">
        <Link
          href="/create-post"
          className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Create new Post
        </Link>
      </div>
      <div className="flex justify-center items-center">
        {" "}
        {/* Flexboxを適用 */}
        <div className="space-y-8 w-2/3">
          {posts.map((post) => (
            <div key={post.id} className="bg-white shadow-lg rounded-lg p-6">
              <Link
                href={`posts/${post.id}`}
                className="text-2xl font-semibold hover:text-blue-500 transition-colors"
              >
                {post.title}
              </Link>
              <p className="text-gray-600 mt-2">{post.content}</p>
              <div className="flex justify-between mt-4">
                {" "}
                <Link href={`edit-post/${post.id}`}>
                  <button className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600 transition-colors">
                    Edit
                  </button>{" "}
                </Link>
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-colors"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
