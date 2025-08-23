"use client";

import { authClient } from "~/lib/auth-client";
import { Button } from "../ui/button";

export default function Upgrade() {
  const upgrade = async () => {
    await authClient.checkout({
      products: [
        "6276e785-bb2d-4ebd-876f-f5b8a1c481c1",
        "eebb177d-3cca-44b5-ad84-1ec412c432d8",
        "dab9e3fb-90c1-4fa9-bcd8-b1c0f10795a7",
      ],
    });
  };
  return (
    <Button
      variant="outline"
      size="sm"
      className="ml-2 cursor-pointer text-orange-400"
      onClick={upgrade}
    >
      Upgrade
    </Button>
  );
}