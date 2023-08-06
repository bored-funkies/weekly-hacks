import { WhereFilterOp } from "firebase/firestore";

export default interface FilterConstraint{
    column: string,
    condition: WhereFilterOp,
    value: string
}