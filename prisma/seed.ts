import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

async function main(){
    const newReport = await prisma.task.create({
            data: {
                responsibleId: 1, 
                name: "seedCreate",
                description: "create a new seed",   
                day: new Date(),                
                status: "finish"    
            },
    })
}
main()
.then(async () => {
  await prisma.$disconnect()
})
.catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})