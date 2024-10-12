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
        const plan = plans?.find((plan) => plan.id === id)
        if (plan) {
            setPlans([
                ...(plans || [])?.filter((pl) => pl.id === id),
                {
                    ...plan,
                    balance: plan.balance ?? 0 + calculateMonthlyAmount(
                        new Date(plan.maturity_date),
                        plan.target_amount
                    )
                }
            ])
        }
    }

    return {
        plans: plans || [],
        createPlan,
        fundPlan
    }
}