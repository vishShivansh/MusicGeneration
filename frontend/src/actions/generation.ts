/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { inngest } from "~/inngest/client";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";


export async function queueSong() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/sign-in");

  const song = await db.song.create({
    data: {
      userId: session.user.id,
      title: "Test song 1",
      fullDescribedSong: "Hip-hop song",
    },
  });

  await inngest.send({
    name: "generate-song-event",
    data: { songId: song.id, userId: song.userId },
  });
}
