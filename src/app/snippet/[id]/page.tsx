import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import React from 'react'
import * as actions from "@/actions"
import { notFound } from 'next/navigation';

const SnippetDetailPage = async ({params}:{params:Promise<{id:string}>}) => {
  //fetch id
  const id = parseInt((await params).id);

  //await new Promise((r)=>setTimeout(r,2000));

  const snippet = await prisma.snippet.findUnique({
    where:{
       id,
    },
  });

  if(!snippet) notFound();

  const deleteSnippetActions = actions.deleteSnippet.bind(null,snippet.id);

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
  )
}

export default SnippetDetailPage

//static banana hai 
//for handling catching 
// yaad rakho isse 
export const generateStaticParams = async () =>{
  const snippets = await prisma.snippet.findMany();

  return snippets.map((snippet)=>{
    return {id:snippet.id.toString()}
  })
}
