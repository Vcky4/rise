import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import formatNumber from "../utils/formatNumber";
import { usePlan } from "./usePlan";

export function useHome() {
    const { user } = useContext(AuthContext)
    const { plans } = usePlan()

    const balance = () => {
        // Calculate the total balance from plans
        const totalBalance = plans?.reduce((acc, plan) => acc + (plan.balance || 0), 0) || 0;
        return formatNumber(totalBalance);
    };

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