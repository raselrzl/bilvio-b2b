import { cookies } from "next/headers";
import OfferReactions from "./OfferReactions";
import { prisma } from "@/app/utils/db";

export default async function OfferItem({
  productId,
}: {
  productId: string;
}) {
  const jar = await cookies();
  const userEmail = jar.get("bilvio_session")?.value;

  // Initial state for reaction
  let initialReaction:
    | "LIKE"
    | "UP"
    | "DOWN"
    | "SAVE"
    | undefined = undefined;

  if (userEmail) {
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    // IMPORTANT: Only use user inside this IF block
    if (user) {
      const reaction = await prisma.productReaction.findUnique({
        where: {
          productId_userId: {
            productId,
            userId: user.id,
          },
        },
      });

      initialReaction = reaction?.reaction ?? undefined;
    }
  }

  return (
    <OfferReactions
      productId={productId}
      initialReaction={initialReaction}
    />
  );
}
