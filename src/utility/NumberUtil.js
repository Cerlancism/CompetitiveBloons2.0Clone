class NumberUtil
{
  pad(num, size)
  {
    let s = num.toString();

    while (s.length < size)
    {
      s = '0' + s;
    }

    return s;
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
