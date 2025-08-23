"use client";

import { AccountView } from "@daveyplate/better-auth-ui";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function AccountPageClient({ path }: { path: string }) {
  const router = useRouter();

  return (
    <main className="container flex flex-col gap-4 p-4 md:p-6">
      {["settings", "security"].includes(path) && (
        <Button
          variant="outline"
          className="flex items-center gap-2 self-start"
          onClick={() => router.back()}
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back
        </Button>
      )}

      <AccountView path={path} />
    </main>
  );
}
