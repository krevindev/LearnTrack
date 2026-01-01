import type React from "react";

type AuthFormProps = {
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
};

export default function AuthForm({ title, onSubmit, children }: AuthFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full h-full max-w-125 py-10 px-20 rounded-xl flex flex-col justify-center items-stretch"
    >
      <h1 className="text-blue-600 font-bold text-3xl mb-5">{title}</h1>
      {children}
    </form>
  );
}
