class NumberUtil
{
  constructor()
  {
    this.FullWidthNumbers = ['０', '１', '２', '３', '４', '５', '６', '７', '８', '９'];
  }

  /**
   * 
   * @param {Number} num 
   * @param {Number} size
   */
  pad(num, size)
  {
    let s = num.toString();

    while (s.length < size)
    {
      s = '0' + s;
    }

    return s;
  }

  fullWidthPad(num, size)
  {
    var numbers = this.pad(num, size);
    var fullWidthString = "";
    for (var index = 0; index < numbers.length; index++)
    {
      fullWidthString += this.FullWidthNumbers[Number.parseInt(numbers[index])];
    }
    return fullWidthString;
  }

  msToTime(s)
  {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return hrs + ':' + mins + ':' + secs + '.' + ms;
  }
}

module.exports = new NumberUtil();
