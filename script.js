function generatePaySlip(
    baseSalary,
    overtimeHours,
    employeeType,
    salePrice,
    employeeName,
    paymentPeriod,
    jobTitle,
) {
    const overTimePay = calculateOverTimePay(baseSalary, overtimeHours);
    const roleBonus = calculateRoleBonus(baseSalary, overTimePay, employeeType);
    const salesCommission = calculateSalesCommission(salePrice);
    const grossSalary = baseSalary + overTimePay + roleBonus + salesCommission;
    const pensionContribution = calculatePension(grossSalary);
    const incomeTax = calculateProgressiveIncomeTax(
        grossSalary - pensionContribution,
    );
    const netSalary = grossSalary - (pensionContribution + incomeTax);
    const paySlip = `
EMPLOYEE PAY SLIP - ${paymentPeriod}
${employeeName} - ${jobTitle}
Total Earnings - ${netSalary.toFixed(2)}
    `;
    console.log(paySlip);
    return paySlip;
}

function calculateOverTimePay(baseSalary, overtimeHours) {
    const overTimePay = overtimeHours * baseSalary * 0.02;
    if (overTimePay < 0) {
        return 0;
    }
    return overTimePay;
}

function calculateRoleBonus(baseSalary, overTimePay, employeeType) {
    let bonusRate = 0;
    switch (employeeType) {
        case "manager":
            bonusRate = 0.05;
            break;
        case "c-level":
            bonusRate = 0.08;
            break;
        default:
            return 0;
    }
    return (baseSalary + overTimePay) * bonusRate;
}

function calculateProgressiveIncomeTax(taxableIncome) {
    const brackets = [
        { rate: 0.00, level: 5000 },
        { rate: 0.05, level: 1000 },
        { rate: 0.07, level: 1500 },
        { rate: 0.10, level: 3000 },
        { rate: 0.12, level: Infinity },
    ];
    let remainingIncome = taxableIncome;
    let totalDeductible = 0.0;
    for (const item of brackets) {
        if (remainingIncome <= 0) {
            break;
        }
        const amountInBracket = Math.min(remainingIncome, item.level);
        totalDeductible += amountInBracket * item.rate;
        remainingIncome -= amountInBracket;
    }
    return totalDeductible;
}

function calculatePension(grossSalary) {
    const PENSION_RATE = 0.12;
    return grossSalary * PENSION_RATE;
}

function calculateSalesCommission(salePrice) {
    const SALES_COMMISSION_RATE = 0.04;
    return salePrice * SALES_COMMISSION_RATE;
}


// Base: 23000, 10hrs overtime, c-level bonus, no sales
generatePaySlip(
    23000,
    10,
    "c-level",
    0,
    "Kwame Mensah",
    "January 2026",
    "Chief Financial Officer",
);

// No base salary, no overtime, 7 deals at GHS 23,000 each = 161,000
generatePaySlip(
    0,
    0,
    "regular",
    161000,
    "Abena Owusu",
    "December 2025",
    "Senior Sales Agent",
);
