import { loadEnvironment } from "../src/Configs/Environment";
import { connectDb, prisma } from "../src/Configs/Prisma";
// TAG FORCE 1 DATA
import boosters from "../prisma/data/tagForce1Booster";
import cards from "../prisma/data/tagForce1Cards";

loadEnvironment()
connectDb()

async function main() 
{
    

}


main()