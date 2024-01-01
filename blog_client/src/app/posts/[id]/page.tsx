"use client";
import React, { useEffect, useState } from "react";
import { PostType } from "@/types";
import Link from "next/link";

interface PostViewProps {
  params: { id: string };
}

function PostView({ params }: PostViewProps): JSX.Element {
  const [post, setPost] = useState<PostType | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      if (!params.id) return;
      try {
        const response = await fetch(
          `http://localhost:3001/api/v1/posts/${params.id}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Fetching posts failed:", error);
      }
    }
    fetchPosts();
  }, [params.id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="mx-auto mt-8 w-full max-w-xl rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>
        <div className="mt-4 text-lg text-gray-600">{post.content}</div>
        <div className="mt-4 flex">
          <p className="mr-4 text-sm text-gray-500">
            投稿日: {new Date(post.created_at).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500">
            更新日: {new Date(post.created_at).toLocaleDateString()}
          </p>
        </div>
        <Link
          href="/"
          className="mt-6 inline-block rounded bg-green-500 px-4 py-2 text-lg font-bold text-white hover:bg-green-700 focus:outline-none focus:shadow-outline"
        >
          TOPへ
        </Link>
      </div>
    </>
  );
}

export default PostView;
