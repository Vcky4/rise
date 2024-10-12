function calculateMonthlyAmount(futureDate: Date, totalAmount: number): number {
    const currentDate = new Date();
  
    // Ensure the futureDate is indeed in the future
    if (futureDate <= currentDate) {
      throw new Error('The future date must be later than the current date.');
    }
  
    // Calculate the total number of months between the current date and the future date
    const yearDifference = futureDate.getFullYear() - currentDate.getFullYear();
    const monthDifference = futureDate.getMonth() - currentDate.getMonth();
  
    const totalMonths = (yearDifference * 12) + monthDifference;
  
    if (totalMonths <= 0) {
      throw new Error('The future date must be at least one month ahead.');
    }
  
    // Calculate the monthly amount to meet the totalAmount by the futureDate
    const monthlyAmount = totalAmount / totalMonths;
  
    return monthlyAmount;
  }


export default calculateMonthlyAmount
