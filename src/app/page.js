import Timeline from "@/components/Timeline";

async function getEvents() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function Home() {
  const events = await getEvents();
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <h1
            className="text-6xl font-bold text-center mb-10 
            bg-gradient-to-r from-green-500 via-blue-500 to-rose-500 text-transparent bg-clip-text
            dark:from-blue-400 dark:via-purple-400 dark:to-pink-400"
          >
            Timeline Museum
          </h1>
          <h2
            className="text-3xl font-bold text-center mb-12 
            bg-gradient-to-r from-green-500 via-blue-500 to-rose-600 text-transparent bg-clip-text
            dark:from-blue-400 dark:via-purple-400 dark:to-pink-400"
          >
            A timeline history of the Raja Ali Haji Museum
          </h2>
        </div>

        <Timeline events={events} />
      </div>
    </div>
  );
}
