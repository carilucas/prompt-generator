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

  const [result, setResult] = useState({ a: "", b: "" });

  const [copied, setCopied] = useState<"A" | "B" | null>(null);

  const handleCopy = async (text: string, type: "A" | "B") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);

      setTimeout(() => {
        setCopied(null);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const [loading, setLoading] = useState(false);

  const handleGenerateProposal = async () => {
    if (!categoryId || !job || !title) {
      Swal.fire({
        title: "The Fields?",
        text: "Category, title and job are required.",
        icon: "question",
      });
      return;
    }

    try {
      setLoading(true);

      // Generar prompt
      const promptRes = await fetch("/api/prompts/generate", {
        method: "POST",
        body: JSON.stringify({
          categoryId,
          title,
          job,
        }),
      });

      const promptData = await promptRes.json();

      if (!promptData.ok) {
        throw new Error("Error generating prompt");
      }

      // Generar propuesta con IA
      const aiRes = await fetch("/api/ai/generate", {
        method: "POST",
        body: JSON.stringify({
          prompt: promptData.prompt,
        }),
      });

      const aiData = await aiRes.json();

      if (!aiData.ok) {
        throw new Error("Error generating proposal");
      }

      // Mostrar propuesta (NO prompt)
      setResult({
        a: aiData.proposalA,
        b: aiData.proposalB,
      });

      // limpiar form
      setTitle("");
      setJob("");
      setCategoryId("");
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
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
          disabled={false}
          example="Website creation and SEO"
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
        onClick={handleGenerateProposal}
        className="bg-sky-900 text-white px-4 py-2 cursor-pointer"
      >
        {loading ? "Generating..." : "Generate Proposal"}
      </button>

      {/* RESULT */}
      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Proposal A */}
          <div className="border p-4 bg-gray-100 rounded">
            <p className="font-semibold mb-2">Option A</p>
            <div className="text-sm whitespace-pre-wrap">{result.a}</div>

            <button
              onClick={() => handleCopy(result.a, "A")}
              className="mt-3 bg-sky-900 text-white px-3 py-1 rounded cursor-pointer"
            >
              {copied === "A" ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* Proposal B */}
          <div className="border p-4 bg-gray-100 rounded">
            <p className="font-semibold mb-2">Option B</p>
            <div className="text-sm whitespace-pre-wrap">{result.b}</div>

            <button
              onClick={() => handleCopy(result.b, "B")}
              className="mt-3 bg-sky-900 text-white px-3 py-1 rounded cursor-pointer"
            >
              {copied === "B" ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
