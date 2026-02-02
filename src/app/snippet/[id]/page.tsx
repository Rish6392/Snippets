import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import * as actions from "@/actions";
import { notFound } from 'next/navigation';

export const dynamic = "force-dynamic";

const SnippetDetailPage = async ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id);

  const snippet = await prisma.snippet.findUnique({
    where: { id },
  });

  if (!snippet) notFound();

  const deleteSnippetActions = actions.deleteSnippet.bind(null, snippet.id);

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex items-center justify-between'>
        <h1 className='font-bold text-xl'>{snippet.title}</h1>

        <div className='flex gap-2'>
          <Link href={`/snippet/${snippet.id}/edit`}><Button>Edit</Button></Link>

          <form action={deleteSnippetActions}>
            <Button variant={"destructive"} type='submit'>Delete</Button>
          </form>
        </div>
      </div>

      <pre className='p-3 bg-gray-200 rounded border border-gray-300'>
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
};

export default SnippetDetailPage;
