import IPlans from "../network/models/IPlans";
import useStorage from "./useStorage";

export function usePlan() {
    const [plans, setPlans, removePlans] = useStorage<IPlans[] | null>('plans', null);

    const createPlan = (data: IPlans) => {
        setPlans([...(plans || []), data]);
    }

    function getPlan(id: string) {
        return plans?.find((plan) => plan.id === id)
    }

    return {
        plans: plans || [],
        createPlan
    }
}