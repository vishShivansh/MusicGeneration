import {
    checkout,
    polar,
    portal,
    webhooks
} from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { env } from "~/env";
import { db } from "~/server/db";

const polarClient = new Polar({
  accessToken: env.POLAR_ACCESS_TOKEN,
  server: "sandbox",
});

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: "6276e785-bb2d-4ebd-876f-f5b8a1c481c1",
              slug: "small",
            },
            {
              productId: "eebb177d-3cca-44b5-ad84-1ec412c432d8",
              slug: "medium",
            },
            {
              productId: "dab9e3fb-90c1-4fa9-bcd8-b1c0f10795a7",
              slug: "large",
            },
          ],
          successUrl: "/",
          authenticatedUsersOnly: true,
        }),
        portal(),
        webhooks({
          secret: env.POLAR_WEBHOOK_SECRET,
          onOrderPaid: async (order) => {
            const externalCustomerId = order.data.customer.externalId;

            if (!externalCustomerId) {
              console.error("No external customer ID found.");
              throw new Error("No external customer id found.");
            }

            const productId = order.data.productId;

            let creditsToAdd = 0;

            switch (productId) {
              case "6276e785-bb2d-4ebd-876f-f5b8a1c481c1":
                creditsToAdd = 10;
                break;
              case "eebb177d-3cca-44b5-ad84-1ec412c432d8":
                creditsToAdd = 25;
                break;
              case "dab9e3fb-90c1-4fa9-bcd8-b1c0f10795a7":
                creditsToAdd = 50;
                break;
            }

            await db.user.update({
              where: { id: externalCustomerId },
              data: {
                credits: {
                  increment: creditsToAdd,
                },
              },
            });
          },
        }),
      ],
    }),
  ],
});