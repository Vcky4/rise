import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import formatNumber from "../utils/formatNumber";
import { usePlan } from "./usePlan";

export function useHome() {
    const { user } = useContext(AuthContext)
    const { plans } = usePlan()

    const balance = () => {
        return formatNumber(0)
    }

    const gain = () => {
        return formatNumber(0)
    }

    return {
        user,
        balance,
        gain,
        plans
    }
}