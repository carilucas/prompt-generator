"use client";

import { useState, useEffect } from "react";
import { Input, FormField } from "@/components";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const DEFAULT_RULES = [
  "Start with a greeting in english",
  "Max 150 words",
  "Personalized first line",
  "Use ✔️ bullet points",
  "No generic phrases",
];

type Rule = {
  id?: string;
  content: string;
};

export function RulesForm() {
  const router = useRouter();
  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const res = await fetch("/api/rules");
      const data = await res.json();
      if (data.ok && data.rules.length > 0) {
        setRules(
          data.rules.map((r: { id: string; content: string }) => ({
            id: r.id,
            content: r.content,
          })),
        );
      } else {
        setRules(DEFAULT_RULES.map((content) => ({ content })));
      }
    } catch (error) {
      setRules(DEFAULT_RULES.map((content) => ({ content })));
    } finally {
      setLoading(false);
    }
  };

  const addRule = () => {
    setRules([...rules, { content: "" }]);
  };

  const removeRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const updateRule = (index: number, value: string) => {
    const newRules = [...rules];
    newRules[index] = { ...newRules[index], content: value };
    setRules(newRules);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validRules = rules.filter((r) => r.content.trim() !== "");

    if (validRules.length === 0) {
      Swal.fire({
        title: "No rules",
        text: "Please add at least one rule.",
        icon: "warning",
        confirmButtonColor: "#024a70",
      });
      return;
    }

    try {
      const res = await fetch("/api/rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rules: validRules }),
      });

      const data = await res.json();

      Swal.fire({
        title: data.ok ? "Success" : "Error",
        text: data.message,
        icon: data.ok ? "success" : "error",
        confirmButtonColor: "#024a70",
      }).then(() => {
        if (data.ok) {
          router.refresh();
        }
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to save rules.",
        icon: "error",
        confirmButtonColor: "#024a70",
      });
    }
  };

  const resetToDefault = () => {
    Swal.fire({
      title: "Reset Rules?",
      text: "This will replace all current rules with the default ones.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#024a70",
      cancelButtonColor: "#1e2939",
      confirmButtonText: "Yes, reset",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setRules(DEFAULT_RULES.map((content) => ({ content })));
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Prompt Rules</h2>
        <div className="space-x-2">
          <button
            type="button"
            onClick={resetToDefault}
            className="px-3 py-1.5 text-sm bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors cursor-pointer"
          >
            Reset to Default
          </button>
          <button
            type="button"
            onClick={addRule}
            className="px-3 py-1.5 text-sm bg-sky-900 text-white hover:bg-gray-800 transition-colors cursor-pointer"
          >
            + Add Rule
          </button>
        </div>
      </div>

      {rules.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No rules added yet.</p>
          <button
            type="button"
            onClick={addRule}
            className="mt-2 text-blue-600 hover:underline cursor-pointer"
          >
            Add your first rule
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {rules.map((rule, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-gray-400 text-sm w-6">{index + 1}.</span>
              <div className="flex-1">
                <Input
                  value={rule.content}
                  onChange={(value) => updateRule(index, value)}
                  placeholder="Enter rule description..."
                />
              </div>
              <button
                type="button"
                onClick={() => removeRule(index)}
                className="p-2 text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                title="Remove rule"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="bg-sky-900 text-white px-6 py-2.5 hover:bg-gray-800 transition-colors cursor-pointer"
        >
          Save Rules
        </button>
      </div>
    </form>
  );
}
