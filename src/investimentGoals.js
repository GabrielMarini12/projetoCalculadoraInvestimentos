function convertToMontlyReturnRate(yarlyReturnRate) {
  return yarlyReturnRate ** (1 / 12);
}

function generateReturnsArray(
  startingAmount = 0,
  timeHorizon = 0,
  timePeriod = "mounthly",
  mounthlyContribuition = 0,
  returnRate = 0,
  returnTimeFrame = "mounthly"
) {
  if (!timeHorizon || !startingAmount) {
    throw new Error(
      "Investimento incial e prazo devem ser preenchidos com valores posistivos."
    );
  }

  const finalReturnRate =
    returnTimeFrame === "monthly"
      ? 1 + returnRate / 100
      : convertToMontlyReturnRate(1 + returnRate / 100);

  const finalTimeHorizon =
    timePeriod === "mounthly" ? timeHorizon : timeHorizon * 12;

  const referenceInvestimentObject = {
    investedAmount: startingAmount,
    interestReturns: 0,
    totalInterestReturns: 0,
    month: 0,
    totalAmount: startingAmount,
  };

  const returnsArray = [referenceInvestimentObject];

  for (
    let timeReference = 1;
    timeReference <= finalTimeHorizon;
    timeReference++
  ) {
    const totalAmount =
      returnsArray[timeReference - 1].totalAmount * finalReturnRate +
      mounthlyContribuition;

    const interestReturns =
      returnsArray[timeReference - 1].totalAmount * finalReturnRate;

    const investedAmount =
      startingAmount + mounthlyContribuition * timeReference;

    const totalInterestReturns = totalAmount - investedAmount;

    returnsArray.push({
      investedAmount,
      interestReturns,
      totalInterestReturns,
      month: timeReference,
      totalAmount,
    });
  }

  return returnsArray;
}
