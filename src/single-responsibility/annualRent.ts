/**
 * [S]OLID (SRP) - Single Resposibility Principle
 *
 * [1] A class, module or function should only have one responsibility (one reason to change).
 *
 * In the example below, we have a number of commented out methods in yearlyRentCalculator class.
 * These methods contain logic that is not the resposibility of this class.
 * I commented these out and added refactored implementation to make the class conform to SRP.
 */

import { UserAccount } from "./account";
import { Logger } from "./logger";

/**
 * AnnualRent works out how much you can spend a year on rent.
 * This is based on your annual income in the UK.
 */
export class AnnualRent {
  /**
   * 12 calendar months multiplied by 2.5 = 30.
   * This is the current recommended formula monthly income has to be 2.5 time the monthly rent.
   */
  readonly rentFactor: number = 30;
  public income: number;
  public logger: any;
  public account: any;

  /**
   * We construct external dependencies here for logging and checking user accounts.
   */
  constructor() {
    this.logger = new Logger();
    this.account = new UserAccount();
  }

  /**
   * This method calls a number of other methods that do not belong this class.
   * The methods called are annualRecordExists(), this.allowToOverwrite() and print().
   *
   * We need to extract them out (see refactored setAnnualIncome() method below)
   */
  // public setAnnualIncome(income: number) {
  //   // DB calls
  //   if (this.annualRecordExists() && !this.allowToOverwrite()) {
  //     this.print("Annual record already exists");
  //     return;
  //   }
  //   this.income = income;
  // }

  /**
   * In this method we call static methods that live inside of UserAccount class.
   * These methods are implemented externally and we are only calling them here.
   *
   * setAnnualIncome, getAnnualIncome, getRent are the only responsibility of this class now.
   */
  public setAnnualIncome(income: number): void {
    // fake database checks
    if (this.account.annualRecordExists() && !this.account.allowToOverwrite()) {
      return this.logger.printMsg("Annual record already exists");
    }
    this.income = income;
  }

  public getAnnualIncome(): number {
    return this.income;
  }

  public getRent(): number {
    // this formula calculates how much rent you could afford a year based on your annual income
    const rent = (this.getAnnualIncome() / this.rentFactor) * 12;
    // let's not call the internal implementation
    // this.print(`Yearly maximum rent - £${rent}`);
    // Same as above, we call the external static method
    this.logger.printMsg(`Annual salary - £${this.income}`);
    this.logger.printMsg(`Annual rent - £${rent}`);

    return rent;
  }

  /**
   * These methods have got nothing to do with this class and need to be extracted.
   */
  // public annualRecordExists() {
  //   return true;
  // }

  // public allowToOverwrite() {
  //   return true;
  // }

  // public print(message: string = "") {
  //   console.log(message);
  // }
}
