import client from "@/lib/db"
import { NextResponse } from "next/server"
import {Post} from "@/lib/models/post"

export async function GET(){
    const db = (await client).db("devlog")
    const posts = await db.collection("posts").find({}).toArray()
    return NextResponse.json({
        posts
    })
}
export async function POST(request:Request){
    const body: Post= await request.json()
    const db = (await client).db("devlog")
    await db.collection("posts").insertOne(body)
    return NextResponse.json({
        message: "post saved!"
    })
    
}

export async function DELETE(request:Request) {
    const body = await request.json()
    const db = (await client).db("devlog");
    await db.collection("posts").deleteOne({slug:body.slug})
    return NextResponse.json({
        message: "post deleted!"
    })
    
    
}


