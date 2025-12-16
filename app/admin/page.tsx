"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminPage() {
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage("데모 로그인 화면입니다. 백엔드 인증 연결이 필요합니다.");
  };

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Card>
          <CardHeader>
            <CardTitle>운영자 로그인</CardTitle>
            <CardDescription>
              드랍인 시간표 관리를 위해 로그인 해주세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="admin-email">이메일</Label>
                <Input
                  id="admin-email"
                  name="email"
                  type="email"
                  placeholder="admin@example.com"
                  required
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password">비밀번호</Label>
                <Input
                  id="admin-password"
                  name="password"
                  type="password"
                  placeholder="********"
                  required
                  autoComplete="current-password"
                />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <Button type="submit">로그인</Button>
              </div>
              {statusMessage && (
                <p className="text-sm text-neutral-600">{statusMessage}</p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
