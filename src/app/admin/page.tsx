import { adminUids } from "@/hooks/use-admin";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { notFound } from "next/navigation";
import { DeleteButton } from "../file/[id]/delete-button";

export default async function Page() {
  const session = await auth();
  if (!session || !adminUids.includes(session.user.id)) notFound();
  const data = await db.query.reports.findMany({
    with: { file: true, user: true },
  });

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <div className="space-y-8">
        {data.map((report) => (
          <div key={report.id} className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">{report.file?.title}</h2>
              <p className="text-muted-foreground">{report?.user?.name}</p>
            </div>
            <div className="space-y-2">
              <p>{report.reason}</p>
              <p className="text-muted-foreground">
                {report.createdAt.toDateString()}
              </p>
            </div>
            <DeleteButton
              fileId={report.file?.id ?? ""}
              authorId={session.user.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
