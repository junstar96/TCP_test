import { GetWorldRank, StageChange} from "./change.handler.js"
import { Ending, Starting,CheckBroad } from "./connect.handler.js"

export const handlerMappings = {
    0 : CheckBroad,
    1 : StageChange,
    2 : GetWorldRank,
    101 : Starting,
    102 : Ending
 }