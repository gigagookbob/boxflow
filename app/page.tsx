import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const applyUrl = process.env.NEXT_PUBLIC_APPLY_URL;
  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL;

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-6 py-16">
        <div className="w-full space-y-4 text-center md:text-left">
          <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-neutral-700 shadow-sm ring-1 ring-neutral-200">
            Boxflow 안내
          </span>
          <h1 className="text-3xl font-semibold leading-tight text-neutral-900">
            드랍인 신청/운영자 페이지로 이동하세요.
          </h1>
        </div>

        <div className="grid w-full gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>드랍인 신청</CardTitle>
              <CardDescription>드랍인 신청 폼으로 이동합니다.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-start gap-4 pt-0">
              <Button asChild className="w-full md:w-auto">
                <a href={applyUrl} target="_blank" rel="noopener noreferrer">
                  신청하기
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>운영자</CardTitle>
              <CardDescription>운영자 페이지로 이동합니다.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-start gap-4 pt-0">
              <Button asChild className="w-full md:w-auto">
                <a href={adminUrl} target="_blank" rel="noopener noreferrer">
                  관리자 이동
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
