export async function GET() {
  return new Response(JSON.stringify({ message: 'Test route works' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}