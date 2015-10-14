var args = process.argv[2];
var tmp = args.indexOf(' ');

while (args.indexOf(' ') > -1) {
  args = args.replace(' ', '')
}

function getDegree(string) {
  var tmp = string.split('^');

  if (tmp.length === 2) {
    return parseFloat(tmp[1]);
  }
  else {
    return 0;
  }
};

function getJsonValue(string) {
  var tmp = string.split('*');

  return {
    value: parseFloat(tmp[0]),
    degree: getDegree(string)
  };
};

var values = [];
var result = {};
var regex = /^([\-\+]?[0-9][^\-\+=]*)/;
var exec = regex.exec(args);

while (exec && exec[0].length > 0) {
  args = args.slice(exec[0].length, args.length);
  values.push(getJsonValue(exec[0]));
  exec = regex.exec(args);
}

result = getJsonValue(args.split('=')[1]);

if (result.value != 0) {
  for (var i = 0; i < values.length; i++) {
    if (values[i].degree == result.degree) {
      values[i].value -= result.value;
      result.value = 0;
      result.degree = 0;
    }
  }
}

function highestDegree(array) {
  var flag = 0;

  for (var i = 0; i < array.length; i++) {
    if (array[i].degree > flag) {
      flag = array[i].degree;
    }
  }

  return flag;
}

var poly = highestDegree(values);

console.log('Polynomial degree: ' + poly);

if (poly > 2) {
  console.log('The polynomial degree is stricly greater than 2, I can\'t solve.');
  return 1;
}
else if (poly == 2) {
  var delta = (values[1].value * values[1].value) - (4 * values[0].value * values[2].value);

  if (delta > 0) {
    var x1 = (-values[1].value - Math.sqrt(delta)) / (2 * values[0].value);
    var x2 = (-values[1].value + Math.sqrt(delta)) / (2 * values[0].value);

    console.log('Discriminant is strictly positive, the two solutions are:');
    console.log(x1);
    console.log(x2);
  }
  else if (delta === 0) {
    var result = -values[1].value / (2 * values[0].value);

    console.log('The solution is:');
    console.log(result);
  }
  else {
    console.log('No solution.');
  }
}
else {
  var result = -values[0].value / values[1].value;

  console.log('The solution is:');
  console.log(result);
}
