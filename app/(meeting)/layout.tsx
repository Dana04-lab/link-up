// app/(meeting)/layout.tsx

export default function MeetingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>; // Fullscreen режим, ешқандай sidebar/navbar жоқ
}
