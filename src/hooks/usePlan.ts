import IPlans from "../network/models/IPlans";
import calculateMonthlyAmount from "../utils/getMonthlyAmount";
import useStorage from "./useStorage";

export function usePlan() {
    const [plans, setPlans, removePlans] = useStorage<IPlans[] | null>('plans', null);

    const createPlan = (data: IPlans) => {
        setPlans([...(plans || []), data]);
    }

    function getPlan(id: string) {
        return plans?.find((plan) => plan.id === id)
    }

    function fundPlan(id: string) {
        const plan = plans?.find((plan) => plan.id === id);

        if (plan) {
            // Calculate the new balance correctly
            const currentBalance = plan.balance ?? 0; // Default to 0 if balance is undefined
            const monthlyAmount = calculateMonthlyAmount(
                new Date(plan.maturity_date),
                plan.target_amount
            );

            setPlans([
                ...(plans || []).filter((pl) => pl.id !== id), // Filter out the current plan
                {
                    ...plan,
                    balance: currentBalance + monthlyAmount // Update the balance
                }
            ]);
        }
    }

    return {
        plans: plans || [],
        createPlan,
        fundPlan,
        getPlan
    }
}