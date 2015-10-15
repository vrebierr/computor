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

console.log(values);
console.log(result);

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

var a = 0;
var b = 0;
var c = 0;

values.map(function (item) {
  if (item.degree == 2) {
    a = item.value;
  }
  else if (item.degree == 1) {
    b = item.value;
  }
  else {
    c = item.value;
  }
});

if (poly > 2) {
  console.log('The polynomial degree is stricly greater than 2, I can\'t solve.');
  return 1;
}
else if (poly == 2) {
  var delta = (b * b) - (4 * a * c);

  if (delta > 0) {
    var x1 = (-b - Math.sqrt(delta)) / (2 * a);
    var x2 = (-b + Math.sqrt(delta)) / (2 * a);

    console.log('Discriminant is strictly positive, the two solutions are:');
    console.log(x1);
    console.log(x2);
  }
  else if (delta === 0) {
    var result = -b / (2 * a);

    console.log('The solution is:');
    console.log(result);
  }
  else {
    console.log('No solution.');
  }
}
else {
  var result = -c / b;

  console.log('The solution is:');
  console.log(result);
}
