import { Story } from "@/types/stories";
import path from "path";
import fs from "fs"


const storiesDir = path.join(process.cwd(), "public/stories")

// accessing the expoet story folder 
export function getAllStories(): Story[] {
    if (!fs.existsSync(storiesDir)) {
        return [];
    }

    const storyFolder = fs.readdirSync(storiesDir);
    const stories :Story[] = storyFolder.map(storyFolder=>{
        const storyPath= path.join(storiesDir, storyFolder)

        const file = fs.readdirSync(storyPath)

        file.forEach((file)=>{
            const filePath = path.join(storyPath, file)
            const type = path.extname(file).substring(1)

            if(type==="txt"){
                fs.readdirSync(filePath,"utf-8")
            }
        })
    })
}

export const getStory = (story: string): Story | undefined => { }
