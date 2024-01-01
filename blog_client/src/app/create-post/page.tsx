"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CreatePost = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/api/v1/posts", {
        title: title,
        content: content,
      });
      router.push("/");
    } catch (err) {
      alert("投稿に失敗しました");
    }
  };

  return (
    <div className="mx-auto mt-8 w-full max-w-xl rounded-lg bg-white p-6 shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">ブログ新規投稿</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            タイトル
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            本文
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setContent(e.target.value)
            }
          />
        </div>{" "}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="mt-6 inline-block rounded bg-blue-500 px-4 py-2 text-lg font-bold text-white hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          >
            投稿
          </button>
          <Link
            href="/"
            className="mt-6 inline-block rounded bg-green-500 px-4 py-2 text-lg font-bold text-white hover:bg-green-700 focus:outline-none focus:shadow-outline"
          >
            TOPへ
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
