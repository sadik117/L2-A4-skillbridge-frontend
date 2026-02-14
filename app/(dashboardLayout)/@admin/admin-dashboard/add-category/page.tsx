import CreateCategoryClient from "./CreateCategoryClient";

export const metadata = {
  title: "Create Category | Admin Dashboard",
  description: "Add a new subject category to the platform.",
};

export default function CreateCategoryPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <CreateCategoryClient />
    </main>
  );
}