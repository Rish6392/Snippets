import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

//export const dynamic = "force-dynamic" // disabling the catching
// export const revalidate =0;

// on -demand catching


export default async function Home() {

  //fetch
  const snippets = await prisma.snippet.findMany();
  return (
    <div>
      <h1 className="font-bold text-4xl">Home</h1>
      <div className="flex items-center justify-between">
         <h1>Snippets</h1>
         <Button asChild><Link href={"/snippet/new"}>New</Link></Button>
      </div>
      {snippets.map((snippet)=>(
        <div key={snippet.id} className="flex items-center justify-between bg-gray-200 p-2 rounded-md my-2">
          <h1>{snippet.title}</h1>
          <Link href={`/snippet/${snippet.id}`}>
          <Button variant={'link'}>View</Button>
          </Link>
        </div>
      ))}
    </div>
  );
}
