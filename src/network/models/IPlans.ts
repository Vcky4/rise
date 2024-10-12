export default interface IPlans {
    id: string;
    goal_name: string;
    target_amount: number;
    maturity_date: string;
    randomId: number,
    balance?: number
  }