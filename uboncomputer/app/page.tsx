// Minimal Next.js App Router Page (Type-safe)
// No props, no client directives — compatible with Next 14 + TS
export default function Page() {
  return (
    <main style={{display:'grid',placeItems:'center',minHeight:'100vh'}}>
      <div>
        <h1>Ubon Computer Demo</h1>
        <p>Type-safe Next.js Page component.</p>
      </div>
    </main>
  );
}
