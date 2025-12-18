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

export default function ApplyPage() {
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage(
      "제출 준비가 완료되었습니다. 백엔드 연결 시 실제 신청으로 이어집니다."
    );
  };

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Card>
          <CardHeader>
            <CardTitle>드랍인 신청</CardTitle>
            <CardDescription>
              이름과 연락처를 입력하고 신청을 진행해 주세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input id="name" name="name" placeholder="홍길동" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">전화번호</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="010-1234-5678"
                  required
                  inputMode="tel"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">이메일 (선택)</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="note">요청사항 (선택)</Label>
                <Input
                  id="note"
                  name="note"
                  placeholder="희망 시간, 추가 요청 등을 적어주세요."
                />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <Button type="submit">신청하기</Button>
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
