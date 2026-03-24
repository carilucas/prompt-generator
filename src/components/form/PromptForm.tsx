"use client";

import { useState } from "react";
import { FormField } from "./FormField";
import { Input, TextArea, Select } from "@/components";

import Swal from "sweetalert2";

type Category = {
  id: string;
  name: string;
  profile: {
    experience: string;
    roles: string;
    strength: string;
  } | null;
};

export function PromptForm({ categories }: { categories: Category[] }) {
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [job, setJob] = useState("");

  const [result, setResult] = useState("");

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleGenerate = async () => {
    if (!categoryId || !job || !title) {
      Swal.fire({
        title: "The Fields?",
        text: "Category, title and job are required.",
        icon: "question",
      });
      return;
    }

    const res = await fetch("/api/prompts/generate", {
      method: "POST",
      body: JSON.stringify({
        categoryId,
        title,
        job,
      }),
    });

    const data = await res.json();
    setResult(data.prompt);
  };

  return (
    <div className="space-y-4">
      {/* CATEGORY */}
      <Select
        value={categoryId}
        onChange={setCategoryId}
        options={categories.map((cat) => ({ label: cat.name, value: cat.id }))}
      />

      {/* JOB */}

      <FormField label="Job Title">
        <Input
          value={title}
          disabled={true}
          example="auto-generated"
          onChange={setTitle}
        />
      </FormField>

      <FormField label="Job Description">
        <TextArea
          value={job}
          onChange={setJob}
          example="Looking for a Wodpress developer for some assistance."
          minHeight="h-50"
        />
      </FormField>

      {/* BUTTON */}
      <button
        onClick={handleGenerate}
        className="bg-sky-900 text-white px-4 py-2 cursor-pointer"
      >
        Generate Prompt
      </button>

      {/* RESULT */}
      {result && (
        <div className="border p-4 whitespace-pre-wrap border-gray-300 rounded mb-10 bg-gray-100">
          <div className="flex justify-between items-center mb-3">
            <p className="font-semibold">Generated Prompt</p>

            <button
              onClick={handleCopy}
              className="text-sm bg-sky-900 px-4 py-1 text-white cursor-pointer rounded"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="whitespace-pre-wrap text-sm">{result}</div>
          <div className="flex justify-between items-center my-3">
            <button
              onClick={handleCopy}
              className="text-sm bg-sky-900 px-4 py-1 text-white cursor-pointer rounded"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
