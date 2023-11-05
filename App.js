function getCreditScoreValue() {
  // Variables obtained from user input
  var credit;
  var carPayment;
  var creditCard;
  var mortage;
  var studentLoan;
  var GI;
  var appraisal;
  var down;

  // Variables calculated by back-end
  var monthlyDebt;
  var DTI;
  var PMI;
  var LTV;
  var FEDTI;
  var creditResult;
  
  credit = document.getElementById("CreditScore").value;
  
  carPayment = document.getElementById("CarPayment").value;
  
  creditCard = document.getElementById("CreditPayment").value;
  
  mortgage = document.getElementById("Mortgage").value;
  
  studentLoan = document.getElementById("StudentLoan").value;
  
  GI = document.getElementById("GrossIncome").value;
  
  appraisal = document.getElementById("HomeAppraised").value
  
    down = document.getElementById("DownPayment").value;

  
  document.getElementById("GrossIncome").value=credit;

  monthlyDebt = calcMonthlyDebt(carPayment, creditCard, mortage, studentLoan);

  DTI = calcDTI(monthlyDebt, GI);

  PMI = calcPMI(appraisal);

  LTV = calcLTV(appraisal, down);

  FEDTI = calcFEDTI(mortage, GI);

  creditResult = testCredit(credit);

  // document.getElementById("GrossIncome").value=monthlyDebt;

  function calcMonthlyDebt(carPayment, creditCard, mortage, studentLoan) {
    return carPayment + creditCard + mortage + studentLoan; // this currently appends each number together instead of adding
  }

  function calcDTI(monthlyDebt, GI) {
    return ((monthlyDebt / GI) * 100).toFixed(2);
  }

  function calcPMI(appraisal) {
    return 0.01 * appraisal;
  }

  function calcLTV(appraisal, down) {
    return ((1 - down / appraisal) * 100).toFixed(2);
  }

  function calcFEDTI(mortage, GI) {
    return ((mortage / GI) * 100).toFixed(2);
  }

  function testCredit(credit) {
    if (credit < 640) {
      creditNeed(credit);
    } else if (credit >= 640 && credit < 670) {
      points++;
    } else if (credit >= 670 && credit < 700) {
      points += 2;
    } else {
      points += 3;
    }
    return credit >= 640;
  }

  // responses based on LTV calcs
  function LTVBasedNeed(LTV, appraisal) {
    if (LTV > 95) {
      return (
        "Your LTV is " +
        LTV +
        "% and must be lower than 95% to" +
        " be considered for a house loan. You must" +
        " pay a higher down payment"
      );
    } else if (LTV >= 80) {
      return (
        "You would need Private Mortage Insurance to pay for the loan, " +
        "which would come out to an additional $" +
        calcPMI(appraisal) +
        " per year at a 1% rate. Another option is raising the down payment."
      );
    } else {
      return (
        "Your LTV is " +
        LTV +
        " which makes you eligible for a loan in this field!"
      );
    }
  }

  // responses on dti and fedti calcs
  function DTIBasedNeed(monthlyDebt, GI, mortage) {
    const DTI = calcDTI(monthlyDebt, GI);
    const FEDTI = calcFEDTI(mortage, GI);

    if (DTI > 43) {
      return (
        "Your DTI is " +
        DTI +
        "% and must be lower than 43% to" +
        " be considered for a house loan. Consider trying to" +
        " lower your DTI by moving high interest loans to a low " +
        "interest credit card. (Don't get too many though!)"
      );
    } else if (DTI > 36 && FEDTI > 28) {
      return (
        "Your DTI is high with a " +
        DTI +
        "% which, in combination with your high FEDTI of " +
        FEDTI +
        "% makes you ineligible for a loan. Consider trying to lower " +
        "your DTI by moving high interest loans to a low interest credit " +
        "card (don't get too many though!). Another option would be to look for cheaper home."
      );
    } else if (DTI > 36 && FEDTI <= 28) {
      return (
        "Your DTI is high with a " +
        DTI +
        "%, but your FEDTI is good with a " +
        FEDTI +
        "%. You may be able to get a loan, but your chances are low. Consider trying to lower " +
        "your DTI by moving high interest loans to a low interest credit " +
        "card (don't get too many though!)."
      );
      points += 2;
    } else if (DTI <= 36 && FEDTI > 28) {
      return (
        "Your DTI is good with a " +
        DTI +
        "%, but your FEDTI is too high with a " +
        FEDTI +
        "%. You may be able to get a loan, " +
        "but your chances are low. Consider looking for a less expensive home."
      );
      points += 2;
    } else {
      return (
        "Your DTI is good with a " +
        DTI +
        "%, and your FEDTI is " +
        " good with a " +
        FEDTI +
        "%. You're doing great in this area!"
      );
      points += 3;
    }
  }

  // responses on credit score
  function creditNeed(credit) {
    if (testCredit(credit)) {
      return "Your credit makes you eligble for a loan.";
    } else {
      return "Your credit immediately disqualifies you for a loan. ";
    }
  }
};
