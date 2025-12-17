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
      className="w-full max-w-[500px] flex flex-col justify-center border py-40 px-10 rounded-xl"
    >
      <h1 className="text-blue-600 font-bold text-3xl mb-5">{title}</h1>
      {children}
    </form>
  );
}
