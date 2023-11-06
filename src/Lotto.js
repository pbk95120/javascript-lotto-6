import { Console } from "@woowacourse/mission-utils";
import { RANKS, GAME_MESSAGES } from "./Constatns.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }

    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== 6) {
      throw new Error("[ERROR] 중복된 번호가 있습니다.");
    }

    numbers.forEach((number) => {
      if (number < 1 || number > 45) {
        throw new Error("[ERROR] 로또 번호는 1부터 45 사이여야 합니다.");
      }
    });
  }

  validateBonusNumber(bonusLotto, winLotto) {
    if (winLotto.includes(Number(bonusLotto))) {
      throw new Error("[ERROR] 중복된 번호가 있습니다.");
    }
  }

  lottoRanksCount(lottos, bonusLotto) {
    let cnt = 0;
    this.#numbers.forEach((number) => {
      if (lottos.includes(number)) cnt += 1;
    });

    if (cnt === 6) return RANKS.RANK_FIRST;
    if (cnt === 5 && lottos.includes(bonusLotto)) return RANKS.RANK_SECOND;
    if (cnt === 5) return RANKS.RANK_THIRD;
    if (cnt === 4) return RANKS.RANK_FOURTH;
    if (cnt === 3) return RANKS.RANK_FIFTH;
    return 0;
  }

  getLottoRanks(lottos, bonusLotto) {
    let ranksCounts = [0, 0, 0, 0, 0];
    lottos.forEach((lotto) => {
      const rank = this.lottoRanksCount(lotto, bonusLotto);
      if (rank) ranksCounts[RANKS.MAX_RANK_LENGTH - rank]++;
    });
    return ranksCounts;
  }

  getProfit(money, lottoRanks) {
    let profit = 0;
    lottoRanks.forEach((rankCount, idx) => {
      profit += rankCount * RANKS.RANK_PRICE[idx];
    });
    profit = (profit * 100) / money;
    return profit;
  }

  printWinStatics(lottoRanks) {
    GAME_MESSAGES.WINNING_RESULT.forEach((winMessage, idx) => {
      Console.print(winMessage.replace("%s", lottoRanks[idx]));
    });
  }
}

export default Lotto;
