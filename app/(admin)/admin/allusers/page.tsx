import UsersTableClient from "./UserTable"; // client component
import { prisma } from "@/app/utils/db";

// Fetch all users with related info
async function getAllUsers() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      orders: { select: { id: true, orderNumber: true, status: true } },
      tasks: { select: { id: true, taskType: true, status: true } },
      bankAccounts: { select: { id: true, bankName: true, iban: true, isMain: true } },
      warehouses: { select: { id: true, name: true, address: true, openingHours: true } },
      demands: { select: { id: true, make: true, gearbox: true, fuel: true, status: true } },
      products: { select: { id: true, name: true, offerNumber: true } },
      messages: { select: { id: true, message: true } },
      productNotes: true,
      reactions: true,
      companySettings: true,
    },
  });

  return users.map((u) => ({
    ...u,
    firstName: u.firstName ?? undefined,
    lastName: u.lastName ?? undefined,
    companyName: u.companyName ?? undefined,
    phone: u.phone ?? undefined,
    street: u.street ?? "",
    city: u.city ?? "",
    country: u.country ?? "",
    zipCode: u.zipCode ?? "",
    uploadedDocuments: u.uploadedDocuments ?? undefined,
    intent: u.intent ?? undefined,
    orders: u.orders.map((o) => ({
      id: o.id,
      orderNumber: o.orderNumber ?? "",
      status: o.status ?? "",
    })),
    tasks: u.tasks.map((t) => ({
      id: t.id,
      taskType: t.taskType ?? "",
      status: t.status ?? "",
    })),
    bankAccounts: u.bankAccounts.map((b) => ({
      id: b.id,
      bankName: b.bankName ?? "",
      iban: b.iban ?? "",
      isMain: b.isMain,
    })),
    warehouses: u.warehouses.map((w) => ({
      id: w.id,
      name: w.name ?? "",
      address: w.address ?? "",
      openingHours: w.openingHours ?? [],
    })),
    demands: u.demands.map((d) => ({
      id: d.id,
      make: d.make ?? undefined,
      gearbox: d.gearbox ?? undefined,
      fuel: d.fuel ?? undefined,
      status: d.status ?? undefined,
    })),
    products: u.products.map((p) => ({
      id: p.id,
      name: p.name ?? "",
      offerNumber: p.offerNumber ?? "",
    })),
    messages: u.messages.map((m) => ({
      id: m.id,
      message: m.message ?? "",
    })),
    productNotes: u.productNotes.map((n) => ({
      id: n.id,
      productId: n.productId,
      note: n.note ?? "",
    })),
    reactions: u.reactions.map((r) => ({
      id: r.id,
      productId: r.productId,
      reaction: r.reaction ?? "",
    })),
    companySettings: u.companySettings
      ? {
          onlyCarsWithPDI: u.companySettings.onlyCarsWithPDI ?? undefined,
          iAcceptRegistration: u.companySettings.iAcceptRegistration ?? undefined,
          iAcceptWarranty: u.companySettings.iAcceptWarranty ?? undefined,
          cocNewCars: u.companySettings.cocNewCars ?? undefined,
          cocUsedCars: u.companySettings.cocUsedCars ?? undefined,
          documentAddress: u.companySettings.documentAddress ?? undefined,
        }
      : undefined,
  }));
}

// Server Component
export default async function AlluserPage() {
  const users = await getAllUsers();
  return <UsersTableClient users={users} />;
}
