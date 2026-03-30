"use client";

import { useState } from "react";
import { Input, TextArea, FormField } from "@/components";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

type Props = {
  category?: any;
  userId: string;
};

export function CategoryForm({ category, userId }: Props) {
  const router = useRouter();
  const isEdit = !!category;

  const [name, setName] = useState(category?.name || "");
  const [key, setKey] = useState(category?.key || "");

  const [experience, setExperience] = useState(
    category?.profile?.experience || "",
  );
  const [roles, setRoles] = useState(category?.profile?.roles || "");
  const [strength, setStrength] = useState(category?.profile?.strength || "");

  const validate = () => {
    if (!name || !experience || !roles || !strength) {
      Swal.fire({
        title: "The Fields?",
        text: "All fields are required to create a category. Please fill them out.",
        icon: "question",
        confirmButtonColor: "#024a70",
        confirmButtonText: "Got it",
      });
      return false;
    }
    return true;
  };

  const handleNameChange = (value: string) => {
    setName(value);
    setKey(
      value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, ""),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const url = isEdit ? `/api/categories/${category.id}` : `/api/categories`;

    const method = isEdit ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      body: JSON.stringify({
        name,
        key,
        userId: userId, // solo en create
        profile: {
          experience,
          roles,
          strength,
        },
      }),
    });

    const data = await res.json();
    console.log(data);
    Swal.fire({
      title: data.message,
      text: "Would you like to continue editing?",
      icon: data.ok ? "success" : "error",
      showCancelButton: true,
      confirmButtonColor: "#024a70",
      cancelButtonColor: "#1e2939",
      confirmButtonText: "I have finished",
      cancelButtonText: "Yes keep editing",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/dashboard/categories");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField label="Skill Name">
        <Input
          value={name}
          onChange={handleNameChange}
          example="WordPress Developer"
        />
      </FormField>
      <FormField label="Key">
        <Input
          value={key}
          disabled={true}
          example="auto-generated"
          onChange={() => {}}
        />
      </FormField>
      <FormField label="Experience">
        <TextArea
          value={experience}
          onChange={setExperience}
          example="10 years building WordPress sites for businesses"
          minHeight="h-15"
        />
      </FormField>

      <FormField label="Roles">
        <TextArea
          value={roles}
          onChange={setRoles}
          example="Frontend developer, WooCommerce specialist"
          minHeight="h-15"
        />
      </FormField>
      <FormField label="Strength">
        <TextArea
          value={strength}
          onChange={setStrength}
          example="High-converting websites focused on UX and performance"
          minHeight="h-15"
        />
      </FormField>

      <button
        className="bg-gray-900 text-white px-4 py-2 cursor-pointer"
        type="submit"
      >
        {isEdit ? "Update Category" : "Create Category"}
      </button>
    </form>
  );
}
