"use client"

import { Editor } from '@monaco-editor/react'
import React, { useState } from 'react'
import type { Snippet } from '@prisma/client'
import { Button } from './button'
import * as actions from "@/actions"

const EditSnippetForm = ({snippet}:{snippet:Snippet}) => {
    const [code,setCode] = useState(snippet.code);

    const changeEvenhandler = (value:string="")=>{
       setCode(value);
    }
 
    // you cant use server action as a inside client component
    //asunc function saveSnippet () {
    // "use server"
   // }

   const saveSnippetAction = actions.saveSnippet.bind(null,snippet.id,code);

  return (
    <div className='flex flex-col gap-4'>
        <form action={saveSnippetAction}className='flex items-center justify-between'>
            <h1 className='font-bold text-xl'>Your Code edit:</h1>
            <Button type='submit'>Save</Button>
        </form>
      <Editor
        height="40vh"
        theme='vs-dark'
        defaultLanguage="javascript"
        defaultValue={code}
        onChange={changeEvenhandler}
      />
    </div>
  )
}

export default EditSnippetForm
